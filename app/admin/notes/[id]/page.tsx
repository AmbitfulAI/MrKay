import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityClient } from "@/sanity/client";
import { NoteForm } from "../NoteForm";

interface SanityNote {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  date: string;
  excerpt: string;
  body?: Array<{ children?: Array<{ text?: string }> }>;
}

function blocksToText(blocks: SanityNote["body"] = []) {
  return blocks
    .map((b) => (b.children ?? []).map((c) => c.text ?? "").join(""))
    .filter(Boolean)
    .join("\n\n");
}

export default async function EditNote({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const raw = await sanityClient.getDocument(id).catch(() => undefined);
  const note = (raw ?? null) as SanityNote | null;
  if (!note) notFound();

  const initialData = {
    title: note.title,
    category: note.category ?? "",
    date: note.date ?? "",
    excerpt: note.excerpt ?? "",
    body: blocksToText(note.body),
  };

  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ marginBottom: "36px" }}>
        <Link
          href="/admin/notes"
          style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", textDecoration: "none" }}
        >
          ← Notes
        </Link>
        <h1 className="display text-text" style={{ fontSize: "1.8rem", marginTop: "16px" }}>Edit Note</h1>
        <p className="text-dim font-light" style={{ fontSize: "0.75rem", marginTop: "4px", fontFamily: "var(--font-body)" }}>
          {note.title}
        </p>
      </div>
      <NoteForm initialData={initialData} id={id} />
    </div>
  );
}
