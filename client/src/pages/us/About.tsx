import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Building2, MapPin, Globe, ArrowRight, ExternalLink } from "lucide-react";
import UsHeader from "@/components/us/Header";
import UsFooter from "@/components/us/Footer";
import { useUsLanguage } from "@/contexts/UsLanguageContext";
import SEOHead, { generateBreadcrumbSchema, generateOrganizationSchema } from "@/components/SEOHead";
import GroupCompanyCards from "@/components/us/GroupCompanyCards";
import { usBusinessCopy, usCopy } from "@/data/usBusinesses";
import { companyProfiles } from "@/data/companyProfiles";

const usCompany = companyProfiles.us;
const usAddress = usCompany.addresses[0];

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

export default function UsAbout() {
  const { language, t } = useUsLanguage();
  const [location] = useLocation();
  const basePath = `/us/${language}`;

  const companyInfoCopy = {
    heading: { en: "Company Information", ja: "会社情報", zh: "公司信息" },
    entity: {
      en: "New Jersey company",
      ja: "ニュージャージー州の法人",
      zh: "新泽西州公司",
    },
  };
  const aboutDescription = usCopy(usBusinessCopy.about.desc, language);

  return (
    <div className="min-h-screen bg-white" data-region="us">
      <SEOHead
        title={language === "ja" ? "会社概要 | Tengcle Development LLC ニュージャージー州" : language === "zh" ? "关于我们 | Tengcle Development LLC 新泽西州" : "About Us | Tengcle Development LLC, New Jersey"}
        description={language === "ja" ? "ニュージャージー州を拠点に、不動産管理、修繕調整、テナント対応、物件再生に取り組むTengcle Development LLCの会社情報。" : language === "zh" ? "Tengcle Development LLC立足新泽西州，开展物业管理、维修协调、租户支持与物业改造。" : "Company information for Tengcle Development LLC, focused on property management, repair coordination, tenant support, and revitalization in New Jersey."}
        keywords={language === "ja" ? "Tengcle Development LLC, 会社概要, ニュージャージー, 不動産管理, 物件再生" : language === "zh" ? "Tengcle Development LLC, 关于我们, 新泽西, 物业管理, 物业改造" : "Tengcle Development LLC, about us, New Jersey, property management, property revitalization"}
        canonical={`https://www.tengcle.com/us/${language}/about`}
        locale={language === "ja" ? "ja_JP" : language === "zh" ? "zh_CN" : "en_US"}
        ogImage="/images/og-image.webp"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            generateOrganizationSchema({
              name: usCompany.legalName,
              description: aboutDescription,
              url: "https://www.tengcle.com/us/en",
              email: usCompany.email,
              address: {
                street: usAddress.street,
                city: usAddress.city,
                region: usAddress.region,
                country: usAddress.country,
                postalCode: usAddress.postalCode,
              },
            }),
            generateBreadcrumbSchema([
              { name: "Tengcle", url: "https://www.tengcle.com/" },
              { name: usCompany.legalName, url: `https://www.tengcle.com/us/${language}` },
              { name: t('about.title'), url: `https://www.tengcle.com/us/${language}/about` }
            ])
          ]
        }}
      />
      <UsHeader />
      <main id="main-content" tabIndex={-1}>

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
              {t('about.subtitle')}
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-heading text-4xl md:text-5xl text-white mb-6"
            >
              {t('about.title')}
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl text-charcoal mb-6">
                {t('company.name')}
              </h2>
              <p className="text-slate leading-relaxed mb-6">
                {aboutDescription}
              </p>
              <div className="bg-light-gray p-6 mb-6">
                <h3 className="font-heading text-lg text-charcoal mb-4">{usCopy(companyInfoCopy.heading, language)}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-charcoal">Tengcle Development LLC</p>
                      <p className="text-sm text-slate">{t('company.role')}</p>
                      <p className="text-sm text-slate">{usCopy(companyInfoCopy.entity, language)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-charcoal">17 Hamilton Ave</p>
                      <p className="text-charcoal">Weehawken, NJ 07086</p>
                      <p className="text-charcoal">United States</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <Link
                        href="/us/en"
                        className="text-purple hover:text-gold transition-colors flex items-center gap-1"
                      >
                        tengcle.com/us
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/images/us/company-skyline.webp"
                alt="New York City"
                className="w-full aspect-[4/3] object-cover shadow-lg"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Group companies */}
      <section className="py-24 bg-light-gray">
        <div className="container">
          <h2 className="font-heading text-3xl md:text-4xl text-charcoal text-center mb-12">
            {usCopy(usBusinessCopy.group.title, language)}
          </h2>
          <GroupCompanyCards language={language} />
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
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-purple-deep font-medium hover:bg-gold-light transition-colors"
            >
              {t('cta.button')}
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
