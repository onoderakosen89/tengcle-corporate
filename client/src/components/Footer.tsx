/**
 * Footer Component - Clean White Design
 * 
 * Design: Professional footer with company info and navigation
 * Features: 3-language support, Japan link
 */

import { Link } from "wouter";
import { Mail, MapPin, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t, language } = useLanguage();

  const getFontClass = () => {
    if (language === "ja") return "font-jp";
    if (language === "zh") return "font-zh";
    return "";
  };

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services },
    { href: "/portfolio", label: t.nav.portfolio },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <footer className="bg-navy text-white">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/">
              <img 
                src="/images/tengcle-logo.png" 
                alt="Tengcle" 
                className="h-12 w-auto mb-6 brightness-0 invert"
              />
            </Link>
            <p className={`text-white/70 text-sm leading-relaxed mb-6 max-w-md ${getFontClass()}`}>
              {t.footer.description}
            </p>
            
            {/* Licenses */}
            <div className="flex flex-wrap gap-4 text-xs text-white/50">
              <span>TCSP License: TC007820</span>
              <span>BR No: 65188837</span>
            </div>
          </div>
          
          {/* Navigation */}
          <div>
            <h4 className={`text-gold text-sm tracking-wider uppercase mb-6 ${getFontClass()}`}>
              {t.footer.navigation}
            </h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span className={`text-white/70 hover:text-white transition-colors text-sm ${getFontClass()}`}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className={`text-gold text-sm tracking-wider uppercase mb-6 ${getFontClass()}`}>
              {t.footer.contact}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-gold flex-shrink-0 mt-1" />
                <div>
                  <p className={`text-white/50 text-xs mb-1 ${getFontClass()}`}>{t.contact.email}</p>
                  <a 
                    href="mailto:info@tengcle.com" 
                    className="text-white/90 hover:text-white transition-colors text-sm"
                  >
                    info@tengcle.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gold flex-shrink-0 mt-1" />
                <div>
                  <p className={`text-white/50 text-xs mb-1 ${getFontClass()}`}>{t.contact.info.hkOffice}</p>
                  <p className="text-white/90 text-sm">
                    No. 5, 17/F, Strand 50<br />
                    50 Bonham Strand<br />
                    Sheung Wan, Hong Kong
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gold flex-shrink-0 mt-1" />
                <div>
                  <p className={`text-white/50 text-xs mb-1 ${getFontClass()}`}>{t.contact.info.jpOffice1}</p>
                  <p className="text-white/90 text-sm">
                    {language === "ja" || language === "zh" 
                      ? "東京都港区高輪2-19-20" 
                      : "2-19-20 Takanawa, Minato-ku, Tokyo"}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gold flex-shrink-0 mt-1" />
                <div>
                  <p className={`text-white/50 text-xs mb-1 ${getFontClass()}`}>{t.contact.info.jpOffice2}</p>
                  <p className="text-white/90 text-sm">
                    {language === "ja" || language === "zh" 
                      ? "東京都中央区築地2-12-14" 
                      : "2-12-14 Tsukiji, Chuo-ku, Tokyo"}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gold flex-shrink-0 mt-1" />
                <div>
                  <p className={`text-white/50 text-xs mb-1 ${getFontClass()}`}>
                    {t.contact.info.usOffice}
                    <span className="ml-2 bg-gold/20 text-gold text-[10px] px-1.5 py-0.5 rounded">
                      {language === "ja" ? "設立準備中" : language === "zh" ? "筹备中" : "Establishing"}
                    </span>
                  </p>
                  <p className="text-white/90 text-sm">
                    17 Hamilton Ave<br />
                    Weehawken, NJ, USA
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-xs">
              © {new Date().getFullYear()} Tengcle Limited. All rights reserved.
            </p>
            
            {/* Group Companies */}
            <div className="flex items-center gap-6">
              <a 
                href="https://www.tengcle.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs ${getFontClass()}`}
              >
                <span>{t.footer.japan}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <span className={`flex items-center gap-2 text-white/50 text-xs ${getFontClass()}`}>
                <span>{t.footer.usa}</span>
                <span className="text-gold text-[10px]">
                  ({language === "ja" ? "設立準備中" : language === "zh" ? "笹备中" : "Establishing"})
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
