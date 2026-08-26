/**
 * News Article Page - US Site
 *
 * Design: Individual article page with full content
 * Features: 3-language support, related articles
 */

import { Link, useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Building2 } from "lucide-react";
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
  content: {
    en: string[];
    ja: string[];
    zh: string[];
  };
}

const newsArticles: NewsArticle[] = [
  {
    id: "us-founding-2026",
    date: "2026-01-05",
    category: "Company Founding",
    icon: <Building2 className="w-5 h-5" />,
    title: {
      en: "Tengcle Development LLC Established in New Jersey",
      ja: "Tengcle Development LLC ニュージャージー州にて設立",
      zh: "Tengcle Development LLC在新泽西州成立",
    },
    excerpt: {
      en: "Tengcle Development LLC was formed in New Jersey on 5 January 2026. New Jersey Entity ID: 0451392806.",
      ja: "Tengcle Development LLCは2026年1月5日にニュージャージー州で設立されました。ニュージャージー州法人ID：0451392806。",
      zh: "Tengcle Development LLC于2026年1月5日在新泽西州成立。新泽西州实体ID：0451392806。",
    },
    content: {
      en: [
        "Tengcle Development LLC was formed in New Jersey on 5 January 2026.",
        "The New Jersey Entity ID is 0451392806.",
        "Tengcle Development LLC is one of the Tengcle related companies. Each company is a separate legal entity in its jurisdiction.",
      ],
      ja: [
        "Tengcle Development LLCは2026年1月5日にニュージャージー州で設立されました。",
        "ニュージャージー州法人IDは0451392806です。",
        "Tengcle Development LLCはTengcleの関連会社の一社です。各社は、それぞれの法域における独立した法人です。",
      ],
      zh: [
        "Tengcle Development LLC于2026年1月5日在新泽西州成立。",
        "新泽西州实体ID为0451392806。",
        "Tengcle Development LLC是Tengcle关联公司之一。各公司是在其司法管辖区内独立的法律实体。",
      ],
    },
  },
];

export default function NewsArticle() {
  const { language } = useUsLanguage();
  const [location] = useLocation();
  const params = useParams();
  const articleId = params.id;

  const pathLang = location.split("/")[2] || "en";
  const basePath = `/us/${pathLang}`;

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
      <div className="min-h-screen bg-white">
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
        title={`${article.title[language as keyof typeof article.title]} | Tengcle Development LLC`}
        description={article.excerpt[language as keyof typeof article.excerpt]}
        keywords="Tengcle Development LLC, News, Property Management, New Jersey"
        canonical={`https://www.tengcle.com${basePath}/news/${articleId}`}
        ogType="article"
        ogImage="/images/og-image.webp"
        publishedTime={
          article.date.length === 7 ? `${article.date}-01` : article.date
        }
      />
      <div className="min-h-screen bg-white">
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
              className="bg-gray-50 rounded-xl p-8 md:p-12"
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
        <section className="py-16 bg-gray-100">
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
