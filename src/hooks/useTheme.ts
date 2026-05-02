import { useState, useEffect } from "react";

type ThemeMode = "light" | "dark" | "auto";
type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "theme";

const getStoredMode = (): ThemeMode => {
  if (typeof window === "undefined") return "auto";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return "auto";
};

const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const useTheme = () => {
  const [mode, setMode] = useState<ThemeMode>(getStoredMode);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => setSystemTheme(e.matches ? "dark" : "light");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const resolvedTheme: ResolvedTheme = mode === "auto" ? systemTheme : mode;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", resolvedTheme);
    if (mode === "auto") {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, mode);
    }
  }, [mode, resolvedTheme]);

  const cycleTheme = () => {
    setMode((prev) => (prev === "auto" ? "light" : prev === "light" ? "dark" : "auto"));
  };

  return { mode, resolvedTheme, setMode, cycleTheme };
};

export default useTheme;
