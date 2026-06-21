import mongoose, { Schema } from "mongoose";

const NoteCategorySchema = new Schema(
  {
    title: { type: String, required: true },
    slug:  { type: String, required: true, unique: true },
    order: { type: Number, default: 99 },
  },
  { timestamps: true }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
NoteCategorySchema.set("toJSON", { transform: (_: unknown, ret: any) => { ret._id = String(ret._id); delete ret.__v; return ret; } });

export const NoteCategory =
  mongoose.models.NoteCategory ?? mongoose.model("NoteCategory", NoteCategorySchema);
