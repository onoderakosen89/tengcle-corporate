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
    answer: "Based in New Jersey, Tengcle Development LLC works across property management, repair coordination, tenant support, property revitalization, and short-stay operating design."
  },
  {
    question: "What areas do you serve?",
    answer: "Our current operating base is New Jersey. For other locations in the NJ/NY area, service scope and on-site coverage are confirmed for each property."
  },
  {
    question: "What does your property management service include?",
    answer: "Our property management work includes rent collection, repair coordination, tenant communication, property oversight, and clear reporting to owners. The exact scope is defined for each property."
  },
  {
    question: "How do you handle vacation rental management?",
    answer: "We design short-stay operating plans around the property, local rules, target guests, pricing, communication, cleaning, maintenance, and reporting. The operating scope is agreed for each property."
  },
  {
    question: "What are your management fees?",
    answer: "Fees depend on the property, location, and agreed scope of work. We first clarify responsibilities and then provide a proposal."
  },
  {
    question: "How do you screen tenants?",
    answer: "When tenant placement is included, the screening steps and decision criteria are agreed with the owner and handled in line with applicable requirements."
  },
  {
    question: "Can I view Tengcle's other regional sites?",
    answer: "Yes. This website links to Tengcle's Hong Kong, Japan, and United States regional sites, where you can find local business information and contact details."
  },
  {
    question: "How can I contact you?",
    answer: "You can reach us via email at us@tengcle.com or through the contact form on this website."
  }
];

const faqDataJa: FAQItem[] = [
  {
    question: "Tengcle Development LLCはどのようなサービスを提供していますか？",
    answer: "Tengcle Development LLCはニュージャージー州を拠点に、不動産管理、修繕調整、テナント対応、物件再生、短期滞在の運用設計に取り組んでいます。"
  },
  {
    question: "どのエリアでサービスを提供していますか？",
    answer: "現在の活動拠点はニュージャージー州です。NJ/NYのその他の地域については、業務範囲と現地対応の可否を物件ごとに確認します。"
  },
  {
    question: "不動産管理サービスには何が含まれますか？",
    answer: "家賃回収、修繕手配、テナント対応、物件状況の確認、オーナーへの報告を行います。具体的な業務範囲は物件ごとに整理します。"
  },
  {
    question: "バケーションレンタル管理はどのように行いますか？",
    answer: "物件特性、地域ルール、想定利用者、料金、ゲスト対応、清掃、修繕、報告を一体として短期滞在の運用方法を設計します。具体的な業務範囲は物件ごとに整理します。"
  },
  {
    question: "管理費用はいくらですか？",
    answer: "料金は物件、所在地、合意する業務範囲によって異なります。最初に役割分担を整理したうえでお見積りします。"
  },
  {
    question: "テナント審査はどのように行いますか？",
    answer: "入居者募集を含む場合は、審査項目と判断基準をオーナーと確認し、適用される要件に沿って対応します。"
  },
  {
    question: "他の地域のTengcleサイトを見ることはできますか？",
    answer: "はい。このサイトから香港・日本・米国の地域サイトをご覧いただけます。各サイトで、その地域の事業内容と連絡先をご案内しています。"
  },
  {
    question: "連絡方法を教えてください。",
    answer: "メール（us@tengcle.com）またはウェブサイトのお問い合わせフォームからご連絡ください。"
  }
];

const faqDataZh: FAQItem[] = [
  {
    question: "Tengcle Development LLC提供哪些服务？",
    answer: "Tengcle Development LLC立足新泽西州，开展物业管理、维修协调、租户支持、物业改造及短期住宿运营设计。"
  },
  {
    question: "你们服务哪些地区？",
    answer: "我们目前的运营基地在新泽西州。对于新泽西／纽约的其他地区，业务范围与现场覆盖能力按每处物业确认。"
  },
  {
    question: "物业管理服务包括什么？",
    answer: "我们的物业管理工作包括租金收取、维修协调、租户沟通、物业状况确认及向业主汇报。具体业务范围按每处物业确定。"
  },
  {
    question: "你们如何管理度假租赁？",
    answer: "我们结合物业特点、当地规则、目标住客、定价、沟通、清洁、维修和汇报设计短期住宿运营方案。具体业务范围按每处物业确定。"
  },
  {
    question: "管理费用是多少？",
    answer: "费用取决于物业、所在地及约定的业务范围。我们会先明确职责分工，再提供方案与报价。"
  },
  {
    question: "你们如何筛选租户？",
    answer: "如业务包含招租，我们会与业主确认审核项目与判断标准，并按照适用要求处理。"
  },
  {
    question: "可以查看Tengcle的其他地区网站吗？",
    answer: "可以。本网站可前往Tengcle的香港、日本及美国地区网站，各网站分别介绍当地业务与联系方式。"
  },
  {
    question: "如何联系你们？",
    answer: "您可以通过电子邮件us@tengcle.com或本网站的联系表格与我们联系。"
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
      subtitle: "Common questions about property management, revitalization, and short-stay operating design",
      backToHome: "Back to Home",
      contactTitle: "Still Have Questions?",
      contactText: "Our team is here to help. Contact us for personalized assistance.",
      contactButton: "Contact Us",
      metaTitle: "FAQ | Tengcle Development LLC - NJ/NY Real Estate",
      metaDescription: "FAQ about Tengcle Development LLC property management, repair coordination, revitalization, and short-stay operating design in NJ/NY.",
      metaKeywords: "Tengcle Development LLC, FAQ, property management, property revitalization, New Jersey"
    },
    ja: {
      title: "よくある質問",
      subtitle: "不動産管理、物件再生、短期滞在の運用設計に関するよくある質問",
      backToHome: "ホームに戻る",
      contactTitle: "まだ質問がありますか？",
      contactText: "私たちのチームがお手伝いします。お気軽にお問い合わせください。",
      contactButton: "お問い合わせ",
      metaTitle: "よくある質問 | Tengcle Development LLC NJ/NY",
      metaDescription: "Tengcle Development LLCのNJ/NY不動産管理、修繕調整、物件再生、短期滞在運用に関するFAQ。",
      metaKeywords: "Tengcle Development LLC, FAQ, 不動産管理, 物件再生, 修繕, NJ"
    },
    zh: {
      title: "常见问题",
      subtitle: "有关物业管理、物业改造与短期住宿运营设计的常见问题",
      backToHome: "返回首页",
      contactTitle: "还有问题吗？",
      contactText: "我们的团队随时为您提供帮助。请联系我们获取个性化协助。",
      contactButton: "联系我们",
      metaTitle: "常见问题 | Tengcle Development LLC NJ/NY",
      metaDescription: "Tengcle Development LLC在新泽西／纽约地区的物业管理、维修协调、物业改造与短期住宿运营相关FAQ。",
      metaKeywords: "Tengcle Development LLC, FAQ, 物业管理, 物业改造, 维修, 新泽西"
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
        ogImage="/images/og-image.webp"
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
