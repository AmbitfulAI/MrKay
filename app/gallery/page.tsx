import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import type { GalleryImage } from "@/components/GalleryGrid";
import CalendlyButton from "@/components/CalendlyButton";
import { getGalleryImages } from "@/lib/data/gallery";

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

export default async function Gallery() {
  const dbImages = await getGalleryImages();

  const activeImages: GalleryImage[] = dbImages.length > 0
    ? dbImages.map((img) => ({
        src: img.imageUrl ?? execImg,
        alt: img.alt,
        title: img.title,
        caption: img.caption,
        category: img.category,
        span: img.span,
      }))
    : images;

  const activeCategories = dbImages.length > 0
    ? ["All", ...Array.from(new Set(dbImages.map((i) => i.category)))]
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
          <div className="flex flex-wrap gap-4">
            <CalendlyButton className="btn-solid">Let's Talk</CalendlyButton>
            <a href="/marketplace" className="btn-outline shrink-0">Visit the Marketplace</a>
          </div>
        </div>
      </section>
    </>
  );
}
