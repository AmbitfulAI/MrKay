import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { GalleryImage } from "@/lib/models/GalleryImage";
import { GalleryItemForm } from "../GalleryItemForm";

export default async function EditGalleryItem({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const item = await GalleryImage.findById(id).lean<{ title: string; caption: string; category: string; imageUrl: string; alt: string; span: string; order?: number }>();
  if (!item) notFound();

  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ marginBottom: "36px" }}>
        <Link href="/admin/gallery" style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", textDecoration: "none" }}>← Gallery</Link>
        <h1 className="display text-text" style={{ fontSize: "1.8rem", marginTop: "16px" }}>Edit Image</h1>
      </div>
      <GalleryItemForm id={id} initialData={{ title: item.title ?? "", caption: item.caption ?? "", category: item.category ?? "", alt: item.alt ?? "", span: item.span ?? "normal", order: item.order?.toString() ?? "", imageUrl: item.imageUrl ?? "" }} />
    </div>
  );
}
