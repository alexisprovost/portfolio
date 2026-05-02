import { useEffect } from "react";

const CLARITY_PROJECT_ID = "w478sbylwb";

interface ClarityFn {
  (...args: unknown[]): void;
  q?: unknown[][];
}

export const ClarityAnalytics = () => {
  useEffect(() => {
    let script: HTMLScriptElement | null = null;
    let cancelled = false;

    const load = () => {
      if (cancelled) return;
      const w = window as Window & { clarity?: ClarityFn };
      w.clarity =
        w.clarity ||
        function (this: ClarityFn, ...args: unknown[]) {
          ((w.clarity as ClarityFn).q = (w.clarity as ClarityFn).q || []).push(args);
        };

      script = document.createElement("script");
      script.async = true;
      script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
      document.head.appendChild(script);
    };

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const handle: number = w.requestIdleCallback
      ? w.requestIdleCallback(load, { timeout: 4000 })
      : (setTimeout(load, 2500) as unknown as number);

    return () => {
      cancelled = true;
      if (w.cancelIdleCallback) w.cancelIdleCallback(handle);
      else clearTimeout(handle);
      script?.remove();
    };
  }, []);

  return null;
};
