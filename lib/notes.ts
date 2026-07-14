export interface ContentBlock {
  type: "text" | "image";
  content: string;
  caption?: string;
}

export interface Note {
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  image?: "headshot" | "exec" | "facecard" | "upperbody";
  body: string[];
  featuredImages?: string[];
  contentBlocks?: ContentBlock[];
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
