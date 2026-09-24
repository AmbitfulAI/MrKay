/**
 * Seeds the fallback hero slides (from components/HeroSlider.tsx) into MongoDB.
 * Uses the existing local images (served from public/hero/) as defaults —
 * no Cloudinary upload.
 *
 * Usage:
 *   npx tsx scripts/seed-hero-slides.ts
 */

import * as fs from "fs";
import * as path from "path";
import mongoose from "mongoose";

const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) process.env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, "");
  }
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("MONGODB_URI not set in .env.local");

const HeroSlideSchema = new mongoose.Schema(
  {
    eyebrow: String,
    line1: String,
    line2: String,
    subtitle: String,
    imageUrl: String,
    imagePos: String,
    primaryLabel: String,
    primaryHref: String,
    primaryCalendly: Boolean,
    secondaryLabel: String,
    secondaryHref: String,
    secondaryCalendly: Boolean,
    order: Number,
  },
  { timestamps: true },
);
const HeroSlide = mongoose.models.HeroSlide ?? mongoose.model("HeroSlide", HeroSlideSchema);

const IMAGES = {
  execBg: "/hero/exec-bg.jpg",
  upperbody: "/hero/upperbody.jpg",
  facecard: "/hero/facecard.jpg",
};

const SLIDES = [
  {
    eyebrow: "Strategic Advisor · Architect · Coach",
    line1: "Clarity → Architecture →",
    line2: "Momentum.",
    subtitle: "Operating advisory for executives, founders, and organisations. For the decisions and systems that have to hold.",
    imageUrl: IMAGES.execBg,
    imagePos: "center 20%",
    primaryLabel: "Explore My Work",
    primaryHref: "/career-executive-clarity",
    primaryCalendly: false,
    secondaryLabel: "Meet Kayode",
    secondaryHref: "/meet-kayode",
    secondaryCalendly: false,
    order: 1,
  },
  {
    eyebrow: "Organisational Systems & Execution",
    line1: "Growing Faster Than",
    line2: "Your Systems Can Carry.",
    subtitle: "Your organisation isn't underperforming because people don't care. It's under-designed for the outcomes you want.",
    imageUrl: IMAGES.upperbody,
    imagePos: "center top",
    primaryLabel: "Explore the Lane",
    primaryHref: "/organisational-systems-execution",
    primaryCalendly: false,
    secondaryLabel: "Let's Talk",
    secondaryHref: "",
    secondaryCalendly: true,
    order: 2,
  },
  {
    eyebrow: "Founder & Business Architecture",
    line1: "Building Hard.",
    line2: "So Why Isn't It Compounding?",
    subtitle: "You don't have an effort problem. You have an alignment problem. The architecture is what's missing.",
    imageUrl: IMAGES.facecard,
    imagePos: "center top",
    primaryLabel: "Explore the Lane",
    primaryHref: "/founder-business-architecture",
    primaryCalendly: false,
    secondaryLabel: "Let's Talk",
    secondaryHref: "",
    secondaryCalendly: true,
    order: 3,
  },
  {
    eyebrow: "Career & Executive Clarity",
    line1: "You Know You Have More in You.",
    line2: "You Just Can't Name the Direction Yet.",
    subtitle: "You've performed. You've grown. But the next move isn't obvious anymore — and another job won't fix that.",
    imageUrl: IMAGES.execBg,
    imagePos: "center 35%",
    primaryLabel: "Name Your Direction",
    primaryHref: "/career-executive-clarity",
    primaryCalendly: false,
    secondaryLabel: "Let's Talk",
    secondaryHref: "",
    secondaryCalendly: true,
    order: 4,
  },
];

async function run() {
  await mongoose.connect(MONGODB_URI!);
  console.log("Connected to MongoDB");

  for (const slide of SLIDES) {
    await HeroSlide.findOneAndUpdate({ line1: slide.line1 }, { $set: slide }, { upsert: true });
  }
  console.log(`Upserted ${SLIDES.length} hero slides`);

  await mongoose.disconnect();
}

run().catch((e) => { console.error(e); process.exit(1); });
