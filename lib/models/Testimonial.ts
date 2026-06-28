import mongoose, { Schema } from "mongoose";

const TestimonialSchema = new Schema(
  {
    quote:         { type: String, required: true },
    clientName:    { type: String, required: true },
    clientContext: { type: String, default: "" },
    order:         { type: Number, default: 99 },
    pages:         { type: [String], default: [] },
  },
  { timestamps: true }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
TestimonialSchema.set("toJSON", { transform: (_: unknown, ret: any) => { ret._id = String(ret._id); delete ret.__v; return ret; } });

export const Testimonial =
  mongoose.models.Testimonial ?? mongoose.model("Testimonial", TestimonialSchema);
