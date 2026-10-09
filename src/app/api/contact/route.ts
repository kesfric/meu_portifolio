// Receives the contact form and emails it to you through Resend.
// Needs RESEND_API_KEY and CONTACT_TO_EMAIL (see .env.example).
// Without them it answers 503 and the form tells visitors to email you directly.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const { name, email, message, company } = (body ?? {}) as Record<string, unknown>;

  // Honeypot: a hidden field only bots fill in. Pretend it worked.
  if (typeof company === "string" && company.length > 0) return Response.json({ ok: true });

  if (
    typeof name !== "string" || !name.trim() || name.length > 120 ||
    typeof email !== "string" || !EMAIL_RE.test(email) || email.length > 200 ||
    typeof message !== "string" || message.trim().length < 2 || message.length > 5000
  ) {
    return Response.json({ error: "invalid_fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return Response.json({ error: "not_configured" }, { status: 503 });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      // onboarding@resend.dev works for testing; switch to your own domain later.
      from: "Portfolio <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `Portfolio message from ${name.trim()}`,
      text: `${message.trim()}\n\n${name.trim()} <${email}>`,
    }),
  });

  if (!res.ok) return Response.json({ error: "send_failed" }, { status: 502 });
  return Response.json({ ok: true });
}
