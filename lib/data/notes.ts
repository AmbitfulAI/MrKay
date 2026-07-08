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

export interface WritingCategory {
  title: string;
  slug: string;
  description: string;
  tagline: string;
}

const FALLBACK_CATEGORIES: WritingCategory[] = [
  {
    title: "GeniusMinedStirs",
    slug: "geniusmined",
    description: "Professional brilliance. Frameworks, case lessons, leadership, mentorship, organisation design, and the realities of building inside growing organisations. The voice of the work.",
    tagline: "",
  },
  {
    title: "GraceJunkie",
    slug: "gracejunkie",
    description: "Life journey and lessons. Faith, family, fatherhood, transitions, resilience — and a particular conviction that grace is the headwater, not the decoration.",
    tagline: "",
  },
  {
    title: "RareMusingWork",
    slug: "raremusingwork",
    description: "The unfiltered room. Poetry, songs, sparks, travel notes, and the random rants of a mind that won't stay in one lane. No rules.",
    tagline: "",
  },
];

export async function getNoteCategories(): Promise<WritingCategory[]> {
  await connectDB();
  const cats = await Category.find({ type: "writing" })
    .sort({ order: 1 })
    .lean<{ title: string; slug: string; description: string; tagline: string }[]>()
    .catch(() => []);
  return cats.length
    ? cats.map((c) => ({ title: c.title, slug: c.slug, description: c.description ?? "", tagline: c.tagline ?? "" }))
    : FALLBACK_CATEGORIES;
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

interface NoteRow {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export async function getNotesByCategory(slug: string, limit = 0): Promise<Note[]> {
  await connectDB();
  const cat = await Category.findOne({ slug })
    .select("_id title")
    .lean<{ _id: unknown; title: string }>()
    .catch(() => null);
  if (!cat) return [];

  const dbNotes = await NoteModel.find({ category: cat._id })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean<NoteRow[]>()
    .catch(() => []);

  if (dbNotes.length) {
    return dbNotes.map((n) => ({
      slug: n.slug,
      title: n.title,
      category: cat.title,
      date: n.date,
      excerpt: n.excerpt,
      body: [],
    }));
  }

  const fallback = staticNotes.filter((n) => n.category === cat.title);
  return limit ? fallback.slice(0, limit) : fallback;
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
