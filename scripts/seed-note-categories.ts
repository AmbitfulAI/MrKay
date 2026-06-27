/**
 * Seeds the three note categories into MongoDB.
 * Clears any existing categories first.
 *
 * Usage:
 *   npx tsx scripts/seed-note-categories.ts
 */

import * as fs from "fs";
import * as path from "path";
import mongoose from "mongoose";

// Load .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) process.env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, "");
  }
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("MONGODB_URI not set in .env.local");

const NoteCategorySchema = new mongoose.Schema(
  { title: String, slug: String, order: Number },
  { timestamps: true }
);
const NoteCategory =
  mongoose.models.NoteCategory ?? mongoose.model("NoteCategory", NoteCategorySchema);

const CATEGORIES = [
  { title: "GeniusMined",    slug: "geniusmined",    order: 1 },
  { title: "GraceJunkie",    slug: "gracejunkie",    order: 2 },
  { title: "RareMusingWork", slug: "raremusingwork", order: 3 },
];

async function run() {
  await mongoose.connect(MONGODB_URI!);
  await NoteCategory.deleteMany({});
  await NoteCategory.insertMany(CATEGORIES);
  console.log("✓ Seeded 3 note categories:");
  CATEGORIES.forEach((c) => console.log(`  · ${c.title}`));
  await mongoose.disconnect();
}

run().catch((err) => { console.error(err); process.exit(1); });
