import mongoose, { Schema } from "mongoose";

const NoteSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
    excerpt: { type: String, required: true },
    featuredImage: { type: String, default: "" },
    body: { type: [String], default: [] },
  },
  { timestamps: true },
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
NoteSchema.set("toJSON", { transform: (_: unknown, ret: any) => { ret._id = String(ret._id); delete ret.__v; return ret; } });

export const Note = mongoose.models.Note ?? mongoose.model("Note", NoteSchema);
