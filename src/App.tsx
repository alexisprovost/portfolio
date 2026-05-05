import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AnimatePresence, motion } from "framer-motion";

import "@/styles/main.css";

import { HomePage } from "@/pages";
import { CookieBanner, LoadingSpinner } from "@/components/shared";

const ProjectsPage = lazy(() => import("@/pages/ProjectsPage").then((m) => ({ default: m.ProjectsPage })));
const ContactPage = lazy(() => import("@/pages/ContactPage").then((m) => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));

const RouteFallback = () => (
  <div className="min-h-svh flex items-center justify-center bg-sand [html[data-theme='dark']_&]:bg-warm-black">
    <LoadingSpinner size="lg" />
  </div>
);

import { I18nProvider } from "@/i18n";
import getBrowserLocale from "@/hooks/getBrowserLocale";
import { useFx } from "@/hooks/useFx";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: {
      createController: (
        el: HTMLElement,
        options: { uri: string; width: number; height: number },
        callback: (controller: { play: () => void; restart: () => void; addListener: (event: string, callback: (e?: { data: { position: number; duration: number } }) => void) => void }) => void
      ) => void;
    }) => void;
  }
}

const Fx = ({ active }: { active: boolean }) => {
  const [playerHidden, setPlayerHidden] = useState(false);
  const embedRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<{ play: () => void; restart: () => void } | null>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (active) {
      document.documentElement.style.backgroundColor = "#0a0a14";
      document.body.style.backgroundColor = "#0a0a14";
    } else {
      document.documentElement.style.backgroundColor = "";
      document.body.style.backgroundColor = "";
    }
    return () => {
      document.documentElement.style.backgroundColor = "";
      document.body.style.backgroundColor = "";
    };
  }, [active]);

  useEffect(() => {
    if (!active || !embedRef.current || scriptLoaded.current) return;
    scriptLoaded.current = true;

    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyIframeApiReady = (api) => {
      if (!embedRef.current) return;
      api.createController(
        embedRef.current,
        { uri: "spotify:track:32VcFfFDkzhZlK3nEFFrnq", width: 300, height: 80 },
        (controller) => {
          controllerRef.current = controller;
          controller.addListener("ready", () => {
            controller.play();
          });
          controller.addListener("playback_update", (e) => {
            if (e?.data && e.data.duration > 0 && e.data.position >= e.data.duration - 500) {
              controller.restart();
            }
          });
        }
      );
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      {/* Aurora background */}
      <motion.div
        className="fixed -inset-[10%] z-0 pointer-events-none"
        initial={{ opacity: 0, scale: 1, rotate: 0 }}
        animate={{
          opacity: 1,
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          opacity: { duration: 0.6 },
          scale: { duration: 14, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 14, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          filter: "blur(30px) saturate(105%)",
          background: "radial-gradient(50% 60% at 15% 20%, #38bdf82e 0%, #38bdf800 60%), radial-gradient(40% 50% at 85% 30%, #6366f124 0%, #6366f100 60%), radial-gradient(60% 60% at 50% 95%, #3b82f61f 0%, #3b82f600 60%)",
        }}
      />

      {/* Spotify player */}
      <motion.div
        className="fixed bottom-4 right-0 z-50 flex items-center touch-manipulation cursor-grab active:cursor-grabbing"
        initial={{ x: 320 }}
        animate={{ x: playerHidden ? 300 : 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        drag="x"
        dragConstraints={{ left: 0, right: 300 }}
        dragElastic={0.05}
        onDragEnd={(_, info) => {
          if (info.offset.x > 80) setPlayerHidden(true);
          else if (info.offset.x < -30) setPlayerHidden(false);
        }}
      >
        <div className="flex bg-neutral-800 rounded-l-lg shadow-lg overflow-hidden">
          <div
            className="w-5 h-[80px] flex items-center justify-center shrink-0 cursor-pointer hover:bg-neutral-700 transition-colors"
            onClick={() => setPlayerHidden(!playerHidden)}
          >
            <span className={cn(
              "text-white/60 text-xs transition-transform",
              playerHidden ? "rotate-180" : ""
            )}>
              ‹
            </span>
          </div>
          <div ref={embedRef} className="w-[300px] h-[80px] bg-[#121212] [&>iframe]:rounded-none" />
        </div>
      </motion.div>
    </>
  );
};

const App = () => {
  const [locale, setLocale] = useState(getBrowserLocale());
  const { active: fxOn, activate: fxGo } = useFx();

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  useEffect(() => {
    const w = window as Window & { fx?: () => void; fxOn?: boolean };
    w.fx = fxGo;
    w.fxOn = fxOn;
  }, [fxGo, fxOn]);

  const location = useLocation();

  return (
    <I18nProvider locale={locale}>
      <Fx active={fxOn} />
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
      <AnimatePresence mode="wait">
        <Suspense fallback={<RouteFallback />}>
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
            <Route
              path="*"
              element={<NotFoundPage locale={locale} onLocaleChange={setLocale} />}
            />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <CookieBanner />
      <Analytics />
      <SpeedInsights />
    </I18nProvider>
  );
};

export default App;
