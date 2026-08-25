/**
 * News Article Page - Japan Site
 *
 * Design: Individual article page with full content
 * Features: 3-language support, related articles
 */

import { Link, useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowLeft,
  Building2,
  Dumbbell,
  Coffee,
  Hotel,
  Users,
  ArrowRight,
} from "lucide-react";
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
  content: {
    ja: string[];
    en: string[];
    zh: string[];
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
      zh: "株式会社Tengcle成立",
    },
    excerpt: {
      ja: "2021年10月25日、株式会社Tengcleを東京都で設立しました。",
      en: "株式会社Tengcle was incorporated in Tokyo on 25 October 2021.",
      zh: "株式会社Tengcle于2021年10月25日在东京成立。",
    },
    content: {
      ja: [
        "2021年10月25日、株式会社Tengcleを東京都で設立しました。",
        "現在は、不動産物件の家賃回収、修繕手配、テナント対応などの不動産管理業務を行っています。",
        "その他の事業は、実態に合わせて慎重に準備・再開を検討しています。",
      ],
      en: [
        "株式会社Tengcle was incorporated in Tokyo on 25 October 2021.",
        "Its active operations include property management, such as rent collection, repair coordination, and tenant communication.",
        "Other activities are being reviewed or prepared in line with their actual operational status.",
      ],
      zh: [
        "株式会社Tengcle于2021年10月25日在东京成立。",
        "目前的运营包括房地产管理，例如租金回收、维修协调和租户沟通。",
        "其他活动将根据实际运营状态进行审慎评估或准备。",
      ],
    },
  },
];

export default function NewsArticle() {
  const { language } = useJpLanguage();
  const [location] = useLocation();
  const params = useParams();
  const articleId = params.id;

  const pathLang = location.split("/")[2] || "ja";
  const basePath = `/jp/${pathLang}`;

  const article = newsArticles.find(a => a.id === articleId);

  const getFontClass = () => {
    if (language === "ja") return "font-jp";
    if (language === "zh") return "font-zh";
    return "";
  };

  const backToNews =
    language === "ja"
      ? "ニュース一覧に戻る"
      : language === "zh"
        ? "返回新闻列表"
        : "Back to News";
  const relatedTitle =
    language === "ja"
      ? "関連記事"
      : language === "zh"
        ? "相关文章"
        : "Related Articles";

  if (!article) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="container py-32 text-center">
          <h1 className="text-2xl font-bold text-navy mb-4">
            Article not found
          </h1>
          <Link href={`${basePath}/news`}>
            <span className="text-gold hover:underline">Back to News</span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedArticles = newsArticles
    .filter(a => a.id !== articleId)
    .slice(0, 2);

  return (
    <>
      <SEOHead
        title={`${article.title[language as keyof typeof article.title]} | 株式会社Tengcle`}
        description={article.excerpt[language as keyof typeof article.excerpt]}
        keywords="株式会社Tengcle, ニュース, 会社情報, 東京"
        canonical={`https://www.tengcle.com${basePath}/news/${articleId}`}
        ogType="article"
        ogImage="/images/og-image.webp"
        publishedTime={article.date}
      />
      <div className="min-h-screen bg-cream">
        <Header />

        {/* Hero Section */}
        <section className="pt-24 pb-12 bg-gradient-to-b from-navy to-navy/95">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Back Link */}
              <Link href={`${basePath}/news`}>
                <span
                  className={`inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors ${getFontClass()}`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  {backToNews}
                </span>
              </Link>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 text-sm text-white/70">
                  <Calendar className="w-4 h-4" />
                  {article.date}
                </span>
                <span className="px-2 py-0.5 bg-gold/20 text-gold text-xs rounded-full">
                  {article.category}
                </span>
              </div>

              {/* Title */}
              <h1
                className={`text-3xl md:text-4xl font-bold text-white ${getFontClass()}`}
              >
                {article.title[language as keyof typeof article.title]}
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl p-8 md:p-12 shadow-sm"
            >
              <div className={`prose prose-lg max-w-none ${getFontClass()}`}>
                {article.content[language as keyof typeof article.content].map(
                  (paragraph, index) => (
                    <p
                      key={index}
                      className="text-gray-700 leading-relaxed mb-6 last:mb-0"
                    >
                      {paragraph}
                    </p>
                  )
                )}
              </div>
            </motion.article>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-4xl">
            <h2
              className={`text-2xl font-bold text-navy mb-8 ${getFontClass()}`}
            >
              {relatedTitle}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedArticles.map(related => (
                <Link key={related.id} href={`${basePath}/news/${related.id}`}>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer h-full">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4" />
                      {related.date}
                    </div>
                    <h3
                      className={`text-lg font-bold text-navy group-hover:text-gold transition-colors mb-2 ${getFontClass()}`}
                    >
                      {related.title[language as keyof typeof related.title]}
                    </h3>
                    <p
                      className={`text-gray-600 text-sm line-clamp-2 ${getFontClass()}`}
                    >
                      {
                        related.excerpt[
                          language as keyof typeof related.excerpt
                        ]
                      }
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
