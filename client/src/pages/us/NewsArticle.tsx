/**
 * News Article Page - US Site
 *
 * Design: Individual article page with full content
 * Features: 3-language support, related articles
 */

import { Link, useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Building2, Home, MapPin } from "lucide-react";
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
    id: "property-management-launch-2025",
    date: "2025-03",
    category: "Business Launch",
    icon: <Home className="w-5 h-5" />,
    title: {
      en: "Full-Scale Property Management Operations Begin",
      ja: "不動産管理事業を本格始動",
      zh: "不动产管理业务正式启动",
    },
    excerpt: {
      en: "Tengcle Development LLC begins full-scale property management operations in New Jersey and the New York metro area.",
      ja: "Tengcle Development LLCは、ニュージャージー州およびニューヨーク都市圏で不動産管理事業を本格的に開始しました。",
      zh: "Tengcle Development LLC在新泽西州和纽约都市圈正式启动不动产管理业务。",
    },
    content: {
      en: [
        "Tengcle Development LLC begins full-scale property management operations in New Jersey and the New York metro area, offering comprehensive services for property owners and investors.",
        "Our property management services include tenant screening and placement, rent collection and accounting, maintenance coordination, and regular property inspections. We handle all aspects of property management to maximize returns for property owners.",
        "In addition to traditional property management, we also offer vacation rental management services for Airbnb and VRBO properties. Our services include listing optimization, guest communication, professional cleaning, and dynamic pricing strategies.",
        "Based in Weehawken, NJ, we serve the greater New York metropolitan area, providing local expertise combined with the global resources of Tengcle Group.",
      ],
      ja: [
        "Tengcle Development LLCは、ニュージャージー州およびニューヨーク都市圏で不動産管理事業を本格的に開始しました。物件オーナーや投資家向けに包括的なサービスを提供します。",
        "不動産管理サービスには、入居者審査・入居手続き、家賃回収・会計処理、メンテナンス調整、定期物件検査が含まれます。物件オーナーの収益最大化のため、不動産管理のあらゆる側面を担当します。",
        "従来の不動産管理に加え、AirbnbやVRBO物件のバケーションレンタル管理サービスも提供しています。リスティング最適化、ゲスト対応、プロフェッショナルクリーニング、ダイナミックプライシング戦略などのサービスを提供します。",
        "ニュージャージー州ウィーホーケンを拠点に、ニューヨーク大都市圏にサービスを提供し、地域の専門知識とTengcle Groupのグローバルリソースを組み合わせています。",
      ],
      zh: [
        "Tengcle Development LLC在新泽西州和纽约都市圈正式启动不动产管理业务，为业主和投资者提供综合服务。",
        "我们的物业管理服务包括租户筛选和安置、租金收取和会计、维护协调以及定期物业检查。我们处理物业管理的各个方面，以最大化业主的收益。",
        "除了传统的物业管理，我们还为Airbnb和VRBO物业提供度假租赁管理服务。我们的服务包括房源优化、客人沟通、专业清洁和动态定价策略。",
        "我们以新泽西州威霍肯为基地，服务大纽约都市圈，将本地专业知识与Tengcle Group的全球资源相结合。",
      ],
    },
  },
  {
    id: "us-founding-2026",
    date: "2026-01",
    category: "Company Founding",
    icon: <Building2 className="w-5 h-5" />,
    title: {
      en: "Tengcle Development LLC Established in New Jersey",
      ja: "Tengcle Development LLC ニュージャージー州にて設立",
      zh: "Tengcle Development LLC在新泽西州成立",
    },
    excerpt: {
      en: "Tengcle Development LLC was officially registered in Weehawken, New Jersey in January 2026 as the US office of Tengcle Group.",
      ja: "Tengcle Development LLCは、2026年1月にTengcle Groupの米国拠点としてニュージャージー州ウィーホーケンに正式登記されました。",
      zh: "Tengcle Development LLC于2026年1月作为Tengcle Group的美国办事处在新泽西州威霍肯正式注册。",
    },
    content: {
      en: [
        "Tengcle Development LLC was officially registered in Weehawken, New Jersey in January 2026 as the US office of Tengcle Group, marking the group's expansion into the North American market.",
        "Located just across the Hudson River from Manhattan, Weehawken offers an ideal strategic position for serving the New York metropolitan area while maintaining competitive operational costs.",
        "As part of Tengcle Group, which has operations in Tokyo and Hong Kong, Tengcle Development LLC brings international expertise to the US real estate market. Our team combines local market knowledge with global best practices in property management.",
        "The establishment of Tengcle Development LLC represents a significant milestone in Tengcle Group's vision of building a global network of real estate and hospitality services.",
      ],
      ja: [
        "Tengcle Development LLCは、2026年1月にTengcle Groupの米国拠点としてニュージャージー州ウィーホーケンに正式登記されました。グループの北米市場への進出を示すものです。",
        "マンハッタンからハドソン川を挟んですぐの場所に位置するウィーホーケンは、競争力のある運営コストを維持しながらニューヨーク大都市圏にサービスを提供するための理想的な戦略的位置にあります。",
        "東京と香港に拠点を持つTengcle Groupの一員として、Tengcle Development LLCは米国不動産市場に国際的な専門知識をもたらします。私たちのチームは、地域の市場知識と不動産管理のグローバルベストプラクティスを組み合わせています。",
        "Tengcle Development LLCの設立は、不動産およびホスピタリティサービスのグローバルネットワーク構築というTengcle Groupのビジョンにおける重要なマイルストーンです。",
      ],
      zh: [
        "Tengcle Development LLC于2026年1月作为Tengcle Group的美国办事处在新泽西州威霍肯正式注册，标志着集团进军北美市场。",
        "威霍肯位于哈德逊河对岸，距曼哈顿仅一河之隔，是服务纽约都市圈的理想战略位置，同时保持有竞争力的运营成本。",
        "作为在东京和香港设有办事处的Tengcle Group的一部分，Tengcle Development LLC将国际专业知识带入美国房地产市场。我们的团队将本地市场知识与物业管理的全球最佳实践相结合。",
        "Tengcle Development LLC的成立是Tengcle Group建立全球房地产和酒店服务网络愿景中的重要里程碑。",
      ],
    },
  },
  {
    id: "group-global-network-2024",
    date: "2024-12",
    category: "Group News",
    icon: <MapPin className="w-5 h-5" />,
    title: {
      en: "Tengcle Group Establishes Global Three-Location Network",
      ja: "Tengcle Group グローバル3拠点体制を確立",
      zh: "Tengcle Group建立全球三地网络",
    },
    excerpt: {
      en: "With the establishment of Tengcle Development LLC, Tengcle Group now operates from three locations.",
      ja: "Tengcle Development LLCの設立により、Tengcle Groupは3拠点体制となりました。",
      zh: "随着Tengcle Development LLC的成立，Tengcle Group现已在三地运营。",
    },
    content: {
      en: [
        "With the establishment of Tengcle Development LLC, Tengcle Group now operates from three locations: Tokyo, Hong Kong, and New Jersey, enabling comprehensive global service delivery.",
        "株式会社Tengcle in Tokyo serves as the group's founding entity, offering property management, F&B operations, rental gyms, capsule hotels, and staffing services in the Japanese market.",
        "Tengcle Limited in Hong Kong focuses on hospitality procurement, FF&E sourcing, hotel operations consulting, and IT solutions for the hospitality industry across Asia.",
        "This three-location network allows Tengcle Group to serve clients across multiple time zones and markets, providing seamless support for international business operations and cross-border investments.",
      ],
      ja: [
        "Tengcle Development LLCの設立により、Tengcle Groupは東京、香港、ニュージャージーの3拠点体制となり、グローバルなサービス提供が可能になりました。",
        "東京の株式会社Tengcleはグループの創業法人として、日本市場で不動産管理、飲食事業、レンタルジム、カプセルホテル、人材紹介サービスを提供しています。",
        "香港のTengcle Limitedは、アジア全域のホスピタリティ業界向けに、ホスピタリティ調達、FF&E調達、ホテル運営コンサルティング、ITソリューションを提供しています。",
        "この3拠点ネットワークにより、Tengcle Groupは複数のタイムゾーンと市場にわたってクライアントにサービスを提供し、国際的なビジネス運営とクロスボーダー投資をシームレスにサポートできます。",
      ],
      zh: [
        "随着Tengcle Development LLC的成立，Tengcle Group现已在东京、香港和新泽西三地运营，实现全球化服务。",
        "东京的株式会社Tengcle是集团的创始实体，在日本市场提供物业管理、餐饮运营、租赁健身房、胶囊酒店和人才介绍服务。",
        "香港的Tengcle Limited专注于为亚洲酒店行业提供酒店采购、FF&E采购、酒店运营咨询和IT解决方案。",
        "这一三地网络使Tengcle Group能够跨多个时区和市场为客户提供服务，为国际业务运营和跨境投资提供无缝支持。",
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
