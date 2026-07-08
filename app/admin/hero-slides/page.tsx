"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { DeleteButton } from "@/app/admin/_components/DeleteButton";
import { QUERY_KEYS } from "@/lib/queries/keys";

interface SlideRow { _id: string; eyebrow: string; line1: string; line2: string; imageUrl?: string; order?: number; }

export default function AdminHeroSlides() {
  const { data: items = [], isLoading } = useQuery<SlideRow[]>({
    queryKey: QUERY_KEYS.heroSlides,
    queryFn: () => fetch("/api/admin/hero-slides").then((r) => r.json()),
  });

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
        The site uses hardcoded fallback slides until at least one slide is saved here. Add all 3 slides and upload their background images to go fully dynamic.
      </p>

      {isLoading ? (
        <p className="text-dim font-light" style={{ fontSize: "0.88rem" }}>Loading…</p>
      ) : items.length === 0 ? (
        <div style={{ border: "1px dashed var(--surface-2)", padding: "64px", textAlign: "center" }}>
          <p className="text-dim font-light" style={{ fontSize: "0.88rem" }}>No slides yet — site is using hardcoded fallbacks.</p>
        </div>
      ) : (
        <div style={{ border: "1px solid var(--surface-2)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "56px 1fr 200px 60px 100px", padding: "10px 20px", borderBottom: "1px solid var(--surface-2)", background: "var(--surface)" }}>
            {["#", "Headline", "Eyebrow", "Order", ""].map((h) => <span key={h} style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)" }}>{h}</span>)}
          </div>
          {items.map((item) => (
            <div key={item._id} style={{ display: "grid", gridTemplateColumns: "56px 1fr 200px 60px 100px", padding: "16px 20px", borderBottom: "1px solid var(--surface-2)", alignItems: "center" }}>
              {item.imageUrl
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={`${item.imageUrl}?w=48&h=48&fit=crop`} alt="" style={{ width: "40px", height: "40px", objectFit: "cover", opacity: 0.7 }} />
                : <div style={{ width: "40px", height: "40px", background: "var(--surface-2)" }} />}
              <div style={{ paddingRight: "16px" }}>
                <p style={{ fontSize: "0.88rem", color: "var(--text)", fontFamily: "var(--font-body)" }}>{item.line1} <em style={{ color: "var(--gold)" }}>{item.line2}</em></p>
              </div>
              <p style={{ fontSize: "0.72rem", color: "var(--dim)", fontFamily: "var(--font-body)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.eyebrow}</p>
              <span style={{ fontSize: "0.72rem", color: "var(--muted)", fontFamily: "var(--font-body)" }}>{item.order ?? "—"}</span>
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <Link href={`/admin/hero-slides/${item._id}`} style={{ fontSize: "0.72rem", color: "var(--gold)", fontFamily: "var(--font-body)", textDecoration: "none" }}>Edit</Link>
                <DeleteButton id={item._id} endpoint="/api/admin/hero-slides" queryKey={QUERY_KEYS.heroSlides} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
