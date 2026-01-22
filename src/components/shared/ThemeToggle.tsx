import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        "w-10 h-10 flex items-center justify-center",
        "rounded-xl",
        "bg-linen border border-sand-dark/30",
        "text-charcoal/70",
        "active:scale-95 transition-transform",
        "[html[data-theme='dark']_&]:bg-dark-linen",
        "[html[data-theme='dark']_&]:border-charcoal-light/20",
        "[html[data-theme='dark']_&]:text-sand/70",
        className
      )}
      whileTap={{ scale: 0.92 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
    </motion.button>
  );
};

export default ThemeToggle;
