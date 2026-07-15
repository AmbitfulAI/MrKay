export interface ContentBlock {
  type: "text" | "image" | "heading" | "quote" | "list" | "delimiter";
  content: string;
  caption?: string;
  level?: number;
  style?: "ordered" | "unordered";
  items?: string[];
}

export interface Note {
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  readTime?: number;
  image?: "headshot" | "exec" | "facecard" | "upperbody";
  featuredImages?: string[];
  contentBlocks?: ContentBlock[];
}

export function estimateReadTime(blocks: ContentBlock[]): number {
  const text = blocks
    .flatMap((b) => {
      if (b.type === "image" || b.type === "delimiter") return [];
      if (b.type === "list") return b.items ?? [];
      return [b.content, b.caption ?? ""];
    })
    .join(" ")
    .replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatNoteDate(date: Date | string): string {
  if (!date) return "";
  if (date instanceof Date) {
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  }
  if (/^\d{4}-\d{2}-\d{2}/.test(date)) {
    const d = new Date(date.length === 10 ? date + "T12:00:00Z" : date);
    if (!isNaN(d.getTime())) return d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  }
  return date;
}
