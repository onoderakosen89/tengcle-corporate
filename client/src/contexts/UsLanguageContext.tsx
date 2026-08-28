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
    en: 'Real Estate Operations in New Jersey',
    ja: 'ニュージャージーの不動産運営',
    zh: '新泽西房地产运营',
  },
  'hero.title': {
    en: 'Strengthening Property Value',
    ja: '不動産の価値を着実に育てる',
    zh: '稳步提升物业价值',
  },
  'hero.subtitle': {
    en: 'Based in New Jersey, we handle rent collection, repair coordination, tenant matters, and practical improvements that support lasting property value.',
    ja: 'ニュージャージー州を拠点に、家賃回収、修繕手配、テナント対応を含む不動産管理と、物件価値の向上に取り組んでいます。',
    zh: '我们立足新泽西州，开展租金收取、维修协调、租户沟通及物业价值提升工作。',
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
    en: 'Property operations and value-enhancement services for owners',
    ja: 'オーナー向けの不動産管理・価値向上支援',
    zh: '面向业主的物业管理与价值提升服务',
  },

  // Service 0: Property Development (Core Business)
  'service.development.title': {
    en: 'Property Revitalization',
    ja: '物件再生・価値向上',
    zh: '物业改造与价值提升',
  },
  'service.development.desc': {
    en: 'We assess each property’s condition and operations, then coordinate repairs and practical improvements to strengthen usability, stability, and long-term value.',
    ja: '物件の状態と運営上の課題を整理し、修繕や実務的な改善を通じて、使いやすさ、安定性、長期的な価値の向上を図ります。',
    zh: '我们梳理物业现状与运营问题，通过维修和务实改进，提升使用体验、运营稳定性与长期价值。',
  },
  'service.development.feature1': {
    en: 'Property Assessment',
    ja: '物件状況の整理',
    zh: '物业状况评估',
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
    en: 'Long-term Value Creation',
    ja: '長期的な価値形成',
    zh: '长期价值创造',
  },

  // Service 1: Property Management
  'service.property.title': {
    en: 'Property Management',
    ja: '不動産管理',
    zh: '物业管理',
  },
  'service.property.desc': {
    en: 'We handle the day-to-day work that keeps properties operating, including rent collection, repair coordination, tenant communication, and owner reporting.',
    ja: '家賃回収、修繕手配、テナント対応、オーナーへの報告など、物件運営に必要な日常管理を一貫して行います。',
    zh: '我们统一处理物业日常运营所需的租金收取、维修协调、租户沟通及业主汇报。'
  },
  'service.property.feature1': {
    en: 'Tenant Communication',
    ja: 'テナント対応',
    zh: '租户沟通',
  },
  'service.property.feature2': {
    en: 'Rent Collection & Financial Reporting',
    ja: '家賃回収・収支レポート',
    zh: '租金收取与财务报告',
  },
  'service.property.feature3': {
    en: 'Repair Coordination',
    ja: '修繕手配',
    zh: '维修协调',
  },
  'service.property.feature4': {
    en: 'Regular Inspections',
    ja: '定期巡回・点検',
    zh: '定期检查',
  },

  // Service 2: Vacation Rentals
  'service.vacation.title': {
    en: 'Short-Stay Operations Planning',
    ja: '短期滞在の運用設計',
    zh: '短期住宿运营设计',
  },
  'service.vacation.desc': {
    en: 'We design operating plans for short-stay use around each property’s location and characteristics, balancing guest experience with sustainable performance.',
    ja: '物件の立地や特性に合わせて短期滞在向けの運用方法を設計し、利用体験と持続的な収益性の両立を図ります。',
    zh: '我们根据物业位置与特点设计短期住宿运营方案，兼顾住客体验与可持续收益。',
  },
  'service.vacation.feature1': {
    en: 'Market Analysis & Strategy',
    ja: '市場分析・戦略立案',
    zh: '市场分析与战略',
  },
  'service.vacation.feature2': {
    en: 'Operational Planning',
    ja: '運営計画立案',
    zh: '运营规划'
  },
  'service.vacation.feature3': {
    en: 'Cleaning & Turnover Planning',
    ja: '清掃・入れ替え設計',
    zh: '清洁与周转规划',
  },
  'service.vacation.feature4': {
    en: 'Pricing & Revenue Planning',
    ja: '料金・収益計画',
    zh: '定价与收益规划',
  },

  // About Section
  'about.title': {
    en: 'About Tengcle Development LLC',
    ja: 'Tengcle Development LLCについて',
    zh: '关于Tengcle Development LLC',
  },
  'about.subtitle': {
    en: 'New Jersey Company',
    ja: 'ニュージャージー州法人',
    zh: '新泽西州公司',
  },
  'about.description': {
    en: 'Tengcle Development LLC is based in New Jersey and improves property operations through day-to-day management, repair coordination, and tenant support.',
    ja: 'Tengcle Development LLCはニュージャージー州を拠点に、日々の管理、修繕調整、テナント対応を通じて物件の運営と価値向上に取り組んでいます。',
    zh: 'Tengcle Development LLC立足新泽西州，通过日常管理、维修协调与租户支持推动物业运营与价值提升。',
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
    en: 'United States Company',
    ja: '米国法人',
    zh: '美国公司',
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
    ja: 'Tengcle Limited（香港法人）',
    zh: 'Tengcle Limited（香港公司）',
  },
  'footer.jp': {
    en: '株式会社Tengcle (Japan)',
    ja: '株式会社Tengcle（日本）',
    zh: '株式会社Tengcle（日本）',
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
    en: 'Tengcle Development LLC | Property Management & Revitalization in NJ/NY',
    ja: 'Tengcle Development LLC | NJ/NYの不動産管理・物件再生',
    zh: 'Tengcle Development LLC | 新泽西／纽约物业管理与改造',
  },
  'meta.description': {
    en: 'Based in New Jersey, providing property management, repair coordination, tenant support, and property revitalization. NJ/NY service scope is confirmed per property.',
    ja: 'ニュージャージー州を拠点に、家賃回収、修繕手配、テナント対応を含む不動産管理と物件再生に取り組んでいます。NJ/NYの対応範囲は物件ごとに確認します。',
    zh: '立足新泽西州，开展租金收取、维修协调、租户支持及物业改造。新泽西／纽约的服务范围按每处物业确认。',
  },
  'meta.keywords': {
    en: 'Tengcle Development LLC, NJ real estate, property revitalization, short-stay operations planning, property management, New Jersey',
    ja: 'Tengcle Development LLC, NJ不動産, 不動産管理, 物件再生, 修繕, ニュージャージー',
    zh: 'Tengcle Development LLC, 新泽西房地产, 物业管理, 物业改造, 维修, 新泽西',
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
