import { cache } from "react";
import { eq } from "drizzle-orm";
import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";

import { Configuration, Order } from "./schema";


//build API
export const getConfiguration = cache(async ( configId: string ) => {
  const data =  await db.query.Configuration.findFirst({
    where: eq(Configuration.id, configId),
  })

  return data
})

export const getUser = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }
  console.log('這個用戶',userId)

})