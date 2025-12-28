import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'wouter';

type Language = 'en' | 'ja' | 'zh';

interface Translations {
  [key: string]: {
    en: string;
    ja: string;
    zh: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Translations = {
  // Navigation
  'nav.home': {
    en: 'Home',
    ja: 'ホーム',
    zh: '首页',
  },
  'nav.services': {
    en: 'Services',
    ja: '事業内容',
    zh: '服务',
  },
  'nav.about': {
    en: 'About',
    ja: '会社概要',
    zh: '关于我们',
  },
  'nav.contact': {
    en: 'Contact',
    ja: 'お問い合わせ',
    zh: '联系我们',
  },

  // Hero Section
  'hero.tagline': {
    en: 'Your Partner in US Real Estate',
    ja: '米国不動産運用のパートナー',
    zh: '美国房地产投资合作伙伴',
  },
  'hero.title': {
    en: 'Maximizing Asset Value',
    ja: '資産価値の最大化',
    zh: '最大化资产价值',
  },
  'hero.subtitle': {
    en: 'Professional property management and vacation rental solutions in New Jersey and the New York metropolitan area.',
    ja: 'ニュージャージー・ニューヨークエリアにおける、プロフェッショナルな不動産管理とバケーションレンタル運用。',
    zh: '新泽西和纽约都会区的专业物业管理及度假租赁解决方案。',
  },
  'hero.cta.services': {
    en: 'Our Services',
    ja: 'サービス一覧',
    zh: '服务一览',
  },
  'hero.cta.contact': {
    en: 'Get a Quote',
    ja: 'お問い合わせ',
    zh: '获取报价',
  },

  // Services Section
  'services.title': {
    en: 'Our Services',
    ja: '事業内容',
    zh: '我们的服务',
  },
  'services.subtitle': {
    en: 'Real estate services for property owners and investors',
    ja: '不動産オーナー・投資家向けサービス',
    zh: '为业主和投资者提供服务',
  },

  // Service 1: Property Management
  'service.property.title': {
    en: 'Property Management',
    ja: '不動産管理',
    zh: '物业管理',
  },
  'service.property.desc': {
    en: 'Full-service management for residential and commercial assets. We handle everything from tenant placement to maintenance, ensuring steady returns.',
    ja: '住宅・商業物件の包括的管理サービス。入居者募集からメンテナンス、収支管理まで、現地のプロフェッショナルが一貫してサポートします。',
    zh: '住宅和商业资产的全方位管理服务。从租户安置到维护，确保稳定的投资回报。',
  },
  'service.property.feature1': {
    en: 'Rigorous Tenant Screening',
    ja: '厳格な入居者審査',
    zh: '严格的租户筛选',
  },
  'service.property.feature2': {
    en: 'Rent Collection & Financial Reporting',
    ja: '家賃回収・収支レポート',
    zh: '租金收取与财务报告',
  },
  'service.property.feature3': {
    en: '24/7 Maintenance Coordination',
    ja: '24時間メンテナンス対応',
    zh: '24/7 维护协调',
  },
  'service.property.feature4': {
    en: 'Regular Inspections',
    ja: '定期巡回・点検',
    zh: '定期检查',
  },

  // Service 2: Vacation Rentals
  'service.vacation.title': {
    en: 'Vacation Rental Management',
    ja: 'バケーションレンタル運用',
    zh: '度假租赁管理',
  },
  'service.vacation.desc': {
    en: 'Optimizing short-term rentals on Airbnb & VRBO. We deploy dynamic pricing and professional hospitality to maximize occupancy and revenue.',
    ja: 'Airbnb・VRBOでの短期賃貸運用を最適化。ダイナミックプライシングと質の高いホスピタリティで、稼働率と収益を最大化します。',
    zh: '优化 Airbnb 和 VRBO 短期租赁。我们利用动态定价和专业服务，最大化入住率和收入。',
  },
  'service.vacation.feature1': {
    en: 'Listing & SEO Optimization',
    ja: 'リスティング最適化 (SEO)',
    zh: '房源及 SEO 优化',
  },
  'service.vacation.feature2': {
    en: 'Guest Communication & Support',
    ja: '多言語ゲスト対応',
    zh: '与客人沟通及支持',
  },
  'service.vacation.feature3': {
    en: 'Professional Cleaning & turnover',
    ja: '専門スタッフによる清掃',
    zh: '专业清洁与周转',
  },
  'service.vacation.feature4': {
    en: 'Revenue Management',
    ja: 'レベニューマネジメント',
    zh: '收益管理',
  },

  // About Section
  'about.title': {
    en: 'About Tengcle LLC',
    ja: 'Tengcle LLCについて',
    zh: '关于Tengcle LLC',
  },
  'about.subtitle': {
    en: 'US Office of Tengcle Group',
    ja: 'Tengcleグループ米国拠点',
    zh: 'Tengcle集团美国办事处',
  },
  'about.description': {
    en: 'Tengcle LLC represents the US operations of the global Tengcle Group. Based in New Jersey, we bring Japanese service standards to the competitive NY/NJ real estate market.',
    ja: 'Tengcle LLCは、Tengcle Groupの米国拠点です。ニュージャージーを拠点に、日本クオリティのきめ細やかなサービスを、NY/NJの不動産市場で提供しています。',
    zh: 'Tengcle LLC 代表 Tengcle Group 的美国业务。我们立足新泽西，将日式服务标准带入竞争激烈的纽约/新泽西房地产市场。',
  },

  // Company Info
  'company.name': {
    en: 'Tengcle LLC',
    ja: 'Tengcle LLC',
    zh: 'Tengcle LLC',
  },
  'company.address': {
    en: '17 Hamilton Ave, Weehawken, NJ 07086, USA',
    ja: '17 Hamilton Ave, Weehawken, NJ 07086, USA',
    zh: '17 Hamilton Ave, Weehawken, NJ 07086, USA',
  },
  'company.role': {
    en: 'US Office',
    ja: '米国拠点',
    zh: '美国办事处',
  },

  // Contact Section
  'contact.title': {
    en: 'Contact Us',
    ja: 'お問い合わせ',
    zh: '联系我们',
  },
  'contact.subtitle': {
    en: 'Get in touch with our US team',
    ja: '米国チームへのお問い合わせ',
    zh: '联系我们的美国团队',
  },
  'contact.email': {
    en: 'Email',
    ja: 'メール',
    zh: '电子邮件',
  },
  'contact.address': {
    en: 'Address',
    ja: '住所',
    zh: '地址',
  },

  // Footer
  'footer.rights': {
    en: 'All rights reserved.',
    ja: 'All rights reserved.',
    zh: '版权所有。',
  },
  'footer.hk': {
    en: 'Tengcle Limited (Hong Kong)',
    ja: 'Tengcle Limited（香港本社）',
    zh: 'Tengcle Limited（香港总部）',
  },
  'footer.jp': {
    en: 'Tengcle Inc. (Japan)',
    ja: 'Tengcle Inc.（日本）',
    zh: 'Tengcle Inc.（日本）',
  },

  // CTA
  'cta.title': {
    en: "Let's Get Started",
    ja: 'お気軽にご連絡ください',
    zh: '让我们开始吧',
  },
  'cta.subtitle': {
    en: 'Contact us to discuss your property management needs',
    ja: '不動産管理のご相談はお気軽にどうぞ',
    zh: '联系我们讨论您的物业管理需求',
  },
  'cta.button': {
    en: 'Contact Us',
    ja: 'お問い合わせ',
    zh: '联系我们',
  },

  // SEO Meta
  'meta.title': {
    en: 'Tengcle LLC | NJ/NY Asset Management',
    ja: 'Tengcle LLC | 米国資産管理パートナー',
    zh: 'Tengcle LLC | 资产管理合作伙伴',
  },
  'meta.description': {
    en: 'Maximizing real estate value in NJ & NY. Professional property management and vacation rental solutions with Japanese hospitality standards.',
    ja: 'ニュージャージー・NYエリアの不動産価値を最大化。日本基準のきめ細やかな管理とバケーションレンタル運用を提供します。',
    zh: '最大化新泽西和纽约的房地产价值。提供符合日式服务标准的专业物业管理和度假租赁解决方案。',
  },
  'meta.keywords': {
    en: 'Tengcle LLC, NJ property management, vacation rentals NY, Japanese hospitality, real estate investment',
    ja: 'Tengcle LLC, NJ不動産管理, NY民泊運用, 日本式サービス, 米国不動産投資',
    zh: 'Tengcle LLC, 新泽西物业管理, 纽约度假租赁, 日式服务, 美国房地产投资',
  },
};

const UsLanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function UsLanguageProvider({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Extract language from URL path
    const pathParts = location.split('/');
    const langFromPath = pathParts[2] as Language;
    if (langFromPath && ['en', 'ja', 'zh'].includes(langFromPath)) {
      setLanguage(langFromPath);
    }
  }, [location]);

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language] || translation.en || key;
  };

  return (
    <UsLanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </UsLanguageContext.Provider>
  );
}

export function useUsLanguage() {
  const context = useContext(UsLanguageContext);
  if (context === undefined) {
    throw new Error('useUsLanguage must be used within a UsLanguageProvider');
  }
  return context;
}
