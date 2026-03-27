/**
 * Contact Page - Clean White Professional Design
 * 
 * Simple contact information display
 * Email only (no form)
 */

import { useRef } from "react";
import { useLocation, Link } from "wouter";
import { motion, useInView, type Variants, type Easing } from "framer-motion";
import { Mail, MapPin, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

import { useLanguage } from "@/contexts/LanguageContext";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead, { generateLocalBusinessSchema } from "@/components/SEOHead";

const easeOut: Easing = [0.16, 1, 0.3, 1];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut }
  },
};



export default function Contact() {
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

  return (
    <div className="min-h-screen bg-white" data-region="hk">
      <SEOHead
        title={language === "ja" ? "お問い合わせ | Tengcle Limited 香港" : language === "zh" ? "联系我们 | Tengcle Limited 香港" : "Contact Us | Tengcle Limited Hong Kong"}
        description={language === "ja" ? "Tengcle Limitedへのお問い合わせ。香港・上環オフィス。ホテルFF&E、ITソリューションのご相談。" : language === "zh" ? "联系Tengcle Limited。香港上璐办公室。酒店FF&E、IT解决方案咨询。" : "Contact Tengcle Limited. Hong Kong Sheung Wan office. Hotel FF&E & IT solutions inquiries."}
        keywords={language === "ja" ? "Tengcle Limited, お問い合わせ, 香港, 上環, ホテルFF&E" : language === "zh" ? "Tengcle Limited, 联系我们, 香港, 上璯, 酒店FF&E" : "Tengcle Limited, contact, Hong Kong, Sheung Wan, hotel FF&E"}
        locale={language === "ja" ? "ja_JP" : language === "zh" ? "zh_CN" : "en_HK"}
        ogImage="/images/og-image-hk.jpg"
        canonical={`https://www.tengcle.com/hk/${language}/contact`}
        structuredData={generateLocalBusinessSchema({
          name: "Tengcle Limited",
          url: "https://www.tengcle.com",
          email: "info@tengcle.com",
          address: {
            street: "No. 5, 17/F, Strand 50, 50 Bonham Strand",
            city: "Sheung Wan",
            region: "Hong Kong",
            postalCode: "",
            country: "HK"
          },
          geo: {
            latitude: "22.2863",
            longitude: "114.1516"
          },
          openingHours: ["Mo-Fr 09:00-18:00"]
        })}
      />
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-light-gray">
        <div className="container">
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="max-w-3xl">
              <p className={`text-gold-dark text-sm tracking-[0.3em] uppercase mb-4 ${getFontClass()}`}>
                {t.contact.subtitle}
              </p>
              <h1 className={`${getHeadingFontClass()} text-4xl md:text-5xl lg:text-6xl text-navy mb-6`}>
                {t.contact.title}
              </h1>
              <p className={`text-slate text-lg leading-relaxed ${getFontClass()}`}>
                {t.contact.description}
              </p>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Email */}
            <AnimatedSection className="mb-16">
              <motion.div
                variants={fadeInUp}
                className="bg-light-gray border border-gray-200 p-8 md:p-12 text-center"
              >
                <Mail className="h-12 w-12 text-gold mx-auto mb-6" />
                <h2 className={`${getHeadingFontClass()} text-2xl text-navy mb-4`}>
                  {t.contact.email}
                </h2>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("info@tengcle.com");
                    toast.success("Email copied / メールアドレスをコピーしました / 已复制邮箱地址");
                  }}
                  className="text-2xl md:text-3xl text-navy hover:text-gold transition-colors font-heading cursor-pointer"
                  title="Click to copy email"
                >
                  info@tengcle.com
                </button>
              </motion.div>
            </AnimatedSection>

            {/* Offices */}
            <AnimatedSection>
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <h2 className={`${getHeadingFontClass()} text-3xl text-navy`}>
                  {language === "ja" ? "オフィス" : language === "zh" ? "办公室" : "Our Offices"}
                </h2>
              </motion.div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Hong Kong */}
              <AnimatedSection>
                <motion.div
                  variants={fadeInUp}
                  className="bg-white border border-gray-200 p-8 hover:border-gold/50 transition-all duration-300 h-full"
                >
                  <MapPin className="h-8 w-8 text-gold mb-4" />
                  <h3 className={`${getHeadingFontClass()} text-xl text-navy mb-4`}>
                    {t.contact.info.hkOffice}
                  </h3>
                  <p className="text-slate text-sm leading-relaxed">
                    No. 5, 17/F, Strand 50<br />
                    50 Bonham Strand<br />
                    Sheung Wan, Hong Kong
                  </p>
                </motion.div>
              </AnimatedSection>

              {/* Tokyo Takanawa */}
              <AnimatedSection>
                <motion.div
                  variants={fadeInUp}
                  className="bg-white border border-gray-200 p-8 hover:border-gold/50 transition-all duration-300 h-full"
                >
                  <MapPin className="h-8 w-8 text-gold mb-4" />
                  <h3 className={`${getHeadingFontClass()} text-xl text-navy mb-4`}>
                    {t.contact.info.jpOffice1}
                  </h3>
                  <p className="text-slate text-sm leading-relaxed">
                    {language === "ja" || language === "zh"
                      ? "東京都港区高輪2-19-20"
                      : "2-19-20 Takanawa, Minato-ku, Tokyo, Japan"}
                  </p>
                </motion.div>
              </AnimatedSection>

              {/* Tokyo Tsukiji */}
              <AnimatedSection>
                <motion.div
                  variants={fadeInUp}
                  className="bg-white border border-gray-200 p-8 hover:border-gold/50 transition-all duration-300 h-full"
                >
                  <MapPin className="h-8 w-8 text-gold mb-4" />
                  <h3 className={`${getHeadingFontClass()} text-xl text-navy mb-4`}>
                    {t.contact.info.jpOffice2}
                  </h3>
                  <p className="text-slate text-sm leading-relaxed">
                    {language === "ja" || language === "zh"
                      ? "東京都中央区築地2-12-14"
                      : "2-12-14 Tsukiji, Chuo-ku, Tokyo, Japan"}
                  </p>
                </motion.div>
              </AnimatedSection>

              {/* USA Office */}
              <AnimatedSection>
                <motion.div
                  variants={fadeInUp}
                  className="bg-white border border-gray-200 p-8 hover:border-gold/50 transition-all duration-300 h-full relative"
                >
                  <div className="absolute top-4 right-4 bg-gold/10 text-gold text-xs px-2 py-1 rounded">
                    {language === "ja" ? "設立準備中" : language === "zh" ? "筹备中" : "Establishing"}
                  </div>
                  <MapPin className="h-8 w-8 text-gold mb-4" />
                  <h3 className={`${getHeadingFontClass()} text-xl text-navy mb-4`}>
                    {t.contact.info.usOffice}
                  </h3>
                  <p className="text-slate text-sm leading-relaxed">
                    17 Hamilton Ave<br />
                    Weehawken, NJ<br />
                    USA
                  </p>
                </motion.div>
              </AnimatedSection>
            </div>

            {/* Group Site Links */}
            <AnimatedSection className="mt-12">
              <motion.div variants={fadeInUp} className="text-center flex flex-wrap justify-center gap-6">
                <Link
                  href="/jp/ja"
                  className={`inline-flex items-center gap-2 text-navy hover:text-gold transition-colors ${getFontClass()}`}
                >
                  <span>{t.footer.japan}</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>
                <Link
                  href="/us/en"
                  className={`inline-flex items-center gap-2 text-navy hover:text-gold transition-colors ${getFontClass()}`}
                >
                  <span>{t.footer.usa}</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
