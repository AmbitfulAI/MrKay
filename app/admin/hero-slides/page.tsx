"use client";

import Link from "next/link";
import { useHeroSlidesQuery, useDeleteHeroSlide, useReorderHeroSlides } from "@/queries/hero-slides";
import { DeleteButton } from "@/app/admin/_components/DeleteButton";
import { DragHandle } from "@/app/admin/_components/DragHandle";
import { useReorder } from "@/hooks/useReorder";

const gridCols = "24px 56px 1fr 200px 100px";

export default function AdminHeroSlides() {
  const { data: fetched, isLoading } = useHeroSlidesQuery();
  const deleteHeroSlide = useDeleteHeroSlide();
  const reorderHeroSlides = useReorderHeroSlides();
  const { items, draggedId, overId, onDragStart, onDragOverRow, onDrop, onDragEnd } = useReorder(fetched, reorderHeroSlides);

  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
        <div>
          <h1 className="display text-text" style={{ fontSize: "1.8rem" }}>Hero Slides</h1>
          <p className="text-dim font-light" style={{ fontSize: "0.78rem", marginTop: "4px" }}>{items.length} {items.length === 1 ? "slide" : "slides"} — shown in the homepage hero</p>
        </div>
        <Link href="/admin/hero-slides/new" className="btn-solid" style={{ fontSize: "0.78rem", padding: "10px 24px" }}>+ Add Slide</Link>
      </div>
      <p className="text-dim font-light" style={{ fontSize: "0.72rem", marginBottom: "40px", lineHeight: 1.7 }}>
        The site uses hardcoded fallback slides until at least one slide is saved here. Drag rows by the handle to reorder them.
      </p>

      {isLoading ? (
        <p className="text-dim font-light" style={{ fontSize: "0.88rem" }}>Loading…</p>
      ) : items.length === 0 ? (
        <div style={{ border: "1px dashed var(--surface-2)", padding: "64px", textAlign: "center" }}>
          <p className="text-dim font-light" style={{ fontSize: "0.88rem" }}>No slides yet — site is using hardcoded fallbacks.</p>
        </div>
      ) : (
        <div style={{ border: "1px solid var(--surface-2)" }}>
          <div style={{ display: "grid", gridTemplateColumns: gridCols, padding: "10px 20px", borderBottom: "1px solid var(--surface-2)", background: "var(--surface)" }}>
            {["", "", "Headline", "Eyebrow", ""].map((h, i) => <span key={i} style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)" }}>{h}</span>)}
          </div>
          {items.map((item) => (
            <div
              key={item._id}
              onDragOver={(e) => { e.preventDefault(); onDragOverRow(item._id); }}
              onDrop={() => onDrop(item._id)}
              style={{
                display: "grid", gridTemplateColumns: gridCols, padding: "16px 20px",
                borderBottom: "1px solid var(--surface-2)", alignItems: "center",
                opacity: draggedId === item._id ? 0.4 : 1,
                background: overId === item._id && draggedId && draggedId !== item._id ? "var(--gold-glow)" : undefined,
              }}
            >
              <button
                draggable
                onDragStart={(e) => { e.dataTransfer.setData("text/plain", item._id); e.dataTransfer.effectAllowed = "move"; onDragStart(item._id); }}
                onDragEnd={onDragEnd}
                style={{ background: "none", border: "none", color: "var(--dim)", cursor: "grab", padding: 0, display: "flex" }}
                aria-label="Drag to reorder"
              >
                <DragHandle />
              </button>
              {item.imageUrl
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={`${item.imageUrl}?w=48&h=48&fit=crop`} alt="" style={{ width: "40px", height: "40px", objectFit: "cover", opacity: 0.7 }} />
                : <div style={{ width: "40px", height: "40px", background: "var(--surface-2)" }} />}
              <div style={{ paddingRight: "16px" }}>
                <p style={{ fontSize: "0.88rem", color: "var(--text)", fontFamily: "var(--font-body)" }}>{item.line1} <em style={{ color: "var(--gold)" }}>{item.line2}</em></p>
              </div>
              <p style={{ fontSize: "0.72rem", color: "var(--dim)", fontFamily: "var(--font-body)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.eyebrow}</p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <Link href={`/admin/hero-slides/${item._id}`} style={{ fontSize: "0.72rem", color: "var(--gold)", fontFamily: "var(--font-body)", textDecoration: "none" }}>Edit</Link>
                <DeleteButton onDelete={() => deleteHeroSlide.deleteHeroSlide(item._id)} isPending={deleteHeroSlide.isPending} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
