import { connectDB } from "@/lib/db";
import { GalleryImage as GalleryImageModel } from "@/lib/models/GalleryImage";
import { Category } from "@/lib/models/Category";

export interface GalleryItem {
  imageUrl: string | null;
  alt: string;
  title: string;
  caption?: string;
  category: string;
}

interface DBGalleryImage {
  title: string;
  caption?: string;
  category?: string;
  imageUrl?: string;
  alt?: string;
}

const FALLBACK_GALLERY_CATEGORIES = ["All", "Portrait", "Professional"];
const FALLBACK_GALLERY_CATEGORY_TITLES = ["Portrait", "Professional"];

export async function getGalleryCategories(): Promise<string[]> {
  await connectDB();
  const cats = await Category
    .find({ type: "visual-diary" })
    .sort({ order: 1 })
    .lean<{ title: string }[]>()
    .catch(() => []);
  return cats.length ? ["All", ...cats.map((c) => c.title)] : FALLBACK_GALLERY_CATEGORIES;
}

export async function getGalleryCategoryTitles(): Promise<string[]> {
  await connectDB();
  const cats = await Category
    .find({ type: "visual-diary" })
    .sort({ order: 1 })
    .lean<{ title: string }[]>()
    .catch(() => []);
  return cats.length ? cats.map((c) => c.title) : FALLBACK_GALLERY_CATEGORY_TITLES;
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
  }));
}
