/**
 * Copy for the US site's business-first layout (home, businesses page,
 * header and footer). Each entry is keyed by language: en / ja / zh.
 */

export type UsLang = "en" | "ja" | "zh";

export const PIPETECTOR_URL = "https://pipetector.tengcle.com/en/";

type Localized<T> = Record<UsLang, T>;

export function usCopy<T>(value: Localized<T>, lang: UsLang): T {
  return value[lang] ?? value.en;
}

export const usBusinessCopy = {
  nav: {
    pipetector: {
      en: "NMR Pipetector",
      ja: "NMR Pipetector",
      zh: "NMR Pipetector",
    },
    externalNote: {
      en: "opens in a new tab",
      ja: "新しいタブで開きます",
      zh: "在新标签页打开",
    },
  },
  hero: {
    tagline: {
      en: "Real Estate Operations in New Jersey",
      ja: "ニュージャージーの不動産運営",
      zh: "新泽西房地产运营",
    },
    titleLines: {
      en: ["Better now", "than back then —", "we want to hear you say it."],
      ja: ["昔より", "いまがいいねと", "言わせたい"],
      zh: ["比从前", "更好了——", "想听你这么说。"],
    },
    subtitle: {
      en: "Fix it, live in it, pass it on to the grandkids.",
      ja: "直して住んで　孫の代まで",
      zh: "修好，住下去，传给孙辈。",
    },
    ctaBusinesses: { en: "Our Businesses", ja: "事業を見る", zh: "查看业务" },
    ctaContact: { en: "Contact Us", ja: "お問い合わせ", zh: "联系我们" },
  },
  businesses: {
    title: { en: "What We Do", ja: "事業", zh: "业务" },
    pageTitle: { en: "Businesses", ja: "事業", zh: "业务" },
    building: {
      name: {
        en: "Building Revitalization & Management",
        ja: "建物の再生と管理",
        zh: "建筑再生与管理",
      },
      desc: {
        en: "We renovate and manage older apartment buildings in New Jersey: fixing what needs fixing, keeping what still works, and making them homes that last. We also plan short-term rental operations.",
        ja: "ニュージャージーの古い集合住宅を、直すべき所を直し、使える物は活かして、長く住める建物にします。日々の管理と、短期滞在の運営計画も手がけます。",
        zh: "我们在新泽西州修缮并管理老旧公寓楼：该修的地方修好，还能用的部分留下来，让它成为能长久居住的家。我们也负责短租运营的规划。",
      },
      button: { en: "Learn more", ja: "詳しく見る", zh: "了解详情" },
      alt: {
        en: "Apartment building in New Jersey",
        ja: "ニュージャージーの集合住宅",
        zh: "新泽西州的公寓楼",
      },
    },
    pipe: {
      name: {
        en: "NMR Pipetector — Pilot Program",
        ja: "配管の赤錆対策（NMR Pipetector）",
        zh: "管道防锈（NMR Pipetector）",
      },
      desc: {
        en: "A Japanese rust-control device that clamps onto the outside of a pipe, with no cutting. We are accepting applications for pilot trials on chilled- and hot-water (HVAC) piping in New Jersey and New York.",
        ja: "配管を切らずに外から取り付ける、日本の赤錆対策の装置です。冷暖房の冷温水の配管を対象に、ニュージャージーとニューヨークで先行試験の申し込みを受け付けています。",
        zh: "一款无需切断管道、从外侧安装的日本防锈装置。针对暖通空调的冷热水管道，我们正在新泽西州和纽约受理试点测试申请。",
      },
      button: {
        en: "About the device and pilot",
        ja: "装置と試験について（英語のページ）",
        zh: "了解装置与试点测试（英文页面）",
      },
      alt: {
        en: "NMR Pipetector clamped onto a pipe",
        ja: "配管に取り付けた NMR Pipetector",
        zh: "安装在管道上的 NMR Pipetector",
      },
    },
  },
  group: {
    title: { en: "Our Group", ja: "グループ会社", zh: "集团成员公司" },
    japan: {
      name: {
        en: "Tengcle Co., Ltd. (Tokyo)",
        ja: "株式会社Tengcle（東京）",
        zh: "株式会社Tengcle（东京）",
      },
      desc: {
        en: "Its main focus is property management, with additional activities in food and beverage, wellness, and lodging.",
        ja: "不動産管理を中心に、飲食・ウェルネス・宿泊の事業を手がけています。",
        zh: "以物业管理为核心，业务还涉及餐饮、身心健康及住宿领域。",
      },
      alt: { en: "Tokyo skyline at dusk", ja: "夕暮れの東京", zh: "黄昏的东京" },
    },
    hongkong: {
      name: {
        en: "Tengcle Limited (Hong Kong)",
        ja: "Tengcle Limited（香港）",
        zh: "Tengcle Limited（香港）",
      },
      desc: {
        en: "Its activities include procurement for hotels, project coordination, IT, and international trade.",
        ja: "ホテル向けの調達、案件のとりまとめ、IT、貿易を手がけています。",
        zh: "业务包括面向酒店的采购、项目协调、IT 与贸易。",
      },
      alt: { en: "Hong Kong at night", ja: "夜の香港", zh: "夜晚的香港" },
    },
  },
  about: {
    desc: {
      en: "Tengcle Development LLC is based in New Jersey, where we revitalize and manage older buildings. We also accept applications for pilot trials of NMR Pipetector, and we work alongside our group companies in Tokyo and Hong Kong.",
      ja: "Tengcle Development LLC は、ニュージャージーを拠点に、古い建物の再生と管理に取り組む会社です。NMR Pipetector の先行試験の申し込みも受け付けています。東京と香港のグループ会社とともに事業を進めています。",
      zh: "Tengcle Development LLC 以新泽西州为据点，致力于老旧建筑的再生与管理，同时受理 NMR Pipetector 的试点测试申请。我们与位于东京和香港的集团成员公司携手推进业务。",
    },
  },
  contact: {
    title: { en: "Contact Us", ja: "お問い合わせ", zh: "联系我们" },
  },
  meta: {
    homeDescription: {
      en: "Tengcle Development LLC revitalizes and manages older apartment buildings in New Jersey and accepts applications for NMR Pipetector pilot trials on HVAC water piping in New Jersey and New York.",
      ja: "Tengcle Development LLC は、ニュージャージーの古い集合住宅の再生と管理に取り組み、NJ/NYで NMR Pipetector の先行試験の申し込みを受け付けています。",
      zh: "Tengcle Development LLC 在新泽西州从事老旧公寓楼的再生与管理，并在新泽西州和纽约受理 NMR Pipetector 试点测试申请。",
    },
    servicesTitle: {
      en: "Businesses | Tengcle Development LLC - Building Revitalization & NMR Pipetector",
      ja: "事業 | Tengcle Development LLC - 建物の再生と管理・配管の赤錆対策",
      zh: "业务 | Tengcle Development LLC - 建筑再生与管理、管道防锈",
    },
    servicesDescription: {
      en: "Tengcle Development LLC's businesses in the United States: revitalizing and managing older apartment buildings in New Jersey, and pilot trials of the NMR Pipetector rust-control device for HVAC water piping.",
      ja: "Tengcle Development LLC の米国の事業。ニュージャージーの古い集合住宅の再生と管理、冷暖房の冷温水配管向け赤錆対策装置 NMR Pipetector の先行試験。",
      zh: "Tengcle Development LLC 在美国的业务：新泽西州老旧公寓楼的再生与管理，以及面向暖通冷热水管道的防锈装置 NMR Pipetector 的试点测试。",
    },
  },
} as const;
