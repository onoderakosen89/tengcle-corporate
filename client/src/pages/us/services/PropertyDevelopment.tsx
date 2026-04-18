/**
 * US Property Development Service Page
 * 
 * Design Philosophy:
 * - Bold American style with strong CTAs
 * - Focus on future vision and value creation
 * - Newly registered company - emphasize what we WILL do
 */

import { useRef } from "react";
import { motion, useScroll, useTransform, type Easing } from "framer-motion";
import { Link } from "wouter";
import { 
  Building2, 
  TrendingUp, 
  Wrench, 
  Shield, 
  ArrowRight, 
  CheckCircle,
  Target,
  Layers,
  BarChart3,
  Home
} from "lucide-react";
import UsHeader from "@/components/us/Header";
import UsFooter from "@/components/us/Footer";
import { useUsLanguage } from "@/contexts/UsLanguageContext";
import SEOHead from "@/components/SEOHead";

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

// Translations for this page
const pageTranslations = {
  'page.title': {
    en: 'Property Development',
    ja: '不動産開発',
    zh: '房地产开发',
  },
  'page.subtitle': {
    en: 'Transforming Underperforming Assets into High-Value Properties',
    ja: '問題物件を高価値不動産へ再生',
    zh: '将低效资产转化为高价值物业',
  },
  'page.description': {
    en: 'Our core business focuses on acquiring distressed or underperforming properties, revitalizing them through strategic renovation, and holding them as long-term income-generating assets.',
    ja: '私たちの中核事業は、問題を抱えた物件や低パフォーマンス物件を取得し、戦略的な修繕・改修によって再生させ、長期的な収益資産として保有することです。',
    zh: '我们的核心业务专注于收购困境或低效物业，通过战略性翻新使其焕发新生，并作为长期收益资产持有。',
  },
  'vision.title': {
    en: 'Our Vision',
    ja: 'ビジョン',
    zh: '我们的愿景',
  },
  'vision.description': {
    en: 'As a newly established company in January 2026, Tengcle Development LLC is positioned to capitalize on opportunities in the NJ/NY real estate market. We combine Japanese attention to detail with American market expertise to create lasting value.',
    ja: '2026年1月に設立されたTengcle Development LLCは、NJ/NYの不動産市場における機会を最大限に活用する体制を整えています。日本式のきめ細やかさとアメリカ市場の専門知識を融合し、持続的な価値を創造します。',
    zh: '作为2026年1月新成立的公司，Tengcle Development LLC致力于把握新泽西/纽约房地产市场的机遇。我们将日式精细服务与美国市场专业知识相结合，创造持久价值。',
  },
  'process.title': {
    en: 'Our Development Process',
    ja: '開発プロセス',
    zh: '开发流程',
  },
  'process.step1.title': {
    en: 'Acquisition',
    ja: '物件取得',
    zh: '物业收购',
  },
  'process.step1.desc': {
    en: 'Identify and acquire distressed, undervalued, or problem properties with high potential for value appreciation.',
    ja: '価値向上の可能性が高い、問題物件・低評価物件を特定し取得。',
    zh: '识别并收购具有高增值潜力的困境、低估或问题物业。',
  },
  'process.step2.title': {
    en: 'Renovation & Revitalization',
    ja: '修繕・再生',
    zh: '翻新与复兴',
  },
  'process.step2.desc': {
    en: 'Execute comprehensive renovation plans to address structural issues, modernize facilities, and enhance property appeal.',
    ja: '構造的問題の解決、設備の近代化、物件の魅力向上を含む包括的な修繕計画を実行。',
    zh: '执行全面翻新计划，解决结构问题，现代化设施，提升物业吸引力。',
  },
  'process.step3.title': {
    en: 'Value Enhancement',
    ja: '価値向上',
    zh: '价值提升',
  },
  'process.step3.desc': {
    en: 'Implement strategic improvements to maximize property value and rental income potential.',
    ja: '物件価値と賃料収入ポテンシャルを最大化する戦略的改善を実施。',
    zh: '实施战略性改进，最大化物业价值和租金收入潜力。',
  },
  'process.step4.title': {
    en: 'Long-term Holding',
    ja: '長期保有',
    zh: '长期持有',
  },
  'process.step4.desc': {
    en: 'Hold revitalized properties as income-generating assets, operating them as vacation rentals, hotels, dormitories, or commercial spaces.',
    ja: '再生した物件を収益資産として長期保有し、民泊・ホテル・寮・事務所等として運用。',
    zh: '将复兴后的物业作为收益资产长期持有，运营为民宿、酒店、宿舍或商业空间。',
  },
  'benefits.title': {
    en: 'Why Property Development?',
    ja: 'なぜ不動産開発なのか',
    zh: '为什么选择房地产开发？',
  },
  'benefit1.title': {
    en: 'Value Creation',
    ja: '価値創造',
    zh: '价值创造',
  },
  'benefit1.desc': {
    en: 'Transform underperforming assets into profitable, high-value properties through strategic renovation.',
    ja: '戦略的な修繕により、低パフォーマンス資産を収益性の高い高価値物件に転換。',
    zh: '通过战略性翻新，将低效资产转化为高价值盈利物业。',
  },
  'benefit2.title': {
    en: 'Stable Income Stream',
    ja: '安定収益',
    zh: '稳定收入',
  },
  'benefit2.desc': {
    en: 'Generate consistent rental income through diversified property operations.',
    ja: '多様な物件運用を通じて安定した賃料収入を創出。',
    zh: '通过多元化物业运营产生稳定的租金收入。',
  },
  'benefit3.title': {
    en: 'Asset Appreciation',
    ja: '資産価値上昇',
    zh: '资产增值',
  },
  'benefit3.desc': {
    en: 'Benefit from long-term property value appreciation in the growing NJ/NY market.',
    ja: '成長するNJ/NY市場における長期的な物件価値上昇の恩恵を享受。',
    zh: '受益于新泽西/纽约市场增长带来的长期物业增值。',
  },
  'benefit4.title': {
    en: 'Risk Mitigation',
    ja: 'リスク分散',
    zh: '风险分散',
  },
  'benefit4.desc': {
    en: 'Diversified portfolio across multiple property types reduces market volatility exposure.',
    ja: '複数の物件タイプにまたがる分散ポートフォリオにより市場変動リスクを軽減。',
    zh: '跨多种物业类型的多元化投资组合降低市场波动风险。',
  },
  'target.title': {
    en: 'Target Properties',
    ja: '対象物件',
    zh: '目标物业',
  },
  'target.item1': {
    en: 'Distressed residential properties requiring renovation',
    ja: '修繕が必要な住宅物件',
    zh: '需要翻新的困境住宅物业',
  },
  'target.item2': {
    en: 'Underperforming multi-family buildings',
    ja: '低パフォーマンスの集合住宅',
    zh: '低效的多户型建筑',
  },
  'target.item3': {
    en: 'Commercial spaces with revitalization potential',
    ja: '再生ポテンシャルのある商業スペース',
    zh: '具有复兴潜力的商业空间',
  },
  'target.item4': {
    en: 'Properties suitable for short-term rental conversion',
    ja: '短期賃貸への転換に適した物件',
    zh: '适合转换为短租的物业',
  },
  'cta.title': {
    en: 'Partner With Us',
    ja: 'パートナーシップ',
    zh: '与我们合作',
  },
  'cta.description': {
    en: 'Interested in property development opportunities or investment partnerships? Contact us to explore how we can create value together.',
    ja: '不動産開発の機会や投資パートナーシップにご興味がありますか？共に価値を創造する方法をご相談ください。',
    zh: '对房地产开发机会或投资合作感兴趣？联系我们，探讨如何共同创造价值。',
  },
  'cta.button': {
    en: 'Contact Us',
    ja: 'お問い合わせ',
    zh: '联系我们',
  },
  'meta.title': {
    en: 'Property Development | Tengcle Development LLC NJ - Real Estate Value Creation',
    ja: '不動産開発 | Tengcle Development LLC NJ - 物件再生・価値創造',
    zh: '房地产开发 | Tengcle Development LLC NJ - 物业再生·价值创造',
  },
  'meta.description': {
    en: 'Transform distressed properties into high-value assets. Property acquisition, renovation & long-term holding in NJ/NY metro area.',
    ja: '問題物件を高価値資産へ再生。NJ/NYエリアでの物件取得・修繕・長期保有。',
    zh: '将困境物业转化为高价值资产。新泽西/纽约地区的物业收购、翻新与长期持有。',
  },
  'meta.keywords': {
    en: 'property development, real estate development, NJ real estate, distressed properties, renovation, Tengcle Development LLC',
    ja: '不動産開発, 物件再生, NJ不動産, 問題物件, 修繕, Tengcle Development LLC',
    zh: '房地产开发, 物业再生, NJ房地产, 困境物业, 翻新, Tengcle Development LLC',
  },
};

export default function PropertyDevelopment() {
  const { language, t: globalT } = useUsLanguage();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Local translation function
  const t = (key: string) => {
    const translation = pageTranslations[key as keyof typeof pageTranslations];
    if (translation) {
      return translation[language] || translation.en;
    }
    return globalT(key);
  };

  const basePath = `/us/${language}`;

  const processSteps = [
    { icon: Target, titleKey: 'process.step1.title', descKey: 'process.step1.desc', number: '01', image: '/images/us-process-acquisition.jpg' },
    { icon: Wrench, titleKey: 'process.step2.title', descKey: 'process.step2.desc', number: '02', image: '/images/us-process-renovation.jpg' },
    { icon: TrendingUp, titleKey: 'process.step3.title', descKey: 'process.step3.desc', number: '03', image: '/images/us-process-value.jpg' },
    { icon: Building2, titleKey: 'process.step4.title', descKey: 'process.step4.desc', number: '04', image: '/images/us-process-holding.jpg' },
  ];

  const benefits = [
    { icon: Layers, titleKey: 'benefit1.title', descKey: 'benefit1.desc' },
    { icon: BarChart3, titleKey: 'benefit2.title', descKey: 'benefit2.desc' },
    { icon: TrendingUp, titleKey: 'benefit3.title', descKey: 'benefit3.desc' },
    { icon: Shield, titleKey: 'benefit4.title', descKey: 'benefit4.desc' },
  ];

  return (
    <>
      <SEOHead
        title={t('meta.title')}
        description={t('meta.description')}
        keywords={t('meta.keywords')}
        canonical={`https://www.tengcle.com${basePath}/services/property-development`}
        locale={language === 'ja' ? 'ja_JP' : language === 'zh' ? 'zh_CN' : 'en_US'}
        ogImage="/images/og-image-us.jpg"
      />
      <UsHeader />
      
      <main className="bg-white">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-[70vh] flex items-center bg-purple-deep overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{ y: backgroundY }}
          >
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663066460611/WaMxaejDVBiYfcRk.jpg"
              alt="Property Development - Before and After"
              className="w-full h-[120%] object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-deep/80 via-purple-deep/60 to-transparent" />
          </motion.div>

          <motion.div
            className="container relative z-10 pt-32 pb-20"
            style={{ opacity }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-3xl"
            >
              <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-4">
                <Link href={`${basePath}/services`} className="text-gold/80 hover:text-gold transition-colors">
                  {globalT('nav.services')}
                </Link>
                <span className="text-gold/50">/</span>
                <span className="text-gold">{t('page.title')}</span>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
              >
                {t('page.title')}
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl text-gold mb-6"
              >
                {t('page.subtitle')}
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-gray-300 leading-relaxed"
              >
                {t('page.description')}
              </motion.p>
            </motion.div>
          </motion.div>
        </section>

        {/* Vision Section */}
        <section className="py-20 bg-gradient-to-b from-purple-deep to-purple-deep/95">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.h2
                variants={fadeInUp}
                className="font-heading text-3xl md:text-4xl text-white mb-6"
              >
                {t('vision.title')}
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-gray-300 leading-relaxed"
              >
                {t('vision.description')}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gray-50">
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
                className="font-heading text-3xl md:text-4xl text-purple-deep mb-4"
              >
                {t('process.title')}
              </motion.h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full">
                    {/* Process Image */}
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={step.image}
                        alt={t(step.titleKey)}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 text-4xl font-heading text-white/80 drop-shadow-lg">
                        {step.number}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4 -mt-10 relative z-10 border-4 border-white shadow-md">
                        <step.icon className="w-6 h-6 text-gold" />
                      </div>
                      <h3 className="font-heading text-lg text-purple-deep mb-2">
                        {t(step.titleKey)}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {t(step.descKey)}
                      </p>
                    </div>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-8 h-8 text-gold/50" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
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
                className="font-heading text-3xl md:text-4xl text-purple-deep mb-4"
              >
                {t('benefits.title')}
              </motion.h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="flex gap-4 p-6 rounded-xl border border-gray-100 hover:border-gold/30 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-purple-deep/5 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-purple-deep" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg text-purple-deep mb-2">
                      {t(benefit.titleKey)}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {t(benefit.descKey)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Target Properties Section */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="max-w-4xl mx-auto"
            >
              <motion.h2
                variants={fadeInUp}
                className="font-heading text-3xl md:text-4xl text-purple-deep mb-8 text-center"
              >
                {t('target.title')}
              </motion.h2>
              <div className="grid md:grid-cols-2 gap-4">
                {['target.item1', 'target.item2', 'target.item3', 'target.item4'].map((key, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm"
                  >
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                    <span className="text-gray-700">{t(key)}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-purple-deep">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center max-w-2xl mx-auto"
            >
              <motion.h2
                variants={fadeInUp}
                className="font-heading text-3xl md:text-4xl text-white mb-6"
              >
                {t('cta.title')}
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-gray-300 mb-8 leading-relaxed"
              >
                {t('cta.description')}
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link
                  href={`${basePath}/contact`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-purple-deep font-medium hover:bg-gold/90 transition-colors"
                >
                  {t('cta.button')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <UsFooter />
    </>
  );
}
