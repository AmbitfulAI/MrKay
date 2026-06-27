import GalleryGrid from "@/components/GalleryGrid";
import type { GalleryImage } from "@/components/GalleryGrid";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity-fetch";
import { galleryQuery } from "@/sanity/queries";
import { urlFor } from "@/lib/image-url";

import execImg      from "@/assets/KK_Exec_bg.jpg";
import facecardImg  from "@/assets/KK_Facecard_BW.jpg";
import upperbodyImg from "@/assets/KK_Upperbody_BW.jpg";
import headshotImg  from "@/assets/KK Headshot_BW.jpg";

export const revalidate = 60;

export const metadata = {
  title: "Visual Diary — TheKayodeKolade",
  description: "Photography is my quiet language. Stories of places, people, textures, cultures, and everyday moments. Welcome to the archive.",
};

const staticImages: GalleryImage[] = [
  {
    src: facecardImg,
    alt: "TheKayodeKolade",
    title: "The Advisor",
    caption: "In conversation — the posture that defines the work.",
    category: "Portrait",
    span: "tall",
  },
  {
    src: execImg,
    alt: "TheKayodeKolade — Executive Setting",
    title: "In the Room",
    caption: "Where the real decisions get made.",
    category: "Professional",
    span: "wide",
  },
  {
    src: upperbodyImg,
    alt: "TheKayodeKolade",
    title: "Present",
    caption: "Stillness before the session.",
    category: "Portrait",
    span: "normal",
  },
  {
    src: headshotImg,
    alt: "TheKayodeKolade",
    title: "TheKayodeKolade",
    caption: "Advisor · Architect · Coach",
    category: "Professional",
    span: "normal",
  },
];

interface SanityGalleryImage {
  _id: string;
  title: string;
  caption?: string;
  category?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  span?: "wide" | "tall" | "normal";
}

export default async function VisualDiary() {
  const sanityImages = await sanityFetch<SanityGalleryImage>(galleryQuery);

  const activeImages: GalleryImage[] = sanityImages.length > 0
    ? sanityImages.map((img) => ({
        src: img.image ? urlFor(img.image).width(800).url() : execImg,
        alt: img.image?.alt ?? img.title,
        title: img.title,
        caption: img.caption,
        category: img.category ?? "General",
        span: img.span ?? "normal",
      }))
    : staticImages;

  const activeCategories = sanityImages.length > 0
    ? ["All", ...Array.from(new Set(sanityImages.map((i) => i.category).filter(Boolean) as string[]))]
    : ["All", "Portrait", "Professional"];

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-bg border-b border-surface-2" style={{ paddingTop: "clamp(80px, 12vw, 140px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}>
        <div className="container">
          <span className="eyebrow block mb-6" style={{ color: "var(--gold)" }}>#GeniusMinedWorks</span>
          <h1 className="display text-text max-w-[860px]" style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", lineHeight: 0.97 }}>
            The Visual Diary.
          </h1>
          <span className="gold-rule" style={{ marginTop: "32px", marginBottom: "32px" }} />
          <p className="text-muted font-light max-w-[580px]" style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)", lineHeight: 1.9 }}>
            Photography is my quiet language. Through these images, I tell stories of places, people, textures, cultures, and everyday moments that hold more meaning than words often can. From quiet corners of cities to the vibrancy of markets — welcome to the archive.
          </p>
        </div>
      </section>

      {/* ── Gallery ── */}
      <GalleryGrid images={activeImages} categories={activeCategories} />

      {/* ── Soft handoff ── */}
      <section className="bg-surface border-t border-surface-2 s-pad-sm">
        <div className="container">
          <p className="text-dim font-light" style={{ fontSize: "0.85rem", lineHeight: 1.9 }}>
            More from the human behind the work?{" "}
            <Link href="/beyond-the-work" className="hover-gold">
              Return to Beyond the Work →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
