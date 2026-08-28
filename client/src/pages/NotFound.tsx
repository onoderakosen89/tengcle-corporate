import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Globe } from "lucide-react";
import SEOHead from "@/components/SEOHead";

type Language = "en" | "ja" | "zh";
type Region = "hk" | "jp" | "us" | "global";

interface NotFoundContent {
  title: string;
  subtitle: string;
  description: string;
  homeButton: string;
  backButton: string;
  gatewayButton: string;
}

const content: Record<Language, NotFoundContent> = {
  en: {
    title: "404",
    subtitle: "Page Not Found",
    description: "The page you're looking for doesn't exist or has been moved.",
    homeButton: "Go Home",
    backButton: "Go Back",
    gatewayButton: "Select Region",
  },
  ja: {
    title: "404",
    subtitle: "ページが見つかりません",
    description: "お探しのページは存在しないか、移動された可能性があります。",
    homeButton: "ホームへ",
    backButton: "戻る",
    gatewayButton: "地域を選択",
  },
  zh: {
    title: "404",
    subtitle: "页面未找到",
    description: "您要查找的页面不存在或已被移动。",
    homeButton: "返回首页",
    backButton: "返回",
    gatewayButton: "选择地区",
  },
};

// Region-specific styling
const regionStyles: Record<Region, { bg: string; accent: string; text: string }> = {
  hk: {
    bg: "bg-gradient-to-br from-[#1a1035] via-[#2d1b4e] to-[#1a1035]",
    accent: "text-[#c9a962]",
    text: "text-white",
  },
  jp: {
    bg: "bg-gradient-to-br from-[#faf8f5] via-[#f5f0e8] to-[#faf8f5]",
    accent: "text-[#b8956e]",
    text: "text-[#2d1b4e]",
  },
  us: {
    bg: "bg-gradient-to-br from-[#0f1628] via-[#1a2744] to-[#0f1628]",
    accent: "text-[#d4af37]",
    text: "text-white",
  },
  global: {
    bg: "bg-gradient-to-br from-[#0a0a12] via-[#1a1a2e] to-[#0a0a12]",
    accent: "text-[#c9a962]",
    text: "text-white",
  },
};

export default function NotFound() {
  const [location] = useLocation();
  const [language, setLanguage] = useState<Language>("en");
  const [region, setRegion] = useState<Region>("global");

  useEffect(() => {
    // Detect region and language from URL
    const pathParts = location.split("/").filter(Boolean);
    
    if (pathParts[0] === "hk") {
      setRegion("hk");
      if (pathParts[1] === "ja") setLanguage("ja");
      else if (pathParts[1] === "zh") setLanguage("zh");
      else setLanguage("en");
    } else if (pathParts[0] === "jp") {
      setRegion("jp");
      if (pathParts[1] === "en") setLanguage("en");
      else if (pathParts[1] === "zh") setLanguage("zh");
      else setLanguage("ja");
    } else if (pathParts[0] === "us") {
      setRegion("us");
      if (pathParts[1] === "ja") setLanguage("ja");
      else if (pathParts[1] === "zh") setLanguage("zh");
      else setLanguage("en");
    } else {
      setRegion("global");
      setLanguage("en");
    }
  }, [location]);

  const t = content[language];
  const style = regionStyles[region];

  const getHomeLink = () => {
    switch (region) {
      case "hk": return `/hk/${language}`;
      case "jp": return `/jp/${language}`;
      case "us": return `/us/${language}`;
      default: return "/";
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className={`min-h-screen ${style.bg} ${style.text} flex items-center justify-center px-4`}>
      <SEOHead
        title={`${t.subtitle} | Tengcle`}
        description={t.description}
        noindex
      />
      <main id="main-content" tabIndex={-1} className="max-w-lg w-full text-center">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <span className={`text-[150px] md:text-[200px] font-bold leading-none ${style.accent} opacity-20`}>
            {t.title}
          </span>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="-mt-24 relative z-10"
        >
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${style.accent}`}>
            {t.subtitle}
          </h1>
          <p className="text-lg opacity-70 mb-8">
            {t.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoBack}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-current/20 hover:border-current/40 transition-colors ${style.text}`}
            >
              <ArrowLeft className="w-5 h-5" />
              {t.backButton}
            </button>

            <Link href={getHomeLink()}>
              <span className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg ${
                region === "jp" 
                  ? "bg-[#2d1b4e] text-white hover:bg-[#3d2b5e]" 
                  : "bg-[#c9a962] text-[#1a1035] hover:bg-[#d9b972]"
              } transition-colors cursor-pointer`}>
                <Home className="w-5 h-5" />
                {t.homeButton}
              </span>
            </Link>

            {region !== "global" && (
              <Link href="/">
                <span className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-current/20 hover:border-current/40 transition-colors ${style.text} cursor-pointer`}>
                  <Globe className="w-5 h-5" />
                  {t.gatewayButton}
                </span>
              </Link>
            )}
          </div>
        </motion.div>

        {/* Decorative Element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full ${
            region === "jp" ? "bg-[#b8956e]" : "bg-[#c9a962]"
          } blur-[150px] opacity-20`} />
        </motion.div>
      </main>
    </div>
  );
}
