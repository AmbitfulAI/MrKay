import { z } from "zod";

const ContentBlockSchema = z.object({
  type:    z.enum(["text", "image"]),
  content: z.string(),
  caption: z.string().optional(),
});

export const NoteBodySchema = z.object({
  title:         z.string().min(1, "Title is required"),
  category:      z.string().min(1, "Category is required"),
  date:          z.string().min(1, "Date is required"),
  excerpt:       z.string().min(1, "Excerpt is required"),
  featuredImages: z.array(z.string()).optional(),
  contentBlocks: z.array(ContentBlockSchema).optional(),
});

export type NoteBodyInput = z.infer<typeof NoteBodySchema>;

export function formatZodError(error: z.ZodError): string {
  return error.issues.map((e) => e.message).join(". ");
}
