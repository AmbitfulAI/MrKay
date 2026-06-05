import { defineField, defineType } from "sanity";

export const impactOrgSchema = defineType({
  name: "impactOrg",
  title: "Impact — Organisations",
  type: "document",
  fields: [
    defineField({ name: "name",        title: "Organisation Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "category",    title: "Category",          type: "string", validation: (r) => r.required() }),
    defineField({ name: "role",        title: "Role",              type: "string" }),
    defineField({ name: "since",       title: "Since (year)",      type: "string" }),
    defineField({ name: "description", title: "Description",       type: "text", rows: 4 }),
    defineField({ name: "url",         title: "Organisation URL",  type: "url" }),
    defineField({ name: "active",      title: "Currently Active",  type: "boolean", initialValue: true }),
    defineField({ name: "image",       title: "Proof-of-Work Image", type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({ name: "order",       title: "Display Order",     type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "category", media: "image" } },
});
