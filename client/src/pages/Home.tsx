/**
 * Home Page - Clean White Professional Design with Parallax
 * 
 * Design Philosophy:
 * - White base with Navy & Gold accents
 * - Trust indicators prominently displayed
 * - Multi-language support (EN/JA/ZH)
 * - Parallax scroll effect on hero section
 */

import { useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, useInView, useScroll, useTransform, type Variants, type Easing } from "framer-motion";
import { ArrowRight, Building2, Globe, Shield, Award, CheckCircle2, Package, Cpu, Palette, TrendingUp } from "lucide-react";
import AnimatedCounter, { AnimatedCounterPlus } from "@/components/AnimatedCounter";
import ScrollToTop from "@/components/ScrollToTop";
import OptimizedImage from "@/components/OptimizedImage";
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

// Hero Section with Parallax Effect
function HeroSection({ 
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
  
  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center bg-white overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <picture>
          <source srcSet="/images/hero-global-network.webp" type="image/webp" />
          <img
            src="/images/hero-global-network.jpg"
            alt="Hong Kong Victoria Harbour"
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
            className={`${getHeadingFontClass()} text-5xl md:text-6xl lg:text-7xl text-navy leading-tight mb-8`}
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
            <Link href={`${basePath}/services`}>
              <Button className={`bg-navy hover:bg-navy-light text-white px-8 py-6 text-sm tracking-wider hk-btn-hover ${getFontClass()}`}>
                {t.hero.cta1}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href={`${basePath}/contact`}>
              <Button variant="outline" className={`border-navy text-navy hover:bg-navy/5 px-8 py-6 text-sm tracking-wider hk-btn-hover ${getFontClass()}`}>
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
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div 
          className="w-px h-16 bg-gradient-to-b from-gold to-transparent"
          animate={{ scaleY: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

export default function Home() {
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

  return (
    <div className="min-h-screen bg-white" data-region="hk">
      <Header />
      
      {/* Hero Section with Parallax */}
      <HeroSection 
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
              <h2 className={`${getHeadingFontClass()} text-4xl md:text-5xl text-navy mb-6`}>
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
                  className="group bg-white border border-gray-200 p-8 hk-card-hover"
                >
                  <service.icon className="h-10 w-10 text-gold mb-6" />
                  <h3 className={`${getHeadingFontClass()} text-xl text-navy mb-4`}>
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
              <Link href={`${basePath}/services`}>
                <Button variant="outline" className={`border-navy text-navy hover:bg-navy/5 px-8 py-6 text-sm tracking-wider hk-btn-hover ${getFontClass()}`}>
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
              <h2 className={`${getHeadingFontClass()} text-4xl md:text-5xl text-navy mb-6`}>
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
                  <picture>
                    <source srcSet="/images/hotel-lobby-realistic.webp" type="image/webp" />
                    <img
                      src="/images/hotel-lobby-realistic.jpg"
                      alt={t.portfolio.project1.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-gold text-xs tracking-wider uppercase">{t.portfolio.project1.location}</span>
                    <h3 className={`${getHeadingFontClass()} text-xl text-white mt-1`}>{t.portfolio.project1.title}</h3>
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
                  <picture>
                    <source srcSet="/images/portfolio-it-realistic.webp" type="image/webp" />
                    <img
                      src="/images/portfolio-it-realistic.jpg"
                      alt={t.portfolio.project2.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-gold text-xs tracking-wider uppercase">{t.portfolio.project2.location}</span>
                    <h3 className={`${getHeadingFontClass()} text-xl text-white mt-1`}>{t.portfolio.project2.title}</h3>
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
              <Link href={`${basePath}/portfolio`}>
                <Button className={`bg-navy hover:bg-navy-light text-white px-8 py-6 text-sm tracking-wider hk-btn-hover ${getFontClass()}`}>
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
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
                Trust & Compliance
              </p>
              <h2 className={`${getHeadingFontClass()} text-4xl md:text-5xl text-white mb-6`}>
                Built on Integrity
              </h2>
              <p className={`text-gray-300 max-w-2xl mx-auto ${getFontClass()}`}>
                As a fully licensed Hong Kong entity, we maintain the highest standards of corporate governance and regulatory compliance.
              </p>
            </motion.div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "TCSP Licensed",
                value: "TC007820",
                description: "Trust or Company Service Provider License",
              },
              {
                icon: Building2,
                title: "Business Registration",
                value: "65188837",
                description: "Hong Kong Companies Registry",
              },
              {
                icon: Award,
                title: "Quality Certified",
                value: "ISO Standards",
                description: "International quality management",
              },
              {
                icon: Globe,
                title: "Global Network",
                value: 15,
                suffix: "+ Countries",
                description: "Supplier relationships worldwide",
                isAnimated: true,
              },
            ].map((item) => (
              <AnimatedSection key={item.title}>
                <motion.div
                  variants={fadeInUp}
                  className="text-center p-6 border border-gold/20 bg-white/5 backdrop-blur-sm hover:border-gold/40 transition-colors duration-300 hk-card-hover"
                >
                  <item.icon className="h-8 w-8 text-gold mx-auto mb-4" />
                  <p className={`text-white/60 text-xs tracking-wider uppercase mb-2 ${getFontClass()}`}>{item.title}</p>
                  <p className="text-gold text-xl font-semibold mb-2">
                    {item.isAnimated ? (
                      <AnimatedCounterPlus value={item.value as number} suffix={item.suffix} duration={2.5} />
                    ) : (
                      item.value
                    )}
                  </p>
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
              <h2 className={`${getHeadingFontClass()} text-4xl md:text-5xl text-navy mb-6`}>
                {t.contact.title}
              </h2>
              <p className={`text-slate max-w-xl mx-auto mb-10 ${getFontClass()}`}>
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
      <ScrollToTop region="hk" />
    </div>
  );
}
