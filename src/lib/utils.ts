import { type ClassValue, clsx } from "clsx";

// Simple cn function without tailwind-merge for now
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Check if we're in dark mode
export function isDarkMode(): boolean {
  if (typeof window === "undefined") return false;
  return document.documentElement.getAttribute("data-theme") === "dark";
}

// Toggle theme
export function toggleTheme(): void {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

// Initialize theme from localStorage or system preference
export function initializeTheme(): void {
  const stored = localStorage.getItem("theme");
  if (stored) {
    document.documentElement.setAttribute("data-theme", stored);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

// Format date using date-fns
export { format, formatDistance, parseISO, isBefore } from "date-fns";
export { fr, enUS } from "date-fns/locale";
