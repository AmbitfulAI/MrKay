import { connectDB } from "@/lib/db";
import { Note as NoteModel } from "@/lib/models/Note";
import { Category } from "@/lib/models/Category";
import { formatNoteDate, type Note, type ContentBlock } from "@/lib/notes";

interface DBNote {
  _id: string;
  slug: string;
  title: string;
  category: { title: string } | null;
  date: Date;
  excerpt: string;
  featuredImages?: string[];
  body: string[];
  contentBlocks?: ContentBlock[];
  blocks?: Array<{ children: Array<{ text: string }>; style: string }>;
}

function resolveBody(n: DBNote): string[] {
  if (n.body?.length) return n.body;
  return (n.blocks ?? [])
    .map((b) => (b.children ?? []).map((c) => c.text ?? "").join(""))
    .filter(Boolean);
}

function resolveContentBlocks(n: DBNote): ContentBlock[] {
  if (n.contentBlocks?.length) return n.contentBlocks;
  const body = resolveBody(n);
  return body.map((para) => ({ type: "text" as const, content: para, caption: "" }));
}

function mapDBNote(n: DBNote): Note {
  return {
    slug: n.slug,
    title: n.title,
    category: n.category?.title ?? "",
    date: formatNoteDate(n.date),
    excerpt: n.excerpt,
    featuredImages: n.featuredImages ?? [],
    contentBlocks: resolveContentBlocks(n),
    body: resolveBody(n),
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
    slug: "geniusminedstirs",
    description:
      "Professional brilliance. Frameworks, case lessons, leadership, mentorship, organisation design, and the realities of building inside growing organisations. The voice of the work.",
    tagline: "",
  },
  {
    title: "GraceJunkie",
    slug: "gracejunkie",
    description:
      "Life journey and lessons. Faith, family, fatherhood, transitions, resilience — and a particular conviction that grace is the headwater, not the decoration.",
    tagline: "",
  },
  {
    title: "RareMusingWork",
    slug: "raremusingwork",
    description:
      "The unfiltered room. Poetry, songs, sparks, travel notes, and the random rants of a mind that won't stay in one lane. No rules.",
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
    ? cats.map((c) => ({
        title: c.title,
        slug: c.slug,
        description: c.description ?? "",
        tagline: c.tagline ?? "",
      }))
    : FALLBACK_CATEGORIES;
}

export async function getNotes(): Promise<{ notes: Note[]; categories: string[] }> {
  await connectDB();
  const [dbNotes, dbCategories] = await Promise.all([
    NoteModel.find()
      .populate<{ category: { title: string } | null }>("category", "title")
      .sort({ date: -1 })
      .lean<DBNote[]>(),
    Category.find({ type: "writing" }).sort({ order: 1 }).lean<{ title: string }[]>(),
  ]);

  const notes = dbNotes.map(mapDBNote);
  const categories = dbCategories.length
    ? ["All", ...dbCategories.map((c) => c.title)]
    : dbNotes.length
      ? ["All", ...Array.from(new Set(dbNotes.map((n) => n.category?.title ?? "").filter(Boolean)))]
      : ["All"];

  return { notes, categories };
}

interface NoteRow {
  slug: string;
  title: string;
  date: Date;
  excerpt: string;
  featuredImages?: string[];
}

export async function getNotesByCategory(slug: string, limit = 0): Promise<Note[]> {
  await connectDB();
  const cat = await Category.findOne({ slug })
    .select("_id title")
    .lean<{ _id: unknown; title: string }>()
    .catch(() => null);
  if (!cat) return [];

  const dbNotes = await NoteModel.find({ category: cat._id })
    .sort({ date: -1 })
    .limit(limit)
    .lean<NoteRow[]>()
    .catch(() => []);

  return dbNotes.map((n) => ({
    slug: n.slug,
    title: n.title,
    category: cat.title,
    date: formatNoteDate(n.date),
    excerpt: n.excerpt,
    featuredImages: n.featuredImages ?? [],
    body: [],
  }));
}

export async function getNoteSlugs(): Promise<Array<{ slug: string }>> {
  await connectDB();
  return NoteModel.find()
    .select("slug")
    .lean<{ slug: string }[]>()
    .catch(() => []);
}

export interface DBNoteDetail {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  featuredImages?: string[];
  contentBlocks?: ContentBlock[];
  body: string[];
}

export async function getNoteBySlug(slug: string): Promise<DBNoteDetail | null> {
  await connectDB();
  const fromDB = await NoteModel.findOne({ slug })
    .populate<{ category: { title: string } | null }>("category", "title")
    .lean<DBNote>()
    .catch(() => null);
  if (!fromDB) return null;
  return {
    slug: fromDB.slug,
    title: fromDB.title,
    category: fromDB.category?.title ?? "",
    date: formatNoteDate(fromDB.date),
    excerpt: fromDB.excerpt,
    featuredImages: fromDB.featuredImages ?? [],
    contentBlocks: resolveContentBlocks(fromDB),
    body: resolveBody(fromDB),
  };
}

export async function getRelatedNotes(slug: string, count = 3): Promise<Note[]> {
  await connectDB();
  const current = await NoteModel.findOne({ slug })
    .populate<{ category: { _id: unknown; title: string } | null }>("category", "_id title")
    .lean<DBNote & { category: { _id: unknown; title: string } | null }>()
    .catch(() => null);
  if (!current) return [];

  const catId = current.category?._id;
  const [sameCategory, others] = await Promise.all([
    catId
      ? NoteModel.find({ slug: { $ne: slug }, category: catId })
          .populate<{ category: { title: string } | null }>("category", "title")
          .sort({ date: -1 })
          .limit(count)
          .lean<DBNote[]>()
      : Promise.resolve([]),
    NoteModel.find({ slug: { $ne: slug }, ...(catId ? { category: { $ne: catId } } : {}) })
      .populate<{ category: { title: string } | null }>("category", "title")
      .sort({ date: -1 })
      .limit(count)
      .lean<DBNote[]>(),
  ]);

  return [...sameCategory, ...others].slice(0, count).map(mapDBNote);
}
