import Link from "next/link";
import { NoteForm } from "../NoteForm";

export default function NewNote() {
  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ marginBottom: "36px" }}>
        <Link
          href="/admin/notes"
          style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", textDecoration: "none" }}
        >
          ← Notes
        </Link>
        <h1 className="display text-text" style={{ fontSize: "1.8rem", marginTop: "16px" }}>New Note</h1>
      </div>
      <NoteForm />
    </div>
  );
}
