/**
 * Global Gateway - Region & Language Selection
 * 
 * Design Philosophy: 和モダン × グローバルエレガンス
 * - Deep navy background with visible Seigaiha (青海波) pattern
 * - Champagne gold accents for luxury feel
 * - Glass morphism cards with warm undertones
 * - Elegant hover effects with glow
 */

import { useEffect } from "react";
import { motion, type Easing } from "framer-motion";
import { Link } from "wouter";
import { Globe, Building2, ArrowRight } from "lucide-react";

const regions = [
  {
    id: "hk",
    name: "Hong Kong",
    nameJa: "香港",
    nameZh: "香港",
    company: "Tengcle Limited",
    role: "Global Headquarters",
    roleJa: "グローバル本社",
    roleZh: "全球总部",
    description: "Asset Management & Hotel Procurement",
    descriptionJa: "資産管理・ホテル調達",
    descriptionZh: "资产管理与酒店采购",
    flag: "🇭🇰",
    flagImage: "/images/flag-hk.svg",
    path: "/hk/en",
    color: "#c9a962",
    languages: [
      { code: "en", label: "English", path: "/hk/en" },
      { code: "ja", label: "日本語", path: "/hk/ja" },
      { code: "zh", label: "中文", path: "/hk/zh" },
    ],
  },
  {
    id: "jp",
    name: "Japan",
    nameJa: "日本",
    nameZh: "日本",
    company: "Tengcle株式会社",
    role: "Founding Office",
    roleJa: "創業地",
    roleZh: "创业地",
    description: "Real Estate, F&B, Fitness, Hospitality, HR",
    descriptionJa: "不動産・飲食・フィットネス・宿泊・人材",
    descriptionZh: "房地产、餐饮、健身、住宿、人才",
    flag: "🇯🇵",
    flagImage: "/images/flag-jp.svg",
    path: "/jp/ja",
    color: "#bc002d",
    languages: [
      { code: "ja", label: "日本語", path: "/jp/ja" },
      { code: "en", label: "English", path: "/jp/en" },
      { code: "zh", label: "中文", path: "/jp/zh" },
    ],
  },
  {
    id: "us",
    name: "United States",
    nameJa: "アメリカ",
    nameZh: "美国",
    company: "Tengcle Development LLC",
    role: "US Office",
    roleJa: "米国拠点",
    roleZh: "美国办事处",
    description: "Real Estate Management & Vacation Rentals",
    descriptionJa: "不動産管理・民泊",
    descriptionZh: "房地产管理与民宿",
    flag: "🇺🇸",
    flagImage: "/images/flag-us.svg",
    path: "/us/en",
    color: "#3c3b6e",
    languages: [
      { code: "en", label: "English", path: "/us/en" },
      { code: "ja", label: "日本語", path: "/us/ja" },
      { code: "zh", label: "中文", path: "/us/zh" },
    ],
  },
];

// Animation variants
const easeElegant: Easing = [0.25, 0.46, 0.45, 0.94];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeElegant }
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easeElegant }
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

// Seigaiha SVG pattern - more visible
const seigaihaPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='90' viewBox='0 0 180 90'%3E%3Cg fill='none' stroke='%23c9a962'%3E%3Ccircle cx='0' cy='45' r='40' stroke-width='1' stroke-opacity='0.3'/%3E%3Ccircle cx='0' cy='45' r='30' stroke-width='1' stroke-opacity='0.25'/%3E%3Ccircle cx='0' cy='45' r='20' stroke-width='1' stroke-opacity='0.2'/%3E%3Ccircle cx='0' cy='45' r='10' stroke-width='1' stroke-opacity='0.15'/%3E%3Ccircle cx='60' cy='45' r='40' stroke-width='1' stroke-opacity='0.3'/%3E%3Ccircle cx='60' cy='45' r='30' stroke-width='1' stroke-opacity='0.25'/%3E%3Ccircle cx='60' cy='45' r='20' stroke-width='1' stroke-opacity='0.2'/%3E%3Ccircle cx='60' cy='45' r='10' stroke-width='1' stroke-opacity='0.15'/%3E%3Ccircle cx='120' cy='45' r='40' stroke-width='1' stroke-opacity='0.3'/%3E%3Ccircle cx='120' cy='45' r='30' stroke-width='1' stroke-opacity='0.25'/%3E%3Ccircle cx='120' cy='45' r='20' stroke-width='1' stroke-opacity='0.2'/%3E%3Ccircle cx='120' cy='45' r='10' stroke-width='1' stroke-opacity='0.15'/%3E%3Ccircle cx='180' cy='45' r='40' stroke-width='1' stroke-opacity='0.3'/%3E%3Ccircle cx='180' cy='45' r='30' stroke-width='1' stroke-opacity='0.25'/%3E%3Ccircle cx='180' cy='45' r='20' stroke-width='1' stroke-opacity='0.2'/%3E%3Ccircle cx='180' cy='45' r='10' stroke-width='1' stroke-opacity='0.15'/%3E%3Ccircle cx='30' cy='0' r='40' stroke-width='1' stroke-opacity='0.3'/%3E%3Ccircle cx='30' cy='0' r='30' stroke-width='1' stroke-opacity='0.25'/%3E%3Ccircle cx='30' cy='0' r='20' stroke-width='1' stroke-opacity='0.2'/%3E%3Ccircle cx='30' cy='0' r='10' stroke-width='1' stroke-opacity='0.15'/%3E%3Ccircle cx='90' cy='0' r='40' stroke-width='1' stroke-opacity='0.3'/%3E%3Ccircle cx='90' cy='0' r='30' stroke-width='1' stroke-opacity='0.25'/%3E%3Ccircle cx='90' cy='0' r='20' stroke-width='1' stroke-opacity='0.2'/%3E%3Ccircle cx='90' cy='0' r='10' stroke-width='1' stroke-opacity='0.15'/%3E%3Ccircle cx='150' cy='0' r='40' stroke-width='1' stroke-opacity='0.3'/%3E%3Ccircle cx='150' cy='0' r='30' stroke-width='1' stroke-opacity='0.25'/%3E%3Ccircle cx='150' cy='0' r='20' stroke-width='1' stroke-opacity='0.2'/%3E%3Ccircle cx='150' cy='0' r='10' stroke-width='1' stroke-opacity='0.15'/%3E%3Ccircle cx='30' cy='90' r='40' stroke-width='1' stroke-opacity='0.3'/%3E%3Ccircle cx='30' cy='90' r='30' stroke-width='1' stroke-opacity='0.25'/%3E%3Ccircle cx='30' cy='90' r='20' stroke-width='1' stroke-opacity='0.2'/%3E%3Ccircle cx='30' cy='90' r='10' stroke-width='1' stroke-opacity='0.15'/%3E%3Ccircle cx='90' cy='90' r='40' stroke-width='1' stroke-opacity='0.3'/%3E%3Ccircle cx='90' cy='90' r='30' stroke-width='1' stroke-opacity='0.25'/%3E%3Ccircle cx='90' cy='90' r='20' stroke-width='1' stroke-opacity='0.2'/%3E%3Ccircle cx='90' cy='90' r='10' stroke-width='1' stroke-opacity='0.15'/%3E%3Ccircle cx='150' cy='90' r='40' stroke-width='1' stroke-opacity='0.3'/%3E%3Ccircle cx='150' cy='90' r='30' stroke-width='1' stroke-opacity='0.25'/%3E%3Ccircle cx='150' cy='90' r='20' stroke-width='1' stroke-opacity='0.2'/%3E%3Ccircle cx='150' cy='90' r='10' stroke-width='1' stroke-opacity='0.15'/%3E%3C/g%3E%3C/svg%3E")`;

export default function GlobalGateway() {
  useEffect(() => {
    document.title = "Tengcle Group | Hotel FF&E, Real Estate & Hospitality Services in Asia & USA";
    
    // OGP meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };
    
    updateMeta("og:image", "https://www.tengcle.com/images/og-image.jpg", true);
    updateMeta("og:image:width", "1200", true);
    updateMeta("og:image:height", "630", true);
    updateMeta("twitter:image", "https://www.tengcle.com/images/og-image.jpg");
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-hidden relative">
      {/* Animated Seigaiha Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0d1420] to-[#0a0f1a]" />

        {/* Seigaiha pattern layer - static */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: seigaihaPattern,
            backgroundSize: '180px 90px',
          }}
        />

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-[#0a0f1a]/50" />

        {/* Radial glow in center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,169,98,0.08)_0%,_transparent_60%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="py-4 md:py-6">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeElegant }}
              className="flex justify-center"
            >
              <img
                src="/images/tengcle-logo-white.png"
                alt="Tengcle - think into the future"
                className="h-14 md:h-16 w-auto"
              />
            </motion.div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center py-8 md:py-16">
          <div className="container px-4 md:px-8">
            {/* Title Section */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center mb-10 md:mb-14"
            >
              <motion.div variants={scaleIn} className="flex justify-center mb-6">
                <div className="relative">
                  <Globe className="w-14 h-14 md:w-16 md:h-16 text-gold" strokeWidth={1} />
                  <motion.div
                    className="absolute inset-0 bg-gold/20 rounded-full blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="font-heading text-3xl md:text-4xl lg:text-5xl mb-5"
              >
                <span className="text-gold">Tengcle</span>{" "}
                <span className="text-white/90">Group</span>
              </motion.h1>

              <motion.div variants={fadeInUp} className="space-y-1.5">
                <p className="text-lg md:text-xl text-white/90 font-light tracking-wide">
                  Select your region and language
                </p>
                <p className="text-sm md:text-base text-white/80 font-jp">
                  地域と言語を選択してください
                </p>
                <p className="text-sm md:text-base text-white/80 font-zh">
                  选择您的地区和语言
                </p>
              </motion.div>
            </motion.div>

            {/* Region Cards */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
            >
              {regions.map((region) => (
                <motion.div
                  key={region.id}
                  variants={fadeInUp}
                  className="group"
                >
                  <div className="relative h-full">
                    {/* Elegant shadow on hover - no gradient glow */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{
                        boxShadow: '0 25px 50px -12px rgba(201, 169, 98, 0.25), 0 0 0 1px rgba(201, 169, 98, 0.1)'
                      }}
                    />

                    {/* Card */}
                    <div className="relative bg-[#12182a]/90 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 h-full transition-all duration-500 group-hover:bg-[#1a2236] group-hover:border-gold/40 group-hover:-translate-y-2 group-hover:shadow-2xl">
                      {/* Flag & Region Info - Simplified */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-8 md:w-14 md:h-10 rounded overflow-hidden shadow-lg flex-shrink-0">
                          <img
                            src={region.flagImage}
                            alt={`${region.name} flag`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h2 className="font-heading text-xl md:text-2xl text-white truncate">
                            {region.name}
                          </h2>
                          <p className="text-gold/80 text-[10px] md:text-xs tracking-[0.1em] md:tracking-[0.15em] uppercase truncate">
                            {region.role}
                          </p>
                        </div>
                      </div>

                      {/* Company Info */}
                      <div className="mb-6">
                        <p className="text-base text-white/90 font-medium mb-1">
                          {region.company}
                        </p>
                        <p className="text-white/70 text-sm leading-relaxed">
                          {region.description}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-white/10 mb-5" />

                      {/* Language Selection */}
                      <div>
                        <p className="text-xs text-white/60 uppercase tracking-[0.1em] mb-3">
                          Language
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {region.languages.map((lang) => (
                            <Link
                              key={lang.code}
                              href={lang.path}
                              className="px-4 py-2 text-sm font-medium text-white/90 bg-white/10 border border-white/20 rounded-lg hover:bg-gold/20 hover:border-gold/50 hover:text-gold transition-all duration-300"
                            >
                              {lang.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-center mt-16 md:mt-20"
            >
              <p className="text-gold/50 text-sm md:text-base tracking-[0.3em] uppercase font-light">
                ✦ think into the future ✦
              </p>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 md:py-8">
          <div className="container">
            <div className="text-center text-white/30 text-sm">
              <p>© {new Date().getFullYear()} Tengcle Group. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
