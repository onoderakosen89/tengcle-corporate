/**
 * Contact Page - Contact Information
 * 
 * Design Philosophy:
 * - Clean white base with Navy & Gold accents
 * - Office locations and contact details
 * - Multi-language support (JA/EN/ZH)
 */

import { useRef } from "react";
import { motion, useInView, type Variants, type Easing } from "framer-motion";
import { Mail, MapPin, ExternalLink } from "lucide-react";
import Header from "@/components/jp/Header";
import { toast } from "sonner";

import Footer from "@/components/jp/Footer";
import { useJpLanguage } from "@/contexts/JpLanguageContext";
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
  const { t, language } = useJpLanguage();

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

  const offices = [
    {
      name: t.contact.info.tokyoOffice1,
      address: language === "ja"
        ? "〒108-0074\n東京都港区高輪2-19-20"
        : language === "zh"
          ? "〒108-0074\n东京都港区高轮2-19-20"
          : "2-19-20 Takanawa, Minato-ku\nTokyo 108-0074, Japan",
      mapUrl: "https://maps.app.goo.gl/1bGATAD26pQdv5BZ8",
    },
    {
      name: t.contact.info.tokyoOffice2,
      address: language === "ja"
        ? "〒104-0045\n東京都中央区築地2-12-14"
        : language === "zh"
          ? "〒104-0045\n东京都中央区筑地2-12-14"
          : "2-12-14 Tsukiji, Chuo-ku\nTokyo 104-0045, Japan",
      mapUrl: "https://maps.app.goo.gl/yAkTCAuyyN27xENx5",
    },
    {
      name: t.contact.info.hkOffice,
      address: "No. 5, 17/F, Strand 50\n50 Bonham Strand\nSheung Wan, Hong Kong",
      mapUrl: "https://maps.google.com/?q=50+Bonham+Strand+Sheung+Wan+Hong+Kong",
      isHQ: true,
    },
    {
      name: language === "ja" ? "アメリカオフィス" : language === "zh" ? "美国办公室" : "US Office",
      address: "17 Hamilton Ave\nWeehawken, NJ 07086\nUnited States",
      mapUrl: "https://maps.google.com/?q=17+Hamilton+Ave+Weehawken+NJ+07086",
    },
  ];

  return (
    <div className="min-h-screen bg-white" data-region="jp">
      <SEOHead
        title={t.contact.title + " | Tengcle Inc."}
        description={t.contact.description}
        canonical={`https://www.tengcle.com/jp/${language}/contact`}
        structuredData={generateLocalBusinessSchema({
          name: "Tengcle Inc.",
          url: "https://www.tengcle.com/jp",
          email: "info@tengcle.com",
          address: {
            street: "2-19-20 Takanawa",
            city: "Minato-ku",
            region: "Tokyo",
            postalCode: "108-0074",
            country: "JP"
          },
          geo: {
            latitude: "35.6324",
            longitude: "139.7366"
          },
          openingHours: ["Mo-Fr 09:30-18:30"]
        })}
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
              {t.contact.subtitle}
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className={`${getHeadingFontClass()} text-4xl md:text-5xl text-navy mb-6`}
            >
              {t.contact.title}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className={`text-slate max-w-2xl mx-auto ${getFontClass()}`}
            >
              {t.contact.description}
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      {/* Email Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <AnimatedSection className="text-center">
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-4 bg-light-gray px-8 py-6 rounded-lg"
            >
              <Mail className="h-8 w-8 text-gold" />
              <div className="text-left">
                <p className={`text-sm text-slate mb-1 ${getFontClass()}`}>{t.contact.email}</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("info@tengcle.com");
                    toast.success("メールアドレスをコピーしました / Email copied");
                  }}
                  className={`text-xl text-navy hover:text-gold transition-colors ${getHeadingFontClass()} cursor-pointer`}
                  title="クリックしてコピー / Click to copy"
                >
                  info@tengcle.com
                </button>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Offices Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office) => (
              <AnimatedSection key={office.name}>
                <motion.div
                  variants={fadeInUp}
                  className="bg-light-gray p-8 rounded-lg h-full"
                >
                  <MapPin className="h-8 w-8 text-gold mb-6" />
                  <h3 className={`${getHeadingFontClass()} text-xl text-navy mb-4 flex items-center gap-2`}>
                    {office.name}
                    {office.isHQ && (
                      <span className="text-xs bg-gold/20 text-gold-dark px-2 py-1 rounded">HQ</span>
                    )}
                  </h3>
                  <p className={`text-slate whitespace-pre-line mb-6 ${getFontClass()}`}>
                    {office.address}
                  </p>
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-navy hover:text-gold transition-colors text-sm flex items-center gap-2 ${getFontClass()}`}
                  >
                    {language === "ja" ? "Google Mapで見る" : language === "zh" ? "在Google地图中查看" : "View on Google Maps"}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-0">
        <div className="h-96 bg-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55415.8474323365!2d139.7193423820491!3d35.6604255788537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bad40cb61eb%3A0xb7e2811b057024ad!2z5pel5pys44CB44CSMTA4LTAwNzQg5p2x5Lqs6YO95riv5Yy66auY6Lyq77yS5LiB55uu77yR77yZ4oiS77yS77yQ!5e0!3m2!1sja!2smm!4v1766788226812!5m2!1sja!2smm"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
