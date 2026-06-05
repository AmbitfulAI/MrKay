import { defineField, defineType } from "sanity";

export const galleryImageSchema = defineType({
  name: "galleryImage",
  title: "Gallery",
  type: "document",
  fields: [
    defineField({ name: "title",    title: "Title",    type: "string", validation: (r) => r.required() }),
    defineField({ name: "caption",  title: "Caption",  type: "string" }),
    defineField({ name: "category", title: "Category", type: "string",
      options: { list: ["Portrait", "Professional", "Speaking", "Community", "Faith & Life"] },
    }),
    defineField({ name: "image",    title: "Image",    type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({ name: "span",     title: "Grid Span", type: "string",
      options: { list: [{ title: "Normal", value: "normal" }, { title: "Wide (2 columns)", value: "wide" }, { title: "Tall (2 rows)", value: "tall" }] },
      initialValue: "normal",
    }),
    defineField({ name: "order",    title: "Display Order", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "image" } },
});
