import Link from "next/link";
import { GalleryItemForm } from "../GalleryItemForm";
import { getGalleryCategoryTitles } from "@/lib/data/gallery";

export default async function NewGalleryItem() {
  const categories = await getGalleryCategoryTitles();
  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ marginBottom: "36px" }}>
        <Link href="/admin/gallery" style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", textDecoration: "none" }}>← Gallery</Link>
        <h1 className="display text-text" style={{ fontSize: "1.8rem", marginTop: "16px" }}>Add Image</h1>
      </div>
      <GalleryItemForm categories={categories} />
    </div>
  );
}
