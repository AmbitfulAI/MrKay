import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import type { GalleryImage } from "@/components/GalleryGrid";
import CalendlyButton from "@/components/CalendlyButton";

import headshotImg  from "@/assets/KK Headshot_BW.jpg";
import execImg      from "@/assets/KK_Exec_bg.jpg";
import facecardImg  from "@/assets/KK_Facecard_BW.jpg";
import upperbodyImg from "@/assets/KK_Upperbody_BW.jpg";

const images: GalleryImage[] = [
  {
    src: facecardImg,
    alt: "MrKay — Portrait",
    title: "The Advisor",
    caption: "In conversation — the posture that defines the work.",
    category: "Portrait",
    span: "tall",
  },
  {
    src: execImg,
    alt: "MrKay — Executive Setting",
    title: "In the Room",
    caption: "Where the real decisions get made.",
    category: "Professional",
    span: "wide",
  },
  {
    src: upperbodyImg,
    alt: "MrKay — Upper Body",
    title: "Present",
    caption: "Stillness before the session.",
    category: "Portrait",
    span: "normal",
  },
  {
    src: headshotImg,
    alt: "MrKay — Headshot",
    title: "MrKay",
    caption: "Advisor · Coach · Confidant",
    category: "Professional",
    span: "normal",
  },
];

const categories = ["All", "Portrait", "Professional"];

export default function Gallery() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The Person Behind the Practice."
        subtitle="A visual record — professional, personal, and everything in between. More images added as the journey continues."
      />

      <GalleryGrid images={images} categories={categories} />

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
