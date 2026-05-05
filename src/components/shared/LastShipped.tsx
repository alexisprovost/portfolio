import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { cn } from "@/lib/utils";

interface CommitInfo {
  ok: boolean;
  message?: string;
  repo?: string;
  url?: string;
  at?: string;
}

const formatRelative = (iso: string, locale: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const seconds = Math.max(0, Math.floor(diff / 1000));
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto", style: "short" });
  if (seconds < 60) return rtf.format(-seconds, "second");
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return rtf.format(-minutes, "minute");
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return rtf.format(-hours, "hour");
  const days = Math.floor(hours / 24);
  if (days < 30) return rtf.format(-days, "day");
  const months = Math.floor(days / 30);
  return rtf.format(-months, "month");
};

export const LastShipped = () => {
  const intl = useIntl();
  const [data, setData] = useState<CommitInfo | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/last-commit")
      .then((r) => r.json())
      .then((json: CommitInfo) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  if (!data?.ok || !data.at) return null;

  const relative = formatRelative(data.at, intl.locale);
  const fullDate = new Date(data.at).toLocaleString(intl.locale);

  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      title={`${data.message} — ${fullDate}`}
      className={cn(
        "inline-flex items-center gap-1.5 group",
        "text-charcoal/55 hover:text-charcoal",
        "[html[data-theme='dark']_&]:text-sand/55 [html[data-theme='dark']_&]:hover:text-sand",
        "transition-colors"
      )}
    >
      <span
        className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)] animate-pulse"
        aria-hidden
      />
      <span className="font-mono">{relative}</span>
    </a>
  );
};

export default LastShipped;
