/**
 * SplashScreen Component
 * 
 * Displays a full-screen logo video on page load.
 * After the video ends, smoothly transitions to reveal the main content.
 * Responsive design with letterboxing/pillarboxing for various screen sizes.
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"playing" | "fading" | "done">("playing");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      // Start fade out animation
      setPhase("fading");
    };

    const handleCanPlay = () => {
      video.play().catch(() => {
        // If autoplay fails, skip splash screen
        setPhase("done");
        onComplete();
      });
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("canplay", handleCanPlay);

    // Fallback: if video doesn't load within 8 seconds, skip
    const timeout = setTimeout(() => {
      if (phase === "playing") {
        setPhase("fading");
      }
    }, 8000);

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("canplay", handleCanPlay);
      clearTimeout(timeout);
    };
  }, [onComplete, phase]);

  // Handle animation completion
  useEffect(() => {
    if (phase === "fading") {
      const timer = setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 1000); // Match the exit animation duration
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  if (phase === "done") return null;

  return (
    <AnimatePresence mode="wait">
      {(phase === "playing" || phase === "fading") && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          animate={{ 
            opacity: phase === "fading" ? 0 : 1,
          }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 1,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Video container - full screen with object-contain for letterboxing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: phase === "fading" ? 0 : 1 
            }}
            transition={{ 
              duration: phase === "fading" ? 1 : 0.3,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <video
              ref={videoRef}
              muted
              playsInline
              className="w-full h-full object-contain"
              style={{
                // Ensure video maintains aspect ratio with black letterboxing/pillarboxing
                maxWidth: '100vw',
                maxHeight: '100vh',
              }}
            >
              <source src="/videos/tengcle_logo_1.mp4" type="video/mp4" />
            </video>
          </motion.div>
          
          {/* Smooth white overlay that fades in during transition */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "fading" ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute inset-0 bg-white"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
