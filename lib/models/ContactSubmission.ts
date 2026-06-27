import mongoose, { Schema } from "mongoose";

const ContactSubmissionSchema = new Schema(
  {
    name:         { type: String, required: true },
    email:        { type: String, required: true },
    phone:        { type: String, default: "" },
    organisation: { type: String, default: "" },
    role:         { type: String, default: "" },
    situation:    { type: String, default: "" },
    message:      { type: String, required: true },
    read:         { type: Boolean, default: false },
  },
  { timestamps: true }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
ContactSubmissionSchema.set("toJSON", { transform: (_: unknown, ret: any) => { ret._id = String(ret._id); delete ret.__v; return ret; } });

export const ContactSubmission =
  mongoose.models.ContactSubmission ??
  mongoose.model("ContactSubmission", ContactSubmissionSchema);
