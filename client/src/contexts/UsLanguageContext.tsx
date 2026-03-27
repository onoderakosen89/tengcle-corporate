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
    en: 'Building Our US Real Estate Portfolio',
    ja: '米国不動産ポートフォリオを汋策中',
    zh: '正在构建我们的美国房地产组合',
  },
  'hero.title': {
    en: 'Strategic Growth in Real Estate',
    ja: '不動産での戦略的成長',
    zh: '房地产战略性增長',
  },
  'hero.subtitle': {
    en: 'Established in January 2026, we are building our presence in New Jersey and the New York metropolitan area. We are preparing to launch property management and vacation rental services.',
    ja: '2026年1月設立。ニュージャージー・ニューヨーク都会地域で不動産管理とバケーションレンタルサービスの汋策を進めています。',
    zh: '成立于2026年1月。我们正在新泽西和纽约都会区汋策物业管理和度假租赁服务。',
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

  // Service 0: Property Development (Core Business)
  'service.development.title': {
    en: 'Property Development',
    ja: '不動産開発',
    zh: '房地产开发',
  },
  'service.development.desc': {
    en: 'We are developing our real estate portfolio in the New Jersey and New York metropolitan area. Our strategy focuses on identifying opportunities, conducting thorough market analysis, and building a diversified portfolio of income-generating properties.',
    ja: 'ニュージャージー、ニューヨーク都会地域で不動産ポートフォリオを汋策中です。機会を探索し、市場分析を実施し、多様化した収益物件ポートフォリオを構築していきます。',
    zh: '我们正在新泽西和纽约都会地区开发我们的房地产组合。我们的战略专注于识别机会、进行彻底的市场分析，并构建多样化的收益物业组合。',
  },
  'service.development.feature1': {
    en: 'Distressed Property Acquisition',
    ja: '問題物件の取得',
    zh: '困境物业收购',
  },
  'service.development.feature2': {
    en: 'Strategic Renovation & Revitalization',
    ja: '戦略的修繕・再生',
    zh: '战略性翻新与复兴',
  },
  'service.development.feature3': {
    en: 'Value Enhancement',
    ja: '価値向上',
    zh: '价值提升',
  },
  'service.development.feature4': {
    en: 'Long-term Asset Holding',
    ja: '長期資産保有',
    zh: '长期资产持有',
  },

  // Service 1: Property Management
  'service.property.title': {
    en: 'Property Management',
    ja: '不動産管理',
    zh: '物业管理',
  },
  'service.property.desc': {
    en: 'We are building our property management capabilities. Our services will include tenant placement, rent collection, maintenance coordination, and comprehensive financial reporting for residential and commercial assets.',
    ja: '不動産管理能力を汋策中です。入居者募集、家賃回収、メンテナンス协调、包括的な詳支管理を提供予定です。',
    zh: '我们正在建设我们的物业管理能力。我们的服务将包括租户安置、租金收取、维护协调和全面的财务报告。'
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
    en: 'We are preparing to launch vacation rental management services. Our approach will focus on optimizing short-term rentals through dynamic pricing, professional guest communication, and revenue optimization.',
    ja: 'バケーションレンタル管理サービスを汋策中です。ダイナミックプライシング、プロフェッショナルなゲスト対応、収益最適化を提供予定です。',
    zh: '我们正在汋策度假租赁管理服务。我们的方法将专注于通过动态定价、专业客人沟通和收益优化来优化短期租赁。',
  },
  'service.vacation.feature1': {
    en: 'Market Analysis & Strategy',
    ja: '市場分析・戦略立案',
    zh: '市场分析与战略',
  },
  'service.vacation.feature2': {
    en: 'Operational Planning',
    ja: '運営計画立案',
    zh: '运营规划与执行'
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
    en: 'About Tengcle Development LLC',
    ja: 'Tengcle Development LLCについて',
    zh: '关于Tengcle Development LLC',
  },
  'about.subtitle': {
    en: 'US Office of Tengcle Group',
    ja: 'Tengcleグループ米国拠点',
    zh: 'Tengcle集团美国办事处',
  },
  'about.description': {
    en: 'Tengcle Development LLC represents the US operations of the global Tengcle Group. Based in New Jersey, we bring Japanese service standards to the competitive NY/NJ real estate market.',
    ja: 'Tengcle Development LLCは、Tengcle Groupの米国拠点です。ニュージャージーを拠点に、日本クオリティのきめ細やかなサービスを、NY/NJの不動産市場で提供しています。',
    zh: 'Tengcle Development LLC 代表 Tengcle Group 的美国业务。我们立足新泽西，将日式服务标准带入竞争激烈的纽约/新泽西房地产市场。',
  },

  // Company Info
  'company.name': {
    en: 'Tengcle Development LLC',
    ja: 'Tengcle Development LLC',
    zh: 'Tengcle Development LLC',
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
  'footer.navigation': {
    en: 'Navigation',
    ja: 'ナビゲーション',
    zh: '导航',
  },
  'footer.hk': {
    en: 'Tengcle Limited (Hong Kong)',
    ja: 'Tengcle Limited（香港本社）',
    zh: 'Tengcle Limited（香港总部）',
  },
  'footer.jp': {
    en: 'Tengcle株式会社 (Japan)',
    ja: 'Tengcle株式会社（日本）',
    zh: 'Tengcle株式会社（日本）',
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
    en: 'Tengcle Development LLC | Real Estate Development & Property Management in NJ/NY',
    ja: 'Tengcle Development LLC | NJ/NYの不動産開発・管理',
    zh: 'Tengcle Development LLC | 新泽西/纽约房地产开发与管理',
  },
  'meta.description': {
    en: 'NJ/NY real estate development & property management. Value-add investments, vacation rentals & long-term leasing.',
    ja: 'NJ/NYの不動産開発・管理。バリューアップ投資、民泊・長期賃貸運用。',
    zh: '新泽西/纽约房地产开发与管理。增值投资、民宿及长期租赁运营。',
  },
  'meta.keywords': {
    en: 'Tengcle Development LLC, NJ real estate, property development, vacation rentals, property management, New Jersey',
    ja: 'Tengcle Development LLC, NJ不動産, 不動産開発, 民泊運用, 物件管理, ニュージャージー',
    zh: 'Tengcle Development LLC, 新泽西房地产, 房地产开发, 民宿运营, 物业管理, 新泽西',
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
