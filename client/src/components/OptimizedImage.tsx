/**
 * Optimized Image Component
 * 
 * Provides WebP format with fallback to original format.
 * Includes skeleton loading state for better UX.
 * Uses picture element for browser-native format selection.
 */

import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  aspectRatio?: "square" | "video" | "portrait" | "auto";
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Converts image path to WebP path
 * /images/photo.jpg -> /images/photo.webp
 */
function getWebPPath(src: string): string {
  // Handle paths that already end with .webp
  if (src.endsWith('.webp')) return src;
  
  // Replace .jpg, .jpeg, .png with .webp
  return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  aspectRatio = "auto",
  priority = false,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const webpSrc = getWebPPath(src);
  const hasWebP = webpSrc !== src;

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
      {/* Skeleton Loading State */}
      {isLoading && !hasError && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-shimmer bg-[length:200%_100%]"
        />
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <span className="text-gray-400 text-sm">Failed to load image</span>
        </div>
      )}

      {/* Picture element with WebP and fallback */}
      <picture>
        {hasWebP && (
          <source srcSet={webpSrc} type="image/webp" />
        )}
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            isLoading || hasError ? "opacity-0" : "opacity-100",
            imgClassName
          )}
          onLoad={handleLoad}
          onError={handleError}
        />
      </picture>
    </div>
  );
}

/**
 * Background image with WebP support
 * Uses CSS background-image with WebP detection
 */
export function OptimizedBackgroundImage({
  src,
  alt,
  className = "",
  children,
  overlay = false,
  overlayClassName = "",
}: {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
  overlay?: boolean;
  overlayClassName?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const webpSrc = getWebPPath(src);

  return (
    <div className={cn("relative", className)}>
      {/* Skeleton while loading */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-shimmer bg-[length:200%_100%]" />
      )}
      
      {/* Hidden image to detect load */}
      <picture className="hidden">
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      </picture>

      {/* Background image container */}
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        style={{
          backgroundImage: `image-set(url("${webpSrc}") type("image/webp"), url("${src}") type("image/jpeg"))`,
        }}
        role="img"
        aria-label={alt}
      />

      {/* Optional overlay */}
      {overlay && (
        <div className={cn("absolute inset-0", overlayClassName)} />
      )}

      {/* Content */}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
}
