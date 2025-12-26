import { motion, type Easing } from "framer-motion";
import { Link } from "wouter";
import { Globe, Building2, MapPin } from "lucide-react";

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
    path: "/hk/en",
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
    company: "Tengcle Inc.",
    role: "Japan Office",
    roleJa: "日本拠点",
    roleZh: "日本办事处",
    description: "Real Estate, F&B, Fitness, Hospitality, HR",
    descriptionJa: "不動産・飲食・フィットネス・宿泊・人材",
    descriptionZh: "房地产、餐饮、健身、住宿、人才",
    flag: "🇯🇵",
    path: "/jp/ja",
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
    company: "Tengcle LLC",
    role: "US Office",
    roleJa: "米国拠点",
    roleZh: "美国办事处",
    description: "Real Estate Management & Vacation Rentals",
    descriptionJa: "不動産管理・民泊",
    descriptionZh: "房地产管理与民宿",
    flag: "🇺🇸",
    path: "/us/en",
    languages: [
      { code: "en", label: "English", path: "/us/en" },
      { code: "ja", label: "日本語", path: "/us/ja" },
      { code: "zh", label: "中文", path: "/us/zh" },
    ],
  },
];

// Animation variants - Global Gateway: Elegant & Welcoming
// エレガントで歓迎感のあるアニメーション
const easeElegant: Easing = [0.25, 0.46, 0.45, 0.94];

const fadeInUp = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.7, ease: easeElegant } 
  },
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.8, ease: easeElegant } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

export default function GlobalGateway() {
  return (
    <div className="min-h-screen bg-[#2d1b4e] text-white overflow-hidden relative">
      {/* Auspicious Pattern Background - Seigaiha (Wave) Pattern */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d1b4e] via-[#1a0f2e] to-[#2d1b4e]" />
        
        {/* Seigaiha wave pattern - Japanese auspicious pattern */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='50' viewBox='0 0 100 50'%3E%3Cg fill='%23D4AF37'%3E%3Cpath d='M0 25 Q25 0 50 25 Q75 50 100 25 L100 50 L0 50 Z' fill-opacity='0.3'/%3E%3Ccircle cx='0' cy='25' r='20' fill='none' stroke='%23D4AF37' stroke-width='0.5' stroke-opacity='0.4'/%3E%3Ccircle cx='0' cy='25' r='15' fill='none' stroke='%23D4AF37' stroke-width='0.5' stroke-opacity='0.3'/%3E%3Ccircle cx='0' cy='25' r='10' fill='none' stroke='%23D4AF37' stroke-width='0.5' stroke-opacity='0.2'/%3E%3Ccircle cx='50' cy='25' r='20' fill='none' stroke='%23D4AF37' stroke-width='0.5' stroke-opacity='0.4'/%3E%3Ccircle cx='50' cy='25' r='15' fill='none' stroke='%23D4AF37' stroke-width='0.5' stroke-opacity='0.3'/%3E%3Ccircle cx='50' cy='25' r='10' fill='none' stroke='%23D4AF37' stroke-width='0.5' stroke-opacity='0.2'/%3E%3Ccircle cx='100' cy='25' r='20' fill='none' stroke='%23D4AF37' stroke-width='0.5' stroke-opacity='0.4'/%3E%3Ccircle cx='100' cy='25' r='15' fill='none' stroke='%23D4AF37' stroke-width='0.5' stroke-opacity='0.3'/%3E%3Ccircle cx='100' cy='25' r='10' fill='none' stroke='%23D4AF37' stroke-width='0.5' stroke-opacity='0.2'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '100px 50px',
          }}
        />
        
        {/* Additional cloud/fortune pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20S0 28.954 0 40s8.954 20 20 20 20-8.954 20-20zm40 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z' fill-opacity='0.4'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px',
          }}
        />
        
        {/* Subtle radial gradient for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(30,10,50,0.4)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="py-8">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <img
                src="/images/tengcle-logo-white.png"
                alt="Tengcle - think into the future"
                className="h-12 md:h-16"
              />
            </motion.div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="container">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.div variants={fadeInUp} className="flex justify-center mb-6">
                <div className="relative">
                  <Globe className="w-16 h-16 text-gold" />
                  <div className="absolute inset-0 w-16 h-16 bg-gold/20 rounded-full blur-xl" />
                </div>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 text-white"
              >
                <span className="text-gradient-gold">Tengcle</span> Group
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
              >
                Select your region and language
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-gray-400 mt-2"
              >
                地域と言語を選択してください / 选择您的地区和语言
              </motion.p>
            </motion.div>

            {/* Region Cards */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            >
              {regions.map((region) => (
                <motion.div
                  key={region.id}
                  variants={fadeInUp}
                  className="group"
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-gold/20 p-6 gateway-card-hover h-full">
                    {/* Region Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="text-3xl mb-3 block">{region.flag}</span>
                        <h2 className="font-heading text-xl md:text-2xl text-white mb-1">
                          {region.name}
                        </h2>
                        <p className="text-gold text-xs tracking-wider uppercase">
                          {region.role}
                        </p>
                      </div>
                      <Building2 className="w-6 h-6 text-gold/40 group-hover:text-gold transition-colors" />
                    </div>

                    {/* Company Info */}
                    <div className="mb-5">
                      <p className="text-base text-white font-medium mb-1">
                        {region.company}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {region.description}
                      </p>
                    </div>

                    {/* Language Selection */}
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                        Select Language
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {region.languages.map((lang) => (
                          <Link
                            key={lang.code}
                            href={lang.path}
                            className="px-3 py-1.5 bg-purple-dark border border-gold/30 text-white text-sm gateway-lang-hover"
                          >
                            {lang.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Auspicious message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-center mt-12"
            >
              <p className="text-gold/60 text-sm flex items-center justify-center gap-2 font-jp">
                <span className="text-gold">✦</span>
                think into the future
                <span className="text-gold">✦</span>
              </p>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6">
          <div className="container">
            <div className="text-center text-gray-500 text-sm">
              <p>© {new Date().getFullYear()} Tengcle Group. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
