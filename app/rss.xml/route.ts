import { sanityClient } from "@/sanity/client";
import { notesQuery } from "@/sanity/queries";

export const revalidate = 3600;

interface Note {
  _id: string;
  title: string;
  slug: string;
  category: string;
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
  const notes: Note[] = await sanityClient.fetch(notesQuery).catch(() => []);

  const items = notes
    .map((note) => {
      const url = `${siteUrl}/my-notes/${note.slug}`;
      const pubDate = note.date ? new Date(note.date).toUTCString() : "";
      return `
    <item>
      <title>${escapeXml(note.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(note.excerpt ?? "")}</description>
      <category>${escapeXml(note.category ?? "")}</category>
      ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ""}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TheKayodeKolade — Notes</title>
    <link>${siteUrl}/my-notes</link>
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
