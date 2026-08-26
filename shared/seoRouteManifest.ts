import { buyerIntentPages } from "./buyerIntentPages";

export const SITE_ORIGIN = "https://www.tengcle.com";

export const supportedLanguages = ["en", "ja", "zh"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];
export type Region = "hk" | "jp" | "us";

export const regionPageDefinitions = {
  hk: [
    { key: "home", suffix: "" },
    { key: "services", suffix: "/services" },
    { key: "hotelFfe", suffix: "/services/hotel-ffe-procurement" },
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
    { key: "propertyManagement", suffix: "/services/property-management" },
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
    hotelFfe: "Hotel FF&E Procurement",
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
    hotelFfe: "ホテルFF&E調達",
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
    hotelFfe: "酒店FF&E采购",
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
    verifiedArticle?: boolean;
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
      datePublished: "2025-04-29",
      verifiedArticle: true,
      title: {
        en: "Tengcle Limited Established in Hong Kong",
        ja: "Tengcle Limited 香港で設立",
        zh: "Tengcle Limited在香港成立",
      },
      description: {
        en: "Tengcle Limited was incorporated in Hong Kong on 29 April 2025. Business Registration Number: 78077104.",
        ja: "Tengcle Limitedは2025年4月29日に香港で設立されました。商業登記番号：78077104。",
        zh: "Tengcle Limited于2025年4月29日在香港成立。商业登记号码：78077104。",
      },
    },
  ],
  jp: [
    {
      id: "company-incorporation-2021",
      datePublished: "2021-10-25",
      verifiedArticle: true,
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
      id: "us-founding-2026",
      datePublished: "2026-01-05",
      verifiedArticle: true,
      title: {
        en: "Tengcle Development LLC Established in New Jersey",
        ja: "Tengcle Development LLC ニュージャージー州にて設立",
        zh: "Tengcle Development LLC在新泽西州成立",
      },
      description: {
        en: "Tengcle Development LLC was formed in New Jersey on 5 January 2026. New Jersey Entity ID: 0451392806.",
        ja: "Tengcle Development LLCは2026年1月5日にニュージャージー州で設立されました。ニュージャージー州法人ID：0451392806。",
        zh: "Tengcle Development LLC于2026年1月5日在新泽西州成立。新泽西州实体ID：0451392806。",
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

const regionalLanguageTags = {
  hk: { en: "en-HK", ja: "ja-HK", zh: "zh-HK" },
  jp: { en: "en-JP", ja: "ja-JP", zh: "zh-JP" },
  us: { en: "en-US", ja: "ja-US", zh: "zh-US" },
} as const;

export function hreflangAlternates(
  region: Region,
  language: SupportedLanguage,
  route: string
): Array<{ hreflang: string; href: string }> {
  const prefix = `/${region}/${language}`;
  const suffix = route.startsWith(prefix) ? route.slice(prefix.length) : "";
  const alternates: Array<{ hreflang: string; href: string }> =
    supportedLanguages.map(alternateLanguage => ({
      hreflang: regionalLanguageTags[region][alternateLanguage],
      href: canonicalUrl(`/${region}/${alternateLanguage}${suffix}`),
    }));
  alternates.push({
    hreflang: "x-default",
    href: canonicalUrl(`/${region}/en${suffix}`),
  });
  return alternates;
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
  verifiedArticle?: boolean;
  service?: {
    name: string;
    description: string;
    provider: string;
    providerUrl: string;
    areaServed: readonly string[];
  };
  faqs?: readonly { question: string; answer: string }[];
}

const staticRoutes: SeoRoute[] = [
  {
    route: "/",
    canonical: canonicalUrl("/"),
    lang: "en",
    locale: "en_US",
    title: "Tengcle | Related Companies in Hong Kong, Japan & the United States",
    description:
      "Tengcle introduces related companies in Hong Kong, Japan, and the United States.",
    company: "Tengcle",
    ogType: "website",
  },
  {
    route: "/privacy",
    canonical: canonicalUrl("/privacy"),
    lang: "en",
    locale: "en_US",
    title: "Privacy Policy | Tengcle",
    description: "Privacy information for Tengcle websites.",
    company: "Tengcle",
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
      const buyerIntentPage = Object.values(buyerIntentPages).find(
        candidate => candidate.region === region && candidate.key === page.key
      );
      const buyerIntentCopy = buyerIntentPage?.copy[language];
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
        title:
          buyerIntentCopy?.title ??
          (isHome ? profile.titles[language] : `${label} | ${profile.company}`),
        description:
          buyerIntentCopy?.description ??
          (isHome
            ? profile.descriptions[language]
            : sectionDescription(
                language,
                label,
                profile.company,
                profile.descriptions[language]
              )),
        company: profile.company,
        ogType: "website",
        ...(buyerIntentPage && buyerIntentCopy
          ? {
              service: {
                name: buyerIntentCopy.h1,
                description: buyerIntentCopy.lead,
                provider: buyerIntentPage.provider,
                providerUrl: buyerIntentPage.entityUrl,
                areaServed: buyerIntentPage.areaServed,
              },
              faqs: buyerIntentCopy.faqs,
            }
          : {}),
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
        ogType: article.verifiedArticle ? "article" : "website",
        ...(article.verifiedArticle
          ? {
              datePublished: article.datePublished,
              verifiedArticle: true,
            }
          : {}),
      });
    }
  }
}

export const seoRouteManifest = [...staticRoutes, ...regionalRoutes] as const;
export const publicRoutePaths = seoRouteManifest.map(page => page.route);

export const retiredUsNewsRedirects = supportedLanguages.flatMap(language => [
  {
    from: `/us/${language}/news/property-management-launch-2025/`,
    to: `/us/${language}/about/`,
  },
  {
    from: `/us/${language}/news/group-global-network-2024/`,
    to: `/us/${language}/about/`,
  },
]);
