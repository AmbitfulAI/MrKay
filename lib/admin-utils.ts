import { connectDB } from "@/lib/db";
import mongoose from "mongoose";

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function generateUniqueSlug(
  modelName: string,
  title: string,
  excludeId?: string,
): Promise<string> {
  await connectDB();
  const base = slugify(title);
  const model = mongoose.model(modelName);
  const filter = excludeId
    ? { slug: { $regex: `^${base}` }, _id: { $ne: excludeId } }
    : { slug: { $regex: `^${base}` } };
  const existing = await model.find(filter).select("slug").lean<{ slug: string }[]>();
  const slugs = existing.map((d) => d.slug);
  if (!slugs.includes(base)) return base;
  let i = 2;
  while (slugs.includes(`${base}-${i}`)) i++;
  return `${base}-${i}`;
}

export function bodyToArray(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}
