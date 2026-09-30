import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Faq } from "@/lib/models/Faq";

export async function PATCH(req: NextRequest) {
  await connectDB();
  const { items } = await req.json();
  await Promise.all(
    (items as { id: string; order: number }[]).map((i) =>
      Faq.findByIdAndUpdate(i.id, { $set: { order: i.order } })
    )
  );
  revalidatePath("/contact");
  return NextResponse.json({ ok: true });
}
