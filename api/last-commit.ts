import type { VercelRequest, VercelResponse } from "@vercel/node";

const GH_USER = "alexisprovost";

interface PushEventCommit { sha: string; message: string; }
interface GitHubEvent {
  type: string;
  created_at: string;
  repo: { name: string };
  payload: { commits?: PushEventCommit[] };
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=900");

  try {
    const r = await fetch(`https://api.github.com/users/${GH_USER}/events/public`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "alexisprovost.com" },
      signal: AbortSignal.timeout(4000),
    });
    if (!r.ok) return res.status(200).json({ ok: false });

    const events = (await r.json()) as GitHubEvent[];
    const push = events.find((e) => e.type === "PushEvent" && (e.payload.commits?.length ?? 0) > 0);
    if (!push) return res.status(200).json({ ok: false });

    const commits = push.payload.commits!;
    const latest = commits[commits.length - 1];
    const repo = push.repo.name.split("/")[1] ?? push.repo.name;
    const message = latest.message.split("\n")[0].slice(0, 120);

    return res.status(200).json({
      ok: true,
      message,
      repo,
      sha: latest.sha,
      url: `https://github.com/${push.repo.name}/commit/${latest.sha}`,
      at: push.created_at,
    });
  } catch {
    return res.status(200).json({ ok: false });
  }
}
