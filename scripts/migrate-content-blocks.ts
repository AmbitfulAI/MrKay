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

const NoteSchema = new mongoose.Schema({
  title:         String,
  body:          [String],
  contentBlocks: { type: [mongoose.Schema.Types.Mixed], default: [] },
});

const Note = mongoose.models.Note ?? mongoose.model("Note", NoteSchema);

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const notes = await Note.find().lean<{
    _id: mongoose.Types.ObjectId;
    title: string;
    body: string[];
  }[]>();

  console.log(`Found ${notes.length} notes`);

  let migrated = 0;
  let skipped  = 0;

  for (const note of notes) {
    if (!note.body?.length) {
      console.log(`  skip (empty body): "${note.title}"`);
      skipped++;
      continue;
    }

    const contentBlocks = note.body.map((para) => ({
      type:    "text",
      content: para,
      caption: "",
    }));

    await Note.findByIdAndUpdate(note._id, { $set: { contentBlocks } });
    migrated++;
    console.log(`  migrated: "${note.title}" → ${contentBlocks.length} block${contentBlocks.length === 1 ? "" : "s"}`);
  }

  console.log(`\nDone. migrated=${migrated} skipped=${skipped}`);
  await mongoose.disconnect();
}

run().catch((e) => { console.error(e); process.exit(1); });
