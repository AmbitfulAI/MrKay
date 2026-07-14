import mongoose, { Schema } from "mongoose";

const ContentBlockSchema = new Schema(
  {
    type:    { type: String, enum: ["text", "image"], required: true },
    content: { type: String, required: true },
    caption: { type: String, default: "" },
  },
  { _id: false },
);

const NoteSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    date: { type: Date, required: true },
    excerpt: { type: String, required: true },
    featuredImages: { type: [String], default: [] },
    contentBlocks: { type: [ContentBlockSchema], default: [] },
  },
  { timestamps: true },
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
NoteSchema.set("toJSON", { transform: (_: unknown, ret: any) => { ret._id = String(ret._id); delete ret.__v; return ret; } });

export const Note = mongoose.models.Note ?? mongoose.model("Note", NoteSchema);
