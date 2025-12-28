import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Building2, Home as HomeIcon, CheckCircle, ArrowRight } from "lucide-react";
import UsHeader from "@/components/us/Header";
import UsFooter from "@/components/us/Footer";
import { useUsLanguage } from "@/contexts/UsLanguageContext";
import SEOHead, { generateBreadcrumbSchema } from "@/components/SEOHead";

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
  const { language, t } = useUsLanguage();
  const [location] = useLocation();
  const basePath = `/us/${language}`;

  const services = [
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
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-white" data-region="us">
      <SEOHead
        title={t('services.title') + " | Tengcle LLC"}
        description={t('services.subtitle')}
        canonical={`https://www.tengcle.com/us/${language}/services`}
        locale={language === "ja" ? "ja_JP" : language === "zh" ? "zh_CN" : "en_US"}
        structuredData={generateBreadcrumbSchema([
          { name: "Home", url: "https://www.tengcle.com/us" },
          { name: t('services.title'), url: `https://www.tengcle.com/us/${language}/services` }
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
              Tengcle LLC
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-heading text-4xl md:text-5xl text-white mb-6"
            >
              {t('services.title')}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-300">
              {t('services.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24">
        <div className="container">
          <div className="space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
              >
                <motion.div
                  variants={fadeInUp}
                  className={index % 2 === 1 ? "lg:order-2" : ""}
                >
                  <service.icon className="w-12 h-12 text-gold mb-6" />
                  <h2 className="font-heading text-3xl text-charcoal mb-4">
                    {service.title}
                  </h2>
                  <p className="text-slate mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                        <span className="text-charcoal">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div
                  variants={fadeInUp}
                  className={index % 2 === 1 ? "lg:order-1" : ""}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full aspect-[4/3] object-cover shadow-lg"
                    loading="lazy"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
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
            <h2 className="font-heading text-3xl md:text-4xl text-charcoal mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-slate mb-8">
              {t('cta.subtitle')}
            </p>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-purple text-white font-medium hover:bg-purple-dark transition-colors"
            >
              {t('cta.button')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <UsFooter />
    </div>
  );
}
