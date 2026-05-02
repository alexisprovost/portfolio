import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { BsCircleHalf } from "react-icons/bs";
import { useWebHaptics } from "web-haptics/react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

interface ThemeToggleProps {
  className?: string;
}

const labels = {
  auto: "Theme: auto. Tap to switch to light.",
  light: "Theme: light. Tap to switch to dark.",
  dark: "Theme: dark. Tap to switch to auto.",
};

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { mode, cycleTheme } = useTheme();
  const haptic = useWebHaptics();

  const Icon = mode === "auto" ? BsCircleHalf : mode === "light" ? FiSun : FiMoon;

  return (
    <motion.button
      onClick={() => {
        haptic.trigger("light");
        cycleTheme();
      }}
      className={cn(
        "relative w-10 h-10 flex items-center justify-center overflow-hidden",
        "rounded-full",
        "bg-black/5 backdrop-blur-sm",
        "[html[data-theme='dark']_&]:bg-white/5",
        className
      )}
      whileTap={{ scale: 0.9 }}
      aria-label={labels[mode]}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "text-charcoal/70 [html[data-theme='dark']_&]:text-sand/70"
          )}
        >
          <Icon size={18} />
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
