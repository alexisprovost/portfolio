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

  const toggleLanguage = () => {
    onChange(isEnglish ? LOCALES.FRENCH : LOCALES.ENGLISH);
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className={cn(
        "h-10 px-3.5 flex items-center justify-center",
        "rounded-xl",
        "bg-linen border border-sand-dark/30",
        "text-charcoal/70 text-sm font-medium",
        "active:scale-95 transition-transform",
        "[html[data-theme='dark']_&]:bg-dark-linen",
        "[html[data-theme='dark']_&]:border-charcoal-light/20",
        "[html[data-theme='dark']_&]:text-sand/70",
        className
      )}
      whileTap={{ scale: 0.92 }}
      aria-label={isEnglish ? "Passer en français" : "Switch to English"}
    >
      {isEnglish ? "FR" : "EN"}
    </motion.button>
  );
};

export default LanguageToggle;
