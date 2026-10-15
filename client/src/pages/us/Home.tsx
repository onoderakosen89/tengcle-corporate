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
import { Link } from "wouter";
import { Shield, ArrowRight, ExternalLink } from "lucide-react";
import UsHeader from "@/components/us/Header";
import UsFooter from "@/components/us/Footer";
import { useUsLanguage } from "@/contexts/UsLanguageContext";
import SEOHead, {
  generateOrganizationSchema,
} from "@/components/SEOHead";
import GroupCompanyCards from "@/components/us/GroupCompanyCards";
import { companyProfiles } from "@/data/companyProfiles";
import { PIPETECTOR_URL, usBusinessCopy, usCopy } from "@/data/usBusinesses";

// Animation variants - USA: Bold & Dynamic
const easeAmerican: Easing = [0.4, 0, 0.2, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeAmerican },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

// Hero Section with Parallax Effect - Bold American Style
function UsHeroSection({
  basePath,
  language,
}: {
  basePath: string;
  language: "en" | "ja" | "zh";
}) {
  const hero = usBusinessCopy.hero;
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms - Bold and dynamic movement
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center bg-purple-deep overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundY, scale: backgroundScale }}
      >
        <img
          src="/images/us/home/hero-1280.webp"
          srcSet="/images/us/home/hero-768.webp 768w, /images/us/home/hero-1280.webp 1280w, /images/us/home/hero-1920.webp 1920w"
          sizes="100vw"
          alt="New Jersey and Manhattan Skyline at Sunset"
          className="w-full h-[120%] object-cover opacity-60"
          width="1920"
          height="1072"
          fetchPriority="high"
          decoding="async"
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
            {usCopy(hero.tagline, language)}
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
          >
            {usCopy<readonly string[]>(hero.titleLines, language).map(line => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-300 mb-8 leading-relaxed"
          >
            {usCopy(hero.subtitle, language)}
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
            <Link
              href={`${basePath}/services`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-purple-deep font-medium us-btn-hover"
            >
              {usCopy(hero.ctaBusinesses, language)}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white us-btn-hover"
            >
              {usCopy(hero.ctaContact, language)}
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
  const basePath = `/us/${language}`;
  const company = companyProfiles.us;
  const address = company.addresses[0];

  const biz = usBusinessCopy.businesses;
  const businesses = [
    {
      key: "building",
      name: usCopy(biz.building.name, language),
      description: usCopy(biz.building.desc, language),
      buttonLabel: usCopy(biz.building.button, language),
      alt: usCopy(biz.building.alt, language),
      image: "/images/candidates/us-property-management-960.webp",
      imageSrcSet:
        "/images/candidates/us-property-management-480.webp 480w, /images/candidates/us-property-management-960.webp 960w",
      width: 960,
      height: 640,
      href: `${basePath}/services`,
      external: false,
    },
    {
      key: "pipetector",
      name: usCopy(biz.pipe.name, language),
      description: usCopy(biz.pipe.desc, language),
      buttonLabel: usCopy(biz.pipe.button, language),
      alt: usCopy(biz.pipe.alt, language),
      image: "/images/us/home/pipetector-device-960.webp",
      imageSrcSet:
        "/images/us/home/pipetector-device-480.webp 480w, /images/us/home/pipetector-device-960.webp 960w",
      width: 960,
      height: 720,
      href: PIPETECTOR_URL,
      external: true,
    },
  ];
  const externalNote = usCopy(usBusinessCopy.nav.externalNote, language);

  return (
    <div className="min-h-screen bg-white" data-region="us">
      <SEOHead
        title={t("meta.title")}
        description={usCopy(usBusinessCopy.meta.homeDescription, language)}
        canonical={`https://www.tengcle.com/us/${language}`}
        locale={
          language === "ja" ? "ja_JP" : language === "zh" ? "zh_CN" : "en_US"
        }
        ogImage="/images/og-image.webp"
        keywords={t("meta.keywords")}
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            generateOrganizationSchema({
              name: company.legalName,
              description:
                "New Jersey-based revitalization and management of older apartment buildings, and pilot trials of the NMR Pipetector rust-control device.",
              url: "https://www.tengcle.com/us/en",
              logo: "https://www.tengcle.com/images/tengcle-logo-white.png",
              email: company.email,
              address: {
                street: address.street,
                city: address.city,
                region: address.region,
                country: address.country,
                postalCode: address.postalCode,
              },
            }),
          ],
        }}
      />
      <UsHeader />

      <main id="main-content" tabIndex={-1}>
        {/* Hero Section with Parallax */}
        <UsHeroSection basePath={basePath} language={language} />

        {/* Businesses */}
        <section className="py-24 bg-light-gray" id="businesses">
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
                className="font-heading text-3xl md:text-4xl text-charcoal"
              >
                {usCopy(biz.title, language)}
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            >
              {businesses.map(item => (
                <motion.div
                  key={item.key}
                  variants={fadeInUp}
                  className="bg-white overflow-hidden us-card-hover flex flex-col"
                  data-testid={`business-card-${item.key}`}
                >
                  <div className="relative aspect-[3/2] overflow-hidden bg-white">
                    <img
                      src={item.image}
                      srcSet={item.imageSrcSet}
                      sizes="(min-width: 1024px) 512px, (min-width: 768px) 45vw, 100vw"
                      alt={item.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      width={item.width}
                      height={item.height}
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="font-heading text-xl text-charcoal mb-4">
                      {item.name}
                    </h3>
                    <p className="text-slate text-sm leading-relaxed mb-8">
                      {item.description}
                    </p>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener"
                        className="mt-auto self-start inline-flex items-center gap-2 px-6 py-3 bg-gold text-purple-deep font-medium us-btn-hover"
                        data-testid="pipetector-pilot-card"
                      >
                        {item.buttonLabel}
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        <span className="sr-only">({externalNote})</span>
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="mt-auto self-start inline-flex items-center gap-2 px-6 py-3 bg-gold text-purple-deep font-medium us-btn-hover"
                      >
                        {item.buttonLabel}
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Group companies */}
        <section className="py-24" id="group">
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-3xl md:text-4xl text-charcoal text-center mb-12"
            >
              {usCopy(usBusinessCopy.group.title, language)}
            </motion.h2>
            <GroupCompanyCards language={language} />
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 bg-light-gray">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <p className="text-gold text-sm tracking-widest uppercase mb-4">
                {t("about.subtitle")}
              </p>
              <h2 className="font-heading text-3xl md:text-4xl text-charcoal mb-6">
                {t("about.title")}
              </h2>
              <p className="text-slate leading-relaxed mb-8">
                {usCopy(usBusinessCopy.about.desc, language)}
              </p>
              <div className="inline-flex items-center gap-4 text-left">
                <Shield className="w-8 h-8 text-gold" />
                <div>
                  <p className="font-medium text-charcoal">
                    Tengcle Development LLC
                  </p>
                  <p className="text-sm text-slate">{t("company.role")}</p>
                </div>
              </div>
            </motion.div>
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
                {usCopy(usBusinessCopy.contact.title, language)}
              </h2>
              <Link
                href={`${basePath}/contact`}
                className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-gold text-purple-deep font-medium us-btn-hover"
              >
                {t("cta.button")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <UsFooter />
    </div>
  );
}
