/**
 * SplashScreen Component
 * 
 * Displays a full-screen logo video on page load.
 * After the video ends, fades out and reveals the main content.
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      // Start fade out animation
      setIsVisible(false);
      // Call onComplete after fade animation
      setTimeout(() => {
        onComplete();
      }, 500);
    };

    const handleCanPlay = () => {
      video.play().catch(() => {
        // If autoplay fails, skip splash screen
        onComplete();
      });
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("canplay", handleCanPlay);

    // Fallback: if video doesn't load within 5 seconds, skip
    const timeout = setTimeout(() => {
      if (isVisible) {
        setIsVisible(false);
        setTimeout(() => onComplete(), 500);
      }
    }, 8000);

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("canplay", handleCanPlay);
      clearTimeout(timeout);
    };
  }, [onComplete, isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
        >
          <video
            ref={videoRef}
            muted
            playsInline
            className="max-w-[80vw] max-h-[80vh] w-auto h-auto object-contain"
          >
            <source src="/videos/tengcle_logo_1.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
