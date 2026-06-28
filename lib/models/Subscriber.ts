import mongoose, { Schema } from "mongoose";

const SubscriberSchema = new Schema(
  {
    email:            { type: String, required: true, unique: true, lowercase: true, trim: true },
    active:           { type: Boolean, default: true },
    unsubscribeToken: { type: String, default: () => crypto.randomUUID() },
  },
  { timestamps: true }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
SubscriberSchema.set("toJSON", { transform: (_: unknown, ret: any) => { ret._id = String(ret._id); delete ret.__v; return ret; } });

export const Subscriber =
  mongoose.models.Subscriber ?? mongoose.model("Subscriber", SubscriberSchema);
