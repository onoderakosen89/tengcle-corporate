/**
 * Services Page - Clean White Professional Design
 * 
 * 5 Service Categories with high-quality generated images:
 * 1. Hospitality Procurement
 * 2. Project Integration
 * 3. Hotel Operations & IT
 * 4. IP & Character Goods
 * 5. Trading & Wholesale
 */

import { useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, useInView, type Variants, type Easing } from "framer-motion";
import { ArrowRight, Package, Building2, Cpu, Palette, TrendingUp, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const easeOut: Easing = [0.16, 1, 0.3, 1];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: easeOut } 
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Services() {
  const { t, language } = useLanguage();
  const [location] = useLocation();
  const pathLang = location.split("/")[2] || "en";
  const basePath = `/hk/${pathLang}`;
  
  // Get body font class based on language
  const getFontClass = () => {
    if (language === "ja") return "font-jp";
    if (language === "zh") return "font-zh";
    return "font-body";
  };

  // Get heading font class based on language
  const getHeadingFontClass = () => {
    if (language === "ja") return "font-jp";
    if (language === "zh") return "font-zh";
    return "font-heading";
  };

  const services = [
    {
      icon: Package,
      title: t.services.hospitality.title,
      description: t.services.hospitality.description,
      image: "/images/service-hospitality.jpg",
      features: language === "ja" ? [
        "FF&E（家具・什器・設備）調達",
        "OS&E（運営備品）調達",
        "建設資材の国際調達",
        "品質検査・管理",
      ] : language === "zh" ? [
        "FF&E（家具、固定装置、设备）采购",
        "OS&E（运营用品）采购",
        "建筑材料国际采购",
        "质量检验与管理",
      ] : [
        "FF&E (Furniture, Fixtures, Equipment) procurement",
        "OS&E (Operating Supplies & Equipment) sourcing",
        "International construction materials procurement",
        "Quality inspection and management",
      ],
    },
    {
      icon: Building2,
      title: t.services.integration.title,
      description: t.services.integration.description,
      image: "/images/service-integration.jpg",
      features: language === "ja" ? [
        "エンドツーエンドプロジェクト管理",
        "サプライチェーン最適化",
        "品質管理・検査",
        "納期管理・物流調整",
      ] : language === "zh" ? [
        "端到端项目管理",
        "供应链优化",
        "质量控制与检验",
        "交付管理与物流协调",
      ] : [
        "End-to-end project management",
        "Supply chain optimization",
        "Quality control and inspection",
        "Delivery management and logistics coordination",
      ],
    },
    {
      icon: Cpu,
      title: t.services.operations.title,
      description: t.services.operations.description,
      image: "/images/service-it.jpg",
      features: language === "ja" ? [
        "Odoo ERP導入・カスタマイズ",
        "API開発・システム連携",
        "レベニューマネジメント・価格設定",
        "オペレーション監視・マーケティング",
      ] : language === "zh" ? [
        "Odoo ERP实施与定制",
        "API开发与系统集成",
        "收益管理与定价",
        "运营监控与营销",
      ] : [
        "Odoo ERP implementation and customization",
        "API development and system integration",
        "Revenue management and pricing",
        "Operations monitoring and marketing",
      ],
    },
    {
      icon: Palette,
      title: t.services.ip.title,
      description: t.services.ip.description,
      image: "/images/service-character-new.jpg",
      features: language === "ja" ? [
        "キャラクターグッズ企画・開発",
        "製造発注・品質検査",
        "在庫管理・販売",
        "IP権利管理",
      ] : language === "zh" ? [
        "角色商品策划与开发",
        "制造订单与质量检验",
        "库存管理与销售",
        "IP权利管理",
      ] : [
        "Character merchandise planning and development",
        "Manufacturing orders and quality inspection",
        "Inventory management and sales",
        "IP rights management",
      ],
    },
    {
      icon: TrendingUp,
      title: t.services.trading.title,
      description: t.services.trading.description,
      image: "/images/service-trading.jpg",
      features: language === "ja" ? [
        "国際貿易（輸出入）",
        "建設会社向け資材卸売",
        "グローバルサプライヤーネットワーク",
        "通関・物流サポート",
      ] : language === "zh" ? [
        "国际贸易（进出口）",
        "建筑公司材料批发",
        "全球供应商网络",
        "清关与物流支持",
      ] : [
        "International trade (import/export)",
        "Construction materials wholesale",
        "Global supplier network",
        "Customs and logistics support",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white" data-region="hk">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-light-gray">
        <div className="container">
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="max-w-3xl">
              <p className={`text-gold-dark text-sm tracking-[0.3em] uppercase mb-4 ${getFontClass()}`}>
                {t.services.subtitle}
              </p>
              <h1 className={`${getHeadingFontClass()} text-4xl md:text-5xl lg:text-6xl text-navy mb-6`}>
                {t.services.title}
              </h1>
              <p className={`text-slate text-lg leading-relaxed ${getFontClass()}`}>
                {t.services.description}
              </p>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="space-y-24">
            {services.map((service, index) => (
              <AnimatedSection key={service.title}>
                <motion.div
                  variants={fadeInUp}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <service.icon className="h-12 w-12 text-gold mb-6" />
                    <h2 className={`${getHeadingFontClass()} text-3xl text-navy mb-4`}>
                      {service.title}
                    </h2>
                    <p className={`text-slate leading-relaxed mb-8 ${getFontClass()}`}>
                      {service.description}
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                          <span className={`text-charcoal ${getFontClass()}`}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Image */}
                  <div className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="relative overflow-hidden shadow-xl">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full aspect-[4/3] object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
                    </div>

                  </div>
                </motion.div>
                
                {index < services.length - 1 && (
                  <div className="section-divider mt-20" />
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-navy">
        <div className="container">
          <AnimatedSection className="text-center">
            <motion.div variants={fadeInUp}>
              <h2 className={`${getHeadingFontClass()} text-4xl text-white mb-6`}>
                {t.contact.title}
              </h2>
              <p className={`text-white/70 max-w-xl mx-auto mb-10 ${getFontClass()}`}>
                {t.contact.description}
              </p>
              <Link href={`${basePath}/contact`}>
                <Button className={`bg-gold hover:bg-gold-dark text-navy px-10 py-6 text-sm tracking-wider ${getFontClass()}`}>
                  {t.common.getInTouch}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
