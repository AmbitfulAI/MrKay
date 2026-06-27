import mongoose, { Schema } from "mongoose";

const SuccessStorySchema = new Schema(
  {
    code:   { type: String, default: "" },
    title:  { type: String, required: true },
    sector: { type: String, default: "" },
    client: { type: String, default: "" },
    result: { type: String, default: "" },
    story:  { type: String, default: "" },
    order:  { type: Number, default: 99 },
  },
  { timestamps: true }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
SuccessStorySchema.set("toJSON", { transform: (_: unknown, ret: any) => { ret._id = String(ret._id); delete ret.__v; return ret; } });

export const SuccessStory =
  mongoose.models.SuccessStory ?? mongoose.model("SuccessStory", SuccessStorySchema);
