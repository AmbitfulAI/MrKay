import { defineField, defineType } from "sanity";

export const faqSchema = defineType({
  name: "faq",
  title: "FAQs",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string",  validation: (r) => r.required() }),
    defineField({ name: "answer",   title: "Answer",   type: "text",   rows: 4, validation: (r) => r.required() }),
    defineField({ name: "order",    title: "Display Order", type: "number" }),
  ],
  preview: { select: { title: "question" } },
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
