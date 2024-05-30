'use server'

import db from '@/db/drizzle'
import { Configuration } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from "next/cache";

export type SaveConfigArgs = {
  color: typeof Configuration.$inferSelect['color']
  finish: typeof Configuration.$inferSelect['finish']
  material: typeof Configuration.$inferSelect['material']
  model: typeof Configuration.$inferSelect['model']
  configId: string
}

export async function saveConfigToDb({ color, model, material, finish, configId }: SaveConfigArgs) {
  await db.update(Configuration).set({
    color,
    model,
    material,
    finish,
  })
  .where(eq(Configuration.id, configId))
  .returning();

  revalidatePath("/configure/preview");
}