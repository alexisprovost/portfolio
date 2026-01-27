import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import translate from "@/i18n/translate";

export const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("cookie-notice");
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem("cookie-notice", "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="cookie-consent"
          data-nosnippet
          aria-label="Cookie consent"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={cn(
            "cookie-banner cookie-consent cc-banner fixed bottom-4 left-4 right-4 z-50 max-w-sm mx-auto",
            "px-4 py-3 rounded-xl text-xs",
            "backdrop-blur-xl bg-white/40 border border-white/50 shadow-lg",
            "[html[data-theme='dark']_&]:bg-white/10 [html[data-theme='dark']_&]:border-white/10",
            "text-charcoal [html[data-theme='dark']_&]:text-sand",
            "flex items-center gap-3"
          )}
        >
          <span className="flex-1">{translate("app.cookie.message")}</span>
          <button
            onClick={dismiss}
            className={cn(
              "shrink-0 px-3 py-1 rounded-lg transition-colors cursor-pointer",
              "bg-black/10 hover:bg-black/20",
              "[html[data-theme='dark']_&]:bg-white/20 [html[data-theme='dark']_&]:hover:bg-white/30"
            )}
          >
            {translate("app.cookie.ok")}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
