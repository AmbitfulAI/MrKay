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
  { title: String, slug: String, order: Number, tagline: String, description: String, themes: [String] },
  { timestamps: true }
);
const NoteCategory =
  mongoose.models.NoteCategory ?? mongoose.model("NoteCategory", NoteCategorySchema);

const CATEGORIES = [
  {
    title: "GeniusMined",
    slug: "geniusmined",
    order: 1,
    tagline: "Frameworks, lessons, and reflections on the work — for leaders, founders, and anyone building something that has to hold.",
    description: "This is the stream for the work itself. Pieces here are about what I see inside organisations, what I've learned across two decades of operating roles, the frameworks I've built and the cases that taught me to build them. Some pieces are short and practical. Others are longer and structural. All of them are written for the person who isn't looking for inspiration — they're looking for something they can use.\n\nIf you're navigating a career inflection point, building a business, or leading an organisation through change, this is the stream that will speak most directly to where you are.",
    themes: [
      "Career clarity and the discipline of decision-making",
      "Founder identity, business architecture, and traction",
      "Operating models, governance, and execution rhythms",
      "Manager effectiveness and leadership transitions",
      "Organisational design, culture, and change",
      "Awareness, growth, and the inner work of leadership",
      "Intentional living and conviction",
      "Reflections from inside the executive seat",
    ],
  },
  {
    title: "GraceJunkie",
    slug: "gracejunkie",
    order: 2,
    tagline: "I'm a product of grace. These are the reflections that come from that.",
    description: "This stream is honest about the foundation. I've said elsewhere on this site that I'm a product of grace — that whatever I've built or become rests far more on what I've been given than on what I've earned. GraceJunkie is where that conviction is allowed to write.\n\nPieces here move through faith, family, fatherhood, resilience, transition, and the long unglamorous work of being formed. They are not sermons, and they are not strategy. They are the reflections of someone trying to live well — and willing to write honestly about what that has cost, taught, and given.",
    themes: [
      "Faith and the daily walk",
      "Family life and fatherhood",
      "Transitions, resilience, and the work of growth",
      "Faith-shaped leadership and decision-making",
      "Devotionals and quieter reflections",
    ],
  },
  {
    title: "RareMusingWork",
    slug: "raremusingwork",
    order: 3,
    tagline: "The unfiltered room. Where the rules are softer and the writing is freer.",
    description: "This is where the rest goes. Poetry I write when a line lands and won't leave. Songs and lyrics from a quieter creative life that runs alongside the commercial one. Travel notes from places that taught me something. Half-formed essays, thought invitations, things I'm sitting with but haven't fully resolved.\n\nThere's no editorial line here, and that's the point. RareMusingWork is the room with the loosest dress code. If you came for frameworks, you'll find none. If you came to see how a mind that won't stay in one lane actually wanders, you've arrived in the right place.",
    themes: [
      "Poetry and creative writing",
      "Songs, lyrics, and the sparks beneath them",
      "Travel notes and observations",
      "Random rants and thought invitations",
      "Half-formed ideas, posed openly",
    ],
  },
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
