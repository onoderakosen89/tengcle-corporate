/**
 * Header Component - Japanese Zen Luxury Design
 * 
 * Design Philosophy:
 * - Quiet Confidence: Minimal navigation with elegant presence
 * - Gold accent on hover for subtle luxury
 * - Transparent background with blur for depth
 * - Language switcher for EN/JP
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services },
    { href: "/portfolio", label: t.nav.portfolio },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-sumi/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link href="/">
            <div className="flex flex-col">
              <span className="font-display text-2xl lg:text-3xl tracking-wider text-washi">
                TENGCLE
              </span>
              <span className="text-[10px] lg:text-xs tracking-[0.3em] text-kincha uppercase">
                think into the future
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`relative text-sm tracking-wider uppercase transition-colors duration-300 group ${
                    location === item.href
                      ? "text-kincha"
                      : "text-washi/80 hover:text-kincha"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-kincha transition-all duration-300 ${
                      location === item.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </span>
              </Link>
            ))}
            
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-sm text-washi/80 hover:text-kincha transition-colors duration-300 border border-stone/30 px-3 py-1.5 hover:border-kincha/50"
              aria-label="Toggle language"
            >
              <Globe size={14} />
              <span className="font-medium">{language === "en" ? "日本語" : "EN"}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            {/* Mobile Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-xs text-washi/80 border border-stone/30 px-2 py-1"
              aria-label="Toggle language"
            >
              <Globe size={12} />
              <span>{language === "en" ? "JP" : "EN"}</span>
            </button>
            
            <button
              className="text-washi p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-sumi/98 backdrop-blur-lg border-t border-stone/20"
          >
            <div className="container py-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={item.href}>
                    <span
                      className={`block py-4 text-lg tracking-wider border-b border-stone/10 ${
                        location === item.href
                          ? "text-kincha"
                          : "text-washi/80"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
