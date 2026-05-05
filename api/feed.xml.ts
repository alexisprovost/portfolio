import type { VercelRequest, VercelResponse } from "@vercel/node";

const SITE_URL = "https://alexisprovost.com";
const PROJECTS_API = "https://api.alexisprovost.com/";

interface Tech { id: string | number; name: string; }
interface Project {
  id: string | number;
  name: string;
  date: string;
  description?: string;
  url?: string;
  technologies?: Tech[];
}

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const lang = (req.query.lang === "fr" ? "fr" : "en");

  let projects: Project[] = [];
  try {
    const r = await fetch(`${PROJECTS_API}${lang}/projects`, {
      signal: AbortSignal.timeout(5000),
    });
    if (r.ok) projects = await r.json();
  } catch {
    // fall through with empty list
  }

  const items = projects
    .filter((p) => new Date(p.date) <= new Date())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 50)
    .map((p) => {
      const link = p.url ?? `${SITE_URL}/projects`;
      const tags = (p.technologies ?? []).map((t) => `<category>${escape(t.name)}</category>`).join("");
      const desc = escape((p.description ?? "").slice(0, 500));
      return `
    <item>
      <title>${escape(p.name)}</title>
      <link>${escape(link)}</link>
      <guid isPermaLink="false">project-${p.id}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${desc}</description>
      ${tags}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Alexis Provost — Projects</title>
    <link>${SITE_URL}/projects</link>
    <description>Projects by Alexis Provost</description>
    <language>${lang === "fr" ? "fr-CA" : "en-US"}</language>
    <atom:link href="${SITE_URL}/api/feed.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  return res.status(200).send(xml);
}
