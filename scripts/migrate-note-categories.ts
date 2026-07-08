import mongoose from "mongoose";
import * as dotenv from "fs";

const env = dotenv.readFileSync(".env.local", "utf8")
  .split("\n")
  .filter((l) => l.includes("="))
  .reduce((acc, l) => {
    const [k, ...v] = l.split("=");
    acc[k.trim()] = v.join("=").trim();
    return acc;
  }, {} as Record<string, string>);

const MONGODB_URI = env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("MONGODB_URI not found in .env.local");

const ObjectIdPattern = /^[a-f\d]{24}$/i;

const CategorySchema = new mongoose.Schema({ title: String, slug: String });
const NoteSchema     = new mongoose.Schema({ title: String, category: mongoose.Schema.Types.Mixed });

const Category = mongoose.models.Category ?? mongoose.model("Category", CategorySchema);
const Note     = mongoose.models.Note     ?? mongoose.model("Note", NoteSchema);

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const notes = await Note.find().lean<{ _id: mongoose.Types.ObjectId; category: unknown }[]>();
  console.log(`Found ${notes.length} notes`);

  let migrated = 0, skipped = 0;
  const failed: string[] = [];

  for (const note of notes) {
    const catStr = String(note.category);
    if (ObjectIdPattern.test(catStr)) {
      skipped++;
      continue;
    }

    const cat = await Category.findOne({ title: catStr }).lean<{ _id: mongoose.Types.ObjectId }>().catch(() => null);
    if (!cat) {
      failed.push(`note ${note._id} — category "${catStr}" not found`);
      continue;
    }

    await Note.findByIdAndUpdate(note._id, { $set: { category: cat._id } });
    migrated++;
    console.log(`  migrated: "${catStr}" → ${cat._id}`);
  }

  console.log(`\nDone. migrated=${migrated} skipped=${skipped} failed=${failed.length}`);
  if (failed.length) failed.forEach((f) => console.warn("  FAILED:", f));

  await mongoose.disconnect();
}

run().catch((e) => { console.error(e); process.exit(1); });
