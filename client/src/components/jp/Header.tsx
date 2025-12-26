/**
 * Header Component - Clean White Design (Japan)
 * 
 * Design: Professional white header with logo image
 * Features: 3-language support (JA/EN/ZH) with region-aware routing
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useJpLanguage } from "@/contexts/JpLanguageContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage, t } = useJpLanguage();

  // Extract current language from URL path
  const pathLang = location.split("/")[2] || "ja";
  const basePath = `/jp/${pathLang}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync language from URL
  useEffect(() => {
    if (pathLang && pathLang !== language) {
      setLanguage(pathLang as "en" | "ja" | "zh");
    }
  }, [pathLang, language, setLanguage]);

  const navItems = [
    { href: basePath, label: t.nav.home },
    { href: `${basePath}/services`, label: t.nav.services },
    { href: `${basePath}/about`, label: t.nav.about },
    { href: `${basePath}/careers`, label: t.nav.careers },
    { href: `${basePath}/contact`, label: t.nav.contact },
  ];

  const languages = [
    { code: "ja" as const, label: "日本語" },
    { code: "en" as const, label: "EN" },
    { code: "zh" as const, label: "中文" },
  ];

  const currentLangLabel = languages.find(l => l.code === language)?.label || "日本語";

  const getFontClass = () => {
    if (language === "ja") return "font-jp";
    if (language === "zh") return "font-zh";
    return "";
  };

  // Get current page path without language prefix
  const getCurrentPagePath = () => {
    const parts = location.split("/").slice(3); // Remove /jp/lang
    return parts.length > 0 ? "/" + parts.join("/") : "";
  };

  const handleLanguageChange = (langCode: "en" | "ja" | "zh") => {
    const pagePath = getCurrentPagePath();
    window.location.href = `/jp/${langCode}${pagePath}`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <img 
                src="/images/tengcle-logo.png" 
                alt="Tengcle - think into the future" 
                className="h-12 md:h-14 w-auto"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`text-sm tracking-wide transition-colors duration-300 hover:text-gold ${
                    location === item.href ? "text-gold" : "text-charcoal"
                  } ${getFontClass()}`}
                >
                  {item.label}
                </span>
              </Link>
            ))}

            {/* Language Selector */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 text-charcoal hover:text-gold"
                aria-label="Toggle language"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm">{currentLangLabel}</span>
              </Button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-lg"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          handleLanguageChange(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                          language === lang.code ? "text-gold bg-gray-50" : "text-charcoal"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-charcoal"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <div className="container py-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span
                    className={`block py-3 text-sm tracking-wide ${
                      location === item.href ? "text-gold" : "text-charcoal"
                    } ${getFontClass()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}

              {/* Mobile Language Selector */}
              <div className="pt-4 border-t border-gray-100 mt-4">
                <p className="text-xs text-slate mb-2">Language</p>
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        handleLanguageChange(lang.code);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`px-3 py-1 text-sm border ${
                        language === lang.code
                          ? "border-gold text-gold"
                          : "border-gray-200 text-charcoal"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
