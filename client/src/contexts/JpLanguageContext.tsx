/**
 * Language Context - Multi-language Support for Tengcle Inc. Japan
 * Supports: Japanese (JA - Primary), English (EN), Chinese Simplified (ZH)
 */

import { createContext, useContext, useState, type ReactNode } from "react";

type Language = "ja" | "en" | "zh";

interface Translations {
  nav: {
    home: string;
    services: string;
    about: string;
    contact: string;
    careers: string;
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
    realEstate: {
      title: string;
      description: string;
    };
    restaurant: {
      title: string;
      description: string;
    };
    gym: {
      title: string;
      description: string;
    };
    capsuleHotel: {
      title: string;
      description: string;
    };
    recruitment: {
      title: string;
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
      established: string;
      location: string;
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
      tokyoOffice1: string;
      tokyoOffice2: string;
      hkOffice: string;
    };
  };
  careers: {
    subtitle: string;
    title: string;
    description: string;
    midCareer: string;
    salaryNote: string;
    totalPositions: string;
    positions: {
      title: string;
      description: string;
    };
    requirements: {
      title: string;
      description: string;
    };
    benefits: {
      title: string;
      description: string;
    };
    apply: {
      title: string;
      description: string;
      button: string;
    };
    positionCategories: {
      fullTime: string;
      fullTimeDesc: string;
      partTime: string;
      partTimeDesc: string;
    };
    positionsList: {
      realEstateManager: {
        title: string;
        type: string;
        location: string;
        salary: string;
        count: string;
        description: string;
        highlight: string;
        requirements: string[];
      };
      realEstateAssistant: {
        title: string;
        type: string;
        location: string;
        salary: string;
        count: string;
        description: string;
        highlight: string;
        requirements: string[];
      };
      cafeManager: {
        title: string;
        type: string;
        location: string;
        salary: string;
        count: string;
        description: string;
        highlight: string;
        requirements: string[];
      };
      cafeStaff: {
        title: string;
        type: string;
        location: string;
        salary: string;
        count: string;
        description: string;
        highlight: string;
        requirements: string[];
      };
      hotelFrontStaff: {
        title: string;
        type: string;
        location: string;
        salary: string;
        count: string;
        description: string;
        highlight: string;
        requirements: string[];
      };
      hotelCleaningStaff: {
        title: string;
        type: string;
        location: string;
        salary: string;
        count: string;
        description: string;
        highlight: string;
        requirements: string[];
      };
      recruitmentSales: {
        title: string;
        type: string;
        location: string;
        salary: string;
        count: string;
        description: string;
        highlight: string;
        requirements: string[];
      };
    };
    benefitsList: {
      insurance: string;
      vacation: string;
      bonus: string;
      commute: string;
      housing: string;
    };
  };
  footer: {
    description: string;
    navigation: string;
    contact: string;
    hongkong: string;
    group: string;
  };
  common: {
    learnMore: string;
    getInTouch: string;
    japanCorporate: string;
    fullTime: string;
    partTime: string;
    contract: string;
  };
}

const translations: Record<Language, Translations> = {
  ja: {
    nav: {
      home: "ホーム",
      services: "事業内容",
      about: "会社概要",
      contact: "お問い合わせ",
      careers: "採用情報",
    },
    hero: {
      tagline: "Tengcle Inc. 日本法人",
      headline1: "5つの事業で",
      headline2: "日本を支える",
      subtitle: "不動産管理、飲食、フィットネス、宿泊、人材。日本市場でサービスを提供しています。",
      cta1: "事業内容を見る",
      cta2: "お問い合わせ",
      trust1: "日本法人",
      trust2: "香港グループ",
      trust3: "5事業展開",
    },
    services: {
      subtitle: "事業内容",
      title: "5つの事業",
      description: "不動産、飲食、フィットネス、宿泊、人材の5分野でサービスを提供しています。",
      viewAll: "詳細を見る",
      realEstate: {
        title: "不動産管理",
        description: "賃貸物件の管理・運営。入居者様とオーナー様の双方に対応します。",
      },
      restaurant: {
        title: "飲食店オペレーション",
        description: "レストラン・カフェの企画・運営、店舗開発、メニュー開発、スタッフ教育。",
      },
      gym: {
        title: "レンタルジム",
        description: "プライベート空間でトレーニングできるレンタルジムを運営しています。",
      },
      capsuleHotel: {
        title: "カプセルホテル運営",
        description: "ビジネス・観光のお客様向けにカプセルホテルを運営しています。",
      },
      recruitment: {
        title: "人材紹介",
        description: "企業と求職者のマッチング。業界知識とネットワークを活かします。",
      },
    },
    about: {
      subtitle: "会社概要",
      title: "Tengcle Inc.について",
      description: "Tengcle Inc.は、香港に本社を置くTengcle Limitedの日本法人です。",
      story: {
        title: "私たちについて",
        p1: "Tengcle Inc.は、香港のTengcle Limitedグループの一員です。",
        p2: "不動産管理、飲食店オペレーション、レンタルジム、カプセルホテル運営、人材紹介の5つの事業を展開しています。",
      },
      info: {
        title: "会社情報",
        legalName: "法人名",
        established: "設立",
        location: "所在地",
      },
      philosophy: {
        title: "私たちの理念",
        mission: "ミッション",
        missionText: "5つの事業を通じて、お客様の生活とビジネスに貢献する。",
        values: "バリュー",
        valuesText: "誠実さ、品質へのこだわり、お客様第一の姿勢。",
      },
    },
    contact: {
      subtitle: "お問い合わせ",
      title: "お気軽にご連絡ください",
      description: "事業に関するご質問、お見積もりのご依頼など、お気軽にお問い合わせください。",
      email: "メール",
      info: {
        tokyoOffice1: "東京オフィス（高輪）",
        tokyoOffice2: "東京オフィス（築地）",
        hkOffice: "香港本社",
      },
    },
    careers: {
      subtitle: "採用情報",
      title: "一緒に働く仲間を募集しています",
      description: "Tengcle Inc.では、各事業部門で活躍いただけるスタッフを募集しています。経験者優遇、未経験者も歓迎します。",
      midCareer: "中途採用",
      salaryNote: "※給与は経験・能力を考慮の上、決定いたします",
      totalPositions: "正社員9名・パート3名・アルバイト4名 募集中",
      positions: {
        title: "募集職種",
        description: "現在募集中のポジションをご紹介します。",
      },
      requirements: {
        title: "応募資格",
        description: "職種により応募資格が異なります。詳細は各職種をご確認ください。",
      },
      benefits: {
        title: "福利厚生",
        description: "社員の皆様が安心して働ける環境を整えています。",
      },
      apply: {
        title: "応募方法",
        description: "ご興味のある方は、履歴書・職務経歴書を添えて下記メールアドレスまでご連絡ください。",
        button: "応募する",
      },
      positionCategories: {
        fullTime: "正社員募集",
        fullTimeDesc: "各事業部門の中核を担うスタッフを募集しています。",
        partTime: "パート・アルバイト募集",
        partTimeDesc: "ライフスタイルに合わせて働けるポジションです。",
      },
      positionsList: {
        realEstateManager: {
          title: "不動産管理スタッフ",
          type: "正社員",
          location: "東京（高輪）",
          salary: "年収 350万円〜450万円",
          count: "1名",
          description: "築30〜50年の賃貸物件の管理業務全般。修理対応・手配、家賃入金確認、契約更新手続き、催促業務、電気・水道代請求、不動産仲介との連携によるテナント募集など。",
          highlight: "経験者優遇・長期勤務歓迎",
          requirements: [
            "不動産管理経験3年以上",
            "クレーム対応・催促業務に抵抗がない方",
            "Excel・Word基本操作",
            "普通自動車免許あれば尚可",
          ],
        },
        realEstateAssistant: {
          title: "不動産管理補助",
          type: "パート",
          location: "東京（高輪）・リモート可",
          salary: "時給 1,200円〜1,400円",
          count: "1名",
          description: "不動産管理スタッフの事務補助。書類作成、データ入力、電話対応、請求書処理など。週3〜4日勤務。",
          highlight: "週3〜4日・主婦歓迎",
          requirements: [
            "事務経験あり",
            "Excel・Word基本操作",
            "電話対応に抵抗がない方",
          ],
        },
        cafeManager: {
          title: "カフェ店長",
          type: "正社員",
          location: "泉岳寺駅A4出口横（1F・2F）",
          salary: "年収 350万円〜450万円",
          count: "1名",
          description: "カフェの運営責任者。営業時間は平日7:30〜19:00、土日祝9:00〜18:00。モーニング・ランチ・カフェタイムの軽食提供。先払い制。アルバイトのシフト管理、売上管理、仕入れ、調理・接客全般。",
          highlight: "駅チカ・裁量大",
          requirements: [
            "飲食店経験5年以上（店長経験あれば尚可）",
            "調理・接客両方できる方",
            "シフト管理・売上管理経験",
            "早朝勤務可能な方",
          ],
        },
        cafeStaff: {
          title: "カフェスタッフ",
          type: "アルバイト",
          location: "泉岳寺駅A4出口横（1F・2F）",
          salary: "時給 1,150円〜1,300円",
          count: "4名",
          description: "カフェでの接客・調理補助。早番（7:00〜15:00）または遅番（11:00〜19:30）のシフト制。モーニング、ランチ、カフェタイムの接客・レジ対応・簡単な調理補助・店内清掃。",
          highlight: "シフト制・学生歓迎",
          requirements: [
            "接客経験あれば尚可（未経験可）",
            "早朝または夕方勤務可能な方",
            "週3日以上勤務可能な方",
          ],
        },
        hotelFrontStaff: {
          title: "ホテルフロントスタッフ",
          type: "正社員",
          location: "高輪・築地（2施設）",
          salary: "年収 300万円〜380万円（夜勤手当別途）",
          count: "6名（各施設に朝番・昼番・夜番 各1名）",
          description: "簡易宿泊施設のフロント業務全般。チェックイン・アウト対応、施設案内、部屋の清掃、コインランドリーでのシーツ洗濯。朝番・昼番・夜番の3シフト制で、各シフト1名体制。高輪または築地の施設に配属。",
          highlight: "普通免許必須・夜勤手当あり・2施設同時募集",
          requirements: [
            "普通自動車免許（必須）",
            "接客経験あり",
            "一人で判断・対応できる方",
            "夜勤可能な方（夜番の場合）",
          ],
        },
        hotelCleaningStaff: {
          title: "ホテル清掃スタッフ",
          type: "パート",
          location: "高輪・築地（2施設）",
          salary: "時給 1,150円〜1,300円",
          count: "2名（各施設1名）",
          description: "簡易宿泊施設の清掃・洗濯補助。昼間の時間帯に客室清掃、共用部清掃、コインランドリーでのシーツ洗濯など。高輪または築地の施設に配属。",
          highlight: "昼間勤務・体力に自信のある方・2施設同時募集",
          requirements: [
            "清掃経験あれば尚可",
            "体力に自信のある方",
            "普通自動車免許あれば尚可",
          ],
        },
        recruitmentSales: {
          title: "人材営業",
          type: "正社員",
          location: "東京（高輪）",
          salary: "年収 400万円〜700万円（成果報酬あり）",
          count: "1名",
          description: "ミャンマー人材の企業への営業活動。海外からの候補者CVを基に、日本企業への提案・マッチング・契約締結。成果に応じたインセンティブあり。",
          highlight: "成果報酬型・高収入可能",
          requirements: [
            "営業経験5年以上",
            "人材業界または外国人材紹介経験あれば尚可",
            "自走できる方",
            "成果主義に抵抗がない方",
          ],
        },
      },
      benefitsList: {
        insurance: "各種社会保険完備（健康保険、厚生年金、雇用保険、労災保険）※正社員のみ",
        vacation: "完全週休2日制、有給休暇、年末年始休暇、慶弔休暇 ※正社員のみ",
        bonus: "賞与年2回（業績による）、昇給年1回 ※正社員のみ",
        commute: "交通費支給（通勤時間30分以内の方）",
        housing: "住宅手当（条件あり）※正社員のみ",
      },
    },
    footer: {
      description: "Tengcle Inc.は、不動産管理、飲食店オペレーション、レンタルジム、カプセルホテル運営、人材紹介の5つの事業を展開する日本法人です。",
      navigation: "ナビゲーション",
      contact: "お問い合わせ",
      hongkong: "Tengcle Limited（香港本社）",
      group: "グループ企業",
    },
    common: {
      learnMore: "詳細を見る",
      getInTouch: "お問い合わせ",
      japanCorporate: "日本法人",
      fullTime: "正社員",
      partTime: "パート",
      contract: "契約社員",
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      about: "About",
      contact: "Contact",
      careers: "Careers",
    },
    hero: {
      tagline: "Tengcle Inc. Japan",
      headline1: "5 Businesses",
      headline2: "in Japan",
      subtitle: "Real estate, dining, fitness, accommodation, and recruitment services in Japan.",
      cta1: "View Our Services",
      cta2: "Contact Us",
      trust1: "Japan Corporation",
      trust2: "Hong Kong Group",
      trust3: "5 Business Areas",
    },
    services: {
      subtitle: "Our Services",
      title: "5 Businesses",
      description: "Real estate, dining, fitness, accommodation, and recruitment services.",
      viewAll: "Learn More",
      realEstate: {
        title: "Real Estate Management",
        description: "Rental property management. We work with both tenants and property owners.",
      },
      restaurant: {
        title: "Restaurant Operations",
        description: "Restaurant and cafe planning, store development, menu creation, and staff training.",
      },
      gym: {
        title: "Rental Gym",
        description: "Private rental gyms for focused training.",
      },
      capsuleHotel: {
        title: "Capsule Hotel Operations",
        description: "Capsule hotels for business and leisure travelers.",
      },
      recruitment: {
        title: "Recruitment Services",
        description: "Matching companies with job seekers using industry knowledge.",
      },
    },
    about: {
      subtitle: "About Us",
      title: "About Tengcle Inc.",
      description: "Tengcle Inc. is the Japanese subsidiary of Tengcle Limited, Hong Kong.",
      story: {
        title: "Our Story",
        p1: "Tengcle Inc. is part of the Tengcle Limited group based in Hong Kong.",
        p2: "We operate 5 businesses: real estate, restaurants, rental gyms, capsule hotels, and recruitment.",
      },
      info: {
        title: "Company Information",
        legalName: "Legal Name",
        established: "Established",
        location: "Location",
      },
      philosophy: {
        title: "Our Philosophy",
        mission: "Mission",
        missionText: "Contributing to customers' lives and businesses through our 5 business areas.",
        values: "Values",
        valuesText: "Integrity, quality, and customer-first.",
      },
    },
    contact: {
      subtitle: "Contact Us",
      title: "Get in Touch",
      description: "For inquiries about our services or quote requests, please feel free to contact us.",
      email: "Email",
      info: {
        tokyoOffice1: "Tokyo Office (Takanawa)",
        tokyoOffice2: "Tokyo Office (Tsukiji)",
        hkOffice: "Hong Kong Headquarters",
      },
    },
    careers: {
      subtitle: "Careers",
      title: "Join Our Team",
      description: "Tengcle Inc. is looking for staff to work in various business divisions. Experienced candidates preferred, but beginners are also welcome.",
      midCareer: "Mid-Career",
      salaryNote: "※Salary determined based on experience and skills",
      totalPositions: "Hiring: 9 Full-time, 3 Part-time, 4 Arubaito",
      positions: {
        title: "Open Positions",
        description: "Explore our current job openings.",
      },
      requirements: {
        title: "Requirements",
        description: "Requirements vary by position. Please check each position for details.",
      },
      benefits: {
        title: "Benefits",
        description: "We provide a supportive work environment for all employees.",
      },
      apply: {
        title: "How to Apply",
        description: "If interested, please send your resume and CV to the email address below.",
        button: "Apply Now",
      },
      positionCategories: {
        fullTime: "Full-time Positions",
        fullTimeDesc: "We are looking for core staff for each business division.",
        partTime: "Part-time Positions",
        partTimeDesc: "Flexible positions that fit your lifestyle.",
      },
      positionsList: {
        realEstateManager: {
          title: "Property Management Staff",
          type: "Full-time",
          location: "Tokyo (Takanawa)",
          salary: "¥3.5M - ¥4.5M annually",
          count: "1 position",
          description: "Overall management of rental properties (30-50 years old). Repair coordination, rent collection confirmation, contract renewals, payment reminders, utility billing, tenant recruitment in cooperation with real estate agents.",
          highlight: "Experience preferred, long-term welcome",
          requirements: [
            "3+ years property management experience",
            "Comfortable with complaint handling and payment reminders",
            "Basic Excel/Word skills",
            "Driver's license preferred",
          ],
        },
        realEstateAssistant: {
          title: "Property Management Assistant",
          type: "Part-time",
          location: "Tokyo (Takanawa) / Remote OK",
          salary: "¥1,200 - ¥1,400/hour",
          count: "1 position",
          description: "Administrative support for property management. Document preparation, data entry, phone support, invoice processing. 3-4 days per week.",
          highlight: "3-4 days/week, housewives welcome",
          requirements: [
            "Administrative experience",
            "Basic Excel/Word skills",
            "Comfortable with phone support",
          ],
        },
        cafeManager: {
          title: "Cafe Manager",
          type: "Full-time",
          location: "Sengakuji Station A4 Exit (1F/2F)",
          salary: "¥3.5M - ¥4.5M annually",
          count: "1 position",
          description: "Cafe operations manager. Hours: Weekdays 7:30-19:00, Weekends 9:00-18:00. Morning, lunch, and cafe time light meals. Prepaid system. Staff scheduling, sales management, purchasing, cooking and customer service.",
          highlight: "Near station, high autonomy",
          requirements: [
            "5+ years restaurant experience (manager experience preferred)",
            "Can handle both cooking and customer service",
            "Shift and sales management experience",
            "Available for early morning shifts",
          ],
        },
        cafeStaff: {
          title: "Cafe Staff",
          type: "Part-time",
          location: "Sengakuji Station A4 Exit (1F/2F)",
          salary: "¥1,150 - ¥1,300/hour",
          count: "4 positions",
          description: "Customer service and cooking assistance at cafe. Early shift (7:00-15:00) or late shift (11:00-19:30). Morning, lunch, cafe time service, cashier, simple cooking assistance, cleaning.",
          highlight: "Shift-based, students welcome",
          requirements: [
            "Customer service experience preferred (beginners OK)",
            "Available for early morning or evening shifts",
            "Can work 3+ days per week",
          ],
        },
        hotelFrontStaff: {
          title: "Hotel Front Desk Staff",
          type: "Full-time",
          location: "Takanawa & Tsukiji (2 locations)",
          salary: "¥3M - ¥3.8M annually (+ night shift allowance)",
          count: "6 positions (3 per location: morning/day/night)",
          description: "Budget accommodation front desk operations. Check-in/out, facility guidance, room cleaning, laundry at coin laundry. 3-shift system with 1 person per shift. Assigned to Takanawa or Tsukiji location.",
          highlight: "Driver's license required, night allowance, 2 locations",
          requirements: [
            "Driver's license (required)",
            "Customer service experience",
            "Can work independently",
            "Available for night shifts (for night position)",
          ],
        },
        hotelCleaningStaff: {
          title: "Hotel Cleaning Staff",
          type: "Part-time",
          location: "Takanawa & Tsukiji (2 locations)",
          salary: "¥1,150 - ¥1,300/hour",
          count: "2 positions (1 per location)",
          description: "Budget accommodation cleaning and laundry assistance. Daytime room cleaning, common area cleaning, sheet laundry at coin laundry. Assigned to Takanawa or Tsukiji location.",
          highlight: "Daytime work, physically fit, 2 locations",
          requirements: [
            "Cleaning experience preferred",
            "Physically fit",
            "Driver's license preferred",
          ],
        },
        recruitmentSales: {
          title: "Recruitment Sales",
          type: "Full-time",
          location: "Tokyo (Takanawa)",
          salary: "¥4M - ¥7M annually (performance bonus)",
          count: "1 position",
          description: "Sales activities for Myanmar talent to Japanese companies. Proposals, matching, and contract negotiations based on overseas candidate CVs. Performance-based incentives available.",
          highlight: "Performance-based, high income potential",
          requirements: [
            "5+ years sales experience",
            "HR industry or foreign talent experience preferred",
            "Self-starter",
            "Comfortable with performance-based compensation",
          ],
        },
      },
      benefitsList: {
        insurance: "Full social insurance (health, pension, employment, workers' comp) *Full-time only",
        vacation: "2 days off/week, paid leave, year-end holidays, special leave *Full-time only",
        bonus: "Biannual bonus (performance-based), annual raise *Full-time only",
        commute: "Transportation allowance (commute within 30 min)",
        housing: "Housing allowance (conditions apply) *Full-time only",
      },
    },
    footer: {
      description: "Tengcle Inc. is a Japanese corporation operating five businesses: real estate management, restaurant operations, rental gyms, capsule hotel operations, and recruitment services.",
      navigation: "Navigation",
      contact: "Contact",
      hongkong: "Tengcle Limited (Hong Kong HQ)",
      group: "Group Companies",
    },
    common: {
      learnMore: "Learn More",
      getInTouch: "Get in Touch",
      japanCorporate: "Japan Corporation",
      fullTime: "Full-time",
      partTime: "Part-time",
      contract: "Contract",
    },
  },
  zh: {
    nav: {
      home: "首页",
      services: "业务内容",
      about: "公司概要",
      contact: "联系我们",
      careers: "招聘信息",
    },
    hero: {
      tagline: "来自日本的商业解决方案",
      headline1: "通过多元化业务",
      headline2: "创造价值",
      subtitle: "从房地产到餐饮、健身、住宿和人才服务。Tengcle Inc.在日本市场提供多样化服务，支持您的生活和事业。",
      cta1: "查看业务内容",
      cta2: "联系我们",
      trust1: "日本法人",
      trust2: "集团企业",
      trust3: "多元化业务",
    },
    services: {
      subtitle: "业务内容",
      title: "五大业务领域",
      description: "我们在房地产、餐饮、健身、住宿和人才五个领域提供高品质服务，满足客户需求。",
      viewAll: "了解更多",
      realEstate: {
        title: "房地产管理",
        description: "从租赁物业管理到为业主提供收益最大化建议。我们提供让租户和业主双方满意的房地产管理服务。",
      },
      restaurant: {
        title: "餐饮运营",
        description: "从餐厅咖啡馆策划到店铺开发、菜单开发、员工培训。全面支持餐饮业务的成功。",
      },
      gym: {
        title: "租赁健身房",
        description: "运营可在私密空间专注训练的租赁健身房。以最新设备和清洁环境支持您的健康生活。",
      },
      capsuleHotel: {
        title: "胶囊酒店运营",
        description: "运营追求舒适性和功能性的新一代胶囊酒店。为商务和观光客人提供实惠、高品质的住宿体验。",
      },
      recruitment: {
        title: "人才介绍",
        description: "实现企业与求职者的最佳匹配。利用行业知识和丰富网络，为双方创造有价值的机会。",
      },
    },
    about: {
      subtitle: "公司概要",
      title: "关于Tengcle Inc.",
      description: "Tengcle Inc.是总部位于香港的Tengcle Limited的日本法人，在日本市场开展多元化业务。",
      story: {
        title: "关于我们",
        p1: "Tengcle Inc.作为总部位于香港的Tengcle Limited集团成员，负责日本市场的业务拓展。",
        p2: "通过房地产管理、餐饮运营、租赁健身房、胶囊酒店运营、人才介绍五大业务，为日本各界人士的生活和事业做出贡献。",
      },
      info: {
        title: "公司信息",
        legalName: "法人名称",
        established: "成立",
        location: "所在地",
      },
      philosophy: {
        title: "我们的理念",
        mission: "使命",
        missionText: "通过多元化业务，为客户的生活和事业创造新价值，为社会发展做出贡献。",
        values: "价值观",
        valuesText: "诚信、对品质的执着、以客户为先的态度。我们珍视这些价值观，始终做值得信赖的合作伙伴。",
      },
    },
    contact: {
      subtitle: "联系我们",
      title: "欢迎垂询",
      description: "如有业务咨询或报价需求，请随时与我们联系。",
      email: "邮箱",
      info: {
        tokyoOffice1: "东京办公室（高轮）",
        tokyoOffice2: "东京办公室（筑地）",
        hkOffice: "香港总部",
      },
    },
    careers: {
      subtitle: "招聘信息",
      title: "诚聘英才",
      description: "Tengcle Inc.正在寻找各业务部门的员工。欢迎有经验者，也欢迎新人。",
      midCareer: "社会招聘",
      salaryNote: "※薪资根据经验和能力确定",
      totalPositions: "招聘中：正式员工9名、兼职3名、小时工4名",
      positions: {
        title: "招聘职位",
        description: "了解我们目前的职位空缺。",
      },
      requirements: {
        title: "应聘资格",
        description: "各职位要求不同，请查看各职位详情。",
      },
      benefits: {
        title: "福利待遇",
        description: "我们为所有员工提供良好的工作环境。",
      },
      apply: {
        title: "申请方式",
        description: "如有兴趣，请将简历发送至以下邮箱。",
        button: "立即申请",
      },
      positionCategories: {
        fullTime: "正式员工招聘",
        fullTimeDesc: "我们正在寻找各业务部门的核心员工。",
        partTime: "兼职招聘",
        partTimeDesc: "适合您生活方式的灵活职位。",
      },
      positionsList: {
        realEstateManager: {
          title: "物业管理员工",
          type: "正式员工",
          location: "东京（高轮）",
          salary: "年薪 350万〜450万日元",
          count: "1名",
          description: "30-50年老旧租赁物业的全面管理。维修协调、租金确认、合同续签、催款、水电费账单、与房产中介合作招租等。",
          highlight: "欢迎有经验者、长期工作",
          requirements: [
            "3年以上物业管理经验",
            "能够处理投诉和催款",
            "基本Excel/Word操作",
            "有驾照更佳",
          ],
        },
        realEstateAssistant: {
          title: "物业管理助理",
          type: "兼职",
          location: "东京（高轮）・可远程",
          salary: "时薪 1,200〜1,400日元",
          count: "1名",
          description: "物业管理的行政支持。文件准备、数据录入、电话支持、发票处理。每周3-4天。",
          highlight: "每周3-4天・欢迎主妇",
          requirements: [
            "有行政经验",
            "基本Excel/Word操作",
            "能够接听电话",
          ],
        },
        cafeManager: {
          title: "咖啡店店长",
          type: "正式员工",
          location: "�的�的泉岳寺站A4出口（1F/2F）",
          salary: "年薪 350万〜450万日元",
          count: "1名",
          description: "咖啡店运营负责人。营业时间：平日7:30-19:00，周末9:00-18:00。早餐、午餐、下午茶轻食。预付制。员工排班、销售管理、采购、烹饪和客户服务。",
          highlight: "近车站・自主权大",
          requirements: [
            "5年以上餐饮经验（有店长经验更佳）",
            "能够同时处理烹饪和客户服务",
            "排班和销售管理经验",
            "能够早班工作",
          ],
        },
        cafeStaff: {
          title: "咖啡店员工",
          type: "小时工",
          location: "泉岳寺站A4出口（1F/2F）",
          salary: "时薪 1,150〜1,300日元",
          count: "4名",
          description: "咖啡店的客户服务和烹饪协助。早班（7:00-15:00）或晚班（11:00-19:30）。早餐、午餐、下午茶服务、收银、简单烹饪协助、清洁。",
          highlight: "轮班制・欢迎学生",
          requirements: [
            "有客户服务经验更佳（新人可）",
            "能够早班或晚班工作",
            "每周能工作3天以上",
          ],
        },
        hotelFrontStaff: {
          title: "酒店前台员工",
          type: "正式员工",
          location: "高轮・築地（2个地点）",
          salary: "年薪 300万〜380万日元（另有夜班津贴）",
          count: "6名（每个地点早班/日班/夜班各1名）",
          description: "简易住宿设施前台业务。入住退房、设施介绍、客房清洁、在投币洗衣店洗床单。3班制，每班1人。分配到高轮或築地设施。",
          highlight: "需要驾照・有夜班津贴・2个地点同时招聘",
          requirements: [
            "驾照（必须）",
            "有客户服务经验",
            "能够独立工作",
            "能够夜班工作（夜班职位）",
          ],
        },
        hotelCleaningStaff: {
          title: "酒店清洁员工",
          type: "兼职",
          location: "高轮・築地（2个地点）",
          salary: "时薪 1,150〜1,300日元",
          count: "2名（每个地点1名）",
          description: "简易住宿设施的清洁和洗衣协助。白天客房清洁、公共区域清洁、在投币洗衣店洗床单。分配到高轮或築地设施。",
          highlight: "白天工作・需要体力・2个地点同时招聘",
          requirements: [
            "有清洁经验更佳",
            "体力好",
            "有驾照更佳",
          ],
        },
        recruitmentSales: {
          title: "人才营销",
          type: "正式员工",
          location: "东京（高轮）",
          salary: "年薪 400万〜700万日元（有业绩奖金）",
          count: "1名",
          description: "向日本企业推销缅甸人才。根据海外候选人简历进行提案、匹配和签约。有业绩奖金。",
          highlight: "业绩奖金・高收入可能",
          requirements: [
            "5年以上销售经验",
            "有人才行业或外国人才经验更佳",
            "能够自主工作",
            "接受业绩导向薪酬",
          ],
        },
      },
      benefitsList: {
        insurance: "完善的社会保险（健康保险、养老金、雇用保险、工伤保险）※仅正式员工",
        vacation: "每周双休、带薪年假、年末年初假期、特别假期 ※仅正式员工",
        bonus: "每年两次奖金（根据业绩）、每年一次调薪 ※仅正式员工",
        commute: "交通补贴（通勤时间30分钟以内）",
        housing: "住房补贴（有条件）※仅正式员工",
      },
    },
    footer: {
      description: "Tengcle Inc.是开展房地产管理、餐饮运营、租赁健身房、胶囊酒店运营、人才介绍五大业务的日本法人。",
      navigation: "导航",
      contact: "联系方式",
      hongkong: "Tengcle Limited（香港总部）",
      group: "集团企业",
    },
    common: {
      learnMore: "了解更多",
      getInTouch: "联系我们",
      japanCorporate: "日本法人",
      fullTime: "正式员工",
      partTime: "兼职",
      contract: "合同工",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const JpLanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function JpLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ja");

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <JpLanguageContext.Provider value={value}>
      {children}
    </JpLanguageContext.Provider>
  );
}

export function useJpLanguage() {
  const context = useContext(JpLanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
