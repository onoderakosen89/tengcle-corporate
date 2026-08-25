export const SITE_ORIGIN = "https://www.tengcle.com";

export const supportedLanguages = ["en", "ja", "zh"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];
export type Region = "hk" | "jp" | "us";

export const regionPageDefinitions = {
  hk: [
    { key: "home", suffix: "" },
    { key: "services", suffix: "/services" },
    { key: "portfolio", suffix: "/portfolio" },
    { key: "about", suffix: "/about" },
    { key: "contact", suffix: "/contact" },
    { key: "faq", suffix: "/faq" },
    { key: "news", suffix: "/news" },
    { key: "privacy", suffix: "/privacy" },
  ],
  jp: [
    { key: "home", suffix: "" },
    { key: "services", suffix: "/services" },
    { key: "about", suffix: "/about" },
    { key: "careers", suffix: "/careers" },
    { key: "contact", suffix: "/contact" },
    { key: "faq", suffix: "/faq" },
    { key: "news", suffix: "/news" },
    { key: "privacy", suffix: "/privacy" },
  ],
  us: [
    { key: "home", suffix: "" },
    { key: "services", suffix: "/services" },
    {
      key: "propertyDevelopment",
      suffix: "/services/property-development",
    },
    {
      key: "propertyManagement",
      suffix: "/services/property-management",
    },
    { key: "vacationRentals", suffix: "/services/vacation-rentals" },
    { key: "about", suffix: "/about" },
    { key: "contact", suffix: "/contact" },
    { key: "faq", suffix: "/faq" },
    { key: "news", suffix: "/news" },
    { key: "privacy", suffix: "/privacy" },
  ],
} as const;

export type HkPageKey = (typeof regionPageDefinitions.hk)[number]["key"];
export type JpPageKey = (typeof regionPageDefinitions.jp)[number]["key"];
export type UsPageKey = (typeof regionPageDefinitions.us)[number]["key"];

const regionProfiles = {
  hk: {
    company: "Tengcle Limited",
    titles: {
      en: "Tengcle Limited | Hong Kong",
      ja: "Tengcle Limited | 香港",
      zh: "Tengcle Limited | 香港",
    },
    descriptions: {
      en: "Tengcle Limited is a Hong Kong affiliated company developing hospitality procurement, project coordination, IT, and trade activities.",
      ja: "Tengcle Limitedは、ホスピタリティ調達、プロジェクト調整、IT、貿易の事業を段階的に展開する香港の関連会社です。",
      zh: "Tengcle Limited是香港注册的关联公司，正逐步开展酒店采购、项目协调、IT和贸易相关业务。",
    },
    locale: { en: "en_HK", ja: "ja_HK", zh: "zh_HK" },
    htmlLanguage: { en: "en", ja: "ja", zh: "zh-Hans" },
  },
  jp: {
    company: "株式会社Tengcle",
    titles: {
      en: "株式会社Tengcle | Property Management in Tokyo",
      ja: "株式会社Tengcle | 東京の不動産管理",
      zh: "株式会社Tengcle | 东京的房地产管理",
    },
    descriptions: {
      en: "株式会社Tengcle is a Tokyo-based company providing property management, including rent collection, repair coordination, and tenant communication.",
      ja: "株式会社Tengcleは、家賃回収、修繕手配、テナント対応などの不動産管理を行う東京の法人です。",
      zh: "株式会社Tengcle是一家位于东京的公司，提供租金回收、维修协调和租户沟通等房地产管理服务。",
    },
    locale: { en: "en_JP", ja: "ja_JP", zh: "zh_CN" },
    htmlLanguage: { en: "en", ja: "ja", zh: "zh-Hans" },
  },
  us: {
    company: "Tengcle Development LLC",
    titles: {
      en: "Tengcle Development LLC | New Jersey Real Estate Activities",
      ja: "Tengcle Development LLC | ニュージャージー州の不動産事業準備",
      zh: "Tengcle Development LLC | 新泽西州房地产业务筹备",
    },
    descriptions: {
      en: "Established in January 2026, Tengcle Development LLC is preparing for staged real estate development, property management, and vacation-rental activities in the NJ/NY area.",
      ja: "2026年1月に設立されたTengcle Development LLCは、NJ/NY地域での不動産開発・管理・バケーションレンタル事業の本格始動に向けて準備中です。",
      zh: "Tengcle Development LLC于2026年1月成立，正为NJ/NY地区房地产开发、物业管理和度假租赁业务的分阶段启动做准备。",
    },
    locale: { en: "en_US", ja: "ja_US", zh: "zh_US" },
    htmlLanguage: { en: "en", ja: "ja", zh: "zh-Hans" },
  },
} as const;

const sectionLabels = {
  en: {
    services: "Services",
    portfolio: "Portfolio",
    about: "About",
    careers: "Careers",
    contact: "Contact",
    faq: "Frequently Asked Questions",
    news: "News & Updates",
    privacy: "Privacy Policy",
    propertyDevelopment: "Property Development",
    propertyManagement: "Property Management",
    vacationRentals: "Vacation Rentals",
  },
  ja: {
    services: "サービス",
    portfolio: "実績",
    about: "会社情報",
    careers: "採用情報",
    contact: "お問い合わせ",
    faq: "よくあるご質問",
    news: "ニュース＆お知らせ",
    privacy: "プライバシーポリシー",
    propertyDevelopment: "不動産開発",
    propertyManagement: "不動産管理",
    vacationRentals: "バケーションレンタル",
  },
  zh: {
    services: "服务",
    portfolio: "项目实绩",
    about: "公司信息",
    careers: "招聘信息",
    contact: "联系我们",
    faq: "常见问题",
    news: "新闻动态",
    privacy: "隐私政策",
    propertyDevelopment: "房地产开发",
    propertyManagement: "物业管理",
    vacationRentals: "度假租赁",
  },
} as const;

type LocalizedText = Record<SupportedLanguage, string>;

const newsArticles: Record<
  Region,
  ReadonlyArray<{
    id: string;
    datePublished: string;
    title: LocalizedText;
    description: LocalizedText;
  }>
> = {
  hk: [
    {
      id: "first-ffe-project-2026",
      datePublished: "2025-12-15",
      title: {
        en: "First FF&E Project Scheduled for February 2026",
        ja: "初のFF&Eプロジェクト、2026年2月に実施予定",
        zh: "首个FF&E项目定于2026年2月实施",
      },
      description: {
        en: "Tengcle Limited announces its first hotel FF&E procurement project, scheduled for delivery in February 2026.",
        ja: "Tengcle Limitedは、2026年2月に納品予定の初のホテルFF&E調達プロジェクトを発表しました。",
        zh: "Tengcle Limited宣布首个酒店FF&E采购项目，计划于2026年2月交付。",
      },
    },
    {
      id: "odoo-erp-launch",
      datePublished: "2025-10-01",
      title: {
        en: "Odoo ERP Implementation Services Launched",
        ja: "Odoo ERP導入サービスを開始",
        zh: "Odoo ERP实施服务正式启动",
      },
      description: {
        en: "Starting October 2025, Tengcle Limited now offers Odoo ERP implementation and customization services.",
        ja: "2025年10月より、Tengcle LimitedはOdoo ERP導入・カスタマイズサービスを提供開始しました。",
        zh: "自2025年10月起，Tengcle Limited提供Odoo ERP实施和定制服务。",
      },
    },
    {
      id: "expansion-preparation",
      datePublished: "2025-06-01",
      title: {
        en: "Business Expansion Preparation Begins",
        ja: "事業拡大に向けた準備を開始",
        zh: "开始业务扩展准备工作",
      },
      description: {
        en: "Tengcle Limited begins preparations for business expansion, identifying FF&E procurement as a key growth opportunity.",
        ja: "Tengcle Limitedは事業拡大の準備を開始し、FF&E調達事業を重要な成長機会として特定しました。",
        zh: "Tengcle Limited开始业务扩展准备，确定FF&E采购为关键增长机会。",
      },
    },
    {
      id: "hotel-operations-launch",
      datePublished: "2025-05-01",
      title: {
        en: "Hotel Operations Business Commences",
        ja: "ホテル運営事業を開始",
        zh: "酒店运营业务正式启动",
      },
      description: {
        en: "Shortly after establishment, Tengcle Limited launches hotel operations business.",
        ja: "設立直後、Tengcle Limitedはホテル運営事業を開始しました。",
        zh: "成立后不久，Tengcle Limited启动酒店运营业务。",
      },
    },
    {
      id: "hk-founding",
      datePublished: "2025-04-15",
      title: {
        en: "Tengcle Limited Established in Hong Kong",
        ja: "Tengcle Limited 香港で設立",
        zh: "Tengcle Limited在香港成立",
      },
      description: {
        en: "Tengcle Limited is officially established in Hong Kong as the global headquarters for Tengcle Group, which was founded in Japan in 2021.",
        ja: "2021年に日本で創業したTengcle Groupのグローバル本社として、Tengcle Limitedが香港で正式に設立されました。",
        zh: "Tengcle Limited作为2021年在日本创立的Tengcle Group的全球总部，在香港正式成立。",
      },
    },
  ],
  jp: [
    {
      id: "company-incorporation-2021",
      datePublished: "2021-10-25",
      title: {
        ja: "株式会社Tengcle 設立",
        en: "Incorporation of Tengcle Co., Ltd.",
        zh: "株式会社Tengcle成立",
      },
      description: {
        ja: "2021年10月25日、株式会社Tengcleを東京都で設立しました。",
        en: "株式会社Tengcle was incorporated in Tokyo on 25 October 2021.",
        zh: "株式会社Tengcle于2021年10月25日在东京成立。",
      },
    },
  ],
  us: [
    {
      id: "property-management-launch-2025",
      datePublished: "2025-03-01",
      title: {
        en: "Full-Scale Property Management Operations Begin",
        ja: "不動産管理事業を本格始動",
        zh: "不动产管理业务正式启动",
      },
      description: {
        en: "Tengcle Development LLC begins full-scale property management operations in New Jersey and the New York metro area.",
        ja: "Tengcle Development LLCは、ニュージャージー州およびニューヨーク都市圏で不動産管理事業を本格的に開始しました。",
        zh: "Tengcle Development LLC在新泽西州和纽约都市圈正式启动不动产管理业务。",
      },
    },
    {
      id: "us-founding-2026",
      datePublished: "2026-01-01",
      title: {
        en: "Tengcle Development LLC Established in New Jersey",
        ja: "Tengcle Development LLC ニュージャージー州にて設立",
        zh: "Tengcle Development LLC在新泽西州成立",
      },
      description: {
        en: "Tengcle Development LLC was officially registered in Weehawken, New Jersey in January 2026 as the US office of Tengcle Group.",
        ja: "Tengcle Development LLCは、2026年1月にTengcle Groupの米国拠点としてニュージャージー州ウィーホーケンに正式登記されました。",
        zh: "Tengcle Development LLC于2026年1月作为Tengcle Group的美国办事处在新泽西州威霍肯正式注册。",
      },
    },
    {
      id: "group-global-network-2024",
      datePublished: "2024-12-01",
      title: {
        en: "Tengcle Group Establishes Global Three-Location Network",
        ja: "Tengcle Group グローバル3拠点体制を確立",
        zh: "Tengcle Group建立全球三地网络",
      },
      description: {
        en: "With the establishment of Tengcle Development LLC, Tengcle Group now operates from three locations.",
        ja: "Tengcle Development LLCの設立により、Tengcle Groupは3拠点体制となりました。",
        zh: "随着Tengcle Development LLC的成立，Tengcle Group现已在三地运营。",
      },
    },
  ],
};

export function canonicalPath(route: string) {
  if (route === "/") return "/";
  return `${route.replace(/\/+$/, "")}/`;
}

export function canonicalUrl(route: string) {
  return `${SITE_ORIGIN}${canonicalPath(route)}`;
}

export function normalizeTengcleCanonical(value: string) {
  const url = new URL(value, SITE_ORIGIN);
  if (url.origin === SITE_ORIGIN) url.pathname = canonicalPath(url.pathname);
  return url.toString();
}

function sectionDescription(
  language: SupportedLanguage,
  label: string,
  company: string,
  regionalDescription: string
) {
  if (language === "ja")
    return `${company}の${label}に関する情報です。${regionalDescription}`;
  if (language === "zh")
    return `这是${company}的${label}信息。${regionalDescription}`;
  return `${label} information from ${company}. ${regionalDescription}`;
}

export interface SeoRoute {
  route: string;
  canonical: string;
  region?: Region;
  language?: SupportedLanguage;
  lang: string;
  locale: string;
  title: string;
  description: string;
  company: string;
  ogType: "website" | "article";
  datePublished?: string;
}

const staticRoutes: SeoRoute[] = [
  {
    route: "/",
    canonical: canonicalUrl("/"),
    lang: "en",
    locale: "en_US",
    title:
      "Tengcle Group | Affiliated Companies in Hong Kong, Japan & the United States",
    description:
      "Tengcle Group presents the activities of affiliated companies in Hong Kong, Japan, and the United States.",
    company: "Tengcle Group",
    ogType: "website",
  },
  {
    route: "/privacy",
    canonical: canonicalUrl("/privacy"),
    lang: "en",
    locale: "en_US",
    title: "Privacy Policy | Tengcle Group",
    description: "Privacy information for Tengcle Group websites.",
    company: "Tengcle Group",
    ogType: "website",
  },
];

const regionalRoutes: SeoRoute[] = [];
for (const region of Object.keys(regionPageDefinitions) as Region[]) {
  const profile = regionProfiles[region];
  for (const language of supportedLanguages) {
    for (const page of regionPageDefinitions[region]) {
      const route = `/${region}/${language}${page.suffix}`;
      const isHome = page.key === "home";
      const label = isHome
        ? ""
        : sectionLabels[language][
            page.key as keyof (typeof sectionLabels)[typeof language]
          ];
      regionalRoutes.push({
        route,
        canonical: canonicalUrl(route),
        region,
        language,
        lang: profile.htmlLanguage[language],
        locale: profile.locale[language],
        title: isHome
          ? profile.titles[language]
          : `${label} | ${profile.company}`,
        description: isHome
          ? profile.descriptions[language]
          : sectionDescription(
              language,
              label,
              profile.company,
              profile.descriptions[language]
            ),
        company: profile.company,
        ogType: "website",
      });
    }
    for (const article of newsArticles[region]) {
      const route = `/${region}/${language}/news/${article.id}`;
      regionalRoutes.push({
        route,
        canonical: canonicalUrl(route),
        region,
        language,
        lang: profile.htmlLanguage[language],
        locale: profile.locale[language],
        title: `${article.title[language]} | ${profile.company}`,
        description: article.description[language],
        company: profile.company,
        ogType: "article",
        datePublished: article.datePublished,
      });
    }
  }
}

export const seoRouteManifest = [...staticRoutes, ...regionalRoutes] as const;
export const publicRoutePaths = seoRouteManifest.map(page => page.route);
