import { motion } from "framer-motion";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { Mail, MapPin, Globe, ExternalLink } from "lucide-react";
import UsHeader from "@/components/us/Header";
import UsFooter from "@/components/us/Footer";
import { useUsLanguage } from "@/contexts/UsLanguageContext";
import SEOHead, { generateLocalBusinessSchema } from "@/components/SEOHead";
import GroupCompanyCards from "@/components/us/GroupCompanyCards";
import { companyProfiles, publicContactEmails } from "@/data/companyProfiles";
import { PIPETECTOR_URL, usBusinessCopy, usCopy } from "@/data/usBusinesses";

const usCompany = companyProfiles.us;
const usAddress = usCompany.addresses[0];
const usEmail = publicContactEmails.general.us;

const inquiryCopy = {
  heading: { en: "How can we help?", ja: "ご用件", zh: "咨询事项" },
  resident: {
    name: {
      en: "If you live in one of our buildings",
      ja: "当社が管理する建物にお住まいの方",
      zh: "本公司管理物业的住户",
    },
    desc: {
      en: 'Please email us with "Resident" in the subject line.',
      ja: "メールでご連絡ください。件名に「入居者」とご記入ください。",
      zh: "请发送邮件联系我们，并在主题中注明“住户”。",
    },
    button: {
      en: "Email us (subject: Resident)",
      ja: "メールを送る（件名「入居者」入り）",
      zh: "发送邮件（主题：“住户”）",
    },
    subject: { en: "Resident", ja: "入居者", zh: "住户" },
  },
  pilot: {
    name: {
      en: "NMR Pipetector pilot trials",
      ja: "配管の先行試験（NMR Pipetector）",
      zh: "NMR Pipetector 试点测试",
    },
    // The linked word is `link`; the text is split around it.
    before: {
      en: "Visit the pilot page for participation details and how to apply. For questions, please ",
      ja: "試験の条件と申し込みは、専用ページ（英語）をご覧ください。ご質問は",
      zh: "试点测试的参与条件和申请方式请见专用页面（英文）。如有疑问，请通过",
    },
    link: { en: "email us", ja: "メール", zh: "邮件" },
    after: {
      en: ".",
      ja: "でご連絡ください。",
      zh: "联系我们。",
    },
    button: {
      en: "View pilot details and apply",
      ja: "試験の詳細・申し込み（英語）",
      zh: "查看试点测试详情及申请方式（英文）",
    },
  },
  other: {
    name: {
      en: "Building management, revitalization and other inquiries",
      ja: "建物の管理・再生のご相談、そのほか",
      zh: "建筑再生与管理咨询及其他事项",
    },
    desc: {
      en: "Please email us.",
      ja: "メールでご連絡ください。",
      zh: "请发送邮件联系我们。",
    },
    button: { en: "Email us", ja: "メールを送る", zh: "发送邮件" },
  },
  website: { en: "Website", ja: "ウェブサイト", zh: "网站" },
  caption: {
    en: "In Weehawken, on the Hudson River across from Manhattan.",
    ja: "マンハッタンの対岸、ハドソン川沿いのウィーホーケンにあります。",
    zh: "位于哈德逊河畔的威霍肯，与曼哈顿隔河相望。",
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function UsContact() {
  const { language, t } = useUsLanguage();
  const [location] = useLocation();
  const basePath = `/us/${language}`;

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.address'),
      content: ["17 Hamilton Ave", "Weehawken, NJ 07086", "United States"],
    },
    {
      icon: Mail,
      title: t('contact.email'),
      content: ["us@tengcle.com"],
      href: "mailto:us@tengcle.com",
    },
    {
      icon: Globe,
      title: usCopy(inquiryCopy.website, language),
      content: ["tengcle.com/us"],
      href: "https://www.tengcle.com/us/en",
    },
  ];

  return (
    <div className="min-h-screen bg-white" data-region="us">
      <SEOHead
        title={language === "ja" ? "お問い合わせ | Tengcle Development LLC NJ" : language === "zh" ? "联系我们 | Tengcle Development LLC NJ" : "Contact Us | Tengcle Development LLC New Jersey"}
        description={language === "ja" ? "Tengcle Development LLCへのお問い合わせ。不動産管理、修繕調整、物件再生のご相談。" : language === "zh" ? "联系Tengcle Development LLC，咨询物业管理、维修协调与物业改造。" : "Contact Tengcle Development LLC about property management, repair coordination, and property revitalization."}
        keywords={language === "ja" ? "Tengcle Development LLC, お問い合わせ, ニュージャージー, 不動産" : language === "zh" ? "Tengcle Development LLC, 联系我们, 新泽西, 房地产" : "Tengcle Development LLC, contact, New Jersey, Weehawken, real estate"}
        locale={language === "ja" ? "ja_JP" : language === "zh" ? "zh_CN" : "en_US"}
        ogImage="/images/og-image.webp"
        canonical={`https://www.tengcle.com/us/${language}/contact`}
        structuredData={generateLocalBusinessSchema({
          name: usCompany.legalName,
          url: "https://www.tengcle.com/us",
          email: usCompany.email,
          address: {
            street: usAddress.street,
            city: usAddress.city,
            region: usAddress.region,
            postalCode: usAddress.postalCode,
            country: usAddress.country,
          },
          geo: {
            latitude: "40.7686",
            longitude: "-74.0224"
          },
          openingHours: ["Mo-Fr 09:00-17:00"]
        })}
      />
      <UsHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-purple-deep overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 pattern-seigaiha" />
        </div>
        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.p
              variants={fadeInUp}
              className="text-gold text-sm tracking-widest uppercase mb-4"
            >
              Tengcle Development LLC
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-heading text-4xl md:text-5xl text-white mb-6"
            >
              {t('contact.title')}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-300">
              {t('contact.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Inquiry guide */}
      <section className="py-20 bg-light-gray" data-testid="contact-inquiries">
        <div className="container">
          <h2 className="font-heading text-3xl md:text-4xl text-charcoal text-center mb-12">
            {usCopy(inquiryCopy.heading, language)}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                key: "resident",
                name: usCopy(inquiryCopy.resident.name, language),
                desc: <>{usCopy(inquiryCopy.resident.desc, language)}</>,
                button: usCopy(inquiryCopy.resident.button, language),
                href: `mailto:${usEmail}?subject=${encodeURIComponent(usCopy(inquiryCopy.resident.subject, language))}`,
                external: false,
              },
              {
                key: "pilot",
                name: usCopy(inquiryCopy.pilot.name, language),
                desc: (
                  <>
                    {usCopy(inquiryCopy.pilot.before, language)}
                    <a
                      href={`mailto:${usEmail}`}
                      className="text-purple underline hover:text-gold transition-colors"
                    >
                      {usCopy(inquiryCopy.pilot.link, language)}
                    </a>
                    {usCopy(inquiryCopy.pilot.after, language)}
                  </>
                ),
                button: usCopy(inquiryCopy.pilot.button, language),
                href: PIPETECTOR_URL,
                external: true,
              },
              {
                key: "other",
                name: usCopy(inquiryCopy.other.name, language),
                desc: <>{usCopy(inquiryCopy.other.desc, language)}</>,
                button: usCopy(inquiryCopy.other.button, language),
                href: `mailto:${usEmail}`,
                external: false,
              },
            ].map(box => (
              <div
                key={box.key}
                className="flex flex-col bg-white border border-gray-100 p-8"
                data-testid={`contact-inquiry-${box.key}`}
              >
                <h3 className="font-heading text-xl text-charcoal mb-3">{box.name}</h3>
                <p className="text-slate text-sm leading-relaxed mb-6">{box.desc}</p>
                <a
                  href={box.href}
                  {...(box.external ? { target: "_blank", rel: "noopener" } : {})}
                  className="mt-auto self-start inline-flex items-center gap-2 px-6 py-3 bg-gold text-purple-deep font-medium us-btn-hover"
                >
                  {box.external ? <ExternalLink className="w-4 h-4" aria-hidden="true" /> : <Mail className="w-4 h-4" aria-hidden="true" />}
                  {box.button}
                  {box.external && (
                    <span className="sr-only">
                      {usCopy(usBusinessCopy.nav.externalNote, language)}
                    </span>
                  )}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={fadeInUp}
                className="font-heading text-3xl text-charcoal mb-8"
              >
                {t('company.name')}
              </motion.h2>

              <div className="space-y-8">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-medium text-charcoal mb-2">{item.title}</h3>
                      {item.href ? (
                        item.href.startsWith("mailto:") ? (
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(item.content[0]);
                              toast.success("Email copied to clipboard");
                            }}
                            className="text-slate hover:text-gold transition-colors text-left"
                            title="Click to copy email"
                          >
                            {item.content.join(", ")}
                          </button>
                        ) : (
                          <a
                            href={item.href}
                            className="text-slate hover:text-gold transition-colors"
                          >
                            {item.content.join(", ")}
                          </a>
                        )
                      ) : (
                        item.content.map((line, idx) => (
                          <p key={idx} className="text-slate">{line}</p>
                        ))
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Map or Image */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-light-gray p-8 h-full">
                <img
                  src="/images/us/company-skyline.webp"
                  alt="New York City Skyline"
                  className="w-full aspect-[4/3] object-cover mb-6"
                  loading="lazy"
                />
                <div className="text-center">
                  <p className="text-charcoal font-medium mb-2">Weehawken, New Jersey</p>
                  <p className="text-slate text-sm">
                    {usCopy(inquiryCopy.caption, language)}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Group companies */}
      <section className="pb-24">
        <div className="container">
          <h2 className="font-heading text-3xl md:text-4xl text-charcoal text-center mb-12">
            {usCopy(usBusinessCopy.group.title, language)}
          </h2>
          <GroupCompanyCards language={language} />
        </div>
      </section>

      <UsFooter />
    </div>
  );
}
