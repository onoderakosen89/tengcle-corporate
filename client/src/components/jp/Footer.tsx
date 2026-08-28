/**
 * Footer Component - Navy Background with Gold Accents (Japan)
 * 
 * Design: Professional footer matching Hong Kong site
 * Features: Navigation, Contact info, Group companies, region-aware routing
 */

import { Link, useLocation } from "wouter";
import { Mail, MapPin, ExternalLink } from "lucide-react";
import { useJpLanguage } from "@/contexts/JpLanguageContext";

export default function Footer() {
  const { t, language } = useJpLanguage();
  const [location] = useLocation();

  // Extract current language from URL path
  const pathLang = location.split("/")[2] || "ja";
  const basePath = `/jp/${pathLang}`;

  const getFontClass = () => {
    if (language === "ja") return "font-jp";
    if (language === "zh") return "font-zh";
    return "font-body";
  };

  const faqLabel = language === "ja" ? "よくある質問" : language === "zh" ? "常见问题" : "FAQ";
  const newsLabel = language === "ja" ? "ニュース" : language === "zh" ? "新闻动态" : "News";

  const navItems = [
    { href: basePath, label: t.nav.home },
    { href: `${basePath}/services`, label: t.nav.services },
    { href: `${basePath}/about`, label: t.nav.about },
    { href: `${basePath}/careers`, label: t.nav.careers },
    { href: `${basePath}/contact`, label: t.nav.contact },
    { href: `${basePath}/news`, label: newsLabel },
    { href: `${basePath}/faq`, label: faqLabel },
  ];

  return (
    <footer className="bg-navy text-white">
      <div className="container py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link href={basePath}>
              <img
                src="/images/tengcle-logo-white.png"
                alt="Tengcle"
                className="h-12 w-auto mb-6 cursor-pointer"
              />
            </Link>
            <p className={`text-gray-300 text-sm leading-relaxed ${getFontClass()}`}>
              {t.footer.description}
            </p>
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
                    <span className={`text-gray-300 hover:text-white transition-colors text-sm ${getFontClass()}`}>
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
                <Mail className="h-4 w-4 text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className={`text-gray-400 text-xs mb-1 ${getFontClass()}`}>{t.contact.email}</p>
                  <a
                    href="mailto:info@tengcle.com"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    info@tengcle.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className={`text-gray-400 text-xs mb-1 ${getFontClass()}`}>{t.contact.info.tokyoOffice1}</p>
                  <p className={`text-gray-300 text-sm ${getFontClass()}`}>
                    〒108-0074<br />
                    東京都港区高輪2-19-20
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className={`text-gray-400 text-xs mb-1 ${getFontClass()}`}>{t.contact.info.tokyoOffice2}</p>
                  <p className={`text-gray-300 text-sm ${getFontClass()}`}>
                    〒104-0045<br />
                    東京都中央区築地2-12-14
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Regional sites */}
          <nav aria-label="Tengcle regional sites">
            <h4 className={`text-gold text-sm tracking-wider uppercase mb-6 ${getFontClass()}`}>
              {t.footer.group}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/hk/en" aria-label="Tengcle Limited - Hong Kong company">
                  <span className={`text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 ${getFontClass()}`}>
                    🇭🇰 {t.footer.hongkong}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/jp/ja" aria-label="株式会社Tengcle - Japan Office">
                  <span className={`text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 ${getFontClass()}`}>
                    🇯🇵 日本
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/us/en" aria-label="Tengcle Development LLC - United States company">
                  <span className={`text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 ${getFontClass()}`}>
                    🇺🇸 United States
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} 株式会社Tengcle All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href={`/hk/${pathLang === "zh" ? "zh" : pathLang === "en" ? "en" : "en"}`}>
                <span className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1">
                  Tengcle Limited
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
