import Link from "next/link";
import { sanityClient } from "@/sanity/client";
import { impactOrgsQuery } from "@/sanity/queries";
import { DeleteButton } from "@/app/admin/_components/DeleteButton";

interface ImpactOrg { _id: string; name: string; category: string; role: string; active: boolean; order?: number; }
export const revalidate = 0;

export default async function AdminImpact() {
  const items: ImpactOrg[] = await sanityClient.fetch(impactOrgsQuery);

  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px" }}>
        <div>
          <h1 className="display text-text" style={{ fontSize: "1.8rem" }}>Impact</h1>
          <p className="text-dim font-light" style={{ fontSize: "0.78rem", marginTop: "4px" }}>{items.length} {items.length === 1 ? "organisation" : "organisations"}</p>
        </div>
        <Link href="/admin/impact/new" className="btn-solid" style={{ fontSize: "0.78rem", padding: "10px 24px" }}>+ Add Organisation</Link>
      </div>

      {items.length === 0 ? (
        <div style={{ border: "1px dashed var(--surface-2)", padding: "64px", textAlign: "center" }}>
          <p className="text-dim font-light" style={{ fontSize: "0.88rem" }}>No organisations yet.</p>
        </div>
      ) : (
        <div style={{ border: "1px solid var(--surface-2)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 160px 160px 80px 80px 100px", padding: "10px 20px", borderBottom: "1px solid var(--surface-2)", background: "var(--surface)" }}>
            {["Name", "Category", "Role", "Active", "Order", ""].map((h) => <span key={h} style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)" }}>{h}</span>)}
          </div>
          {items.map((item) => (
            <div key={item._id} style={{ display: "grid", gridTemplateColumns: "1fr 160px 160px 80px 80px 100px", padding: "16px 20px", borderBottom: "1px solid var(--surface-2)", alignItems: "center" }}>
              <p className="text-text font-light" style={{ fontSize: "0.88rem" }}>{item.name}</p>
              <span style={{ fontSize: "0.72rem", color: "var(--muted)", fontFamily: "var(--font-body)" }}>{item.category}</span>
              <span style={{ fontSize: "0.72rem", color: "var(--muted)", fontFamily: "var(--font-body)" }}>{item.role || "—"}</span>
              <span style={{ fontSize: "0.68rem", fontFamily: "var(--font-body)", color: item.active ? "var(--gold)" : "var(--dim)" }}>{item.active ? "Yes" : "No"}</span>
              <span style={{ fontSize: "0.72rem", color: "var(--muted)", fontFamily: "var(--font-body)" }}>{item.order ?? "—"}</span>
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <Link href={`/admin/impact/${item._id}`} style={{ fontSize: "0.72rem", color: "var(--gold)", fontFamily: "var(--font-body)", textDecoration: "none" }}>Edit</Link>
                <DeleteButton id={item._id} endpoint="/api/admin/impact" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
