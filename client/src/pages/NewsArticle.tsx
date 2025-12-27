/**
 * News Article Page - Hong Kong Site
 * 
 * Design: Individual article page with full content
 * Features: 3-language support, related articles
 */

import { Link, useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Tag, Clock, Building2, Hotel, Laptop, Package, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

interface NewsArticle {
  id: string;
  slug: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
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
    id: "1",
    slug: "us-expansion",
    date: "2024-12-15",
    category: "Company News",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800&h=400&fit=crop",
    title: {
      en: "Tengcle Group Expands Operations to United States",
      ja: "Tengcle Group 米国事業を開始",
      zh: "Tengcle Group扩展美国业务"
    },
    excerpt: {
      en: "We are excited to announce the establishment of Tengcle LLC in New Jersey.",
      ja: "ニュージャージー州にTengcle LLCを設立しました。",
      zh: "我们很高兴宣布在新泽西州成立Tengcle LLC。"
    },
    content: {
      en: [
        "We are excited to announce the establishment of Tengcle LLC in New Jersey, marking our expansion into the US real estate market. This strategic move represents a significant milestone in Tengcle Group's global growth strategy.",
        "Tengcle LLC will focus on property management and vacation rental services in the New York metropolitan area. Based in Weehawken, NJ, we are ideally positioned to serve property owners and investors in one of the world's most dynamic real estate markets.",
        "Our US operations will leverage the expertise and best practices developed through our Japan and Hong Kong entities. We bring international perspective combined with local market knowledge to deliver exceptional property management services.",
        "This expansion strengthens Tengcle Group's three-location network spanning Asia and North America, enabling us to better serve clients with global real estate portfolios and cross-border investment needs."
      ],
      ja: [
        "ニュージャージー州にTengcle LLCを設立し、米国不動産市場への進出を発表いたします。この戦略的な動きは、Tengcle Groupのグローバル成長戦略における重要なマイルストーンです。",
        "Tengcle LLCは、ニューヨーク大都市圏での不動産管理およびバケーションレンタルサービスに注力します。ニュージャージー州ウィーホーケンを拠点に、世界で最もダイナミックな不動産市場の一つで物件オーナーや投資家にサービスを提供します。",
        "米国事業では、日本と香港の事業体で培った専門知識とベストプラクティスを活用します。国際的な視点と地域の市場知識を組み合わせ、卓越した不動産管理サービスを提供します。",
        "この拡大により、アジアと北米にまたがるTengcle Groupの3拠点ネットワークが強化され、グローバルな不動産ポートフォリオとクロスボーダー投資ニーズを持つクライアントにより良いサービスを提供できるようになります。"
      ],
      zh: [
        "我们很高兴宣布在新泽西州成立Tengcle LLC，标志着我们进军美国房地产市场。这一战略举措是Tengcle Group全球增长战略的重要里程碑。",
        "Tengcle LLC将专注于纽约大都会地区的物业管理和度假租赁服务。我们以新泽西州威霍肯为基地，处于为全球最具活力的房地产市场之一的业主和投资者提供服务的理想位置。",
        "我们的美国业务将利用通过日本和香港实体开发的专业知识和最佳实践。我们将国际视野与本地市场知识相结合，提供卓越的物业管理服务。",
        "此次扩张加强了Tengcle Group横跨亚洲和北美的三地网络，使我们能够更好地服务于拥有全球房地产投资组合和跨境投资需求的客户。"
      ]
    }
  },
  {
    id: "2",
    slug: "osaka-hotel-project",
    date: "2024-11-28",
    category: "Project Update",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop",
    title: {
      en: "New Hotel FF&E Project Completed in Osaka",
      ja: "大阪の新ホテルFF&Eプロジェクト完了",
      zh: "大阪新酒店FF&E项目完成"
    },
    excerpt: {
      en: "Successfully delivered furniture, fixtures, and equipment for a 200-room luxury hotel in Osaka.",
      ja: "大阪の200室のラグジュアリーホテル向けに家具・什器・備品を納品しました。",
      zh: "成功为大阪一家200间客房的豪华酒店交付家具、固定装置和设备。"
    },
    content: {
      en: [
        "We are proud to announce the successful completion of our FF&E project for a new 200-room luxury hotel in Osaka, Japan. This project showcases our comprehensive procurement and project management capabilities.",
        "The scope included sourcing and delivering guest room furniture, lobby fixtures, restaurant equipment, and back-of-house supplies. We worked closely with the hotel developer and interior designers to ensure every item met the property's luxury standards.",
        "Our team managed the entire supply chain, from manufacturer selection and quality control to logistics coordination and on-site installation supervision. The project was completed on schedule and within budget.",
        "This successful delivery reinforces our position as a trusted FF&E partner for hospitality developments across Asia. We look forward to supporting more hotel projects in the region."
      ],
      ja: [
        "大阪の新しい200室のラグジュアリーホテル向けFF&Eプロジェクトの成功裏の完了を発表いたします。このプロジェクトは、当社の包括的な調達およびプロジェクト管理能力を示すものです。",
        "範囲には、客室家具、ロビー什器、レストラン機器、バックオブハウス用品の調達と納品が含まれました。ホテル開発者やインテリアデザイナーと緊密に連携し、すべてのアイテムが物件のラグジュアリー基準を満たすようにしました。",
        "当社チームは、メーカー選定と品質管理から物流調整、現場での設置監督まで、サプライチェーン全体を管理しました。プロジェクトは予定通り、予算内で完了しました。",
        "この成功した納品は、アジア全域のホスピタリティ開発における信頼できるFF&Eパートナーとしての当社の地位を強化します。今後も地域のホテルプロジェクトをサポートしてまいります。"
      ],
      zh: [
        "我们自豪地宣布成功完成日本大阪一家新建200间客房豪华酒店的FF&E项目。该项目展示了我们全面的采购和项目管理能力。",
        "范围包括采购和交付客房家具、大堂固定装置、餐厅设备和后勤用品。我们与酒店开发商和室内设计师密切合作，确保每件物品都符合物业的豪华标准。",
        "我们的团队管理整个供应链，从制造商选择和质量控制到物流协调和现场安装监督。项目按计划在预算内完成。",
        "这次成功交付巩固了我们作为亚洲酒店开发项目值得信赖的FF&E合作伙伴的地位。我们期待支持该地区更多的酒店项目。"
      ]
    }
  },
  {
    id: "3",
    slug: "tokyo-rental-gym",
    date: "2024-11-10",
    category: "Service Launch",
    readTime: "2 min",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop",
    title: {
      en: "Tengcle Inc. Launches Rental Gym Service in Tokyo",
      ja: "Tengcle Inc. 東京でレンタルジムサービスを開始",
      zh: "Tengcle Inc.在东京推出租赁健身房服务"
    },
    excerpt: {
      en: "Our Japan subsidiary introduces private rental gym facilities in central Tokyo.",
      ja: "日本法人が東京都心でプライベートレンタルジム施設を開始しました。",
      zh: "我们的日本子公司在东京市中心推出私人租赁健身房设施。"
    },
    content: {
      en: [
        "Tengcle Inc., our Japan subsidiary, has launched a new rental gym service offering private fitness spaces in central Tokyo. This service caters to individuals seeking a personalized workout environment.",
        "Our rental gym facilities provide fully equipped private rooms where customers can exercise at their own pace without the distractions of a crowded gym. Equipment includes cardio machines, free weights, and resistance training equipment.",
        "The service operates on a flexible hourly booking system, making it convenient for busy professionals and fitness enthusiasts who prefer privacy during their workouts.",
        "This launch represents Tengcle Inc.'s continued expansion of lifestyle services in Japan, complementing our existing property management and F&B operations."
      ],
      ja: [
        "日本法人Tengcle Inc.は、東京都心でプライベートフィットネス空間を提供する新しいレンタルジムサービスを開始しました。このサービスは、パーソナライズされたトレーニング環境を求める方々向けです。",
        "当社のレンタルジム施設は、混雑したジムの気を散らすことなく、お客様が自分のペースで運動できる完全装備のプライベートルームを提供します。設備には有酸素マシン、フリーウェイト、レジスタンストレーニング機器が含まれます。",
        "サービスは柔軟な時間単位の予約システムで運営されており、トレーニング中のプライバシーを好む忙しいビジネスパーソンやフィットネス愛好家に便利です。",
        "この開始は、既存の不動産管理および飲食事業を補完する、日本でのライフスタイルサービスのTengcle Inc.の継続的な拡大を表しています。"
      ],
      zh: [
        "我们的日本子公司Tengcle Inc.推出了新的租赁健身房服务，在东京市中心提供私人健身空间。该服务面向寻求个性化锻炼环境的人群。",
        "我们的租赁健身房设施提供设备齐全的私人房间，客户可以按自己的节奏锻炼，不受拥挤健身房的干扰。设备包括有氧器械、自由重量和阻力训练设备。",
        "该服务采用灵活的按小时预订系统，方便忙碌的专业人士和喜欢在锻炼时保持隐私的健身爱好者。",
        "此次推出代表了Tengcle Inc.在日本持续扩展生活方式服务，补充我们现有的物业管理和餐饮业务。"
      ]
    }
  },
  {
    id: "4",
    slug: "manufacturer-partnership",
    date: "2024-10-25",
    category: "Partnership",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=400&fit=crop",
    title: {
      en: "Partnership with Leading Furniture Manufacturers",
      ja: "大手家具メーカーとの提携",
      zh: "与领先家具制造商建立合作伙伴关系"
    },
    excerpt: {
      en: "Tengcle Limited announces strategic partnerships with premium furniture manufacturers.",
      ja: "Tengcle Limitedは、プレミアム家具メーカーとの戦略的提携を発表しました。",
      zh: "Tengcle Limited宣布与优质家具制造商建立战略合作伙伴关系。"
    },
    content: {
      en: [
        "Tengcle Limited is pleased to announce strategic partnerships with leading furniture manufacturers in China and Southeast Asia. These partnerships strengthen our FF&E procurement capabilities for hospitality clients.",
        "Our new manufacturing partners specialize in hotel furniture, including guest room casegoods, upholstery, and custom millwork. They meet international quality standards and have experience supplying major hotel brands.",
        "These partnerships enable us to offer competitive pricing, reliable quality, and flexible customization options for our hotel development clients. We can now support projects of various scales and design requirements.",
        "As part of these partnerships, we have established quality control protocols and regular factory audits to ensure consistent product quality for all our procurement projects."
      ],
      ja: [
        "Tengcle Limitedは、中国および東南アジアの大手家具メーカーとの戦略的提携を発表いたします。これらの提携により、ホスピタリティクライアント向けのFF&E調達能力が強化されます。",
        "新しい製造パートナーは、客室ケースグッズ、張り地、カスタムミルワークを含むホテル家具を専門としています。国際的な品質基準を満たし、主要ホテルブランドへの供給実績があります。",
        "これらの提携により、ホテル開発クライアントに競争力のある価格、信頼性の高い品質、柔軟なカスタマイズオプションを提供できるようになりました。様々な規模とデザイン要件のプロジェクトをサポートできます。",
        "これらの提携の一環として、すべての調達プロジェクトで一貫した製品品質を確保するための品質管理プロトコルと定期的な工場監査を確立しました。"
      ],
      zh: [
        "Tengcle Limited很高兴宣布与中国和东南亚领先的家具制造商建立战略合作伙伴关系。这些合作伙伴关系加强了我们为酒店客户提供FF&E采购的能力。",
        "我们的新制造合作伙伴专门生产酒店家具，包括客房箱柜、软垫家具和定制木工。他们符合国际质量标准，并有为主要酒店品牌供货的经验。",
        "这些合作伙伴关系使我们能够为酒店开发客户提供有竞争力的价格、可靠的质量和灵活的定制选项。我们现在可以支持各种规模和设计要求的项目。",
        "作为这些合作伙伴关系的一部分，我们建立了质量控制协议和定期工厂审核，以确保所有采购项目的产品质量一致。"
      ]
    }
  },
  {
    id: "5",
    slug: "odoo-implementation",
    date: "2024-10-08",
    category: "IT Solutions",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    title: {
      en: "Odoo ERP Implementation for Hospitality Clients",
      ja: "ホスピタリティクライアント向けOdoo ERP導入",
      zh: "为酒店客户实施Odoo ERP"
    },
    excerpt: {
      en: "Our IT team successfully deployed customized Odoo ERP solutions for hotel chains across Asia.",
      ja: "ITチームがアジアのホテルチェーン向けにカスタマイズされたOdoo ERPソリューションを導入しました。",
      zh: "我们的IT团队成功为亚洲酒店连锁部署定制的Odoo ERP解决方案。"
    },
    content: {
      en: [
        "Our IT team has successfully deployed customized Odoo ERP solutions for three hotel chains across Asia. These implementations streamline operations and improve business efficiency for our hospitality clients.",
        "The Odoo implementations include modules for inventory management, procurement, accounting, and human resources. Each system was customized to meet the specific operational requirements of the hotel properties.",
        "Our team provided end-to-end services including system design, data migration, staff training, and ongoing technical support. The implementations were completed with minimal disruption to hotel operations.",
        "This project demonstrates Tengcle Limited's capability to deliver comprehensive IT solutions for the hospitality industry. We continue to expand our Odoo expertise to serve more clients in the region."
      ],
      ja: [
        "ITチームは、アジアの3つのホテルチェーン向けにカスタマイズされたOdoo ERPソリューションを成功裏に導入しました。これらの導入により、ホスピタリティクライアントの業務が効率化され、ビジネス効率が向上しました。",
        "Odoo導入には、在庫管理、調達、会計、人事のモジュールが含まれています。各システムは、ホテル物件の特定の運用要件を満たすようにカスタマイズされました。",
        "当社チームは、システム設計、データ移行、スタッフトレーニング、継続的な技術サポートを含むエンドツーエンドのサービスを提供しました。導入はホテル運営への影響を最小限に抑えて完了しました。",
        "このプロジェクトは、ホスピタリティ業界向けの包括的なITソリューションを提供するTengcle Limitedの能力を示しています。地域のより多くのクライアントにサービスを提供するため、Odooの専門知識を引き続き拡大しています。"
      ],
      zh: [
        "我们的IT团队成功为亚洲三家酒店连锁部署了定制的Odoo ERP解决方案。这些实施简化了运营，提高了酒店客户的业务效率。",
        "Odoo实施包括库存管理、采购、会计和人力资源模块。每个系统都经过定制，以满足酒店物业的特定运营要求。",
        "我们的团队提供端到端服务，包括系统设计、数据迁移、员工培训和持续技术支持。实施在对酒店运营影响最小的情况下完成。",
        "该项目展示了Tengcle Limited为酒店行业提供全面IT解决方案的能力。我们继续扩展Odoo专业知识，以服务该地区更多客户。"
      ]
    }
  },
  {
    id: "6",
    slug: "hong-kong-founding",
    date: "2024-01-15",
    category: "Company News",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=800&h=400&fit=crop",
    title: {
      en: "Tengcle Limited Established in Hong Kong",
      ja: "Tengcle Limited 香港にて設立",
      zh: "Tengcle Limited在香港成立"
    },
    excerpt: {
      en: "Tengcle Group establishes Hong Kong entity to serve hospitality industry across Asia.",
      ja: "Tengcle Groupがアジア全域のホスピタリティ業界にサービスを提供するため香港法人を設立しました。",
      zh: "Tengcle Group成立香港实体，服务亚洲酒店行业。"
    },
    content: {
      en: [
        "Tengcle Group is pleased to announce the establishment of Tengcle Limited in Hong Kong. This new entity will serve as our regional hub for hospitality procurement and consulting services across Asia.",
        "Tengcle Limited is a fully licensed Hong Kong company, holding a Trust or Company Service Provider (TCSP) license. We are committed to maintaining the highest standards of corporate governance and regulatory compliance.",
        "Our Hong Kong operations focus on hotel FF&E procurement, hospitality consulting, and IT solutions for the hotel industry. We leverage Hong Kong's strategic position as a gateway between Asia and the rest of the world.",
        "This establishment marks a significant expansion for Tengcle Group, building on the foundation laid by Tengcle Inc. in Japan since 2021."
      ],
      ja: [
        "Tengcle Groupは、香港にTengcle Limitedを設立したことを発表いたします。この新しい法人は、アジア全域のホスピタリティ調達およびコンサルティングサービスの地域ハブとして機能します。",
        "Tengcle Limitedは、Trust or Company Service Provider（TCSP）ライセンスを保有する完全認可の香港企業です。企業統治と規制遵守の最高基準を維持することにコミットしています。",
        "香港事業は、ホテルFF&E調達、ホスピタリティコンサルティング、ホテル業界向けITソリューションに焦点を当てています。アジアと世界をつなぐゲートウェイとしての香港の戦略的位置を活用しています。",
        "この設立は、2021年以来日本のTengcle Inc.が築いた基盤の上に構築される、Tengcle Groupの重要な拡大を示しています。"
      ],
      zh: [
        "Tengcle Group很高兴宣布在香港成立Tengcle Limited。这个新实体将作为我们在亚洲酒店采购和咨询服务的区域中心。",
        "Tengcle Limited是一家持有信托或公司服务提供者（TCSP）牌照的完全授权香港公司。我们致力于保持最高标准的公司治理和监管合规。",
        "我们的香港业务专注于酒店FF&E采购、酒店咨询和酒店行业IT解决方案。我们利用香港作为亚洲与世界其他地区之间门户的战略位置。",
        "此次成立标志着Tengcle Group的重大扩张，建立在Tengcle Inc.自2021年以来在日本奠定的基础之上。"
      ]
    }
  }
];

export default function NewsArticle() {
  const { language } = useLanguage();
  const [location] = useLocation();
  const params = useParams();
  const articleSlug = params.slug;
  
  const pathLang = location.split("/")[2] || "en";
  const basePath = `/hk/${pathLang}`;

  const article = newsArticles.find(a => a.slug === articleSlug);
  
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

  const relatedArticles = newsArticles.filter(a => a.slug !== articleSlug).slice(0, 2);

  return (
    <>
      <SEOHead
        title={`${article.title[language as keyof typeof article.title]} | Tengcle Limited`}
        description={article.excerpt[language as keyof typeof article.excerpt]}
        keywords="Tengcle Limited, News, Hong Kong, Hospitality, FF&E"
        canonical={`https://tengcle.com${basePath}/news/${articleSlug}`}
        ogType="article"
      />
      <div className="min-h-screen bg-cream">
        <Header />
        
        {/* Hero Section with Image */}
        <section className="pt-20">
          <div className="relative h-64 md:h-80 lg:h-96">
            <img 
              src={article.image} 
              alt={article.title[language as keyof typeof article.title]}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
              <div className="container max-w-4xl">
                {/* Back Link */}
                <Link href={`${basePath}/news`}>
                  <span className={`inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors ${getFontClass()}`}>
                    <ArrowLeft className="w-4 h-4" />
                    {backToNews}
                  </span>
                </Link>
                
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-sm text-white/70">
                    <Calendar className="w-4 h-4" />
                    {article.date}
                  </span>
                  <span className="px-2 py-0.5 bg-gold/20 text-gold text-xs rounded-full">
                    {article.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-white/70">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </span>
                </div>
                
                {/* Title */}
                <h1 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-white ${getFontClass()}`}>
                  {article.title[language as keyof typeof article.title]}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
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
                <Link key={related.slug} href={`${basePath}/news/${related.slug}`}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer h-full">
                    <img 
                      src={related.image} 
                      alt={related.title[language as keyof typeof related.title]}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-6">
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
