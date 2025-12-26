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
    en: 'Real Estate Solutions in the United States',
    ja: 'アメリカの不動産ソリューション',
    zh: '美国房地产解决方案',
  },
  'hero.title': {
    en: 'Property Management & Vacation Rentals',
    ja: '不動産管理と民泊サービス',
    zh: '物业管理与度假租赁',
  },
  'hero.subtitle': {
    en: 'Tengcle LLC offers real estate management and vacation rental services in New Jersey and the New York metro area.',
    ja: 'Tengcle LLCは、ニュージャージー州およびニューヨーク都市圏で不動産管理・民泊サービスを提供しています。',
    zh: 'Tengcle LLC在新泽西州和纽约都会区提供房地产管理和度假租赁服务。',
  },
  'hero.cta.services': {
    en: 'Our Services',
    ja: '事業内容を見る',
    zh: '查看服务',
  },
  'hero.cta.contact': {
    en: 'Contact Us',
    ja: 'お問い合わせ',
    zh: '联系我们',
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
    en: 'Property management for residential and commercial properties. Tenant relations, maintenance, rent collection, and inspections.',
    ja: '住宅・商業物件の不動産管理。入居者対応、メンテナンス、家賃回収、物件点検。',
    zh: '住宅和商业物业管理。租户关系、维护、租金收取和物业检查。',
  },
  'service.property.feature1': {
    en: 'Tenant screening and placement',
    ja: '入居者審査・入居手続き',
    zh: '租户筛选和安置',
  },
  'service.property.feature2': {
    en: 'Rent collection and accounting',
    ja: '家賃回収・会計管理',
    zh: '租金收取和会计',
  },
  'service.property.feature3': {
    en: 'Maintenance coordination',
    ja: 'メンテナンス調整',
    zh: '维护协调',
  },
  'service.property.feature4': {
    en: 'Regular property inspections',
    ja: '定期物件点検',
    zh: '定期物业检查',
  },
  
  // Service 2: Vacation Rentals
  'service.vacation.title': {
    en: 'Vacation Rentals',
    ja: '民泊サービス',
    zh: '度假租赁',
  },
  'service.vacation.desc': {
    en: 'Short-term rental management for Airbnb and VRBO properties.',
    ja: 'Airbnb・VRBO物件の短期レンタル管理。',
    zh: 'Airbnb和VRBO物业的短期租赁管理。',
  },
  'service.vacation.feature1': {
    en: 'Listing optimization',
    ja: 'リスティング最適化',
    zh: '房源优化',
  },
  'service.vacation.feature2': {
    en: 'Guest communication',
    ja: 'ゲスト対応',
    zh: '客人沟通',
  },
  'service.vacation.feature3': {
    en: 'Professional cleaning',
    ja: 'プロフェッショナル清掃',
    zh: '专业清洁',
  },
  'service.vacation.feature4': {
    en: 'Dynamic pricing',
    ja: 'ダイナミックプライシング',
    zh: '动态定价',
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
    en: 'Tengcle LLC is the US office of Tengcle Group. We provide real estate management and vacation rental services in New Jersey and the New York metro area.',
    ja: 'Tengcle LLCは、Tengcleグループの米国拠点です。ニュージャージー州およびニューヨーク都市圏で不動産管理・民泊サービスを提供しています。',
    zh: 'Tengcle LLC是Tengcle集团的美国办事处。在新泽西州和纽约都会区提供房地产管理和度假租赁服务。',
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
