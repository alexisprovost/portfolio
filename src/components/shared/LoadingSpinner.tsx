import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "w-5 h-5",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

export const LoadingSpinner = ({
  size = "md",
  className,
}: LoadingSpinnerProps) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <motion.div
        className={cn(
          sizes[size],
          "rounded-full border-2",
          "border-peach/30 border-t-coral",
          "[html[data-theme='dark']_&]:border-warm-peach/30 [html[data-theme='dark']_&]:border-t-warm-peach"
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
