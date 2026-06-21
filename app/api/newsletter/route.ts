import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json().catch(() => ({}));

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const apiKey = process.env.CONVERTKIT_API_KEY;
  const formId = process.env.CONVERTKIT_FORM_ID;

  if (!apiKey || !formId) {
    console.error("ConvertKit env vars missing.");
    return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });
  }

  const res = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key: apiKey, email }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    console.error("ConvertKit error:", body);
    return NextResponse.json({ error: "Subscription failed. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
