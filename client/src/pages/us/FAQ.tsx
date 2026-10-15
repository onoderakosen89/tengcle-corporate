/**
 * FAQ Page - US Site
 * 
 * Design: Matches US site design with purple theme
 * Features: Accordion FAQ with structured data for SEO
 */

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";
import UsHeader from "@/components/us/Header";
import UsFooter from "@/components/us/Footer";
import SEOHead, { generateFAQSchema } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { publicContactEmails } from "@/data/companyProfiles";
import { PIPETECTOR_URL } from "@/data/usBusinesses";

interface FAQItem {
  question: string;
  answer: string;
  /** Text inside the answer that is shown as a link to the pilot page. */
  linkText?: string;
}

// FAQ data for US site
const faqDataEn: FAQItem[] = [
  {
    question: "What services does Tengcle Development LLC provide?",
    answer: "Based in New Jersey, we revitalize and manage older apartment buildings used for long-term rentals. We also plan short-term rental operations, and we accept applications for pilot trials of NMR Pipetector."
  },
  {
    question: "What is the NMR Pipetector pilot?",
    answer: "This pilot program is for evaluating a Japanese rust-control device on chilled- and hot-water piping used in heating and cooling systems. The device is installed on the outside of the pipe without cutting it. We are accepting applications for trials in New Jersey and New York. Visit the pilot page for participation details and how to apply.",
    linkText: "pilot page"
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
    question: "How do you plan short-term rental operations?",
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
    answer: `You can reach us by email at ${publicContactEmails.general.us}.`
  }
];

const faqDataJa: FAQItem[] = [
  {
    question: "Tengcle Development LLCはどのようなサービスを提供していますか？",
    answer: "ニュージャージーを拠点に、古い集合住宅（長期賃貸）の再生と管理に取り組んでいます。短期滞在の運営計画も手がけます。また、NMR Pipetector の先行試験の申し込みを受け付けています。"
  },
  {
    question: "NMR Pipetector の先行試験とは何ですか？",
    answer: "配管を切らずに外から取り付ける日本の赤錆対策の装置を、冷暖房の冷温水の配管で試していただく取り組みです。ニュージャージーとニューヨークで申し込みを受け付けています。条件と申し込みは、専用ページ（英語）をご覧ください。",
    linkText: "専用ページ"
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
    question: "短期滞在の運営計画は、どのように作りますか？",
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
    answer: `メール（${publicContactEmails.general.us}）でご連絡ください。`
  }
];

const faqDataZh: FAQItem[] = [
  {
    question: "Tengcle Development LLC提供哪些服务？",
    answer: "我们以新泽西州为据点，从事老旧公寓楼（长期租赁）的再生与管理，也负责短租运营的规划，同时受理 NMR Pipetector 的试点测试申请。"
  },
  {
    question: "什么是 NMR Pipetector 试点测试？",
    answer: "这是一项针对暖通空调冷热水管道、评估日本防锈装置的试点测试。该装置无需切断管道，从外侧安装。我们正在新泽西州和纽约受理申请，参与条件和申请方式请见专用页面（英文）。",
    linkText: "专用页面"
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
    question: "你们如何规划短租运营？",
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
    answer: `您可以通过电子邮件${publicContactEmails.general.us}与我们联系。`
  }
];

const heroFadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const heroStagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

function FAQAnswer({ item }: { item: FAQItem }) {
  const { answer, linkText } = item;
  const at = linkText ? answer.indexOf(linkText) : -1;
  if (!linkText || at < 0) return <>{answer}</>;
  return (
    <>
      {answer.slice(0, at)}
      <a
        href={PIPETECTOR_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple underline hover:text-gold transition-colors"
      >
        {linkText}
      </a>
      {answer.slice(at + linkText.length)}
    </>
  );
}

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
                  <FAQAnswer item={item} />
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
      subtitle: "Common questions about building revitalization and management, and the NMR Pipetector pilot",
      backToHome: "Back to Home",
      contactTitle: "Still Have Questions?",
      contactText: "Our team is here to help. Contact us for personalized assistance.",
      contactButton: "Contact Us",
      metaTitle: "FAQ | Tengcle Development LLC - NJ/NY Real Estate",
      metaDescription: "FAQ about Tengcle Development LLC: revitalizing and managing older apartment buildings in New Jersey, short-term rental planning, and NMR Pipetector pilot trials.",
      metaKeywords: "Tengcle Development LLC, FAQ, property management, property revitalization, New Jersey"
    },
    ja: {
      title: "よくある質問",
      subtitle: "建物の再生と管理、配管の先行試験に関するよくある質問",
      backToHome: "ホームに戻る",
      contactTitle: "まだ質問がありますか？",
      contactText: "私たちのチームがお手伝いします。お気軽にお問い合わせください。",
      contactButton: "お問い合わせ",
      metaTitle: "よくある質問 | Tengcle Development LLC NJ/NY",
      metaDescription: "Tengcle Development LLCのよくある質問。ニュージャージーの古い集合住宅の再生と管理、短期滞在の運営計画、NMR Pipetector の先行試験について。",
      metaKeywords: "Tengcle Development LLC, FAQ, 不動産管理, 物件再生, 修繕, NJ"
    },
    zh: {
      title: "常见问题",
      subtitle: "关于建筑再生与管理以及 NMR Pipetector 试点测试的常见问题",
      backToHome: "返回首页",
      contactTitle: "还有问题吗？",
      contactText: "我们的团队随时为您提供帮助。请联系我们获取个性化协助。",
      contactButton: "联系我们",
      metaTitle: "常见问题 | Tengcle Development LLC NJ/NY",
      metaDescription: "Tengcle Development LLC 常见问题：新泽西州老旧公寓楼的再生与管理、短租运营规划，以及 NMR Pipetector 试点测试。",
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

      <main id="main-content" tabIndex={-1}>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-purple-deep overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 pattern-seigaiha" />
          </div>
          <div className="container relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={heroStagger}
              className="max-w-3xl"
            >
              <motion.p
                variants={heroFadeInUp}
                className="text-gold text-sm tracking-widest uppercase mb-4"
              >
                Tengcle Development LLC
              </motion.p>
              <motion.h1
                variants={heroFadeInUp}
                className={`font-heading text-4xl md:text-5xl text-white mb-6 ${fontClass}`}
              >
                {t.title}
              </motion.h1>
              <motion.p
                variants={heroFadeInUp}
                className={`text-xl text-gray-300 ${fontClass}`}
              >
                {t.subtitle}
              </motion.p>
            </motion.div>
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
