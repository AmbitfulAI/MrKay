import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Note } from "@/lib/models/Note";
import { Category } from "@/lib/models/Category";
import { CategoriesProvider } from "@/components/CategoriesProvider";
import { NoteForm } from "../NoteForm";
import mongoose from "mongoose";

interface PopulatedCategory { _id: mongoose.Types.ObjectId; title: string; }
interface NoteDoc { title: string; category: PopulatedCategory; date: string; excerpt: string; body: string[]; }

export default async function EditNote({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const [note, cats] = await Promise.all([
    Note.findById(id).populate<{ category: PopulatedCategory }>("category", "_id title").lean<NoteDoc>(),
    Category.find({ type: "writing" }).sort({ order: 1 }).lean<{ _id: mongoose.Types.ObjectId; title: string }[]>(),
  ]);
  if (!note) notFound();
  const categories = cats.map((c) => ({ _id: String(c._id), title: c.title }));

  return (
    <CategoriesProvider initial={categories}>
      <div style={{ padding: "40px 48px" }}>
        <div style={{ marginBottom: "36px" }}>
          <Link href="/admin/notes" style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", textDecoration: "none" }}>← Notes</Link>
          <h1 className="display text-text" style={{ fontSize: "1.8rem", marginTop: "16px" }}>Edit Note</h1>
          <p className="text-dim font-light" style={{ fontSize: "0.75rem", marginTop: "4px", fontFamily: "var(--font-body)" }}>{note.title}</p>
        </div>
        <NoteForm initialData={{ title: note.title, category: String(note.category._id), date: note.date, excerpt: note.excerpt, body: note.body.join("\n\n") }} id={id} />
      </div>
    </CategoriesProvider>
  );
}
