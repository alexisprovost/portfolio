import { motion } from "framer-motion";
import { SOCIAL_LINKS, type SocialLink } from "@/lib/constants";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

interface SocialCardProps {
  link: SocialLink;
}

const SocialCard = ({ link }: SocialCardProps) => {
  const Icon = link.icon;

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={itemVariants}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "group flex flex-col items-center justify-center gap-1.5",
        "aspect-square rounded-xl",
        "bg-linen border border-sand-dark/30",
        "transition-colors duration-200",
        "active:bg-sand-dark/20",
        // Desktop hover only
        "hover:border-accent/30 hover:bg-accent/5",
        "[html[data-theme='dark']_&]:bg-dark-linen",
        "[html[data-theme='dark']_&]:border-charcoal-light/20",
        "[html[data-theme='dark']_&]:active:bg-charcoal-light/20"
      )}
    >
      <div className="relative w-6 h-6">
        <Icon
          className={cn(
            "w-full h-full",
            "text-charcoal [html[data-theme='dark']_&]:text-sand"
          )}
        />
        {/* Colored overlay - visible on hover (desktop) */}
        <span
          className={cn(
            "absolute inset-0 opacity-0",
            "transition-opacity duration-200",
            "group-hover:opacity-100"
          )}
          style={{ color: link.brandColor }}
        >
          <Icon className="w-full h-full" />
        </span>
      </div>
      <span
        className={cn(
          "text-xs font-medium",
          "text-charcoal/70 [html[data-theme='dark']_&]:text-sand/70"
        )}
      >
        {link.name}
      </span>
    </motion.a>
  );
};

export const SocialGrid = () => {
  return (
    <motion.div
      className="py-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-5 gap-2.5">
        {SOCIAL_LINKS.map((link) => (
          <SocialCard key={link.name} link={link} />
        ))}
      </div>
    </motion.div>
  );
};

export default SocialGrid;
