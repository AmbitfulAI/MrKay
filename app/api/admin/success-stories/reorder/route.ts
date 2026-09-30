import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { SuccessStory } from "@/lib/models/SuccessStory";

export async function PATCH(req: NextRequest) {
  await connectDB();
  const { items } = await req.json();
  await Promise.all(
    (items as { id: string; order: number }[]).map((i) =>
      SuccessStory.findByIdAndUpdate(i.id, { $set: { order: i.order } })
    )
  );
  revalidatePath("/testimonials");
  return NextResponse.json({ ok: true });
}
