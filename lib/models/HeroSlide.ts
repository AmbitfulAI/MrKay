import mongoose, { Schema } from "mongoose";

const HeroSlideSchema = new Schema(
  {
    eyebrow:          { type: String, default: "" },
    line1:            { type: String, required: true },
    line2:            { type: String, default: "" },
    subtitle:         { type: String, default: "" },
    imageUrl:         { type: String, default: "" },
    imagePos:         { type: String, default: "center top" },
    primaryLabel:     { type: String, default: "" },
    primaryHref:      { type: String, default: "" },
    primaryCalendly:  { type: Boolean, default: false },
    secondaryLabel:   { type: String, default: "" },
    secondaryHref:    { type: String, default: "" },
    secondaryCalendly: { type: Boolean, default: false },
    order:            { type: Number, default: 99 },
  },
  { timestamps: true }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
HeroSlideSchema.set("toJSON", { transform: (_: unknown, ret: any) => { ret._id = String(ret._id); delete ret.__v; return ret; } });

export const HeroSlide =
  mongoose.models.HeroSlide ?? mongoose.model("HeroSlide", HeroSlideSchema);
