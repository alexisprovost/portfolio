import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";
import { PROFILE } from "@/lib/constants";

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void;
  }
}

interface SpotifyIFrameAPI {
  createController: (
    el: HTMLElement,
    options: { uri: string; width: number; height: number },
    callback: (controller: SpotifyEmbedController) => void
  ) => void;
}

interface SpotifyEmbedController {
  play: () => void;
  restart: () => void;
  addListener: (event: string, callback: (e?: { data: { position: number; duration: number; isPaused: boolean } }) => void) => void;
}

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
  const [showPlayer, setShowPlayer] = useState(false);
  const [playerHidden, setPlayerHidden] = useState(false);
  const c = useRef(0);
  const t = useRef(0);
  const embedRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SpotifyEmbedController | null>(null);

  useEffect(() => {
    if (!showPlayer || !embedRef.current || controllerRef.current) return;

    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyIframeApiReady = (api) => {
      if (!embedRef.current) return;
      api.createController(
        embedRef.current,
        { uri: "spotify:track:32VcFfFDkzhZlK3nEFFrnq", width: 300, height: 80 },
        (controller) => {
          controllerRef.current = controller;
          controller.addListener("ready", () => {
            controller.play();
          });
          controller.addListener("playback_update", (e) => {
            if (e?.data && e.data.duration > 0 && e.data.position >= e.data.duration - 500) {
              controller.restart();
            }
          });
        }
      );
    };

    return () => {
      script.remove();
    };
  }, [showPlayer]);

  const fx = useCallback(() => {
    setAltSrc(g());
    setShowPlayer(true);

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
      fx();
      c.current = 0;
    }
  }, [fx]);

  const initials = PROFILE.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const showImage = PROFILE.avatar && !imgError;

  return (
    <>
      {/* Aurora background */}
      {altSrc && (
        <motion.div
          className="fixed -inset-[10%] z-0 pointer-events-none"
          initial={{ opacity: 0, scale: 1, rotate: 0 }}
          animate={{
            opacity: 1,
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            opacity: { duration: 0.6 },
            scale: { duration: 14, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 14, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{
            filter: "blur(30px) saturate(105%)",
            background: "radial-gradient(50% 60% at 15% 20%, #38bdf82e 0%, #38bdf800 60%), radial-gradient(40% 50% at 85% 30%, #6366f124 0%, #6366f100 60%), radial-gradient(60% 60% at 50% 95%, #3b82f61f 0%, #3b82f600 60%)",
          }}
        />
      )}
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
      {showPlayer && (
        <motion.div
          className="fixed bottom-4 right-0 z-50 flex items-center touch-manipulation cursor-grab active:cursor-grabbing"
          initial={{ x: 320 }}
          animate={{ x: playerHidden ? 300 : 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          drag="x"
          dragConstraints={{ left: 0, right: 300 }}
          dragElastic={0.05}
          dragListener={true}
          onDragEnd={(_, info) => {
            if (info.offset.x > 80) setPlayerHidden(true);
            else if (info.offset.x < -30) setPlayerHidden(false);
          }}
        >
          <div className="flex bg-neutral-800 rounded-l-lg shadow-lg overflow-hidden">
            <div
              className="w-5 h-[80px] flex items-center justify-center shrink-0 cursor-pointer hover:bg-neutral-700 transition-colors"
              onClick={() => setPlayerHidden(!playerHidden)}
            >
              <span className={cn(
                "text-white/60 text-xs transition-transform",
                playerHidden ? "rotate-180" : ""
              )}>
                ‹
              </span>
            </div>
            <div ref={embedRef} className="w-[300px] h-[80px]" />
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Avatar;
