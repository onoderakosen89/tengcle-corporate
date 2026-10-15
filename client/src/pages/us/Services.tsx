import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Building2,
  Home as HomeIcon,
  ArrowRight,
  ExternalLink,
  TrendingUp,
} from "lucide-react";
import UsHeader from "@/components/us/Header";
import UsFooter from "@/components/us/Footer";
import GroupCompanyCards from "@/components/us/GroupCompanyCards";
import { useUsLanguage } from "@/contexts/UsLanguageContext";
import SEOHead, { generateBreadcrumbSchema } from "@/components/SEOHead";
import { PIPETECTOR_URL, usBusinessCopy, usCopy } from "@/data/usBusinesses";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function UsServices() {
  const { language, t: globalT } = useUsLanguage();
  const basePath = `/us/${language}`;
  const biz = usBusinessCopy.businesses;
  const externalNote = usCopy(usBusinessCopy.nav.externalNote, language);

  // The three existing detail pages under the building business.
  const buildingPages = [
    {
      icon: TrendingUp,
      title: globalT("service.development.title"),
      link: `${basePath}/services/property-development`,
    },
    {
      icon: Building2,
      title: globalT("service.property.title"),
      link: `${basePath}/services/property-management`,
    },
    {
      icon: HomeIcon,
      title: globalT("service.vacation.title"),
      link: `${basePath}/services/vacation-rentals`,
    },
  ];

  return (
    <div className="min-h-screen bg-white" data-region="us">
      <SEOHead
        title={usCopy(usBusinessCopy.meta.servicesTitle, language)}
        description={usCopy(usBusinessCopy.meta.servicesDescription, language)}
        keywords={
          language === "ja"
            ? "Tengcle Development LLC, 事業, 建物の再生, 不動産管理, NMR Pipetector, 赤錆対策, NJ"
            : language === "zh"
              ? "Tengcle Development LLC, 业务, 建筑再生, 物业管理, NMR Pipetector, 管道防锈, 新泽西"
              : "Tengcle Development LLC, businesses, building revitalization, property management, NMR Pipetector, New Jersey"
        }
        canonical={`https://www.tengcle.com/us/${language}/services`}
        locale={language === "ja" ? "ja_JP" : language === "zh" ? "zh_CN" : "en_US"}
        ogImage="/images/og-image.webp"
        structuredData={generateBreadcrumbSchema([
          { name: "Home", url: "https://www.tengcle.com/us" },
          {
            name: usCopy(biz.pageTitle, language),
            url: `https://www.tengcle.com/us/${language}/services`,
          },
        ])}
      />
      <UsHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-purple-deep overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 pattern-seigaiha" />
        </div>
        <div className="container relative z-10">
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
              Tengcle Development LLC
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-heading text-4xl md:text-5xl text-white mb-6"
            >
              {usCopy(biz.pageTitle, language)}
            </motion.h1>
          </motion.div>
        </div>
      </section>

      <main id="main-content" tabIndex={-1}>
        {/* 1. Building revitalization & management */}
        <section className="py-24">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid lg:grid-cols-2 gap-16 items-center"
              data-testid="business-building"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="font-heading text-3xl text-charcoal mb-4">
                  {usCopy(biz.building.name, language)}
                </h2>
                <p className="text-slate mb-8 leading-relaxed">
                  {usCopy(biz.building.desc, language)}
                </p>
                <ul className="space-y-3">
                  {buildingPages.map(page => (
                    <li key={page.link}>
                      <Link
                        href={page.link}
                        className="flex items-center gap-4 p-4 border border-gray-100 text-charcoal hover:border-gold hover:text-gold transition-colors group"
                      >
                        <page.icon className="w-6 h-6 text-gold flex-shrink-0" />
                        <span className="flex-1 font-medium">{page.title}</span>
                        <ArrowRight
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <img
                  src="/images/candidates/us-property-management-960.webp"
                  alt={usCopy(biz.building.alt, language)}
                  className="w-full aspect-[4/3] object-cover shadow-lg"
                  loading="lazy"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 2. NMR Pipetector */}
        <section className="py-24 bg-light-gray">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid lg:grid-cols-2 gap-16 items-center"
              data-testid="business-pipetector"
            >
              <motion.div variants={fadeInUp} className="lg:order-2">
                <h2 className="font-heading text-3xl text-charcoal mb-4">
                  {usCopy(biz.pipe.name, language)}
                </h2>
                <p className="text-slate mb-8 leading-relaxed">
                  {usCopy(biz.pipe.desc, language)}
                </p>
                <a
                  href={PIPETECTOR_URL}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-purple-deep font-medium us-btn-hover"
                >
                  {usCopy(biz.pipe.button, language)}
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  <span className="sr-only">({externalNote})</span>
                </a>
              </motion.div>
              <motion.div variants={fadeInUp} className="lg:order-1">
                <img
                  src="/images/us/home/pipetector-device-960.webp"
                  srcSet="/images/us/home/pipetector-device-480.webp 480w, /images/us/home/pipetector-device-960.webp 960w"
                  sizes="(min-width: 1024px) 560px, 100vw"
                  alt={usCopy(biz.pipe.alt, language)}
                  className="w-full aspect-[4/3] object-cover shadow-lg bg-white"
                  loading="lazy"
                  width="960"
                  height="720"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Group companies */}
        <section className="py-24">
          <div className="container">
            <h2 className="font-heading text-3xl md:text-4xl text-charcoal text-center mb-12">
              {usCopy(usBusinessCopy.group.title, language)}
            </h2>
            <GroupCompanyCards language={language} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-light-gray">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="font-heading text-3xl md:text-4xl text-charcoal mb-8">
                {usCopy(usBusinessCopy.contact.title, language)}
              </h2>
              <Link
                href={`${basePath}/contact`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-purple text-white font-medium hover:bg-purple-dark transition-colors"
              >
                {globalT("cta.button")}
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
