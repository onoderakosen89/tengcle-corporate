import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Building2, MapPin, Globe, ArrowRight, ExternalLink } from "lucide-react";
import UsHeader from "@/components/us/Header";
import UsFooter from "@/components/us/Footer";
import { useUsLanguage } from "@/contexts/UsLanguageContext";
import SEOHead, { generateBreadcrumbSchema, generateOrganizationSchema } from "@/components/SEOHead";
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

  const groupOffices = [
    {
      flag: "🇭🇰",
      name: "Tengcle Limited",
      role: "Affiliated Company",
      location: "Hong Kong",
      href: "/hk/en",
    },
    {
      flag: "🇯🇵",
      name: "株式会社Tengcle",
      role: "Affiliated Company",
      location: "Tokyo, Japan",
      href: "/jp/ja",
    },
    {
      flag: "🇺🇸",
      name: "Tengcle Development LLC",
      role: "Affiliated Company",
      location: "Weehawken, NJ",
      href: basePath,
      current: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white" data-region="us">
      <SEOHead
        title={language === "ja" ? "会社概要 | Tengcle Development LLC ニュージャージー州" : language === "zh" ? "关于我们 | Tengcle Development LLC 新泽西州" : "About Us | Tengcle Development LLC, New Jersey"}
        description={language === "ja" ? "2026年1月5日にニュージャージー州で設立されたTengcle Development LLCの会社情報。" : language === "zh" ? "Tengcle Development LLC于2026年1月5日在新泽西州成立。" : "Tengcle Development LLC was formed in New Jersey on 5 January 2026."}
        keywords={language === "ja" ? "Tengcle Development LLC, 会社概要, ニュージャージー, 不動産開発" : language === "zh" ? "Tengcle Development LLC, 关于我们, 新泽西, 房地产开发" : "Tengcle Development LLC, about us, New Jersey, real estate development"}
        canonical={`https://www.tengcle.com/us/${language}/about`}
        locale={language === "ja" ? "ja_JP" : language === "zh" ? "zh_CN" : "en_US"}
        ogImage="/images/og-image.webp"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            generateOrganizationSchema({
              name: usCompany.legalName,
              description: t('about.description'),
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
                {t('about.description')}
              </p>
              <div className="bg-light-gray p-6 mb-6">
                <h3 className="font-heading text-lg text-charcoal mb-4">Company Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-charcoal">Tengcle Development LLC</p>
                      <p className="text-sm text-slate">{t('company.role')}</p>
                      <p className="text-sm text-slate">Formed 5 January 2026</p>
                      <p className="text-sm text-slate">New Jersey company</p>
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
                src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80"
                alt="New York City"
                className="w-full aspect-[4/3] object-cover shadow-lg"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tengcle related companies */}
      <section className="py-24 bg-light-gray">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="flex justify-center mb-4">
              <Globe className="w-12 h-12 text-gold" />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-heading text-3xl md:text-4xl text-charcoal mb-4"
            >
              Tengcle Related Companies
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate max-w-2xl mx-auto">
              Related companies, each a separate legal entity in its jurisdiction
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {groupOffices.map((office, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Link
                  href={office.href}
                  className={`block p-8 transition-all ${office.current
                    ? "bg-purple text-white"
                    : "bg-white hover:shadow-lg"
                    }`}
                >
                  <span className="text-4xl mb-4 block">{office.flag}</span>
                  <h3 className={`font-heading text-xl mb-2 ${office.current ? "text-white" : "text-charcoal"
                    }`}>
                    {office.name}
                  </h3>
                  <p className={`text-sm mb-2 ${office.current ? "text-gold" : "text-gold"
                    }`}>
                    {office.role}
                  </p>
                  <p className={`text-sm ${office.current ? "text-gray-300" : "text-slate"
                    }`}>
                    {office.location}
                  </p>
                </Link>
              </motion.div>
            ))}
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
