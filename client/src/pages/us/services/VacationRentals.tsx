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
    en: 'Vacation Rental Management',
    ja: '民泊運用',
    zh: '度假租赁管理',
  },
  'page.subtitle': {
    en: 'Maximize Your Short-term Rental Revenue',
    ja: '短期賃貸収益の最大化',
    zh: '最大化您的短租收益',
  },
  'page.description': {
    en: 'Professional Airbnb and VRBO management services for our developed properties. We handle everything from listing optimization to guest communication, ensuring maximum occupancy and revenue.',
    ja: '開発物件のプロフェッショナルなAirbnb・VRBO管理サービス。リスティング最適化からゲスト対応まですべてを担当し、稼働率と収益を最大化します。',
    zh: '为开发物业提供专业的Airbnb和VRBO管理服务。我们处理从房源优化到客人沟通的所有事务，确保最大入住率和收益。',
  },
  'intro.title': {
    en: 'Hospitality Excellence',
    ja: 'ホスピタリティの卓越性',
    zh: '卓越的酒店服务',
  },
  'intro.description': {
    en: 'Leveraging our Japanese hospitality heritage, we bring exceptional guest experiences to the vacation rental market. Our properties consistently achieve Superhost status and top ratings through meticulous attention to detail and responsive service.',
    ja: '日本のホスピタリティの伝統を活かし、民泊市場に卓越したゲスト体験を提供します。細部へのこだわりと迅速なサービスにより、当社の物件は常にスーパーホストステータスとトップ評価を獲得しています。',
    zh: '利用我们的日式酒店服务传统，为度假租赁市场带来卓越的客人体验。通过对细节的精心关注和响应式服务，我们的物业始终获得超级房东地位和最高评价。',
  },
  'services.title': {
    en: 'Full-Service Management',
    ja: 'フルサービス管理',
    zh: '全方位管理服务',
  },
  'service1.title': {
    en: 'Listing Optimization',
    ja: 'リスティング最適化',
    zh: '房源优化',
  },
  'service1.desc': {
    en: 'Professional photography, compelling descriptions, and SEO-optimized listings to maximize visibility and bookings.',
    ja: 'プロフェッショナルな写真撮影、魅力的な説明文、SEO最適化されたリスティングで、露出と予約を最大化。',
    zh: '专业摄影、引人注目的描述和SEO优化的房源，最大化曝光度和预订量。',
  },
  'service2.title': {
    en: 'Dynamic Pricing',
    ja: 'ダイナミックプライシング',
    zh: '动态定价',
  },
  'service2.desc': {
    en: 'AI-powered pricing strategies that adjust rates based on demand, seasonality, and local events to maximize revenue.',
    ja: '需要、季節性、地域イベントに基づいて料金を調整するAI駆動の価格戦略で収益を最大化。',
    zh: '基于需求、季节性和当地活动调整价格的AI驱动定价策略，最大化收益。',
  },
  'service3.title': {
    en: 'Guest Communication',
    ja: 'ゲスト対応',
    zh: '客人沟通',
  },
  'service3.desc': {
    en: '24/7 guest support from inquiry to checkout. Quick response times and multilingual assistance.',
    ja: '問い合わせからチェックアウトまで24時間対応のゲストサポート。迅速な対応と多言語サポート。',
    zh: '从咨询到退房的24/7客人支持。快速响应和多语言协助。',
  },
  'service4.title': {
    en: 'Professional Cleaning',
    ja: 'プロフェッショナルクリーニング',
    zh: '专业清洁',
  },
  'service4.desc': {
    en: 'Hotel-quality cleaning and turnover services between guests. Linen service and restocking included.',
    ja: 'ゲスト間のホテル品質のクリーニングとターンオーバーサービス。リネンサービスと備品補充を含む。',
    zh: '客人之间的酒店品质清洁和周转服务。包括床单服务和补货。',
  },
  'platforms.title': {
    en: 'Multi-Platform Distribution',
    ja: 'マルチプラットフォーム配信',
    zh: '多平台分发',
  },
  'platforms.description': {
    en: 'We list your property across all major vacation rental platforms to maximize exposure and bookings.',
    ja: 'すべての主要な民泊プラットフォームに物件を掲載し、露出と予約を最大化します。',
    zh: '我们在所有主要度假租赁平台上发布您的物业，最大化曝光度和预订量。',
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
    en: 'Expected Results',
    ja: '期待される成果',
    zh: '预期成果',
  },
  'result1.title': {
    en: 'Higher Occupancy',
    ja: '高稼働率',
    zh: '更高入住率',
  },
  'result1.desc': {
    en: 'Optimized listings and pricing strategies to achieve maximum occupancy rates.',
    ja: '最適化されたリスティングと価格戦略で最大稼働率を達成。',
    zh: '优化的房源和定价策略，实现最高入住率。',
  },
  'result2.title': {
    en: 'Premium Rates',
    ja: 'プレミアム料金',
    zh: '溢价收费',
  },
  'result2.desc': {
    en: 'Quality presentation and service command higher nightly rates.',
    ja: '高品質なプレゼンテーションとサービスで高い宿泊料金を実現。',
    zh: '优质的展示和服务带来更高的每晚房价。',
  },
  'result3.title': {
    en: '5-Star Reviews',
    ja: '5つ星レビュー',
    zh: '五星评价',
  },
  'result3.desc': {
    en: 'Exceptional guest experiences lead to consistent top ratings.',
    ja: '卓越したゲスト体験が一貫したトップ評価につながる。',
    zh: '卓越的客人体验带来持续的最高评价。',
  },
  'result4.title': {
    en: 'Superhost Status',
    ja: 'スーパーホスト',
    zh: '超级房东',
  },
  'result4.desc': {
    en: 'Maintain platform recognition for quality and reliability.',
    ja: '品質と信頼性に対するプラットフォーム認定を維持。',
    zh: '保持平台对质量和可靠性的认可。',
  },
  'features.title': {
    en: 'Our Approach',
    ja: '私たちのアプローチ',
    zh: '我们的方法',
  },
  'feature1': {
    en: 'Japanese omotenashi (hospitality) standards',
    ja: '日本のおもてなし基準',
    zh: '日式款待标准',
  },
  'feature2': {
    en: 'Local market knowledge of NJ/NY tourism',
    ja: 'NJ/NY観光の地域市場知識',
    zh: '新泽西/纽约旅游本地市场知识',
  },
  'feature3': {
    en: 'Revenue management expertise',
    ja: 'レベニューマネジメントの専門知識',
    zh: '收益管理专业知识',
  },
  'feature4': {
    en: 'Compliance with local short-term rental regulations',
    ja: '地域の短期賃貸規制への準拠',
    zh: '遵守当地短租法规',
  },
  'feature5': {
    en: 'Transparent reporting and owner portal',
    ja: '透明性の高い報告とオーナーポータル',
    zh: '透明的报告和业主门户',
  },
  'feature6': {
    en: 'Emergency response and property protection',
    ja: '緊急対応と物件保護',
    zh: '紧急响应和物业保护',
  },
  'cta.title': {
    en: 'Unlock Your Property\'s Potential',
    ja: '物件のポテンシャルを解放',
    zh: '释放您物业的潜力',
  },
  'cta.description': {
    en: 'Ready to maximize your vacation rental income? Contact us to discuss how we can transform your property into a high-performing short-term rental.',
    ja: '民泊収入を最大化する準備はできていますか？物件を高パフォーマンスの短期賃貸に変える方法をご相談ください。',
    zh: '准备好最大化您的度假租赁收入了吗？联系我们，讨论如何将您的物业转变为高绩效短租。',
  },
  'cta.button': {
    en: 'Start Earning More',
    ja: '収益を最大化',
    zh: '开始赚取更多',
  },
  'meta.title': {
    en: 'Vacation Rental Management | Tengcle Development LLC NJ - Airbnb & VRBO',
    ja: '民泊運用 | Tengcle Development LLC NJ - Airbnb・VRBO管理',
    zh: '短租管理 | Tengcle Development LLC NJ - Airbnb·VRBO运营',
  },
  'meta.description': {
    en: 'Professional Airbnb & VRBO management in NJ/NY. Maximize vacation rental revenue with Japanese hospitality.',
    ja: 'NJ/NYエリアのAirbnb・VRBOプロ管理。日本式おもてなしで収益最大化。',
    zh: '新泽西/纽约地区专业Airbnb、VRBO管理。日式服务最大化短租收益。',
  },
  'meta.keywords': {
    en: 'vacation rental management, Airbnb management, VRBO management, NJ short-term rental, Tengcle Development LLC',
    ja: '民泊運用, Airbnb管理, VRBO管理, NJ短期賃貸, Tengcle Development LLC',
    zh: '短租管理, Airbnb管理, VRBO管理, NJ短期租赁, Tengcle Development LLC',
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
    { icon: Camera, titleKey: 'service1.title', descKey: 'service1.desc', image: '/images/us-vr-listing.jpg' },
    { icon: TrendingUp, titleKey: 'service2.title', descKey: 'service2.desc', image: '/images/us-vr-pricing.jpg' },
    { icon: MessageSquare, titleKey: 'service3.title', descKey: 'service3.desc', image: '/images/us-vr-guest.jpg' },
    { icon: Sparkles, titleKey: 'service4.title', descKey: 'service4.desc', image: '/images/us-vr-cleaning.jpg' },
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
              src="/images/us-service-vacation.jpg"
              alt="Luxurious Vacation Rental Interior"
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
