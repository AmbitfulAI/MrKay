import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";
import { getGalleryImages, getGalleryCategories } from "@/lib/data/gallery";

import execImg     from "@/assets/KK_Exec_bg.jpg";
import facecardImg from "@/assets/KK_Facecard_BW.jpg";
import upperbodyImg from "@/assets/KK_Upperbody_BW.jpg";
import headshotImg from "@/assets/KK Headshot_BW.jpg";

export const revalidate = 60;

export const metadata = {
  title: "Visual Diary — TheKayodeKolade",
  description: "Photography is my quiet language. Stories of places, people, textures, cultures, and everyday moments. Welcome to the archive.",
};

const staticImages = [
  { src: facecardImg,   alt: "TheKayodeKolade",                    title: "The Advisor",     caption: "In conversation — the posture that defines the work.", category: "Portrait"     },
  { src: execImg,       alt: "TheKayodeKolade — Executive Setting", title: "In the Room",     caption: "Where the real decisions get made.",                   category: "Professional" },
  { src: upperbodyImg,  alt: "TheKayodeKolade",                    title: "Present",         caption: "Stillness before the session.",                        category: "Portrait"     },
  { src: headshotImg,   alt: "TheKayodeKolade",                    title: "TheKayodeKolade", caption: "Advisor · Architect · Coach",                          category: "Professional" },
];

export default async function VisualDiary() {
  const [dbImages, categories] = await Promise.all([
    getGalleryImages(),
    getGalleryCategories(),
  ]);

  const images = dbImages.length
    ? dbImages.map((img) => ({ ...img, src: img.imageUrl ?? execImg }))
    : staticImages;

  return (
    <>
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

      <GalleryGrid images={images} categories={categories} />

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
