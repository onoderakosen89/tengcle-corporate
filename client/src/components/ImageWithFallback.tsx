/**
 * ImageWithFallback - 画像読み込み失敗時にフォールバック表示を行うコンポーネント
 * 
 * 画像が読み込めない場合、「Coming Soon」や「準備中」などのプレースホルダーを表示
 * 
 * Performance Optimizations:
 * - Native lazy loading for images below the fold
 * - Loading priority for above-the-fold images
 * - Aspect ratio preservation to prevent layout shift
 * - WebP format support with fallback
 */

import { useState, useRef, useEffect } from "react";
import { ImageOff } from "lucide-react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackText?: string;
  fallbackSubText?: string;
  webpSrc?: string;
  /** Set to true for above-the-fold images (hero, first visible images) */
  priority?: boolean;
  /** Aspect ratio for placeholder (e.g., "16/9", "4/3", "1/1") */
  aspectRatio?: string;
  /** Width for srcset optimization */
  width?: number;
  /** Height for srcset optimization */
  height?: number;
  /** Sizes attribute for responsive images */
  sizes?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  className = "",
  fallbackText = "Coming Soon",
  fallbackSubText = "準備中",
  webpSrc,
  priority = false,
  aspectRatio,
  width,
  height,
  sizes = "100vw",
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "200px", // Start loading 200px before entering viewport
        threshold: 0,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Generate srcset for responsive images
  const generateSrcSet = (baseSrc: string) => {
    if (!baseSrc || baseSrc.startsWith("http")) return undefined;
    // For local images, we could generate multiple sizes
    // For now, return undefined to use default src
    return undefined;
  };

  if (hasError) {
    return (
      <div 
        ref={imgRef}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 ${className}`}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <div className="text-center p-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-300/50 flex items-center justify-center">
            <ImageOff className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-600 font-medium text-lg mb-1">{fallbackText}</p>
          <p className="text-slate-400 text-sm">{fallbackSubText}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={imgRef}
      className={`relative ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin" />
        </div>
      )}
      
      {/* Only render image when in view or priority */}
      {isInView && (
        webpSrc ? (
          <picture>
            <source srcSet={webpSrc} type="image/webp" />
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes={sizes}
              loading={priority ? "eager" : "lazy"}
              decoding={priority ? "sync" : "async"}
              fetchPriority={priority ? "high" : "auto"}
              className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
              onError={handleError}
              onLoad={handleLoad}
            />
          </picture>
        ) : (
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            srcSet={generateSrcSet(src)}
            loading={priority ? "eager" : "lazy"}
            decoding={priority ? "sync" : "async"}
            fetchPriority={priority ? "high" : "auto"}
            className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            onError={handleError}
            onLoad={handleLoad}
          />
        )
      )}
    </div>
  );
}

/**
 * Optimized Image component for critical above-the-fold images
 * Uses priority loading and preconnect hints
 */
export function CriticalImage({
  src,
  alt,
  className = "",
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="eager"
      decoding="sync"
      fetchPriority="high"
      className={className}
    />
  );
}
