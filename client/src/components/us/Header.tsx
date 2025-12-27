import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUsLanguage } from "@/contexts/UsLanguageContext";

export default function UsHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { language, t } = useUsLanguage();
  
  const basePath = `/us/${language}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: basePath, label: t('nav.home') },
    { href: `${basePath}/services`, label: t('nav.services') },
    { href: `${basePath}/about`, label: t('nav.about') },
    { href: `${basePath}/contact`, label: t('nav.contact') },
  ];

  const languages = [
    { code: 'en', label: 'EN', path: `/us/en${location.replace(/^\/us\/[a-z]{2}/, '')}` },
    { code: 'ja', label: 'JA', path: `/us/ja${location.replace(/^\/us\/[a-z]{2}/, '')}` },
    { code: 'zh', label: 'ZH', path: `/us/zh${location.replace(/^\/us\/[a-z]{2}/, '')}` },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href={basePath}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <img
                src={isScrolled ? "/images/tengcle-logo.png" : "/images/tengcle-logo-white.png"}
                alt="Tengcle"
                className="h-6 md:h-8 w-auto object-contain transition-all duration-300"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`text-sm tracking-wide transition-colors duration-300 hover:text-gold ${
                    isScrolled ? "text-charcoal" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            
            {/* Language Switcher */}
            <div className="flex items-center gap-2 ml-4 border-l border-current/20 pl-4">
              <Globe className={`w-4 h-4 ${isScrolled ? "text-charcoal" : "text-white"}`} />
              {languages.map((lang) => (
                <Link
                  key={lang.code}
                  href={lang.path}
                  className={`text-xs px-2 py-1 transition-colors duration-300 ${
                    language === lang.code
                      ? "text-gold font-medium"
                      : isScrolled
                      ? "text-charcoal/60 hover:text-charcoal"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {lang.label}
                </Link>
              ))}
            </div>
            
            {/* Global Site Link */}
            <Link
              href="/"
              className={`text-xs px-3 py-1.5 border transition-colors duration-300 ${
                isScrolled
                  ? "border-purple/30 text-purple hover:bg-purple hover:text-white"
                  : "border-white/30 text-white hover:bg-white hover:text-purple-dark"
              }`}
            >
              Global
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${
              isScrolled ? "text-charcoal" : "text-white"
            }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-white mt-4 shadow-lg"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-charcoal hover:bg-light-gray hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-gray-100 mt-2 pt-2 px-4">
                  <p className="text-xs text-gray-400 mb-2">Language</p>
                  <div className="flex gap-2">
                    {languages.map((lang) => (
                      <Link
                        key={lang.code}
                        href={lang.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-sm px-3 py-1.5 border ${
                          language === lang.code
                            ? "border-gold text-gold"
                            : "border-gray-200 text-gray-600"
                        }`}
                      >
                        {lang.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="px-4 pt-2">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-center py-2 border border-purple text-purple text-sm"
                  >
                    Global Site
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
