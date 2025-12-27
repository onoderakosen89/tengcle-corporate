/**
 * Footer Component - Clean White Design (Hong Kong)
 * 
 * Design: Professional footer with company info and navigation
 * Features: 3-language support, region-aware routing
 */

import { Link, useLocation } from "wouter";
import { Mail, MapPin, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t, language } = useLanguage();
  const [location] = useLocation();

  // Extract current language from URL path
  const pathLang = location.split("/")[2] || "en";
  const basePath = `/hk/${pathLang}`;

  const getFontClass = () => {
    if (language === "ja") return "font-jp";
    if (language === "zh") return "font-zh";
    return "";
  };

  const faqLabel = language === "ja" ? "よくある質問" : language === "zh" ? "常见问题" : "FAQ";
  const newsLabel = language === "ja" ? "ニュース" : language === "zh" ? "新闻动态" : "News";
  
  const navItems = [
    { href: basePath, label: t.nav.home },
    { href: `${basePath}/services`, label: t.nav.services },
    { href: `${basePath}/portfolio`, label: t.nav.portfolio },
    { href: `${basePath}/about`, label: t.nav.about },
    { href: `${basePath}/contact`, label: t.nav.contact },
    { href: `${basePath}/news`, label: newsLabel },
    { href: `${basePath}/faq`, label: faqLabel },
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
              <Link href={`/jp/${pathLang === "zh" ? "zh" : pathLang === "ja" ? "ja" : "ja"}`}>
                <span className={`flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs ${getFontClass()}`}>
                  <span>{t.footer.japan}</span>
                  <ExternalLink className="h-3 w-3" />
                </span>
              </Link>
              <Link href="/us/en">
                <span className={`flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs ${getFontClass()}`}>
                  <span>US Office</span>
                  <ExternalLink className="h-3 w-3" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
