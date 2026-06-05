import { defineField, defineType } from "sanity";

export const noteSchema = defineType({
  name: "note",
  title: "My Notes",
  type: "document",
  fields: [
    defineField({ name: "title",    title: "Title",    type: "string",   validation: (r) => r.required() }),
    defineField({ name: "slug",     title: "Slug",     type: "slug",     options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "category", title: "Category", type: "string",
      options: { list: ["Leadership", "Board Work", "Strategy", "Media & Speaking", "Faith & Life", "Creative"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "date",     title: "Date",     type: "string",   placeholder: "e.g. May 2026", validation: (r) => r.required() }),
    defineField({ name: "excerpt",  title: "Excerpt",  type: "text",     rows: 3, validation: (r) => r.required() }),
    defineField({ name: "featuredImage", title: "Featured Image", type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({ name: "body",     title: "Body",     type: "array",
      of: [{ type: "block" }],
      validation: (r) => r.required(),
    }),
  ],
  orderings: [{ title: "Date, Newest", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "category" } },
});
