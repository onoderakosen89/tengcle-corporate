/**
 * About Page - Clean White Professional Design
 * 
 * Company information with trust indicators
 * Hong Kong Office: Sheung Wan only
 * Japan Offices: Takanawa and Tsukiji
 */

import { useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, useInView, type Variants, type Easing } from "framer-motion";
import { ArrowRight, Shield, Building2, Globe, Award, MapPin } from "lucide-react";
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

export default function About() {
  const { t, language } = useLanguage();
  const [location] = useLocation();
  const pathLang = location.split("/")[2] || "en";
  const basePath = `/hk/${pathLang}`;
  
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

  return (
    <div className="min-h-screen bg-white" data-region="hk">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-light-gray">
        <div className="container">
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="max-w-3xl">
              <p className={`text-gold-dark text-sm tracking-[0.3em] uppercase mb-4 ${getFontClass()}`}>
                {t.about.subtitle}
              </p>
              <h1 className={`${getHeadingFontClass()} text-4xl md:text-5xl lg:text-6xl text-navy mb-6`}>
                {t.about.title}
              </h1>
              <p className={`text-slate text-lg leading-relaxed ${getFontClass()}`}>
                {t.about.description}
              </p>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <motion.div variants={fadeInUp}>
                <img
                  src="/images/about-team.jpg"
                  alt="Tengcle Team"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
              </motion.div>
            </AnimatedSection>
            
            <AnimatedSection>
              <motion.div variants={fadeInUp}>
                <h2 className={`${getHeadingFontClass()} text-3xl text-navy mb-6`}>
                  {t.about.story.title}
                </h2>
                <p className={`text-slate leading-relaxed mb-6 ${getFontClass()}`}>
                  {t.about.story.p1}
                </p>
                <p className={`text-slate leading-relaxed ${getFontClass()}`}>
                  {t.about.story.p2}
                </p>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Trust & Compliance */}
      <section className="py-24 bg-navy">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <motion.div variants={fadeInUp}>
              <p className={`text-gold text-sm tracking-[0.3em] uppercase mb-4 ${getFontClass()}`}>
                {t.common.trustCompliance}
              </p>
              <h2 className={`${getHeadingFontClass()} text-4xl text-white mb-6`}>
                {language === "ja" ? "コンプライアンスと信頼性" : language === "zh" ? "合规与信任" : "Compliance & Trust"}
              </h2>
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
                  <p className="font-heading text-2xl text-white mb-2">{item.value}</p>
                  <p className={`text-white/60 text-sm ${getFontClass()}`}>{item.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-24 bg-light-gray">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <motion.div variants={fadeInUp}>
              <h2 className={`${getHeadingFontClass()} text-4xl text-navy mb-6`}>
                {language === "ja" ? "オフィス" : language === "zh" ? "办公室" : "Our Offices"}
              </h2>
            </motion.div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Hong Kong */}
            <AnimatedSection>
              <motion.div
                variants={fadeInUp}
                className="bg-white border border-gray-200 p-8 hover:border-gold/50 transition-all duration-300"
              >
                <MapPin className="h-8 w-8 text-gold mb-4" />
                <h3 className={`${getHeadingFontClass()} text-xl text-navy mb-2`}>
                  {t.contact.info.hkOffice}
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  No. 5, 17/F, Strand 50<br />
                  50 Bonham Strand<br />
                  Sheung Wan, Hong Kong
                </p>
              </motion.div>
            </AnimatedSection>
            
            {/* Tokyo Takanawa */}
            <AnimatedSection>
              <motion.div
                variants={fadeInUp}
                className="bg-white border border-gray-200 p-8 hover:border-gold/50 transition-all duration-300"
              >
                <MapPin className="h-8 w-8 text-gold mb-4" />
                <h3 className={`${getHeadingFontClass()} text-xl text-navy mb-2`}>
                  {t.contact.info.jpOffice1}
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  {language === "ja" || language === "zh" 
                    ? "東京都港区高輪2-19-20" 
                    : "2-19-20 Takanawa, Minato-ku, Tokyo, Japan"}
                </p>
              </motion.div>
            </AnimatedSection>
            
            {/* Tokyo Tsukiji */}
            <AnimatedSection>
              <motion.div
                variants={fadeInUp}
                className="bg-white border border-gray-200 p-8 hover:border-gold/50 transition-all duration-300"
              >
                <MapPin className="h-8 w-8 text-gold mb-4" />
                <h3 className={`${getHeadingFontClass()} text-xl text-navy mb-2`}>
                  {t.contact.info.jpOffice2}
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  {language === "ja" || language === "zh" 
                    ? "東京都中央区築地2-12-14" 
                    : "2-12-14 Tsukiji, Chuo-ku, Tokyo, Japan"}
                </p>
              </motion.div>
            </AnimatedSection>
            
            {/* USA Office */}
            <AnimatedSection>
              <motion.div
                variants={fadeInUp}
                className="bg-white border border-gray-200 p-8 hover:border-gold/50 transition-all duration-300 relative"
              >
                <div className="absolute top-4 right-4 bg-gold/10 text-gold text-xs px-2 py-1 rounded">
                  {language === "ja" ? "設立準備中" : language === "zh" ? "筹备中" : "Establishing"}
                </div>
                <MapPin className="h-8 w-8 text-gold mb-4" />
                <h3 className={`${getHeadingFontClass()} text-xl text-navy mb-2`}>
                  {t.contact.info.usOffice}
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  17 Hamilton Ave<br />
                  Weehawken, NJ<br />
                  USA
                </p>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <AnimatedSection className="text-center">
            <motion.div variants={fadeInUp}>
              <h2 className={`${getHeadingFontClass()} text-4xl text-navy mb-6`}>
                {t.contact.title}
              </h2>
              <p className={`text-slate max-w-xl mx-auto mb-10 ${getFontClass()}`}>
                {t.contact.description}
              </p>
              <Link href={`${basePath}/contact`}>
                <Button className={`bg-navy hover:bg-navy-light text-white px-10 py-6 text-sm tracking-wider ${getFontClass()}`}>
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
