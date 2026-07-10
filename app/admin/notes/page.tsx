"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { DeleteNoteButton } from "./DeleteNoteButton";
import { QUERY_KEYS } from "@/lib/queries/keys";

import { formatNoteDate } from "@/lib/notes";

interface NoteRow { _id: string; title: string; slug: string; category: { title: string }; date: string; }

export default function AdminNotes() {
  const { data: notes = [], isLoading } = useQuery<NoteRow[]>({
    queryKey: QUERY_KEYS.notes,
    queryFn: () => fetch("/api/admin/notes").then((r) => r.json()),
  });

  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px" }}>
        <div>
          <h1 className="display text-text" style={{ fontSize: "1.8rem" }}>Notes</h1>
          <p className="text-dim font-light" style={{ fontSize: "0.78rem", marginTop: "4px" }}>
            {notes.length} {notes.length === 1 ? "note" : "notes"}
          </p>
        </div>
        <Link href="/admin/notes/new" className="btn-solid" style={{ fontSize: "0.78rem", padding: "10px 24px" }}>
          + New Note
        </Link>
      </div>

      {isLoading ? (
        <p className="text-dim font-light" style={{ fontSize: "0.88rem" }}>Loading…</p>
      ) : notes.length === 0 ? (
        <div style={{ border: "1px dashed var(--surface-2)", padding: "64px", textAlign: "center" }}>
          <p className="text-dim font-light" style={{ fontSize: "0.88rem" }}>No notes yet.</p>
          <Link href="/admin/notes/new" style={{ color: "var(--gold)", fontSize: "0.82rem", marginTop: "12px", display: "inline-block" }}>
            Create your first note →
          </Link>
        </div>
      ) : (
        <div style={{ border: "1px solid var(--surface-2)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 140px 120px 100px", padding: "10px 20px", borderBottom: "1px solid var(--surface-2)", background: "var(--surface)" }}>
            {["Title", "Category", "Date", ""].map((h) => (
              <span key={h} style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)" }}>{h}</span>
            ))}
          </div>
          {notes.map((note) => (
            <div key={note._id} style={{ display: "grid", gridTemplateColumns: "1fr 140px 120px 100px", padding: "16px 20px", borderBottom: "1px solid var(--surface-2)", alignItems: "center" }}>
              <div>
                <p className="text-text font-light" style={{ fontSize: "0.9rem", marginBottom: "2px" }}>{note.title}</p>
                <p className="text-dim" style={{ fontSize: "0.7rem", fontFamily: "var(--font-body)" }}>/{note.slug}</p>
              </div>
              <span style={{ fontSize: "0.72rem", color: "var(--muted)", fontFamily: "var(--font-body)" }}>{note.category?.title}</span>
              <span style={{ fontSize: "0.72rem", color: "var(--muted)", fontFamily: "var(--font-body)" }}>{formatNoteDate(note.date)}</span>
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <Link href={`/admin/notes/${note._id}`} style={{ fontSize: "0.72rem", color: "var(--gold)", fontFamily: "var(--font-body)", textDecoration: "none" }}>Edit</Link>
                <DeleteNoteButton id={note._id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
