import { defineField, defineType } from "sanity";

export const heroSlideSchema = defineType({
  name: "heroSlide",
  title: "Hero Slides",
  type: "document",
  fields: [
    defineField({ name: "eyebrow",          title: "Eyebrow Text",       type: "string",  validation: (r) => r.required() }),
    defineField({ name: "line1",            title: "Headline Line 1",    type: "string",  validation: (r) => r.required() }),
    defineField({ name: "line2",            title: "Headline Line 2 (gold italic)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subtitle",         title: "Subtitle Paragraph", type: "text",   rows: 4, validation: (r) => r.required() }),
    defineField({ name: "image",            title: "Background Image",   type: "image",  options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "imagePos",         title: "Image Position (CSS)", type: "string", description: "e.g. center top, center 20%", initialValue: "center top" }),
    defineField({ name: "primaryLabel",     title: "Primary CTA Label",  type: "string",  validation: (r) => r.required() }),
    defineField({ name: "primaryHref",      title: "Primary CTA Link",   type: "string",  description: "Leave blank if Calendly" }),
    defineField({ name: "primaryCalendly",  title: "Primary Opens Calendly?", type: "boolean", initialValue: false }),
    defineField({ name: "secondaryLabel",   title: "Secondary CTA Label", type: "string" }),
    defineField({ name: "secondaryHref",    title: "Secondary CTA Link",  type: "string", description: "Leave blank if Calendly" }),
    defineField({ name: "secondaryCalendly", title: "Secondary Opens Calendly?", type: "boolean", initialValue: false }),
    defineField({ name: "order",            title: "Display Order",       type: "number",  validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "eyebrow", subtitle: "line1" },
  },
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
