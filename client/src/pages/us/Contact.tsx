import { motion } from "framer-motion";
import { toast } from "sonner";
import { useLocation, Link } from "wouter";
import { Mail, MapPin, Phone, Globe } from "lucide-react";
import UsHeader from "@/components/us/Header";
import UsFooter from "@/components/us/Footer";
import { useUsLanguage } from "@/contexts/UsLanguageContext";
import SEOHead, { generateLocalBusinessSchema } from "@/components/SEOHead";
import { companyProfiles } from "@/data/companyProfiles";

const usCompany = companyProfiles.us;
const usAddress = usCompany.addresses[0];

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
      title: "Website",
      content: ["tengcle.com/us"],
      href: "https://www.tengcle.com/us/en",
    },
  ];

  return (
    <div className="min-h-screen bg-white" data-region="us">
      <SEOHead
        title={language === "ja" ? "お問い合わせ | Tengcle Development LLC NJ" : language === "zh" ? "联系我们 | Tengcle Development LLC NJ" : "Contact Us | Tengcle Development LLC New Jersey"}
        description={language === "ja" ? "Tengcle Development LLCへのお問い合わせ。NJ・Weehawkenオフィス。不動産開発・管理のご相談。" : language === "zh" ? "联系Tengcle Development LLC。新泽西Weehawken办公室。房地产开发、管理咨询。" : "Contact Tengcle Development LLC. Weehawken NJ office. Real estate development & management inquiries."}
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

              {/* Group Offices */}
              <motion.div variants={fadeInUp} className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="font-heading text-lg text-charcoal mb-4">
                  Tengcle Group Offices
                </h3>
                <div className="space-y-4">
                  <Link
                    href="/hk/en/contact"
                    className="flex items-center gap-3 text-slate hover:text-gold transition-colors"
                  >
                    <span>🇭🇰</span>
                    <span>Hong Kong (Global Headquarters)</span>
                  </Link>
                  <Link
                    href="/jp/ja/contact"
                    className="flex items-center gap-3 text-slate hover:text-gold transition-colors"
                  >
                    <span>🇯🇵</span>
                    <span>Japan Office</span>
                  </Link>
                </div>
              </motion.div>
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
                  src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80"
                  alt="New York City Skyline"
                  className="w-full aspect-[4/3] object-cover mb-6"
                  loading="lazy"
                />
                <div className="text-center">
                  <p className="text-charcoal font-medium mb-2">Weehawken, New Jersey</p>
                  <p className="text-slate text-sm">
                    Located across the Hudson River from Manhattan, with stunning views of the New York City skyline.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <UsFooter />
    </div>
  );
}
