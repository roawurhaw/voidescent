import { NextResponse } from "next/server";

// Forwards sign-ups to whatever list tool the shop uses (set NEWSLETTER_WEBHOOK_URL).
export async function POST(request: Request) {
  let email = "";
  try {
    const body = (await request.json()) as { email?: unknown };
    email = typeof body.email === "string" ? body.email.trim() : "";
  } catch {
    // fall through to validation
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email address, like name@example.com." }, { status: 400 });
  }

  const hook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!hook) {
    return NextResponse.json({ error: "Sign-up isn't connected in this preview yet." }, { status: 501 });
  }

  try {
    const res = await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "voidescent.com" }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter]", err);
    return NextResponse.json({ error: "Sign-up failed. Try again in a moment." }, { status: 502 });
  }
}
