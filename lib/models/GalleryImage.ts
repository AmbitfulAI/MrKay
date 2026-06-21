import mongoose, { Schema } from "mongoose";

const GalleryImageSchema = new Schema(
  {
    title:    { type: String, default: "" },
    caption:  { type: String, default: "" },
    category: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    alt:      { type: String, default: "" },
    span:     { type: String, default: "normal" },
    order:    { type: Number, default: 99 },
  },
  { timestamps: true }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
GalleryImageSchema.set("toJSON", { transform: (_: unknown, ret: any) => { ret._id = String(ret._id); delete ret.__v; return ret; } });

export const GalleryImage =
  mongoose.models.GalleryImage ?? mongoose.model("GalleryImage", GalleryImageSchema);
