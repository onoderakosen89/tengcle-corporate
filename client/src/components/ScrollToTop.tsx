/**
 * Scroll To Top Button Component
 * 
 * A floating button that appears when the user scrolls down the page.
 * Clicking it smoothly scrolls back to the top.
 * Design adapts to each region's style.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollToTopProps {
  /** Scroll threshold in pixels before showing the button */
  threshold?: number;
  /** Region for styling (hk, jp, us) */
  region?: "hk" | "jp" | "us" | "global";
  /** Additional class names */
  className?: string;
}

export default function ScrollToTop({
  threshold = 400,
  region = "global",
  className = "",
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Region-specific styles
  const regionStyles = {
    hk: {
      button: "bg-navy hover:bg-navy/90 text-gold border border-gold/30 shadow-lg shadow-gold/10",
      icon: "text-gold",
    },
    jp: {
      button: "bg-white/90 hover:bg-white text-navy-dark border border-gold/20 shadow-lg backdrop-blur-sm",
      icon: "text-gold-dark",
    },
    us: {
      button: "bg-navy hover:bg-navy-dark text-white border border-gold/30 shadow-xl",
      icon: "text-gold",
    },
    global: {
      button: "bg-gold hover:bg-gold-dark text-navy shadow-lg shadow-gold/20",
      icon: "text-navy",
    },
  };

  const styles = regionStyles[region];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-6 right-6 z-50 p-3 rounded-full transition-all duration-300",
            "focus:outline-none focus:ring-2 focus:ring-gold/50",
            styles.button,
            className
          )}
          aria-label="Scroll to top"
        >
          <ArrowUp className={cn("w-5 h-5", styles.icon)} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
