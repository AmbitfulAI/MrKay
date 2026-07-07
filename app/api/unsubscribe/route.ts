import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Subscriber } from "@/lib/models/Subscriber";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return new NextResponse("Invalid unsubscribe link.", { status: 400 });
  }

  await connectDB();
  const result = await Subscriber.findOneAndUpdate(
    { unsubscribeToken: token },
    { active: false },
  ).catch(() => null);

  if (!result) {
    return new NextResponse("Link not recognised.", { status: 404 });
  }

  return new NextResponse(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Unsubscribed — TheKayodeKolade</title>
  <style>
    body { margin: 0; background: #0d0d0d; font-family: Georgia, serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .card { max-width: 480px; padding: 64px 48px; text-align: center; }
    .rule { width: 40px; height: 1px; background: #c9a84c; margin: 24px auto; }
    h1 { font-size: 1.6rem; font-weight: 400; color: #f0ece0; margin: 0 0 16px; }
    p { font-size: 0.9rem; line-height: 1.9; color: #6a6a6a; margin: 0; }
    a { color: #c9a84c; text-decoration: none; }
  </style>
</head>
<body>
  <div class="card">
    <div class="rule"></div>
    <h1>You've been unsubscribed.</h1>
    <p>You won't receive further writing updates from TheKayodeKolade.<br><br>
    <a href="/">Return to the site →</a></p>
  </div>
</body>
</html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}
