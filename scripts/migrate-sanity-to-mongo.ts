/**
 * Sanity → MongoDB migration script
 *
 * Pulls every content type from Sanity and upserts it into MongoDB.
 * Safe to re-run: existing documents are updated, new ones are inserted.
 *
 * Usage:
 *   npx tsx scripts/migrate-sanity-to-mongo.ts
 *
 * Requires .env.local with:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 *   SANITY_API_TOKEN, MONGODB_URI
 */

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import mongoose, { Schema } from "mongoose";
import * as fs from "fs";
import * as path from "path";

// ── Load .env.local ───────────────────────────────────────────────────────────
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([^#=\s][^=]*)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
  }
}

// ── Sanity client ─────────────────────────────────────────────────────────────
const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const imgBuilder = imageUrlBuilder(sanity);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function urlFor(source: any): string {
  if (!source?.asset?._ref) return "";
  return imgBuilder.image(source).url() ?? "";
}

// ── Portable Text → string[] ──────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ptToStrings(blocks: any[] = []): string[] {
  return blocks
    .filter((b) => b._type === "block")
    .map((b) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (b.children ?? []).map((c: any) => c.text ?? "").join("")
    )
    .filter(Boolean);
}

// ── MongoDB models (inline — no path alias needed for a script) ───────────────
function makeModel(name: string, schema: Schema) {
  return mongoose.models[name] ?? mongoose.model(name, schema);
}

const NoteCategoryModel = makeModel(
  "NoteCategory",
  new Schema({ title: String, slug: String, order: { type: Number, default: 99 } }, { timestamps: true })
);

const NoteModel = makeModel(
  "Note",
  new Schema(
    {
      title: String,
      slug: { type: String, unique: true },
      category: String,
      date: String,
      excerpt: String,
      featuredImage: { type: String, default: "" },
      body: { type: [String], default: [] },
    },
    { timestamps: true }
  )
);

const FaqModel = makeModel(
  "Faq",
  new Schema({ question: String, answer: String, order: { type: Number, default: 99 } }, { timestamps: true })
);

const TestimonialModel = makeModel(
  "Testimonial",
  new Schema(
    { quote: String, clientName: String, clientContext: { type: String, default: "" }, order: { type: Number, default: 99 }, pages: { type: [String], default: [] } },
    { timestamps: true }
  )
);

const SuccessStoryModel = makeModel(
  "SuccessStory",
  new Schema(
    { code: String, title: String, sector: String, client: String, result: String, story: String, order: { type: Number, default: 99 } },
    { timestamps: true }
  )
);

const ProductModel = makeModel(
  "Product",
  new Schema(
    {
      title: String, subtitle: String, type: String, description: String,
      price: String, priceNote: String, tag: String, selarUrl: { type: String, default: "" },
      available: { type: Boolean, default: true }, coverAccent: String, order: { type: Number, default: 99 },
    },
    { timestamps: true }
  )
);

const HeroSlideModel = makeModel(
  "HeroSlide",
  new Schema(
    {
      eyebrow: String, line1: String, line2: String, subtitle: String,
      imageUrl: { type: String, default: "" }, imagePos: { type: String, default: "center top" },
      primaryLabel: String, primaryHref: String, primaryCalendly: Boolean,
      secondaryLabel: String, secondaryHref: String, secondaryCalendly: Boolean,
      order: { type: Number, default: 99 },
    },
    { timestamps: true }
  )
);

const GalleryImageModel = makeModel(
  "GalleryImage",
  new Schema(
    { title: String, caption: String, category: String, imageUrl: String, alt: String, span: { type: String, default: "normal" }, order: { type: Number, default: 99 } },
    { timestamps: true }
  )
);

const ImpactOrgModel = makeModel(
  "ImpactOrg",
  new Schema(
    { name: String, category: String, role: String, since: String, description: String, url: String, active: Boolean, imageUrl: String, alt: String, order: { type: Number, default: 99 } },
    { timestamps: true }
  )
);

const SiteConfigModel = makeModel(
  "SiteConfig",
  new Schema(
    {
      _id: { type: String, default: "siteConfig" },
      calendlyUrl: String, contactEmail: String, footerTagline: String, footerBlurb: String,
      linkedInUrl: String, instagramUrl: String,
      statsBar: [{ _id: false, line: String, descriptor: String }],
    },
    { _id: false }
  )
);

// ── Helpers ───────────────────────────────────────────────────────────────────
function ok(label: string, n: number) {
  console.log(`  ✓  ${label}: ${n} upserted`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function upsertMany(model: mongoose.Model<any>, docs: any[], key: string) {
  if (!docs.length) { console.log(`  –  (no documents found in Sanity)`); return; }
  let count = 0;
  for (const doc of docs) {
    await model.findOneAndUpdate({ [key]: doc[key] }, doc, { upsert: true, new: true, setDefaultsOnInsert: true });
    count++;
  }
  return count;
}

// ── Migration functions ───────────────────────────────────────────────────────

async function migrateNoteCategories() {
  console.log("\n▸ Note Categories");
  const rows = await sanity.fetch<{ title: string; slug: { current: string }; order?: number }[]>(
    `*[_type == "noteCategory"] | order(order asc)`
  );
  const docs = rows.map((r, i) => ({ title: r.title, slug: r.slug?.current ?? r.title.toLowerCase().replace(/\s+/g, "-"), order: r.order ?? i + 1 }));
  const n = await upsertMany(NoteCategoryModel, docs, "slug");
  ok("NoteCategory", n ?? 0);
}

async function migrateNotes() {
  console.log("\n▸ Notes");
  const rows = await sanity.fetch<{
    title: string; slug: { current: string }; category?: { slug?: { current: string }; title?: string };
    date?: string; excerpt?: string; featuredImage?: unknown; body?: unknown[];
  }[]>(
    `*[_type == "note"] | order(date desc) { title, slug, category->{ slug, title }, date, excerpt, featuredImage, body }`
  );
  const docs = rows.map((r) => ({
    title: r.title,
    slug: r.slug?.current ?? "",
    category: r.category?.slug?.current ?? r.category?.title ?? "",
    date: r.date ?? new Date().toISOString().slice(0, 10),
    excerpt: r.excerpt ?? "",
    featuredImage: urlFor(r.featuredImage),
    body: ptToStrings(r.body as never[]),
  }));
  const n = await upsertMany(NoteModel, docs, "slug");
  ok("Note", n ?? 0);
}

async function migrateFaqs() {
  console.log("\n▸ FAQs");
  const rows = await sanity.fetch<{ question: string; answer: string; order?: number }[]>(
    `*[_type == "faq"] | order(order asc)`
  );
  const docs = rows.map((r, i) => ({ question: r.question, answer: r.answer, order: r.order ?? i + 1 }));
  // FAQs have no unique slug so match on question text
  const n = await upsertMany(FaqModel, docs, "question");
  ok("Faq", n ?? 0);
}

async function migrateTestimonials() {
  console.log("\n▸ Testimonials");
  const rows = await sanity.fetch<{ quote: string; clientName: string; clientContext?: string; order?: number; pages?: string[] }[]>(
    `*[_type == "testimonial"] | order(order asc)`
  );
  const docs = rows.map((r, i) => ({
    quote: r.quote,
    clientName: r.clientName,
    clientContext: r.clientContext ?? "",
    order: r.order ?? i + 1,
    pages: r.pages ?? [],
  }));
  const n = await upsertMany(TestimonialModel, docs, "quote");
  ok("Testimonial", n ?? 0);
}

async function migrateSuccessStories() {
  console.log("\n▸ Success Stories");
  const rows = await sanity.fetch<{ code?: string; title: string; sector?: string; client?: string; result?: string; story?: string; order?: number }[]>(
    `*[_type == "successStory"] | order(order asc)`
  );
  const docs = rows.map((r, i) => ({
    code: r.code ?? String(i + 1).padStart(2, "0"),
    title: r.title,
    sector: r.sector ?? "",
    client: r.client ?? "",
    result: r.result ?? "",
    story: r.story ?? "",
    order: r.order ?? i + 1,
  }));
  const n = await upsertMany(SuccessStoryModel, docs, "title");
  ok("SuccessStory", n ?? 0);
}

async function migrateProducts() {
  console.log("\n▸ Marketplace Products");
  const rows = await sanity.fetch<{
    title: string; subtitle?: string; type?: string; description?: string;
    price?: string; priceNote?: string; tag?: string; selarUrl?: string;
    available?: boolean; coverAccent?: string; order?: number;
  }[]>(
    `*[_type == "product"] | order(order asc)`
  );
  const docs = rows.map((r, i) => ({
    title: r.title,
    subtitle: r.subtitle ?? "",
    type: r.type ?? "",
    description: r.description ?? "",
    price: r.price ?? "",
    priceNote: r.priceNote ?? "",
    tag: r.tag ?? "",
    selarUrl: r.selarUrl ?? "",
    available: r.available ?? true,
    coverAccent: r.coverAccent ?? "",
    order: r.order ?? i + 1,
  }));
  const n = await upsertMany(ProductModel, docs, "title");
  ok("Product", n ?? 0);
}

async function migrateHeroSlides() {
  console.log("\n▸ Hero Slides");
  const rows = await sanity.fetch<{
    eyebrow?: string; line1: string; line2?: string; subtitle?: string;
    image?: unknown; imagePos?: string;
    primaryLabel?: string; primaryHref?: string; primaryCalendly?: boolean;
    secondaryLabel?: string; secondaryHref?: string; secondaryCalendly?: boolean;
    order?: number;
  }[]>(
    `*[_type == "heroSlide"] | order(order asc) { eyebrow, line1, line2, subtitle, image, imagePos, primaryLabel, primaryHref, primaryCalendly, secondaryLabel, secondaryHref, secondaryCalendly, order }`
  );
  const docs = rows.map((r, i) => ({
    eyebrow: r.eyebrow ?? "",
    line1: r.line1,
    line2: r.line2 ?? "",
    subtitle: r.subtitle ?? "",
    imageUrl: urlFor(r.image),
    imagePos: r.imagePos ?? "center top",
    primaryLabel: r.primaryLabel ?? "",
    primaryHref: r.primaryHref ?? "",
    primaryCalendly: r.primaryCalendly ?? false,
    secondaryLabel: r.secondaryLabel ?? "",
    secondaryHref: r.secondaryHref ?? "",
    secondaryCalendly: r.secondaryCalendly ?? false,
    order: r.order ?? i + 1,
  }));
  const n = await upsertMany(HeroSlideModel, docs, "line1");
  ok("HeroSlide", n ?? 0);
}

async function migrateGallery() {
  console.log("\n▸ Gallery Images");
  const rows = await sanity.fetch<{
    title?: string; caption?: string; category?: string;
    image?: unknown; alt?: string; span?: string; order?: number;
  }[]>(
    `*[_type == "galleryImage"] | order(order asc) { title, caption, category, image, alt, span, order }`
  );
  const docs = rows.map((r, i) => ({
    title: r.title ?? "",
    caption: r.caption ?? "",
    category: r.category ?? "General",
    imageUrl: urlFor(r.image),
    alt: r.alt ?? r.title ?? "",
    span: r.span ?? "normal",
    order: r.order ?? i + 1,
  }));
  const n = await upsertMany(GalleryImageModel, docs, "title");
  ok("GalleryImage", n ?? 0);
}

async function migrateImpactOrgs() {
  console.log("\n▸ Impact Organisations");
  const rows = await sanity.fetch<{
    name: string; category?: string; role?: string; since?: string;
    description?: string; url?: string; active?: boolean;
    image?: unknown; alt?: string; order?: number;
  }[]>(
    `*[_type == "impactOrg"] | order(order asc) { name, category, role, since, description, url, active, image, alt, order }`
  );
  const docs = rows.map((r, i) => ({
    name: r.name,
    category: r.category ?? "",
    role: r.role ?? "",
    since: r.since ?? "",
    description: r.description ?? "",
    url: r.url ?? "",
    active: r.active ?? true,
    imageUrl: urlFor(r.image),
    alt: r.alt ?? "",
    order: r.order ?? i + 1,
  }));
  const n = await upsertMany(ImpactOrgModel, docs, "name");
  ok("ImpactOrg", n ?? 0);
}

async function migrateSiteConfig() {
  console.log("\n▸ Site Config");
  const r = await sanity.fetch<{
    calendlyUrl?: string; contactEmail?: string; footerTagline?: string; footerBlurb?: string;
    linkedInUrl?: string; instagramUrl?: string;
    statsBar?: { line: string; descriptor: string }[];
  } | null>(
    `*[_type == "siteConfig" && _id == "siteConfig"][0]`
  );
  if (!r) { console.log("  –  (not found in Sanity)"); return; }
  await SiteConfigModel.findOneAndUpdate(
    { _id: "siteConfig" },
    {
      _id: "siteConfig",
      calendlyUrl:   r.calendlyUrl ?? "",
      contactEmail:  r.contactEmail ?? "",
      footerTagline: r.footerTagline ?? "",
      footerBlurb:   r.footerBlurb ?? "",
      linkedInUrl:   r.linkedInUrl ?? "",
      instagramUrl:  r.instagramUrl ?? "",
      statsBar: (r.statsBar ?? []).map(({ line, descriptor }) => ({ line, descriptor })),
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  ok("SiteConfig", 1);
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.error("✗  Missing Sanity env vars. Check .env.local.");
    process.exit(1);
  }
  if (!process.env.MONGODB_URI) {
    console.error("✗  Missing MONGODB_URI. Check .env.local.");
    process.exit(1);
  }

  console.log("Sanity → MongoDB migration");
  console.log(`Sanity project : ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`MongoDB        : ${process.env.MONGODB_URI?.split("@")[1] ?? "***"}\n`);

  await mongoose.connect(process.env.MONGODB_URI!);
  console.log("✓ MongoDB connected\n");

  await migrateSiteConfig();
  await migrateNoteCategories();
  await migrateNotes();
  await migrateFaqs();
  await migrateTestimonials();
  await migrateSuccessStories();
  await migrateProducts();
  await migrateHeroSlides();
  await migrateGallery();
  await migrateImpactOrgs();

  console.log("\n✓  Migration complete.");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("\n✗  Migration failed:", err.message);
  process.exit(1);
});
