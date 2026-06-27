import { connectDB } from "@/lib/db";
import { HeroSlide } from "@/lib/models/HeroSlide";
import type { SanitySlide } from "@/components/HeroSlider";

export async function getHeroSlides(): Promise<SanitySlide[]> {
  await connectDB();
  return HeroSlide.find().sort({ order: 1 }).lean<SanitySlide[]>().catch(() => []);
}
