import type { ComponentType } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import {
  buyerIntentPages,
  type BuyerIntentLanguage,
  type BuyerIntentPageKey,
} from "@shared/buyerIntentPages";

interface BuyerIntentServicePageProps {
  profileKey: BuyerIntentPageKey;
  language: BuyerIntentLanguage;
  Header: ComponentType;
  Footer: ComponentType;
}

export default function BuyerIntentServicePage({
  profileKey,
  language,
  Header,
  Footer,
}: BuyerIntentServicePageProps) {
  const profile = buyerIntentPages[profileKey];
  const copy = profile.copy[language];
  const basePath = `/${profile.region}/${language}`;
  const canonical = `https://www.tengcle.com${basePath}${profile.suffix}/`;
  const headingFont =
    language === "en"
      ? "font-heading"
      : language === "ja"
        ? "font-jp"
        : "font-zh";
  const bodyFont =
    language === "en" ? "font-body" : language === "ja" ? "font-jp" : "font-zh";
  const locale =
    profile.region === "jp"
      ? language === "ja"
        ? "ja_JP"
        : language === "zh"
          ? "zh_CN"
          : "en_JP"
      : language === "ja"
        ? "ja_HK"
        : language === "zh"
          ? "zh_HK"
          : "en_HK";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: copy.h1,
        description: copy.lead,
        provider: {
          "@type": "Organization",
          "@id": `${profile.entityUrl}#organization`,
          name: profile.provider,
          url: profile.entityUrl,
        },
        areaServed: profile.areaServed.map(name => ({
          "@type": "Place",
          name,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        mainEntity: copy.faqs.map(faq => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <div
      className={`min-h-screen bg-white ${bodyFont}`}
      data-region={profile.region}
    >
      <SEOHead
        title={copy.title}
        description={copy.description}
        canonical={canonical}
        locale={locale}
        ogImage="/images/og-image.webp"
        structuredData={structuredData}
      />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="bg-navy pt-32 pb-20 text-white">
          <div className="container max-w-5xl">
            <p className="mb-5 text-sm uppercase tracking-[0.22em] text-gold">
              {copy.eyebrow}
            </p>
            <h1
              className={`${headingFont} max-w-4xl text-4xl leading-tight md:text-6xl`}
            >
              {copy.h1}
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-gray-200 md:text-xl">
              {copy.lead}
            </p>
            <Link
              href={`${basePath}/contact`}
              className="mt-10 inline-flex items-center gap-2 bg-gold px-6 py-4 font-medium text-navy transition-colors hover:bg-gold-dark"
            >
              {copy.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="py-20">
          <div className="container grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className={`${headingFont} text-3xl text-navy`}>
                {copy.audienceTitle}
              </h2>
              <ul className="mt-8 space-y-5">
                {copy.audience.map(item => (
                  <li key={item} className="flex items-start gap-3 text-slate">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-gold-dark" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg bg-light-gray p-8">
              <h2 className={`${headingFont} text-3xl text-navy`}>
                {copy.scopeTitle}
              </h2>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {copy.scope.map(item => (
                  <li
                    key={item}
                    className="rounded-md bg-white p-5 text-charcoal shadow-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-light-gray py-20">
          <div className="container max-w-5xl">
            <h2 className={`${headingFont} text-center text-3xl text-navy`}>
              {copy.processTitle}
            </h2>
            <ol className="mt-10 grid gap-6 md:grid-cols-3">
              {copy.process.map((item, index) => (
                <li key={item} className="bg-white p-7 shadow-sm">
                  <span className="text-sm font-semibold text-gold-dark">
                    0{index + 1}
                  </span>
                  <p className="mt-4 leading-relaxed text-slate">{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-20">
          <div className="container max-w-4xl">
            <h2 className={`${headingFont} text-3xl text-navy`}>
              {copy.faqTitle}
            </h2>
            <div className="mt-8 divide-y divide-gray-200 border-y border-gray-200">
              {copy.faqs.map(faq => (
                <details key={faq.question} className="group py-6">
                  <summary className="cursor-pointer list-none pr-8 font-medium text-navy">
                    {faq.question}
                  </summary>
                  <p className="mt-4 max-w-3xl leading-relaxed text-slate">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy py-20 text-center text-white">
          <div className="container max-w-3xl">
            <h2 className={`${headingFont} text-3xl`}>{copy.ctaTitle}</h2>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-gray-300">
              {copy.ctaDescription}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={`${basePath}/contact`}
                className="inline-flex items-center gap-2 bg-gold px-6 py-4 font-medium text-navy hover:bg-gold-dark"
              >
                {copy.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`${basePath}/services`}
                className="px-6 py-4 text-gray-200 underline-offset-4 hover:underline"
              >
                {copy.backLabel}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
