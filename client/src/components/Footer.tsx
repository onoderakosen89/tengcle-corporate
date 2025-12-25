/**
 * Footer Component - Japanese Zen Luxury Design
 * 
 * Design Philosophy:
 * - Comprehensive company information for compliance/trust
 * - Gold accent lines for subtle luxury
 * - Clear display of licenses and registration numbers
 * - Multi-language support
 */

import { Link } from "wouter";
import { MapPin, Mail, Building2, Shield, FileCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t, language } = useLanguage();
  
  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services },
    { href: "/portfolio", label: t.nav.portfolio },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <footer className="bg-sumi border-t border-stone/20">
      {/* Gold accent line */}
      <div className="gold-line" />
      
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="font-display text-3xl text-washi tracking-wider mb-2">
                TENGCLE
              </h3>
              <p className="text-kincha text-sm tracking-[0.2em] uppercase">
                think into the future
              </p>
            </div>
            
            <p className={`text-stone text-sm leading-relaxed mb-6 max-w-md ${language === "ja" ? "font-jp" : ""}`}>
              {t.footer.description}
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-xs text-stone/80 bg-navy/30 px-3 py-2 rounded">
                <Shield size={14} className="text-kincha" />
                <span>TCSP Licensed</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone/80 bg-navy/30 px-3 py-2 rounded">
                <FileCheck size={14} className="text-kincha" />
                <span>Compliance Verified</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-washi font-display text-lg mb-6 tracking-wider ${language === "ja" ? "font-jp" : ""}`}>
              {t.footer.navigation}
            </h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span className={`text-stone hover:text-kincha transition-colors duration-300 text-sm ${language === "ja" ? "font-jp" : ""}`}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={`text-washi font-display text-lg mb-6 tracking-wider ${language === "ja" ? "font-jp" : ""}`}>
              {t.footer.contact}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-kincha mt-1 flex-shrink-0" />
                <a 
                  href="mailto:admin@tengcle.com" 
                  className="text-stone hover:text-kincha transition-colors text-sm"
                >
                  admin@tengcle.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Building2 size={16} className="text-kincha mt-1 flex-shrink-0" />
                <div className="text-stone text-sm">
                  <p className={`text-washi/80 text-xs mb-1 ${language === "ja" ? "font-jp" : ""}`}>
                    {t.contact.info.operations}
                  </p>
                  <p>No. 5, 17/F, Strand 50</p>
                  <p>50 Bonham Strand</p>
                  <p>Sheung Wan, Hong Kong</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-kincha mt-1 flex-shrink-0" />
                <div className="text-stone text-sm">
                  <p className={`text-washi/80 text-xs mb-1 ${language === "ja" ? "font-jp" : ""}`}>
                    {t.contact.info.registered}
                  </p>
                  <p>Units A-C, 25/F</p>
                  <p>Seabright Plaza, 9-23 Shell St</p>
                  <p>North Point, Hong Kong</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-stone/20">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Legal Info */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-stone/70">
              <span>BR No: 65188837</span>
              <span className="hidden sm:inline">|</span>
              <span>TCSP License: TC007820</span>
            </div>
            
            {/* Copyright */}
            <p className="text-xs text-stone/50 text-center lg:text-right">
              © {new Date().getFullYear()} Tengcle Limited. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
