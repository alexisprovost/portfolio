import type { VercelRequest, VercelResponse } from "@vercel/node";

// Per-IP rate limiter. Map persists for the lifetime of the warm serverless
// instance — works as a soft brake on a single attacker. Real defense is
// Turnstile + the form being noisy enough that abuse hits Discord rate
// limits anyway. Tune if needed.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const ipHits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (ipHits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    ipHits.set(ip, recent);
    return true;
  }
  recent.push(now);
  ipHits.set(ip, recent);
  return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip = (req.headers["x-forwarded-for"]?.toString().split(",")[0] ?? "unknown").trim();
  if (rateLimited(ip)) {
    return res.status(429).json({ error: "Too many requests, please try again in a minute." });
  }

  const { name, email, message, token } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (typeof name !== "string" || name.length > 100 ||
      typeof email !== "string" || email.length > 254 ||
      typeof message !== "string" || message.length > 5000) {
    return res.status(400).json({ error: "Invalid field length" });
  }

  // Verify Cloudflare Turnstile token (skip if no secret configured)
  if (token && process.env.TURNSTILE_SECRET_KEY) {
    const turnstileRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
        }),
      }
    );

    const turnstileData = await turnstileRes.json();

    if (!turnstileData.success) {
      return res.status(403).json({ error: "Verification failed" });
    }
  } else if (process.env.TURNSTILE_SECRET_KEY) {
    // Secret is configured but no token provided — reject in production
    return res.status(400).json({ error: "Verification token required" });
  }

  // Send to Discord webhook
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL!;

  const discordPayload = {
    content: "<@112247327418286080>",
    username: "alexisprovost.com",
    avatar_url:
      "https://cdn.discordapp.com/attachments/790529001604251668/1076953665111343226/apple-touch-icon.7c4f83d7.png",
    tts: false,
    embeds: [
      {
        title: "New message from the contact form",
        type: "rich",
        timestamp: new Date().toISOString(),
        color: 0x3366ff,
        author: {
          name: "alexisprovost.com",
          url: "https://alexisprovost.com/",
        },
        fields: [
          { name: "Name", value: name, inline: false },
          { name: "Email", value: email, inline: false },
          { name: "Message", value: message, inline: false },
        ],
      },
    ],
  };

  const discordRes = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(discordPayload),
  });

  if (!discordRes.ok) {
    return res.status(502).json({ error: "Failed to send message" });
  }

  return res.status(200).json({ status: "success" });
}
