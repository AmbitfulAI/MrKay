"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { DeleteButton } from "@/app/admin/_components/DeleteButton";
import { QUERY_KEYS } from "@/lib/queries/keys";

interface ProductRow { _id: string; title: string; type: string; price?: string; available?: boolean; order?: number; }

export default function AdminMarketplace() {
  const { data: items = [], isLoading } = useQuery<ProductRow[]>({
    queryKey: QUERY_KEYS.marketplace,
    queryFn: () => fetch("/api/admin/marketplace").then((r) => r.json()),
  });

  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px" }}>
        <div>
          <h1 className="display text-text" style={{ fontSize: "1.8rem" }}>Marketplace</h1>
          <p className="text-dim font-light" style={{ fontSize: "0.78rem", marginTop: "4px" }}>{items.length} {items.length === 1 ? "product" : "products"}</p>
        </div>
        <Link href="/admin/marketplace/new" className="btn-solid" style={{ fontSize: "0.78rem", padding: "10px 24px" }}>+ Add Product</Link>
      </div>

      {isLoading ? (
        <p className="text-dim font-light" style={{ fontSize: "0.88rem" }}>Loading…</p>
      ) : items.length === 0 ? (
        <div style={{ border: "1px dashed var(--surface-2)", padding: "64px", textAlign: "center" }}>
          <p className="text-dim font-light" style={{ fontSize: "0.88rem" }}>No products yet.</p>
        </div>
      ) : (
        <div style={{ border: "1px solid var(--surface-2)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px 80px 80px 100px", padding: "10px 20px", borderBottom: "1px solid var(--surface-2)", background: "var(--surface)" }}>
            {["Title", "Type", "Price", "Status", "Order", ""].map((h) => <span key={h} style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)" }}>{h}</span>)}
          </div>
          {items.map((item) => (
            <div key={item._id} style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px 80px 80px 100px", padding: "16px 20px", borderBottom: "1px solid var(--surface-2)", alignItems: "center" }}>
              <p className="text-text font-light" style={{ fontSize: "0.88rem" }}>{item.title}</p>
              <span style={{ fontSize: "0.72rem", color: "var(--muted)", fontFamily: "var(--font-body)" }}>{item.type}</span>
              <span style={{ fontSize: "0.72rem", color: "var(--muted)", fontFamily: "var(--font-body)" }}>{item.price || "—"}</span>
              <span style={{ fontSize: "0.68rem", fontFamily: "var(--font-body)", color: item.available ? "var(--gold)" : "var(--dim)" }}>{item.available ? "Live" : "Hidden"}</span>
              <span style={{ fontSize: "0.72rem", color: "var(--muted)", fontFamily: "var(--font-body)" }}>{item.order ?? "—"}</span>
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <Link href={`/admin/marketplace/${item._id}`} style={{ fontSize: "0.72rem", color: "var(--gold)", fontFamily: "var(--font-body)", textDecoration: "none" }}>Edit</Link>
                <DeleteButton id={item._id} endpoint="/api/admin/marketplace" queryKey={QUERY_KEYS.marketplace} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
