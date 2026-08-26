/**
 * FAQ Page - Japan Site
 * 
 * Design: Matches Japan site design with purple/gold theme
 * Features: Accordion FAQ with structured data for SEO
 */

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, ArrowLeft, Mail } from "lucide-react";
import JpHeader from "@/components/jp/Header";
import JpFooter from "@/components/jp/Footer";
import SEOHead, { generateFAQSchema } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

interface FAQItem {
  question: string;
  answer: string;
}

// FAQ data for Japan site
const faqDataJa: FAQItem[] = [
  {
    question: "株式会社Tengcleはどのようなサービスを提供していますか？",
    answer: "株式会社Tengcleの現在の中核事業は不動産管理です。家賃回収、修繕手配、テナント対応などを行っています。飲食、ウェルネス、宿泊、人材紹介に関する活動は、実態に応じて準備または検討しています。"
  },
  {
    question: "不動産管理サービスの内容を教えてください。",
    answer: "賃貸物件の管理・運営を行っています。入居者様の対応、家賃回収、物件のメンテナンス、定期点検など、オーナー様に代わって物件管理業務全般を担当します。"
  },
  {
    question: "レンタルジムはどこにありますか？",
    answer: "Tengcle Fitness & Lounge with Golfの施設は保有していますが、現在は営業停止中です。将来の再開については、運営状況を踏まえて検討しています。"
  },
  {
    question: "カプセルホテルの予約方法を教えてください。",
    answer: "宿泊事業は将来の展開に向けて準備・検討中です。現在、当社が運営するカプセルホテルの予約受付は行っていません。"
  },
  {
    question: "人材紹介サービスはどのような業界に対応していますか？",
    answer: "人材紹介事業は、今後の展開に向けて準備・検討中です。現在、紹介サービスの提供実績としては掲載していません。"
  },
  {
    question: "他のTengcle法人との関係を教えてください。",
    answer: "株式会社Tengcle、Tengcle Limited、Tengcle Development LLCは、いずれも小野寺紘宣が100%を保有する関連会社です。親会社・子会社の関係ではありません。"
  },
  {
    question: "会社の所在地はどこですか？",
    answer: "東京都港区高輪2-19-20に所在しています。品川駅から徒歩圏内の便利な立地です。"
  },
  {
    question: "お問い合わせ方法を教えてください。",
    answer: "メール（info@tengcle.com）またはお問い合わせフォームからご連絡ください。営業時間内にご返信いたします。"
  }
];

const faqDataEn: FAQItem[] = [
  {
    question: "What services does 株式会社Tengcle provide?",
    answer: "株式会社Tengcle's active core business is property management, including rent collection, repair coordination, and tenant communication. Activities related to F&B, wellness, accommodation, and recruitment are being prepared or reviewed according to their operational status."
  },
  {
    question: "What does your property management service include?",
    answer: "We handle rental property management and operations, including tenant relations, rent collection, property maintenance, and regular inspections on behalf of property owners."
  },
  {
    question: "Where is your rental gym located?",
    answer: "The Tengcle Fitness & Lounge with Golf facilities are retained, but operations are currently suspended. Any future reopening will be considered in line with operational conditions."
  },
  {
    question: "How can I book the capsule hotel?",
    answer: "Accommodation activity is being prepared and reviewed for future development. We do not currently accept bookings for a capsule hotel operated by the company."
  },
  {
    question: "What industries does your recruitment service cover?",
    answer: "Recruitment activity is being prepared and reviewed for future development. We do not currently present placement services as an active operational record."
  },
  {
    question: "What is the relationship with the other Tengcle companies?",
    answer: "株式会社Tengcle, Tengcle Limited, and Tengcle Development LLC are affiliated companies, each 100% owned by Kosen Onodera. They are not in a parent-subsidiary relationship."
  },
  {
    question: "Where is your office located?",
    answer: "We are located at 2-19-20 Takanawa, Minato-ku, Tokyo. It's within walking distance from Shinagawa Station."
  },
  {
    question: "How can I contact you?",
    answer: "Please contact us via email (info@tengcle.com) or through our contact form. We will respond during business hours."
  }
];

const faqDataZh: FAQItem[] = [
  {
    question: "株式会社Tengcle提供哪些服务？",
    answer: "株式会社Tengcle当前的核心运营业务是房地产管理，包括租金回收、维修协调和租户沟通。餐饮、健康、住宿和人才介绍相关活动将根据实际运营状态进行准备或评估。"
  },
  {
    question: "物业管理服务包括哪些内容？",
    answer: "我们代表业主处理租赁物业的管理和运营，包括租户关系、租金收取、物业维护和定期检查。"
  },
  {
    question: "租赁健身房在哪里？",
    answer: "Tengcle Fitness & Lounge with Golf的设施仍被保有，但目前暂停运营。未来是否重开将根据实际运营条件评估。"
  },
  {
    question: "如何预订胶囊酒店？",
    answer: "住宿业务正为未来发展进行准备和评估。目前，我们不接受由本公司运营的胶囊酒店预订。"
  },
  {
    question: "招聘服务涵盖哪些行业？",
    answer: "人才介绍活动正为未来发展进行准备和评估。目前，我们不将人才介绍服务作为正在运营的实绩进行展示。"
  },
  {
    question: "与其他Tengcle公司是什么关系？",
    answer: "株式会社Tengcle、Tengcle Limited和Tengcle Development LLC均为小野寺紘宣100%持有的关联公司，不属于母子公司关系。"
  },
  {
    question: "办公室在哪里？",
    answer: "我们位于东京都港区高轮2-19-20。距离品川站步行即可到达。"
  },
  {
    question: "如何联系你们？",
    answer: "请通过电子邮件（info@tengcle.com）或联系表格与我们联系。我们将在工作时间内回复。"
  }
];

function FAQAccordion({ items, language }: { items: FAQItem[]; language: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="border border-purple/20 bg-white overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-purple/5 transition-colors"
          >
            <span className={`font-medium text-charcoal pr-4 ${language === "ja" ? "font-jp" : language === "zh" ? "font-zh" : ""}`}>
              {item.question}
            </span>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <ChevronDown className="h-5 w-5 text-purple" />
            </motion.div>
          </button>

          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`px-6 pb-5 text-slate leading-relaxed ${language === "ja" ? "font-jp" : language === "zh" ? "font-zh" : ""}`}>
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

export default function JpFAQ() {
  const [location] = useLocation();
  const pathLang = location.split("/")[2] || "ja";
  const basePath = `/jp/${pathLang}`;

  // Select FAQ data based on language
  const faqData = pathLang === "en" ? faqDataEn : pathLang === "zh" ? faqDataZh : faqDataJa;

  // Translations
  const translations = {
    ja: {
      title: "よくある質問",
      subtitle: "お客様からよくいただくご質問にお答えします",
      backToHome: "ホームに戻る",
      contactTitle: "お問い合わせ",
      contactText: "ご不明な点がございましたら、お気軽にお問い合わせください。",
      contactButton: "お問い合わせ",
      metaTitle: "よくある質問 | 株式会社Tengcle 東京",
      metaDescription: "株式会社Tengcleの不動産管理と、実態に応じて準備・検討中の各事業に関するFAQ。",
      metaKeywords: "株式会社Tengcle, FAQ, 不動産管理, 家賃回収, 修繕手配, 東京"
    },
    en: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about our services",
      backToHome: "Back to Home",
      contactTitle: "Contact Us",
      contactText: "If you have any questions, please feel free to contact us.",
      contactButton: "Contact Us",
      metaTitle: "FAQ | 株式会社Tengcle Tokyo Japan",
      metaDescription: "FAQ about 株式会社Tengcle's active property-management operations and activities being prepared or reviewed according to operational status.",
      metaKeywords: "株式会社Tengcle, FAQ, property management, rent collection, repair coordination, Tokyo"
    },
    zh: {
      title: "常见问题",
      subtitle: "查找有关我们服务的常见问题解答",
      backToHome: "返回首页",
      contactTitle: "联系我们",
      contactText: "如有任何问题，请随时与我们联系。",
      contactButton: "联系我们",
      metaTitle: "常见问题 | 株式会社Tengcle 东京",
      metaDescription: "关于株式会社Tengcle的房地产管理及按实际运营状态准备或评估的其他活动的常见问题。",
      metaKeywords: "株式会社Tengcle, FAQ, 房地产管理, 租金回收, 维修协调, 东京"
    }
  };

  const t = translations[pathLang as keyof typeof translations] || translations.ja;
  const fontClass = pathLang === "ja" ? "font-jp" : pathLang === "zh" ? "font-zh" : "";

  // Generate FAQ structured data
  const faqSchema = generateFAQSchema(faqData);

  return (
    <>
      <SEOHead
        title={t.metaTitle}
        description={t.metaDescription}
        canonical={`https://www.tengcle.com/jp/${pathLang}/faq`}
        locale={pathLang === "ja" ? "ja_JP" : pathLang === "zh" ? "zh_CN" : "en_US"}
        keywords={t.metaKeywords}
        structuredData={faqSchema}
        ogImage="/images/og-image.webp"
      />

      <JpHeader />

      <main id="main-content" tabIndex={-1} className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-purple overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="container relative">
            <Link href={basePath}>
              <Button variant="ghost" className="mb-6 text-white/80 hover:text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className={fontClass}>{t.backToHome}</span>
              </Button>
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <HelpCircle className="h-6 w-6 text-gold" />
              </div>
              <h1 className={`text-4xl md:text-5xl font-heading text-white ${fontClass}`}>
                {t.title}
              </h1>
            </div>
            <p className={`text-white/80 text-lg max-w-2xl ${fontClass}`}>
              {t.subtitle}
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20 bg-light-gray">
          <div className="container max-w-4xl">
            <FAQAccordion items={faqData} language={pathLang} />
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-white">
          <div className="container max-w-4xl text-center">
            <h2 className={`text-2xl font-heading text-charcoal mb-4 ${fontClass}`}>
              {t.contactTitle}
            </h2>
            <p className={`text-slate mb-8 ${fontClass}`}>
              {t.contactText}
            </p>
            <Button asChild className="bg-purple hover:bg-purple-light text-white">
              <Link href={`${basePath}/contact`}>
                <Mail className="h-4 w-4 mr-2" />
                <span className={fontClass}>{t.contactButton}</span>
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <JpFooter />
    </>
  );
}
