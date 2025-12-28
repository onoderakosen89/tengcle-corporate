import { Link, useLocation } from "wouter";
import { Mail, MapPin, Globe } from "lucide-react";
import { useUsLanguage } from "@/contexts/UsLanguageContext";

export default function UsFooter() {
  const [location] = useLocation();
  const { language, t } = useUsLanguage();
  const basePath = `/us/${language}`;
  const currentYear = new Date().getFullYear();

  const faqLabel = language === "ja" ? "よくある質問" : language === "zh" ? "常见问题" : "FAQ";
  const newsLabel = language === "ja" ? "ニュース" : language === "zh" ? "新闻动态" : "News";

  const navLinks = [
    { href: basePath, label: t('nav.home') },
    { href: `${basePath}/services`, label: t('nav.services') },
    { href: `${basePath}/about`, label: t('nav.about') },
    { href: `${basePath}/contact`, label: t('nav.contact') },
    { href: `${basePath}/news`, label: newsLabel },
    { href: `${basePath}/faq`, label: faqLabel },
  ];

  const groupSites = [
    { href: "/hk/en", label: "Tengcle Limited (Hong Kong)" },
    { href: "/jp/ja", label: "Tengcle Inc. (Japan)" },
  ];

  return (
    <footer className="bg-purple-deep text-white">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href={basePath}>
              <img
                src="/images/tengcle-logo-white.png"
                alt="Tengcle"
                className="h-10 mb-6 cursor-pointer"
                width="150"
                height="40"
              />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-md">
              {t('about.description').substring(0, 150)}...
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  17 Hamilton Ave<br />
                  Weehawken, NJ 07086<br />
                  United States
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="mailto:us@tengcle.com" className="text-gray-300 hover:text-gold transition-colors">
                  us@tengcle.com
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-lg mb-6 text-gold">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Group Sites */}
          <div>
            <h4 className="font-heading text-lg mb-6 text-gold">Tengcle Group</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 text-sm hover:text-gold transition-colors flex items-center gap-2"
                >
                  <Globe className="w-4 h-4 text-gold flex-shrink-0" />
                  Global Site
                </Link>
              </li>
              {groupSites.map((site) => (
                <li key={site.href}>
                  <Link
                    href={site.href}
                    className="text-gray-300 text-sm hover:text-gold transition-colors"
                  >
                    {site.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Tengcle LLC. {t('footer.rights')}
            </p>
            <p className="text-gray-500 text-xs">
              Part of Tengcle Group
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
