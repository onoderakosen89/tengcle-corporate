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
        title={language === "ja" ? "会社概要 | Tengcle Inc. 東京 - 不動産管理・飲食・レンタルジム" : language === "zh" ? "关于我们 | Tengcle Inc. 东京 - 不动产管理·餐饮·租赁健身房" : "About Us | Tengcle Inc. Tokyo - Property, F&B & Rental Gym"}
        description={language === "ja" ? "Tengcle Inc.の会社情報。東京拠点で不動産管理、飲食店運営、レンタルジム事業を展開。" : language === "zh" ? "Tengcle Inc.公司信息。东京总部，提供不动产管理、餐饮运营、租赁健身房服务。" : "About Tengcle Inc. Tokyo-based property management, F&B operations & rental gym business."}
        keywords={language === "ja" ? "Tengcle Inc., 会社概要, 東京, 不動産管理, 飲食店" : language === "zh" ? "Tengcle Inc., 关于我们, 东京, 不动产管理, 餐饮" : "Tengcle Inc., about us, Tokyo, property management, F&B"}
        locale={language === "ja" ? "ja_JP" : language === "zh" ? "zh_CN" : "en_JP"}
        canonical={`https://www.tengcle.com/jp/${language}/about`}
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            generateOrganizationSchema({
              name: "Tengcle Inc.",
              description: t.about.description,
              url: "https://www.tengcle.com/jp",
              email: "info@tengcle.com",
              address: {
                street: "2-19-20 Takanawa",
                city: "Minato-ku",
                region: "Tokyo",
                country: "JP",
                postalCode: "108-0074"
              },
              sameAs: [
                "https://www.tengcle.com",
                "https://www.tengcle.com/us"
              ]
            }),
            generateBreadcrumbSchema([
              { name: "Home", url: "https://www.tengcle.com/jp" },
              { name: t.about.title, url: `https://www.tengcle.com/jp/${language}/about` }
            ])
          ]
        }}
      />
      <Header />

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
                  src="/images/hero-japan-corporate.jpg"
                  alt="Tengcle Inc. Japan"
                  className="w-full h-80 lg:h-[500px] object-cover"
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
                <Link href="/hk/en">
                  <Button variant="outline" className={`border-navy text-navy hover:bg-navy/5 px-6 py-5 text-sm tracking-wider ${getFontClass()}`}>
                    {t.footer.hongkong}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
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
                      Tengcle Inc.
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <th className={`text-left py-5 px-6 bg-gray-50 text-navy font-medium ${getFontClass()}`}>
                      {t.about.info.location}
                    </th>
                    <td className={`py-5 px-6 text-charcoal ${getFontClass()}`}>
                      {language === "ja" ? (
                        <>
                          〒108-0074 東京都港区高輪2-19-20<br />
                          〒104-0045 東京都中央区築地2-12-14
                        </>
                      ) : language === "zh" ? (
                        <>
                          〒108-0074 东京都港区高�的2-19-20<br />
                          〒104-0045 东京都中央区筑地2-12-14
                        </>
                      ) : (
                        <>
                          2-19-20 Takanawa, Minato-ku, Tokyo 108-0074<br />
                          2-12-14 Tsukiji, Chuo-ku, Tokyo 104-0045
                        </>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th className={`text-left py-5 px-6 bg-gray-50 text-navy font-medium ${getFontClass()}`}>
                      {language === "ja" ? "グループ本社" : language === "zh" ? "集团总部" : "Group HQ"}
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
              <Link href={`${basePath}/contact`}>
                <Button className={`bg-gold hover:bg-gold-dark text-navy px-8 py-6 text-sm tracking-wider font-medium ${getFontClass()}`}>
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
