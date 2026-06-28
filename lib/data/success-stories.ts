import { connectDB } from "@/lib/db";
import { SuccessStory } from "@/lib/models/SuccessStory";

export interface StoryItem {
  code: string;
  eyebrow: string;
  title: string;
  descriptor: string;
  outcome: string;
  body: string;
}

interface DBStory {
  code: string;
  title: string;
  sector: string;
  client?: string;
  result?: string;
  story: string;
}

export async function getSuccessStories(fallback: StoryItem[] = []): Promise<StoryItem[]> {
  await connectDB();
  const results = await SuccessStory
    .find()
    .sort({ order: 1 })
    .lean<DBStory[]>()
    .catch(() => []);
  if (!results.length) return fallback;
  return results.map((s) => ({
    code: s.code,
    eyebrow: s.sector,
    title: s.title,
    descriptor: s.client ?? "",
    outcome: s.result ?? "",
    body: s.story,
  }));
}
