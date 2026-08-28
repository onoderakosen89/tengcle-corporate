/**
 * US Vacation Rental Management Service Page
 * 
 * Design Philosophy:
 * - Bold American style
 * - Focus on short-term rental operations
 * - Airbnb/VRBO management services
 */

import { useRef } from "react";
import { motion, useScroll, useTransform, type Easing } from "framer-motion";
import { Link } from "wouter";
import { 
  Home, 
  Star, 
  Camera, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle,
  TrendingUp,
  Calendar,
  Sparkles,
  DollarSign
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
    en: 'Short-Stay Operations Planning',
    ja: '短期滞在の運用設計',
    zh: '短期住宿运营设计',
  },
  'page.subtitle': {
    en: 'An Operating Model Suited to Each Property',
    ja: '物件ごとに適した運用モデルを設計',
    zh: '为每处物业设计合适的运营模式',
  },
  'page.description': {
    en: 'We design short-stay operating plans around each property’s location, characteristics, and applicable rules, balancing guest experience with sustainable performance.',
    ja: '物件の立地、特性、適用されるルールを踏まえて短期滞在向けの運用方法を設計し、利用体験と持続的な収益性の両立を図ります。',
    zh: '我们结合物业位置、特点及适用规则设计短期住宿运营方案，兼顾住客体验与可持续收益。',
  },
  'intro.title': {
    en: 'Practical Operating Design',
    ja: '実務に基づく運用設計',
    zh: '立足实务的运营设计',
  },
  'intro.description': {
    en: 'A viable short-stay operation depends on more than listing a property. We organize positioning, pricing, guest communication, cleaning, maintenance, and reporting as one connected operating model.',
    ja: '短期滞在の運営には、掲載だけでなく、位置づけ、料金、ゲスト対応、清掃、修繕、報告を一つの仕組みとして設計することが重要です。',
    zh: '可持续的短期住宿运营不仅是发布房源，还需要将定位、定价、住客沟通、清洁、维修和汇报整合为一套运营体系。',
  },
  'services.title': {
    en: 'Operating Plan Components',
    ja: '運用設計の構成要素',
    zh: '运营方案构成',
  },
  'service1.title': {
    en: 'Listing Optimization',
    ja: 'リスティング最適化',
    zh: '房源优化',
  },
  'service1.desc': {
    en: 'Plan the photography, description, information structure, and channel mix needed to present the property clearly.',
    ja: '物件の魅力を正確に伝えるため、写真、説明文、情報構成、掲載チャネルを設計します。',
    zh: '规划照片、说明、信息结构与发布渠道，清晰呈现物业特点。',
  },
  'service2.title': {
    en: 'Dynamic Pricing',
    ja: 'ダイナミックプライシング',
    zh: '动态定价',
  },
  'service2.desc': {
    en: 'Build pricing rules around demand, seasonality, local events, operating costs, and the property’s positioning.',
    ja: '需要、季節性、地域イベント、運営費、物件の位置づけを踏まえて料金方針を設計します。',
    zh: '结合需求、季节性、当地活动、运营成本与物业定位制定定价方针。',
  },
  'service3.title': {
    en: 'Guest Communication',
    ja: 'ゲスト対応',
    zh: '客人沟通',
  },
  'service3.desc': {
    en: 'Design clear communication flows from inquiry through checkout, including escalation paths for issues requiring local action.',
    ja: '問い合わせからチェックアウトまでの連絡手順と、現地対応が必要な場合のエスカレーションを設計します。',
    zh: '设计从咨询到退房的沟通流程，并明确需要现场处理时的升级路径。',
  },
  'service4.title': {
    en: 'Cleaning & Turnover Planning',
    ja: '清掃・入れ替え設計',
    zh: '清洁与周转规划',
  },
  'service4.desc': {
    en: 'Plan cleaning, linen, restocking, inspection, and repair coordination so each turnover can be handled consistently.',
    ja: '清掃、リネン、備品補充、点検、修繕連絡を整理し、入れ替え作業を安定して行える形にします。',
    zh: '规划清洁、布草、备品补充、检查与维修协调，使每次周转都能稳定执行。',
  },
  'platforms.title': {
    en: 'Channel Planning',
    ja: '掲載チャネル設計',
    zh: '发布渠道规划',
  },
  'platforms.description': {
    en: 'Select channels according to the property, target guest, local rules, and the operating capacity available.',
    ja: '物件、想定利用者、地域のルール、運営体制に合わせて掲載チャネルを選定します。',
    zh: '根据物业、目标住客、当地规则与运营能力选择发布渠道。',
  },
  'platform.airbnb': {
    en: 'Airbnb',
    ja: 'Airbnb',
    zh: 'Airbnb',
  },
  'platform.vrbo': {
    en: 'VRBO',
    ja: 'VRBO',
    zh: 'VRBO',
  },
  'platform.booking': {
    en: 'Booking.com',
    ja: 'Booking.com',
    zh: 'Booking.com',
  },
  'platform.direct': {
    en: 'Direct Bookings',
    ja: '直接予約',
    zh: '直接预订',
  },
  'results.title': {
    en: 'Operating Priorities',
    ja: '運用上の重点',
    zh: '运营重点',
  },
  'result1.title': {
    en: 'Occupancy Planning',
    ja: '稼働計画',
    zh: '入住率规划',
  },
  'result1.desc': {
    en: 'Review listing and pricing performance and adjust the operating plan as demand changes.',
    ja: '掲載内容と料金の実績を確認し、需要の変化に合わせて運用方針を調整します。',
    zh: '复核房源与定价表现，并随需求变化调整运营方针。',
  },
  'result2.title': {
    en: 'Pricing Discipline',
    ja: '料金設計',
    zh: '定价原则',
  },
  'result2.desc': {
    en: 'Set rates with a clear relationship between property quality, operating cost, demand, and guest expectations.',
    ja: '物件品質、運営費、需要、利用者の期待を踏まえ、根拠のある料金設定を行います。',
    zh: '结合物业品质、运营成本、需求与住客期待，制定有依据的价格。',
  },
  'result3.title': {
    en: 'Guest Experience',
    ja: '利用体験',
    zh: '住客体验',
  },
  'result3.desc': {
    en: 'Clear information, consistent readiness, and responsive issue handling support a dependable guest experience.',
    ja: '分かりやすい案内、安定した受入準備、問題発生時の対応により、信頼できる利用体験を支えます。',
    zh: '通过清晰信息、稳定接待准备与及时问题处理，支持可靠的住客体验。',
  },
  'result4.title': {
    en: 'Reliable Operations',
    ja: '安定した運営',
    zh: '稳定运营',
  },
  'result4.desc': {
    en: 'Maintain clear responsibilities, records, and escalation paths for consistent execution.',
    ja: '役割、記録、連絡経路を明確にし、安定した実行につなげます。',
    zh: '明确职责、记录与升级路径，确保稳定执行。',
  },
  'features.title': {
    en: 'Our Approach',
    ja: '私たちのアプローチ',
    zh: '我们的方法',
  },
  'feature1': {
    en: 'Property-specific operating design',
    ja: '物件ごとの運用設計',
    zh: '因物业而异的运营设计',
  },
  'feature2': {
    en: 'Local rules and market review',
    ja: '地域ルールと市場の確認',
    zh: '当地规则与市场确认',
  },
  'feature3': {
    en: 'Pricing and revenue planning',
    ja: '料金・収益計画',
    zh: '定价与收益规划',
  },
  'feature4': {
    en: 'Compliance with local short-term rental regulations',
    ja: '地域の短期賃貸規制への準拠',
    zh: '遵守当地短租法规',
  },
  'feature5': {
    en: 'Clear reporting structure',
    ja: '明確な報告体制',
    zh: '清晰的汇报体系',
  },
  'feature6': {
    en: 'Issue escalation and property protection planning',
    ja: '問題発生時の連絡・物件保全設計',
    zh: '问题升级与物业保护规划',
  },
  'cta.title': {
    en: 'Unlock Your Property\'s Potential',
    ja: '物件のポテンシャルを解放',
    zh: '释放您物业的潜力',
  },
  'cta.description': {
    en: 'Contact us to discuss whether short-stay use fits your property and what operating structure it would require.',
    ja: '短期滞在での活用が物件に適しているか、必要な運営体制とあわせてご相談ください。',
    zh: '欢迎咨询短期住宿用途是否适合您的物业，以及所需的运营体系。',
  },
  'cta.button': {
    en: 'Discuss Your Property',
    ja: '物件について相談する',
    zh: '咨询您的物业',
  },
  'meta.title': {
    en: 'Short-Stay Operations Planning | Tengcle Development LLC New Jersey',
    ja: '短期滞在の運用設計 | Tengcle Development LLC ニュージャージー',
    zh: '短期住宿运营设计 | Tengcle Development LLC 新泽西',
  },
  'meta.description': {
    en: 'Short-stay operating plans based on property characteristics, local rules, guest experience, and sustainable performance.',
    ja: '物件特性、地域ルール、利用体験、持続的な収益性を踏まえた短期滞在の運用設計。',
    zh: '结合物业特点、当地规则、住客体验与可持续收益的短期住宿运营设计。',
  },
  'meta.keywords': {
    en: 'short-stay operations planning, vacation rental planning, NJ short-term rental, Tengcle Development LLC',
    ja: '短期滞在運用設計, 民泊運用計画, NJ短期賃貸, Tengcle Development LLC',
    zh: '短期住宿运营设计, 短租运营规划, 新泽西短期租赁, Tengcle Development LLC',
  },
};

export default function VacationRentals() {
  const { language, t: globalT } = useUsLanguage();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const t = (key: string) => {
    const translation = pageTranslations[key as keyof typeof pageTranslations];
    if (translation) {
      return translation[language] || translation.en;
    }
    return globalT(key);
  };

  const basePath = `/us/${language}`;

  const services = [
    { icon: Camera, titleKey: 'service1.title', descKey: 'service1.desc', image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663066460611/OxqKFAxFhjMtKpZv.jpg' },
    { icon: TrendingUp, titleKey: 'service2.title', descKey: 'service2.desc', image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663066460611/psTYXFiKpATkGnKJ.jpg' },
    { icon: MessageSquare, titleKey: 'service3.title', descKey: 'service3.desc', image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663066460611/LIdZKeUHbGsPbCLL.jpg' },
    { icon: Sparkles, titleKey: 'service4.title', descKey: 'service4.desc', image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663066460611/GKDzJlpsLviIPcRn.jpg' },
  ];

  const results = [
    { icon: Calendar, titleKey: 'result1.title', descKey: 'result1.desc' },
    { icon: DollarSign, titleKey: 'result2.title', descKey: 'result2.desc' },
    { icon: Star, titleKey: 'result3.title', descKey: 'result3.desc' },
    { icon: Home, titleKey: 'result4.title', descKey: 'result4.desc' },
  ];

  const platforms = ['platform.airbnb', 'platform.vrbo', 'platform.booking', 'platform.direct'];

  const features = [
    'feature1', 'feature2', 'feature3', 'feature4', 'feature5', 'feature6'
  ];

  return (
    <>
      <SEOHead
        title={t('meta.title')}
        description={t('meta.description')}
        keywords={t('meta.keywords')}
        canonical={`https://www.tengcle.com${basePath}/services/vacation-rentals`}
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
              src="/images/candidates/us-vacation-rental-960.webp"
              alt="Illustrative guest room for short-term stay operations"
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

        {/* Introduction Section */}
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
                {t('intro.title')}
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-gray-300 leading-relaxed"
              >
                {t('intro.description')}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
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
                {t('services.title')}
              </motion.h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={t(service.titleKey)}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4 -mt-10 relative z-10 border-4 border-white shadow-md">
                      <service.icon className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="font-heading text-xl text-purple-deep mb-3">
                      {t(service.titleKey)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {t(service.descKey)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Platforms Section */}
        <section className="py-20 bg-white">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.h2
                variants={fadeInUp}
                className="font-heading text-3xl md:text-4xl text-purple-deep mb-4"
              >
                {t('platforms.title')}
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-gray-600 max-w-2xl mx-auto"
              >
                {t('platforms.description')}
              </motion.p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-6">
              {platforms.map((platform, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="px-8 py-4 bg-gray-50 rounded-lg border border-gray-100 font-medium text-purple-deep"
                >
                  {t(platform)}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
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
                {t('results.title')}
              </motion.h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {results.map((result, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="text-center p-6 bg-white rounded-xl shadow-sm"
                >
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <result.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-heading text-lg text-purple-deep mb-2">
                    {t(result.titleKey)}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t(result.descKey)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
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
                {t('features.title')}
              </motion.h2>
              <div className="grid md:grid-cols-2 gap-4">
                {features.map((key, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
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
