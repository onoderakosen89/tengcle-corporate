/**
 * Image Skeleton Component
 * 
 * Displays a skeleton loading state while images are loading.
 * Features a subtle shimmer animation for better UX.
 */

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageSkeletonProps {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
  aspectRatio?: "square" | "video" | "portrait" | "auto";
  onLoad?: () => void;
  onError?: () => void;
}

export default function ImageSkeleton({
  src,
  alt,
  className = "",
  skeletonClassName = "",
  aspectRatio = "auto",
  onLoad,
  onError,
}: ImageSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    auto: "",
  }[aspectRatio];

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  return (
    <div className={cn("relative overflow-hidden", aspectRatioClass, className)}>
      {/* Skeleton */}
      {isLoading && (
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800",
            "animate-shimmer bg-[length:200%_100%]",
            skeletonClassName
          )}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <span className="text-gray-400 text-sm">Failed to load</span>
        </div>
      )}

      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
          isLoading || hasError ? "opacity-0" : "opacity-100"
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}

// Card skeleton for loading states
export function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={cn("rounded-lg overflow-hidden", className)}>
      <div className="animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 bg-[length:200%_100%] aspect-video" />
      <div className="p-4 space-y-3">
        <div className="animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 bg-[length:200%_100%] h-4 w-3/4 rounded" />
        <div className="animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 bg-[length:200%_100%] h-3 w-full rounded" />
        <div className="animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 bg-[length:200%_100%] h-3 w-2/3 rounded" />
      </div>
    </div>
  );
}

// Text skeleton for loading states
export function TextSkeleton({ 
  lines = 3, 
  className = "" 
}: { 
  lines?: number; 
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 bg-[length:200%_100%] h-3 rounded",
            i === lines - 1 ? "w-2/3" : "w-full"
          )}
        />
      ))}
    </div>
  );
}
