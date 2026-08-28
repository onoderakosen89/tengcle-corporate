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
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(
      () => setPhase("fading"),
      reduceMotion ? 250 : 1800,
    );
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  useEffect(() => {
    if (phase !== "fading") return;

    const timer = window.setTimeout(
      () => {
        setPhase("done");
        onComplete();
      },
      reduceMotion ? 150 : 700,
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
          duration: reduceMotion ? 0.1 : 0.7,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
      >
        <motion.img
          src={brandAssets.primary.white}
          alt="Tengcle - think into the future"
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.965 }}
          animate={{
            opacity: phase === "fading" ? 0 : 1,
            scale: phase === "fading" || reduceMotion ? 1 : 1.015,
          }}
          transition={{
            duration: reduceMotion ? 0.1 : phase === "fading" ? 0.7 : 1.8,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="h-auto object-contain"
          style={{ width: "min(78vw, 720px)" }}
        />

        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "fading" ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.55, delay: 0.1 }}
          className="absolute inset-0 bg-white"
        />
      </motion.div>
    </AnimatePresence>
  );
}
