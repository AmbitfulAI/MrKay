import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Note } from "@/lib/models/Note";
import { NoteCategory } from "@/lib/models/NoteCategory";
import { NoteCategoriesProvider } from "@/components/NoteCategoriesProvider";
import { NoteForm } from "../NoteForm";

export default async function EditNote({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const [note, cats] = await Promise.all([
    Note.findById(id).lean<{ title: string; category: string; date: string; excerpt: string; body: string[] }>(),
    NoteCategory.find({ type: "writing" }).sort({ order: 1 }).lean<{ title: string }[]>(),
  ]);
  if (!note) notFound();
  const categories = cats.map((c) => c.title);

  return (
    <NoteCategoriesProvider initial={categories}>
      <div style={{ padding: "40px 48px" }}>
        <div style={{ marginBottom: "36px" }}>
          <Link href="/admin/notes" style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", textDecoration: "none" }}>← Notes</Link>
          <h1 className="display text-text" style={{ fontSize: "1.8rem", marginTop: "16px" }}>Edit Note</h1>
          <p className="text-dim font-light" style={{ fontSize: "0.75rem", marginTop: "4px", fontFamily: "var(--font-body)" }}>{note.title}</p>
        </div>
        <NoteForm initialData={{ title: note.title, category: note.category, date: note.date, excerpt: note.excerpt, body: note.body.join("\n\n") }} id={id} />
      </div>
    </NoteCategoriesProvider>
  );
}
