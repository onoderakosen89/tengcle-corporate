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
import ScrollToTop from "@/components/ScrollToTop";
import { cn } from "@/lib/utils";

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
      question: "What is TCSP licensing and why is it important?",
      answer: "TCSP (Trust or Company Service Provider) licensing is a regulatory requirement in Hong Kong for companies providing corporate services. Our TCSP license (TC007820) demonstrates our compliance with Hong Kong's anti-money laundering regulations and ensures we maintain the highest standards of corporate governance and due diligence."
    },
    {
      question: "Which regions does Tengcle Group operate in?",
      answer: "Tengcle Group operates globally with offices in three key regions: Hong Kong (Global Headquarters - Tengcle Limited), Japan (Tengcle Inc. - Tokyo), and the United States (Tengcle LLC - New Jersey). We serve clients throughout Asia-Pacific, including China, Southeast Asia, and beyond."
    },
    {
      question: "How can I request a quote for hotel FF&E procurement?",
      answer: "To request a quote, please visit our Contact page and fill out the inquiry form with details about your project, including property type, room count, timeline, and specific requirements. Our team will respond within 2 business days with a preliminary assessment and next steps."
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
      answer: "Tengcle maintains international quality standards and works with ISO-certified suppliers. Our Hong Kong office holds TCSP license TC007820 and is registered with the Hong Kong Companies Registry (BR: 65188837). We conduct rigorous quality inspections at every stage of the procurement process."
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
      question: "TCSPライセンスとは何ですか？なぜ重要ですか？",
      answer: "TCSP（信託または会社サービスプロバイダー）ライセンスは、香港で企業サービスを提供する会社に必要な規制要件です。当社のTCSPライセンス（TC007820）は、香港のマネーロンダリング防止規制への準拠を証明し、最高水準のコーポレートガバナンスとデューデリジェンスを維持していることを保証します。"
    },
    {
      question: "Tengcle Groupはどの地域で事業を展開していますか？",
      answer: "Tengcle Groupは、3つの主要地域にオフィスを構えてグローバルに事業を展開しています：香港（グローバル本社 - Tengcle Limited）、日本（Tengcle Inc. - 東京）、アメリカ（Tengcle LLC - ニュージャージー）。中国、東南アジアを含むアジア太平洋地域全体のお客様にサービスを提供しています。"
    },
    {
      question: "ホテルFF&E調達の見積もりを依頼するにはどうすればよいですか？",
      answer: "見積もりをご依頼いただくには、お問い合わせページにアクセスし、プロジェクトの詳細（物件タイプ、客室数、スケジュール、具体的な要件など）を記入してお問い合わせフォームを送信してください。2営業日以内に予備評価と次のステップについてご連絡いたします。"
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
      answer: "Tengcleは国際品質基準を維持し、ISO認証を取得したサプライヤーと協力しています。香港オフィスはTCSPライセンスTC007820を保有し、香港会社登記所に登録されています（BR: 65188837）。調達プロセスのすべての段階で厳格な品質検査を実施しています。"
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
      question: "什么是TCSP许可证？为什么它很重要？",
      answer: "TCSP（信托或公司服务提供商）许可证是香港对提供企业服务的公司的监管要求。我们的TCSP许可证（TC007820）证明我们符合香港的反洗钱法规，并确保我们保持最高标准的公司治理和尽职调查。"
    },
    {
      question: "Tengcle Group在哪些地区运营？",
      answer: "Tengcle Group在三个主要地区设有办事处，进行全球运营：香港（全球总部 - Tengcle Limited）、日本（Tengcle Inc. - 东京）和美国（Tengcle LLC - 新泽西）。我们为包括中国、东南亚在内的整个亚太地区的客户提供服务。"
    },
    {
      question: "如何申请酒店FF&E采购报价？",
      answer: "要申请报价，请访问我们的联系页面，填写询问表格，包括项目详情（物业类型、房间数量、时间表和具体要求）。我们的团队将在2个工作日内回复初步评估和后续步骤。"
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
      answer: "Tengcle保持国际质量标准，并与ISO认证的供应商合作。我们的香港办事处持有TCSP许可证TC007820，并在香港公司注册处注册（BR: 65188837）。我们在采购过程的每个阶段进行严格的质量检查。"
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
      title: "FAQ | Tengcle Limited - Frequently Asked Questions",
      description: "Find answers to frequently asked questions about Tengcle Limited's hotel FF&E procurement, TCSP licensing, IT solutions, and international services.",
      keywords: "Tengcle FAQ, hotel FF&E questions, TCSP license, Hong Kong company services, hospitality procurement"
    },
    ja: {
      title: "よくある質問 | Tengcle Limited - FAQ",
      description: "Tengcle Limitedのホテル FF&E調達、TCSPライセンス、ITソリューション、国際サービスに関するよくある質問への回答をご覧ください。",
      keywords: "Tengcle FAQ, ホテルFF&E, TCSPライセンス, 香港企業サービス, ホスピタリティ調達"
    },
    zh: {
      title: "常见问题 | Tengcle Limited - FAQ",
      description: "查找有关Tengcle Limited酒店FF&E采购、TCSP许可证、IT解决方案和国际服务的常见问题解答。",
      keywords: "Tengcle FAQ, 酒店FF&E, TCSP许可证, 香港公司服务, 酒店采购"
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
        canonical={`https://tengcle.com/hk/${language}/faq`}
        locale={language === "ja" ? "ja_JP" : language === "zh" ? "zh_CN" : "en_HK"}
        ogImage="/images/og-image-hk.jpg"
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
      <ScrollToTop region="hk" />
    </div>
  );
}
