import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import type { GalleryImage } from "@/components/GalleryGrid";
import CalendlyButton from "@/components/CalendlyButton";
import { sanityFetch } from "@/lib/sanity-fetch";
import { galleryQuery } from "@/sanity/queries";
import { urlFor } from "@/lib/image-url";

import headshotImg  from "@/assets/KK Headshot_BW.jpg";
import execImg      from "@/assets/KK_Exec_bg.jpg";
import facecardImg  from "@/assets/KK_Facecard_BW.jpg";
import upperbodyImg from "@/assets/KK_Upperbody_BW.jpg";

export const revalidate = 60;

const images: GalleryImage[] = [
  {
    src: facecardImg,
    alt: "TheKayodeKolade — Portrait",
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
    alt: "TheKayodeKolade — Upper Body",
    title: "Present",
    caption: "Stillness before the session.",
    category: "Portrait",
    span: "normal",
  },
  {
    src: headshotImg,
    alt: "TheKayodeKolade — Headshot",
    title: "TheKayodeKolade",
    caption: "Advisor · Coach · Confidant",
    category: "Professional",
    span: "normal",
  },
];

const staticCategories = ["All", "Portrait", "Professional"];

interface SanityGalleryImage {
  _id: string;
  title: string;
  caption?: string;
  category?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  span?: "wide" | "tall" | "normal";
}

export default async function Gallery() {
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
    : images;

  const activeCategories = sanityImages.length > 0
    ? ["All", ...Array.from(new Set(sanityImages.map((i) => i.category).filter(Boolean) as string[]))]
    : staticCategories;

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The Person Behind the Practice."
        subtitle="A visual record — professional, personal, and everything in between. More images added as the journey continues."
      />

      <GalleryGrid images={activeImages} categories={activeCategories} />

      {/* ── CTA ── */}
      <section className="bg-surface border-t border-surface-2 s-pad-sm">
        <div className="container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          <div>
            <span className="eyebrow block mb-4">Work Together</span>
            <h3 className="display text-text" style={{ fontSize: "clamp(1.3rem, 2.5vw, 2.2rem)" }}>
              Ready to connect with the person behind the work?
            </h3>
          </div>
          <CalendlyButton className="btn-solid shrink-0">Let's Talk</CalendlyButton>
        </div>
      </section>
    </>
  );
}
