import { motion } from "framer-motion";
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
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export default function GlobalGateway() {
  return (
    <div className="min-h-screen bg-navy text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
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
              className="text-center mb-16"
            >
              <motion.div variants={fadeInUp} className="flex justify-center mb-6">
                <Globe className="w-16 h-16 text-gold" />
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6"
              >
                Tengcle Group
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
              className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              {regions.map((region) => (
                <motion.div
                  key={region.id}
                  variants={fadeInUp}
                  className="group"
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white/10 hover:border-gold/50 transition-all duration-500">
                    {/* Region Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <span className="text-4xl mb-4 block">{region.flag}</span>
                        <h2 className="font-heading text-2xl md:text-3xl text-white mb-1">
                          {region.name}
                        </h2>
                        <p className="text-gold text-sm tracking-wider uppercase">
                          {region.role}
                        </p>
                      </div>
                      <Building2 className="w-8 h-8 text-gold/50 group-hover:text-gold transition-colors" />
                    </div>

                    {/* Company Info */}
                    <div className="mb-6">
                      <p className="text-lg text-white font-medium mb-2">
                        {region.company}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {region.description}
                      </p>
                    </div>

                    {/* Language Selection */}
                    <div className="space-y-3">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                        Select Language
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {region.languages.map((lang) => (
                          <Link
                            key={lang.code}
                            href={lang.path}
                            className="px-4 py-2 bg-navy border border-white/20 text-white text-sm hover:bg-gold hover:border-gold hover:text-navy transition-all duration-300"
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

            {/* Future Regions Hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-center mt-16"
            >
              <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" />
                More regions coming soon
              </p>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8">
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
