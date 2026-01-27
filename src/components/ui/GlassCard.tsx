import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  hover?: boolean;
  glow?: boolean;
}

export const GlassCard = ({
  children,
  className,
  hover = true,
  glow = false,
  ...props
}: GlassCardProps) => {
  return (
    <motion.div
      className={cn(
        "rounded-2xl backdrop-blur-xl",
        "bg-white/40 border border-white/50 shadow-lg",
        "[html[data-theme='dark']_&]:bg-white/5 [html[data-theme='dark']_&]:border-white/10",
        hover && "transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
        glow && "animate-glow",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
