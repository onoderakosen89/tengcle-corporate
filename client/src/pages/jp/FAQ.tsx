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
    answer: "株式会社Tengcleは、不動産管理を中核に、飲食店舗、ウェルネス施設、宿泊施設の企画・運営実績があります。"
  },
  {
    question: "不動産管理サービスの内容を教えてください。",
    answer: "賃貸物件の管理・運営を行っています。入居者様の対応、家賃回収、物件のメンテナンス、定期点検など、オーナー様に代わって物件管理業務全般を担当します。"
  },
  {
    question: "ウェルネス事業にはどのような実績がありますか？",
    answer: "Tengcle Fitness & Lounge with Golfの企画・運営実績があります。"
  },
  {
    question: "宿泊事業にはどのような実績がありますか？",
    answer: "TengcleStayおよびPhenixinnを通じた宿泊施設の企画・運営実績があります。"
  },
  {
    question: "他の地域のTengcleサイトを見ることはできますか？",
    answer: "はい。このサイトから香港・日本・米国の地域サイトをご覧いただけます。各サイトで、その地域の事業内容と連絡先をご案内しています。"
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
    answer: "株式会社Tengcle's operating record spans property management, food and beverage establishments, wellness facilities, and accommodation."
  },
  {
    question: "What does your property management service include?",
    answer: "We handle rental property management and operations, including tenant relations, rent collection, property maintenance, and regular inspections on behalf of property owners."
  },
  {
    question: "What experience do you have in wellness?",
    answer: "We have experience planning and operating Tengcle Fitness & Lounge with Golf."
  },
  {
    question: "What experience do you have in accommodation?",
    answer: "We have experience planning and operating accommodation through TengcleStay and Phenixinn."
  },
  {
    question: "Can I view Tengcle's other regional sites?",
    answer: "Yes. This website links to Tengcle's Hong Kong, Japan, and United States regional sites, where you can find local business information and contact details."
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
    answer: "株式会社Tengcle以房地产管理为核心，并在餐饮门店、健康休闲设施和住宿设施方面拥有策划与运营实绩。"
  },
  {
    question: "物业管理服务包括哪些内容？",
    answer: "我们代表业主处理租赁物业的管理和运营，包括租户关系、租金收取、物业维护和定期检查。"
  },
  {
    question: "健康休闲业务有哪些实绩？",
    answer: "拥有Tengcle Fitness & Lounge with Golf的策划与运营实绩。"
  },
  {
    question: "住宿业务有哪些实绩？",
    answer: "通过TengcleStay和Phenixinn积累了住宿设施策划与运营实绩。"
  },
  {
    question: "可以查看Tengcle的其他地区网站吗？",
    answer: "可以。本网站可前往Tengcle的香港、日本及美国地区网站，各网站分别介绍当地业务与联系方式。"
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
      metaDescription: "株式会社Tengcleの不動産管理、飲食、ウェルネス、宿泊における事業実績に関するFAQ。",
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
      metaDescription: "FAQ about 株式会社Tengcle's operating experience in property management, food and beverage, wellness, and accommodation.",
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
      metaDescription: "关于株式会社Tengcle在房地产管理、餐饮、健康休闲和住宿领域运营实绩的常见问题。",
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
