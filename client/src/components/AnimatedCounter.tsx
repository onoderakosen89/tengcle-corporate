/**
 * Animated Counter Component
 * 
 * Displays numbers with a counting animation when they come into view.
 * Used for statistics, achievements, and key metrics.
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delay?: number;
  className?: string;
  decimals?: number;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  delay = 0,
  className = "",
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(spring, (current) => {
    return current.toFixed(decimals);
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => {
        spring.set(value);
        setHasAnimated(true);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasAnimated, spring, value, delay]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

// Variant with plus sign for "15+" style numbers
export function AnimatedCounterPlus({
  value,
  suffix = "+",
  prefix = "",
  duration = 2,
  delay = 0,
  className = "",
}: Omit<AnimatedCounterProps, "decimals">) {
  return (
    <AnimatedCounter
      value={value}
      suffix={suffix}
      prefix={prefix}
      duration={duration}
      delay={delay}
      className={className}
      decimals={0}
    />
  );
}

// Variant for currency/large numbers with formatting
export function AnimatedCounterFormatted({
  value,
  suffix = "",
  prefix = "$",
  duration = 2,
  delay = 0,
  className = "",
  locale = "en-US",
}: AnimatedCounterProps & { locale?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => {
        let startTime: number;
        const animate = (currentTime: number) => {
          if (!startTime) startTime = currentTime;
          const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
          
          // Easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const currentValue = Math.floor(easeOutQuart * value);
          
          setDisplayValue(currentValue.toLocaleString(locale));
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setHasAnimated(true);
          }
        };
        requestAnimationFrame(animate);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasAnimated, value, duration, delay, locale]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
