/**
 * Privacy Policy Page
 * 
 * GDPR and privacy law compliant privacy policy page.
 * Supports multiple languages.
 */

import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, type Easing } from "framer-motion";
import { ArrowLeft, Shield, Cookie, Database, Lock, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";

const easeOut: Easing = [0.16, 1, 0.3, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut }
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

interface PolicySection {
  icon: React.ReactNode;
  title: string;
  content: string[];
}

const translations = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last Updated: December 2024",
    backToHome: "Back to Home",
    intro: "At Tengcle Group, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.",
    sections: [
      {
        icon: <Database className="w-6 h-6" />,
        title: "Information We Collect",
        content: [
          "Personal information you voluntarily provide (name, email, phone number) when contacting us or submitting inquiries.",
          "Automatically collected information including IP address, browser type, device information, and browsing behavior.",
          "Cookies and similar tracking technologies to enhance your browsing experience.",
        ],
      },
      {
        icon: <Lock className="w-6 h-6" />,
        title: "How We Use Your Information",
        content: [
          "To respond to your inquiries and provide customer support.",
          "To improve our website and services based on user feedback and behavior.",
          "To send periodic emails regarding our services (with your consent).",
          "To comply with legal obligations and protect our rights.",
        ],
      },
      {
        icon: <Cookie className="w-6 h-6" />,
        title: "Cookies and Tracking",
        content: [
          "Essential cookies: Required for the website to function properly.",
          "Analytics cookies: Help us understand how visitors interact with our website.",
          "Marketing cookies: Used to deliver relevant advertisements (only with your consent).",
          "You can control cookie preferences through your browser settings or our cookie consent banner.",
        ],
      },
      {
        icon: <Shield className="w-6 h-6" />,
        title: "Data Security",
        content: [
          "We implement appropriate technical and organizational measures to protect your personal data.",
          "All data transmissions are encrypted using SSL/TLS technology.",
          "Access to personal information is restricted to authorized personnel only.",
          "We regularly review and update our security practices.",
        ],
      },
      {
        icon: <Globe className="w-6 h-6" />,
        title: "International Data Transfers",
        content: [
          "Your information may be transferred to and processed in countries other than your country of residence.",
          "We ensure appropriate safeguards are in place for international data transfers.",
          "For EU residents, we comply with GDPR requirements for data transfers.",
        ],
      },
      {
        icon: <Mail className="w-6 h-6" />,
        title: "Your Rights",
        content: [
          "Right to access: You can request a copy of your personal data.",
          "Right to rectification: You can request correction of inaccurate data.",
          "Right to erasure: You can request deletion of your personal data.",
          "Right to object: You can object to certain processing of your data.",
          "To exercise these rights, please contact us at privacy@tengcle.com.",
        ],
      },
    ] as PolicySection[],
    contact: {
      title: "Contact Us",
      content: "If you have any questions about this Privacy Policy or our data practices, please contact us:",
      email: "privacy@tengcle.com",
      address: "Tengcle Limited, Hong Kong",
    },
  },
  ja: {
    title: "プライバシーポリシー",
    lastUpdated: "最終更新日: 2024年12月",
    backToHome: "ホームに戻る",
    intro: "Tengcle Groupは、お客様のプライバシーを保護し、個人情報のセキュリティを確保することに取り組んでいます。このプライバシーポリシーは、当社のウェブサイトをご利用いただく際に、お客様の情報をどのように収集、使用、開示、保護するかについて説明しています。",
    sections: [
      {
        icon: <Database className="w-6 h-6" />,
        title: "収集する情報",
        content: [
          "お問い合わせやご依頼の際に自発的にご提供いただく個人情報（氏名、メールアドレス、電話番号）。",
          "IPアドレス、ブラウザの種類、デバイス情報、閲覧行動などの自動的に収集される情報。",
          "ブラウジング体験を向上させるためのCookieおよび類似の追跡技術。",
        ],
      },
      {
        icon: <Lock className="w-6 h-6" />,
        title: "情報の利用目的",
        content: [
          "お問い合わせへの対応およびカスタマーサポートの提供。",
          "ユーザーのフィードバックと行動に基づくウェブサイトとサービスの改善。",
          "当社のサービスに関する定期的なメールの送信（お客様の同意を得た場合）。",
          "法的義務の遵守および当社の権利の保護。",
        ],
      },
      {
        icon: <Cookie className="w-6 h-6" />,
        title: "Cookieとトラッキング",
        content: [
          "必須Cookie：ウェブサイトが正常に機能するために必要です。",
          "分析Cookie：訪問者がウェブサイトとどのように対話するかを理解するのに役立ちます。",
          "マーケティングCookie：関連性の高い広告を配信するために使用されます（お客様の同意がある場合のみ）。",
          "ブラウザの設定またはCookie同意バナーからCookieの設定を管理できます。",
        ],
      },
      {
        icon: <Shield className="w-6 h-6" />,
        title: "データセキュリティ",
        content: [
          "お客様の個人データを保護するために適切な技術的・組織的措置を実施しています。",
          "すべてのデータ送信はSSL/TLS技術を使用して暗号化されています。",
          "個人情報へのアクセスは、権限を持つ担当者のみに制限されています。",
          "セキュリティ対策を定期的に見直し、更新しています。",
        ],
      },
      {
        icon: <Globe className="w-6 h-6" />,
        title: "国際データ転送",
        content: [
          "お客様の情報は、居住国以外の国に転送され、処理される場合があります。",
          "国際データ転送に対して適切な保護措置を講じています。",
          "EU居住者の方については、GDPRのデータ転送要件を遵守しています。",
        ],
      },
      {
        icon: <Mail className="w-6 h-6" />,
        title: "お客様の権利",
        content: [
          "アクセス権：個人データのコピーを請求できます。",
          "訂正権：不正確なデータの訂正を請求できます。",
          "消去権：個人データの削除を請求できます。",
          "異議申立権：特定のデータ処理に異議を唱えることができます。",
          "これらの権利を行使するには、privacy@tengcle.comまでご連絡ください。",
        ],
      },
    ] as PolicySection[],
    contact: {
      title: "お問い合わせ",
      content: "このプライバシーポリシーまたは当社のデータ取り扱いについてご質問がある場合は、以下までご連絡ください：",
      email: "privacy@tengcle.com",
      address: "Tengcle Limited, 香港",
    },
  },
  zh: {
    title: "隐私政策",
    lastUpdated: "最后更新：2024年12月",
    backToHome: "返回首页",
    intro: "Tengcle Group致力于保护您的隐私并确保您个人信息的安全。本隐私政策说明了当您访问我们的网站时，我们如何收集、使用、披露和保护您的信息。",
    sections: [
      {
        icon: <Database className="w-6 h-6" />,
        title: "我们收集的信息",
        content: [
          "您在联系我们或提交咨询时自愿提供的个人信息（姓名、电子邮件、电话号码）。",
          "自动收集的信息，包括IP地址、浏览器类型、设备信息和浏览行为。",
          "用于增强浏览体验的Cookie和类似跟踪技术。",
        ],
      },
      {
        icon: <Lock className="w-6 h-6" />,
        title: "我们如何使用您的信息",
        content: [
          "回复您的咨询并提供客户支持。",
          "根据用户反馈和行为改进我们的网站和服务。",
          "发送有关我们服务的定期电子邮件（经您同意）。",
          "遵守法律义务并保护我们的权利。",
        ],
      },
      {
        icon: <Cookie className="w-6 h-6" />,
        title: "Cookie和跟踪",
        content: [
          "必要Cookie：网站正常运行所必需的。",
          "分析Cookie：帮助我们了解访问者如何与我们的网站互动。",
          "营销Cookie：用于投放相关广告（仅在您同意的情况下）。",
          "您可以通过浏览器设置或我们的Cookie同意横幅控制Cookie偏好。",
        ],
      },
      {
        icon: <Shield className="w-6 h-6" />,
        title: "数据安全",
        content: [
          "我们实施适当的技术和组织措施来保护您的个人数据。",
          "所有数据传输均使用SSL/TLS技术加密。",
          "个人信息的访问仅限于授权人员。",
          "我们定期审查和更新我们的安全实践。",
        ],
      },
      {
        icon: <Globe className="w-6 h-6" />,
        title: "国际数据传输",
        content: [
          "您的信息可能会被传输到您居住国以外的国家并在那里处理。",
          "我们确保为国际数据传输采取适当的保护措施。",
          "对于欧盟居民，我们遵守GDPR的数据传输要求。",
        ],
      },
      {
        icon: <Mail className="w-6 h-6" />,
        title: "您的权利",
        content: [
          "访问权：您可以请求获取您个人数据的副本。",
          "更正权：您可以请求更正不准确的数据。",
          "删除权：您可以请求删除您的个人数据。",
          "反对权：您可以反对某些数据处理。",
          "要行使这些权利，请通过privacy@tengcle.com与我们联系。",
        ],
      },
    ] as PolicySection[],
    contact: {
      title: "联系我们",
      content: "如果您对本隐私政策或我们的数据处理有任何疑问，请联系我们：",
      email: "privacy@tengcle.com",
      address: "Tengcle Limited, 香港",
    },
  },
};

export default function Privacy() {
  const [location] = useLocation();

  // Determine language from URL
  const getLang = (): "en" | "ja" | "zh" => {
    if (location.includes("/ja")) return "ja";
    if (location.includes("/zh")) return "zh";
    return "en";
  };

  const lang = getLang();
  const t = translations[lang];

  // Determine back link based on current path
  const getBackLink = () => {
    if (location.startsWith("/hk")) return `/hk/${lang}`;
    if (location.startsWith("/jp")) return `/jp/${lang}`;
    if (location.startsWith("/us")) return `/us/${lang}`;
    return "/";
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <SEOHead
        title={lang === "ja" ? "プライバシーポリシー | Tengcle Group" : lang === "zh" ? "隐私政策 | Tengcle Group" : "Privacy Policy | Tengcle Group"}
        description={lang === "ja" ? "Tengcle Groupのプライバシーポリシー。個人情報の収集・利用・保護について。" : lang === "zh" ? "Tengcle Group隐私政策。个人信息的收集、使用和保护。" : "Tengcle Group privacy policy. How we collect, use and protect your personal information."}
        canonical={`https://www.tengcle.com${location === "/" ? "" : location}`}
        locale={lang === "ja" ? "ja_JP" : lang === "zh" ? "zh_CN" : "en_US"}
        keywords={lang === "ja" ? "Tengcle, プライバシー, 個人情報, データ保護" : lang === "zh" ? "Tengcle, 隐私, 个人信息, 数据保护" : "Tengcle, privacy policy, personal information, data protection"}
      />
      {/* Header */}
      <header className="bg-navy text-white py-6">
        <div className="container px-4">
          <Link href={getBackLink()}>
            <Button variant="ghost" className="text-white hover:bg-white/10 gap-2">
              <ArrowLeft className="w-4 h-4" />
              {t.backToHome}
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-12 md:py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          {/* Title */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-navy/10 rounded-full mb-6">
              <Shield className="w-8 h-8 text-navy" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading text-navy mb-4">
              {t.title}
            </h1>
            <p className="text-gray-500">{t.lastUpdated}</p>
          </motion.div>

          {/* Introduction */}
          <motion.div variants={fadeInUp} className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              {t.intro}
            </p>
          </motion.div>

          {/* Policy Sections */}
          <div className="space-y-8">
            {t.sections.map((section, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gold/10 rounded-lg text-gold">
                    {section.icon}
                  </div>
                  <h2 className="text-xl md:text-2xl font-heading text-navy">
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3 text-gray-600">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 bg-navy text-white rounded-xl p-6 md:p-8"
          >
            <h2 className="text-xl md:text-2xl font-heading mb-4">
              {t.contact.title}
            </h2>
            <p className="text-white/80 mb-4">
              {t.contact.content}
            </p>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold" />
                <a href={`mailto:${t.contact.email}`} className="text-gold hover:underline">
                  {t.contact.email}
                </a>
              </p>
              <p className="text-white/60 text-sm">
                {t.contact.address}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Tengcle Group. All rights reserved.</p>
      </footer>
    </div>
  );
}
