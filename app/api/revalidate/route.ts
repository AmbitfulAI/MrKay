import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

// Sanity webhook calls this endpoint when content changes.
// Configure in Sanity: Manage → API → Webhooks → URL: /api/revalidate
// Add header: { "x-revalidate-secret": "<your secret>" }
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Unauthorised" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const type  = body?._type as string | undefined;

  // Revalidate only the affected pages based on document type
  const pathMap: Record<string, string[]> = {
    note:         ["/my-notes", "/my-notes/[slug]"],
    testimonial:  ["/testimonials"],
    successStory: ["/testimonials"],
    product:      ["/marketplace"],
    galleryImage: ["/gallery"],
    impactOrg:    ["/impact"],
  };

  const paths = type && pathMap[type] ? pathMap[type] : Object.values(pathMap).flat();

  paths.forEach((p) => revalidatePath(p));

  return NextResponse.json({ revalidated: true, paths });
}
