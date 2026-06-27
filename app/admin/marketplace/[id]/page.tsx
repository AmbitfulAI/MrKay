import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { ProductForm } from "../ProductForm";

export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const item = await Product.findById(id).lean<{ title: string; subtitle?: string; type: string; description?: string; price?: string; priceNote?: string; tag?: string; selarUrl?: string; available?: boolean; coverAccent?: string; order?: number }>().catch(() => null);
  if (!item) notFound();

  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ marginBottom: "36px" }}>
        <Link href="/admin/marketplace" style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", textDecoration: "none" }}>← Marketplace</Link>
        <h1 className="display text-text" style={{ fontSize: "1.8rem", marginTop: "16px" }}>Edit Product</h1>
      </div>
      <ProductForm id={id} initialData={{ title: item.title ?? "", subtitle: item.subtitle ?? "", type: item.type ?? "", description: item.description ?? "", price: item.price ?? "", priceNote: item.priceNote ?? "", tag: item.tag ?? "", selarUrl: item.selarUrl ?? "", available: item.available !== false, coverAccent: item.coverAccent ?? "", order: item.order?.toString() ?? "" }} />
    </div>
  );
}
