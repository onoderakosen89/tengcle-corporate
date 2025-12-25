/**
 * Home Page - Japanese Zen Luxury Design
 * 
 * Design Philosophy:
 * - Ma (間): Strategic whitespace for elegance
 * - Hero with Hong Kong skyline for global presence
 * - Trust indicators prominently displayed
 * - Japanese quality standards emphasized
 * - Multi-language support (EN/JP)
 */

import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, type Variants, type Easing } from "framer-motion";
import { ArrowRight, Building2, Globe, Shield, Award, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

// Animation variants with proper typing
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

export default function Home() {
  const { t, language } = useLanguage();
  const isJa = language === "ja";

  return (
    <div className="min-h-screen bg-sumi">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-global-network.jpg"
            alt="Hong Kong Victoria Harbour"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sumi/95 via-sumi/70 to-sumi/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-sumi via-transparent to-transparent" />
        </div>
        
        {/* Content */}
        <div className="container relative z-10 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-3xl"
          >
            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className={`text-kincha text-sm tracking-[0.3em] uppercase mb-6 ${isJa ? "font-jp" : ""}`}
            >
              {t.hero.tagline}
            </motion.p>
            
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className={`font-display text-5xl md:text-6xl lg:text-7xl text-washi leading-tight mb-8 ${isJa ? "font-jp-serif" : ""}`}
            >
              {t.hero.headline1}
              <br />
              <span className="text-gradient-gold">{t.hero.headline2}</span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className={`text-stone text-lg md:text-xl leading-relaxed mb-10 max-w-xl ${isJa ? "font-jp" : ""}`}
            >
              {t.hero.subtitle}
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/portfolio">
                <Button className={`bg-kincha hover:bg-kincha-light text-sumi px-8 py-6 text-sm tracking-wider ${isJa ? "font-jp" : ""}`}>
                  {t.hero.cta1}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className={`border-washi/30 text-washi hover:bg-washi/10 px-8 py-6 text-sm tracking-wider ${isJa ? "font-jp" : ""}`}>
                  {t.hero.cta2}
                </Button>
              </Link>
            </motion.div>
            
            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-16 flex flex-wrap gap-8"
            >
              <div className={`flex items-center gap-2 text-stone/80 text-sm ${isJa ? "font-jp" : ""}`}>
                <Shield className="h-4 w-4 text-kincha" />
                <span>{t.hero.trust1}</span>
              </div>
              <div className={`flex items-center gap-2 text-stone/80 text-sm ${isJa ? "font-jp" : ""}`}>
                <Building2 className="h-4 w-4 text-kincha" />
                <span>{t.hero.trust2}</span>
              </div>
              <div className={`flex items-center gap-2 text-stone/80 text-sm ${isJa ? "font-jp" : ""}`}>
                <Globe className="h-4 w-4 text-kincha" />
                <span>{t.hero.trust3}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-16 bg-gradient-to-b from-kincha to-transparent" />
        </motion.div>
      </section>

      {/* Services Overview */}
      <section className="py-24 lg:py-32 bg-sumi">
        <div className="container">
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <p className={`text-kincha text-sm tracking-[0.3em] uppercase mb-4 ${isJa ? "font-jp" : ""}`}>
                {t.services.subtitle}
              </p>
              <h2 className={`font-display text-4xl md:text-5xl text-washi mb-6 ${isJa ? "font-jp-serif" : ""}`}>
                {t.services.title}
              </h2>
              <p className={`text-stone max-w-2xl mx-auto ${isJa ? "font-jp" : ""}`}>
                {t.services.description}
              </p>
            </motion.div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: t.services.sourcing.title,
                titleJp: "グローバル調達",
                description: t.services.sourcing.description,
                image: "/images/services-sourcing.jpg",
              },
              {
                icon: Building2,
                title: t.services.integration.title,
                titleJp: "プロジェクト統合",
                description: t.services.integration.description,
                image: "/images/services-integration.jpg",
              },
              {
                icon: Shield,
                title: t.services.supplyChain.title,
                titleJp: "サプライチェーン管理",
                description: t.services.supplyChain.description,
                image: "/images/logistics-2.jpg",
              },
            ].map((service) => (
              <AnimatedSection key={service.title}>
                <motion.div
                  variants={fadeInUp}
                  className="group relative bg-navy/20 border border-stone/10 overflow-hidden hover:border-kincha/30 transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-sumi via-sumi/50 to-transparent" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    <service.icon className="h-8 w-8 text-kincha mb-4" />
                    <h3 className={`font-display text-2xl text-washi mb-2 ${isJa ? "font-jp-serif" : ""}`}>
                      {service.title}
                    </h3>
                    {!isJa && (
                      <p className="text-kincha/80 text-sm font-jp mb-4">{service.titleJp}</p>
                    )}
                    <p className={`text-stone text-sm leading-relaxed ${isJa ? "font-jp" : ""}`}>
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Gold accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kincha/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection className="text-center mt-12">
            <motion.div variants={fadeInUp}>
              <Link href="/services">
                <Button variant="outline" className={`border-kincha/50 text-kincha hover:bg-kincha/10 px-8 py-6 text-sm tracking-wider ${isJa ? "font-jp" : ""}`}>
                  {t.services.viewAll}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Project - Japan */}
      <section className="py-24 lg:py-32 bg-navy/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection>
              <motion.div variants={fadeInUp} className="relative">
                <img
                  src="/images/hero-japan-luxury.jpg"
                  alt="Luxury Hotel Japan"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-kincha text-sumi p-6">
                  <p className="font-display text-3xl">Japan</p>
                  <p className="text-sm">{isJa ? "品質基準" : "Quality Standards"}</p>
                </div>
              </motion.div>
            </AnimatedSection>
            
            <AnimatedSection>
              <motion.div variants={fadeInUp}>
                <p className={`text-kincha text-sm tracking-[0.3em] uppercase mb-4 ${isJa ? "font-jp" : ""}`}>
                  {isJa ? "特集" : "Featured Expertise"}
                </p>
                <h2 className={`font-display text-4xl md:text-5xl text-washi mb-6 ${isJa ? "font-jp-serif" : ""}`}>
                  {t.portfolio.japan.title}
                </h2>
                <p className={`text-stone leading-relaxed mb-6 ${isJa ? "font-jp" : ""}`}>
                  {t.portfolio.japan.description}
                </p>
                
                <ul className="space-y-4 mb-8">
                  {(isJa ? [
                    "東京・京都の高級ホテルFF&E調達",
                    "日本の品質管理プロトコルの厳格な遵守",
                    "精密な納品と設置管理",
                    "プレミアムメーカーとの長期パートナーシップ",
                  ] : [
                    "Luxury hotel FF&E procurement in Tokyo and Kyoto",
                    "Strict adherence to Japanese quality control protocols",
                    "Precision delivery and installation management",
                    "Long-term partnerships with premium manufacturers",
                  ]).map((item, index) => (
                    <motion.li
                      key={index}
                      variants={fadeInUp}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-kincha flex-shrink-0 mt-0.5" />
                      <span className={`text-washi/90 ${isJa ? "font-jp" : ""}`}>{item}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <Link href="/portfolio">
                  <Button className={`bg-kincha hover:bg-kincha-light text-sumi px-8 py-6 text-sm tracking-wider ${isJa ? "font-jp" : ""}`}>
                    {t.portfolio.viewCase}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Trust & Compliance Section */}
      <section className="py-24 lg:py-32 bg-sumi">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <motion.div variants={fadeInUp}>
              <p className={`text-kincha text-sm tracking-[0.3em] uppercase mb-4 ${isJa ? "font-jp" : ""}`}>
                {t.common.trustCompliance}
              </p>
              <h2 className={`font-display text-4xl md:text-5xl text-washi mb-6 ${isJa ? "font-jp-serif" : ""}`}>
                {isJa ? "誠実さの上に構築" : "Built on Integrity"}
              </h2>
              <p className={`text-stone max-w-2xl mx-auto ${isJa ? "font-jp" : ""}`}>
                {isJa 
                  ? "完全にライセンスを取得した香港法人として、最高水準のコーポレートガバナンスと規制コンプライアンスを維持しています。"
                  : "As a fully licensed Hong Kong entity, we maintain the highest standards of corporate governance and regulatory compliance."
                }
              </p>
            </motion.div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: isJa ? "TCSPライセンス" : "TCSP Licensed",
                value: "TC007820",
                description: isJa ? "信託・会社サービス提供者ライセンス" : "Trust or Company Service Provider License",
              },
              {
                icon: Building2,
                title: isJa ? "商業登記" : "Business Registration",
                value: "65188837",
                description: isJa ? "香港会社登記所" : "Hong Kong Companies Registry",
              },
              {
                icon: Award,
                title: isJa ? "品質認証" : "Quality Certified",
                value: "ISO Standards",
                description: isJa ? "国際品質管理" : "International quality management",
              },
              {
                icon: Globe,
                title: isJa ? "グローバルネットワーク" : "Global Network",
                value: isJa ? "15カ国以上" : "15+ Countries",
                description: isJa ? "世界中のサプライヤー関係" : "Supplier relationships worldwide",
              },
            ].map((item) => (
              <AnimatedSection key={item.title}>
                <motion.div
                  variants={fadeInUp}
                  className="bg-navy/20 border border-stone/10 p-8 text-center hover:border-kincha/30 transition-all duration-300"
                >
                  <item.icon className="h-10 w-10 text-kincha mx-auto mb-4" />
                  <p className={`text-washi/60 text-xs tracking-wider uppercase mb-2 ${isJa ? "font-jp" : ""}`}>
                    {item.title}
                  </p>
                  <p className="font-display text-2xl text-washi mb-2">{item.value}</p>
                  <p className={`text-stone text-sm ${isJa ? "font-jp" : ""}`}>{item.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/about-team.jpg"
            alt="Professional Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-sumi/90" />
        </div>
        
        <div className="container relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeInUp}>
              <p className={`text-kincha text-sm tracking-[0.3em] uppercase mb-4 ${isJa ? "font-jp" : ""}`}>
                {isJa ? "始めましょう" : "Get Started"}
              </p>
              <h2 className={`font-display text-4xl md:text-5xl text-washi mb-6 ${isJa ? "font-jp-serif" : ""}`}>
                {isJa ? "卓越性とパートナーを" : "Partner with Excellence"}
              </h2>
              <p className={`text-stone text-lg mb-10 ${isJa ? "font-jp" : ""}`}>
                {isJa 
                  ? "アジアで高級ホテルを開発中の方も、グローバルプロジェクト向けのプレミアム家具を調達中の方も、私たちのチームが卓越した結果をお届けします。"
                  : "Whether you're developing a luxury hotel in Asia or sourcing premium furnishings for a global project, our team is ready to deliver exceptional results."
                }
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button className={`bg-kincha hover:bg-kincha-light text-sumi px-10 py-6 text-sm tracking-wider ${isJa ? "font-jp" : ""}`}>
                    {isJa ? "会話を始める" : "Start a Conversation"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className={`border-washi/30 text-washi hover:bg-washi/10 px-10 py-6 text-sm tracking-wider ${isJa ? "font-jp" : ""}`}>
                    {isJa ? "会社について" : "Learn About Us"}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
