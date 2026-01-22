import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "muted";
  size?: "sm" | "md";
  className?: string;
}

const variants = {
  default: cn(
    "bg-sand-dark text-charcoal",
    "[html[data-theme='dark']_&]:bg-warm-black [html[data-theme='dark']_&]:text-sand"
  ),
  accent: cn(
    "bg-peach/20 text-coral",
    "[html[data-theme='dark']_&]:bg-warm-peach/20 [html[data-theme='dark']_&]:text-warm-peach"
  ),
  muted: cn(
    "bg-charcoal/10 text-charcoal-light",
    "[html[data-theme='dark']_&]:bg-sand/10 [html[data-theme='dark']_&]:text-sand/80"
  ),
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export const Badge = ({
  children,
  variant = "default",
  size = "sm",
  className,
}: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
