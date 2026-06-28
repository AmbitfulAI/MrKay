import { connectDB } from "@/lib/db";
import { Testimonial } from "@/lib/models/Testimonial";

export interface QuoteItem {
  quote: string;
  name: string;
  context: string;
}

interface DBQuote {
  quote: string;
  clientName?: string;
  clientContext?: string;
}

function mapQuote(t: DBQuote): QuoteItem {
  return { quote: t.quote, name: t.clientName ?? "", context: t.clientContext ?? "" };
}

export async function getTestimonialsByPage(
  page: string,
  fallback: QuoteItem[] = []
): Promise<QuoteItem[]> {
  await connectDB();
  const results = await Testimonial
    .find({ pages: page })
    .sort({ order: 1 })
    .lean<DBQuote[]>()
    .catch(() => []);
  return results.length ? results.map(mapQuote) : fallback;
}

export async function getAllTestimonials(fallback: QuoteItem[] = []): Promise<QuoteItem[]> {
  await connectDB();
  const results = await Testimonial
    .find()
    .sort({ order: 1 })
    .lean<DBQuote[]>()
    .catch(() => []);
  return results.length ? results.map(mapQuote) : fallback;
}
