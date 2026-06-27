import { defineField, defineType } from "sanity";

export const testimonialSchema = defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({ name: "quote",         title: "Quote",          type: "text",   rows: 4, validation: (r) => r.required() }),
    defineField({ name: "clientName",    title: "Client Name",    type: "string", description: "e.g. CEO, Managing Director" }),
    defineField({ name: "clientContext", title: "Client Context", type: "string", description: "e.g. Financial Services, West Africa" }),
    defineField({ name: "order",         title: "Display Order",  type: "number" }),
    defineField({
      name: "pages",
      title: "Show on Pages",
      type: "array",
      of: [{ type: "string" }],
      description: "Which service pages should include this testimonial",
      options: {
        list: [
          { title: "Homepage",                value: "home" },
          { title: "Career Clarity",          value: "career-clarity" },
          { title: "Organisational Systems",  value: "organisational-systems" },
          { title: "My Story",                value: "my-story" },
          { title: "Founder Architecture",    value: "founder-architecture" },
          { title: "Workshops & Speaking",    value: "workshops-speaking" },
          { title: "Testimonials Page",       value: "testimonials" },
        ],
      },
    }),
  ],
  preview: { select: { title: "clientName", subtitle: "clientContext" } },
});

export const successStorySchema = defineType({
  name: "successStory",
  title: "Success Stories",
  type: "document",
  fields: [
    defineField({ name: "code",   title: "Code",   type: "string", description: "e.g. 01, 02", validation: (r) => r.required() }),
    defineField({ name: "title",  title: "Title",  type: "string", validation: (r) => r.required() }),
    defineField({ name: "sector", title: "Sector", type: "string", validation: (r) => r.required() }),
    defineField({ name: "client", title: "Client Description", type: "string" }),
    defineField({ name: "result", title: "Key Result (one line)", type: "string" }),
    defineField({ name: "story",  title: "Full Story", type: "text", rows: 6, validation: (r) => r.required() }),
    defineField({ name: "order",  title: "Display Order", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "sector" } },
});
