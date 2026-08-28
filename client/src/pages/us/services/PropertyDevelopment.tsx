/**
 * US Property Development Service Page
 * 
 * Design Philosophy:
 * - Bold American style with strong CTAs
 * - Focus on hands-on property improvement and value creation
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
    en: 'Property Revitalization',
    ja: '物件再生・価値向上',
    zh: '物业改造与价值提升',
  },
  'page.subtitle': {
    en: 'Practical Improvements for Lasting Property Value',
    ja: '実務的な改善で、物件の価値を長く育てる',
    zh: '以务实改进培育长期物业价值',
  },
  'page.description': {
    en: 'We assess each property’s condition and operations, then coordinate repairs and practical improvements to strengthen usability, stability, and long-term value.',
    ja: '物件の状態と運営上の課題を整理し、修繕や実務的な改善を通じて、使いやすさ、安定性、長期的な価値の向上を図ります。',
    zh: '我们梳理物业现状与运营问题，通过维修和务实改进，提升使用体验、运营稳定性与长期价值。',
  },
  'vision.title': {
    en: 'Our Vision',
    ja: 'ビジョン',
    zh: '我们的愿景',
  },
  'vision.description': {
    en: 'Our current work is grounded in New Jersey. We assess each property carefully and consider broader NJ/NY opportunities individually from a long-term operating perspective.',
    ja: '現在の実務はニュージャージー州を基盤としています。物件ごとに丁寧に状況を確認し、NJ/NYのその他の案件は長期的な運営視点から個別に検討します。',
    zh: '目前的实务以新泽西州为基础。我们逐项审慎评估物业，并从长期运营角度个别考虑新泽西／纽约的其他机会。',
  },
  'process.title': {
    en: 'Our Revitalization Process',
    ja: '物件再生のプロセス',
    zh: '物业改造流程',
  },
  'process.step1.title': {
    en: 'Assessment',
    ja: '現状整理',
    zh: '现状评估',
  },
  'process.step1.desc': {
    en: 'Review property condition, tenant matters, repair history, and operating priorities before defining the work required.',
    ja: '物件の状態、テナント対応、修繕履歴、運営上の優先事項を確認し、必要な対応を整理します。',
    zh: '确认物业状况、租户事项、维修记录与运营重点，明确所需工作。',
  },
  'process.step2.title': {
    en: 'Renovation & Revitalization',
    ja: '修繕・再生',
    zh: '翻新与复兴',
  },
  'process.step2.desc': {
    en: 'Define repair priorities, coordinate suitable contractors, and follow approved work through scheduling and completion.',
    ja: '修繕の優先順位を定め、適切な業者を手配し、承認された工事の日程調整から完了確認までを行います。',
    zh: '确定维修优先级，协调合适的承包商，并跟进已批准工作从排期到完工。',
  },
  'process.step3.title': {
    en: 'Value Enhancement',
    ja: '価値向上',
    zh: '价值提升',
  },
  'process.step3.desc': {
    en: 'Prioritize improvements that support property usability, operating stability, and sustainable rental performance.',
    ja: '物件の使いやすさ、運営の安定性、持続的な賃貸運用につながる改善を優先します。',
    zh: '优先实施有助于提升使用体验、运营稳定性与可持续租赁表现的改进。',
  },
  'process.step4.title': {
    en: 'Stable Operations',
    ja: '安定運営',
    zh: '稳定运营',
  },
  'process.step4.desc': {
    en: 'Support ongoing management, maintenance planning, and tenant communication so improvements remain effective over time.',
    ja: '改善後も管理、修繕計画、テナント対応を継続し、物件の状態と価値を安定させます。',
    zh: '持续支持物业管理、维修规划与租户沟通，使改善效果长期保持。',
  },
  'benefits.title': {
    en: 'Why Property Revitalization?',
    ja: 'なぜ物件再生なのか',
    zh: '为什么进行物业改造？',
  },
  'benefit1.title': {
    en: 'Value Creation',
    ja: '価値創造',
    zh: '价值创造',
  },
  'benefit1.desc': {
    en: 'Address deferred repairs and operational issues so a property can serve its intended use more reliably.',
    ja: '先送りされていた修繕や運営課題に対応し、物件本来の用途をより安定して果たせる状態へ整えます。',
    zh: '处理积压维修与运营问题，使物业能够更稳定地发挥其用途。',
  },
  'benefit2.title': {
    en: 'Operating Stability',
    ja: '運営の安定性',
    zh: '运营稳定性',
  },
  'benefit2.desc': {
    en: 'Clear maintenance priorities and reliable follow-through support more stable property operations.',
    ja: '修繕の優先順位と確実な対応を明確にすることで、より安定した物件運営を支えます。',
    zh: '明确维修优先级并可靠跟进，有助于提升物业运营稳定性。',
  },
  'benefit3.title': {
    en: 'Value Preservation',
    ja: '価値の維持・向上',
    zh: '价值维护与提升',
  },
  'benefit3.desc': {
    en: 'Planned repairs and operational improvements help preserve usability and support long-term value.',
    ja: '計画的な修繕と運営改善により、使いやすさを保ち、長期的な価値形成を支えます。',
    zh: '通过有计划的维修与运营改善，保持使用价值并支持长期价值形成。',
  },
  'benefit4.title': {
    en: 'Risk Mitigation',
    ja: 'リスク分散',
    zh: '风险分散',
  },
  'benefit4.desc': {
    en: 'Clear priorities and staged improvements help control cost, disruption, and operational risk.',
    ja: '優先順位を明確にし、段階的に改善することで、費用、業務への影響、運営リスクを抑えます。',
    zh: '通过明确优先级与分阶段改善，控制成本、运营影响和相关风险。',
  },
  'target.title': {
    en: 'Properties We Support',
    ja: '対応する物件',
    zh: '可支持的物业',
  },
  'target.item1': {
    en: 'Residential properties requiring repair or operational improvement',
    ja: '修繕が必要な住宅物件',
    zh: '需要维修或运营改善的住宅物业',
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
    en: 'Contact us to discuss property operations, repair priorities, and practical ways to strengthen long-term value.',
    ja: '物件運営、修繕の優先順位、長期的な価値向上についてご相談ください。',
    zh: '欢迎就物业运营、维修优先级及长期价值提升与我们联系。',
  },
  'cta.button': {
    en: 'Contact Us',
    ja: 'お問い合わせ',
    zh: '联系我们',
  },
  'meta.title': {
    en: 'Property Revitalization | Tengcle Development LLC NJ',
    ja: '物件再生・価値向上 | Tengcle Development LLC NJ',
    zh: '物业改造与价值提升 | Tengcle Development LLC NJ',
  },
  'meta.description': {
    en: 'New Jersey-based property assessment, repair coordination, operational improvement, and long-term value enhancement.',
    ja: 'ニュージャージー州を拠点とする物件状況の整理、修繕調整、運営改善、長期的な価値向上。',
    zh: '立足新泽西州的物业评估、维修协调、运营改善与长期价值提升。',
  },
  'meta.keywords': {
    en: 'property revitalization, property improvement, NJ real estate, repair coordination, Tengcle Development LLC',
    ja: '物件再生, 価値向上, NJ不動産, 修繕調整, Tengcle Development LLC',
    zh: '物业改造, 价值提升, 新泽西房地产, 维修协调, Tengcle Development LLC',
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
    { icon: Target, titleKey: 'process.step1.title', descKey: 'process.step1.desc', number: '01', image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663066460611/JyvIiupKWGWYYjXj.jpg' },
    { icon: Wrench, titleKey: 'process.step2.title', descKey: 'process.step2.desc', number: '02', image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663066460611/iSHpTibbdsSiqYyM.jpg' },
    { icon: TrendingUp, titleKey: 'process.step3.title', descKey: 'process.step3.desc', number: '03', image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663066460611/VannFrxRhuqxZmar.jpg' },
    { icon: Building2, titleKey: 'process.step4.title', descKey: 'process.step4.desc', number: '04', image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663066460611/fMylsTVnZmPjTihz.jpg' },
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
        ogImage="/images/og-image.webp"
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
              alt="Property Revitalization - Before and After"
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
