/**
 * FAQ Page - Frequently Asked Questions
 * 
 * Design Philosophy:
 * - Clean, accessible accordion-style FAQ
 * - SEO optimized with FAQPage structured data
 * - Multi-language support
 */

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowLeft, HelpCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SEOHead, { generateFAQSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { publicContactEmails } from "@/data/companyProfiles";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: Record<string, FAQItem[]> = {
  en: [
    {
      question: "What services does Tengcle Limited offer?",
      answer: "Tengcle Limited specializes in hotel FF&E (Furniture, Fixtures & Equipment) procurement, project integration services, IT solutions including Odoo ERP implementation, and international trading. We serve clients across Asia-Pacific, with a focus on hospitality and real estate development projects."
    },
    {
      question: "What regulatory compliance does Tengcle maintain?",
      answer: "Tengcle Limited conducts its business in accordance with the laws and regulations applicable in Hong Kong and reviews each engagement with appropriate care."
    },
    {
      question: "Which Tengcle regional sites are available?",
      answer: "This website provides regional sites for Hong Kong, Japan, and the United States, each with local business information and contact details."
    },
    {
      question: "How can I request a quote for hotel FF&E procurement?",
      answer: `Please email ${publicContactEmails.general.hk} with details about your project, including property type, room count, timeline, and specific requirements.`
    },
    {
      question: "What is the typical timeline for a hotel FF&E project?",
      answer: "Project timelines vary based on scope and complexity. A typical hotel FF&E project takes 6-12 months from initial consultation to final delivery. This includes design consultation (1-2 months), sourcing and manufacturing (3-6 months), quality control (ongoing), and logistics/installation (1-2 months)."
    },
    {
      question: "Does Tengcle provide IT solutions for hotels?",
      answer: "Yes, we offer comprehensive IT solutions including Odoo ERP setup and customization, API development for property management systems, revenue management consulting, and operations optimization. Our IT services are designed specifically for the hospitality industry."
    },
    {
      question: "What quality certifications does Tengcle hold?",
      answer: "Quality requirements are reviewed for each project, with supplier and product checks tailored to the engagement."
    },
    {
      question: "Can Tengcle handle international shipping and logistics?",
      answer: "Yes, we provide end-to-end logistics services including international shipping, customs clearance, warehousing, and final delivery. Our established supplier network across China, Southeast Asia, and Europe enables efficient and cost-effective global distribution."
    }
  ],
  ja: [
    {
      question: "Tengcle Limitedはどのようなサービスを提供していますか？",
      answer: "Tengcle Limitedは、ホテルFF&E（家具・備品・設備）調達、プロジェクト統合サービス、Odoo ERP導入を含むITソリューション、国際貿易を専門としています。アジア太平洋地域のお客様に、ホスピタリティおよび不動産開発プロジェクトを中心にサービスを提供しています。"
    },
    {
      question: "Tengcleはどのような法令遵守を行っていますか？",
      answer: "Tengcle Limitedは、香港で適用される法令に沿って事業を行い、案件ごとに必要な確認を丁寧に進めています。"
    },
    {
      question: "このサイトではどの地域の情報を見られますか？",
      answer: "香港・日本・米国の地域サイトをご覧いただけます。各サイトで、その地域の事業内容と連絡先をご案内しています。"
    },
    {
      question: "ホテルFF&E調達の見積もりを依頼するにはどうすればよいですか？",
      answer: `物件タイプ、客室数、スケジュール、具体的な要件などのプロジェクト詳細を${publicContactEmails.general.hk}までメールでお送りください。`
    },
    {
      question: "ホテルFF&Eプロジェクトの一般的なスケジュールはどのくらいですか？",
      answer: "プロジェクトのスケジュールは、規模と複雑さによって異なります。一般的なホテルFF&Eプロジェクトは、初回相談から最終納品まで6〜12ヶ月かかります。これには、デザインコンサルテーション（1〜2ヶ月）、調達・製造（3〜6ヶ月）、品質管理（継続的）、物流・設置（1〜2ヶ月）が含まれます。"
    },
    {
      question: "TengcleはホテルにITソリューションを提供していますか？",
      answer: "はい、Odoo ERPのセットアップとカスタマイズ、プロパティマネジメントシステム向けAPI開発、レベニューマネジメントコンサルティング、オペレーション最適化など、包括的なITソリューションを提供しています。当社のITサービスは、ホスピタリティ業界向けに特別に設計されています。"
    },
    {
      question: "Tengcleはどのような品質認証を取得していますか？",
      answer: "案件ごとに求められる品質条件を確認し、内容に応じてサプライヤーや製品の確認を行います。"
    },
    {
      question: "Tengcleは国際配送と物流を扱えますか？",
      answer: "はい、国際配送、通関、倉庫保管、最終配送を含むエンドツーエンドの物流サービスを提供しています。中国、東南アジア、ヨーロッパにわたる確立されたサプライヤーネットワークにより、効率的でコスト効果の高いグローバル配送が可能です。"
    }
  ],
  zh: [
    {
      question: "Tengcle Limited提供哪些服务？",
      answer: "Tengcle Limited专注于酒店FF&E（家具、固定装置和设备）采购、项目整合服务、包括Odoo ERP实施在内的IT解决方案以及国际贸易。我们为亚太地区的客户提供服务，重点关注酒店和房地产开发项目。"
    },
    {
      question: "Tengcle遵守哪些法规？",
      answer: "Tengcle Limited依据香港适用的法律法规开展业务，并根据每个项目进行必要而审慎的审核。"
    },
    {
      question: "本网站提供哪些地区的信息？",
      answer: "本网站提供香港、日本和美国的地区网站，各网站分别介绍当地业务与联系方式。"
    },
    {
      question: "如何申请酒店FF&E采购报价？",
      answer: `请将物业类型、房间数量、时间表和具体要求等项目详情发送至${publicContactEmails.general.hk}。`
    },
    {
      question: "酒店FF&E项目的典型时间表是多长？",
      answer: "项目时间表因范围和复杂性而异。典型的酒店FF&E项目从初次咨询到最终交付需要6-12个月。这包括设计咨询（1-2个月）、采购和制造（3-6个月）、质量控制（持续进行）和物流/安装（1-2个月）。"
    },
    {
      question: "Tengcle为酒店提供IT解决方案吗？",
      answer: "是的，我们提供全面的IT解决方案，包括Odoo ERP设置和定制、物业管理系统API开发、收益管理咨询和运营优化。我们的IT服务专为酒店业设计。"
    },
    {
      question: "Tengcle持有哪些质量认证？",
      answer: "我们会根据每个项目确认质量要求，并按项目内容审核供应商与产品。"
    },
    {
      question: "Tengcle能处理国际运输和物流吗？",
      answer: "是的，我们提供端到端的物流服务，包括国际运输、清关、仓储和最终交付。我们在中国、东南亚和欧洲建立的供应商网络使高效且具有成本效益的全球配送成为可能。"
    }
  ]
};

function FAQAccordion({ items, language }: { items: FAQItem[]; language: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const getFontClass = () => {
    if (language === "ja") return "font-jp";
    if (language === "zh") return "font-zh";
    return "font-body";
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className={cn(
              "w-full px-6 py-5 text-left flex items-center justify-between gap-4",
              "hover:bg-gray-50 transition-colors",
              getFontClass()
            )}
          >
            <span className="font-medium text-navy pr-4">{item.question}</span>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <ChevronDown className="w-5 h-5 text-gold" />
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
                <div className={cn("px-6 pb-5 text-slate leading-relaxed", getFontClass())}>
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

export default function FAQ() {
  const { language, t } = useLanguage();
  const [location] = useLocation();
  const pathLang = location.split("/")[2] || "en";
  const basePath = `/hk/${pathLang}`;

  const currentFAQs = faqData[language] || faqData.en;

  // Generate FAQ structured data for SEO
  const faqStructuredData = generateFAQSchema(
    currentFAQs.map(faq => ({
      question: faq.question,
      answer: faq.answer
    }))
  );

  const seoData = {
    en: {
      title: "FAQ | Tengcle Limited Hong Kong",
      description: "Answers about Tengcle Limited's hotel FF&E procurement & IT solutions in Hong Kong.",
      keywords: "Tengcle FAQ, hotel FF&E, Hong Kong, hospitality"
    },
    ja: {
      title: "よくある質問 | Tengcle Limited 香港",
      description: "Tengcle LimitedのホテルFF&E調達、ITソリューションに関するFAQ。",
      keywords: "Tengcle FAQ, ホテルFF&E, 香港, ホスピタリティ"
    },
    zh: {
      title: "常见问题 | Tengcle Limited 香港",
      description: "关于Tengcle Limited酒店FF&E采购及IT解决方案的常见问题解答。",
      keywords: "Tengcle FAQ, 酒店FF&E, 香港, 酒店业"
    }
  };

  const currentSeo = seoData[language as keyof typeof seoData] || seoData.en;

  const pageLabels = {
    en: { title: "Frequently Asked Questions", subtitle: "Find answers to common questions", back: "Back to Home" },
    ja: { title: "よくある質問", subtitle: "よくあるご質問への回答", back: "ホームに戻る" },
    zh: { title: "常见问题", subtitle: "查找常见问题的答案", back: "返回首页" }
  };

  const labels = pageLabels[language as keyof typeof pageLabels] || pageLabels.en;

  const getFontClass = () => {
    if (language === "ja") return "font-jp";
    if (language === "zh") return "font-zh";
    return "font-body";
  };

  const getHeadingFontClass = () => {
    if (language === "ja") return "font-jp";
    if (language === "zh") return "font-zh";
    return "font-heading";
  };

  return (
    <div className="min-h-screen bg-light-gray" data-region="hk">
      <SEOHead
        title={currentSeo.title}
        description={currentSeo.description}
        canonical={`https://www.tengcle.com/hk/${language}/faq`}
        locale={language === "ja" ? "ja_JP" : language === "zh" ? "zh_CN" : "en_HK"}
        ogImage="/images/og-image.webp"
        keywords={currentSeo.keywords}
        structuredData={faqStructuredData}
      />
      <Header />

      {/* Hero Section */}
      <section className="bg-purple-deep pt-32 pb-16">
        <div className="container">
          <Link href={basePath}>
            <button className={cn(
              "inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors mb-8",
              getFontClass()
            )}>
              <ArrowLeft className="w-4 h-4" />
              {labels.back}
            </button>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-gold" />
            </div>
            <h1 className={cn("text-3xl md:text-4xl text-white", getHeadingFontClass())}>
              {labels.title}
            </h1>
          </div>
          <p className={cn("text-gray-300", getFontClass())}>
            {labels.subtitle}
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <FAQAccordion items={currentFAQs} language={language} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container text-center">
          <h2 className={cn("text-2xl text-navy mb-4", getHeadingFontClass())}>
            {language === "ja" ? "他にご質問がありますか？" : language === "zh" ? "还有其他问题吗？" : "Still have questions?"}
          </h2>
          <p className={cn("text-slate mb-8", getFontClass())}>
            {language === "ja" ? "お気軽にお問い合わせください。" : language === "zh" ? "请随时与我们联系。" : "Feel free to reach out to our team."}
          </p>
          <Link href={`${basePath}/contact`}>
            <button className={cn(
              "inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-medium rounded hover:bg-gold-dark transition-colors",
              getFontClass()
            )}>
              {language === "ja" ? "お問い合わせ" : language === "zh" ? "联系我们" : "Contact Us"}
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
