import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { HeroSlide } from "@/lib/models/HeroSlide";

export async function GET() {
  await connectDB();
  const items = await HeroSlide.find().sort({ order: 1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  const slide = await HeroSlide.create({
    eyebrow:           data.eyebrow,
    line1:             data.line1,
    line2:             data.line2,
    subtitle:          data.subtitle,
    imageUrl:          data.imageUrl ?? "",
    imagePos:          data.imagePos || "center top",
    primaryLabel:      data.primaryLabel,
    primaryHref:       data.primaryHref || "",
    primaryCalendly:   data.primaryCalendly === "true" || data.primaryCalendly === true,
    secondaryLabel:    data.secondaryLabel || "",
    secondaryHref:     data.secondaryHref || "",
    secondaryCalendly: data.secondaryCalendly === "true" || data.secondaryCalendly === true,
    order:             data.order ? Number(data.order) : 99,
  });
  revalidatePath("/");
  return NextResponse.json(slide.toJSON(), { status: 201 });
}
