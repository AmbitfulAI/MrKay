"use client";

import Link from "next/link";
import { useTestimonialsQuery, useDeleteTestimonial, useReorderTestimonials } from "@/queries/testimonials";
import { DeleteButton } from "@/app/admin/_components/DeleteButton";
import { DragHandle } from "@/app/admin/_components/DragHandle";
import { useReorder } from "@/hooks/useReorder";

const gridCols = "24px 1fr 180px 1fr 100px";

export default function AdminTestimonials() {
  const { data: fetched, isLoading } = useTestimonialsQuery();
  const deleteTestimonial = useDeleteTestimonial();
  const reorderTestimonials = useReorderTestimonials();
  const { items, draggedId, overId, onDragStart, onDragOverRow, onDrop, onDragEnd } = useReorder(fetched, reorderTestimonials);

  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px" }}>
        <div>
          <h1 className="display text-text" style={{ fontSize: "1.8rem" }}>Testimonials</h1>
          <p className="text-dim font-light" style={{ fontSize: "0.78rem", marginTop: "4px" }}>{items.length} {items.length === 1 ? "entry" : "entries"}</p>
        </div>
        <Link href="/admin/testimonials/new" className="btn-solid" style={{ fontSize: "0.78rem", padding: "10px 24px" }}>+ Add Testimonial</Link>
      </div>

      {isLoading ? (
        <p className="text-dim font-light" style={{ fontSize: "0.88rem" }}>Loading…</p>
      ) : items.length === 0 ? (
        <div style={{ border: "1px dashed var(--surface-2)", padding: "64px", textAlign: "center" }}>
          <p className="text-dim font-light" style={{ fontSize: "0.88rem" }}>No testimonials yet.</p>
        </div>
      ) : (
        <div style={{ border: "1px solid var(--surface-2)" }}>
          <div style={{ display: "grid", gridTemplateColumns: gridCols, padding: "10px 20px", borderBottom: "1px solid var(--surface-2)", background: "var(--surface)" }}>
            {["", "Quote", "Client", "Pages", ""].map((h, i) => <span key={i} style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)" }}>{h}</span>)}
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
              <p className="text-text font-light" style={{ fontSize: "0.88rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: "16px" }}>{item.quote}</p>
              <div>
                <p style={{ fontSize: "0.78rem", color: "var(--text)", fontFamily: "var(--font-body)" }}>{item.clientName}</p>
                <p style={{ fontSize: "0.68rem", color: "var(--dim)", fontFamily: "var(--font-body)" }}>{item.clientContext}</p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {(item.pages ?? []).map((p) => <span key={p} style={{ fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 7px", background: "var(--gold-glow)", color: "var(--gold)", fontFamily: "var(--font-body)", borderRadius: "2px" }}>{p}</span>)}
              </div>
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <Link href={`/admin/testimonials/${item._id}`} style={{ fontSize: "0.72rem", color: "var(--gold)", fontFamily: "var(--font-body)", textDecoration: "none" }}>Edit</Link>
                <DeleteButton onDelete={() => deleteTestimonial.deleteTestimonial(item._id)} isPending={deleteTestimonial.isPending} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
