"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { DeleteButton } from "@/app/admin/_components/DeleteButton";
import { QUERY_KEYS } from "@/lib/queries/keys";

interface TestimonialRow { _id: string; quote: string; clientName: string; clientContext: string; order?: number; pages?: string[]; }

export default function AdminTestimonials() {
  const { data: items = [], isLoading } = useQuery<TestimonialRow[]>({
    queryKey: QUERY_KEYS.testimonials,
    queryFn: () => fetch("/api/admin/testimonials").then((r) => r.json()),
  });

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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 180px 1fr 80px 100px", padding: "10px 20px", borderBottom: "1px solid var(--surface-2)", background: "var(--surface)" }}>
            {["Quote", "Client", "Pages", "Order", ""].map((h) => <span key={h} style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)" }}>{h}</span>)}
          </div>
          {items.map((item) => (
            <div key={item._id} style={{ display: "grid", gridTemplateColumns: "1fr 180px 1fr 80px 100px", padding: "16px 20px", borderBottom: "1px solid var(--surface-2)", alignItems: "center" }}>
              <p className="text-text font-light" style={{ fontSize: "0.88rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: "16px" }}>{item.quote}</p>
              <div>
                <p style={{ fontSize: "0.78rem", color: "var(--text)", fontFamily: "var(--font-body)" }}>{item.clientName}</p>
                <p style={{ fontSize: "0.68rem", color: "var(--dim)", fontFamily: "var(--font-body)" }}>{item.clientContext}</p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {(item.pages ?? []).map((p) => <span key={p} style={{ fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 7px", background: "var(--gold-glow)", color: "var(--gold)", fontFamily: "var(--font-body)", borderRadius: "2px" }}>{p}</span>)}
              </div>
              <span style={{ fontSize: "0.72rem", color: "var(--muted)", fontFamily: "var(--font-body)" }}>{item.order ?? "—"}</span>
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <Link href={`/admin/testimonials/${item._id}`} style={{ fontSize: "0.72rem", color: "var(--gold)", fontFamily: "var(--font-body)", textDecoration: "none" }}>Edit</Link>
                <DeleteButton id={item._id} endpoint="/api/admin/testimonials" queryKey={QUERY_KEYS.testimonials} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
