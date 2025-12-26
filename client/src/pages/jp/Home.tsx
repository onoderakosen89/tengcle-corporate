/**
 * Home Page - Clean White Professional Design with Parallax
 * 
 * Design Philosophy:
 * - White base with Navy & Gold accents
 * - Trust indicators prominently displayed
 * - Multi-language support (JA/EN/ZH)
 * - 日本的な繊細で優雅なパララックス効果
 */

import { useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, useInView, useScroll, useTransform, type Variants, type Easing } from "framer-motion";
import { ArrowRight, Building2, Globe, Users, Home as HomeIcon, Utensils, Dumbbell, BedDouble } from "lucide-react";
import Header from "@/components/jp/Header";
import Footer from "@/components/jp/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { useJpLanguage } from "@/contexts/JpLanguageContext";
import SEOHead from "@/components/SEOHead";

// Animation variants with proper typing - Japan: Refined & Delicate
// 日本的な繊細さと優雅さを表現するアニメーション
const easeJapanese: Easing = [0.22, 1, 0.36, 1]; // Gentle, flowing easing

const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    filter: "blur(4px)"
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: easeJapanese } 
  },
};

const fadeInDelicate: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.98
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 1.0, ease: easeJapanese } 
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
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

// Hero Section with Parallax Effect - 日本的な優雅なパララックス
function JpHeroSection({ 
  getFontClass, 
  getHeadingFontClass, 
  t, 
  basePath 
}: { 
  getFontClass: () => string; 
  getHeadingFontClass: () => string; 
  t: any; 
  basePath: string;
}) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax transforms - 繊細で優雅な動き
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center bg-white overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <picture>
          <source srcSet="/images/hero-japan-corporate.webp" type="image/webp" />
          <img
            src="/images/hero-japan-corporate.jpg"
            alt="Tokyo Business District"
            className="w-full h-[120%] object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
      </motion.div>
      
      {/* Content with Parallax */}
      <motion.div 
        className="container relative z-10 pt-32 pb-20"
        style={{ y: contentY, opacity }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="max-w-3xl"
        >
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1.0 }}
            className={`text-gold-dark text-sm tracking-[0.3em] uppercase mb-6 ${getFontClass()}`}
          >
            {t.hero.tagline}
          </motion.p>
          
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.0 }}
            className={`${getHeadingFontClass()} text-4xl md:text-5xl lg:text-6xl text-navy leading-tight mb-8`}
          >
            {t.hero.headline1}
            <br />
            <span className="text-gradient-gold">{t.hero.headline2}</span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1.0 }}
            className={`text-slate text-lg md:text-xl leading-relaxed mb-10 max-w-xl ${getFontClass()}`}
          >
            {t.hero.subtitle}
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1.0 }}
            className="flex flex-wrap gap-4"
          >
            <Link href={`${basePath}/services`}>
              <Button className={`bg-navy hover:bg-navy-light text-white px-8 py-6 text-sm tracking-wider jp-btn-hover ${getFontClass()}`}>
                {t.hero.cta1}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href={`${basePath}/contact`}>
              <Button variant="outline" className={`border-navy text-navy hover:bg-navy/5 px-8 py-6 text-sm tracking-wider jp-btn-hover ${getFontClass()}`}>
                {t.hero.cta2}
              </Button>
            </Link>
          </motion.div>
          
          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.0 }}
            className="mt-16 flex flex-wrap gap-8"
          >
            <div className={`flex items-center gap-2 text-charcoal text-sm ${getFontClass()}`}>
              <HomeIcon className="h-4 w-4 text-gold" />
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
      </motion.div>
      
      {/* Scroll Indicator - 繊細なアニメーション */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.0 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div 
          className="w-px h-16 bg-gradient-to-b from-gold to-transparent"
          animate={{ scaleY: [1, 1.15, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

export default function Home() {
  const { t, language } = useJpLanguage();
  const [location] = useLocation();
  const pathLang = location.split("/")[2] || "ja";
  const basePath = `/jp/${pathLang}`;
  
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
      icon: Building2,
      title: t.services.realEstate.title,
      description: t.services.realEstate.description,
      image: "/images/service-real-estate.jpg",
    },
    {
      icon: Utensils,
      title: t.services.restaurant.title,
      description: t.services.restaurant.description,
      image: "/images/service-restaurant.jpg",
    },
    {
      icon: Dumbbell,
      title: t.services.gym.title,
      description: t.services.gym.description,
      image: "/images/service-fitness.jpg",
    },
    {
      icon: BedDouble,
      title: t.services.capsuleHotel.title,
      description: t.services.capsuleHotel.description,
      image: "/images/service-hospitality.jpg",
    },
    {
      icon: Users,
      title: t.services.recruitment.title,
      description: t.services.recruitment.description,
      image: "/images/service-hr.jpg",
    },
  ];

  // SEO meta data based on language
  const seoData = {
    ja: {
      title: "Tengcle Inc. | 日本の不動産・飲食・フィットネス・ホスピタリティ",
      description: "東京を拠点に不動産管理、レストラン運営、レンタルジム、カプセルホテル、人材紹介サービスを提供。おもてなしの心で事業を展開しています。",
    },
    en: {
      title: "Tengcle Inc. | Real Estate, F&B, Fitness & Hospitality in Japan",
      description: "Tokyo-based company offering real estate management, restaurant operations, rental gym, capsule hotel, and recruitment services with Japanese hospitality.",
    },
    zh: {
      title: "Tengcle Inc. | 日本房地产・餐饮・健身・酒店服务",
      description: "以东京为基地，提供房地产管理、餐厅运营、租赁健身房、胶囊酒店和人才介绍服务。以日式待客之道开展事业。",
    },
  };

  const currentSeo = seoData[language as keyof typeof seoData] || seoData.ja;

  return (
    <div className="min-h-screen bg-white" data-region="jp">
      <SEOHead
        title={currentSeo.title}
        description={currentSeo.description}
        canonical={`https://www.tengcle.com/jp/${language}`}
        locale={language === "ja" ? "ja_JP" : language === "zh" ? "zh_CN" : "en_JP"}
      />
      <Header />
      
      {/* Hero Section with Parallax */}
      <JpHeroSection 
        getFontClass={getFontClass} 
        getHeadingFontClass={getHeadingFontClass} 
        t={t} 
        basePath={basePath} 
      />

      {/* Services Overview */}
      <section className="py-24 lg:py-32 bg-light-gray">
        <div className="container">
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <p className={`text-gold-dark text-sm tracking-[0.3em] uppercase mb-4 ${getFontClass()}`}>
                {t.services.subtitle}
              </p>
              <h2 className={`${getHeadingFontClass()} text-3xl md:text-4xl text-navy mb-6`}>
                {t.services.title}
              </h2>
              <p className={`text-slate max-w-2xl mx-auto ${getFontClass()}`}>
                {t.services.description}
              </p>
            </motion.div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <AnimatedSection key={service.title}>
                <motion.div
                  variants={fadeInUp}
                  className="group bg-white border border-gray-200 overflow-hidden jp-card-hover"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-6">
                    <service.icon className="h-8 w-8 text-gold mb-4" />
                    <h3 className={`${getHeadingFontClass()} text-lg text-navy mb-3`}>
                      {service.title}
                    </h3>
                    <p className={`text-slate text-sm leading-relaxed ${getFontClass()}`}>
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection className="text-center mt-12">
            <motion.div variants={fadeInUp}>
              <Link href={`${basePath}/services`}>
                <Button variant="outline" className={`border-navy text-navy hover:bg-navy/5 px-8 py-6 text-sm tracking-wider jp-btn-hover ${getFontClass()}`}>
                  {t.services.viewAll}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

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
              <Link href={`${basePath}/contact`}>
                <Button className={`bg-gold hover:bg-gold-dark text-navy px-8 py-6 text-sm tracking-wider font-medium jp-btn-hover ${getFontClass()}`}>
                  {t.common.getInTouch}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
      <ScrollToTop region="jp" />
    </div>
  );
}
