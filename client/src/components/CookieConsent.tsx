/**
 * Cookie Consent Banner Component
 * 
 * GDPR and privacy law compliant cookie consent UI.
 * Stores user preference in localStorage.
 * Supports multiple languages.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CookieConsentProps {
  /** Language for the banner text */
  lang?: "en" | "ja" | "zh";
  /** Position of the banner */
  position?: "bottom" | "bottom-left" | "bottom-right";
  /** Additional class names */
  className?: string;
}

const translations = {
  en: {
    title: "Cookie Notice",
    message: "We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking 'Accept All', you consent to our use of cookies.",
    acceptAll: "Accept All",
    acceptNecessary: "Necessary Only",
    learnMore: "Learn More",
    privacyPolicy: "Privacy Policy",
  },
  ja: {
    title: "Cookieについて",
    message: "当サイトでは、ブラウジング体験の向上、サイトトラフィックの分析、コンテンツのパーソナライズのためにCookieを使用しています。「すべて許可」をクリックすると、Cookieの使用に同意したことになります。",
    acceptAll: "すべて許可",
    acceptNecessary: "必要なもののみ",
    learnMore: "詳細",
    privacyPolicy: "プライバシーポリシー",
  },
  zh: {
    title: "Cookie 通知",
    message: "我们使用 Cookie 来增强您的浏览体验、分析网站流量并个性化内容。点击'全部接受'即表示您同意我们使用 Cookie。",
    acceptAll: "全部接受",
    acceptNecessary: "仅必要的",
    learnMore: "了解更多",
    privacyPolicy: "隐私政策",
  },
};

const COOKIE_CONSENT_KEY = "tengcle-cookie-consent";

type ConsentStatus = "accepted-all" | "accepted-necessary" | null;

export default function CookieConsent({
  lang = "en",
  position = "bottom",
  className = "",
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentStatus;
    if (!consent) {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
    setIsLoaded(true);
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted-all");
    setIsVisible(false);
    // Here you would typically enable all cookies/tracking
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted-necessary");
    setIsVisible(false);
    // Here you would only enable necessary cookies
  };

  const positionClasses = {
    bottom: "bottom-0 left-0 right-0",
    "bottom-left": "bottom-4 left-4 max-w-md",
    "bottom-right": "bottom-4 right-4 max-w-md",
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={cn(
            "fixed z-[100] p-4 md:p-6",
            positionClasses[position],
            className
          )}
        >
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Cookie className="w-5 h-5 text-gold" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {t.title}
                </h3>
              </div>
              <button
                onClick={handleAcceptNecessary}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="px-4 md:px-6 py-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {t.message}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 px-4 md:px-6 pb-4 md:pb-6">
              <Button
                onClick={handleAcceptAll}
                className="flex-1 bg-navy hover:bg-navy-dark text-white"
              >
                {t.acceptAll}
              </Button>
              <Button
                onClick={handleAcceptNecessary}
                variant="outline"
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                {t.acceptNecessary}
              </Button>
            </div>

            {/* Privacy Policy Link */}
            <div className="px-4 md:px-6 pb-4 text-center">
              <a
                href="/privacy"
                className="text-xs text-gray-500 hover:text-gold transition-colors underline"
              >
                {t.privacyPolicy}
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Hook to check cookie consent status
 */
export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentStatus>(null);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentStatus;
    setConsent(stored);
  }, []);

  return {
    consent,
    hasConsent: consent !== null,
    acceptedAll: consent === "accepted-all",
    acceptedNecessary: consent === "accepted-necessary",
  };
}
