import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Category } from "@/lib/models/Category";
import { Note as NoteModel } from "@/lib/models/Note";
import { notes as staticNotes, type Note } from "@/lib/notes";

export const revalidate = 60;

interface WritingCategory {
  _id: unknown;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  themes: string[];
}

interface DBNote {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
}

export async function generateStaticParams() {
  await connectDB();
  const cats = await Category.find({ type: "writing" })
    .select("slug")
    .lean<{ slug: string }[]>()
    .catch(() => []);
  return cats.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await connectDB();
  const cat = await Category.findOne({ slug, type: "writing" })
    .lean<WritingCategory>()
    .catch(() => null);
  if (!cat) return {};
  return {
    title: `${cat.title} — Writing · TheKayodeKolade`,
    description: cat.tagline || cat.description.slice(0, 160),
  };
}

export default async function WritingCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await connectDB();
  const cat = await Category.findOne({ slug, type: "writing" })
    .lean<WritingCategory>()
    .catch(() => null);
  if (!cat) notFound();

  const dbNotes = await NoteModel.find({ category: cat._id })
    .sort({ createdAt: -1 })
    .lean<DBNote[]>()
    .catch(() => []);

  const notes: Note[] = dbNotes.length
    ? dbNotes.map((n) => ({
        slug: n.slug,
        title: n.title,
        category: n.category,
        date: n.date,
        excerpt: n.excerpt,
        body: [],
      }))
    : staticNotes.filter((n) => n.category === cat.title);

  const paragraphs = cat.description
    ? cat.description.split("\n\n").filter(Boolean)
    : [];

  return (
    <>
      <section
        className="bg-bg border-b border-surface-2"
        style={{
          paddingTop: "clamp(80px, 12vw, 140px)",
          paddingBottom: "clamp(48px, 6vw, 80px)",
        }}
      >
        <div className="container">
          <span className="eyebrow block mb-3">
            <Link href="/writing" className="hover-gold">
              Writing
            </Link>{" "}
            / {cat.title}
          </span>
          <h1
            className="display text-text max-w-[860px]"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", lineHeight: 0.97 }}
          >
            {cat.title}.
          </h1>
          <span
            className="gold-rule"
            style={{ marginTop: "32px", marginBottom: "32px" }}
          />
          {cat.tagline && (
            <p
              className="text-muted font-light max-w-[580px]"
              style={{
                fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)",
                lineHeight: 1.9,
              }}
            >
              {cat.tagline}
            </p>
          )}
        </div>
      </section>

      {paragraphs.length > 0 && (
        <section className="bg-surface border-b border-surface-2 s-pad-sm">
          <div className="container max-w-[720px]">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-muted font-light"
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.9,
                  marginBottom: i < paragraphs.length - 1 ? "20px" : 0,
                }}
              >
                {p}
              </p>
            ))}
          </div>
        </section>
      )}

      {cat.themes.length > 0 && (
        <section className="bg-bg border-b border-surface-2 s-pad">
          <div className="container">
            <span className="eyebrow block mb-8">
              Themes you&apos;ll find here
            </span>
            <ul
              className={`grid grid-cols-1 ${cat.themes.length > 5 ? "sm:grid-cols-2" : ""} gap-4 list-none max-w-[760px]`}
            >
              {cat.themes.map((t) => (
                <li key={t} className="flex gap-3 items-start">
                  <span
                    style={{
                      display: "block",
                      width: "1px",
                      minHeight: "40px",
                      background: "var(--gold)",
                      flexShrink: 0,
                      marginTop: "4px",
                    }}
                  />
                  <span
                    className="text-muted font-light"
                    style={{ fontSize: "0.88rem", lineHeight: 1.8 }}
                  >
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-surface border-t border-surface-2 s-pad-sm">
        <div className="container">
          {notes.length > 0 ? (
            <div className="flex flex-col">
              {notes.map((note) => (
                <Link
                  key={note.slug}
                  href={`/writing/note/${note.slug}`}
                  className="blog-row"
                >
                  <div className="blog-row-meta">
                    <span className="eyebrow">{note.category}</span>
                    <span
                      className="text-dim font-light"
                      style={{
                        fontSize: "0.6rem",
                        letterSpacing: "0.18em",
                        marginTop: "6px",
                        display: "block",
                      }}
                    >
                      {note.date}
                    </span>
                  </div>
                  <div className="blog-row-body">
                    <h2
                      className="display text-text mb-3"
                      style={{ fontSize: "clamp(1.15rem, 2.2vw, 1.75rem)" }}
                    >
                      {note.title}
                    </h2>
                    <p
                      className="text-muted font-light"
                      style={{ fontSize: "0.85rem", lineHeight: 1.85 }}
                    >
                      {note.excerpt}
                    </p>
                  </div>
                  <span className="blog-row-arrow">→</span>
                </Link>
              ))}
            </div>
          ) : (
            <p
              className="text-dim font-light"
              style={{ fontSize: "0.88rem", lineHeight: 1.9, fontStyle: "italic" }}
            >
              First pieces coming soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
