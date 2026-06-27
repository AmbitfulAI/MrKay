import { connectDB } from "@/lib/db";
import { GalleryImage as GalleryImageModel } from "@/lib/models/GalleryImage";

export interface GalleryItem {
  imageUrl: string | null;
  alt: string;
  title: string;
  caption?: string;
  category: string;
  span: "wide" | "tall" | "normal";
}

interface DBGalleryImage {
  title: string;
  caption?: string;
  category?: string;
  imageUrl?: string;
  alt?: string;
  span?: "wide" | "tall" | "normal";
}

export async function getGalleryImages(): Promise<GalleryItem[]> {
  await connectDB();
  const results = await GalleryImageModel
    .find()
    .sort({ order: 1 })
    .lean<DBGalleryImage[]>()
    .catch(() => []);
  return results.map((img) => ({
    imageUrl: img.imageUrl ?? null,
    alt: img.alt ?? img.title,
    title: img.title,
    caption: img.caption,
    category: img.category ?? "General",
    span: img.span ?? "normal",
  }));
}
