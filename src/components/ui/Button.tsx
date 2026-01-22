import { motion, HTMLMotionProps } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { FiArrowRight } from "react-icons/fi";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  showArrow?: boolean;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<HTMLMotionProps<"button">, keyof ButtonBaseProps> & {
    as?: "button";
    to?: never;
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.ComponentProps<typeof Link>, keyof ButtonBaseProps> & {
    as: "link";
    href?: never;
  };

type ButtonAsAnchor = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    as: "a";
    to?: never;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

const variants: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-gradient-to-r from-peach to-coral text-charcoal font-medium",
    "hover:from-coral hover:to-peach hover:shadow-warm-lg",
    "[html[data-theme='dark']_&]:from-warm-peach [html[data-theme='dark']_&]:to-peach",
    "[html[data-theme='dark']_&]:text-warm-black"
  ),
  secondary: cn(
    "bg-linen text-charcoal border border-sand-dark",
    "hover:bg-sand hover:border-peach",
    "[html[data-theme='dark']_&]:bg-dark-linen [html[data-theme='dark']_&]:text-sand",
    "[html[data-theme='dark']_&]:border-warm-black [html[data-theme='dark']_&]:hover:border-warm-peach"
  ),
  ghost: cn(
    "bg-transparent text-charcoal",
    "hover:bg-sand/50",
    "[html[data-theme='dark']_&]:text-sand [html[data-theme='dark']_&]:hover:bg-warm-black/50"
  ),
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-2xl",
};

export const Button = ({
  variant = "primary",
  size = "md",
  showArrow = false,
  className,
  children,
  as = "button",
  ...props
}: ButtonProps) => {
  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2",
    "font-medium transition-all duration-300",
    "focus:outline-none focus:ring-2 focus:ring-peach/50",
    variants[variant],
    sizes[size],
    className
  );

  const content = (
    <>
      {children}
      {showArrow && (
        <FiArrowRight className="transition-transform group-hover:translate-x-1" />
      )}
    </>
  );

  if (as === "link") {
    const { to, ...linkProps } = props as ButtonAsLink;
    return (
      <Link to={to} className={cn(baseClasses, "group")} {...linkProps}>
        {content}
      </Link>
    );
  }

  if (as === "a") {
    const anchorProps = props as ButtonAsAnchor;
    return (
      <a className={cn(baseClasses, "group")} {...anchorProps}>
        {content}
      </a>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <motion.button
      className={cn(baseClasses, "group")}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...buttonProps}
    >
      {content}
    </motion.button>
  );
};

export default Button;
