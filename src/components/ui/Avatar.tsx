import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
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

const g = () => atob("aHR0cHM6Ly9pbWcuc3Nob3J0Lm5ldC9pL1dKUHIucG5n");

export const Avatar = ({ size = "lg", className }: AvatarProps) => {
  const [imgError, setImgError] = useState(false);
  const [altSrc, setAltSrc] = useState<string | null>(null);
  const c = useRef(0);
  const t = useRef(0);

  const trigger = useCallback(() => {
    setAltSrc(g());
    (window as Window & { fx?: () => void }).fx?.();

    const duration = 3000;
    const end = Date.now() + duration;
    const colors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#95E1D3", "#F38181"];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors,
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors,
    });
    frame();
  }, []);

  const handleClick = useCallback(() => {
    const now = Date.now();
    if (now - t.current > 2000) {
      c.current = 0;
    }
    t.current = now;
    c.current += 1;

    if (c.current >= 10) {
      trigger();
      c.current = 0;
    }
  }, [trigger]);

  const initials = PROFILE.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const showImage = PROFILE.avatar && !imgError;

  return (
    <div className="relative">
      {altSrc && (
        <motion.div
          className="absolute -inset-6 rounded-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            rotate: 360,
          }}
          transition={{
            opacity: { duration: 0.6 },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          }}
          style={{
            filter: "blur(16px)",
            background: "radial-gradient(circle at 30% 30%, rgba(56,189,248,0.4) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(99,102,241,0.3) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(59,130,246,0.3) 0%, transparent 50%)",
          }}
        />
      )}
      <motion.div
        className={cn(
          "relative rounded-full overflow-hidden cursor-pointer select-none",
          !showImage && "bg-gradient-to-br from-accent via-accent-light to-accent",
          "shadow-glow",
          sizes[size],
          className
        )}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={handleClick}
        whileTap={{ scale: 0.95 }}
      >
        {showImage ? (
          <>
            <img
              src={PROFILE.avatar}
              alt={PROFILE.name}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
            {altSrc && (
              <motion.div
                className="absolute bottom-0 left-1/2 w-[75%] h-[50%] bg-contain bg-bottom bg-no-repeat"
                style={{ backgroundImage: `url(${altSrc})`, x: "-50%" }}
                initial={{ y: "100%" }}
                animate={{ y: "25%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            )}
          </>
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
    </div>
  );
};

export default Avatar;
