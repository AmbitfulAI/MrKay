import { groq } from "next-sanity";

// ── Site Config (singleton) ────────────────────────────────────────────
export const siteConfigQuery = groq`*[_type == "siteConfig"][0] {
  calendlyUrl,
  contactEmail,
  footerTagline,
  footerBlurb,
  linkedInUrl,
  instagramUrl,
  statsBar[] { line, descriptor }
}`;

// ── Hero Slides ────────────────────────────────────────────────────────
export const heroSlidesQuery = groq`*[_type == "heroSlide"] | order(order asc) {
  _id,
  eyebrow,
  line1,
  line2,
  subtitle,
  "imageUrl": image.asset->url,
  imagePos,
  primaryLabel,
  primaryHref,
  primaryCalendly,
  secondaryLabel,
  secondaryHref,
  secondaryCalendly,
  order
}`;

// ── FAQs ───────────────────────────────────────────────────────────────
export const faqsQuery = groq`*[_type == "faq"] | order(order asc) {
  _id,
  question,
  answer,
  order
}`;

// ── Testimonials by page ───────────────────────────────────────────────
export const testimonialsForPageQuery = groq`*[_type == "testimonial" && $page in pages] | order(order asc) {
  _id,
  quote,
  clientName,
  clientContext,
  order
}`;

// ── Notes ──────────────────────────────────────────────────────────────
export const notesQuery = groq`*[_type == "note"] | order(date desc) {
  _id,
  title,
  "slug": slug.current,
  category,
  date,
  excerpt,
  featuredImage,
  "blocks": body[_type == "block"]{ children[]{ text }, style }
}`;

export const noteBySlugQuery = groq`*[_type == "note" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  category,
  date,
  excerpt,
  featuredImage,
  "blocks": body[_type == "block"]{ children[]{ text }, style }
}`;

export const noteCategoriesQuery = groq`*[_type == "noteCategory"] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  order
}`;

export const noteSlugsQuery = groq`*[_type == "note"]{ "slug": slug.current }`;

// ── Testimonials ───────────────────────────────────────────────────────
export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc) {
  _id,
  quote,
  clientName,
  clientContext,
  order
}`;

export const successStoriesQuery = groq`*[_type == "successStory"] | order(order asc) {
  _id,
  code,
  title,
  sector,
  client,
  result,
  story,
  order
}`;

// ── Marketplace ────────────────────────────────────────────────────────
export const productsQuery = groq`*[_type == "product"] | order(order asc) {
  _id,
  title,
  subtitle,
  type,
  description,
  price,
  priceNote,
  tag,
  selarUrl,
  available,
  coverAccent,
  order
}`;

// ── Gallery ────────────────────────────────────────────────────────────
export const galleryQuery = groq`*[_type == "galleryImage"] | order(order asc) {
  _id,
  title,
  caption,
  category,
  image { asset, hotspot, crop, alt },
  span,
  order
}`;

// ── Impact ─────────────────────────────────────────────────────────────
export const impactOrgsQuery = groq`*[_type == "impactOrg"] | order(order asc) {
  _id,
  name,
  category,
  role,
  since,
  description,
  url,
  active,
  image { asset, hotspot, crop, alt },
  order
}`;
