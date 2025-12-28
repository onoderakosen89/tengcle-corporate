/**
 * News Page - US Site
 * 
 * Design: Clean news listing with milestone-based articles
 * Features: 3-language support, individual article links
 */

import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Building2, Home, MapPin } from "lucide-react";
import { useUsLanguage } from "@/contexts/UsLanguageContext";
import Header from "@/components/us/Header";
import Footer from "@/components/us/Footer";
import SEOHead from "@/components/SEOHead";

interface NewsArticle {
  id: string;
  date: string;
  category: string;
  icon: React.ReactNode;
  title: {
    en: string;
    ja: string;
    zh: string;
  };
  excerpt: {
    en: string;
    ja: string;
    zh: string;
  };
}

const newsArticles: NewsArticle[] = [
  {
    id: "property-management-launch-2025",
    date: "2025-03",
    category: "Business Launch",
    icon: <Home className="w-5 h-5" />,
    title: {
      en: "Full-Scale Property Management Operations Begin",
      ja: "不動産管理事業を本格始動",
      zh: "不动产管理业务正式启动"
    },
    excerpt: {
      en: "Tengcle LLC begins full-scale property management operations in New Jersey and the New York metro area, offering comprehensive services for property owners and investors.",
      ja: "Tengcle LLCは、ニュージャージー州およびニューヨーク都市圏で不動産管理事業を本格的に開始しました。物件オーナーや投資家向けに包括的なサービスを提供します。",
      zh: "Tengcle LLC在新泽西州和纽约都市圈正式启动不动产管理业务，为业主和投资者提供综合服务。"
    }
  },
  {
    id: "us-founding-2026",
    date: "2026-01",
    category: "Company Founding",
    icon: <Building2 className="w-5 h-5" />,
    title: {
      en: "Tengcle LLC Established in New Jersey",
      ja: "Tengcle LLC ニュージャージー州にて設立",
      zh: "Tengcle LLC在新泽西州成立"
    },
    excerpt: {
      en: "Tengcle LLC is scheduled to be officially registered in Weehawken, New Jersey in January 2026 as the US office of Tengcle Group, marking the group's expansion into the North American market.",
      ja: "Tengcle LLCは、2026年1月にTengcle Groupの米国拠点としてニュージャージー州ウィーホーケンに正式登記予定です。グループの北米市場への進出を示すものです。",
      zh: "Tengcle LLC计划于2026年1月作为Tengcle Group的美国办事处在新泽西州威霍肯正式注册，标志着集团进军北美市场。"
    }
  },
  {
    id: "group-global-network-2024",
    date: "2024-12",
    category: "Group News",
    icon: <MapPin className="w-5 h-5" />,
    title: {
      en: "Tengcle Group Establishes Global Three-Location Network",
      ja: "Tengcle Group グローバル3拠点体制を確立",
      zh: "Tengcle Group建立全球三地网络"
    },
    excerpt: {
      en: "With the establishment of Tengcle LLC, Tengcle Group now operates from three locations: Tokyo, Hong Kong, and New Jersey, enabling comprehensive global service delivery.",
      ja: "Tengcle LLCの設立により、Tengcle Groupは東京、香港、ニュージャージーの3拠点体制となり、グローバルなサービス提供が可能になりました。",
      zh: "随着Tengcle LLC的成立，Tengcle Group现已在东京、香港和新泽西三地运营，实现全球化服务。"
    }
  }
];

export default function News() {
  const { t, language } = useUsLanguage();
  const [location] = useLocation();
  const pathLang = location.split("/")[2] || "en";
  const basePath = `/us/${pathLang}`;

  const getFontClass = () => {
    if (language === "ja") return "font-jp";
    if (language === "zh") return "font-zh";
    return "";
  };

  const pageTitle = language === "ja" ? "ニュース" : language === "zh" ? "新闻动态" : "News";
  const pageSubtitle = language === "ja"
    ? "Tengcle LLCの最新情報とマイルストーン"
    : language === "zh"
      ? "Tengcle LLC的最新动态与里程碑"
      : "Latest updates and milestones from Tengcle LLC";
  const readMore = language === "ja" ? "詳細を見る" : language === "zh" ? "查看详情" : "Read More";

  // Sort by date descending
  const sortedArticles = [...newsArticles].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <SEOHead
        title={`${pageTitle} | Tengcle LLC`}
        description={pageSubtitle}
        keywords="Tengcle LLC, News, Property Management, New Jersey, Weehawken"
        canonical={`https://www.tengcle.com${basePath}/news`}
        ogType="website"
      />
      <div className="min-h-screen bg-white">
        <Header />

        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-b from-navy to-navy/95">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className={`text-4xl md:text-5xl font-bold text-white mb-4 ${getFontClass()}`}>
                {pageTitle}
              </h1>
              <p className={`text-white/70 text-lg max-w-2xl mx-auto ${getFontClass()}`}>
                {pageSubtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* News List */}
        <section className="py-20">
          <div className="container max-w-4xl">
            <div className="space-y-8">
              {sortedArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`${basePath}/news/${article.id}`}>
                    <div className="bg-gray-50 rounded-xl p-6 md:p-8 hover:shadow-md transition-all duration-300 border border-gray-100 group cursor-pointer">
                      <div className="flex items-start gap-4 md:gap-6">
                        {/* Icon */}
                        <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center text-gold">
                          {article.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Meta */}
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                              <Calendar className="w-4 h-4" />
                              {article.date}
                            </span>
                            <span className="px-2 py-0.5 bg-navy/10 text-navy text-xs rounded-full">
                              {article.category}
                            </span>
                          </div>

                          {/* Title */}
                          <h2 className={`text-xl md:text-2xl font-bold text-navy mb-3 group-hover:text-gold transition-colors ${getFontClass()}`}>
                            {article.title[language as keyof typeof article.title]}
                          </h2>

                          {/* Excerpt */}
                          <p className={`text-gray-600 leading-relaxed mb-4 ${getFontClass()}`}>
                            {article.excerpt[language as keyof typeof article.excerpt]}
                          </p>

                          {/* Read More */}
                          <span className={`inline-flex items-center gap-2 text-gold font-medium group-hover:gap-3 transition-all ${getFontClass()}`}>
                            {readMore}
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
