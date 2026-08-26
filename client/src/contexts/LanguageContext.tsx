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
    dx: {
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
  trust: {
    subtitle: string;
    title: string;
    description: string;
    established: string;
    establishedDesc: string;
    businessReg: string;
    businessRegDesc: string;
    director: string;
    directorDesc: string;
    qualityCertified: string;
    qualityDesc: string;
    globalNetwork: string;
    globalNetworkDesc: string;
    countries: string;
  };
  meta: {
    title: string;
    description: string;
    keywords: string;
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
      tagline: "Hong Kong Affiliated Company",
      headline1: "Bridging Markets",
      headline2: "Creating Value",
      subtitle: "Tengcle Limited is a Hong Kong affiliated company developing hospitality procurement, project coordination, IT, and international trade activities.",
      cta1: "Our Services",
      cta2: "Contact Us",
      trust1: "HK Registered",
      trust2: "Professional Team",
      trust3: "Regional Coordination",
    },
    services: {
      subtitle: "Our Expertise",
      title: "Comprehensive Solutions",
      description: "We develop practical procurement, project-coordination, IT, and trade support in line with each client engagement.",
      viewAll: "Explore All Services",
      hospitality: {
        title: "Hospitality Procurement",
        description: "FF&E and OS&E sourcing for hotels. Furniture, fixtures, equipment, and construction materials.",
      },
      integration: {
        title: "Project Integration",
        description: "Project management, supply chain coordination, quality control, and logistics for development projects.",
      },
      operations: {
        title: "Hotel Operations & IT",
        description: "Odoo ERP setup and customization, API development, revenue management, and operations consulting.",
      },
      ip: {
        title: "IP & Character Goods",
        description: "Character merchandise development, manufacturing coordination, quality inspection, and inventory management.",
      },
      trading: {
        title: "Trading & Wholesale",
        description: "Trade services and wholesale distribution for construction companies through our supplier network.",
      },
      dx: {
        title: "DX & Business Automation",
        description: "Digital transformation support using Google Apps Script, workflow automation, and custom business tools for corporate efficiency.",
      },
    },
    portfolio: {
      subtitle: "Our Expertise",
      title: "Current Engagements",
      description: "Current hotel-management coordination in Southeast Asia and supplier coordination being prepared for a procurement phase.",
      viewCase: "Learn More",
      project1: {
        title: "Hotel Management Services",
        location: "Southeast Asia",
        description: "Management-services support for a hotel development project in Southeast Asia, including Board of Management dispatch, strategic planning, and operations coordination.",
      },
      project2: {
        title: "Supplier Coordination",
        location: "Southeast Asia",
        description: "Supplier coordination is being prepared for a planned hotel completion and renovation procurement phase in Southeast Asia.",
      },
    },
    about: {
      subtitle: "Corporate Profile",
      title: "Tengcle Limited in Hong Kong",
      description: "Tengcle Limited is a Hong Kong company and one of the Tengcle related companies. It was incorporated on 29 April 2025.",
      story: {
        title: "Our Journey",
        p1: "Incorporated on 29 April 2025, Tengcle Limited is building its service capabilities through carefully selected engagements and supplier coordination.",
        p2: "Our approach emphasizes transparent coordination, practical execution, and clear communication for procurement, IT, and trade-related projects.",
      },
      info: {
        title: "Company Information",
        legalName: "Legal Name",
        brNo: "Business Registration",
      },
      philosophy: {
        title: "Our Philosophy",
        mission: "Mission",
        missionText: "To connect clients with the right resources and deliver quality work on every project.",
        values: "Values",
        valuesText: "Integrity and transparency in every decision. Trust is built through consistent delivery.",
      },
    },
    contact: {
      subtitle: "Contact Us",
      title: "Let's Start a Conversation",
      description: "Whether you're planning a new project or seeking a reliable business partner, we're here to help.",
      email: "Email",
      info: {
        hkOffice: "Tengcle Limited (Hong Kong)",
        jpOffice1: "Tokyo Office (Takanawa)",
        jpOffice2: "Tokyo Office (Tsukiji)",
        usOffice: "Tengcle Development LLC (United States)",
      },
    },
    footer: {
      description: "Hong Kong affiliated company developing hospitality procurement, IT, and trade activities.",
      navigation: "Navigation",
      contact: "Contact",
      japan: "株式会社Tengcle (Japan)",
      usa: "Tengcle Development LLC (USA)",
    },
    common: {
      learnMore: "Learn More",
      getInTouch: "Get in Touch",
      trustCompliance: "Trust & Compliance",
    },
    trust: {
      subtitle: "Company Information",
      title: "Tengcle Limited",
      description: "Incorporated in Hong Kong on 29 April 2025. Business Registration Number: 78077104.",
      established: "Established",
      establishedDesc: "Hong Kong Incorporated",
      businessReg: "Business Registration",
      businessRegDesc: "Hong Kong Companies Registry",
      director: "Legal Name",
      directorDesc: "Hong Kong Company",
      qualityCertified: "Project Approach",
      qualityDesc: "Scope-led coordination",
      globalNetwork: "Regional Focus",
      globalNetworkDesc: "Southeast Asia project coordination",
      countries: "regions",
    },
    meta: {
      title: "Tengcle Limited | Hospitality Procurement & Project Coordination in Hong Kong",
      description: "Tengcle Limited is a Hong Kong affiliated company developing hospitality procurement, project coordination, IT, and trade activities.",
      keywords: "Tengcle Limited, hospitality procurement, project coordination, Hong Kong, IT, trade",
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
      tagline: "香港の関連会社",
      headline1: "市場を繋ぎ",
      headline2: "価値を創る",
      subtitle: "Tengcle Limitedは、ホスピタリティ調達、プロジェクト調整、IT、国際貿易の事業を段階的に展開する香港の関連会社です。",
      cta1: "サービス一覧",
      cta2: "お問い合わせ",
      trust1: "香港法人",
      trust2: "プロフェッショナル",
      trust3: "地域連携",
    },
    services: {
      subtitle: "サービス",
      title: "ビジネスソリューション",
      description: "ホスピタリティ調達、プロジェクト調整、IT、国際貿易の各分野で、案件ごとに実務的な支援を準備・提供します。",
      viewAll: "すべてのサービスを見る",
      hospitality: {
        title: "ホスピタリティ調達",
        description: "ホテル向けFF&E・OS&E調達。家具、什器、設備、建設資材。",
      },
      integration: {
        title: "プロジェクト統合",
        description: "プロジェクト管理、サプライチェーン調整、品質管理、物流手配。",
      },
      operations: {
        title: "ホテルオペレーション＆IT",
        description: "Odoo ERP導入・カスタマイズ、API開発、レベニューマネジメント、運営コンサルティング。",
      },
      ip: {
        title: "IP＆キャラクターグッズ",
        description: "キャラクター商品の企画開発、製造調整、品質検査、在庫管理。",
      },
      trading: {
        title: "貿易＆卸売",
        description: "サプライヤーネットワークを通じた国際貿易と建設会社向け卸売。",
      },
      dx: {
        title: "DX＆業務自動化",
        description: "Google Apps Scriptを活用したワークフロー自動化、カスタムビジネスツール開発による法人のDX支援。",
      },
    },
    portfolio: {
      subtitle: "実績",
      title: "現在の取り組み",
      description: "東南アジアでのホテル管理支援と、調達フェーズに向けて準備中のサプライヤー調整をご紹介します。",
      viewCase: "詳細を確認",
      project1: {
        title: "ホテル管理サービス",
        location: "東南アジア",
        description: "東南アジアのホテル開発案件における管理サービス支援。BOM派遣、戦略計画、ブランド管理、運営調整を含みます。",
      },
      project2: {
        title: "サプライヤーコーディネーター",
        location: "東南アジア",
        description: "東南アジアのホテル完成・改装に係る、今後の調達フェーズに向けたサプライヤー調整を準備しています。",
      },
    },
    about: {
      subtitle: "会社概要",
      title: "香港のTengcle Limitedについて",
      description: "Tengcle Limitedは、2025年4月29日に設立された香港法人で、Tengcleの関連会社の一社です。",
      story: {
        title: "沿革",
        p1: "Tengcle Limitedは2025年4月29日に香港で設立されました。現在は、選定した案件とサプライヤー調整を通じて、サービス体制を構築しています。",
        p2: "調達、IT、貿易に関するプロジェクトでは、透明性のある調整、実務的な実行、明確なコミュニケーションを大切にしています。",
      },
      info: {
        title: "会社情報",
        legalName: "法人名",
        brNo: "商業登録",
      },
      philosophy: {
        title: "私たちの理念",
        mission: "ミッション",
        missionText: "クライアントと適切なリソースを結びつけ、すべてのプロジェクトで質の高い仕事を納品する。",
        values: "バリュー",
        valuesText: "誠実さと透明性を大切に。信頼は一貫した納品を通じて築かれる。",
      },
    },
    contact: {
      subtitle: "お問い合わせ",
      title: "お気軽にご連絡ください",
      description: "新しいプロジェクトをご計画中の方も、信頼できるビジネスパートナーをお探しの方も、お気軽にお問い合わせください。",
      email: "メール",
      info: {
        hkOffice: "Tengcle Limited（香港法人）",
        jpOffice1: "東京オフィス（高輪）",
        jpOffice2: "東京オフィス（築地）",
        usOffice: "Tengcle Development LLC（米国法人）",
      },
    },
    footer: {
      description: "ホスピタリティ調達、IT、国際貿易の事業を段階的に展開する香港の関連会社。",
      navigation: "ナビゲーション",
      contact: "お問い合わせ",
      japan: "株式会社Tengcle（日本）",
      usa: "Tengcle Development LLC（米国）",
    },
    common: {
      learnMore: "詳しく見る",
      getInTouch: "お問い合わせ",
      trustCompliance: "信頼とコンプライアンス",
    },
    trust: {
      subtitle: "会社情報",
      title: "Tengcle Limited",
      description: "2025年4月29日に香港で設立されました。商業登記番号は78077104です。",
      established: "設立",
      establishedDesc: "香港法人設立",
      businessReg: "商業登記",
      businessRegDesc: "香港会社登記処",
      director: "法人名",
      directorDesc: "香港法人",
      qualityCertified: "業務方針",
      qualityDesc: "案件ごとの明確な調整",
      globalNetwork: "地域連携",
      globalNetworkDesc: "東南アジアでのプロジェクト調整",
      countries: "地域",
    },
    meta: {
      title: "Tengcle Limited | 香港のホスピタリティ調達・プロジェクト調整",
      description: "Tengcle Limitedは、ホスピタリティ調達、プロジェクト調整、IT、貿易の事業を段階的に展開する香港の関連会社です。",
      keywords: "Tengcle Limited, ホスピタリティ調達, プロジェクト調整, 香港, IT, 貿易",
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
      tagline: "香港关联公司",
      headline1: "连接市场",
      headline2: "创造价值",
      subtitle: "Tengcle Limited是香港注册的关联公司，正逐步开展酒店采购、项目协调、IT和贸易相关业务。",
      cta1: "服务内容",
      cta2: "联系我们",
      trust1: "香港法人",
      trust2: "专业团队",
      trust3: "区域协调",
    },
    services: {
      subtitle: "我们的服务",
      title: "商业解决方案",
      description: "我们根据每项委托，逐步准备并提供务实的酒店采购、项目协调、IT和贸易支持。",
      viewAll: "查看所有服务",
      hospitality: {
        title: "酒店采购",
        description: "FF&E和OS&E采购。家具、固定装置、设备和建筑材料。",
      },
      integration: {
        title: "项目整合",
        description: "项目管理、供应链协调、质量控制和物流安排。",
      },
      operations: {
        title: "酒店运营与IT",
        description: "Odoo ERP实施和定制、API开发、收益管理和运营咨询。",
      },
      ip: {
        title: "IP与角色商品",
        description: "角色商品开发、制造协调、质量检验和库存管理。",
      },
      trading: {
        title: "贸易与批发",
        description: "通过供应商网络提供贸易服务和建筑公司批发。",
      },
      dx: {
        title: "DX与业务自动化",
        description: "利用Google Apps Script实现工作流自动化，开发定制业务工具，支持企业数字化转型。",
      },
    },
    portfolio: {
      subtitle: "実績",
      title: "当前项目工作",
      description: "介绍东南亚的酒店管理支持，以及为采购阶段准备中的供应商协调。",
      viewCase: "查看详情",
      project1: {
        title: "酒店管理服务",
        location: "东南亚",
        description: "为东南亚酒店开发项目提供管理服务支持，包括管理委员会派遣、战略规划、品牌管理和运营协调。",
      },
      project2: {
        title: "供应商协调员",
        location: "东南亚",
        description: "正在为东南亚酒店完成和改装项目的未来采购阶段准备供应商协调。",
      },
    },
    about: {
      subtitle: "关于我们",
      title: "关于香港Tengcle Limited",
      description: "Tengcle Limited是于2025年4月29日成立的香港公司，也是Tengcle关联公司之一。",
      story: {
        title: "我们的故事",
        p1: "Tengcle Limited于2025年4月29日在香港注册成立，现正通过精选项目和供应商协调建立服务能力。",
        p2: "我们重视透明协调、务实执行和清晰沟通，为采购、IT和贸易相关项目提供支持。",
      },
      info: {
        title: "公司信息",
        legalName: "法人名",
        brNo: "商业登记",
      },
      philosophy: {
        title: "我们的理念",
        mission: "使命",
        missionText: "将客户与合适的资源连接，在每个项目中交付高质量工作。",
        values: "价值观",
        valuesText: "诚信和透明是每个决定的基础。信任通过持续交付建立。",
      },
    },
    contact: {
      subtitle: "联系我们",
      title: "开始对话",
      description: "无论您是在规划新项目还是寻找可靠的商业伙伴，我们都在这里为您提供帮助。",
      email: "电子邮件",
      info: {
        hkOffice: "Tengcle Limited（香港公司）",
        jpOffice1: "东京办公室（高轮）",
        jpOffice2: "东京办公室（筑地）",
        usOffice: "Tengcle Development LLC（美国公司）",
      },
    },
    footer: {
      description: "正逐步开展酒店采购、IT和贸易相关业务的香港关联公司。",
      navigation: "导航",
      contact: "联系方式",
      japan: "株式会社Tengcle（日本）",
      usa: "Tengcle Development LLC（美国）",
    },
    common: {
      learnMore: "了解更多",
      getInTouch: "联系我们",
      trustCompliance: "信任与合规",
    },
    trust: {
      subtitle: "公司信息",
      title: "Tengcle Limited",
      description: "Tengcle Limited于2025年4月29日在香港成立，商业登记号码为78077104。",
      established: "成立",
      establishedDesc: "香港法人成立",
      businessReg: "商业登记",
      businessRegDesc: "香港公司注册处",
      director: "法人名称",
      directorDesc: "香港公司",
      qualityCertified: "项目方法",
      qualityDesc: "按项目明确协调",
      globalNetwork: "区域重点",
      globalNetworkDesc: "东南亚项目协调",
      countries: "区域",
    },
    meta: {
      title: "Tengcle Limited | 香港酒店采购与项目协调",
      description: "Tengcle Limited是香港注册的关联公司，正逐步开展酒店采购、项目协调、IT和贸易相关业务。",
      keywords: "Tengcle Limited, 酒店采购, 项目协调, 香港, IT, 贸易",
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
