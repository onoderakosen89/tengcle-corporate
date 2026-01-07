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
    question: "Tengcle Inc.はどのようなサービスを提供していますか？",
    answer: "Tengcle Inc.は、不動産管理、飲食店オペレーション、レンタルジム運営、カプセルホテル運営、人材紹介の5つの事業を展開しています。東京を中心に、日本市場でサービスを提供しています。"
  },
  {
    question: "不動産管理サービスの内容を教えてください。",
    answer: "賃貸物件の管理・運営を行っています。入居者様の対応、家賃回収、物件のメンテナンス、定期点検など、オーナー様に代わって物件管理業務全般を担当します。"
  },
  {
    question: "レンタルジムはどこにありますか？",
    answer: "東京都内でプライベートレンタルジムを運営しています。完全予約制で、他のお客様を気にせずトレーニングできる空間を提供しています。詳細はお問い合わせください。"
  },
  {
    question: "カプセルホテルの予約方法を教えてください。",
    answer: "当社運営のカプセルホテルは、公式サイトまたは各種予約サイト（Booking.com、楽天トラベル等）からご予約いただけます。ビジネス・観光のお客様にご利用いただいています。"
  },
  {
    question: "人材紹介サービスはどのような業界に対応していますか？",
    answer: "飲食、ホスピタリティ、不動産業界を中心に、企業と求職者のマッチングを行っています。業界知識とネットワークを活かし、最適な人材をご紹介します。"
  },
  {
    question: "Tengcle Groupとの関係を教えてください。",
    answer: "Tengcle Inc.は、香港に本社を置くTengcle Groupの日本法人です。グループ全体で、香港、日本、アメリカの3拠点でビジネスを展開しています。"
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
    question: "What services does Tengcle Inc. provide?",
    answer: "Tengcle Inc. operates five business divisions: real estate management, restaurant operations, rental gym, capsule hotel, and recruitment services. We provide services in the Japanese market, primarily in Tokyo."
  },
  {
    question: "What does your property management service include?",
    answer: "We handle rental property management and operations, including tenant relations, rent collection, property maintenance, and regular inspections on behalf of property owners."
  },
  {
    question: "Where is your rental gym located?",
    answer: "We operate private rental gyms in Tokyo. Our facilities are reservation-only, providing a space where you can train without worrying about other customers. Please contact us for details."
  },
  {
    question: "How can I book the capsule hotel?",
    answer: "Our capsule hotels can be booked through our official website or various booking platforms (Booking.com, Rakuten Travel, etc.). We serve both business and leisure travelers."
  },
  {
    question: "What industries does your recruitment service cover?",
    answer: "We focus on matching companies and job seekers in the food service, hospitality, and real estate industries. We leverage our industry knowledge and network to introduce the best candidates."
  },
  {
    question: "What is the relationship with Tengcle Group?",
    answer: "Tengcle Inc. is the Japan subsidiary of Tengcle Group, headquartered in Hong Kong. The group operates across three locations: Hong Kong, Japan, and the United States."
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
    question: "Tengcle Inc.提供哪些服务？",
    answer: "Tengcle Inc.经营五大业务：房地产管理、餐饮运营、租赁健身房、胶囊酒店和人才招聘服务。我们主要在东京为日本市场提供服务。"
  },
  {
    question: "物业管理服务包括哪些内容？",
    answer: "我们代表业主处理租赁物业的管理和运营，包括租户关系、租金收取、物业维护和定期检查。"
  },
  {
    question: "租赁健身房在哪里？",
    answer: "我们在东京运营私人租赁健身房。我们的设施仅限预约，提供一个无需担心其他客户的训练空间。详情请联系我们。"
  },
  {
    question: "如何预订胶囊酒店？",
    answer: "我们的胶囊酒店可以通过官方网站或各种预订平台（Booking.com、乐天旅游等）预订。我们为商务和休闲旅客提供服务。"
  },
  {
    question: "招聘服务涵盖哪些行业？",
    answer: "我们专注于餐饮、酒店和房地产行业的企业与求职者匹配。我们利用行业知识和网络介绍最佳候选人。"
  },
  {
    question: "与Tengcle Group是什么关系？",
    answer: "Tengcle Inc.是总部位于香港的Tengcle Group的日本子公司。集团在香港、日本和美国三个地点开展业务。"
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
      metaTitle: "よくある質問 | Tengcle Inc. 東京",
      metaDescription: "Tengcle Inc.の事業に関するFAQ。不動産・飲食・レンタルジム・カプセルホテル・人材紹介。",
      metaKeywords: "Tengcle Inc, FAQ, 不動産, レンタルジム, カプセルホテル, 東京"
    },
    en: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about our services",
      backToHome: "Back to Home",
      contactTitle: "Contact Us",
      contactText: "If you have any questions, please feel free to contact us.",
      contactButton: "Contact Us",
      metaTitle: "FAQ | Tengcle Inc. Tokyo Japan",
      metaDescription: "FAQ about Tengcle Inc. services: real estate, restaurant, rental gym, capsule hotel & recruitment in Tokyo.",
      metaKeywords: "Tengcle Inc, FAQ, real estate, rental gym, capsule hotel, Tokyo"
    },
    zh: {
      title: "常见问题",
      subtitle: "查找有关我们服务的常见问题解答",
      backToHome: "返回首页",
      contactTitle: "联系我们",
      contactText: "如有任何问题，请随时与我们联系。",
      contactButton: "联系我们",
      metaTitle: "常见问题 | Tengcle Inc. 东京",
      metaDescription: "Tengcle Inc.事业相关FAQ。房地产・餐饮・租赁健身房・胶囊酒店・人才介绍。",
      metaKeywords: "Tengcle Inc, FAQ, 房地产, 租赁健身房, 胶囊酒店, 东京"
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
        ogImage="/images/og-image-jp.jpg"
      />

      <JpHeader />

      <main className="pt-20">
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
            <Link href={`${basePath}/contact`}>
              <Button className="bg-purple hover:bg-purple-light text-white">
                <Mail className="h-4 w-4 mr-2" />
                <span className={fontClass}>{t.contactButton}</span>
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <JpFooter />
    </>
  );
}
