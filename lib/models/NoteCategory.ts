import mongoose, { Schema } from "mongoose";

const NoteCategorySchema = new Schema(
  {
    title:       { type: String, required: true },
    slug:        { type: String, required: true, unique: true },
    type:        { type: String, enum: ["writing", "visual-diary"], default: "writing" },
    order:       { type: Number, default: 99 },
    tagline:     { type: String, default: "" },
    description: { type: String, default: "" },
    themes:      { type: [String], default: [] },
  },
  { timestamps: true }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
NoteCategorySchema.set("toJSON", { transform: (_: unknown, ret: any) => { ret._id = String(ret._id); delete ret.__v; return ret; } });

export const NoteCategory =
  mongoose.models.NoteCategory ?? mongoose.model("NoteCategory", NoteCategorySchema);
