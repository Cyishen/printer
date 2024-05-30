import { createUploadthing, type FileRouter } from "uploadthing/next";

import { z } from 'zod'
import sharp from 'sharp'
import db from "@/db/drizzle";
import { Configuration } from "@/db/schema";
import { eq } from "drizzle-orm";

import { v4 as uuidv4 } from 'uuid';

const f = createUploadthing();
 
export const ourFileRouter = {

  imageUploader: f({ image: { maxFileSize: "4MB" } })

    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configId } = metadata.input

      const res = await fetch(file.url)
      const buffer = await res.arrayBuffer()

      const imgMetadata = await sharp(buffer).metadata()
      const { width, height } = imgMetadata

      if (!configId) {
        const result = await db.insert(Configuration).values({
          id: uuidv4(),
          imageUrl: file.url,
          height: height || 500,
          width: width || 500,
        })
        .returning();

        return { configId: result[0].id };
      } else {
        const result = await db.update(Configuration).set({
            croppedImageUrl: file.url,
          })
          .where(eq(Configuration.id, configId))
          .returning();

          return { configId: result[0].id };
      }
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;