/**
 * Page Transition Component
 * 
 * Provides smooth fade-in/fade-out animations when navigating between pages.
 * Each region has its own transition style:
 * - Hong Kong: Professional fade with subtle slide
 * - Japan: Elegant, gentle fade with blur
 * - USA: Bold, dynamic slide
 * - Gateway: Elegant scale transition
 */

import { motion, AnimatePresence, type Easing } from "framer-motion";
import { useLocation } from "wouter";
import { useEffect, useState, type ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  region?: "hk" | "jp" | "us" | "gateway";
}

// Easing curves for each region
const easeHk: Easing = [0.16, 1, 0.3, 1];
const easeJp: Easing = [0.22, 1, 0.36, 1];
const easeUs: Easing = [0.4, 0, 0.2, 1];
const easeGateway: Easing = [0.25, 0.46, 0.45, 0.94];

// Transition variants for each region
const variants = {
  hk: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.4, ease: easeHk },
  },
  jp: {
    initial: { opacity: 0, filter: "blur(8px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(4px)" },
    transition: { duration: 0.6, ease: easeJp },
  },
  us: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.35, ease: easeUs },
  },
  gateway: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
    transition: { duration: 0.5, ease: easeGateway },
  },
};

export default function PageTransition({ children, region = "gateway" }: PageTransitionProps) {
  const [location] = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (location !== displayLocation) {
      setIsAnimating(true);
    }
  }, [location, displayLocation]);

  const handleAnimationComplete = () => {
    if (isAnimating) {
      setDisplayLocation(location);
      setIsAnimating(false);
    }
  };

  const variant = variants[region];

  return (
    <AnimatePresence mode="wait" onExitComplete={handleAnimationComplete}>
      <motion.div
        key={displayLocation}
        initial={variant.initial}
        animate={variant.animate}
        exit={variant.exit}
        transition={variant.transition}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Simpler wrapper for individual page content
export function PageContent({ children, region = "gateway" }: PageTransitionProps) {
  const variant = variants[region];

  return (
    <motion.div
      initial={variant.initial}
      animate={variant.animate}
      transition={variant.transition}
    >
      {children}
    </motion.div>
  );
}
