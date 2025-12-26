/**
 * Home Page - Clean White Professional Design
 * 
 * Design Philosophy:
 * - White base with Navy & Gold accents
 * - Trust indicators prominently displayed
 * - Multi-language support (EN/JA/ZH)
 */

import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, type Variants, type Easing } from "framer-motion";
import { ArrowRight, Building2, Globe, Shield, Award, CheckCircle2, Package, Cpu, Palette, TrendingUp } from "lucide-react";
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
  
  const getFontClass = () => {
    if (language === "ja") return "font-jp";
    if (language === "zh") return "font-zh";
    return "";
  };

  const getSerifFontClass = () => {
    if (language === "ja") return "font-jp-serif";
    if (language === "zh") return "font-zh";
    return "font-display";
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-global-network.jpg"
            alt="Hong Kong Victoria Harbour"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
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
              className={`text-gold-dark text-sm tracking-[0.3em] uppercase mb-6 ${getFontClass()}`}
            >
              {t.hero.tagline}
            </motion.p>
            
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className={`${getSerifFontClass()} text-5xl md:text-6xl lg:text-7xl text-navy leading-tight mb-8`}
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
              className={`text-slate text-lg md:text-xl leading-relaxed mb-10 max-w-xl ${getFontClass()}`}
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
              <Link href="/services">
                <Button className={`bg-navy hover:bg-navy-light text-white px-8 py-6 text-sm tracking-wider ${getFontClass()}`}>
                  {t.hero.cta1}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className={`border-navy text-navy hover:bg-navy/5 px-8 py-6 text-sm tracking-wider ${getFontClass()}`}>
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
              <div className={`flex items-center gap-2 text-charcoal text-sm ${getFontClass()}`}>
                <Shield className="h-4 w-4 text-gold" />
                <span>{t.hero.trust1}</span>
              </div>
              <div className={`flex items-center gap-2 text-charcoal text-sm ${getFontClass()}`}>
                <Building2 className="h-4 w-4 text-gold" />
                <span>{t.hero.trust2}</span>
              </div>
              <div className={`flex items-center gap-2 text-charcoal text-sm ${getFontClass()}`}>
                <Globe className="h-4 w-4 text-gold" />
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
          <div className="w-px h-16 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </section>

      {/* Services Overview */}
      <section className="py-24 lg:py-32 bg-light-gray">
        <div className="container">
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <p className={`text-gold-dark text-sm tracking-[0.3em] uppercase mb-4 ${getFontClass()}`}>
                {t.services.subtitle}
              </p>
              <h2 className={`${getSerifFontClass()} text-4xl md:text-5xl text-navy mb-6`}>
                {t.services.title}
              </h2>
              <p className={`text-slate max-w-2xl mx-auto ${getFontClass()}`}>
                {t.services.description}
              </p>
            </motion.div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Package,
                title: t.services.hospitality.title,
                description: t.services.hospitality.description,
              },
              {
                icon: Building2,
                title: t.services.integration.title,
                description: t.services.integration.description,
              },
              {
                icon: Cpu,
                title: t.services.operations.title,
                description: t.services.operations.description,
              },
              {
                icon: Palette,
                title: t.services.ip.title,
                description: t.services.ip.description,
              },
              {
                icon: TrendingUp,
                title: t.services.trading.title,
                description: t.services.trading.description,
              },
            ].map((service) => (
              <AnimatedSection key={service.title}>
                <motion.div
                  variants={fadeInUp}
                  className="group bg-white border border-gray-200 p-8 hover:border-gold/50 hover:shadow-lg transition-all duration-500 card-hover"
                >
                  <service.icon className="h-10 w-10 text-gold mb-6" />
                  <h3 className={`${getSerifFontClass()} text-xl text-navy mb-4`}>
                    {service.title}
                  </h3>
                  <p className={`text-slate text-sm leading-relaxed ${getFontClass()}`}>
                    {service.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection className="text-center mt-12">
            <motion.div variants={fadeInUp}>
              <Link href="/services">
                <Button variant="outline" className={`border-navy text-navy hover:bg-navy/5 px-8 py-6 text-sm tracking-wider ${getFontClass()}`}>
                  {t.services.viewAll}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container">
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <p className={`text-gold-dark text-sm tracking-[0.3em] uppercase mb-4 ${getFontClass()}`}>
                {t.portfolio.subtitle}
              </p>
              <h2 className={`${getSerifFontClass()} text-4xl md:text-5xl text-navy mb-6`}>
                {t.portfolio.title}
              </h2>
              <p className={`text-slate max-w-2xl mx-auto ${getFontClass()}`}>
                {t.portfolio.description}
              </p>
            </motion.div>
          </AnimatedSection>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Project 1 */}
            <AnimatedSection>
              <motion.div
                variants={fadeInUp}
                className="group relative bg-white border border-gray-200 overflow-hidden hover:border-gold/50 hover:shadow-lg transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/images/hotel-lobby-realistic.jpg"
                    alt={t.portfolio.project1.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-gold text-sm mb-1">{t.portfolio.project1.location}</p>
                    <h3 className={`${getSerifFontClass()} text-2xl text-white`}>
                      {t.portfolio.project1.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className={`text-slate text-sm leading-relaxed ${getFontClass()}`}>
                    {t.portfolio.project1.description}
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
            
            {/* Project 2 */}
            <AnimatedSection>
              <motion.div
                variants={fadeInUp}
                className="group relative bg-white border border-gray-200 overflow-hidden hover:border-gold/50 hover:shadow-lg transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/images/portfolio-it-realistic.jpg"
                    alt={t.portfolio.project2.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-gold text-sm mb-1">{t.portfolio.project2.location}</p>
                    <h3 className={`${getSerifFontClass()} text-2xl text-white`}>
                      {t.portfolio.project2.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className={`text-slate text-sm leading-relaxed ${getFontClass()}`}>
                    {t.portfolio.project2.description}
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
          
          <AnimatedSection className="text-center mt-12">
            <motion.div variants={fadeInUp}>
              <Link href="/portfolio">
                <Button className={`bg-navy hover:bg-navy-light text-white px-8 py-6 text-sm tracking-wider ${getFontClass()}`}>
                  {t.portfolio.viewCase}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Trust & Compliance Section */}
      <section className="py-24 lg:py-32 bg-navy">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <motion.div variants={fadeInUp}>
              <p className={`text-gold text-sm tracking-[0.3em] uppercase mb-4 ${getFontClass()}`}>
                {t.common.trustCompliance}
              </p>
              <h2 className={`${getSerifFontClass()} text-4xl md:text-5xl text-white mb-6`}>
                {language === "ja" ? "誠実さの上に構築" : language === "zh" ? "建立在诚信之上" : "Built on Integrity"}
              </h2>
              <p className={`text-white/70 max-w-2xl mx-auto ${getFontClass()}`}>
                {language === "ja" 
                  ? "完全にライセンスを取得した香港法人として、最高水準のコーポレートガバナンスと規制コンプライアンスを維持しています。"
                  : language === "zh"
                  ? "作为持有完整牌照的香港公司，我们保持最高标准的公司治理和监管合规。"
                  : "As a fully licensed Hong Kong entity, we maintain the highest standards of corporate governance and regulatory compliance."
                }
              </p>
            </motion.div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: language === "ja" ? "TCSPライセンス" : language === "zh" ? "TCSP牌照" : "TCSP Licensed",
                value: "TC007820",
                description: language === "ja" ? "信託・会社サービス提供者ライセンス" : language === "zh" ? "信托或公司服务提供者牌照" : "Trust or Company Service Provider License",
              },
              {
                icon: Building2,
                title: language === "ja" ? "商業登記" : language === "zh" ? "商业登记" : "Business Registration",
                value: "65188837",
                description: language === "ja" ? "香港会社登記所" : language === "zh" ? "香港公司注册处" : "Hong Kong Companies Registry",
              },
              {
                icon: Award,
                title: language === "ja" ? "品質認証" : language === "zh" ? "质量认证" : "Quality Certified",
                value: "ISO Standards",
                description: language === "ja" ? "国際品質管理" : language === "zh" ? "国际质量管理" : "International quality management",
              },
              {
                icon: Globe,
                title: language === "ja" ? "グローバルネットワーク" : language === "zh" ? "全球网络" : "Global Network",
                value: language === "ja" ? "15カ国以上" : language === "zh" ? "15+国家" : "15+ Countries",
                description: language === "ja" ? "世界中のサプライヤー関係" : language === "zh" ? "全球供应商关系" : "Supplier relationships worldwide",
              },
            ].map((item) => (
              <AnimatedSection key={item.title}>
                <motion.div
                  variants={fadeInUp}
                  className="bg-white/5 border border-white/10 p-8 text-center hover:border-gold/30 transition-all duration-300"
                >
                  <item.icon className="h-10 w-10 text-gold mx-auto mb-4" />
                  <p className={`text-white/60 text-xs tracking-wider uppercase mb-2 ${getFontClass()}`}>
                    {item.title}
                  </p>
                  <p className="font-display text-2xl text-white mb-2">{item.value}</p>
                  <p className={`text-white/60 text-sm ${getFontClass()}`}>{item.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-light-gray">
        <div className="container">
          <AnimatedSection className="text-center">
            <motion.div variants={fadeInUp}>
              <h2 className={`${getSerifFontClass()} text-4xl md:text-5xl text-navy mb-6`}>
                {t.contact.title}
              </h2>
              <p className={`text-slate max-w-xl mx-auto mb-10 ${getFontClass()}`}>
                {t.contact.description}
              </p>
              <Link href="/contact">
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
