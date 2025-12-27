/**
 * News/Blog Page - Hong Kong Site
 * 
 * Design: Clean professional layout with article cards
 * Features: News articles, project updates, company announcements
 */

import { useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, useInView } from "framer-motion";
import { Calendar, ArrowRight, Tag, Clock, ArrowLeft } from "lucide-react";
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

// Sample news articles
const newsArticlesEn: NewsArticle[] = [
  {
    id: "1",
    title: "Tengcle Group Expands Operations to United States",
    excerpt: "We are excited to announce the establishment of Tengcle LLC in New Jersey, marking our expansion into the US real estate market.",
    date: "2024-12-15",
    category: "Company News",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800&h=400&fit=crop",
    slug: "us-expansion"
  },
  {
    id: "2",
    title: "New Hotel FF&E Project Completed in Osaka",
    excerpt: "Successfully delivered furniture, fixtures, and equipment for a 200-room luxury hotel in Osaka, Japan.",
    date: "2024-11-28",
    category: "Project Update",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop",
    slug: "osaka-hotel-project"
  },
  {
    id: "3",
    title: "Tengcle Inc. Launches Rental Gym Service in Tokyo",
    excerpt: "Our Japan subsidiary introduces private rental gym facilities, offering personalized fitness spaces in central Tokyo.",
    date: "2024-11-10",
    category: "Service Launch",
    readTime: "2 min",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop",
    slug: "tokyo-rental-gym"
  },
  {
    id: "4",
    title: "Partnership with Leading Furniture Manufacturers",
    excerpt: "Tengcle Limited announces strategic partnerships with premium furniture manufacturers in China and Southeast Asia.",
    date: "2024-10-25",
    category: "Partnership",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=400&fit=crop",
    slug: "manufacturer-partnership"
  },
  {
    id: "5",
    title: "Odoo ERP Implementation for Hospitality Clients",
    excerpt: "Our IT team successfully deployed customized Odoo ERP solutions for three hotel chains across Asia.",
    date: "2024-10-08",
    category: "IT Solutions",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    slug: "odoo-implementation"
  },
  {
    id: "6",
    title: "Tengcle Group Celebrates 5th Anniversary",
    excerpt: "Reflecting on five years of growth, partnerships, and successful projects across Hong Kong, Japan, and the United States.",
    date: "2024-09-20",
    category: "Company News",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&h=400&fit=crop",
    slug: "5th-anniversary"
  }
];

const newsArticlesJa: NewsArticle[] = [
  {
    id: "1",
    title: "Tengcle Groupがアメリカ事業を拡大",
    excerpt: "ニュージャージー州にTengcle LLCを設立し、米国不動産市場への進出を発表いたしました。",
    date: "2024-12-15",
    category: "会社ニュース",
    readTime: "3分",
    image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800&h=400&fit=crop",
    slug: "us-expansion"
  },
  {
    id: "2",
    title: "大阪の新ホテルFF&Eプロジェクト完了",
    excerpt: "大阪の200室のラグジュアリーホテル向けに家具・什器・備品の納入を完了しました。",
    date: "2024-11-28",
    category: "プロジェクト",
    readTime: "4分",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop",
    slug: "osaka-hotel-project"
  },
  {
    id: "3",
    title: "Tengcle Inc.が東京でレンタルジムサービスを開始",
    excerpt: "日本法人がプライベートレンタルジム施設を導入。東京都心でパーソナルなフィットネス空間を提供します。",
    date: "2024-11-10",
    category: "サービス開始",
    readTime: "2分",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop",
    slug: "tokyo-rental-gym"
  },
  {
    id: "4",
    title: "大手家具メーカーとの提携",
    excerpt: "Tengcle Limitedは中国・東南アジアのプレミアム家具メーカーとの戦略的提携を発表しました。",
    date: "2024-10-25",
    category: "提携",
    readTime: "3分",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=400&fit=crop",
    slug: "manufacturer-partnership"
  },
  {
    id: "5",
    title: "ホスピタリティ向けOdoo ERP導入",
    excerpt: "ITチームがアジア3つのホテルチェーン向けにカスタマイズしたOdoo ERPソリューションを導入しました。",
    date: "2024-10-08",
    category: "ITソリューション",
    readTime: "5分",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    slug: "odoo-implementation"
  },
  {
    id: "6",
    title: "Tengcle Group創業5周年",
    excerpt: "香港、日本、アメリカでの5年間の成長、パートナーシップ、成功したプロジェクトを振り返ります。",
    date: "2024-09-20",
    category: "会社ニュース",
    readTime: "4分",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&h=400&fit=crop",
    slug: "5th-anniversary"
  }
];

const newsArticlesZh: NewsArticle[] = [
  {
    id: "1",
    title: "Tengcle Group扩展美国业务",
    excerpt: "我们很高兴宣布在新泽西州成立Tengcle LLC，标志着我们进入美国房地产市场。",
    date: "2024-12-15",
    category: "公司新闻",
    readTime: "3分钟",
    image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800&h=400&fit=crop",
    slug: "us-expansion"
  },
  {
    id: "2",
    title: "大阪新酒店FF&E项目完成",
    excerpt: "成功为大阪一家200间客房的豪华酒店交付家具、固定装置和设备。",
    date: "2024-11-28",
    category: "项目更新",
    readTime: "4分钟",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop",
    slug: "osaka-hotel-project"
  },
  {
    id: "3",
    title: "Tengcle Inc.在东京推出租赁健身房服务",
    excerpt: "我们的日本子公司推出私人租赁健身房设施，在东京市中心提供个性化健身空间。",
    date: "2024-11-10",
    category: "服务推出",
    readTime: "2分钟",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop",
    slug: "tokyo-rental-gym"
  },
  {
    id: "4",
    title: "与领先家具制造商建立合作伙伴关系",
    excerpt: "Tengcle Limited宣布与中国和东南亚的优质家具制造商建立战略合作伙伴关系。",
    date: "2024-10-25",
    category: "合作伙伴",
    readTime: "3分钟",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=400&fit=crop",
    slug: "manufacturer-partnership"
  },
  {
    id: "5",
    title: "为酒店客户实施Odoo ERP",
    excerpt: "我们的IT团队成功为亚洲三家连锁酒店部署了定制的Odoo ERP解决方案。",
    date: "2024-10-08",
    category: "IT解决方案",
    readTime: "5分钟",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    slug: "odoo-implementation"
  },
  {
    id: "6",
    title: "Tengcle Group庆祝成立5周年",
    excerpt: "回顾五年来在香港、日本和美国的成长、合作伙伴关系和成功项目。",
    date: "2024-09-20",
    category: "公司新闻",
    readTime: "4分钟",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&h=400&fit=crop",
    slug: "5th-anniversary"
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
      metaKeywords: "Tengcle news, company updates, hotel FF&E projects, business news, Hong Kong"
    },
    ja: {
      title: "ニュース",
      subtitle: "最新のプロジェクト、パートナーシップ、会社の動向をお知らせします",
      backToHome: "ホームに戻る",
      allNews: "すべてのニュース",
      metaTitle: "ニュース | Tengcle Limited",
      metaDescription: "Tengcle Limitedの最新ニュース、プロジェクト更新、会社のお知らせ。ホテルFF&Eプロジェクトとビジネス開発の最新情報。",
      metaKeywords: "Tengcle ニュース, 会社更新, ホテルFF&Eプロジェクト, ビジネスニュース, 香港"
    },
    zh: {
      title: "新闻动态",
      subtitle: "了解我们最新的项目、合作伙伴关系和公司发展",
      backToHome: "返回首页",
      allNews: "所有新闻",
      metaTitle: "新闻动态 | Tengcle Limited",
      metaDescription: "Tengcle Limited的最新新闻、项目更新和公司公告。了解我们的酒店FF&E项目和业务发展。",
      metaKeywords: "Tengcle新闻, 公司更新, 酒店FF&E项目, 商业新闻, 香港"
    }
  };

  const trans = translations[pathLang as keyof typeof translations] || translations.en;

  // Structured data for news page
  const newsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": trans.metaTitle,
    "description": trans.metaDescription,
    "url": `https://tengcle.com/hk/${pathLang}/news`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": articles.map((article, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "NewsArticle",
          "headline": article.title,
          "description": article.excerpt,
          "datePublished": article.date,
          "image": article.image,
          "author": {
            "@type": "Organization",
            "name": "Tengcle Limited"
          }
        }
      }))
    }
  };

  return (
    <>
      <SEOHead
        title={trans.metaTitle}
        description={trans.metaDescription}
        canonical={`https://tengcle.com/hk/${pathLang}/news`}
        locale={pathLang === "ja" ? "ja_JP" : pathLang === "zh" ? "zh_HK" : "en_HK"}
        keywords={trans.metaKeywords}
        structuredData={newsSchema}
      />

      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-purple overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="container relative">
            <Link href={basePath}>
              <Button variant="ghost" className="mb-6 text-white/80 hover:text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className={fontClass}>{trans.backToHome}</span>
              </Button>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className={`text-4xl md:text-5xl font-heading text-white mb-4 ${fontClass}`}>
                {trans.title}
              </h1>
              <p className={`text-white/80 text-lg max-w-2xl ${fontClass}`}>
                {trans.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-20 bg-light-gray">
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
            <h2 className={`text-2xl font-heading text-charcoal mb-4 ${fontClass}`}>
              {language === "ja" ? "お問い合わせ" : language === "zh" ? "联系我们" : "Get in Touch"}
            </h2>
            <p className={`text-slate mb-8 max-w-xl mx-auto ${fontClass}`}>
              {language === "ja" 
                ? "プロジェクトやサービスについてのお問い合わせはこちらから" 
                : language === "zh" 
                ? "如需了解更多项目和服务信息，请联系我们"
                : "Contact us to learn more about our projects and services"}
            </p>
            <Link href={`${basePath}/contact`}>
              <Button className="bg-purple hover:bg-purple-light text-white">
                <span className={fontClass}>
                  {language === "ja" ? "お問い合わせ" : language === "zh" ? "联系我们" : "Contact Us"}
                </span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
