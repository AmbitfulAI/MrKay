import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { NoteCategory } from "@/lib/models/NoteCategory";
import CategoryEditForm from "./CategoryEditForm";

interface Category {
  _id: string;
  title: string;
  slug: string;
  type: string;
  order: number;
  tagline: string;
  description: string;
  themes: string[];
}

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const cat = await NoteCategory.findById(id).lean<Category>();
  if (!cat) notFound();

  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ marginBottom: "36px" }}>
        <Link
          href="/admin/notes/categories"
          style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", textDecoration: "none" }}
        >
          ← Categories
        </Link>
        <h1 className="display text-text" style={{ fontSize: "1.8rem", marginTop: "16px" }}>Edit Category</h1>
        <p className="text-dim font-light" style={{ fontSize: "0.75rem", marginTop: "4px", fontFamily: "var(--font-body)" }}>{cat.title}</p>
      </div>
      <CategoryEditForm
        id={String(cat._id)}
        initialData={{
          title: cat.title,
          type: cat.type ?? "writing",
          tagline: cat.tagline ?? "",
          description: cat.description ?? "",
          themes: (cat.themes ?? []).join("\n"),
        }}
      />
    </div>
  );
}
