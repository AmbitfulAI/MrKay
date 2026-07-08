import mongoose from "mongoose";
import * as fs from "fs";

const env = fs.readFileSync(".env.local", "utf8")
  .split("\n")
  .filter((l) => l.includes("="))
  .reduce((acc, l) => {
    const [k, ...v] = l.split("=");
    acc[k.trim()] = v.join("=").trim();
    return acc;
  }, {} as Record<string, string>);

const MONGODB_URI = env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("MONGODB_URI not found in .env.local");

const SiteConfigSchema = new mongoose.Schema({ statsBar: [{ line: String, descriptor: String }] }, { strict: false });
const SiteConfig = mongoose.models.SiteConfig ?? mongoose.model("SiteConfig", SiteConfigSchema);

const STATS_BAR = [
  { line: "COO-Level Operating Leadership",        descriptor: "MULTI-COUNTRY EXECUTIVE EXPERIENCE" },
  { line: "Multi-Country Executive Experience",    descriptor: "AFRICA · EUROPE · GLOBAL CLIENT REACH" },
  { line: "Leadership & High-Performance Culture", descriptor: "SYSTEMS · CULTURE · EXECUTION ARCHITECTURE" },
  { line: "Organisational Development Practitioner", descriptor: "ORGANIZATION DEVELOPMENT NETWORK · NEUROLEADERSHIP INSTITUTE · ICF" },
];

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const result = await SiteConfig.findOneAndUpdate(
    {},
    { $set: { statsBar: STATS_BAR } },
    { returnDocument: "after", upsert: true },
  );

  console.log("Stats bar updated:");
  result.statsBar.forEach((s: { line: string; descriptor: string }, i: number) => {
    console.log(`  ${i + 1}. ${s.line} — ${s.descriptor}`);
  });

  await mongoose.disconnect();
}

run().catch((e) => { console.error(e); process.exit(1); });
