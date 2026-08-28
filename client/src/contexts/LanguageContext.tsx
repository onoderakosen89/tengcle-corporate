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
      tagline: "Hong Kong",
      headline1: "Bridging Markets",
      headline2: "Creating Value",
      subtitle: "Grounded in hospitality operations, Tengcle Limited supports projects through procurement, project coordination, IT, and international trade.",
      cta1: "Our Services",
      cta2: "Contact Us",
      trust1: "HK Registered",
      trust2: "Professional Team",
      trust3: "Regional Coordination",
    },
    services: {
      subtitle: "Our Expertise",
      title: "Comprehensive Solutions",
      description: "Drawing on practical hospitality experience, we connect procurement, project coordination, technology, and cross-border trade to move projects from plan to execution.",
      viewAll: "Explore All Services",
      hospitality: {
        title: "Hospitality Procurement",
        description: "Specification, sourcing, and delivery coordination for furniture, fixtures, equipment, and operating supplies used by hotels and hospitality properties.",
      },
      integration: {
        title: "Project Integration",
        description: "Stakeholder, schedule, quality, and logistics coordination for projects spanning multiple markets.",
      },
      operations: {
        title: "Hotel Operations & IT",
        description: "Hotel management and operations support, combined with ERP implementation and business tools that connect management with day-to-day work.",
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
        title: "DX, AI & Business Automation",
        description: "Business transformation support through LLM and AI utilization, API integration, workflow automation, and structured, well-organized data.",
      },
    },
    portfolio: {
      subtitle: "Our Expertise",
      title: "Current Engagements",
      description: "Hotel management experience in Southeast Asia, together with ongoing supplier selection and delivery planning for hospitality procurement.",
      viewCase: "Learn More",
      project1: {
        title: "Hotel Management Services",
        location: "Southeast Asia",
        description: "Management support for a hotel project in Southeast Asia, including business planning, brand and operating structure, and local stakeholder coordination.",
      },
      project2: {
        title: "Supplier Coordination",
        location: "Southeast Asia",
        description: "Supplier selection and delivery planning for furniture, equipment, and materials required for a future hotel procurement phase.",
      },
    },
    about: {
      subtitle: "Corporate Profile",
      title: "Tengcle Limited in Hong Kong",
      description: "Tengcle Limited is based in Hong Kong and works across hospitality procurement, project coordination, IT, and international trade.",
      story: {
        title: "Our Journey",
        p1: "Our work is grounded in hands-on hospitality management and extends to procurement, project coordination, IT, and trade support.",
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
      description: "Hong Kong company working across hospitality procurement, IT, and trade.",
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
      description: "Based in Hong Kong.",
      established: "Based in",
      establishedDesc: "Hong Kong",
      businessReg: "Jurisdiction",
      businessRegDesc: "Hong Kong Company",
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
      description: "Tengcle Limited works across hospitality procurement, project coordination, IT, and trade in Hong Kong.",
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
      tagline: "香港",
      headline1: "市場を繋ぎ",
      headline2: "価値を創る",
      subtitle: "Tengcle Limitedは、ホテル運営で培った知見を基盤に、調達、プロジェクト調整、IT、国際取引を通じて事業の実行を支えます。",
      cta1: "サービス一覧",
      cta2: "お問い合わせ",
      trust1: "香港法人",
      trust2: "プロフェッショナル",
      trust3: "地域連携",
    },
    services: {
      subtitle: "サービス",
      title: "ビジネスソリューション",
      description: "ホテル運営で培った実務経験を基盤に、調達、プロジェクト調整、IT、国際取引を組み合わせ、計画を実行へつなげます。",
      viewAll: "すべてのサービスを見る",
      hospitality: {
        title: "ホスピタリティ調達",
        description: "ホテルや宿泊施設に必要な家具、什器、設備、運営備品について、仕様整理から調達、納品調整まで支援します。",
      },
      integration: {
        title: "プロジェクト統合",
        description: "関係者、工程、品質、物流をつなぎ、複数地域にまたがるプロジェクトを実行可能な形に整えます。",
      },
      operations: {
        title: "ホテルオペレーション＆IT",
        description: "ホテル運営に関する経営・管理支援と、ERPや業務ツールの導入を通じて、現場と経営の両面を支えます。",
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
        title: "DX・AI活用＆業務自動化",
        description: "LLMを含むAI活用、API連携、ワークフロー自動化、業務データの設計・整理を通じて、実務に根差したDXを支援します。",
      },
    },
    portfolio: {
      subtitle: "実績",
      title: "現在の取り組み",
      description: "東南アジアにおけるホテルの経営・管理支援の実績と、施設向け調達に向けたサプライヤー選定・納品計画の取り組みがあります。",
      viewCase: "詳細を確認",
      project1: {
        title: "ホテル管理サービス",
        location: "東南アジア",
        description: "東南アジアのホテル事業に対し、事業計画、ブランド・運営体制、現地関係者との調整を含む経営・管理支援を行っています。",
      },
      project2: {
        title: "サプライヤーコーディネーター",
        location: "東南アジア",
        description: "今後の調達に向け、ホテルの完成・改装に必要な家具、設備、資材のサプライヤー選定と納品計画を調整しています。",
      },
    },
    about: {
      subtitle: "会社概要",
      title: "香港のTengcle Limitedについて",
      description: "Tengcle Limitedは香港を拠点に、ホスピタリティ調達、プロジェクト調整、IT、国際貿易に取り組んでいます。",
      story: {
        title: "沿革",
        p1: "ホテル運営の現場で培った経験を起点に、調達、プロジェクト調整、IT、国際取引へ支援領域を広げています。",
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
      description: "香港を拠点に、ホスピタリティ調達、IT、国際貿易に取り組む会社です。",
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
      description: "香港を拠点に事業を展開しています。",
      established: "拠点",
      establishedDesc: "香港",
      businessReg: "法域",
      businessRegDesc: "香港法人",
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
      description: "Tengcle Limitedは香港を拠点に、ホスピタリティ調達、プロジェクト調整、IT、貿易に取り組んでいます。",
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
      tagline: "香港",
      headline1: "连接市场",
      headline2: "创造价值",
      subtitle: "Tengcle Limited以酒店运营经验为基础，通过采购、项目协调、信息技术和跨境贸易支持项目落地。",
      cta1: "服务内容",
      cta2: "联系我们",
      trust1: "香港法人",
      trust2: "专业团队",
      trust3: "区域协调",
    },
    services: {
      subtitle: "我们的服务",
      title: "商业解决方案",
      description: "我们以酒店运营实践为基础，整合采购、项目协调、技术和跨境贸易，将计划转化为可执行的项目。",
      viewAll: "查看所有服务",
      hospitality: {
        title: "酒店采购",
        description: "为酒店和住宿设施提供家具、固定装置、设备及运营用品的规格整理、采购和交付协调。",
      },
      integration: {
        title: "项目整合",
        description: "协调利益相关方、进度、质量和物流，推动跨地区项目有序执行。",
      },
      operations: {
        title: "酒店运营与IT",
        description: "结合酒店经营管理支持、ERP实施和业务工具，为管理层与日常运营提供协同支持。",
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
        title: "DX、AI应用与业务自动化",
        description: "通过包括LLM在内的AI应用、API集成、工作流自动化以及业务数据的设计与整理，为企业数字化转型提供支持。",
      },
    },
    portfolio: {
      subtitle: "実績",
      title: "当前项目工作",
      description: "我们在东南亚拥有酒店经营管理支持经验，并持续推进酒店采购所需的供应商选择与交付规划。",
      viewCase: "查看详情",
      project1: {
        title: "酒店管理服务",
        location: "东南亚",
        description: "为东南亚酒店项目提供经营管理支持，包括业务规划、品牌与运营体系以及当地相关方协调。",
      },
      project2: {
        title: "供应商协调员",
        location: "东南亚",
        description: "面向后续采购阶段，协调酒店完工与改造所需家具、设备及材料的供应商选择和交付计划。",
      },
    },
    about: {
      subtitle: "关于我们",
      title: "关于香港Tengcle Limited",
      description: "Tengcle Limited立足香港，开展酒店采购、项目协调、信息技术和国际贸易业务。",
      story: {
        title: "我们的故事",
        p1: "我们以酒店运营一线经验为起点，将支持范围拓展至采购、项目协调、信息技术和跨境贸易。",
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
      description: "立足香港，开展酒店采购、信息技术和贸易业务。",
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
      description: "Tengcle Limited立足香港开展业务。",
      established: "所在地",
      establishedDesc: "香港",
      businessReg: "司法管辖区",
      businessRegDesc: "香港公司",
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
      description: "Tengcle Limited立足香港，开展酒店采购、项目协调、信息技术和贸易业务。",
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
