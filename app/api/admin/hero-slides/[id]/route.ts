import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { HeroSlide } from "@/lib/models/HeroSlide";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  const data = await req.json();
  const update: Record<string, unknown> = {
    eyebrow:           data.eyebrow,
    line1:             data.line1,
    line2:             data.line2,
    subtitle:          data.subtitle,
    imagePos:          data.imagePos || "center top",
    primaryLabel:      data.primaryLabel,
    primaryHref:       data.primaryHref || "",
    primaryCalendly:   data.primaryCalendly === "true" || data.primaryCalendly === true,
    secondaryLabel:    data.secondaryLabel || "",
    secondaryHref:     data.secondaryHref || "",
    secondaryCalendly: data.secondaryCalendly === "true" || data.secondaryCalendly === true,
    order:             data.order ? Number(data.order) : 99,
  };
  if (data.imageUrl) update.imageUrl = data.imageUrl;
  const slide = await HeroSlide.findByIdAndUpdate(id, update, { new: true });
  if (!slide) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/");
  return NextResponse.json(slide.toJSON());
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  await HeroSlide.findByIdAndDelete(id);
  revalidatePath("/");
  return NextResponse.json({ deleted: true });
}
