import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

import db from '@/db/drizzle'
import { eq, and } from "drizzle-orm";
import { Order } from '@/db/schema'


export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = headers().get('stripe-signature')

    if (!signature) {
      return new Response('Invalid signature', { status: 400 })
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    if (event.type === 'checkout.session.completed') {
      if (!event.data.object.customer_details?.email) {
        throw new Error('Missing user email')
      }

      const session = event.data.object as Stripe.Checkout.Session

      const { userId, orderId, configId } = session.metadata || {
        userId: null,
        orderId: null,
        configId: null,
      }

      if (!userId || !orderId || !configId) {
        throw new Error('Invalid request metadata')
      }

      const existingOrder = await db.query.Order.findFirst({
        where: and(
          eq(Order.userId, userId),
          eq(Order.configurationId, configId),
        ),
      });

      if (existingOrder) {
        await db.update(Order).set({
          isPaid: true,
        })
        .where(and(
          eq(Order.userId, userId),
          eq(Order.configurationId, configId),
        ))
        .returning();
      }
    }

    return NextResponse.json({ result: event, ok: true })
  } catch (err) {
    console.error(err)

    return NextResponse.json(
      { message: 'Something went wrong', ok: false },
      { status: 500 }
    )
  }
}
