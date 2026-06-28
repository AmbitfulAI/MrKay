import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    title:       { type: String, required: true },
    subtitle:    { type: String, default: "" },
    type:        { type: String, default: "" },
    description: { type: String, default: "" },
    price:       { type: String, default: "" },
    priceNote:   { type: String, default: "" },
    tag:         { type: String, default: "" },
    selarUrl:    { type: String, default: "" },
    available:   { type: Boolean, default: true },
    coverAccent: { type: String, default: "" },
    order:       { type: Number, default: 99 },
  },
  { timestamps: true }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
ProductSchema.set("toJSON", { transform: (_: unknown, ret: any) => { ret._id = String(ret._id); delete ret.__v; return ret; } });

export const Product =
  mongoose.models.Product ?? mongoose.model("Product", ProductSchema);
