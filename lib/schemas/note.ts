import { z } from "zod";

export const NoteBodySchema = z.object({
  title:         z.string().min(1, "Title is required"),
  category:      z.string().min(1, "Category is required"),
  date:          z.string().min(1, "Date is required"),
  excerpt:       z.string().min(1, "Excerpt is required"),
  body:          z.string().min(1, "Body is required"),
  featuredImage: z.string().optional(),
});

export type NoteBodyInput = z.infer<typeof NoteBodySchema>;

export function formatZodError(error: z.ZodError): string {
  return error.errors.map((e) => e.message).join(". ");
}
