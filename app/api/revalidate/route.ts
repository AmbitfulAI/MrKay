import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Unauthorised" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const type = body?.type as string | undefined;

  const pathMap: Record<string, string[]> = {
    note:          ["/writing", "/writing/note/[slug]", "/rss.xml"],
    testimonial:   ["/testimonials"],
    successStory:  ["/testimonials"],
    product:       ["/marketplace"],
    galleryImage:  ["/visual-diary", "/gallery"],
    impactOrg:     ["/impact"],
    heroSlide:     ["/"],
    siteConfig:    ["/"],
    faq:           ["/contact"],
    category:      ["/writing", "/writing/[slug]"],
  };

  const paths = type && pathMap[type]
    ? pathMap[type]
    : Object.values(pathMap).flat();

  paths.forEach((p) => revalidatePath(p));

  return NextResponse.json({ revalidated: true, paths });
}
