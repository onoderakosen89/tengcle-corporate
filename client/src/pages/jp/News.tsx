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
    id: "company-incorporation-2021",
    date: "2021-10-25",
    category: "会社設立",
    icon: <Building2 className="w-5 h-5" />,
    title: {
      ja: "株式会社Tengcle 設立",
      en: "Incorporation of Tengcle Co., Ltd.",
      zh: "株式会社Tengcle成立"
    },
    excerpt: {
      ja: "2021年10月25日、株式会社Tengcleを東京都で設立しました。",
      en: "株式会社Tengcle was incorporated in Tokyo on 25 October 2021.",
      zh: "株式会社Tengcle于2021年10月25日在东京成立。"
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
    ? "株式会社Tengcleの会社情報"
    : language === "zh"
      ? "株式会社Tengcle的公司信息"
      : "Company information from 株式会社Tengcle";
  const readMore = language === "ja" ? "詳細を見る" : language === "zh" ? "查看详情" : "Read More";

  // Sort by date descending
  const sortedArticles = [...newsArticles].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <SEOHead
        title={`${pageTitle} | 株式会社Tengcle`}
        description={pageSubtitle}
        keywords="株式会社Tengcle, ニュース, 会社情報, 東京, 不動産管理"
        canonical={`https://www.tengcle.com${basePath}/news`}
        ogType="website"
        ogImage="/images/og-image.webp"
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
