import Link from "next/link";
import { HeroSlideForm } from "../HeroSlideForm";

export default function NewHeroSlide() {
  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ marginBottom: "36px" }}>
        <Link href="/admin/hero-slides" style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", textDecoration: "none" }}>← Hero Slides</Link>
        <h1 className="display text-text" style={{ fontSize: "1.8rem", marginTop: "16px" }}>Add Slide</h1>
      </div>
      <HeroSlideForm />
    </div>
  );
}
