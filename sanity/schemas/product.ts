import { defineField, defineType } from "sanity";

export const productSchema = defineType({
  name: "product",
  title: "Marketplace",
  type: "document",
  fields: [
    defineField({ name: "title",       title: "Title",       type: "string", validation: (r) => r.required() }),
    defineField({ name: "subtitle",    title: "Subtitle",    type: "string" }),
    defineField({ name: "type",        title: "Type",        type: "string",
      options: { list: [{ title: "Book", value: "Book" }, { title: "Course", value: "Course" }] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "price",       title: "Price",       type: "string", description: "e.g. $24.99" }),
    defineField({ name: "priceNote",   title: "Price Note",  type: "string", description: "e.g. Digital + Print available" }),
    defineField({ name: "tag",         title: "Tag",         type: "string", description: "e.g. Bestseller, New, Coming Soon" }),
    defineField({ name: "selarUrl",    title: "Selar URL",   type: "url",    description: "Product checkout link on Selar" }),
    defineField({ name: "available",   title: "Available",   type: "boolean", initialValue: true }),
    defineField({ name: "coverAccent", title: "Cover Gradient", type: "string", description: "CSS gradient for book cover background" }),
    defineField({ name: "order",       title: "Display Order", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "type" } },
});
