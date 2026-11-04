// Shopify's /contact endpoint, which both theme forms post to: the contact form (form_type=contact) and the
// newsletter pop-up (form_type=customer). Sends the fields as JSON to CONTACT_WEBHOOK_URL (Zapier, Make,
// Shopify Flow, a Discord/Slack hook...) and sends the visitor back the way Shopify does.
export async function POST(request: Request) {
  const form = await request.formData();
  const type = form.get("form_type") === "customer" ? "customer" : "contact";
  const back = new URL(new URL(request.headers.get("referer") ?? "/", request.url).pathname, request.url);
  back.hash = type === "customer" ? "ep-form" : "voide-contact-form";

  // Honeypot field from the pop-up: bots fill it, people never see it.
  if (form.get("website")) return Response.redirect(back, 303);

  const fields: Record<string, string> = {};
  for (const [key, value] of form.entries()) {
    const m = key.match(/^contact\[(.+)\]$/);
    if (m && typeof value === "string") fields[m[1]] = value.slice(0, 5000);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email ?? "")) {
    return new Response("Please enter a valid email address and try again.", { status: 400 });
  }

  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (!hook) {
    return new Response("This form isn't connected yet. Please email info@voidescent.com.", { status: 503 });
  }
  const res = await fetch(hook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, ...fields, page: back.pathname }),
  }).catch(() => null);
  if (!res?.ok) return new Response("Sending failed. Please try again or email info@voidescent.com.", { status: 502 });

  back.searchParams.set(type === "customer" ? "customer_posted" : "contact_posted", "true");
  return Response.redirect(back, 303);
}
