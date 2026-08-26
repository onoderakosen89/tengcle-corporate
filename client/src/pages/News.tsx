/**
 * News/Blog Page - Hong Kong Site
 * 
 * Design: Clean professional layout with article cards
 * Features: News articles based on actual company milestones
 */

import { useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, useInView } from "framer-motion";
import { Calendar, ArrowRight, Clock, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  slug: string;
}

// Actual company milestones - Hong Kong perspective
const newsArticlesEn: NewsArticle[] = [
  {
    id: "1",
    title: "First FF&E Project Scheduled for February 2026",
    excerpt: "Tengcle Limited announces its first hotel FF&E procurement project, scheduled for delivery in February 2026. This marks a significant milestone in our hospitality services expansion.",
    date: "2025-12-15",
    category: "Project Announcement",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop",
    slug: "first-ffe-project-2026"
  },
  {
    id: "2",
    title: "Odoo ERP Implementation Services Launched",
    excerpt: "Starting October 2025, Tengcle Limited now offers Odoo ERP implementation and customization services for hospitality and business clients across Asia.",
    date: "2025-10-01",
    category: "Service Launch",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    slug: "odoo-erp-launch"
  },
  {
    id: "3",
    title: "Business Expansion Preparation Begins",
    excerpt: "Tengcle Limited begins preparations for business expansion, identifying FF&E procurement as a key growth opportunity in the hospitality sector.",
    date: "2025-06-01",
    category: "Company News",
    readTime: "2 min",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop",
    slug: "expansion-preparation"
  },
  {
    id: "4",
    title: "Hotel Operations Business Commences",
    excerpt: "Shortly after establishment, Tengcle Limited launches hotel operations business, providing management and operational support for hospitality properties.",
    date: "2025-05-01",
    category: "Business Launch",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=400&fit=crop",
    slug: "hotel-operations-launch"
  },
  {
    id: "5",
    title: "Tengcle Limited Established in Hong Kong",
    excerpt: "Tengcle Limited was incorporated in Hong Kong on 29 April 2025.",
    date: "2025-04-29",
    category: "Company Founding",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=800&h=400&fit=crop",
    slug: "hk-founding"
  }
];

const newsArticlesJa: NewsArticle[] = [
  {
    id: "1",
    title: "初のFF&Eプロジェクト、2026年2月に実施予定",
    excerpt: "Tengcle Limitedは、2026年2月に納品予定の初のホテルFF&E調達プロジェクトを発表しました。ホスピタリティサービス拡大における重要なマイルストーンとなります。",
    date: "2025-12-15",
    category: "プロジェクト発表",
    readTime: "3分",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop",
    slug: "first-ffe-project-2026"
  },
  {
    id: "2",
    title: "Odoo ERP導入サービスを開始",
    excerpt: "2025年10月より、Tengcle Limitedはアジア全域のホスピタリティ・ビジネス向けにOdoo ERP導入・カスタマイズサービスを提供開始しました。",
    date: "2025-10-01",
    category: "サービス開始",
    readTime: "3分",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    slug: "odoo-erp-launch"
  },
  {
    id: "3",
    title: "事業拡大に向けた準備を開始",
    excerpt: "Tengcle Limitedは事業拡大の準備を開始し、ホスピタリティ分野における重要な成長機会としてFF&E調達事業を特定しました。",
    date: "2025-06-01",
    category: "会社ニュース",
    readTime: "2分",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop",
    slug: "expansion-preparation"
  },
  {
    id: "4",
    title: "ホテル運営事業を開始",
    excerpt: "設立直後、Tengcle Limitedはホテル運営事業を開始し、ホスピタリティ施設への管理・運営サポートを提供しています。",
    date: "2025-05-01",
    category: "事業開始",
    readTime: "3分",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=400&fit=crop",
    slug: "hotel-operations-launch"
  },
  {
    id: "5",
    title: "Tengcle Limited 香港で設立",
    excerpt: "Tengcle Limitedは2025年4月29日に香港で設立されました。",
    date: "2025-04-29",
    category: "会社設立",
    readTime: "4分",
    image: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=800&h=400&fit=crop",
    slug: "hk-founding"
  }
];

const newsArticlesZh: NewsArticle[] = [
  {
    id: "1",
    title: "首个FF&E项目定于2026年2月实施",
    excerpt: "Tengcle Limited宣布首个酒店FF&E采购项目，计划于2026年2月交付。这标志着我们在酒店服务扩展方面的重要里程碑。",
    date: "2025-12-15",
    category: "项目公告",
    readTime: "3分钟",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop",
    slug: "first-ffe-project-2026"
  },
  {
    id: "2",
    title: "Odoo ERP实施服务正式启动",
    excerpt: "自2025年10月起，Tengcle Limited为亚洲地区的酒店和商业客户提供Odoo ERP实施和定制服务。",
    date: "2025-10-01",
    category: "服务启动",
    readTime: "3分钟",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    slug: "odoo-erp-launch"
  },
  {
    id: "3",
    title: "开始业务扩展准备工作",
    excerpt: "Tengcle Limited开始业务扩展准备，确定FF&E采购为酒店行业的关键增长机会。",
    date: "2025-06-01",
    category: "公司新闻",
    readTime: "2分钟",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop",
    slug: "expansion-preparation"
  },
  {
    id: "4",
    title: "酒店运营业务正式启动",
    excerpt: "成立后不久，Tengcle Limited启动酒店运营业务，为酒店物业提供管理和运营支持。",
    date: "2025-05-01",
    category: "业务启动",
    readTime: "3分钟",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=400&fit=crop",
    slug: "hotel-operations-launch"
  },
  {
    id: "5",
    title: "Tengcle Limited在香港成立",
    excerpt: "Tengcle Limited于2025年4月29日在香港成立。",
    date: "2025-04-29",
    category: "公司成立",
    readTime: "4分钟",
    image: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=800&h=400&fit=crop",
    slug: "hk-founding"
  }
];

function NewsCard({ article, language, basePath }: { article: NewsArticle; language: string; basePath: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const fontClass = language === "ja" ? "font-jp" : language === "zh" ? "font-zh" : "";

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (language === "ja") {
      return date.toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" });
    } else if (language === "zh") {
      return date.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });
    }
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <Link href={`${basePath}/news/${article.slug}`}>
      <motion.article
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="group bg-white border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      >
        <div className="aspect-video overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-gold/10 text-gold text-xs font-medium">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-slate text-xs">
              <Calendar className="h-3 w-3" />
              {formatDate(article.date)}
            </span>
            <span className="flex items-center gap-1 text-slate text-xs">
              <Clock className="h-3 w-3" />
              {article.readTime}
            </span>
          </div>
          <h3 className={`text-xl font-heading text-charcoal mb-3 group-hover:text-purple transition-colors ${fontClass}`}>
            {article.title}
          </h3>
          <p className={`text-slate text-sm leading-relaxed mb-4 ${fontClass}`}>
            {article.excerpt}
          </p>
          <span className="flex items-center gap-2 text-purple text-sm font-medium group-hover:gap-3 transition-all">
            {language === "ja" ? "続きを読む" : language === "zh" ? "阅读更多" : "Read More"}
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </motion.article>
    </Link>
  );
}

export default function News() {
  const [location] = useLocation();
  const pathLang = location.split("/")[2] || "en";
  const basePath = `/hk/${pathLang}`;
  const { language, t } = useLanguage();

  const fontClass = language === "ja" ? "font-jp" : language === "zh" ? "font-zh" : "";

  // Select articles based on language
  const articles = pathLang === "ja" ? newsArticlesJa : pathLang === "zh" ? newsArticlesZh : newsArticlesEn;

  // Translations
  const translations = {
    en: {
      title: "News & Updates",
      subtitle: "Stay informed about our latest projects, partnerships, and company developments",
      backToHome: "Back to Home",
      allNews: "All News",
      metaTitle: "News & Updates | Tengcle Limited",
      metaDescription: "Latest news, project updates, and company announcements from Tengcle Limited. Stay informed about our hotel FF&E projects and business developments.",
      ctaTitle: "Get in Touch",
      ctaDescription: "Contact us to learn more about our projects and services"
    },
    ja: {
      title: "ニュース＆お知らせ",
      subtitle: "最新のプロジェクト、パートナーシップ、会社の動向をお届けします",
      backToHome: "ホームに戻る",
      allNews: "すべてのニュース",
      metaTitle: "ニュース＆お知らせ | Tengcle Limited",
      metaDescription: "Tengcle Limitedの最新ニュース、プロジェクト更新、会社発表。ホテルFF&Eプロジェクトとビジネス展開についての情報をお届けします。",
      ctaTitle: "お問い合わせ",
      ctaDescription: "プロジェクトやサービスについてお気軽にお問い合わせください"
    },
    zh: {
      title: "新闻动态",
      subtitle: "了解我们最新的项目、合作伙伴关系和公司发展动态",
      backToHome: "返回首页",
      allNews: "所有新闻",
      metaTitle: "新闻动态 | Tengcle Limited",
      metaDescription: "Tengcle Limited的最新新闻、项目更新和公司公告。了解我们的酒店FF&E项目和业务发展。",
      ctaTitle: "联系我们",
      ctaDescription: "联系我们了解更多项目和服务信息"
    }
  };

  const text = translations[pathLang as keyof typeof translations] || translations.en;

  return (
    <>
      <SEOHead
        title={text.metaTitle}
        description={text.metaDescription}
        canonical={`https://www.tengcle.com${basePath}/news`}
        keywords="Tengcle news, hotel FF&E, hospitality projects, company updates, Hong Kong business"
        ogImage="/images/og-image.webp"
      />
      <div className="min-h-screen bg-cream">
        <Header />

        {/* Hero Section */}
        <section className="relative pt-24 pb-16 bg-gradient-to-br from-purple via-purple/95 to-purple-dark overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="container relative z-10">
            <Link href={basePath}>
              <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {text.backToHome}
              </Button>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className={`text-4xl md:text-5xl font-heading text-white mb-4 ${fontClass}`}>
                {text.title}
              </h1>
              <p className={`text-lg text-white/80 max-w-2xl ${fontClass}`}>
                {text.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  language={pathLang}
                  basePath={basePath}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container text-center">
            <h2 className={`text-3xl font-heading text-charcoal mb-4 ${fontClass}`}>
              {text.ctaTitle}
            </h2>
            <p className={`text-slate mb-8 ${fontClass}`}>
              {text.ctaDescription}
            </p>
            <Link href={`${basePath}/contact`}>
              <Button className="bg-purple hover:bg-purple-dark text-white">
                {language === "ja" ? "お問い合わせ" : language === "zh" ? "联系我们" : "Contact Us"}
              </Button>
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
