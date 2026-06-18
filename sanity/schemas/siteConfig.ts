import { defineField, defineType } from "sanity";

export const siteConfigSchema = defineType({
  name: "siteConfig",
  title: "Site Configuration",
  type: "document",
  // Singleton — seeded with _id: "siteConfig". Only one document should exist.
  fields: [
    defineField({
      name: "calendlyUrl",
      title: "Calendly URL",
      type: "url",
      description: "e.g. https://calendly.com/thekayodekolade",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      description: "Used in footer and contact page",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "footerTagline",
      title: "Footer Tagline",
      type: "string",
      description: "Bottom-right of footer, e.g. Executive Operating System Architect · Fractional COO · Coach",
    }),
    defineField({
      name: "footerBlurb",
      title: "Footer Brand Blurb",
      type: "text",
      rows: 2,
      description: "Short sentence under the logo in the footer",
    }),
    defineField({
      name: "linkedInUrl",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "statsBar",
      title: "Stats Bar (Homepage)",
      type: "array",
      description: "Four stat blocks shown below the hero",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "line",       title: "Stat Value",       type: "string", description: "e.g. 15+ Years" }),
            defineField({ name: "descriptor", title: "Stat Description", type: "string", description: "e.g. Leadership, Transformation & Systems Building" }),
          ],
          preview: { select: { title: "line", subtitle: "descriptor" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site Configuration" }) },
});
