import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { GalleryImage } from "@/lib/models/GalleryImage";
import { GalleryItemForm } from "../GalleryItemForm";
import { getGalleryCategoryTitles } from "@/lib/data/gallery";

export default async function EditGalleryItem({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [, item, categories] = await Promise.all([
    connectDB(),
    GalleryImage.findById(id).lean<{ title: string; caption: string; category: string; imageUrl: string; alt: string; order?: number }>(),
    getGalleryCategoryTitles(),
  ]);
  if (!item) notFound();

  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ marginBottom: "36px" }}>
        <Link href="/admin/gallery" style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", textDecoration: "none" }}>← Gallery</Link>
        <h1 className="display text-text" style={{ fontSize: "1.8rem", marginTop: "16px" }}>Edit Image</h1>
      </div>
      <GalleryItemForm id={id} categories={categories} initialData={{ title: item.title ?? "", caption: item.caption ?? "", category: item.category ?? "", alt: item.alt ?? "", order: item.order?.toString() ?? "", imageUrl: item.imageUrl ?? "" }} />
    </div>
  );
}
