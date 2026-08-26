/**
 * About Page - Company Information
 * 
 * Design Philosophy:
 * - Clean white base with Navy & Gold accents
 * - Company story and philosophy
 * - Multi-language support (JA/EN/ZH)
 */

import { useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, useInView, type Variants, type Easing } from "framer-motion";
import { ArrowRight, Building2, Target, Heart, ExternalLink } from "lucide-react";
import Header from "@/components/jp/Header";
import Footer from "@/components/jp/Footer";

import { Button } from "@/components/ui/button";
import { useJpLanguage } from "@/contexts/JpLanguageContext";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead, { generateBreadcrumbSchema, generateOrganizationSchema } from "@/components/SEOHead";
import { companyProfiles } from "@/data/companyProfiles";

const jpCompany = companyProfiles.jp;
const jpAddress = jpCompany.addresses[0];

const easeOut: Easing = [0.16, 1, 0.3, 1];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut }
  },
};



export default function About() {
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

  return (
    <div className="min-h-screen bg-white" data-region="jp">
      <SEOHead
        title={language === "ja" ? "会社概要 | 株式会社Tengcle 東京の不動産管理" : language === "zh" ? "关于我们 | 株式会社Tengcle 东京的房地产管理" : "About Us | 株式会社Tengcle Tokyo Property Management"}
        description={language === "ja" ? "株式会社Tengcleの会社情報。東京を拠点に家賃回収、修繕手配、テナント対応などの不動産管理を行っています。" : language === "zh" ? "株式会社Tengcle的公司信息。以东京为基地，提供租金回收、维修协调和租户沟通等房地产管理服务。" : "About 株式会社Tengcle, a Tokyo-based company providing property management including rent collection, repair coordination, and tenant communication."}
        keywords={language === "ja" ? "株式会社Tengcle, 会社概要, 東京, 不動産管理, 家賃回収, 修繕手配" : language === "zh" ? "株式会社Tengcle, 关于我们, 东京, 房地产管理, 租金回收, 维修协调" : "株式会社Tengcle, about us, Tokyo, property management, rent collection, repair coordination"}
        locale={language === "ja" ? "ja_JP" : language === "zh" ? "zh_CN" : "en_JP"}
        ogImage="/images/og-image.webp"
        canonical={`https://www.tengcle.com/jp/${language}/about`}
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            generateOrganizationSchema({
              name: jpCompany.legalName,
              description: t.about.description,
              url: "https://www.tengcle.com/jp/ja",
              email: jpCompany.email,
              address: {
                street: jpAddress.street,
                city: jpAddress.city,
                region: jpAddress.region,
                country: jpAddress.country,
                postalCode: jpAddress.postalCode,
              },
            }),
            generateBreadcrumbSchema([
              { name: "Tengcle", url: "https://www.tengcle.com/" },
              { name: jpCompany.legalName, url: `https://www.tengcle.com/jp/${language}` },
              { name: t.about.title, url: `https://www.tengcle.com/jp/${language}/about` }
            ])
          ]
        }}
      />
      <Header />
      <main id="main-content" tabIndex={-1}>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-light-gray">
        <div className="container">
          <AnimatedSection className="text-center">
            <motion.p
              variants={fadeInUp}
              className={`text-gold-dark text-sm tracking-[0.3em] uppercase mb-4 ${getFontClass()}`}
            >
              {t.about.subtitle}
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className={`${getHeadingFontClass()} text-4xl md:text-5xl text-navy mb-6`}
            >
              {t.about.title}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-slate max-w-2xl mx-auto ${getFontClass()}`}
            >
              {t.about.description}
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <AnimatedSection>
              <motion.div
                variants={fadeInUp}
                className="relative overflow-hidden rounded-lg shadow-lg"
              >
                <img
                  src="/images/hero-japan-corporate.webp"
                  alt="株式会社Tengcle Japan"
                  className="w-full h-80 lg:h-[500px] object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
              </motion.div>
            </AnimatedSection>

            {/* Content */}
            <AnimatedSection>
              <motion.div variants={fadeInUp}>
                <h2 className={`${getHeadingFontClass()} text-3xl md:text-4xl text-navy mb-6`}>
                  {t.about.story.title}
                </h2>
                <p className={`text-slate leading-relaxed mb-6 ${getFontClass()}`}>
                  {t.about.story.p1}
                </p>
                <p className={`text-slate leading-relaxed mb-8 ${getFontClass()}`}>
                  {t.about.story.p2}
                </p>
                <Button asChild variant="outline" className={`border-navy text-navy hover:bg-navy/5 px-6 py-5 text-sm tracking-wider ${getFontClass()}`}>
                  <Link href="/hk/en">
                    {t.footer.hongkong}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-20 lg:py-28 bg-light-gray">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <motion.h2
              variants={fadeInUp}
              className={`${getHeadingFontClass()} text-3xl md:text-4xl text-navy mb-6`}
            >
              {t.about.info.title}
            </motion.h2>
          </AnimatedSection>

          <AnimatedSection>
            <motion.div
              variants={fadeInUp}
              className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden"
            >
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <th className={`text-left py-5 px-6 bg-gray-50 text-navy font-medium w-1/3 ${getFontClass()}`}>
                      {t.about.info.legalName}
                    </th>
                    <td className={`py-5 px-6 text-charcoal ${getFontClass()}`}>
                      株式会社Tengcle
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <th className={`text-left py-5 px-6 bg-gray-50 text-navy font-medium ${getFontClass()}`}>
                      {language === "ja" ? "設立日" : language === "zh" ? "成立日期" : "Incorporated"}
                    </th>
                    <td className={`py-5 px-6 text-charcoal ${getFontClass()}`}>
                      2021-10-25
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <th className={`text-left py-5 px-6 bg-gray-50 text-navy font-medium ${getFontClass()}`}>
                      {language === "ja" ? "登記上の本店" : language === "zh" ? "注册办事处" : "Registered Office"}
                    </th>
                    <td className={`py-5 px-6 text-charcoal ${getFontClass()}`}>
                      {language === "ja" ? (
                        <>
                          〒108-0074 東京都港区高輪2-19-20
                        </>
                      ) : language === "zh" ? (
                        <>
                          〒108-0074 东京都港区高轮2-19-20
                        </>
                      ) : (
                        <>
                          2-19-20 Takanawa, Minato-ku, Tokyo 108-0074
                        </>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th className={`text-left py-5 px-6 bg-gray-50 text-navy font-medium ${getFontClass()}`}>
                      {language === "ja" ? "香港関連会社" : language === "zh" ? "香港关联公司" : "Hong Kong Affiliated Company"}
                    </th>
                    <td className={`py-5 px-6 text-charcoal ${getFontClass()}`}>
                      <Link
                        href="/hk/en"
                        className="text-navy hover:text-gold transition-colors flex items-center gap-2"
                      >
                        Tengcle Limited (Hong Kong)
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <motion.h2
              variants={fadeInUp}
              className={`${getHeadingFontClass()} text-3xl md:text-4xl text-navy mb-6`}
            >
              {t.about.philosophy.title}
            </motion.h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AnimatedSection>
              <motion.div
                variants={fadeInUp}
                className="bg-light-gray p-8 rounded-lg"
              >
                <Target className="h-10 w-10 text-gold mb-6" />
                <h3 className={`${getHeadingFontClass()} text-xl text-navy mb-4`}>
                  {t.about.philosophy.mission}
                </h3>
                <p className={`text-slate leading-relaxed ${getFontClass()}`}>
                  {t.about.philosophy.missionText}
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection>
              <motion.div
                variants={fadeInUp}
                className="bg-light-gray p-8 rounded-lg"
              >
                <Heart className="h-10 w-10 text-gold mb-6" />
                <h3 className={`${getHeadingFontClass()} text-xl text-navy mb-4`}>
                  {t.about.philosophy.values}
                </h3>
                <p className={`text-slate leading-relaxed ${getFontClass()}`}>
                  {t.about.philosophy.valuesText}
                </p>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-navy">
        <div className="container">
          <AnimatedSection className="text-center">
            <motion.div variants={fadeInUp}>
              <h2 className={`${getHeadingFontClass()} text-3xl md:text-4xl text-white mb-6`}>
                {t.contact.title}
              </h2>
              <p className={`text-gray-300 max-w-2xl mx-auto mb-10 ${getFontClass()}`}>
                {t.contact.description}
              </p>
              <Button asChild className={`bg-gold hover:bg-gold-dark text-navy px-8 py-6 text-sm tracking-wider font-medium ${getFontClass()}`}>
                <Link href={`${basePath}/contact`}>
                  {t.common.getInTouch}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
