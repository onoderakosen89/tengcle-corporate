/**
 * Global-only intro that presents the approved master lockup once per session.
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { brandAssets } from "@/lib/brandAssets";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"playing" | "fading" | "done">("playing");
  const [mediaState, setMediaState] = useState<
    "loading" | "playing" | "fallback"
  >("loading");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!reduceMotion) return;

    const timer = window.setTimeout(() => setPhase("fading"), 250);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || mediaState !== "fallback") return;

    const timer = window.setTimeout(() => setPhase("fading"), 500);
    return () => window.clearTimeout(timer);
  }, [mediaState, reduceMotion]);

  useEffect(() => {
    if (reduceMotion || mediaState !== "loading" || phase !== "playing") return;

    // Cloudflare cold loads can take longer than a quarter-second even for the
    // small MP4. Allow a complete start before falling back, while keeping the
    // worst-case intro under roughly 5.3 seconds.
    const loadTimer = window.setTimeout(() => setMediaState("fallback"), 1_500);
    return () => window.clearTimeout(loadTimer);
  }, [mediaState, phase, reduceMotion]);

  useEffect(() => {
    if (reduceMotion || mediaState !== "playing" || phase !== "playing") return;

    // `ended` is authoritative. This watchdog only prevents a decoder stall
    // from trapping navigation, while leaving the full 3.003s clip intact.
    const playbackTimer = window.setTimeout(() => setPhase("fading"), 3_100);
    return () => window.clearTimeout(playbackTimer);
  }, [mediaState, phase, reduceMotion]);

  useEffect(() => {
    if (phase !== "fading") return;

    const timer = window.setTimeout(
      () => {
        setPhase("done");
        onComplete();
      },
      reduceMotion ? 150 : 650
    );
    return () => window.clearTimeout(timer);
  }, [onComplete, phase, reduceMotion]);

  if (phase === "done") return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="splash"
        data-testid="global-intro"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "fading" ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: reduceMotion ? 0.1 : 0.65,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
      >
        {!reduceMotion && mediaState !== "fallback" ? (
          <video
            data-testid="global-intro-video"
            aria-hidden="true"
            autoPlay
            muted
            playsInline
            preload="auto"
            poster={brandAssets.intro.poster}
            onEnded={() => setPhase("fading")}
            onError={() => setMediaState("fallback")}
            onPlaying={() => setMediaState("playing")}
            className="absolute inset-0 size-full object-contain"
          >
            <source src={brandAssets.intro.mp4} type="video/mp4" />
            <source src={brandAssets.intro.webm} type="video/webm" />
          </video>
        ) : (
          <img
            data-testid="global-intro-static"
            src={brandAssets.primary.white}
            alt="Tengcle - think into the future"
            className="h-auto object-contain"
            style={{ width: "min(78vw, 720px)" }}
          />
        )}

        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "fading" ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.5, delay: 0.1 }}
          className="absolute inset-0 bg-white"
        />
      </motion.div>
    </AnimatePresence>
  );
}
