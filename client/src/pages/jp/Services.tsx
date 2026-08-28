/**
 * Services Page - Detailed Service Information
 * 
 * Design Philosophy:
 * - Clean white base with Navy & Gold accents
 * - Each service with dedicated section
 * - Multi-language support (JA/EN/ZH)
 */

import { useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, useInView, type Variants, type Easing } from "framer-motion";
import { ArrowRight, Building2, Utensils, Dumbbell, BedDouble, CheckCircle2 } from "lucide-react";
import Header from "@/components/jp/Header";
import Footer from "@/components/jp/Footer";
import { Button } from "@/components/ui/button";
import { useJpLanguage } from "@/contexts/JpLanguageContext";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead, { generateBreadcrumbSchema } from "@/components/SEOHead";

const easeOut: Easing = [0.16, 1, 0.3, 1];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut }
  },
};



export default function Services() {
  const { t, language } = useJpLanguage();
  const [location] = useLocation();
  const pathLang = location.split("/")[2] || "ja";
  const basePath = `/jp/${pathLang}`;

  const getFontClass = () => {
    if (language === "ja") return "font-jp";
    if (language === "zh") return "font-zh";
    return "font-body";
  };

  const getHeadingFontClass = () => {
    if (language === "ja") return "font-jp";
    if (language === "zh") return "font-zh";
    return "font-heading";
  };

  const services = [
    {
      icon: Building2,
      title: t.services.realEstate.title,
      description: t.services.realEstate.description,
      image: "/images/candidates/jp-property-management.webp",
      href: `${basePath}/services/property-management`,
      ctaLabel: language === "ja"
        ? "不動産管理の詳細"
        : language === "zh"
          ? "查看物业管理详情"
          : "Explore Property Management",
      features: language === "ja"
        ? ["家賃回収・入金確認", "修繕の手配・進行確認", "テナント対応", "賃貸物件の管理・運営"]
        : language === "zh"
          ? ["租赁物业管理运营", "租户对应・投诉处理", "收益最大化建议", "定期维护"]
          : ["Rental property management", "Tenant support & complaint handling", "Revenue maximization proposals", "Regular maintenance"],
    },
    {
      icon: Utensils,
      title: t.services.restaurant.title,
      description: t.services.restaurant.description,
      image: "/images/candidates/jp-restaurant.webp",
      features: language === "ja"
        ? ["レストラン・カフェの企画・運営", "店舗開発・内装設計", "メニュー開発", "スタッフ教育・研修"]
        : language === "zh"
          ? ["餐厅咖啡馆策划运营", "店铺开发・室内设计", "菜单开发", "员工教育培训"]
          : ["Restaurant & cafe planning", "Store development & interior design", "Menu development", "Staff training & education"],
    },
    {
      icon: Dumbbell,
      title: t.services.gym.title,
      description: t.services.gym.description,
      image: "/images/candidates/jp-gym.webp",
      features: language === "ja"
        ? ["プライベートジムスペース", "最新トレーニング機器", "清潔な環境", "柔軟な予約システム"]
        : language === "zh"
          ? ["私人健身空间", "最新训练设备", "清洁环境", "灵活预约系统"]
          : ["Private gym space", "Latest training equipment", "Clean environment", "Flexible booking system"],
    },
    {
      icon: BedDouble,
      title: t.services.capsuleHotel.title,
      description: t.services.capsuleHotel.description,
      image: "/images/candidates/jp-capsule-accommodation.webp",
      features: language === "ja"
        ? ["快適な客室設計", "快適な睡眠環境", "充実のアメニティ", "利用しやすい料金"]
        : language === "zh"
          ? ["新一代胶囊设计", "舒适睡眠环境", "充实的设施", "实惠的价格"]
          : ["Next-gen capsule design", "Comfortable sleep environment", "Full amenities", "Affordable pricing"],
    },
  ];

  return (
    <div className="min-h-screen bg-white" data-region="jp">
      <SEOHead
        title={language === "ja" ? "事業紹介 | 株式会社Tengcle 東京の不動産管理" : language === "zh" ? "业务介绍 | 株式会社Tengcle 东京的房地产管理" : "Services | 株式会社Tengcle Tokyo Property Management"}
        description={language === "ja" ? "株式会社Tengcleの不動産管理、飲食、ウェルネス、宿泊における事業実績をご紹介します。" : language === "zh" ? "介绍株式会社Tengcle在房地产管理、餐饮、健康休闲和住宿领域的业务实绩。" : "Explore 株式会社Tengcle's operating experience in property management, food and beverage, wellness, and accommodation."}
        keywords={language === "ja" ? "株式会社Tengcle, 事業紹介, 不動産管理, 家賃回収, 修繕手配" : language === "zh" ? "株式会社Tengcle, 业务介绍, 房地产管理, 租金回收, 维修协调" : "株式会社Tengcle, services, property management, rent collection, repair coordination"}
        locale={language === "ja" ? "ja_JP" : language === "zh" ? "zh_CN" : "en_JP"}
        ogImage="/images/og-image.webp"
        canonical={`https://www.tengcle.com/jp/${language}/services`}
      />
      <Header />
      <main id="main-content" tabIndex={-1}>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-light-gray">
        <div className="container">
          <AnimatedSection className="text-center">
            <motion.p
              variants={fadeInUp}
              className={`text-gold-dark text-sm tracking-[0.3em] uppercase mb-4 ${getFontClass()}`}
            >
              {t.services.subtitle}
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className={`${getHeadingFontClass()} text-4xl md:text-5xl text-navy mb-6`}
            >
              {t.services.title}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-slate max-w-2xl mx-auto ${getFontClass()}`}
            >
              {t.services.description}
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Detail */}
      {services.map((service, index) => (
        <section
          key={service.title}
          className={`py-20 lg:py-28 ${index % 2 === 0 ? 'bg-white' : 'bg-light-gray'}`}
        >
          <div className="container">
            <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
              {/* Image */}
              <AnimatedSection className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <motion.div
                  variants={fadeInUp}
                  className="relative overflow-hidden rounded-lg shadow-lg"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-80 lg:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
                </motion.div>
              </AnimatedSection>

              {/* Content */}
              <AnimatedSection>
                <motion.div variants={fadeInUp}>
                  <service.icon className="h-12 w-12 text-gold mb-6" />
                  <h2 className={`${getHeadingFontClass()} text-3xl md:text-4xl text-navy mb-6`}>
                    {service.title}
                  </h2>
                  <p className={`text-slate leading-relaxed mb-8 ${getFontClass()}`}>
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className={`flex items-center gap-3 text-charcoal ${getFontClass()}`}>
                        <CheckCircle2 className="h-5 w-5 text-gold flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className={`bg-navy hover:bg-navy-light text-white px-6 py-5 text-sm tracking-wider ${getFontClass()}`}>
                    <Link href={service.href ?? `${basePath}/contact`}>
                      {service.ctaLabel ?? t.common.getInTouch}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-navy">
        <div className="container">
          <AnimatedSection className="text-center">
            <motion.div variants={fadeInUp}>
              <h2 className={`${getHeadingFontClass()} text-3xl md:text-4xl text-white mb-6`}>
                {t.contact.title}
              </h2>
              <p className={`text-gray-300 max-w-2xl mx-auto mb-10 ${getFontClass()}`}>
                {t.contact.description}
              </p>
              <Button asChild className={`bg-gold hover:bg-gold-dark text-navy px-8 py-6 text-sm tracking-wider font-medium ${getFontClass()}`}>
                <Link href={`${basePath}/contact`}>
                  {t.common.getInTouch}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
