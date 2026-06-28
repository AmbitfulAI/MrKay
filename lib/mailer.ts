import nodemailer from "nodemailer";
import { connectDB } from "@/lib/db";
import { Subscriber } from "@/lib/models/Subscriber";

function createTransporter() {
  const port = Number(process.env.SMTP_PORT ?? 587);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thekayodekolade.com";
const from = process.env.SMTP_FROM ?? `"TheKayodeKolade" <${process.env.SMTP_USER}>`;

function buildHtml(note: {
  title: string;
  category: string;
  date: string;
  excerpt: string;
}, noteUrl: string, unsubUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;padding:48px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#141414;border:1px solid #2a2a2a;">
        <!-- Gold rule header -->
        <tr><td style="height:3px;background:#c9a84c;font-size:0;line-height:0;">&nbsp;</td></tr>
        <!-- Body -->
        <tr><td style="padding:48px 48px 40px;">
          <!-- Eyebrow -->
          <p style="margin:0 0 20px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#7a6a3d;">${note.category} &nbsp;·&nbsp; ${note.date}</p>
          <!-- Title -->
          <h1 style="margin:0 0 24px;font-family:Georgia,serif;font-size:28px;line-height:1.2;color:#f0ece0;font-weight:400;">${note.title}</h1>
          <!-- Divider -->
          <table width="40" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr><td style="height:1px;background:#c9a84c;font-size:0;line-height:0;">&nbsp;</td></tr>
          </table>
          <!-- Excerpt -->
          <p style="margin:0 0 36px;font-family:Georgia,serif;font-size:15px;line-height:1.9;color:#a09880;font-weight:400;">${note.excerpt}</p>
          <!-- CTA -->
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="background:#c9a84c;">
                <a href="${noteUrl}" style="display:inline-block;padding:13px 32px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#0d0d0d;text-decoration:none;font-weight:600;">Read the piece →</a>
              </td>
            </tr>
          </table>
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:24px 48px 36px;border-top:1px solid #2a2a2a;">
          <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;line-height:1.8;color:#4a4a4a;">
            You're receiving this because you subscribed to writing updates from TheKayodeKolade.<br>
            <a href="${unsubUrl}" style="color:#7a6a3d;text-decoration:underline;">Unsubscribe</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendNoteNotification(note: {
  title: string;
  slug: string;
  category: string;
  date: string;
  excerpt: string;
}) {
  await connectDB();
  const subscribers = await Subscriber.find({ active: true })
    .select("email unsubscribeToken")
    .lean<{ email: string; unsubscribeToken: string }[]>()
    .catch(() => []);

  if (!subscribers.length) return;

  const transporter = createTransporter();
  const noteUrl = `${siteUrl}/my-notes/${note.slug}`;

  await Promise.allSettled(
    subscribers.map((sub) => {
      const unsubUrl = `${siteUrl}/api/unsubscribe?token=${sub.unsubscribeToken}`;
      return transporter.sendMail({
        from,
        to: sub.email,
        subject: `New writing: ${note.title}`,
        text: [
          note.title,
          `${note.category} · ${note.date}`,
          "",
          note.excerpt,
          "",
          `Read it here → ${noteUrl}`,
          "",
          "—",
          "You're receiving this because you subscribed to writing updates from TheKayodeKolade.",
          `Unsubscribe → ${unsubUrl}`,
        ].join("\n"),
        html: buildHtml(note, noteUrl, unsubUrl),
      });
    }),
  );
}
