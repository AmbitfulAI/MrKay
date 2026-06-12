import Link from "next/link";
import { SuccessStoryForm } from "../SuccessStoryForm";

export default function NewSuccessStory() {
  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ marginBottom: "36px" }}>
        <Link href="/admin/success-stories" style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", textDecoration: "none" }}>← Success Stories</Link>
        <h1 className="display text-text" style={{ fontSize: "1.8rem", marginTop: "16px" }}>Add Success Story</h1>
      </div>
      <SuccessStoryForm />
    </div>
  );
}
