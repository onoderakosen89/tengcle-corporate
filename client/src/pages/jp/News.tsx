/**
 * News Page - Japan Site
 * 
 * Design: Clean news listing with milestone-based articles
 * Features: 3-language support, individual article links
 */

import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Building2, Dumbbell, Coffee, Hotel, Users } from "lucide-react";
import { useJpLanguage } from "@/contexts/JpLanguageContext";
import Header from "@/components/jp/Header";
import Footer from "@/components/jp/Footer";
import SEOHead from "@/components/SEOHead";

interface NewsArticle {
  id: string;
  date: string;
  category: string;
  icon: React.ReactNode;
  title: {
    ja: string;
    en: string;
    zh: string;
  };
  excerpt: {
    ja: string;
    en: string;
    zh: string;
  };
}

const newsArticles: NewsArticle[] = [
  {
    id: "hotel-staffing-2024",
    date: "2024-12",
    category: "新事業",
    icon: <Hotel className="w-5 h-5" />,
    title: {
      ja: "ホテル運営事業・人材紹介事業を開始",
      en: "Launch of Hotel Operations & Staffing Services",
      zh: "酒店运营及人才介绍业务启动"
    },
    excerpt: {
      ja: "Tengcle Inc.は2024年より、ホテル運営事業および人材紹介事業を新たに開始しました。これにより、不動産管理、飲食、フィットネス、宿泊、人材の5事業体制となりました。",
      en: "Tengcle Inc. has launched hotel operations and staffing services in 2024, expanding to five business segments: real estate, F&B, fitness, hospitality, and staffing.",
      zh: "Tengcle Inc.于2024年启动酒店运营及人才介绍业务，形成不动产管理、餐饮、健身、住宿、人才五大业务体系。"
    }
  },
  {
    id: "cafe-restaurant-2023",
    date: "2023-10",
    category: "新事業",
    icon: <Coffee className="w-5 h-5" />,
    title: {
      ja: "カフェ・レストラン事業を開始",
      en: "Launch of Cafe & Restaurant Business",
      zh: "咖啡厅・餐厅业务启动"
    },
    excerpt: {
      ja: "創業から2年、Tengcle Inc.は飲食事業に参入しました。店舗の企画・運営からメニュー開発、スタッフ教育まで一貫したサービスを提供しています。",
      en: "Two years after founding, Tengcle Inc. entered the F&B industry, offering comprehensive services from concept development to staff training.",
      zh: "创业两年后，Tengcle Inc.进军餐饮行业，提供从企划运营到员工培训的一站式服务。"
    }
  },
  {
    id: "founding-2021",
    date: "2021-10",
    category: "会社設立",
    icon: <Building2 className="w-5 h-5" />,
    title: {
      ja: "Tengcle Inc. 設立 - レンタルジム・不動産管理事業を開始",
      en: "Tengcle Inc. Founded - Rental Gym & Property Management Launch",
      zh: "Tengcle Inc.成立 - 租赁健身房・不动产管理业务启动"
    },
    excerpt: {
      ja: "2021年10月、東京にてTengcle Inc.を設立しました。創業と同時にレンタルジム事業と不動産管理事業を開始し、日本市場でのサービス提供を開始しました。",
      en: "Tengcle Inc. was founded in Tokyo in October 2021, launching rental gym and property management services simultaneously.",
      zh: "2021年10月，Tengcle Inc.在东京成立，同时启动租赁健身房和不动产管理业务。"
    }
  },
  {
    id: "group-expansion-2024",
    date: "2024-01",
    category: "グループ展開",
    icon: <Building2 className="w-5 h-5" />,
    title: {
      ja: "Tengcle Group グローバル展開開始",
      en: "Tengcle Group Global Expansion Begins",
      zh: "Tengcle Group全球扩展启动"
    },
    excerpt: {
      ja: "2024年、香港法人Tengcle Limitedを設立し、Tengcle Groupとしてグローバル展開を開始しました。アジアを中心としたビジネスネットワークの構築を進めています。",
      en: "In 2024, Tengcle Limited was established in Hong Kong, marking the beginning of Tengcle Group's global expansion across Asia.",
      zh: "2024年，香港法人Tengcle Limited成立，标志着Tengcle Group开始全球扩展。"
    }
  }
];

export default function News() {
  const { language } = useJpLanguage();
  const [location] = useLocation();
  const pathLang = location.split("/")[2] || "ja";
  const basePath = `/jp/${pathLang}`;

  const getFontClass = () => {
    if (language === "ja") return "font-jp";
    if (language === "zh") return "font-zh";
    return "";
  };

  const pageTitle = language === "ja" ? "ニュース" : language === "zh" ? "新闻动态" : "News";
  const pageSubtitle = language === "ja"
    ? "Tengcle Inc.の最新情報とマイルストーン"
    : language === "zh"
      ? "Tengcle Inc.的最新动态与里程碑"
      : "Latest updates and milestones from Tengcle Inc.";
  const readMore = language === "ja" ? "詳細を見る" : language === "zh" ? "查看详情" : "Read More";

  // Sort by date descending
  const sortedArticles = [...newsArticles].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <SEOHead
        title={`${pageTitle} | Tengcle Inc.`}
        description={pageSubtitle}
        keywords="Tengcle Inc., ニュース, 会社情報, 東京, 不動産管理, レンタルジム"
        canonical={`https://www.tengcle.com${basePath}/news`}
        ogType="website"
      />
      <div className="min-h-screen bg-cream">
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
                    <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group cursor-pointer">
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
