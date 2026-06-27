import mongoose, { Schema } from "mongoose";

const FaqSchema = new Schema(
  {
    question: { type: String, required: true },
    answer:   { type: String, required: true },
    order:    { type: Number, default: 99 },
  },
  { timestamps: true }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
FaqSchema.set("toJSON", { transform: (_: unknown, ret: any) => { ret._id = String(ret._id); delete ret.__v; return ret; } });

export const Faq = mongoose.models.Faq ?? mongoose.model("Faq", FaqSchema);
