/**
 * Language Context - Multi-language Support
 * Supports: English (EN), Japanese (JA), Chinese Simplified (ZH)
 */

import { createContext, useContext, useState, type ReactNode } from "react";

type Language = "en" | "ja" | "zh";

interface Translations {
  nav: {
    home: string;
    services: string;
    portfolio: string;
    about: string;
    contact: string;
  };
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
  services: {
    subtitle: string;
    title: string;
    description: string;
    viewAll: string;
    hospitality: {
      title: string;
      description: string;
    };
    integration: {
      title: string;
      description: string;
    };
    operations: {
      title: string;
      description: string;
    };
    ip: {
      title: string;
      description: string;
    };
    trading: {
      title: string;
      description: string;
    };
  };
  portfolio: {
    subtitle: string;
    title: string;
    description: string;
    viewCase: string;
    project1: {
      title: string;
      location: string;
      description: string;
    };
    project2: {
      title: string;
      location: string;
      description: string;
    };
  };
  about: {
    subtitle: string;
    title: string;
    description: string;
    story: {
      title: string;
      p1: string;
      p2: string;
    };
    info: {
      title: string;
      legalName: string;
      brNo: string;
      tcsp: string;
    };
    philosophy: {
      title: string;
      mission: string;
      missionText: string;
      values: string;
      valuesText: string;
    };
  };
  contact: {
    subtitle: string;
    title: string;
    description: string;
    email: string;
    info: {
      hkOffice: string;
      jpOffice1: string;
      jpOffice2: string;
      usOffice: string;
    };
  };
  footer: {
    description: string;
    navigation: string;
    contact: string;
    japan: string;
    usa: string;
  };
  common: {
    learnMore: string;
    getInTouch: string;
    trustCompliance: string;
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
      tagline: "Global Business Solutions from Hong Kong",
      headline1: "Bridging Excellence",
      headline2: "Across Asia",
      subtitle: "Hong Kong-based specialists delivering comprehensive business solutions—from hospitality procurement to IT systems and international trade.",
      cta1: "View Our Services",
      cta2: "Contact Us",
      trust1: "TCSP Licensed",
      trust2: "Hong Kong Registered",
      trust3: "Global Operations",
    },
    services: {
      subtitle: "Our Services",
      title: "Comprehensive Business Solutions",
      description: "From hospitality procurement to IT solutions and international trade, we provide end-to-end services with unwavering commitment to quality.",
      viewAll: "Explore All Services",
      hospitality: {
        title: "Hospitality Procurement",
        description: "Complete FF&E and OS&E sourcing for hotels and hospitality projects, including furniture, fixtures, equipment, and construction materials.",
      },
      integration: {
        title: "Project Integration",
        description: "End-to-end project management, supply chain optimization, quality control, and logistics coordination for complex developments.",
      },
      operations: {
        title: "Hotel Operations & IT",
        description: "Odoo ERP implementation and customization, API development, revenue management, and operational consulting for hospitality businesses.",
      },
      ip: {
        title: "IP & Character Goods",
        description: "Character merchandise development, manufacturing coordination, quality inspection, inventory management, and IP rights administration.",
      },
      trading: {
        title: "Trading & Wholesale",
        description: "International trade services and wholesale distribution to construction companies, leveraging our global supplier network.",
      },
    },
    portfolio: {
      subtitle: "Our Portfolio",
      title: "Proven Track Record",
      description: "From large-scale hotel developments to IT system implementations, our portfolio demonstrates our commitment to excellence.",
      viewCase: "View Details",
      project1: {
        title: "Luxury Hotel Complex",
        location: "Southeast Asia",
        description: "Comprehensive project including main building renovation, annex interior fit-out, and 400+ room new hotel construction and operations.",
      },
      project2: {
        title: "Hotel Management System",
        location: "Southeast Asia",
        description: "Odoo ERP implementation with advanced customization, API development, and operational system integration.",
      },
    },
    about: {
      subtitle: "About Us",
      title: "Hong Kong's Gateway to Global Excellence",
      description: "Tengcle Limited is a Hong Kong-based company providing comprehensive business solutions across hospitality, IT, and international trade.",
      story: {
        title: "Our Story",
        p1: "Founded in Hong Kong, Tengcle Limited has established itself as a trusted partner for businesses requiring world-class procurement, project integration, and IT solutions.",
        p2: "From our strategic Hong Kong base, we coordinate global supply chains, manage complex projects, and deliver innovative solutions to clients across Asia and beyond.",
      },
      info: {
        title: "Company Information",
        legalName: "Legal Name",
        brNo: "Business Registration",
        tcsp: "TCSP License",
      },
      philosophy: {
        title: "Our Philosophy",
        mission: "Mission",
        missionText: "To deliver world-class business solutions by bridging global resources with discerning clients, applying the highest standards to every engagement.",
        values: "Values",
        valuesText: "Integrity, excellence, and transparency guide every decision. We believe trust is earned through consistent delivery and unwavering commitment to quality.",
      },
    },
    contact: {
      subtitle: "Contact Us",
      title: "Let's Start a Conversation",
      description: "Whether you're planning a new project or seeking a reliable business partner, we're here to help.",
      email: "Email",
      info: {
        hkOffice: "Hong Kong Office",
        jpOffice1: "Tokyo Office (Takanawa)",
        jpOffice2: "Tokyo Office (Tsukiji)",
        usOffice: "USA Office (Establishing)",
      },
    },
    footer: {
      description: "Hong Kong-based company providing comprehensive business solutions across hospitality, IT, and international trade.",
      navigation: "Navigation",
      contact: "Contact",
      japan: "Tengcle Inc. (Japan)",
      usa: "Tengcle LCC (USA)",
    },
    common: {
      learnMore: "Learn More",
      getInTouch: "Get in Touch",
      trustCompliance: "Trust & Compliance",
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
      tagline: "香港発、グローバルビジネスソリューション",
      headline1: "アジアを繋ぐ",
      headline2: "卓越したサービス",
      subtitle: "ホスピタリティ調達からITシステム、国際貿易まで、包括的なビジネスソリューションを提供する香港拠点のスペシャリスト。",
      cta1: "サービスを見る",
      cta2: "お問い合わせ",
      trust1: "TCSPライセンス取得",
      trust2: "香港法人登記済",
      trust3: "グローバル展開",
    },
    services: {
      subtitle: "サービス",
      title: "包括的なビジネスソリューション",
      description: "ホスピタリティ調達からITソリューション、国際貿易まで、品質への揺るぎないコミットメントでエンドツーエンドのサービスを提供します。",
      viewAll: "すべてのサービスを見る",
      hospitality: {
        title: "ホスピタリティ調達",
        description: "ホテル・ホスピタリティプロジェクト向けのFF&E・OS&E調達。家具、什器、設備、建設資材を含む包括的なソーシング。",
      },
      integration: {
        title: "プロジェクト統合",
        description: "複雑な開発プロジェクトのエンドツーエンド管理、サプライチェーン最適化、品質管理、物流調整。",
      },
      operations: {
        title: "ホテルオペレーション＆IT",
        description: "Odoo ERP導入・カスタマイズ、API開発、レベニューマネジメント、ホスピタリティ事業向けオペレーションコンサルティング。",
      },
      ip: {
        title: "IP＆キャラクターグッズ",
        description: "キャラクター商品の企画開発、製造調整、品質検査、在庫管理、IP権利管理。",
      },
      trading: {
        title: "貿易＆卸売",
        description: "グローバルサプライヤーネットワークを活用した国際貿易サービスと建設会社向け卸売。",
      },
    },
    portfolio: {
      subtitle: "実績",
      title: "確かな実績",
      description: "大規模ホテル開発からITシステム導入まで、私たちのポートフォリオは卓越性へのコミットメントを示しています。",
      viewCase: "詳細を見る",
      project1: {
        title: "大型ホテルコンプレックス",
        location: "東南アジア",
        description: "本館改装、別館内装、400室以上の新規ホテル建設・運営を含む包括的プロジェクト。",
      },
      project2: {
        title: "ホテル管理システム",
        location: "東南アジア",
        description: "高度なカスタマイズ、API開発、オペレーションシステム統合を含むOdoo ERP導入。",
      },
    },
    about: {
      subtitle: "会社概要",
      title: "香港から世界へ、卓越性の架け橋",
      description: "Tengcle Limitedは、ホスピタリティ、IT、国際貿易にわたる包括的なビジネスソリューションを提供する香港拠点の企業です。",
      story: {
        title: "私たちについて",
        p1: "香港で設立されたTengcle Limitedは、世界クラスの調達、プロジェクト統合、ITソリューションを必要とする企業の信頼できるパートナーとしての地位を確立しています。",
        p2: "戦略的な香港拠点から、グローバルサプライチェーンを調整し、複雑なプロジェクトを管理し、アジア全域のクライアントに革新的なソリューションを提供しています。",
      },
      info: {
        title: "会社情報",
        legalName: "法人名",
        brNo: "商業登記番号",
        tcsp: "TCSPライセンス",
      },
      philosophy: {
        title: "私たちの理念",
        mission: "ミッション",
        missionText: "グローバルなリソースと洗練されたクライアントを結びつけ、すべての取り組みに最高水準を適用することで、世界クラスのビジネスソリューションを提供します。",
        values: "バリュー",
        valuesText: "誠実さ、卓越性、透明性がすべての決定を導きます。信頼は一貫した納品と品質への揺るぎないコミットメントを通じて獲得されると信じています。",
      },
    },
    contact: {
      subtitle: "お問い合わせ",
      title: "お気軽にご連絡ください",
      description: "新しいプロジェクトをご計画中の方も、信頼できるビジネスパートナーをお探しの方も、お気軽にお問い合わせください。",
      email: "メール",
      info: {
        hkOffice: "香港オフィス",
        jpOffice1: "東京オフィス（高輪）",
        jpOffice2: "東京オフィス（築地）",
        usOffice: "米国オフィス（設立準備中）",
      },
    },
    footer: {
      description: "ホスピタリティ、IT、国際貿易にわたる包括的なビジネスソリューションを提供する香港拠点の企業。",
      navigation: "ナビゲーション",
      contact: "お問い合わせ",
      japan: "Tengcle Inc.（日本）",
      usa: "Tengcle LCC（米国）",
    },
    common: {
      learnMore: "詳しく見る",
      getInTouch: "お問い合わせ",
      trustCompliance: "信頼とコンプライアンス",
    },
  },
  zh: {
    nav: {
      home: "首页",
      services: "服务",
      portfolio: "案例",
      about: "关于我们",
      contact: "联系我们",
    },
    hero: {
      tagline: "香港出发，全球商业解决方案",
      headline1: "连接亚洲",
      headline2: "卓越服务",
      subtitle: "总部位于香港的专业团队，提供从酒店采购到IT系统和国际贸易的全方位商业解决方案。",
      cta1: "查看服务",
      cta2: "联系我们",
      trust1: "TCSP持牌",
      trust2: "香港注册",
      trust3: "全球运营",
    },
    services: {
      subtitle: "我们的服务",
      title: "全方位商业解决方案",
      description: "从酒店采购到IT解决方案和国际贸易，我们以对质量的坚定承诺提供端到端服务。",
      viewAll: "查看所有服务",
      hospitality: {
        title: "酒店采购",
        description: "为酒店和酒店项目提供完整的FF&E和OS&E采购，包括家具、固定装置、设备和建筑材料。",
      },
      integration: {
        title: "项目整合",
        description: "复杂开发项目的端到端管理、供应链优化、质量控制和物流协调。",
      },
      operations: {
        title: "酒店运营与IT",
        description: "Odoo ERP实施和定制、API开发、收益管理以及酒店业务运营咨询。",
      },
      ip: {
        title: "IP与角色商品",
        description: "角色商品开发、制造协调、质量检验、库存管理和IP权利管理。",
      },
      trading: {
        title: "贸易与批发",
        description: "利用我们的全球供应商网络，为建筑公司提供国际贸易服务和批发分销。",
      },
    },
    portfolio: {
      subtitle: "我们的案例",
      title: "卓越业绩",
      description: "从大型酒店开发到IT系统实施，我们的案例展示了我们对卓越的承诺。",
      viewCase: "查看详情",
      project1: {
        title: "大型酒店综合体",
        location: "东南亚",
        description: "包括主楼翻新、附楼室内装修以及400多间客房的新酒店建设和运营的综合项目。",
      },
      project2: {
        title: "酒店管理系统",
        location: "东南亚",
        description: "Odoo ERP实施，包括高级定制、API开发和运营系统集成。",
      },
    },
    about: {
      subtitle: "关于我们",
      title: "香港通往全球卓越的门户",
      description: "Tengcle Limited是一家总部位于香港的公司，提供涵盖酒店、IT和国际贸易的全方位商业解决方案。",
      story: {
        title: "我们的故事",
        p1: "Tengcle Limited在香港成立，已成为需要世界级采购、项目整合和IT解决方案的企业的可信赖合作伙伴。",
        p2: "从我们战略性的香港基地，我们协调全球供应链，管理复杂项目，并为亚洲及其他地区的客户提供创新解决方案。",
      },
      info: {
        title: "公司信息",
        legalName: "法人名称",
        brNo: "商业登记",
        tcsp: "TCSP牌照",
      },
      philosophy: {
        title: "我们的理念",
        mission: "使命",
        missionText: "通过连接全球资源与优质客户，在每次合作中应用最高标准，提供世界级的商业解决方案。",
        values: "价值观",
        valuesText: "诚信、卓越和透明指导着每一个决定。我们相信信任是通过持续交付和对质量的坚定承诺赢得的。",
      },
    },
    contact: {
      subtitle: "联系我们",
      title: "开始对话",
      description: "无论您是在规划新项目还是寻找可靠的商业伙伴，我们都在这里为您提供帮助。",
      email: "电子邮件",
      info: {
        hkOffice: "香港办公室",
        jpOffice1: "东京办公室（高轮）",
        jpOffice2: "东京办公室（筑地）",
        usOffice: "美国办公室（筹备中）",
      },
    },
    footer: {
      description: "总部位于香港的公司，提供涵盖酒店、IT和国际贸易的全方位商业解决方案。",
      navigation: "导航",
      contact: "联系方式",
      japan: "Tengcle Inc.（日本）",
      usa: "Tengcle LCC（美国）",
    },
    common: {
      learnMore: "了解更多",
      getInTouch: "联系我们",
      trustCompliance: "信任与合规",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const value = {
    language,
    setLanguage,
    t: translations[language],
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

// Helper function to get language-specific font class
export function getFontClass(language: Language, type: "heading" | "body" | "numbers" = "body"): string {
  if (type === "numbers") {
    return "font-numbers";
  }
  
  switch (language) {
    case "ja":
      return "font-jp";
    case "zh":
      return "font-zh";
    default:
      return type === "heading" ? "font-heading" : "font-body";
  }
}

// Helper function to get language attribute
export function getLangAttr(language: Language): string {
  switch (language) {
    case "ja":
      return "ja";
    case "zh":
      return "zh-Hans";
    default:
      return "en";
  }
}
