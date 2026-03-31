import { useEffect } from "react";

const CLARITY_PROJECT_ID = "w478sbylwb";

interface ClarityFn {
  (...args: unknown[]): void;
  q?: unknown[][];
}

export const ClarityAnalytics = () => {
  useEffect(() => {
    const w = window as Window & { clarity?: ClarityFn };
    w.clarity =
      w.clarity ||
      function (this: ClarityFn, ...args: unknown[]) {
        ((w.clarity as ClarityFn).q = (w.clarity as ClarityFn).q || []).push(args);
      };

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
};
