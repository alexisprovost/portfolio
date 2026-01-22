import { motion } from "framer-motion";
import { Avatar } from "@/components/ui";
import { PROFILE } from "@/lib/constants";
import translate from "@/i18n/translate";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export const ProfileSection = () => {
  return (
    <motion.div
      className="flex flex-col items-center text-center pb-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-5">
        <Avatar size="xl" />
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className={cn(
          "text-2xl sm:text-3xl font-display font-bold mb-1.5",
          "text-charcoal [html[data-theme='dark']_&]:text-sand"
        )}
      >
        {PROFILE.name}
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className={cn(
          "text-base sm:text-lg",
          "text-charcoal-light [html[data-theme='dark']_&]:text-sand/60"
        )}
      >
        {translate(PROFILE.taglineKey)}
      </motion.p>
    </motion.div>
  );
};

export default ProfileSection;
