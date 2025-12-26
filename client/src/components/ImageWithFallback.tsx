/**
 * ImageWithFallback - 画像読み込み失敗時にフォールバック表示を行うコンポーネント
 * 
 * 画像が読み込めない場合、「Coming Soon」や「準備中」などのプレースホルダーを表示
 */

import { useState } from "react";
import { ImageOff } from "lucide-react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackText?: string;
  fallbackSubText?: string;
  webpSrc?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  className = "",
  fallbackText = "Coming Soon",
  fallbackSubText = "準備中",
  webpSrc,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <div 
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 ${className}`}
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
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin" />
        </div>
      )}
      {webpSrc ? (
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            onError={handleError}
            onLoad={handleLoad}
          />
        </picture>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onError={handleError}
          onLoad={handleLoad}
        />
      )}
    </div>
  );
}
