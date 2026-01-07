/**
 * Careers Page - Recruitment Information
 * 
 * Design Philosophy:
 * - Clean white base with Navy & Gold accents (consistent with brand)
 * - Two categories: Full-time vs Part-time/Arubaito
 * - Salary ranges clearly displayed
 * - Mid-career recruitment only
 * - Total: 6 full-time, 2 part-time, 4 arubaito = 12 positions
 */

import { useRef } from "react";
import { motion, useInView, type Variants, type Easing } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  Shield,
  Calendar,
  Gift,
  Train,
  Home,
  Mail,
  ArrowRight,
  Utensils,
  Users,
  UserCheck,
  Heart,
  Building,
  BedDouble,
  DollarSign
} from "lucide-react";
import Header from "@/components/jp/Header";
import Footer from "@/components/jp/Footer";
import { useJpLanguage } from "@/contexts/JpLanguageContext";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";

const easeOut: Easing = [0.16, 1, 0.3, 1];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut }
  },
};



export default function Careers() {
  const { t, language } = useJpLanguage();
  const [location] = useLocation();
  const pathLang = location.split("/")[2] || "ja";
  const basePath = `/jp/${pathLang}`;

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

  // Full-time positions
  const fullTimePositions = [
    {
      key: "realEstateManager",
      data: t.careers.positionsList.realEstateManager,
      icon: <Building className="h-6 w-6" />,
    },
    {
      key: "cafeManager",
      data: t.careers.positionsList.cafeManager,
      icon: <Utensils className="h-6 w-6" />,
    },
    {
      key: "hotelFrontStaff",
      data: t.careers.positionsList.hotelFrontStaff,
      icon: <BedDouble className="h-6 w-6" />,
    },
    {
      key: "recruitmentSales",
      data: t.careers.positionsList.recruitmentSales,
      icon: <Users className="h-6 w-6" />,
    },
  ];

  // Part-time and Arubaito positions
  const partTimePositions = [
    {
      key: "realEstateAssistant",
      data: t.careers.positionsList.realEstateAssistant,
      icon: <Building className="h-6 w-6" />,
    },
    {
      key: "cafeStaff",
      data: t.careers.positionsList.cafeStaff,
      icon: <Utensils className="h-6 w-6" />,
    },
    {
      key: "hotelCleaningStaff",
      data: t.careers.positionsList.hotelCleaningStaff,
      icon: <BedDouble className="h-6 w-6" />,
    },
  ];

  const benefitItems = [
    { icon: <Shield className="h-6 w-6" />, text: t.careers.benefitsList.insurance },
    { icon: <Calendar className="h-6 w-6" />, text: t.careers.benefitsList.vacation },
    { icon: <Gift className="h-6 w-6" />, text: t.careers.benefitsList.bonus },
    { icon: <Train className="h-6 w-6" />, text: t.careers.benefitsList.commute },
    { icon: <Home className="h-6 w-6" />, text: t.careers.benefitsList.housing },
  ];

  return (
    <div className="min-h-screen bg-white" data-region="jp">
      <SEOHead
        title={language === "ja" ? "採用情報 | Tengcle Inc. 東京 - 一緒に働きませんか" : language === "zh" ? "招聘信息 | Tengcle Inc. 东京 - 加入我们" : "Careers | Tengcle Inc. Tokyo - Join Our Team"}
        description={language === "ja" ? "Tengcle Inc.の採用情報。不動産管理、飲食、ジム事業で一緒に働く仲間を募集中。" : language === "zh" ? "Tengcle Inc.招聘信息。不动产管理、餐饮、健身房业务招聘中。" : "Tengcle Inc. career opportunities. Join our property management, F&B & gym business team."}
        keywords={language === "ja" ? "Tengcle Inc., 採用情報, 求人, 東京, 不動産" : language === "zh" ? "Tengcle Inc., 招聘, 东京, 不动产" : "Tengcle Inc., careers, jobs, Tokyo, property management"}
        locale={language === "ja" ? "ja_JP" : language === "zh" ? "zh_CN" : "en_JP"}
        canonical={`https://www.tengcle.com/jp/${language}/careers`}
      />
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-light-gray to-white">
        <div className="container">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-navy/10 px-4 py-2 rounded-full mb-6"
            >
              <UserCheck className="h-4 w-4 text-navy" />
              <span className={`text-navy text-sm font-medium ${getFontClass()}`}>{t.careers.midCareer}</span>
            </motion.div>
            <motion.p
              variants={fadeInUp}
              className={`text-gold-dark text-sm tracking-[0.3em] uppercase mb-4 ${getFontClass()}`}
            >
              {t.careers.subtitle}
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className={`${getHeadingFontClass()} text-4xl md:text-5xl text-navy mb-6`}
            >
              {t.careers.title}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-slate text-lg leading-relaxed mb-4 ${getFontClass()}`}
            >
              {t.careers.description}
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className={`text-gold-dark font-semibold ${getFontClass()}`}
            >
              {t.careers.totalPositions}
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      {/* Full-time Positions Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <AnimatedSection className="mb-16">
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-4">
              <div className="bg-navy p-3 rounded-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className={`${getHeadingFontClass()} text-2xl md:text-3xl text-navy`}>
                  {t.careers.positionCategories.fullTime}
                </h2>
              </div>
            </motion.div>
            <motion.p
              variants={fadeInUp}
              className={`text-slate max-w-2xl ${getFontClass()}`}
            >
              {t.careers.positionCategories.fullTimeDesc}
            </motion.p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-6">
            {fullTimePositions.map((position) => (
              <AnimatedSection key={position.key}>
                <motion.div
                  variants={fadeInUp}
                  className="bg-white border-2 border-navy/20 rounded-xl p-6 hover:shadow-xl hover:border-navy/40 transition-all duration-300 h-full flex flex-col relative overflow-hidden"
                >
                  {/* Navy accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-navy to-navy/70" />

                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-navy/10 p-3 rounded-lg text-navy">
                      {position.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`${getHeadingFontClass()} text-lg text-navy mb-1`}>
                        {position.data.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <span className="inline-flex items-center gap-1 text-navy">
                          <Clock className="h-3 w-3" />
                          {position.data.type}
                        </span>
                        <span className="inline-flex items-center gap-1 text-gold-dark font-semibold">
                          {position.data.count}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-slate text-sm mb-3">
                    <MapPin className="h-3 w-3" />
                    {position.data.location}
                  </div>

                  {/* Salary highlight */}
                  <div className="bg-navy/5 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 text-navy font-semibold">
                      <DollarSign className="h-4 w-4" />
                      <span className={getFontClass()}>{position.data.salary}</span>
                    </div>
                    <span className={`text-xs text-navy/70 ${getFontClass()}`}>
                      {position.data.highlight}
                    </span>
                  </div>

                  <p className={`text-slate text-sm leading-relaxed flex-1 mb-4 ${getFontClass()}`}>
                    {position.data.description}
                  </p>

                  {/* Requirements */}
                  <div className="border-t border-gray-100 pt-4">
                    <p className={`text-xs text-slate/70 font-medium mb-2 ${getFontClass()}`}>
                      {t.careers.requirements.title}
                    </p>
                    <ul className="space-y-1">
                      {position.data.requirements.slice(0, 4).map((req: string, idx: number) => (
                        <li key={idx} className={`text-xs text-slate flex items-start gap-1 ${getFontClass()}`}>
                          <CheckCircle2 className="h-3 w-3 text-navy mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Part-time Positions Section */}
      <section className="py-20 lg:py-28 bg-light-gray">
        <div className="container">
          <AnimatedSection className="mb-16">
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-4">
              <div className="bg-gold p-3 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className={`${getHeadingFontClass()} text-2xl md:text-3xl text-navy`}>
                  {t.careers.positionCategories.partTime}
                </h2>
              </div>
            </motion.div>
            <motion.p
              variants={fadeInUp}
              className={`text-slate max-w-2xl ${getFontClass()}`}
            >
              {t.careers.positionCategories.partTimeDesc}
            </motion.p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-6">
            {partTimePositions.map((position) => (
              <AnimatedSection key={position.key}>
                <motion.div
                  variants={fadeInUp}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-gold/30 transition-all duration-300 h-full flex flex-col"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-gold/10 p-3 rounded-lg text-gold">
                      {position.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`${getHeadingFontClass()} text-lg text-navy mb-1`}>
                        {position.data.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <span className="inline-flex items-center gap-1 text-gold-dark">
                          <Clock className="h-3 w-3" />
                          {position.data.type}
                        </span>
                        <span className="inline-flex items-center gap-1 text-gold-dark font-semibold">
                          {position.data.count}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-slate text-sm mb-3">
                    <MapPin className="h-3 w-3" />
                    {position.data.location}
                  </div>

                  {/* Salary */}
                  <div className="bg-gold/10 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 text-gold-dark font-semibold">
                      <DollarSign className="h-4 w-4" />
                      <span className={`text-sm ${getFontClass()}`}>{position.data.salary}</span>
                    </div>
                    <span className={`text-xs text-gold-dark/80 ${getFontClass()}`}>
                      {position.data.highlight}
                    </span>
                  </div>

                  <p className={`text-slate text-sm leading-relaxed flex-1 mb-4 ${getFontClass()}`}>
                    {position.data.description}
                  </p>

                  {/* Requirements */}
                  <div className="border-t border-gray-100 pt-4">
                    <p className={`text-xs text-slate/70 font-medium mb-2 ${getFontClass()}`}>
                      {t.careers.requirements.title}
                    </p>
                    <ul className="space-y-1">
                      {position.data.requirements.slice(0, 3).map((req: string, idx: number) => (
                        <li key={idx} className={`text-xs text-slate flex items-start gap-1 ${getFontClass()}`}>
                          <CheckCircle2 className="h-3 w-3 text-gold mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <AnimatedSection className="mb-12">
            <motion.p
              variants={fadeInUp}
              className={`text-gold-dark text-sm tracking-[0.3em] uppercase mb-4 ${getFontClass()}`}
            >
              {t.careers.benefits.title}
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className={`${getHeadingFontClass()} text-3xl md:text-4xl text-navy mb-4`}
            >
              {t.careers.benefits.description}
            </motion.h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefitItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-start gap-4 bg-light-gray rounded-lg p-4"
                >
                  <div className="bg-navy/10 p-2 rounded-lg text-navy flex-shrink-0">
                    {item.icon}
                  </div>
                  <p className={`text-slate text-sm ${getFontClass()}`}>{item.text}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="mt-8">
            <motion.p
              variants={fadeInUp}
              className={`text-slate/70 text-sm text-center ${getFontClass()}`}
            >
              {t.careers.salaryNote}
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      {/* Apply Section */}
      <section className="py-20 lg:py-28 bg-navy text-white">
        <div className="container">
          <AnimatedSection className="text-center max-w-2xl mx-auto">
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6"
            >
              <Mail className="h-4 w-4" />
              <span className={`text-sm ${getFontClass()}`}>{t.careers.apply.title}</span>
            </motion.div>
            <motion.p
              variants={fadeInUp}
              className={`text-white/80 mb-8 ${getFontClass()}`}
            >
              {t.careers.apply.description}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gold hover:bg-gold-dark text-white"
              >
                <a href="mailto:careers@tengcle.com">
                  <Mail className="mr-2 h-4 w-4" />
                  careers@tengcle.com
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                <Link href={`${basePath}/contact`}>
                  {t.nav.contact}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
