/**
 * Language Context - Multi-language Support
 * 
 * Provides English and Japanese translations for the entire site.
 * Default language: English (for international compliance review)
 */

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type Language = "en" | "ja";

interface Translations {
  // Navigation
  nav: {
    home: string;
    services: string;
    portfolio: string;
    about: string;
    contact: string;
  };
  // Hero Section
  hero: {
    tagline: string;
    headline1: string;
    headline2: string;
    subtitle: string;
    cta1: string;
    cta2: string;
    trust1: string;
    trust2: string;
    trust3: string;
  };
  // Services
  services: {
    title: string;
    subtitle: string;
    description: string;
    sourcing: {
      title: string;
      subtitle: string;
      description: string;
    };
    integration: {
      title: string;
      subtitle: string;
      description: string;
    };
    supplyChain: {
      title: string;
      subtitle: string;
      description: string;
    };
    viewAll: string;
  };
  // Portfolio
  portfolio: {
    title: string;
    subtitle: string;
    description: string;
    viewCase: string;
    japan: {
      title: string;
      description: string;
    };
    myanmar: {
      title: string;
      description: string;
    };
  };
  // About
  about: {
    title: string;
    subtitle: string;
    description: string;
    story: {
      title: string;
      p1: string;
      p2: string;
      p3: string;
    };
    mission: string;
    values: string;
    approach: string;
  };
  // Contact
  contact: {
    title: string;
    subtitle: string;
    description: string;
    form: {
      name: string;
      company: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
      send: string;
      sending: string;
      success: string;
      successMessage: string;
    };
    info: {
      title: string;
      email: string;
      operations: string;
      registered: string;
      hours: string;
    };
  };
  // Footer
  footer: {
    description: string;
    navigation: string;
    contact: string;
    licensed: string;
  };
  // Common
  common: {
    learnMore: string;
    getInTouch: string;
    viewWork: string;
    trustCompliance: string;
    qualityStandards: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      portfolio: "Portfolio",
      about: "About",
      contact: "Contact",
    },
    hero: {
      tagline: "Global Hotel Sourcing & Project Integration",
      headline1: "Delivering Excellence",
      headline2: "Worldwide",
      subtitle: "Hong Kong-based sourcing specialists applying Japanese quality standards to luxury hospitality projects across Asia and beyond.",
      cta1: "View Our Projects",
      cta2: "Contact Us",
      trust1: "TCSP Licensed (TC007820)",
      trust2: "Hong Kong Registered",
      trust3: "Global Operations",
    },
    services: {
      title: "Comprehensive Solutions",
      subtitle: "Our Services",
      description: "From sourcing to delivery, we provide end-to-end solutions for luxury hospitality projects with unwavering commitment to quality and compliance.",
      sourcing: {
        title: "Global Hotel Sourcing",
        subtitle: "FF&E / OS&E Procurement",
        description: "FF&E and OS&E procurement from worldwide manufacturers, applying Japanese quality standards to every item.",
      },
      integration: {
        title: "Project Integration",
        subtitle: "End-to-End Management",
        description: "End-to-end management of large-scale hotel and mixed-use developments, from design support to infrastructure.",
      },
      supplyChain: {
        title: "Supply Chain Management",
        subtitle: "Logistics & Compliance",
        description: "International logistics, customs compliance, and quality inspection services ensuring seamless delivery.",
      },
      viewAll: "Explore All Services",
    },
    portfolio: {
      title: "Proven Track Record of Excellence",
      subtitle: "Our Portfolio",
      description: "From Japan's most prestigious hotels to landmark developments in Southeast Asia, our portfolio demonstrates our commitment to quality and reliability.",
      viewCase: "View Case Studies",
      japan: {
        title: "Japanese Quality, Global Reach",
        description: "Our deep involvement in Japan's luxury hotel sector has established our reputation for uncompromising quality.",
      },
      myanmar: {
        title: "Yangon International Hotel",
        description: "Lead sourcing agent for a landmark 500-room mixed-use hotel development, managing a $20M+ procurement scope.",
      },
    },
    about: {
      title: "Hong Kong's Gateway to Global Excellence",
      subtitle: "About Us",
      description: "Tengcle Limited is a Hong Kong-based global sourcing and project integration company.",
      story: {
        title: "Built on Trust & Expertise",
        p1: "Founded in Hong Kong, Tengcle Limited has established itself as a trusted partner for luxury hospitality projects.",
        p2: "Our deep involvement in Japan's prestigious hotel sector has shaped our commitment to uncompromising quality standards.",
        p3: "From our strategic Hong Kong base, we coordinate global supply chains and ensure seamless delivery worldwide.",
      },
      mission: "To deliver world-class hospitality solutions by bridging global manufacturers with discerning clients.",
      values: "Integrity, excellence, and transparency guide every decision.",
      approach: "We combine global reach with local expertise, ensuring cultural sensitivity and regulatory compliance.",
    },
    contact: {
      title: "Let's Start a Conversation",
      subtitle: "Contact Us",
      description: "Whether you're planning a new hospitality project or seeking a reliable sourcing partner, we're here to help.",
      form: {
        name: "Name",
        company: "Company",
        email: "Email",
        phone: "Phone",
        subject: "Subject",
        message: "Message",
        send: "Send Message",
        sending: "Sending...",
        success: "Thank You",
        successMessage: "Your inquiry has been received. We will contact you shortly.",
      },
      info: {
        title: "Contact Information",
        email: "Email",
        operations: "Operations Office",
        registered: "Registered Office",
        hours: "Business Hours",
      },
    },
    footer: {
      description: "A Hong Kong-based global sourcing and project integration company, delivering world-class hospitality solutions with Japanese quality standards.",
      navigation: "Navigation",
      contact: "Contact",
      licensed: "Licensed & Registered",
    },
    common: {
      learnMore: "Learn More",
      getInTouch: "Get in Touch",
      viewWork: "View Our Work",
      trustCompliance: "Trust & Compliance",
      qualityStandards: "Quality Standards",
    },
  },
  ja: {
    nav: {
      home: "ホーム",
      services: "サービス",
      portfolio: "実績",
      about: "会社概要",
      contact: "お問い合わせ",
    },
    hero: {
      tagline: "グローバルホテル調達 & プロジェクト統合",
      headline1: "卓越した品質を",
      headline2: "世界へ",
      subtitle: "香港を拠点に、日本の品質基準をアジア全域の高級ホスピタリティプロジェクトに適用する調達スペシャリスト。",
      cta1: "プロジェクトを見る",
      cta2: "お問い合わせ",
      trust1: "TCSPライセンス取得（TC007820）",
      trust2: "香港法人登記済",
      trust3: "グローバル展開",
    },
    services: {
      title: "包括的なソリューション",
      subtitle: "サービス内容",
      description: "調達から納品まで、品質とコンプライアンスへの揺るぎないコミットメントで、高級ホスピタリティプロジェクトにエンドツーエンドのソリューションを提供します。",
      sourcing: {
        title: "グローバルホテル調達",
        subtitle: "FF&E / OS&E 調達",
        description: "世界中のメーカーからFF&EおよびOS&Eを調達し、日本の品質基準をすべてのアイテムに適用します。",
      },
      integration: {
        title: "プロジェクト統合",
        subtitle: "エンドツーエンド管理",
        description: "設計サポートからインフラまで、大規模ホテルおよび複合開発のエンドツーエンド管理。",
      },
      supplyChain: {
        title: "サプライチェーン管理",
        subtitle: "物流 & コンプライアンス",
        description: "国際物流、通関コンプライアンス、品質検査サービスでシームレスな納品を確保します。",
      },
      viewAll: "すべてのサービスを見る",
    },
    portfolio: {
      title: "実績に裏付けられた卓越性",
      subtitle: "ポートフォリオ",
      description: "日本の最高級ホテルから東南アジアのランドマーク開発まで、私たちのポートフォリオは品質と信頼性へのコミットメントを示しています。",
      viewCase: "事例を見る",
      japan: {
        title: "日本品質、グローバル展開",
        description: "日本の高級ホテルセクターへの深い関与が、妥協のない品質への評判を確立しました。",
      },
      myanmar: {
        title: "ヤンゴン国際ホテル",
        description: "500室の複合ホテル開発のリードソーシングエージェントとして、2,000万ドル以上の調達範囲を管理。",
      },
    },
    about: {
      title: "香港からグローバルな卓越性へ",
      subtitle: "会社概要",
      description: "Tengcle Limitedは、香港を拠点とするグローバル調達およびプロジェクト統合会社です。",
      story: {
        title: "信頼と専門性の上に構築",
        p1: "香港で設立されたTengcle Limitedは、高級ホスピタリティプロジェクトの信頼できるパートナーとしての地位を確立しました。",
        p2: "日本の名門ホテルセクターへの深い関与が、妥協のない品質基準へのコミットメントを形成しました。",
        p3: "戦略的な香港拠点から、グローバルなサプライチェーンを調整し、世界中へのシームレスな納品を確保します。",
      },
      mission: "グローバルメーカーと目の肥えたクライアントを結びつけ、世界クラスのホスピタリティソリューションを提供すること。",
      values: "誠実さ、卓越性、透明性がすべての決定を導きます。",
      approach: "グローバルなリーチとローカルな専門知識を組み合わせ、文化的感受性と規制コンプライアンスを確保します。",
    },
    contact: {
      title: "お気軽にご相談ください",
      subtitle: "お問い合わせ",
      description: "新しいホスピタリティプロジェクトを計画中の方も、信頼できる調達パートナーをお探しの方も、お気軽にご連絡ください。",
      form: {
        name: "お名前",
        company: "会社名",
        email: "メールアドレス",
        phone: "電話番号",
        subject: "件名",
        message: "メッセージ",
        send: "送信する",
        sending: "送信中...",
        success: "ありがとうございます",
        successMessage: "お問い合わせを受け付けました。担当者より折り返しご連絡いたします。",
      },
      info: {
        title: "連絡先情報",
        email: "メール",
        operations: "実務拠点",
        registered: "登記住所",
        hours: "営業時間",
      },
    },
    footer: {
      description: "香港を拠点とするグローバル調達およびプロジェクト統合会社。日本の品質基準で世界クラスのホスピタリティソリューションを提供します。",
      navigation: "ナビゲーション",
      contact: "お問い合わせ",
      licensed: "ライセンス & 登記",
    },
    common: {
      learnMore: "詳しく見る",
      getInTouch: "お問い合わせ",
      viewWork: "実績を見る",
      trustCompliance: "信頼 & コンプライアンス",
      qualityStandards: "品質基準",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "en" ? "ja" : "en"));
  }, []);

  const value = {
    language,
    setLanguage,
    t: translations[language],
    toggleLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
