'use server'

import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products"
import db from "@/db/drizzle"
import { eq, and } from "drizzle-orm";
import { getConfiguration } from "@/db/queries"
import { auth, currentUser } from '@clerk/nextjs/server'

import { Order, User } from "@/db/schema"
import { stripe } from "@/lib/stripe";
import { revalidatePath } from "next/cache";

export const upsertUser = async () => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const existingUser = await db.query.User.findFirst({
    where: eq(User.userId, userId),
  });

  if (!existingUser) {
    await db.insert(User).values({
      userId,
      email: user?.emailAddresses[0].emailAddress,
    });
  }

  return { success: true }
}

export const createCheckoutSession = async ({ configId }: { configId: string }) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const configuration = await getConfiguration(configId);

  if (!configuration) {
    throw new Error('No such configuration found')
  }

  const { finish, material } = configuration

  let price = BASE_PRICE
  if (finish === 'textured') 
    price += PRODUCT_PRICES.finish.textured
  if (material === 'polycarbonate')
    price += PRODUCT_PRICES.material.polycarbonate

  // 確認訂單是否存在
  const existingOrder = await db.query.Order.findFirst({
    where: and(
      eq(Order.userId, userId),
      eq(Order.configurationId, configId)
    )
  });

  let order;
  if (existingOrder) {
    order = existingOrder;
  } else {
    const result = await db.insert(Order).values({
      configurationId: configId,
      userId: userId,
      amount: price.toString(),
    }).returning();

    order = result[0]; 
  }

  // Payment
  const product = await stripe.products.create({
    name: 'Design PhoneCase',
    images: [configuration.imageUrl],
    default_price_data: {
      currency: 'TWD',
      unit_amount: price * 100,
    },
  })

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
    payment_method_types: ['card'],
    mode: 'payment',
    shipping_address_collection: { allowed_countries: ['TW', 'US'] },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [
      { 
        price: product.default_price as string, 
        quantity: 1,
      }
    ],
  })

  return { url: stripeSession.url }

}

export const getPaymentStatus = async () => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return [];
  }

  const order = await db.query.Order.findMany({
    where: eq(Order.userId, userId),
    with: {
      user: true,
      configuration: true,
    },
  });

  if (!order) return [];

  return order
}

export const deleteOrder = async (configurationId: string) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized to delete");
  }

  const result = await db.delete(Order)
    .where(and(
      eq(Order.configurationId, configurationId), 
      eq(Order.userId, userId), 
      eq(Order.isPaid, false))
    )
    .returning();

    revalidatePath("/order");

  return result;
}