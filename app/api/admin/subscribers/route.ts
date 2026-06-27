import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Subscriber } from "@/lib/models/Subscriber";

export async function GET() {
  await connectDB();
  const items = await Subscriber.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(items);
}
