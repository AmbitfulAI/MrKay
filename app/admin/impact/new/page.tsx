import Link from "next/link";
import { ImpactForm } from "../ImpactForm";

export default function NewImpactOrg() {
  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ marginBottom: "36px" }}>
        <Link href="/admin/impact" style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", textDecoration: "none" }}>← Impact</Link>
        <h1 className="display text-text" style={{ fontSize: "1.8rem", marginTop: "16px" }}>Add Organisation</h1>
      </div>
      <ImpactForm />
    </div>
  );
}
