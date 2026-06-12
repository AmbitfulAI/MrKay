import { sanityClient } from "@/sanity/client";

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function generateUniqueSlug(
  type: string,
  title: string,
  excludeId?: string,
): Promise<string> {
  const base = slugify(title);
  const query = excludeId
    ? `*[_type == $type && defined(slug.current) && _id != $excludeId].slug.current`
    : `*[_type == $type && defined(slug.current)].slug.current`;
  const existing = await sanityClient.fetch<string[]>(query, excludeId ? { type, excludeId } : { type });
  if (!existing.includes(base)) return base;
  let i = 2;
  while (existing.includes(`${base}-${i}`)) i++;
  return `${base}-${i}`;
}
