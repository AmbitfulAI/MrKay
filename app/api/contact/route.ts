import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/db";
import { ContactSubmission } from "@/lib/models/ContactSubmission";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body?.email || !body?.name || !body?.message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const { name, email, phone, organisation, role, situation, message } = body;

  await connectDB();
  await ContactSubmission.create({ name, email, phone: phone ?? "", organisation: organisation ?? "", role: role ?? "", situation: situation ?? "", message });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone        ? `Phone: ${phone}`              : null,
    organisation ? `Organisation: ${organisation}` : null,
    role         ? `Role: ${role}`                 : null,
    situation    ? `Situation: ${situation}`        : null,
    ``,
    message,
  ].filter(Boolean).join("\n");

  await transporter.sendMail({
    from: `"MrKay Website" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO_EMAIL ?? process.env.SMTP_USER,
    replyTo: email,
    subject: `New enquiry from ${name}`,
    text: lines,
  });

  return NextResponse.json({ ok: true });
}
