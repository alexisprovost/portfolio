import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

import "@/styles/main.css";

import { HomePage, ProjectsPage, ContactPage } from "@/pages";

import { I18nProvider } from "@/i18n";
import getBrowserLocale from "@/hooks/getBrowserLocale";

const App = () => {
  const [locale, setLocale] = useState(getBrowserLocale());

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  // Initialize theme on mount
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      document.documentElement.setAttribute("data-theme", stored);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const location = useLocation();

  return (
    <I18nProvider locale={locale}>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "font-sans",
          style: {
            background: "var(--color-linen)",
            border: "1px solid var(--color-sand-dark)",
            color: "var(--color-charcoal)",
          },
        }}
      />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={<HomePage locale={locale} onLocaleChange={setLocale} />}
          />
          <Route
            path="/projects"
            element={<ProjectsPage locale={locale} onLocaleChange={setLocale} />}
          />
          <Route
            path="/contact"
            element={<ContactPage locale={locale} onLocaleChange={setLocale} />}
          />
        </Routes>
      </AnimatePresence>
    </I18nProvider>
  );
};

export default App;
