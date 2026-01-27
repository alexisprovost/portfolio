import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LOCALES } from "@/i18n/locales";

interface LanguageToggleProps {
  locale: string;
  onChange: (locale: string) => void;
  className?: string;
}

export const LanguageToggle = ({
  locale,
  onChange,
  className,
}: LanguageToggleProps) => {
  const isEnglish = locale === LOCALES.ENGLISH;

  return (
    <div
      className={cn(
        "relative flex items-center h-10 p-1 rounded-full",
        "bg-black/5 backdrop-blur-sm",
        "[html[data-theme='dark']_&]:bg-white/5",
        className
      )}
    >
      <motion.div
        className={cn(
          "absolute h-8 w-10 rounded-full",
          "bg-white shadow-sm",
          "[html[data-theme='dark']_&]:bg-white/15"
        )}
        animate={{ x: isEnglish ? 0 : 40 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      <button
        onClick={() => onChange(LOCALES.ENGLISH)}
        className={cn(
          "relative z-10 w-10 h-8 text-xs font-semibold rounded-full transition-colors",
          isEnglish
            ? "text-charcoal [html[data-theme='dark']_&]:text-sand"
            : "text-charcoal/40 [html[data-theme='dark']_&]:text-sand/40"
        )}
      >
        EN
      </button>
      <button
        onClick={() => onChange(LOCALES.FRENCH)}
        className={cn(
          "relative z-10 w-10 h-8 text-xs font-semibold rounded-full transition-colors",
          !isEnglish
            ? "text-charcoal [html[data-theme='dark']_&]:text-sand"
            : "text-charcoal/40 [html[data-theme='dark']_&]:text-sand/40"
        )}
      >
        FR
      </button>
    </div>
  );
};

export default LanguageToggle;
