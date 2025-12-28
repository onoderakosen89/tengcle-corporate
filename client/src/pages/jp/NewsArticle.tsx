/**
 * News Article Page - Japan Site
 * 
 * Design: Individual article page with full content
 * Features: 3-language support, related articles
 */

import { Link, useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Building2, Dumbbell, Coffee, Hotel, Users, ArrowRight } from "lucide-react";
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
      ja: "Tengcle Inc.は2024年より、ホテル運営事業および人材紹介事業を新たに開始しました。",
      en: "Tengcle Inc. has launched hotel operations and staffing services in 2024.",
      zh: "Tengcle Inc.于2024年启动酒店运营及人才介绍业务。"
    },
    content: {
      ja: [
        "Tengcle Inc.は2024年より、ホテル運営事業および人材紹介事業を新たに開始しました。これにより、不動産管理、飲食、フィットネス、宿泊、人材の5事業体制となりました。",
        "ホテル運営事業では、カプセルホテルを中心に、ビジネス・観光のお客様向けに快適な宿泊環境を提供しています。効率的なオペレーションと高いホスピタリティを両立させることで、お客様満足度の向上に努めています。",
        "人材紹介事業では、企業と求職者のマッチングサービスを提供しています。不動産、飲食、ホスピタリティ業界での経験を活かし、業界知識とネットワークを駆使して最適な人材をご紹介します。",
        "今後も事業の多角化を進め、お客様のニーズに幅広くお応えしてまいります。"
      ],
      en: [
        "Tengcle Inc. has launched hotel operations and staffing services in 2024, expanding to five business segments: real estate management, F&B, fitness, hospitality, and staffing.",
        "Our hotel operations focus on capsule hotels, providing comfortable accommodation for business and leisure travelers. We strive to achieve both operational efficiency and high hospitality standards.",
        "Our staffing services connect companies with job seekers. Leveraging our experience in real estate, F&B, and hospitality industries, we utilize our industry knowledge and network to introduce the best candidates.",
        "We will continue to diversify our business to meet a wide range of customer needs."
      ],
      zh: [
        "Tengcle Inc.于2024年启动酒店运营及人才介绍业务，形成不动产管理、餐饮、健身、住宿、人才五大业务体系。",
        "酒店运营业务以胶囊酒店为中心，为商务及观光客人提供舒适的住宿环境。我们致力于实现高效运营与优质服务的平衡。",
        "人才介绍业务为企业和求职者提供匹配服务。凭借在不动产、餐饮、酒店行业的经验，我们运用行业知识和人脉网络，为您推荐最合适的人才。",
        "我们将继续推进业务多元化，满足客户的广泛需求。"
      ]
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
      ja: "創業から2年、Tengcle Inc.は飲食事業に参入しました。",
      en: "Two years after founding, Tengcle Inc. entered the F&B industry.",
      zh: "创业两年后，Tengcle Inc.进军餐饮行业。"
    },
    content: {
      ja: [
        "創業から2年、Tengcle Inc.は飲食事業に参入しました。店舗の企画・運営からメニュー開発、スタッフ教育まで一貫したサービスを提供しています。",
        "私たちの飲食事業は、単なる店舗運営にとどまらず、お客様に特別な体験を提供することを目指しています。空間デザイン、メニュー構成、サービス品質のすべてにおいて、細部までこだわりを持って取り組んでいます。",
        "不動産管理事業で培った物件選定のノウハウと、レンタルジム事業で培った顧客サービスの経験を活かし、飲食事業においても高品質なサービスを提供しています。",
        "今後も新しい店舗形態やコンセプトに挑戦し、お客様に喜んでいただける空間づくりを続けてまいります。"
      ],
      en: [
        "Two years after founding, Tengcle Inc. entered the F&B industry, offering comprehensive services from concept development to staff training.",
        "Our F&B business aims to provide customers with special experiences beyond simple store operations. We pay attention to every detail in space design, menu composition, and service quality.",
        "Leveraging our property selection expertise from real estate management and customer service experience from the rental gym business, we deliver high-quality services in our F&B operations.",
        "We will continue to challenge new store formats and concepts, creating spaces that delight our customers."
      ],
      zh: [
        "创业两年后，Tengcle Inc.进军餐饮行业，提供从企划运营到员工培训的一站式服务。",
        "我们的餐饮业务不仅仅是店铺运营，更致力于为客人提供特别的体验。在空间设计、菜单构成、服务品质等各方面，我们都注重细节。",
        "我们将不动产管理业务积累的选址经验和租赁健身房业务培养的客户服务经验运用到餐饮业务中，提供高品质服务。",
        "今后我们将继续挑战新的店铺形态和概念，持续打造令客人满意的空间。"
      ]
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
      ja: "2021年10月、東京にてTengcle Inc.を設立しました。",
      en: "Tengcle Inc. was founded in Tokyo in October 2021.",
      zh: "2021年10月，Tengcle Inc.在东京成立。"
    },
    content: {
      ja: [
        "2021年10月、東京にてTengcle Inc.を設立しました。創業と同時にレンタルジム事業と不動産管理事業を開始し、日本市場でのサービス提供を開始しました。",
        "レンタルジム事業では、プライベート空間でトレーニングできる環境を提供しています。周りを気にせず、自分のペースでトレーニングに集中できる空間として、多くのお客様にご利用いただいています。",
        "不動産管理事業では、賃貸物件の管理・運営を行っています。入居者様とオーナー様の双方にとって最適なサービスを提供し、物件の価値向上に貢献しています。",
        "創業から3年、私たちは着実に事業を拡大してきました。「think into the future」の理念のもと、これからも新しい価値を創造し続けてまいります。"
      ],
      en: [
        "Tengcle Inc. was founded in Tokyo in October 2021, launching rental gym and property management services simultaneously.",
        "Our rental gym business provides private training spaces where customers can focus on their workouts at their own pace without worrying about others.",
        "Our property management business handles the management and operation of rental properties, providing optimal services for both tenants and property owners while contributing to property value enhancement.",
        "Over three years since founding, we have steadily expanded our business. Under our philosophy of 'think into the future,' we will continue to create new value."
      ],
      zh: [
        "2021年10月，Tengcle Inc.在东京成立，同时启动租赁健身房和不动产管理业务。",
        "租赁健身房业务提供私人训练空间，让客人可以不受他人干扰，按自己的节奏专注训练。",
        "不动产管理业务负责租赁物业的管理和运营，为租户和业主双方提供最优服务，助力物业价值提升。",
        "创业三年来，我们稳步扩展业务。秉承'think into the future'的理念，我们将继续创造新价值。"
      ]
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
      ja: "2024年、香港法人Tengcle Limitedを設立し、Tengcle Groupとしてグローバル展開を開始しました。",
      en: "In 2024, Tengcle Limited was established in Hong Kong, marking the beginning of Tengcle Group's global expansion.",
      zh: "2024年，香港法人Tengcle Limited成立，标志着Tengcle Group开始全球扩展。"
    },
    content: {
      ja: [
        "2024年、香港法人Tengcle Limitedを設立し、Tengcle Groupとしてグローバル展開を開始しました。アジアを中心としたビジネスネットワークの構築を進めています。",
        "香港法人では、ホテルオペレーション事業を中心に、FF&E（家具・什器・備品）調達、ITシステム構築など、ホスピタリティ業界向けの総合サービスを提供しています。",
        "また、同年にはアメリカ法人Tengcle LLCも設立し、ニュージャージー州を拠点に不動産管理・バケーションレンタル事業を展開しています。",
        "日本、香港、アメリカの3拠点体制により、グローバルなサービス提供が可能となりました。今後もネットワークを拡大し、お客様のグローバルなビジネス展開をサポートしてまいります。"
      ],
      en: [
        "In 2024, Tengcle Limited was established in Hong Kong, marking the beginning of Tengcle Group's global expansion across Asia.",
        "Our Hong Kong entity focuses on hotel operations, FF&E procurement, and IT system development, providing comprehensive services for the hospitality industry.",
        "In the same year, Tengcle LLC was also established in the United States, operating property management and vacation rental services based in New Jersey.",
        "With three locations in Japan, Hong Kong, and the United States, we can now provide global services. We will continue to expand our network to support our customers' global business development."
      ],
      zh: [
        "2024年，香港法人Tengcle Limited成立，标志着Tengcle Group开始全球扩展。",
        "香港法人以酒店运营业务为中心，提供FF&E（家具・设备・用品）采购、IT系统构建等酒店行业综合服务。",
        "同年，美国法人Tengcle LLC也在新泽西州成立，开展不动产管理和度假租赁业务。",
        "日本、香港、美国三地布局，使我们能够提供全球化服务。今后我们将继续扩展网络，支持客户的全球业务发展。"
      ]
    }
  }
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

  const backToNews = language === "ja" ? "ニュース一覧に戻る" : language === "zh" ? "返回新闻列表" : "Back to News";
  const relatedTitle = language === "ja" ? "関連記事" : language === "zh" ? "相关文章" : "Related Articles";

  if (!article) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="container py-32 text-center">
          <h1 className="text-2xl font-bold text-navy mb-4">Article not found</h1>
          <Link href={`${basePath}/news`}>
            <span className="text-gold hover:underline">Back to News</span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedArticles = newsArticles.filter(a => a.id !== articleId).slice(0, 2);

  return (
    <>
      <SEOHead
        title={`${article.title[language as keyof typeof article.title]} | Tengcle Inc.`}
        description={article.excerpt[language as keyof typeof article.excerpt]}
        keywords="Tengcle Inc., ニュース, 会社情報, 東京"
        canonical={`https://tengcle.com${basePath}/news/${articleId}`}
        ogType="article"
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
                <span className={`inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors ${getFontClass()}`}>
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
              <h1 className={`text-3xl md:text-4xl font-bold text-white ${getFontClass()}`}>
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
                {article.content[language as keyof typeof article.content].map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-6 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.article>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-4xl">
            <h2 className={`text-2xl font-bold text-navy mb-8 ${getFontClass()}`}>
              {relatedTitle}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedArticles.map((related) => (
                <Link key={related.id} href={`${basePath}/news/${related.id}`}>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer h-full">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4" />
                      {related.date}
                    </div>
                    <h3 className={`text-lg font-bold text-navy group-hover:text-gold transition-colors mb-2 ${getFontClass()}`}>
                      {related.title[language as keyof typeof related.title]}
                    </h3>
                    <p className={`text-gray-600 text-sm line-clamp-2 ${getFontClass()}`}>
                      {related.excerpt[language as keyof typeof related.excerpt]}
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
