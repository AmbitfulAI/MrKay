"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { DeleteButton } from "@/app/admin/_components/DeleteButton";
import { DragHandle } from "@/app/admin/_components/DragHandle";
import { useReorder } from "@/app/admin/_components/useReorder";
import { QUERY_KEYS } from "@/lib/queries/keys";

interface FaqRow { _id: string; question: string; answer: string; order?: number; }

const gridCols = "24px 1fr 100px";

export default function AdminFaqs() {
  const { data: fetched = [], isLoading } = useQuery<FaqRow[]>({
    queryKey: QUERY_KEYS.faqs,
    queryFn: () => fetch("/api/admin/faqs").then((r) => r.json()),
  });
  const { items, draggedId, overId, onDragStart, onDragOverRow, onDrop, onDragEnd } =
    useReorder(fetched, "/api/admin/faqs/reorder", QUERY_KEYS.faqs);

  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px" }}>
        <div>
          <h1 className="display text-text" style={{ fontSize: "1.8rem" }}>FAQs</h1>
          <p className="text-dim font-light" style={{ fontSize: "0.78rem", marginTop: "4px" }}>{items.length} {items.length === 1 ? "entry" : "entries"} — shown on the Contact page</p>
        </div>
        <Link href="/admin/faqs/new" className="btn-solid" style={{ fontSize: "0.78rem", padding: "10px 24px" }}>+ Add FAQ</Link>
      </div>

      {isLoading ? (
        <p className="text-dim font-light" style={{ fontSize: "0.88rem" }}>Loading…</p>
      ) : items.length === 0 ? (
        <div style={{ border: "1px dashed var(--surface-2)", padding: "64px", textAlign: "center" }}>
          <p className="text-dim font-light" style={{ fontSize: "0.88rem" }}>No FAQs yet.</p>
        </div>
      ) : (
        <div style={{ border: "1px solid var(--surface-2)" }}>
          <div style={{ display: "grid", gridTemplateColumns: gridCols, padding: "10px 20px", borderBottom: "1px solid var(--surface-2)", background: "var(--surface)" }}>
            {["", "Question", ""].map((h, i) => <span key={i} style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)" }}>{h}</span>)}
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
              <div>
                <p style={{ fontSize: "0.88rem", color: "var(--text)", fontFamily: "var(--font-body)", marginBottom: "4px" }}>{item.question}</p>
                <p style={{ fontSize: "0.75rem", color: "var(--dim)", fontFamily: "var(--font-body)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.answer}</p>
              </div>
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <Link href={`/admin/faqs/${item._id}`} style={{ fontSize: "0.72rem", color: "var(--gold)", fontFamily: "var(--font-body)", textDecoration: "none" }}>Edit</Link>
                <DeleteButton id={item._id} endpoint="/api/admin/faqs" queryKey={QUERY_KEYS.faqs} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
