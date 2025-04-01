import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
  // Route for tattoo design reference uploads
  tattooDesigns: f({
    image: { maxFileSize: "4MB", maxFileCount: 5 }
  })
    .middleware(async () => {
      // Verify authentication for uploads
      const session = await auth();
      
      // Return context which will be available in onUploadComplete
      return { userId: session?.user?.id || "anonymous" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for user:", metadata.userId);
      
      // Return the uploaded file URL to the client
      return { url: file.url };
    }),
    
  // Route for profile photo uploads
  profilePhotos: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 }
  })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) throw new Error("Unauthorized");
      
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Profile photo uploaded for user:", metadata.userId);
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;