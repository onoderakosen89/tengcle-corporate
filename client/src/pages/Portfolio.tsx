/**
 * Portfolio Page - Clean White Professional Design
 * 
 * Projects displayed without specific country names
 * Uses "Southeast Asia" for location
 */

import { useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, useInView, type Variants, type Easing } from "framer-motion";
import { ArrowRight, Building2, Cpu, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const easeOut: Easing = [0.16, 1, 0.3, 1];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: easeOut } 
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Portfolio() {
  const { t, language } = useLanguage();
  const [location] = useLocation();
  const pathLang = location.split("/")[2] || "en";
  const basePath = `/hk/${pathLang}`;
  
  const getFontClass = () => {
    if (language === "ja") return "font-jp";
    if (language === "zh") return "font-zh";
    return "font-body";
  };

  const getHeadingFontClass = () => {
    if (language === "ja") return "font-jp";
    if (language === "zh") return "font-zh";
    return "font-heading";
  };

  const projects = [
    {
      icon: Building2,
      title: t.portfolio.project1.title,
      location: t.portfolio.project1.location,
      description: t.portfolio.project1.description,
      image: "/images/hotel-lobby-realistic.jpg",
      scope: language === "ja" ? [
        "本館全面改装",
        "別館内装工事一式",
        "400室以上の新規ホテル建設",
        "ホテル運営・管理",
        "FF&E/OS&E調達",
      ] : language === "zh" ? [
        "主楼全面翻新",
        "附楼室内装修",
        "400多间客房新酒店建设",
        "酒店运营管理",
        "FF&E/OS&E采购",
      ] : [
        "Main building complete renovation",
        "Annex interior fit-out",
        "400+ room new hotel construction",
        "Hotel operations and management",
        "FF&E/OS&E procurement",
      ],
      stats: [
        { label: language === "ja" ? "客室数" : language === "zh" ? "客房数" : "Rooms", value: "400+" },
        { label: language === "ja" ? "プロジェクト規模" : language === "zh" ? "项目规模" : "Scale", value: language === "ja" ? "大規模" : language === "zh" ? "大规模" : "Large" },
        { label: language === "ja" ? "ステータス" : language === "zh" ? "状态" : "Status", value: language === "ja" ? "進行中" : language === "zh" ? "进行中" : "Ongoing" },
      ],
    },
    {
      icon: Cpu,
      title: t.portfolio.project2.title,
      location: t.portfolio.project2.location,
      description: t.portfolio.project2.description,
      image: "/images/portfolio-it-realistic.jpg",
      scope: language === "ja" ? [
        "Odoo ERP導入",
        "高度なカスタマイズ（API、フィールド追加）",
        "XML表示カスタマイズ",
        "オペレーションシステム統合",
        "スタッフトレーニング",
      ] : language === "zh" ? [
        "Odoo ERP实施",
        "高级定制（API、字段添加）",
        "XML显示定制",
        "运营系统集成",
        "员工培训",
      ] : [
        "Odoo ERP implementation",
        "Advanced customization (API, field additions)",
        "XML display customization",
        "Operations system integration",
        "Staff training",
      ],
      stats: [
        { label: language === "ja" ? "システム" : language === "zh" ? "系统" : "System", value: "Odoo ERP" },
        { label: language === "ja" ? "カスタマイズ" : language === "zh" ? "定制" : "Custom", value: language === "ja" ? "高度" : language === "zh" ? "高级" : "Advanced" },
        { label: language === "ja" ? "ステータス" : language === "zh" ? "状态" : "Status", value: language === "ja" ? "進行中" : language === "zh" ? "进行中" : "Ongoing" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white" data-region="hk">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-light-gray">
        <div className="container">
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="max-w-3xl">
              <p className={`text-gold-dark text-sm tracking-[0.3em] uppercase mb-4 ${getFontClass()}`}>
                {t.portfolio.subtitle}
              </p>
              <h1 className={`${getHeadingFontClass()} text-4xl md:text-5xl lg:text-6xl text-navy mb-6`}>
                {t.portfolio.title}
              </h1>
              <p className={`text-slate text-lg leading-relaxed ${getFontClass()}`}>
                {t.portfolio.description}
              </p>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="space-y-24">
            {projects.map((project, index) => (
              <AnimatedSection key={project.title}>
                <motion.div
                  variants={fadeInUp}
                  className="grid lg:grid-cols-2 gap-12 items-start"
                >
                  {/* Image */}
                  <div className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full aspect-[4/3] object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-navy text-white px-4 py-2">
                      <p className={`text-gold text-xs ${getFontClass()}`}>{project.location}</p>
                    </div>

                  </div>
                  
                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <project.icon className="h-12 w-12 text-gold mb-6" />
                    <h2 className={`${getHeadingFontClass()} text-3xl text-navy mb-4`}>
                      {project.title}
                    </h2>
                    <p className={`text-slate leading-relaxed mb-8 ${getFontClass()}`}>
                      {project.description}
                    </p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {project.stats.map((stat, i) => (
                        <div key={i} className="bg-light-gray p-4 text-center">
                          <p className={`text-slate text-xs mb-1 ${getFontClass()}`}>{stat.label}</p>
                          <p className="text-navy font-semibold">{stat.value}</p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Scope */}
                    <h3 className={`${getHeadingFontClass()} text-lg text-navy mb-4`}>
                      {language === "ja" ? "プロジェクト範囲" : language === "zh" ? "项目范围" : "Project Scope"}
                    </h3>
                    <ul className="space-y-2">
                      {project.scope.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                          <span className={`text-charcoal ${getFontClass()}`}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
                
                {index < projects.length - 1 && (
                  <div className="section-divider mt-16" />
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-navy">
        <div className="container">
          <AnimatedSection className="text-center">
            <motion.div variants={fadeInUp}>
              <h2 className={`${getHeadingFontClass()} text-4xl text-white mb-6`}>
                {t.contact.title}
              </h2>
              <p className={`text-white/70 max-w-xl mx-auto mb-10 ${getFontClass()}`}>
                {t.contact.description}
              </p>
              <Link href={`${basePath}/contact`}>
                <Button className={`bg-gold hover:bg-gold-dark text-navy px-10 py-6 text-sm tracking-wider ${getFontClass()}`}>
                  {t.common.getInTouch}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
