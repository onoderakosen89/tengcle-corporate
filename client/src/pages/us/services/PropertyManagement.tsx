/**
 * US Property Management Service Page
 * 
 * Design Philosophy:
 * - Bold American style
 * - Focus on stock business operations
 * - Long-term rental management services
 */

import { useRef } from "react";
import { motion, useScroll, useTransform, type Easing } from "framer-motion";
import { Link } from "wouter";
import { 
  Building2, 
  Users, 
  ClipboardCheck, 
  Wrench, 
  ArrowRight, 
  CheckCircle,
  DollarSign,
  FileText,
  Clock,
  Shield
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
    en: 'Property Management',
    ja: '不動産管理',
    zh: '物业管理',
  },
  'page.subtitle': {
    en: 'Professional Long-term Rental Management',
    ja: 'プロフェッショナルな長期賃貸管理',
    zh: '专业的长期租赁管理',
  },
  'page.description': {
    en: 'Based in New Jersey, we provide hands-on property management covering rent collection, repair coordination, tenant communication, and owner reporting.',
    ja: 'ニュージャージー州を拠点に、家賃回収、修繕手配、テナント対応、オーナーへの報告を行う実務型の不動産管理サービスです。',
    zh: '我们立足新泽西州，提供租金收取、维修协调、租户沟通及业主汇报等实务型物业管理服务。',
  },
  'intro.title': {
    en: 'Hands-on Property Operations',
    ja: '現場に根ざした物件運営',
    zh: '扎根现场的物业运营',
  },
  'intro.description': {
    en: 'We organize the recurring work required to keep a property operating reliably. Clear communication with tenants, contractors, and owners helps issues move from identification to resolution.',
    ja: '物件を安定して運営するために必要な日常業務を整理し、テナント、修繕業者、オーナーとの明確な連絡を通じて、課題の把握から解決までをつなぎます。',
    zh: '我们梳理物业稳定运营所需的日常工作，通过与租户、维修承包商及业主的清晰沟通，推动问题从发现到解决。',
  },
  'services.title': {
    en: 'Our Management Services',
    ja: '管理サービス',
    zh: '管理服务',
  },
  'service1.title': {
    en: 'Tenant Communication',
    ja: 'テナント対応',
    zh: '租户沟通',
  },
  'service1.desc': {
    en: 'Respond to tenant questions, coordinate necessary action, and keep communication records clear for owners.',
    ja: 'テナントからの連絡を受け、必要な対応を調整し、オーナーに共有できる形で記録を整えます。',
    zh: '回应租户问题，协调必要处理，并以便于业主确认的方式保留沟通记录。',
  },
  'service2.title': {
    en: 'Rent Collection',
    ja: '家賃回収',
    zh: '租金收取',
  },
  'service2.desc': {
    en: 'Track rent collection and maintain clear records so owners can understand payment status and follow-up needs.',
    ja: '家賃の回収状況を確認し、支払状況と必要な対応をオーナーが把握できる形で記録します。',
    zh: '跟踪租金收取情况并保留清晰记录，使业主能够掌握付款状态与后续事项。',
  },
  'service3.title': {
    en: 'Maintenance Coordination',
    ja: 'メンテナンス調整',
    zh: '维护协调',
  },
  'service3.desc': {
    en: 'Assess repair needs, obtain suitable support, coordinate access and scheduling, and follow work through completion.',
    ja: '修繕の必要性を確認し、適切な業者への依頼、入室・日程調整、完了確認までを行います。',
    zh: '确认维修需求，安排合适的承包商、入场与时间，并跟进至完工。',
  },
  'service4.title': {
    en: 'Owner Reporting',
    ja: 'オーナー報告',
    zh: '业主汇报',
  },
  'service4.desc': {
    en: 'Summarize rent status, repairs, tenant matters, and pending decisions so owners can act with a clear view of the property.',
    ja: '家賃、修繕、テナント対応、判断待ち事項を整理し、物件の状況を把握できる形で共有します。',
    zh: '整理租金、维修、租户事项与待决问题，让业主清晰掌握物业状况。',
  },
  'property.title': {
    en: 'Properties We Can Support',
    ja: '対応可能な物件用途',
    zh: '可支持的物业用途',
  },
  'property.dormitory': {
    en: 'Dormitories & Student Housing',
    ja: '寮・学生住宅',
    zh: '宿舍与学生公寓',
  },
  'property.dormitory.desc': {
    en: 'Managed housing for students and young professionals with shared amenities.',
    ja: '共用設備を備えた学生・若手社会人向け管理住宅。',
    zh: '为学生和年轻专业人士提供共享设施的管理住房。',
  },
  'property.office': {
    en: 'Commercial Office Spaces',
    ja: '商業オフィススペース',
    zh: '商业办公空间',
  },
  'property.office.desc': {
    en: 'Professional office environments for businesses of all sizes.',
    ja: 'あらゆる規模のビジネス向けプロフェッショナルなオフィス環境。',
    zh: '为各种规模企业提供专业办公环境。',
  },
  'property.residential': {
    en: 'Long-term Residential Rentals',
    ja: '長期賃貸住宅',
    zh: '长期住宅租赁',
  },
  'property.residential.desc': {
    en: 'Quality apartments and houses for families and individuals seeking stable housing.',
    ja: '安定した住居を求める家族や個人向けの高品質アパート・戸建て。',
    zh: '为寻求稳定住房的家庭和个人提供优质公寓和房屋。',
  },
  'features.title': {
    en: 'Why Choose Our Management',
    ja: '当社の管理を選ぶ理由',
    zh: '为什么选择我们的管理',
  },
  'feature1': {
    en: 'Japanese attention to detail and service standards',
    ja: '日本式のきめ細やかさとサービス基準',
    zh: '日式精细服务标准',
  },
  'feature2': {
    en: 'Service-area and local requirement review',
    ja: '対応地域・現地要件の確認',
    zh: '服务区域与当地要求确认',
  },
  'feature3': {
    en: 'Transparent communication and reporting',
    ja: '透明性の高いコミュニケーションと報告',
    zh: '透明的沟通和报告',
  },
  'feature4': {
    en: 'Proactive maintenance to preserve property value',
    ja: '物件価値を守る予防的メンテナンス',
    zh: '主动维护以保持物业价值',
  },
  'feature5': {
    en: 'Scope-based management planning',
    ja: '業務範囲に応じた管理設計',
    zh: '根据业务范围制定管理方案',
  },
  'feature6': {
    en: 'Bilingual support (English/Japanese)',
    ja: 'バイリンガルサポート（英語/日本語）',
    zh: '双语支持（英语/日语）',
  },
  'cta.title': {
    en: 'Ready to Optimize Your Property?',
    ja: '物件の最適化をお考えですか？',
    zh: '准备好优化您的物业了吗？',
  },
  'cta.description': {
    en: 'Contact us to discuss the management work your property needs and how responsibilities can be organized clearly.',
    ja: '物件に必要な管理業務と、役割分担を明確にする方法についてご相談ください。',
    zh: '欢迎咨询物业所需的管理工作以及如何明确安排各方职责。',
  },
  'cta.button': {
    en: 'Get Started',
    ja: 'お問い合わせ',
    zh: '开始咨询',
  },
  'meta.title': {
    en: 'Property Management | Tengcle Development LLC New Jersey',
    ja: '不動産管理 | Tengcle Development LLC ニュージャージー',
    zh: '物业管理 | Tengcle Development LLC 新泽西',
  },
  'meta.description': {
    en: 'New Jersey-based rent collection, repair coordination, tenant communication, and owner reporting. Broader NJ/NY scope is confirmed per property.',
    ja: 'ニュージャージー州を拠点とする家賃回収、修繕手配、テナント対応、オーナー報告。NJ/NYの対応範囲は物件ごとに確認します。',
    zh: '立足新泽西州的租金收取、维修协调、租户沟通与业主汇报。新泽西／纽约的服务范围按每处物业确认。',
  },
  'meta.keywords': {
    en: 'property management, NJ property management, dormitory management, office rental, residential rental, Tengcle Development LLC',
    ja: '不動産管理, NJ不動産管理, 寮管理, オフィス賃貸, 住宅賃貸, Tengcle Development LLC',
    zh: '物业管理, NJ物业管理, 宿舍管理, 办公租赁, 住宅租赁, Tengcle Development LLC',
  },
};

export default function PropertyManagement() {
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
    { icon: Users, titleKey: 'service1.title', descKey: 'service1.desc', image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663066460611/djhGoKFTYfVXsabw.jpg' },
    { icon: DollarSign, titleKey: 'service2.title', descKey: 'service2.desc', image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663066460611/lqSmVpcFmUpDhvLF.jpg' },
    { icon: Wrench, titleKey: 'service3.title', descKey: 'service3.desc', image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663066460611/lVeJfacwfMWTLYUM.jpg' },
    { icon: FileText, titleKey: 'service4.title', descKey: 'service4.desc', image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663066460611/mTRRqKEDqlDmiBMU.jpg' },
  ];

  const propertyTypes = [
    { titleKey: 'property.dormitory', descKey: 'property.dormitory.desc', icon: Building2 },
    { titleKey: 'property.office', descKey: 'property.office.desc', icon: ClipboardCheck },
    { titleKey: 'property.residential', descKey: 'property.residential.desc', icon: Building2 },
  ];

  const features = [
    'feature1', 'feature2', 'feature3', 'feature4', 'feature5', 'feature6'
  ];

  return (
    <>
      <SEOHead
        title={t('meta.title')}
        description={t('meta.description')}
        keywords={t('meta.keywords')}
        canonical={`https://www.tengcle.com${basePath}/services/property-management`}
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
              src="/images/candidates/us-property-management-960.webp"
              alt="Illustrative New Jersey residential property inspection"
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

        {/* Property Types Section */}
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
                {t('property.title')}
              </motion.h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {propertyTypes.map((type, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="text-center p-8 rounded-xl border border-gray-100 hover:border-gold/30 hover:shadow-lg transition-all"
                >
                  <div className="w-16 h-16 rounded-full bg-purple-deep/5 flex items-center justify-center mx-auto mb-6">
                    <type.icon className="w-8 h-8 text-purple-deep" />
                  </div>
                  <h3 className="font-heading text-xl text-purple-deep mb-3">
                    {t(type.titleKey)}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t(type.descKey)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
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
                {t('features.title')}
              </motion.h2>
              <div className="grid md:grid-cols-2 gap-4">
                {features.map((key, index) => (
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
