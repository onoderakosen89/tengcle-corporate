/**
 * News Article Detail Page - Hong Kong Site
 * 
 * Design: Clean article layout with related articles
 * Features: Individual news article display based on actual company milestones
 */

import { Link, useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Clock, Building2, Hotel, Settings, Rocket } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface NewsArticle {
  id: string;
  slug: string;
  date: string;
  category: {
    en: string;
    ja: string;
    zh: string;
  };
  readTime: {
    en: string;
    ja: string;
    zh: string;
  };
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
  image: string;
}

// Actual company milestones - Hong Kong
const newsArticles: NewsArticle[] = [
  {
    id: "first-ffe-project-2026",
    slug: "first-ffe-project-2026",
    date: "2025-12-15",
    category: {
      en: "Project Announcement",
      ja: "プロジェクト発表",
      zh: "项目公告"
    },
    readTime: {
      en: "3 min",
      ja: "3分",
      zh: "3分钟"
    },
    title: {
      en: "First FF&E Project Scheduled for February 2026",
      ja: "初のFF&Eプロジェクト、2026年2月に実施予定",
      zh: "首个FF&E项目定于2026年2月实施"
    },
    excerpt: {
      en: "Tengcle Limited announces its first hotel FF&E procurement project, scheduled for delivery in February 2026.",
      ja: "Tengcle Limitedは、2026年2月に納品予定の初のホテルFF&E調達プロジェクトを発表しました。",
      zh: "Tengcle Limited宣布首个酒店FF&E采购项目，计划于2026年2月交付。"
    },
    content: {
      en: [
        "Tengcle Limited is proud to announce our first hotel FF&E (Furniture, Fixtures & Equipment) procurement project, scheduled for delivery in February 2026. This marks a significant milestone in our hospitality services expansion.",
        "Since identifying FF&E procurement as a key growth opportunity in June 2025, our team has been building relationships with premium furniture manufacturers across Asia. This first project represents the culmination of months of preparation and planning.",
        "Our FF&E services encompass complete procurement solutions including furniture selection, fixture coordination, equipment sourcing, logistics management, and on-site installation supervision. We work closely with hotel developers and operators to ensure every detail meets their specifications.",
        "This project demonstrates Tengcle Limited's commitment to becoming a trusted partner in the hospitality industry, leveraging our regional expertise and global network to deliver exceptional results."
      ],
      ja: [
        "Tengcle Limitedは、2026年2月に納品予定の初のホテルFF&E（家具・什器・備品）調達プロジェクトを発表いたします。これはホスピタリティサービス拡大における重要なマイルストーンです。",
        "2025年6月にFF&E調達を重要な成長機会として特定して以来、当社チームはアジア全域のプレミアム家具メーカーとの関係構築に取り組んできました。この最初のプロジェクトは、数ヶ月にわたる準備と計画の集大成です。",
        "当社のFF&Eサービスは、家具選定、什器調整、設備調達、物流管理、現場設置監督を含む完全な調達ソリューションを提供します。ホテル開発者やオペレーターと緊密に連携し、すべての詳細が仕様を満たすよう努めています。",
        "このプロジェクトは、地域の専門知識とグローバルネットワークを活用して優れた結果を提供する、ホスピタリティ業界の信頼できるパートナーになるというTengcle Limitedのコミットメントを示しています。"
      ],
      zh: [
        "Tengcle Limited很荣幸地宣布我们的首个酒店FF&E（家具、固定装置和设备）采购项目，计划于2026年2月交付。这标志着我们在酒店服务扩展方面的重要里程碑。",
        "自2025年6月确定FF&E采购为关键增长机会以来，我们的团队一直在与亚洲各地的优质家具制造商建立关系。这个首个项目代表了数月准备和规划的成果。",
        "我们的FF&E服务涵盖完整的采购解决方案，包括家具选择、固定装置协调、设备采购、物流管理和现场安装监督。我们与酒店开发商和运营商紧密合作，确保每个细节都符合他们的规格。",
        "该项目展示了Tengcle Limited致力于成为酒店行业值得信赖的合作伙伴的承诺，利用我们的区域专业知识和全球网络提供卓越的成果。"
      ]
    },
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop"
  },
  {
    id: "odoo-erp-launch",
    slug: "odoo-erp-launch",
    date: "2025-10-01",
    category: {
      en: "Service Launch",
      ja: "サービス開始",
      zh: "服务启动"
    },
    readTime: {
      en: "3 min",
      ja: "3分",
      zh: "3分钟"
    },
    title: {
      en: "Odoo ERP Implementation Services Launched",
      ja: "Odoo ERP導入サービスを開始",
      zh: "Odoo ERP实施服务正式启动"
    },
    excerpt: {
      en: "Starting October 2025, Tengcle Limited now offers Odoo ERP implementation and customization services.",
      ja: "2025年10月より、Tengcle LimitedはOdoo ERP導入・カスタマイズサービスを提供開始しました。",
      zh: "自2025年10月起，Tengcle Limited提供Odoo ERP实施和定制服务。"
    },
    content: {
      en: [
        "Tengcle Limited is excited to announce the launch of our Odoo ERP implementation services, starting October 2025. This expansion into IT solutions reflects our commitment to providing comprehensive business support to our clients.",
        "Odoo is a powerful open-source ERP platform that offers integrated solutions for inventory management, accounting, CRM, project management, and more. Our team provides end-to-end implementation services tailored to each client's specific needs.",
        "Our Odoo services include initial consultation and needs assessment, system configuration and customization, data migration from existing systems, staff training and documentation, and ongoing support and maintenance.",
        "By adding Odoo ERP services to our portfolio, Tengcle Limited can now offer clients a complete business solution package, from hotel operations to digital transformation."
      ],
      ja: [
        "Tengcle Limitedは、2025年10月よりOdoo ERP導入サービスを開始いたします。ITソリューションへの拡大は、クライアントへの包括的なビジネスサポート提供へのコミットメントを反映しています。",
        "Odooは、在庫管理、会計、CRM、プロジェクト管理などの統合ソリューションを提供する強力なオープンソースERPプラットフォームです。当社チームは、各クライアントの特定のニーズに合わせたエンドツーエンドの導入サービスを提供します。",
        "当社のOdooサービスには、初期コンサルティングとニーズ評価、システム構成とカスタマイズ、既存システムからのデータ移行、スタッフトレーニングとドキュメント作成、継続的なサポートとメンテナンスが含まれます。",
        "Odoo ERPサービスをポートフォリオに追加することで、Tengcle Limitedはホテル運営からデジタルトランスフォーメーションまで、クライアントに完全なビジネスソリューションパッケージを提供できるようになりました。"
      ],
      zh: [
        "Tengcle Limited很高兴宣布从2025年10月起推出Odoo ERP实施服务。向IT解决方案的扩展反映了我们为客户提供全面业务支持的承诺。",
        "Odoo是一个强大的开源ERP平台，提供库存管理、会计、CRM、项目管理等集成解决方案。我们的团队提供根据每个客户特定需求量身定制的端到端实施服务。",
        "我们的Odoo服务包括初步咨询和需求评估、系统配置和定制、从现有系统迁移数据、员工培训和文档编制，以及持续的支持和维护。",
        "通过将Odoo ERP服务添加到我们的产品组合中，Tengcle Limited现在可以为客户提供从酒店运营到数字化转型的完整业务解决方案包。"
      ]
    },
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop"
  },
  {
    id: "expansion-preparation",
    slug: "expansion-preparation",
    date: "2025-06-01",
    category: {
      en: "Company News",
      ja: "会社ニュース",
      zh: "公司新闻"
    },
    readTime: {
      en: "2 min",
      ja: "2分",
      zh: "2分钟"
    },
    title: {
      en: "Business Expansion Preparation Begins",
      ja: "事業拡大に向けた準備を開始",
      zh: "开始业务扩展准备工作"
    },
    excerpt: {
      en: "Tengcle Limited begins preparations for business expansion, identifying FF&E procurement as a key growth opportunity.",
      ja: "Tengcle Limitedは事業拡大の準備を開始し、FF&E調達事業を重要な成長機会として特定しました。",
      zh: "Tengcle Limited开始业务扩展准备，确定FF&E采购为关键增长机会。"
    },
    content: {
      en: [
        "In June 2025, Tengcle Limited began intensive preparations for business expansion, marking a pivotal moment in our company's growth trajectory.",
        "Through market research and industry analysis, we identified hotel FF&E (Furniture, Fixtures & Equipment) procurement as a significant opportunity in the Asian hospitality market. The region's growing tourism industry and increasing hotel development create strong demand for quality FF&E services.",
        "Our expansion preparation includes building relationships with furniture manufacturers, developing procurement processes, establishing quality control standards, and training our team in hospitality industry requirements.",
        "This strategic decision positions Tengcle Limited to become a comprehensive hospitality solutions provider, complementing our existing hotel operations business."
      ],
      ja: [
        "2025年6月、Tengcle Limitedは事業拡大に向けた集中的な準備を開始しました。これは当社の成長軌道における重要な転換点です。",
        "市場調査と業界分析を通じて、ホテルFF&E（家具・什器・備品）調達をアジアのホスピタリティ市場における重要な機会として特定しました。この地域の成長する観光産業とホテル開発の増加は、質の高いFF&Eサービスへの強い需要を生み出しています。",
        "当社の拡大準備には、家具メーカーとの関係構築、調達プロセスの開発、品質管理基準の確立、ホスピタリティ業界の要件に関するチームトレーニングが含まれます。",
        "この戦略的決定により、Tengcle Limitedは既存のホテル運営事業を補完する包括的なホスピタリティソリューションプロバイダーとしての地位を確立します。"
      ],
      zh: [
        "2025年6月，Tengcle Limited开始密集准备业务扩展，标志着公司增长轨迹中的关键时刻。",
        "通过市场研究和行业分析，我们确定酒店FF&E（家具、固定装置和设备）采购为亚洲酒店市场的重要机会。该地区不断增长的旅游业和日益增加的酒店开发为优质FF&E服务创造了强劲需求。",
        "我们的扩展准备包括与家具制造商建立关系、开发采购流程、建立质量控制标准，以及培训我们的团队了解酒店行业要求。",
        "这一战略决策使Tengcle Limited能够成为全面的酒店解决方案提供商，补充我们现有的酒店运营业务。"
      ]
    },
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop"
  },
  {
    id: "hotel-operations-launch",
    slug: "hotel-operations-launch",
    date: "2025-05-01",
    category: {
      en: "Business Launch",
      ja: "事業開始",
      zh: "业务启动"
    },
    readTime: {
      en: "3 min",
      ja: "3分",
      zh: "3分钟"
    },
    title: {
      en: "Hotel Operations Business Commences",
      ja: "ホテル運営事業を開始",
      zh: "酒店运营业务正式启动"
    },
    excerpt: {
      en: "Shortly after establishment, Tengcle Limited launches hotel operations business.",
      ja: "設立直後、Tengcle Limitedはホテル運営事業を開始しました。",
      zh: "成立后不久，Tengcle Limited启动酒店运营业务。"
    },
    content: {
      en: [
        "Shortly after our establishment in April 2025, Tengcle Limited launched our hotel operations business, providing management and operational support for hospitality properties in the region.",
        "Our hotel operations services leverage the extensive experience of Tengcle Group, particularly the hospitality expertise developed through our Japan office's hotel and accommodation businesses.",
        "We offer comprehensive hotel management services including daily operations oversight, staff training and management, revenue optimization, guest experience enhancement, and quality assurance programs.",
        "By starting with hotel operations, Tengcle Limited established a strong foundation in the hospitality industry, building relationships and expertise that would later support our expansion into FF&E procurement."
      ],
      ja: [
        "2025年1月の設立直後、Tengcle Limitedはホテル運営事業を開始し、地域のホスピタリティ施設に管理・運営サポートを提供しています。",
        "当社のホテル運営サービスは、Tengcle Groupの豊富な経験、特に日本法人のホテル・宿泊事業を通じて培われたホスピタリティの専門知識を活用しています。",
        "日常業務の監督、スタッフトレーニングと管理、収益最適化、ゲスト体験の向上、品質保証プログラムを含む包括的なホテル管理サービスを提供しています。",
        "ホテル運営から始めることで、Tengcle Limitedはホスピタリティ業界で強固な基盤を確立し、後のFF&E調達への拡大を支える関係性と専門知識を構築しました。"
      ],
      zh: [
        "在2025年4月成立后不久，Tengcle Limited启动了酒店运营业务为该地区的酒店物业提供管理和运营支持。",
        "我们的酒店运营服务利用Tengcle Group的丰富经验，特别是通过我们日本办事处的酒店和住宿业务发展起来的酒店专业知识。",
        "我们提供全面的酒店管理服务，包括日常运营监督、员工培训和管理、收入优化、宾客体验提升和质量保证计划。",
        "从酒店运营开始，Tengcle Limited在酒店行业建立了坚实的基础，建立了关系和专业知识，这些后来支持了我们向FF&E采购的扩展。"
      ]
    },
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&h=600&fit=crop"
  },
  {
    id: "hk-founding",
    slug: "hk-founding",
    date: "2025-04-15",
    category: {
      en: "Company Founding",
      ja: "会社設立",
      zh: "公司成立"
    },
    readTime: {
      en: "4 min",
      ja: "4分",
      zh: "4分钟"
    },
    title: {
      en: "Tengcle Limited Established in Hong Kong",
      ja: "Tengcle Limited 香港で設立",
      zh: "Tengcle Limited在香港成立"
    },
    excerpt: {
      en: "Tengcle Limited is officially established in Hong Kong as the global headquarters for Tengcle Group, which was founded in Japan in 2021.",
      ja: "2021年に日本で創業したTengcle Groupのグローバル本社として、Tengcle Limitedが香港で正式に設立されました。",
      zh: "Tengcle Limited作为2021年在日本创立的Tengcle Group的全球总部，在香港正式成立。"
    },
    content: {
      en: [
        "In April 2025, Tengcle Limited was officially established in Hong Kong as the global headquarters for Tengcle Group.",
        "Tengcle Group was originally founded in Japan in October 2021. As the company expanded into Southeast Asian projects, the decision was made to relocate the headquarters to Hong Kong to better serve the growing Asian market.",
        "Hong Kong was chosen due to its strategic position as a gateway to Asia, world-class business infrastructure, and strong connections to both mainland China and international markets.",
        "Tengcle Limited focuses on hotel FF&E procurement and IT solutions, complementing the services offered by our founding company in Japan and our US office. Together, the three entities form a comprehensive global network."
      ],
      ja: [
        "2025年4月、Tengcle LimitedはTengcle Groupのグローバル本社として香港で正式に設立されました。",
        "Tengcle Groupは2021年10月に日本で創業しました。東南アジアのプロジェクト拡大に伴い、アジア市場へのサービス向上のため本社を香港に移転しました。",
        "香港は、アジアへのゲートウェイとしての戦略的位置、世界クラスのビジネスインフラ、中国本土と国際市場の両方への強いつながりから選ばれました。",
        "Tengcle LimitedはホテルFF&E調達とITソリューションに注力し、日本の創業会社とアメリカのオフィスが提供するサービスを補完しています。3つの法人が一体となって包括的なグローバルネットワークを形成しています。"
      ],
      zh: [
        "2025年4月，Tengcle Limited作为Tengcle Group的全球总部在香港正式成立。",
        "Tengcle Group于2021年10月在日本创立。随着东南亚项目的扩展，为了更好地服务于不断增长的亚洲市场，我们决定将总部迁至香港。",
        "香港因其作为亚洲门户的战略位置、世界级的商业基础设施以及与中国大陆和国际市场的紧密联系而被选中。",
        "Tengcle Limited专注于酒店FF&E采购和IT解决方案，补充我们在日本的创业公司和美国办事处提供的服务。三个实体共同形成一个全面的全球网络。"
      ]
    },
    image: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=1200&h=600&fit=crop"
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
  
  const fontClass = pathLang === "ja" ? "font-jp" : pathLang === "zh" ? "font-zh" : "";

  const translations = {
    en: {
      backToNews: "Back to News",
      relatedArticles: "Related Articles",
      articleNotFound: "Article not found"
    },
    ja: {
      backToNews: "ニュース一覧に戻る",
      relatedArticles: "関連記事",
      articleNotFound: "記事が見つかりません"
    },
    zh: {
      backToNews: "返回新闻列表",
      relatedArticles: "相关文章",
      articleNotFound: "文章未找到"
    }
  };

  const text = translations[pathLang as keyof typeof translations] || translations.en;

  if (!article) {
    return (
      <>
        <SEOHead
          title="Article Not Found | Tengcle Limited"
          description="The requested article could not be found."
          canonical={`https://tengcle.com${basePath}/news`}
        />
        <div className="min-h-screen bg-cream">
          <Header />
          <div className="container py-32 text-center">
            <h1 className="text-3xl font-heading text-charcoal mb-4">{text.articleNotFound}</h1>
            <Link href={`${basePath}/news`}>
              <Button className="bg-purple hover:bg-purple-dark text-white">
                {text.backToNews}
              </Button>
            </Link>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  const title = article.title[pathLang as keyof typeof article.title] || article.title.en;
  const excerpt = article.excerpt[pathLang as keyof typeof article.excerpt] || article.excerpt.en;
  const content = article.content[pathLang as keyof typeof article.content] || article.content.en;
  const category = article.category[pathLang as keyof typeof article.category] || article.category.en;
  const readTime = article.readTime[pathLang as keyof typeof article.readTime] || article.readTime.en;

  // Get related articles (exclude current)
  const relatedArticles = newsArticles.filter(a => a.slug !== articleSlug).slice(0, 2);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (pathLang === "ja") {
      return date.toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" });
    } else if (pathLang === "zh") {
      return date.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });
    }
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <>
      <SEOHead
        title={`${title} | Tengcle Limited`}
        description={excerpt}
        canonical={`https://tengcle.com${basePath}/news/${article.slug}`}
        keywords="Tengcle news, hotel FF&E, hospitality projects, company updates"
      />
      <div className="min-h-screen bg-cream">
        <Header />
        
        {/* Hero Section */}
        <section 
          className="relative pt-24 pb-16 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(88, 28, 135, 0.85), rgba(88, 28, 135, 0.9)), url(${article.image})` }}
        >
          <div className="container relative z-10">
            <Link href={`${basePath}/news`}>
              <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {text.backToNews}
              </Button>
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center gap-1 text-white/80 text-sm">
                  <Calendar className="h-4 w-4" />
                  {formatDate(article.date)}
                </span>
                <span className="flex items-center gap-1 text-white/80 text-sm">
                  <Clock className="h-4 w-4" />
                  {readTime}
                </span>
                <span className="px-3 py-1 bg-gold/20 text-gold text-xs font-medium">
                  {category}
                </span>
              </div>
              <h1 className={`text-3xl md:text-4xl lg:text-5xl font-heading text-white max-w-4xl ${fontClass}`}>
                {title}
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white p-8 md:p-12 shadow-sm"
              >
                {content.map((paragraph, index) => (
                  <p key={index} className={`text-charcoal/80 leading-relaxed mb-6 last:mb-0 ${fontClass}`}>
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container">
              <h2 className={`text-2xl font-heading text-charcoal mb-8 ${fontClass}`}>
                {text.relatedArticles}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {relatedArticles.map((related) => {
                  const relatedTitle = related.title[pathLang as keyof typeof related.title] || related.title.en;
                  const relatedExcerpt = related.excerpt[pathLang as keyof typeof related.excerpt] || related.excerpt.en;
                  
                  return (
                    <Link key={related.id} href={`${basePath}/news/${related.slug}`}>
                      <motion.article
                        whileHover={{ y: -5 }}
                        className="group bg-cream p-6 border border-gray-100 hover:shadow-md transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-2 text-slate text-sm mb-3">
                          <Calendar className="h-4 w-4" />
                          {formatDate(related.date)}
                        </div>
                        <h3 className={`text-lg font-heading text-charcoal mb-2 group-hover:text-purple transition-colors ${fontClass}`}>
                          {relatedTitle}
                        </h3>
                        <p className={`text-slate text-sm line-clamp-2 ${fontClass}`}>
                          {relatedExcerpt}
                        </p>
                      </motion.article>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
}
