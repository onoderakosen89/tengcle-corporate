/**
 * Contact Page - Clean White Professional Design
 * 
 * Simple contact information display
 * Email only (no form)
 */

import { useRef } from "react";
import { motion, useInView, type Variants, type Easing } from "framer-motion";
import { Mail, MapPin, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

export default function Contact() {
  const { t, language } = useLanguage();
  
  const getFontClass = () => {
    if (language === "ja") return "font-jp";
    if (language === "zh") return "font-zh";
    return "";
  };

  const getSerifFontClass = () => {
    if (language === "ja") return "font-jp-serif";
    if (language === "zh") return "font-zh";
    return "font-display";
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-light-gray">
        <div className="container">
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="max-w-3xl">
              <p className={`text-gold-dark text-sm tracking-[0.3em] uppercase mb-4 ${getFontClass()}`}>
                {t.contact.subtitle}
              </p>
              <h1 className={`${getSerifFontClass()} text-4xl md:text-5xl lg:text-6xl text-navy mb-6`}>
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
                <h2 className={`${getSerifFontClass()} text-2xl text-navy mb-4`}>
                  {t.contact.email}
                </h2>
                <a 
                  href="mailto:info@tengcle.com"
                  className="text-2xl md:text-3xl text-navy hover:text-gold transition-colors font-display"
                >
                  info@tengcle.com
                </a>
              </motion.div>
            </AnimatedSection>
            
            {/* Offices */}
            <AnimatedSection>
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <h2 className={`${getSerifFontClass()} text-3xl text-navy`}>
                  {language === "ja" ? "オフィス" : language === "zh" ? "办公室" : "Our Offices"}
                </h2>
              </motion.div>
            </AnimatedSection>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Hong Kong */}
              <AnimatedSection>
                <motion.div
                  variants={fadeInUp}
                  className="bg-white border border-gray-200 p-8 hover:border-gold/50 transition-all duration-300 h-full"
                >
                  <MapPin className="h-8 w-8 text-gold mb-4" />
                  <h3 className={`${getSerifFontClass()} text-xl text-navy mb-4`}>
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
                  <h3 className={`${getSerifFontClass()} text-xl text-navy mb-4`}>
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
                  <h3 className={`${getSerifFontClass()} text-xl text-navy mb-4`}>
                    {t.contact.info.jpOffice2}
                  </h3>
                  <p className="text-slate text-sm leading-relaxed">
                    {language === "ja" || language === "zh" 
                      ? "東京都中央区築地2-12-14" 
                      : "2-12-14 Tsukiji, Chuo-ku, Tokyo, Japan"}
                  </p>
                </motion.div>
              </AnimatedSection>
            </div>
            
            {/* Japan Link */}
            <AnimatedSection className="mt-12">
              <motion.div variants={fadeInUp} className="text-center">
                <a 
                  href="https://jp.tengcle.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-navy hover:text-gold transition-colors ${getFontClass()}`}
                >
                  <span>{t.footer.japan}</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
