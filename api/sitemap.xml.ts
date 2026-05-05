import type { VercelRequest, VercelResponse } from "@vercel/node";

const SITE_URL = "https://alexisprovost.com";
const PROJECTS_API = "https://api.alexisprovost.com/";

interface Project {
  id: string | number;
  date: string;
  date_end?: string | null;
}

const STATIC_ROUTES: Array<{ path: string; changefreq: string; priority: string }> = [
  { path: "/", changefreq: "monthly", priority: "1.0" },
  { path: "/projects", changefreq: "weekly", priority: "0.8" },
  { path: "/contact", changefreq: "yearly", priority: "0.5" },
];

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  let projects: Project[] = [];
  try {
    const r = await fetch(`${PROJECTS_API}en/projects`, { signal: AbortSignal.timeout(5000) });
    if (r.ok) projects = await r.json();
  } catch {
    // fall through with empty list — at least static routes ship
  }

  const lastMod =
    projects.length > 0
      ? new Date(
          Math.max(
            ...projects.map((p) => new Date(p.date_end ?? p.date).getTime()).filter(Number.isFinite)
          )
        ).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10);

  const urls = STATIC_ROUTES.map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  return res.status(200).send(xml);
}
