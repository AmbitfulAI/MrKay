import mongoose, { Schema } from "mongoose";

const SiteConfigSchema = new Schema(
  {
    _id:          { type: String, default: "siteConfig" },
    calendlyUrl:  { type: String, default: "" },
    contactEmail: { type: String, default: "" },
    footerTagline: { type: String, default: "" },
    footerBlurb:  { type: String, default: "" },
    linkedInUrl:  { type: String, default: "" },
    instagramUrl: { type: String, default: "" },
    statsBar: [
      {
        _id:        false,
        line:       { type: String, default: "" },
        descriptor: { type: String, default: "" },
      },
    ],
  },
  { _id: false }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
SiteConfigSchema.set("toJSON", { transform: (_: unknown, ret: any) => { delete ret.__v; return ret; } });

export const SiteConfig =
  mongoose.models.SiteConfig ?? mongoose.model("SiteConfig", SiteConfigSchema);
