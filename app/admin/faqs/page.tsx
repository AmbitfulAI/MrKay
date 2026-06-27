import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Faq } from "@/lib/models/Faq";
import { DeleteButton } from "@/app/admin/_components/DeleteButton";

interface FaqRow { _id: string; question: string; answer: string; order?: number; }
export const revalidate = 0;

export default async function AdminFaqs() {
  await connectDB();
  const items = await Faq.find().sort({ order: 1 }).lean<FaqRow[]>();

  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px" }}>
        <div>
          <h1 className="display text-text" style={{ fontSize: "1.8rem" }}>FAQs</h1>
          <p className="text-dim font-light" style={{ fontSize: "0.78rem", marginTop: "4px" }}>{items.length} {items.length === 1 ? "entry" : "entries"} — shown on the Contact page</p>
        </div>
        <Link href="/admin/faqs/new" className="btn-solid" style={{ fontSize: "0.78rem", padding: "10px 24px" }}>+ Add FAQ</Link>
      </div>

      {items.length === 0 ? (
        <div style={{ border: "1px dashed var(--surface-2)", padding: "64px", textAlign: "center" }}>
          <p className="text-dim font-light" style={{ fontSize: "0.88rem" }}>No FAQs yet.</p>
        </div>
      ) : (
        <div style={{ border: "1px solid var(--surface-2)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 100px", padding: "10px 20px", borderBottom: "1px solid var(--surface-2)", background: "var(--surface)" }}>
            {["Question", "Order", ""].map((h) => <span key={h} style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)" }}>{h}</span>)}
          </div>
          {items.map((item) => (
            <div key={String(item._id)} style={{ display: "grid", gridTemplateColumns: "1fr 60px 100px", padding: "16px 20px", borderBottom: "1px solid var(--surface-2)", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: "0.88rem", color: "var(--text)", fontFamily: "var(--font-body)", marginBottom: "4px" }}>{item.question}</p>
                <p style={{ fontSize: "0.75rem", color: "var(--dim)", fontFamily: "var(--font-body)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.answer}</p>
              </div>
              <span style={{ fontSize: "0.72rem", color: "var(--muted)", fontFamily: "var(--font-body)" }}>{item.order ?? "—"}</span>
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <Link href={`/admin/faqs/${String(item._id)}`} style={{ fontSize: "0.72rem", color: "var(--gold)", fontFamily: "var(--font-body)", textDecoration: "none" }}>Edit</Link>
                <DeleteButton id={String(item._id)} endpoint="/api/admin/faqs" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
