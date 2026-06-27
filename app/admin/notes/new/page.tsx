import Link from "next/link";
import { connectDB } from "@/lib/db";
import { NoteCategory } from "@/lib/models/NoteCategory";
import { NoteCategoriesProvider } from "@/components/NoteCategoriesProvider";
import { NoteForm } from "../NoteForm";

export default async function NewNote() {
  await connectDB();
  const cats = await NoteCategory.find().sort({ order: 1 }).lean<{ title: string }[]>();
  const categories = cats.map((c) => c.title);

  return (
    <NoteCategoriesProvider initial={categories}>
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
    </NoteCategoriesProvider>
  );
}
