import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { NoteCategory } from "@/lib/models/NoteCategory";

export const revalidate = 60;

interface Category {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  themes: string[];
}

export async function generateStaticParams() {
  await connectDB();
  const cats = await NoteCategory.find({ type: "writing" })
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
  const cat = await NoteCategory.findOne({ slug, type: "writing" })
    .lean<Category>()
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
  const cat = await NoteCategory.findOne({ slug, type: "writing" })
    .lean<Category>()
    .catch(() => null);
  if (!cat) notFound();

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
        <section className="bg-bg s-pad">
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
          <p
            className="text-dim font-light"
            style={{
              fontSize: "0.88rem",
              lineHeight: 1.9,
              fontStyle: "italic",
            }}
          >
            First pieces coming soon.
          </p>
        </div>
      </section>
    </>
  );
}
