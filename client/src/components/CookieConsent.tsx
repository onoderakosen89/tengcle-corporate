/**
 * Cookie Consent Banner Component
 * 
 * GDPR and privacy law compliant cookie consent UI.
 * Stores user preference in localStorage.
 * Supports multiple languages.
 * Controls Google Analytics tracking based on consent.
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CookieConsentProps {
  /** Language for the banner text */
  lang?: "en" | "ja" | "zh";
  /** Position of the banner */
  position?: "bottom" | "bottom-left" | "bottom-right";
  /** Base path for privacy policy link */
  privacyPolicyPath?: string;
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
const GA_MEASUREMENT_ID = "G-JE6B15C29Q";

export type ConsentStatus = "accepted-all" | "accepted-necessary" | null;

// Extend window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    gaLoaded?: boolean;
    gaConsentInitialized?: boolean;
  }
}

/**
 * Initialize Google Analytics with consent mode
 * This should be called before any GA tracking
 */
export function initializeGAConsent() {
  if (typeof window === "undefined" || window.gaConsentInitialized) return;
  
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  }
  window.gtag = gtag;
  
  // Set default consent to denied
  gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });
  
  window.gaConsentInitialized = true;
}

/**
 * Update Google Analytics consent based on user choice
 */
export function updateGAConsent(consentStatus: ConsentStatus) {
  if (typeof window === "undefined" || !window.gtag) return;
  
  if (consentStatus === "accepted-all") {
    // User accepted all cookies - enable analytics
    window.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
    
    // Load GA script if not already loaded
    loadGoogleAnalytics();
  } else if (consentStatus === "accepted-necessary") {
    // User only accepted necessary cookies - keep analytics disabled
    window.gtag("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
}

/**
 * Load Google Analytics script
 */
function loadGoogleAnalytics() {
  if (typeof window === "undefined" || window.gaLoaded) return;
  
  window.gaLoaded = true;
  
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  
  script.onload = () => {
    if (window.gtag) {
      window.gtag("js", new Date());
      window.gtag("config", GA_MEASUREMENT_ID, {
        anonymize_ip: true,
        cookie_flags: "SameSite=None;Secure",
      });
    }
  };
}

/**
 * Delete Google Analytics cookies
 */
function deleteGACookies() {
  const cookies = document.cookie.split(";");
  const gaCookiePatterns = ["_ga", "_gid", "_gat", "_gcl"];
  
  cookies.forEach((cookie) => {
    const cookieName = cookie.split("=")[0].trim();
    if (gaCookiePatterns.some((pattern) => cookieName.startsWith(pattern))) {
      // Delete cookie by setting expiry in the past
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.tengcle.com;`;
    }
  });
}

/**
 * Get current consent status from localStorage
 */
export function getConsentStatus(): ConsentStatus {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentStatus;
}

export default function CookieConsent({
  lang = "en",
  position = "bottom",
  privacyPolicyPath = "/privacy",
  className = "",
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    // Initialize GA consent mode
    initializeGAConsent();
    
    // Check if user has already made a choice
    const consent = getConsentStatus();
    if (consent) {
      // Apply existing consent
      updateGAConsent(consent);
    } else {
      // Show banner after small delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = useCallback(() => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted-all");
    setIsVisible(false);
    updateGAConsent("accepted-all");
  }, []);

  const handleAcceptNecessary = useCallback(() => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted-necessary");
    setIsVisible(false);
    updateGAConsent("accepted-necessary");
    // Delete any existing GA cookies
    deleteGACookies();
  }, []);

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
                href={privacyPolicyPath}
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
    const stored = getConsentStatus();
    setConsent(stored);
    
    // Listen for storage changes (in case user changes consent in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === COOKIE_CONSENT_KEY) {
        const newConsent = e.newValue as ConsentStatus;
        setConsent(newConsent);
        updateGAConsent(newConsent);
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const updateConsent = useCallback((newConsent: ConsentStatus) => {
    if (newConsent) {
      localStorage.setItem(COOKIE_CONSENT_KEY, newConsent);
    } else {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
    }
    setConsent(newConsent);
    updateGAConsent(newConsent);
  }, []);

  const revokeConsent = useCallback(() => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    setConsent(null);
    deleteGACookies();
    // Reload page to reset GA state
    window.location.reload();
  }, []);

  return {
    consent,
    hasConsent: consent !== null,
    acceptedAll: consent === "accepted-all",
    acceptedNecessary: consent === "accepted-necessary",
    updateConsent,
    revokeConsent,
  };
}
