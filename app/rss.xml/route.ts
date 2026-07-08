import { connectDB } from "@/lib/db";
import { Note } from "@/lib/models/Note";

export const revalidate = 3600;

interface NoteDoc {
  _id: unknown;
  title: string;
  slug: string;
  category: { title: string } | null;
  date: string;
  excerpt: string;
}

function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thekayodekolade.com";
  await connectDB();
  const notes = await Note.find().populate<{ category: { title: string } | null }>("category", "title").sort({ createdAt: -1 }).lean<NoteDoc[]>();

  const items = notes
    .map((note) => {
      const url = `${siteUrl}/writing/note/${note.slug}`;
      const pubDate = note.date ? new Date(note.date).toUTCString() : "";
      return `
    <item>
      <title>${escapeXml(note.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(note.excerpt ?? "")}</description>
      <category>${escapeXml(note.category?.title ?? "")}</category>
      ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ""}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TheKayodeKolade — Notes</title>
    <link>${siteUrl}/writing</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <description>Leadership, strategy, faith, and the discipline of leading well.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
