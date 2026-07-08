import { connectDB } from "@/lib/db";
import { Note as NoteModel } from "@/lib/models/Note";
import { Category } from "@/lib/models/Category";
import {
  notes as staticNotes,
  categories as staticCategories,
  getNoteBySlug as getStaticNoteBySlug,
  type Note,
} from "@/lib/notes";

interface DBNote {
  _id: string;
  slug: string;
  title: string;
  category: { title: string } | null;
  date: string;
  excerpt: string;
  featuredImage?: string;
  body: string[];
  blocks?: Array<{ children: Array<{ text: string }>; style: string }>;
}

function mapDBNote(n: DBNote): Note {
  return {
    slug: n.slug,
    title: n.title,
    category: n.category?.title ?? "",
    date: n.date,
    excerpt: n.excerpt,
    body: n.body?.length
      ? n.body
      : (n.blocks ?? []).map((b) =>
          (b.children ?? []).map((c) => c.text ?? "").join("")
        ).filter(Boolean),
  };
}

const FALLBACK_CATEGORIES = [
  { title: "GeniusMined",    slug: "geniusmined" },
  { title: "GraceJunkie",    slug: "gracejunkie" },
  { title: "RareMusingWork", slug: "raremusingwork" },
];

export async function getNoteCategories(): Promise<{ title: string; slug: string }[]> {
  await connectDB();
  const cats = await Category.find({ type: "writing" }).sort({ order: 1 }).lean<{ title: string; slug: string }[]>().catch(() => []);
  return cats.length ? cats.map((c) => ({ title: c.title, slug: c.slug })) : FALLBACK_CATEGORIES;
}

export async function getNotes(): Promise<{ notes: Note[]; categories: string[] }> {
  await connectDB();
  const [dbNotes, dbCategories] = await Promise.all([
    NoteModel.find().populate<{ category: { title: string } | null }>("category", "title").sort({ createdAt: -1 }).lean<DBNote[]>(),
    Category.find({ type: "writing" }).sort({ order: 1 }).lean<{ title: string }[]>(),
  ]);

  const notes = dbNotes.length ? dbNotes.map(mapDBNote) : staticNotes;
  const categories = dbCategories.length
    ? ["All", ...dbCategories.map((c) => c.title)]
    : dbNotes.length
    ? ["All", ...Array.from(new Set(dbNotes.map((n) => n.category?.title ?? "").filter(Boolean)))]
    : staticCategories;

  return { notes, categories };
}

export async function getNoteSlugs(): Promise<Array<{ slug: string }>> {
  await connectDB();
  const fromDB = await NoteModel.find().select("slug").lean<{ slug: string }[]>().catch(() => []);
  const fromStatic = staticNotes.map((n) => ({ slug: n.slug }));
  const all = [...fromStatic, ...fromDB];
  return [...new Map(all.map((s) => [s.slug, s])).values()];
}

export interface DBNoteDetail {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  featuredImage?: string;
  body: string[];
}

export async function getNoteBySlug(slug: string): Promise<DBNoteDetail | Note | null> {
  await connectDB();
  const fromDB = await NoteModel.findOne({ slug }).populate<{ category: { title: string } | null }>("category", "title").lean<DBNote>().catch(() => null);
  if (fromDB) {
    return {
      slug: fromDB.slug,
      title: fromDB.title,
      category: fromDB.category?.title ?? "",
      date: fromDB.date,
      excerpt: fromDB.excerpt,
      featuredImage: fromDB.featuredImage,
      body: mapDBNote(fromDB).body,
    };
  }
  return getStaticNoteBySlug(slug) ?? null;
}
