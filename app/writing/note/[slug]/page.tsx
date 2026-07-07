import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getNoteBySlug as getStaticNoteBySlug, getRelatedNotes } from "@/lib/notes";
import { getNoteSlugs, getNoteBySlug } from "@/lib/data/notes";

import headshotImg  from "@/assets/KK Headshot_BW.jpg";
import execImg      from "@/assets/KK_Exec_bg.jpg";
import facecardImg  from "@/assets/KK_Facecard_BW.jpg";
import upperbodyImg from "@/assets/KK_Upperbody_BW.jpg";

export const revalidate = 60;
export const dynamicParams = true;

const imageMap = {
  headshot:  headshotImg,
  exec:      execImg,
  facecard:  facecardImg,
  upperbody: upperbodyImg,
};

export async function generateStaticParams() {
  return getNoteSlugs();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);
  if (!note) return {};
  return {
    title: `${note.title} — Writing · TheKayodeKolade`,
    description: note.excerpt,
  };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);
  if (!note) notFound();

  const related = getRelatedNotes(slug);

  const n = note as { featuredImage?: string; image?: "headshot" | "exec" | "facecard" | "upperbody" };
  const heroSrc = n.featuredImage ?? (n.image ? imageMap[n.image] : undefined);

  return (
    <NoteDetail
      title={note.title}
      category={note.category}
      date={note.date}
      excerpt={note.excerpt}
      body={note.body}
      heroSrc={heroSrc}
      heroAlt={note.title}
      related={related}
    />
  );
}

interface NoteDetailProps {
  title: string;
  category: string;
  date: string;
  excerpt: string;
  body: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heroSrc?: any;
  heroAlt: string;
  related: ReturnType<typeof getRelatedNotes>;
}

function NoteDetail({ title, category, date, excerpt, body, heroSrc, heroAlt, related }: NoteDetailProps) {
  return (
    <>
      {/* ── Header ── */}
      <section className="bg-bg border-b border-surface-2 s-pad-hero">
        <div className="container">
          <Link
            href="/writing"
            className="hover-gold"
            style={{ fontSize: "0.6rem", letterSpacing: "0.24em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "40px" }}
          >
            ← Writing
          </Link>
          <span className="eyebrow anim-fade-up block mb-6">{category}</span>
          <h1
            className="display text-text anim-fade-up anim-delay-1"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", lineHeight: 1.05, maxWidth: "820px", marginBottom: "28px" }}
          >
            {title}
          </h1>
          <span className="gold-rule anim-fade-up anim-delay-2" style={{ marginBottom: "24px" }} />
          <p
            className="text-dim font-light anim-fade-up anim-delay-3"
            style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
          >
            {date} &nbsp;·&nbsp; TheKayodeKolade
          </p>
        </div>
      </section>

      {/* ── Featured image ── */}
      {heroSrc && (
        <div style={{ width: "100%", aspectRatio: "21/8", position: "relative", overflow: "hidden", background: "var(--surface)" }}>
          <Image
            src={heroSrc}
            alt={heroAlt}
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center 20%", opacity: 0.75 }}
            sizes="100vw"
          />
          <div
            aria-hidden
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, transparent 60%, var(--bg) 100%)",
            }}
          />
        </div>
      )}

      {/* ── Body ── */}
      <section className="bg-bg s-pad">
        <div className="container">
          <div className="note-body">
            {excerpt && <p className="note-lead">{excerpt}</p>}
            <span className="gold-rule" style={{ margin: "40px 0" }} />
            {body.map((para, i) => (
              <p key={i} className="note-para">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Signature ── */}
      <section className="bg-surface border-t border-surface-2 s-pad-sm">
        <div className="container">
          <div style={{ maxWidth: "640px" }}>
            <span className="gold-rule" style={{ marginBottom: "28px" }} />
            <p className="text-dim font-light" style={{ fontSize: "0.82rem", lineHeight: 1.8, marginBottom: "8px" }}>
              Written by
            </p>
            <p className="display text-text" style={{ fontSize: "1.4rem" }}>TheKayodeKolade</p>
            <p className="text-dim font-light" style={{ fontSize: "0.78rem", marginTop: "6px", lineHeight: 1.7 }}>
              Advisor · Coach · Confidant
            </p>
          </div>
        </div>
      </section>

      {/* ── Related notes ── */}
      {related.length > 0 && (
        <section className="bg-bg border-t border-surface-2 s-pad-sm">
          <div className="container">
            <span className="eyebrow block mb-8">More Writing</span>
            <div className="flex flex-col">
              {related.map((r) => (
                <Link key={r.slug} href={`/writing/note/${r.slug}`} className="blog-row">
                  <div className="blog-row-meta">
                    <span className="eyebrow">{r.category}</span>
                    <span className="text-dim font-light" style={{ fontSize: "0.6rem", letterSpacing: "0.18em", marginTop: "6px", display: "block" }}>
                      {r.date}
                    </span>
                  </div>
                  <div className="blog-row-body">
                    <h3 className="display text-text mb-3" style={{ fontSize: "clamp(1.05rem, 2vw, 1.6rem)" }}>
                      {r.title}
                    </h3>
                    <p className="text-muted font-light" style={{ fontSize: "0.85rem", lineHeight: 1.85 }}>
                      {r.excerpt}
                    </p>
                  </div>
                  <span className="blog-row-arrow">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
