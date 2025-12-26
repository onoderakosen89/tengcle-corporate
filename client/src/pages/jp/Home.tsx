/**
 * Home Page - Clean White Professional Design
 * 
 * Design Philosophy:
 * - White base with Navy & Gold accents
 * - Trust indicators prominently displayed
 * - Multi-language support (JA/EN/ZH)
 */

import { useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, useInView, type Variants, type Easing } from "framer-motion";
import { ArrowRight, Building2, Globe, Users, Home as HomeIcon, Utensils, Dumbbell, BedDouble } from "lucide-react";
import Header from "@/components/jp/Header";
import Footer from "@/components/jp/Footer";
import { Button } from "@/components/ui/button";
import { useJpLanguage } from "@/contexts/JpLanguageContext";

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
      image: "/images/service-gym.jpg",
    },
    {
      icon: BedDouble,
      title: t.services.capsuleHotel.title,
      description: t.services.capsuleHotel.description,
      image: "/images/service-capsule-hotel.jpg",
    },
    {
      icon: Users,
      title: t.services.recruitment.title,
      description: t.services.recruitment.description,
      image: "/images/service-recruitment.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-japan-corporate.jpg"
            alt="Tokyo Business District"
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
                <Button className={`bg-navy hover:bg-navy-light text-white px-8 py-6 text-sm tracking-wider ${getFontClass()}`}>
                  {t.hero.cta1}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href={`${basePath}/contact`}>
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
                  className="group bg-white border border-gray-200 overflow-hidden hover:border-gold/50 hover:shadow-lg transition-all duration-500 card-hover"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/10 transition-colors duration-500" />
                  </div>
                  <div className="p-6">
                    <service.icon className="h-8 w-8 text-gold mb-4" />
                    <h3 className={`${getHeadingFontClass()} text-xl text-navy mb-3`}>
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
                <Button variant="outline" className={`border-navy text-navy hover:bg-navy/5 px-8 py-6 text-sm tracking-wider ${getFontClass()}`}>
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
                <Button className={`bg-gold hover:bg-gold-dark text-navy px-8 py-6 text-sm tracking-wider font-medium ${getFontClass()}`}>
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
