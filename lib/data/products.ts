import { connectDB } from "@/lib/db";
import { Product as ProductModel } from "@/lib/models/Product";
import type { Product } from "@/components/MarketplaceGrid";

interface DBProduct {
  _id: string;
  title: string;
  subtitle?: string;
  type: "Book" | "Course";
  description?: string;
  price?: string;
  priceNote?: string;
  tag?: string;
  selarUrl?: string;
  available?: boolean;
  coverAccent?: string;
}

export async function getProducts(fallback: Product[] = []): Promise<Product[]> {
  await connectDB();
  const results = await ProductModel
    .find()
    .sort({ order: 1 })
    .lean<DBProduct[]>()
    .catch(() => []);
  if (!results.length) return fallback;
  return results.map((p) => ({
    id: String(p._id),
    type: p.type,
    title: p.title,
    subtitle: p.subtitle ?? "",
    description: p.description ?? "",
    price: p.price ?? "",
    priceNote: p.priceNote,
    tag: p.tag,
    href: p.selarUrl ?? "#",
    available: p.available ?? true,
    coverAccent: p.coverAccent ?? "linear-gradient(135deg, #1a1208 0%, #2d1f0a 60%, #1c1510 100%)",
  }));
}
