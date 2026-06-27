import { connectDB } from "@/lib/db";
import { Faq } from "@/lib/models/Faq";

export interface FaqItem {
  question: string;
  answer: string;
}

export async function getFaqs(fallback: FaqItem[] = []): Promise<FaqItem[]> {
  await connectDB();
  const results = await Faq
    .find()
    .sort({ order: 1 })
    .lean<FaqItem[]>()
    .catch(() => []);
  return results.length ? results : fallback;
}
