/**
 * FAQ Page - US Site
 * 
 * Design: Matches US site design with purple theme
 * Features: Accordion FAQ with structured data for SEO
 */

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, ArrowLeft, Mail } from "lucide-react";
import UsHeader from "@/components/us/Header";
import UsFooter from "@/components/us/Footer";
import SEOHead, { generateFAQSchema } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

interface FAQItem {
  question: string;
  answer: string;
}

// FAQ data for US site
const faqDataEn: FAQItem[] = [
  {
    question: "What services does Tengcle Development LLC provide?",
    answer: "Tengcle Development LLC specializes in property management and vacation rental services in New Jersey and the New York metropolitan area. We handle residential and commercial property management, as well as short-term rental management for Airbnb and VRBO properties."
  },
  {
    question: "What areas do you serve?",
    answer: "We primarily serve the New Jersey and New York metro area, with our office located in Weehawken, NJ. Our services extend to properties throughout Hudson County, Bergen County, and the greater NYC metropolitan region."
  },
  {
    question: "What does your property management service include?",
    answer: "Our property management services include tenant screening and placement, rent collection and accounting, maintenance coordination, regular property inspections, lease management, and 24/7 emergency response for urgent issues."
  },
  {
    question: "How do you handle vacation rental management?",
    answer: "We provide comprehensive vacation rental management including listing optimization on platforms like Airbnb and VRBO, guest communication, professional cleaning coordination, dynamic pricing strategies, and regular property maintenance."
  },
  {
    question: "What are your management fees?",
    answer: "Our fees vary based on the type of property and services required. For long-term property management, we typically charge a percentage of monthly rent. For vacation rentals, we charge a percentage of booking revenue. Please contact us for a customized quote."
  },
  {
    question: "How do you screen tenants?",
    answer: "We conduct thorough tenant screening including credit checks, employment verification, rental history verification, and background checks. Our goal is to find reliable tenants who will take care of your property and pay rent on time."
  },
  {
    question: "What is the relationship with Tengcle Group?",
    answer: "Tengcle Development LLC is the US office of Tengcle Group, headquartered in Hong Kong. The group operates across three locations: Hong Kong (headquarters), Japan (founding office), and the United States, providing various business services in each region."
  },
  {
    question: "How can I contact you?",
    answer: "You can reach us via email at us@tengcle.com or through our contact form on the website. Our office is located at 17 Hamilton Ave, Weehawken, NJ 07086. We respond to all inquiries within one business day."
  }
];

const faqDataJa: FAQItem[] = [
  {
    question: "Tengcle Development LLCはどのようなサービスを提供していますか？",
    answer: "Tengcle Development LLCは、ニュージャージー州およびニューヨーク都市圏で不動産管理とバケーションレンタルサービスを専門としています。住宅・商業用不動産の管理、AirbnbやVRBO物件の短期レンタル管理を行っています。"
  },
  {
    question: "どのエリアでサービスを提供していますか？",
    answer: "主にニュージャージー州とニューヨーク都市圏でサービスを提供しており、オフィスはNJのウィーホーケンにあります。ハドソン郡、バーゲン郡、およびニューヨーク都市圏全域の物件に対応しています。"
  },
  {
    question: "不動産管理サービスには何が含まれますか？",
    answer: "テナント審査・入居手続き、家賃回収・会計、メンテナンス調整、定期物件点検、リース管理、緊急時の24時間対応などが含まれます。"
  },
  {
    question: "バケーションレンタル管理はどのように行いますか？",
    answer: "AirbnbやVRBOなどのプラットフォームでのリスティング最適化、ゲストとのコミュニケーション、プロのクリーニング手配、ダイナミックプライシング戦略、定期的な物件メンテナンスを含む包括的なサービスを提供しています。"
  },
  {
    question: "管理費用はいくらですか？",
    answer: "料金は物件の種類と必要なサービスによって異なります。長期不動産管理では通常月額家賃の一定割合、バケーションレンタルでは予約収益の一定割合を頂いています。詳細はお問い合わせください。"
  },
  {
    question: "テナント審査はどのように行いますか？",
    answer: "信用調査、雇用確認、賃貸履歴確認、身元調査を含む徹底的なテナント審査を行います。物件を大切にし、家賃を期日通りに支払う信頼できるテナントを見つけることを目指しています。"
  },
  {
    question: "Tengcle Groupとの関係は？",
    answer: "Tengcle Development LLCは、香港に本社を置くTengcle Groupの米国オフィスです。グループは香港（本社）、日本（創業地）、米国の3拠点で事業を展開し、各地域で様々なビジネスサービスを提供しています。"
  },
  {
    question: "連絡方法を教えてください。",
    answer: "メール（us@tengcle.com）またはウェブサイトのお問い合わせフォームからご連絡ください。オフィスは17 Hamilton Ave, Weehawken, NJ 07086にあります。すべてのお問い合わせに1営業日以内に返信いたします。"
  }
];

const faqDataZh: FAQItem[] = [
  {
    question: "Tengcle Development LLC提供哪些服务？",
    answer: "Tengcle Development LLC专注于新泽西州和纽约大都会区的物业管理和度假租赁服务。我们处理住宅和商业物业管理，以及Airbnb和VRBO物业的短期租赁管理。"
  },
  {
    question: "你们服务哪些地区？",
    answer: "我们主要服务于新泽西州和纽约大都会区，办公室位于新泽西州威霍肯。我们的服务覆盖哈德逊县、卑尔根县和大纽约都会区的物业。"
  },
  {
    question: "物业管理服务包括什么？",
    answer: "我们的物业管理服务包括租户筛选和安置、租金收取和会计、维护协调、定期物业检查、租约管理以及紧急情况的24/7响应。"
  },
  {
    question: "你们如何管理度假租赁？",
    answer: "我们提供全面的度假租赁管理，包括在Airbnb和VRBO等平台上的列表优化、客人沟通、专业清洁协调、动态定价策略和定期物业维护。"
  },
  {
    question: "管理费用是多少？",
    answer: "费用因物业类型和所需服务而异。对于长期物业管理，我们通常收取月租金的一定百分比。对于度假租赁，我们收取预订收入的一定百分比。请联系我们获取定制报价。"
  },
  {
    question: "你们如何筛选租户？",
    answer: "我们进行全面的租户筛选，包括信用检查、就业验证、租赁历史验证和背景调查。我们的目标是找到会爱护您的物业并按时支付租金的可靠租户。"
  },
  {
    question: "与Tengcle Group是什么关系？",
    answer: "Tengcle Development LLC是总部位于香港的Tengcle Group的美国办事处。集团在香港（总部）、日本（创业地）和美国三个地点运营，在每个地区提供各种商业服务。"
  },
  {
    question: "如何联系你们？",
    answer: "您可以通过电子邮件us@tengcle.com或网站上的联系表格与我们联系。我们的办公室位于17 Hamilton Ave, Weehawken, NJ 07086。我们会在一个工作日内回复所有询问。"
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

export default function UsFAQ() {
  const [location] = useLocation();
  const pathLang = location.split("/")[2] || "en";
  const basePath = `/us/${pathLang}`;

  // Select FAQ data based on language
  const faqData = pathLang === "ja" ? faqDataJa : pathLang === "zh" ? faqDataZh : faqDataEn;

  // Translations
  const translations = {
    en: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about our property management and vacation rental services",
      backToHome: "Back to Home",
      contactTitle: "Still Have Questions?",
      contactText: "Our team is here to help. Contact us for personalized assistance.",
      contactButton: "Contact Us",
      metaTitle: "FAQ | Tengcle Development LLC - NJ/NY Real Estate",
      metaDescription: "FAQ about Tengcle Development LLC real estate development, property management & vacation rentals in NJ/NY.",
      metaKeywords: "Tengcle Development LLC, FAQ, real estate, property management, vacation rentals, New Jersey"
    },
    ja: {
      title: "よくある質問",
      subtitle: "不動産管理とバケーションレンタルサービスに関するよくある質問",
      backToHome: "ホームに戻る",
      contactTitle: "まだ質問がありますか？",
      contactText: "私たちのチームがお手伝いします。お気軽にお問い合わせください。",
      contactButton: "お問い合わせ",
      metaTitle: "よくある質問 | Tengcle Development LLC NJ/NY",
      metaDescription: "Tengcle Development LLCのNJ/NY不動産開発・管理・民泊に関するFAQ。",
      metaKeywords: "Tengcle Development LLC, FAQ, 不動産開発, 物件管理, 民泊, NJ"
    },
    zh: {
      title: "常见问题",
      subtitle: "查找有关我们物业管理和度假租赁服务的常见问题解答",
      backToHome: "返回首页",
      contactTitle: "还有问题吗？",
      contactText: "我们的团队随时为您提供帮助。请联系我们获取个性化协助。",
      contactButton: "联系我们",
      metaTitle: "常见问题 | Tengcle Development LLC NJ/NY",
      metaDescription: "Tengcle Development LLC的NJ/NY房地产开发・管理・民宿相关FAQ。",
      metaKeywords: "Tengcle Development LLC, FAQ, 房地产开发, 物业管理, 民宿, NJ"
    }
  };

  const t = translations[pathLang as keyof typeof translations] || translations.en;
  const fontClass = pathLang === "ja" ? "font-jp" : pathLang === "zh" ? "font-zh" : "";

  // Generate FAQ structured data
  const faqSchema = generateFAQSchema(faqData);

  return (
    <>
      <SEOHead
        title={t.metaTitle}
        description={t.metaDescription}
        canonical={`https://www.tengcle.com/us/${pathLang}/faq`}
        locale={pathLang === "ja" ? "ja_JP" : pathLang === "zh" ? "zh_CN" : "en_US"}
        ogImage="/images/og-image-us.jpg"
        keywords={t.metaKeywords}
        structuredData={faqSchema}
      />

      <UsHeader />

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

      <UsFooter />
    </>
  );
}
