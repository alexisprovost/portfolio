import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { FEATURED_LINKS } from "@/lib/constants";
import translate from "@/i18n/translate";
import { cn } from "@/lib/utils";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export const FeaturedLinks = () => {
  return (
    <motion.div
      className="py-4 space-y-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {FEATURED_LINKS.map((link) => (
        <motion.div key={link.id} variants={itemVariants}>
          <Link to={link.to} className="block group">
            <div
              className={cn(
                "flex items-center justify-between",
                "px-5 py-4 rounded-2xl",
                "bg-linen border border-sand-dark/40",
                "transition-all duration-200",
                "active:scale-[0.98]",
                "group-hover:border-accent/30 group-hover:shadow-soft",
                "[html[data-theme='dark']_&]:bg-dark-linen",
                "[html[data-theme='dark']_&]:border-charcoal-light/20",
                "[html[data-theme='dark']_&]:group-hover:border-accent/30"
              )}
            >
              <span
                className={cn(
                  "font-medium text-base",
                  "text-charcoal [html[data-theme='dark']_&]:text-sand"
                )}
              >
                {translate(link.labelKey)}
              </span>
              <FiChevronRight
                className={cn(
                  "w-5 h-5 transition-transform duration-200",
                  "text-charcoal-light [html[data-theme='dark']_&]:text-sand/50",
                  "group-hover:translate-x-0.5 group-hover:text-accent"
                )}
              />
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeaturedLinks;
