import mongoose, { Schema } from "mongoose";

const ImpactOrgSchema = new Schema(
  {
    name:        { type: String, required: true },
    category:    { type: String, default: "" },
    role:        { type: String, default: "" },
    since:       { type: String, default: "" },
    description: { type: String, default: "" },
    url:         { type: String, default: "" },
    active:      { type: Boolean, default: true },
    imageUrl:    { type: String, default: "" },
    alt:         { type: String, default: "" },
    order:       { type: Number, default: 99 },
  },
  { timestamps: true }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
ImpactOrgSchema.set("toJSON", { transform: (_: unknown, ret: any) => { ret._id = String(ret._id); delete ret.__v; return ret; } });

export const ImpactOrg =
  mongoose.models.ImpactOrg ?? mongoose.model("ImpactOrg", ImpactOrgSchema);
