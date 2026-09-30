import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { ImpactOrg } from "@/lib/models/ImpactOrg";

export async function PATCH(req: NextRequest) {
  await connectDB();
  const { items } = await req.json();
  await Promise.all(
    (items as { id: string; order: number }[]).map((i) =>
      ImpactOrg.findByIdAndUpdate(i.id, { $set: { order: i.order } })
    )
  );
  revalidatePath("/impact");
  return NextResponse.json({ ok: true });
}
