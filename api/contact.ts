import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message, token } = req.body;

  if (!name || !email || !message || !token) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Verify Cloudflare Turnstile token
  const turnstileRes = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY!,
        response: token,
      }),
    }
  );

  const turnstileData = await turnstileRes.json();

  if (!turnstileData.success) {
    return res.status(403).json({ error: "Verification failed" });
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
