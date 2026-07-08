import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { Note } from "@/lib/models/Note";
import { Category } from "@/lib/models/Category";

const ObjectIdPattern = /^[a-f\d]{24}$/i;

const NoteRawSchema = z.object({
  _id:      z.string(),
  category: z.string(),
});

const MigrationResultSchema = z.object({
  migrated: z.number(),
  skipped:  z.number(),
  failed:   z.array(z.string()),
});

export async function POST() {
  await connectDB();

  const raw = await Note.find()
    .lean()
    .then((docs) =>
      docs.map((d) => ({
        _id:      String(d._id),
        category: String((d as { category: unknown }).category),
      }))
    );

  const notes = z.array(NoteRawSchema).parse(raw);

  let migrated = 0;
  let skipped  = 0;
  const failed: string[] = [];

  for (const note of notes) {
    if (ObjectIdPattern.test(note.category)) {
      skipped++;
      continue;
    }

    const cat = await Category.findOne({ title: note.category })
      .lean<{ _id: unknown; slug: string }>()
      .catch(() => null);

    if (!cat) {
      failed.push(`note ${note._id} — category "${note.category}" not found`);
      continue;
    }

    await Note.findByIdAndUpdate(note._id, { $set: { category: cat._id } });
    migrated++;
  }

  const result = MigrationResultSchema.parse({ migrated, skipped, failed });
  return NextResponse.json(result);
}
