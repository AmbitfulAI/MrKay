import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Category } from "@/lib/models/Category";
import { CategoriesProvider } from "@/components/CategoriesProvider";
import { NoteForm } from "../NoteForm";
import mongoose from "mongoose";

export default async function NewNote() {
  await connectDB();
  const cats = await Category.find({ type: "writing" }).sort({ order: 1 }).lean<{ _id: mongoose.Types.ObjectId; title: string }[]>();
  const categories = cats.map((c) => ({ _id: String(c._id), title: c.title }));

  return (
    <CategoriesProvider initial={categories}>
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
    </CategoriesProvider>
  );
}
