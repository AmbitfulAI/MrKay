import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { HeroSlide } from "@/lib/models/HeroSlide";

export async function PATCH(req: NextRequest) {
  await connectDB();
  const { items } = await req.json();
  await Promise.all(
    (items as { id: string; order: number }[]).map((i) =>
      HeroSlide.findByIdAndUpdate(i.id, { $set: { order: i.order } })
    )
  );
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
