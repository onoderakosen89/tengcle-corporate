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
      tagline: "Strategic Hub in Hong Kong",
      headline1: "Bridging Markets",
      headline2: "Creating Value",
      subtitle: "Tengcle Limited serves as your strategic partner in Asia, delivering specialized solutions in hospitality, IT, and international trade.",
      cta1: "Our Services",
      cta2: "Contact Us",
      trust1: "HK Registered",
      trust2: "Professional Team",
      trust3: "Global Network",
    },
    services: {
      subtitle: "Our Expertise",
      title: "Comprehensive Solutions",
      description: "From hospitality procurement to digital transformation, we provide end-to-end solutions tailored to your business needs.",
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
      title: "Proven Track Record",
      description: "Delivering results in hospitality management and project coordination across Southeast Asia.",
      viewCase: "Learn More",
      project1: {
        title: "Hotel Management Services",
        location: "Southeast Asia",
        description: "Board of Management dispatch, strategic planning, brand management, and operations consulting for hotel development projects.",
      },
      project2: {
        title: "Supplier Coordination",
        location: "Southeast Asia",
        description: "International procurement coordination, supply chain management, and project integration for hotel completion and renovation.",
      },
    },
    about: {
      subtitle: "Corporate Profile",
      title: "Global Headquarters in Hong Kong",
      description: "Tengcle Limited stands at the center of the Tengcle Group, orchestrating global operations and strategic initiatives from our Hong Kong base.",
      story: {
        title: "Our Journey",
        p1: "Established to facilitate seamless cross-border business, Tengcle Limited has evolved into a multi-faceted organization. We leverage Hong Kong's position as a global financial hub to connect opportunities across Asia.",
        p2: "Our team combines local expertise with global standards, ensuring that every project—whether in procurement, IT, or trade—is executed with precision.",
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
        hkOffice: "Hong Kong Office",
        jpOffice1: "Tokyo Office (Takanawa)",
        jpOffice2: "Tokyo Office (Tsukiji)",
        usOffice: "USA Office (Establishing)",
      },
    },
    footer: {
      description: "Hong Kong-based company offering hospitality, IT, and trade services.",
      navigation: "Navigation",
      contact: "Contact",
      japan: "Tengcle株式会社 (Japan)",
      usa: "Tengcle LCC (USA)",
    },
    common: {
      learnMore: "Learn More",
      getInTouch: "Get in Touch",
      trustCompliance: "Trust & Compliance",
    },
    trust: {
      subtitle: "Trust & Compliance",
      title: "Built on Integrity",
      description: "As a fully licensed Hong Kong entity, we maintain high standards of corporate governance and regulatory compliance.",
      established: "Established",
      establishedDesc: "Hong Kong Incorporated",
      businessReg: "Business Registration",
      businessRegDesc: "Hong Kong Companies Registry",
      director: "Director",
      directorDesc: "Director & CEO",
      qualityCertified: "Quality Certified",
      qualityDesc: "International quality management",
      globalNetwork: "Global Network",
      globalNetworkDesc: "Supplier relationships worldwide",
      countries: "Countries",
    },
    meta: {
      title: "Tengcle Limited | Hotel FF&E & Asset Management in Hong Kong",
      description: "Hong Kong company providing hotel FF&E procurement, asset management & IT solutions across Asia.",
      keywords: "Tengcle Limited, hotel FF&E, asset management, Hong Kong, hospitality",
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
      tagline: "Strategic Hub in Hong Kong",
      headline1: "市場を繋ぎ",
      headline2: "価値を創る",
      subtitle: "Tengcle Limitedは、ホスピタリティ、IT、国際貿易の分野で専門的なソリューションを提供する、アジアの戦略的パートナーです。",
      cta1: "サービス一覧",
      cta2: "お問い合わせ",
      trust1: "香港法人",
      trust2: "プロフェッショナル",
      trust3: "グローバル",
    },
    services: {
      subtitle: "サービス",
      title: "ビジネスソリューション",
      description: "ホスピタリティ調達、ITソリューション、国際貿易。プロジェクトを最初から最後まで担当します。",
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
      title: "実績事例",
      description: "東南アジアのホテル管理、プロジェクト調整での実績。",
      viewCase: "詳細を確認",
      project1: {
        title: "ホテル管理サービス",
        location: "東南アジア",
        description: "統括会の派遣、戦略計画、ブランド管理、運営コンサルティング。",
      },
      project2: {
        title: "サプライヤーコーディネーター",
        location: "東南アジア",
        description: "国際調達調整、サプライチェーン管理、ホテル完成・改装プロジェクトの統整。",
      },
    },
    about: {
      subtitle: "会社概要",
      title: "香港拠点のビジネスパートナー",
      description: "Tengcle Limitedは、Tengcle Groupのグローバル本社として香港に拠点を置き、ホスピタリティ、IT、国際貿易サービスを提供しています。",
      story: {
        title: "沿革",
        p1: "Tengcle Groupは、国境を越えたビジネスを円滑に進めるために設立されました。香港という国際金融都市の利点を活かし、アジア全域の機会を繋ぐハブとしての役割を果たしています。",
        p2: "調達、IT、貿易の各分野において、現地の専門知識とグローバルな基準を組み合わせ、プロジェクトを成功へと導きます。",
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
        hkOffice: "香港オフィス",
        jpOffice1: "東京オフィス（高輪）",
        jpOffice2: "東京オフィス（築地）",
        usOffice: "米国オフィス（設立準備中）",
      },
    },
    footer: {
      description: "ホスピタリティ、IT、国際貿易サービスを提供する香港拠点の企業。",
      navigation: "ナビゲーション",
      contact: "お問い合わせ",
      japan: "Tengcle株式会社（日本）",
      usa: "Tengcle LCC（米国）",
    },
    common: {
      learnMore: "詳しく見る",
      getInTouch: "お問い合わせ",
      trustCompliance: "信頼とコンプライアンス",
    },
    trust: {
      subtitle: "信頼とコンプライアンス",
      title: "誠実な運営",
      description: "香港で正式にライセンスを取得した法人として、企業統治と法令遵守の基準を維持しています。",
      established: "設立",
      establishedDesc: "香港法人設立",
      businessReg: "商業登記",
      businessRegDesc: "香港会社登記処",
      director: "代表取締役",
      directorDesc: "小野寺 紘宣",
      qualityCertified: "品質認証",
      qualityDesc: "国際品質管理基準",
      globalNetwork: "グローバルネットワーク",
      globalNetworkDesc: "世界各国のサプライヤー",
      countries: "カ国以上",
    },
    meta: {
      title: "Tengcle Limited | ホテルFF&E・資産管理 香港",
      description: "香港企業。ホテルFF&E調達、資産管理、ITソリューションをアジア全域で提供。",
      keywords: "Tengcle Limited, ホテルFF&E, 資産管理, 香港, ホスピタリティ",
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
      tagline: "Strategic Hub in Hong Kong",
      headline1: "连接市场",
      headline2: "创造价值",
      subtitle: "Tengcle Limited 是您在亚洲的战略合作伙伴，在酒店、IT 和国际贸易领域提供专业解决方案。",
      cta1: "由于服务",
      cta2: "联系我们",
      trust1: "香港法人",
      trust2: "专业团队",
      trust3: "全球网络",
    },
    services: {
      subtitle: "我们的服务",
      title: "商业解决方案",
      description: "酒店采购、IT解决方案和贸易服务。从开始到结束负责项目。",
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
      title: "成功案例",
      description: "东南亚酒店管理、项目协调的实績。",
      viewCase: "查看详情",
      project1: {
        title: "酒店管理服务",
        location: "东南亚",
        description: "管理会派遣、战略规划、品牌管理、运营咨询。",
      },
      project2: {
        title: "供应商协调员",
        location: "东南亚",
        description: "国际采购协调、供应链管理、酒店完成与改装项目的整合。",
      },
    },
    about: {
      subtitle: "关于我们",
      title: "香港商业合作伙伴",
      description: "Tengcle Limited作为Tengcle Group的全球总部，从香港提供酒店、IT和贸易服务。",
      story: {
        title: "我们的故事",
        p1: "Tengcle Group于2021年在日本创立，随着东南亚项目的开始，将总部迁至香港。Tengcle Limited作为全球总部，提供采购、项目管理和IT解决方案。",
        p2: "从香港出发，我们协调供应链、管理项目，为亚洲各地客户提供解决方案。",
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
        hkOffice: "香港办公室",
        jpOffice1: "东京办公室（高轮）",
        jpOffice2: "东京办公室（筑地）",
        usOffice: "美国办公室（筹备中）",
      },
    },
    footer: {
      description: "香港公司，提供酒店、IT和贸易服务。",
      navigation: "导航",
      contact: "联系方式",
      japan: "Tengcle株式会社（日本）",
      usa: "Tengcle LCC（美国）",
    },
    common: {
      learnMore: "了解更多",
      getInTouch: "联系我们",
      trustCompliance: "信任与合规",
    },
    trust: {
      subtitle: "信任与合规",
      title: "诚信经营",
      description: "作为香港正式持牌的法人实体，我们维护企业治理和法规遵循的标准。",
      established: "成立",
      establishedDesc: "香港法人成立",
      businessReg: "商业登记",
      businessRegDesc: "香港公司注册处",
      director: "董事",
      directorDesc: "小野寺 紘宣",
      qualityCertified: "质量认证",
      qualityDesc: "国际质量管理标准",
      globalNetwork: "全球网络",
      globalNetworkDesc: "世界各地的供应商",
      countries: "个国家以上",
    },
    meta: {
      title: "Tengcle Limited | 香港酒店FF&E采购与资产管理",
      description: "香港公司，提供酒店FF&E采购、资产管理及IT解决方案，服务亚洲全境。",
      keywords: "Tengcle Limited, 酒店FF&E, 资产管理, 香港, 酒店业",
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
