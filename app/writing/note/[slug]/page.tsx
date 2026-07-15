import { notFound } from "next/navigation";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { formatNoteDate, estimateReadTime, type ContentBlock, type Note } from "@/lib/notes";
import { getNoteBySlug, getRelatedNotes } from "@/lib/data/notes";
import { FeaturedImageCarousel } from "./FeaturedImageCarousel";

import headshotImg from "@/assets/KK Headshot_BW.jpg";
import execImg from "@/assets/KK_Exec_bg.jpg";
import facecardImg from "@/assets/KK_Facecard_BW.jpg";
import upperbodyImg from "@/assets/KK_Upperbody_BW.jpg";

export const revalidate = 60;
export const dynamicParams = true;

const imageMap = {
  headshot: headshotImg,
  exec: execImg,
  facecard: facecardImg,
  upperbody: upperbodyImg,
};

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);
  if (!note) return {};
  return {
    title: `${note.title} — Writing · TheKayodeKolade`,
    description: note.excerpt,
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);

  if (!note) notFound();

  const related = await getRelatedNotes(slug, 3, note._categoryId);

  const n = note as {
    featuredImages?: string[];
    image?: "headshot" | "exec" | "facecard" | "upperbody";
    contentBlocks?: ContentBlock[];
  };
  const images = (n.featuredImages ?? []).filter(Boolean);
  const staticSrc =
    images.length === 0 && n.image ? imageMap[n.image] : undefined;

  return (
    <NoteDetail
      title={note.title}
      category={note.category}
      date={formatNoteDate(note.date)}
      readTime={estimateReadTime(n.contentBlocks ?? [])}
      excerpt={note.excerpt}
      contentBlocks={n.contentBlocks ?? []}
      images={images}
      staticSrc={staticSrc}
      heroAlt={note.title}
      related={related}
    />
  );
}

interface NoteDetailProps {
  title: string;
  category: string;
  date: string;
  readTime: number;
  excerpt: string;
  contentBlocks: ContentBlock[];
  images: string[];
  staticSrc?: StaticImageData;
  heroAlt: string;
  related: Note[];
}

function NoteDetail({
  title,
  category,
  date,
  readTime,
  excerpt,
  contentBlocks,
  images,
  staticSrc,
  heroAlt,
  related,
}: NoteDetailProps) {
  return (
    <>
      {/* ── Hero Section ── */}
      <section
        className="relative flex flex-col justify-end"
        style={{ minHeight: "100vh", paddingBottom: "5rem" }}
      >
        {/* Background Image(s) */}
        <div className="absolute inset-0 z-0 bg-surface">
          {images.length > 1 ? (
            <FeaturedImageCarousel images={images} />
          ) : images.length === 1 ? (
            <Image
              src={images[0]}
              alt={heroAlt}
              fill
              unoptimized
              priority
              style={{ objectFit: "cover", objectPosition: "center 20%" }}
              sizes="100vw"
            />
          ) : staticSrc ? (
            <Image
              src={staticSrc}
              alt={heroAlt}
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center 20%" }}
              sizes="100vw"
            />
          ) : null}

          {/* Gradient Overlay */}
          <div className="note-hero-gradient absolute inset-0 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="note-hero-content container relative z-10 pt-32">
          <Link
            href="/writing"
            className="hover-gold"
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "40px",
            }}
          >
            ← Writing
          </Link>

          <span className="eyebrow anim-fade-up block mb-6">{category}</span>

          <h1
            className="display text-text anim-fade-up anim-delay-1"
            style={{
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
              lineHeight: 1.1,
              marginBottom: "24px",
            }}
          >
            {title}
          </h1>

          <p
            className="text-dim font-light anim-fade-up anim-delay-2"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {date} &nbsp;·&nbsp; {readTime} min read &nbsp;·&nbsp; TheKayodeKolade
          </p>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="bg-bg s-pad-md">
        <div className="container">
          <div className="note-body">
            {excerpt && <p className="note-lead">{excerpt}</p>}
            <span className="gold-rule" style={{ margin: "40px 0" }} />
            {contentBlocks.map((block, bi) => {
              if (block.type === "image") {
                return (
                  <div key={bi} className="note-inline-image">
                    <Image
                      src={block.content}
                      alt={block.caption || title}
                      width={0}
                      height={0}
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 680px"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                    {block.caption && (
                      <p className="note-inline-caption">{block.caption}</p>
                    )}
                  </div>
                );
              }
              if (block.type === "heading") {
                const Tag = `h${block.level ?? 2}` as "h2" | "h3" | "h4";
                return (
                  <Tag
                    key={bi}
                    className="note-heading"
                    dangerouslySetInnerHTML={{ __html: block.content }}
                  />
                );
              }
              if (block.type === "quote") {
                return (
                  <blockquote key={bi} className="note-quote">
                    <p dangerouslySetInnerHTML={{ __html: block.content }} />
                    {block.caption && <cite>{block.caption}</cite>}
                  </blockquote>
                );
              }
              if (block.type === "list") {
                const List = block.style === "ordered" ? "ol" : "ul";
                return (
                  <List key={bi} className="note-list">
                    {(block.items ?? []).map((item, ii) => (
                      <li key={ii} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </List>
                );
              }
              if (block.type === "delimiter") {
                return <div key={bi} className="note-delimiter" />;
              }
              return (
                <p
                  key={bi}
                  className="note-para"
                  dangerouslySetInnerHTML={{ __html: block.content }}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Related Notes ── */}
      {related.length > 0 && (
        <section className="bg-surface border-t border-surface-2 s-pad-sm">
          <div className="container">
            <span className="eyebrow block mb-10">Continue Reading</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/writing/note/${r.slug}`}
                  className="note-related-card"
                >
                  <span className="gold-rule" style={{ marginBottom: "24px" }} />
                  <span className="eyebrow" style={{ marginBottom: "14px" }}>{r.category}</span>
                  <h3
                    className="display text-text"
                    style={{
                      fontSize: "clamp(1rem, 1.6vw, 1.4rem)",
                      lineHeight: 1.15,
                      marginBottom: "12px",
                    }}
                  >
                    {r.title}
                  </h3>
                  <p
                    className="text-dim font-light"
                    style={{
                      fontSize: "0.8rem",
                      lineHeight: 1.75,
                      flex: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {r.excerpt}
                  </p>
                  <p
                    className="text-dim"
                    style={{
                      fontSize: "0.58rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      marginTop: "24px",
                    }}
                  >
                    {formatNoteDate(r.date)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
