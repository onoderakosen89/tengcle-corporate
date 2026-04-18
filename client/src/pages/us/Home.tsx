/**
 * US Home Page - Bold American Style with Parallax
 * 
 * Design Philosophy:
 * - Bold, dynamic animations
 * - High contrast with purple and gold
 * - Impactful parallax scrolling
 */

import { useRef } from "react";
import { motion, useScroll, useTransform, type Easing } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Building2, Home as HomeIcon, Key, Shield, ArrowRight, CheckCircle, TrendingUp } from "lucide-react";
import UsHeader from "@/components/us/Header";
import UsFooter from "@/components/us/Footer";
import { useUsLanguage } from "@/contexts/UsLanguageContext";
import SEOHead, { generateOrganizationSchema, generateWebPageSchema } from "@/components/SEOHead";
import CookieConsent from "@/components/CookieConsent";

// Animation variants - USA: Bold & Dynamic
const easeAmerican: Easing = [0.4, 0, 0.2, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeAmerican } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

// Hero Section with Parallax Effect - Bold American Style
function UsHeroSection({ basePath, t }: { basePath: string; t: (key: string) => string }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms - Bold and dynamic movement
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center bg-purple-deep overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundY, scale: backgroundScale }}
      >
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663066460611/JiunFLgUsEDKxOsk.jpg"
          alt="New Jersey and Manhattan Skyline at Sunset"
          className="w-full h-[120%] object-cover opacity-60"
          width="1920"
          height="1080"
          // @ts-ignore
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-deep/70 via-purple-deep/50 to-transparent" />
      </motion.div>

      {/* Content with Parallax */}
      <motion.div
        className="container relative z-10 pt-32 pb-20"
        style={{ y: contentY, opacity }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeInUp}
            className="text-gold text-sm tracking-widest uppercase mb-4"
          >
            {t('hero.tagline')}
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-300 mb-8 leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
            <Link
              href={`${basePath}/services`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-purple-deep font-medium us-btn-hover"
            >
              {t('hero.cta.services')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white us-btn-hover"
            >
              {t('hero.cta.contact')}
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - Dynamic American Style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-gold rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}

export default function UsHome() {
  const { language, t } = useUsLanguage();
  const [location] = useLocation();
  const basePath = `/us/${language}`;

  const services = [
    {
      icon: TrendingUp,
      title: t('service.development.title'),
      description: t('service.development.desc'),
      features: [
        t('service.development.feature1'),
        t('service.development.feature2'),
        t('service.development.feature3'),
        t('service.development.feature4'),
      ],
      isMain: true,
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663066460611/WaMxaejDVBiYfcRk.jpg',
    },
    {
      icon: Building2,
      title: t('service.property.title'),
      description: t('service.property.desc'),
      features: [
        t('service.property.feature1'),
        t('service.property.feature2'),
        t('service.property.feature3'),
        t('service.property.feature4'),
      ],
      isMain: false,
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663066460611/zhLbLLFJzSBdCJiq.jpg',
    },
    {
      icon: HomeIcon,
      title: t('service.vacation.title'),
      description: t('service.vacation.desc'),
      features: [
        t('service.vacation.feature1'),
        t('service.vacation.feature2'),
        t('service.vacation.feature3'),
        t('service.vacation.feature4'),
      ],
      isMain: false,
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663066460611/MacoEYqgQKDEOVOW.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-white" data-region="us">
      <SEOHead
        title={t('meta.title')}
        description={t('meta.description')}
        canonical={`https://www.tengcle.com/us/${language}`}
        locale={language === "ja" ? "ja_JP" : language === "zh" ? "zh_CN" : "en_US"}
        ogImage="/images/og-image-us.jpg"
        keywords={t('meta.keywords')}
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            generateOrganizationSchema({
              name: "Tengcle Development LLC",
              description: "Expert property management and vacation rental solutions in the USA.",
              url: "https://www.tengcle.com/us/en",
              logo: "https://www.tengcle.com/images/tengcle-logo-white.png",
              email: "info@tengcle.com",
              address: {
                street: "123 Business Ave",
                city: "New York",
                region: "NY",
                country: "US",
                postalCode: "10001"
              },
              sameAs: [
                "https://www.tengcle.com/hk/en",
                "https://www.tengcle.com/jp/ja"
              ]
            }),
            generateWebPageSchema({
              name: t('meta.title'),
              description: t('meta.description'),
              url: `https://www.tengcle.com/us/${language}`,
            })["@graph"][0]
          ]
        }}
      />
      <UsHeader />

      {/* Hero Section with Parallax */}
      <UsHeroSection basePath={basePath} t={t} />

      {/* Services Overview */}
      <section className="py-24 bg-light-gray">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="font-heading text-3xl md:text-4xl text-charcoal mb-4"
            >
              {t('services.title')}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate max-w-2xl mx-auto">
              {t('services.subtitle')}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`bg-white overflow-hidden us-card-hover ${service.isMain ? 'ring-2 ring-gold/30' : ''}`}
              >
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {service.isMain && (
                    <span className="absolute top-4 right-4 px-3 py-1 bg-gold text-purple-deep text-xs font-bold rounded-full shadow-lg">
                      {language === 'ja' ? 'メイン事業' : language === 'zh' ? '核心业务' : 'Core Business'}
                    </span>
                  )}
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <service.icon className="w-10 h-10 text-gold" />
                    <h3 className="font-heading text-xl text-charcoal">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-slate mb-6 text-sm">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-charcoal">
                        <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href={`${basePath}/services`}
              className="inline-flex items-center gap-2 text-purple us-link-hover"
            >
              {t('hero.cta.services')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gold text-sm tracking-widest uppercase mb-4">
                {t('about.subtitle')}
              </p>
              <h2 className="font-heading text-3xl md:text-4xl text-charcoal mb-6">
                {t('about.title')}
              </h2>
              <p className="text-slate leading-relaxed mb-8">
                {t('about.description')}
              </p>
              <div className="flex items-center gap-4">
                <Shield className="w-8 h-8 text-gold" />
                <div>
                  <p className="font-medium text-charcoal">Tengcle Development LLC</p>
                  <p className="text-sm text-slate">{t('company.role')}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                alt="Property Management"
                className="w-full aspect-[4/3] object-cover us-img-hover"
                loading="lazy"
                width="800"
                height="600"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-purple-deep">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-gray-300 mb-8">
              {t('cta.subtitle')}
            </p>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-purple-deep font-medium us-btn-hover"
            >
              {t('cta.button')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <UsFooter />
      
      {/* Cookie Consent Banner - Language aware */}
      <CookieConsent 
        lang={language as "en" | "ja" | "zh"} 
        privacyPolicyPath={`${basePath}/privacy`}
      />
    </div>
  );
}
