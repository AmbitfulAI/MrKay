"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { DeleteButton } from "@/app/admin/_components/DeleteButton";
import { QUERY_KEYS } from "@/lib/queries/keys";

interface GalleryRow { _id: string; title: string; category?: string; span?: string; order?: number; }

export default function AdminGallery() {
  const { data: items = [], isLoading } = useQuery<GalleryRow[]>({
    queryKey: QUERY_KEYS.gallery,
    queryFn: () => fetch("/api/admin/gallery").then((r) => r.json()),
  });

  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px" }}>
        <div>
          <h1 className="display text-text" style={{ fontSize: "1.8rem" }}>Gallery</h1>
          <p className="text-dim font-light" style={{ fontSize: "0.78rem", marginTop: "4px" }}>{items.length} {items.length === 1 ? "image" : "images"}</p>
        </div>
        <Link href="/admin/gallery/new" className="btn-solid" style={{ fontSize: "0.78rem", padding: "10px 24px" }}>+ Add Image</Link>
      </div>

      {isLoading ? (
        <p className="text-dim font-light" style={{ fontSize: "0.88rem" }}>Loading…</p>
      ) : items.length === 0 ? (
        <div style={{ border: "1px dashed var(--surface-2)", padding: "64px", textAlign: "center" }}>
          <p className="text-dim font-light" style={{ fontSize: "0.88rem" }}>No gallery images yet.</p>
        </div>
      ) : (
        <div style={{ border: "1px solid var(--surface-2)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 160px 120px 80px 100px", padding: "10px 20px", borderBottom: "1px solid var(--surface-2)", background: "var(--surface)" }}>
            {["Title", "Category", "Span", "Order", ""].map((h) => <span key={h} style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)" }}>{h}</span>)}
          </div>
          {items.map((item) => (
            <div key={item._id} style={{ display: "grid", gridTemplateColumns: "1fr 160px 120px 80px 100px", padding: "16px 20px", borderBottom: "1px solid var(--surface-2)", alignItems: "center" }}>
              <p className="text-text font-light" style={{ fontSize: "0.88rem" }}>{item.title}</p>
              <span style={{ fontSize: "0.72rem", color: "var(--muted)", fontFamily: "var(--font-body)" }}>{item.category || "—"}</span>
              <span style={{ fontSize: "0.72rem", color: "var(--muted)", fontFamily: "var(--font-body)" }}>{item.span || "normal"}</span>
              <span style={{ fontSize: "0.72rem", color: "var(--muted)", fontFamily: "var(--font-body)" }}>{item.order ?? "—"}</span>
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <Link href={`/admin/gallery/${item._id}`} style={{ fontSize: "0.72rem", color: "var(--gold)", fontFamily: "var(--font-body)", textDecoration: "none" }}>Edit</Link>
                <DeleteButton id={item._id} endpoint="/api/admin/gallery" queryKey={QUERY_KEYS.gallery} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
