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
        "rounded-2xl backdrop-blur-md",
        "bg-linen/80 border border-sand-dark/50",
        "[html[data-theme='dark']_&]:bg-dark-linen/80 [html[data-theme='dark']_&]:border-warm-black/50",
        hover && "transition-all duration-300 hover:scale-[1.02] shadow-warm hover:shadow-warm-lg",
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
