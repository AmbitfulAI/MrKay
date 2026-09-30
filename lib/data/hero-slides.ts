import { connectDB } from "@/lib/db";
import { HeroSlide } from "@/lib/models/HeroSlide";
import type { SanitySlide } from "@/components/HeroSlider";

interface DBHeroSlide extends Omit<SanitySlide, "_id"> {
  _id: unknown;
}

export async function getHeroSlides(): Promise<SanitySlide[]> {
  await connectDB();
  const slides = await HeroSlide.find()
    .sort({ order: 1 })
    .lean<DBHeroSlide[]>()
    .catch(() => []);
  return slides.map((s) => ({
    _id: String(s._id),
    eyebrow: s.eyebrow,
    line1: s.line1,
    line2: s.line2,
    subtitle: s.subtitle,
    imageUrl: s.imageUrl,
    imagePos: s.imagePos,
    primaryLabel: s.primaryLabel,
    primaryHref: s.primaryHref,
    primaryCalendly: s.primaryCalendly,
    secondaryLabel: s.secondaryLabel,
    secondaryHref: s.secondaryHref,
    secondaryCalendly: s.secondaryCalendly,
  }));
}
