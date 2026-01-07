import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Building2, Home as HomeIcon, CheckCircle, ArrowRight, TrendingUp, Wrench } from "lucide-react";
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

// Additional translations for new service
const serviceTranslations = {
  'service.development.title': {
    en: 'Property Development',
    ja: '不動産開発',
    zh: '房地产开发',
  },
  'service.development.desc': {
    en: 'Our core business focuses on acquiring distressed or underperforming properties, revitalizing them through strategic renovation, and holding them as long-term income-generating assets.',
    ja: '私たちの中核事業は、問題を抱えた物件や低パフォーマンス物件を取得し、戦略的な修繕・改修によって再生させ、長期的な収益資産として保有することです。',
    zh: '我们的核心业务专注于收购困境或低效物业，通过战略性翻新使其焕发新生，并作为长期收益资产持有。',
  },
  'service.development.feature1': {
    en: 'Distressed Property Acquisition',
    ja: '問題物件の取得',
    zh: '困境物业收购',
  },
  'service.development.feature2': {
    en: 'Strategic Renovation & Revitalization',
    ja: '戦略的修繕・再生',
    zh: '战略性翻新与复兴',
  },
  'service.development.feature3': {
    en: 'Value Enhancement',
    ja: '価値向上',
    zh: '价值提升',
  },
  'service.development.feature4': {
    en: 'Long-term Asset Holding',
    ja: '長期資産保有',
    zh: '长期资产持有',
  },
  'learn.more': {
    en: 'Learn More',
    ja: '詳細を見る',
    zh: '了解更多',
  },
};

export default function UsServices() {
  const { language, t: globalT } = useUsLanguage();
  const [location] = useLocation();
  const basePath = `/us/${language}`;

  // Combined translation function
  const t = (key: string) => {
    const localTranslation = serviceTranslations[key as keyof typeof serviceTranslations];
    if (localTranslation) {
      return localTranslation[language] || localTranslation.en;
    }
    return globalT(key);
  };

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
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      link: `${basePath}/services/property-development`,
      isMain: true,
    },
    {
      icon: Building2,
      title: globalT('service.property.title'),
      description: globalT('service.property.desc'),
      features: [
        globalT('service.property.feature1'),
        globalT('service.property.feature2'),
        globalT('service.property.feature3'),
        globalT('service.property.feature4'),
      ],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
      link: `${basePath}/services/property-management`,
      isMain: false,
    },
    {
      icon: HomeIcon,
      title: globalT('service.vacation.title'),
      description: globalT('service.vacation.desc'),
      features: [
        globalT('service.vacation.feature1'),
        globalT('service.vacation.feature2'),
        globalT('service.vacation.feature3'),
        globalT('service.vacation.feature4'),
      ],
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      link: `${basePath}/services/vacation-rentals`,
      isMain: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white" data-region="us">
      <SEOHead
        title={language === "ja" ? "サービス | Tengcle Development LLC - 不動産開発・管理・民泊" : language === "zh" ? "服务内容 | Tengcle Development LLC - 房地产开发·管理·短租" : "Services | Tengcle Development LLC - Real Estate Development & Management"}
        description={language === "ja" ? "不動産開発、不動産管理、民泊運用サービス。NJ・ニューヨークエリア。" : language === "zh" ? "房地产开发、物业管理、短租运营服务。新泽西·纽约地区。" : "Real estate development, property management & vacation rental services. NJ & NY metropolitan area."}
        keywords={language === "ja" ? "Tengcle Development LLC, サービス, 不動産開発, 不動産管理, 民泊" : language === "zh" ? "Tengcle Development LLC, 服务, 房地产开发, 物业管理, 短租" : "Tengcle Development LLC, services, real estate development, property management, vacation rentals"}
        canonical={`https://www.tengcle.com/us/${language}/services`}
        locale={language === "ja" ? "ja_JP" : language === "zh" ? "zh_CN" : "en_US"}
        structuredData={generateBreadcrumbSchema([
          { name: "Home", url: "https://www.tengcle.com/us" },
          { name: globalT('services.title'), url: `https://www.tengcle.com/us/${language}/services` }
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
              {globalT('services.title')}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-300">
              {globalT('services.subtitle')}
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
                  <div className="flex items-center gap-3 mb-6">
                    <service.icon className="w-12 h-12 text-gold" />
                    {service.isMain && (
                      <span className="px-3 py-1 bg-gold/10 text-gold text-sm font-medium rounded-full">
                        {language === 'ja' ? 'メイン事業' : language === 'zh' ? '核心业务' : 'Core Business'}
                      </span>
                    )}
                  </div>
                  <h2 className="font-heading text-3xl text-charcoal mb-4">
                    {service.title}
                  </h2>
                  <p className="text-slate mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-4 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                        <span className="text-charcoal">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={service.link}
                    className="inline-flex items-center gap-2 text-purple-deep font-medium hover:text-gold transition-colors group"
                  >
                    {t('learn.more')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
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
              {globalT('cta.title')}
            </h2>
            <p className="text-slate mb-8">
              {globalT('cta.subtitle')}
            </p>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-purple text-white font-medium hover:bg-purple-dark transition-colors"
            >
              {globalT('cta.button')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <UsFooter />
    </div>
  );
}
