import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PROFILE } from "@/lib/constants";

interface AvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  sm: "w-14 h-14",
  md: "w-20 h-20",
  lg: "w-28 h-28",
  xl: "w-32 h-32",
};

export const Avatar = ({ size = "lg", className }: AvatarProps) => {
  const [imgError, setImgError] = useState(false);
  
  const initials = PROFILE.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const showImage = PROFILE.avatar && !imgError;

  return (
    <motion.div
      className={cn(
        "relative rounded-full overflow-hidden",
        !showImage && "bg-gradient-to-br from-accent via-accent-light to-accent",
        "shadow-glow",
        sizes[size],
        className
      )}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {showImage ? (
        <img
          src={PROFILE.avatar}
          alt={PROFILE.name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent via-accent-light to-accent">
          <span
            className={cn(
              "font-display font-bold text-white select-none",
              size === "sm" && "text-base",
              size === "md" && "text-xl",
              size === "lg" && "text-2xl",
              size === "xl" && "text-3xl"
            )}
          >
            {initials}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default Avatar;
