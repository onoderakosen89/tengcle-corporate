import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { usBusinessCopy, usCopy, type UsLang } from "@/data/usBusinesses";

/**
 * Two compact cards linking to the Japan and Hong Kong group company sites.
 * Used on the US home page and the businesses page.
 */
export default function GroupCompanyCards({ language }: { language: UsLang }) {
  const copy = usBusinessCopy.group;
  const cards = [
    {
      key: "japan",
      href: `/jp/${language}`,
      name: usCopy(copy.japan.name, language),
      desc: usCopy(copy.japan.desc, language),
      alt: usCopy(copy.japan.alt, language),
      image: "/images/us/home/group-japan-480.webp",
      imageSrcSet:
        "/images/us/home/group-japan-480.webp 480w, /images/us/home/group-japan-960.webp 960w",
      width: 960,
      height: 540,
    },
    {
      key: "hongkong",
      href: `/hk/${language}`,
      name: usCopy(copy.hongkong.name, language),
      desc: usCopy(copy.hongkong.desc, language),
      alt: usCopy(copy.hongkong.alt, language),
      image: "/images/hongkong-night.webp",
      imageSrcSet: undefined,
      width: 612,
      height: 408,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {cards.map(card => (
        <motion.div
          key={card.key}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href={card.href}
            className="group flex h-full bg-white border border-gray-100 overflow-hidden us-card-hover"
            data-testid={`group-card-${card.key}`}
          >
            <div className="w-28 sm:w-36 flex-shrink-0 overflow-hidden">
              <img
                src={card.image}
                srcSet={card.imageSrcSet}
                sizes="144px"
                alt={card.alt}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={card.width}
                height={card.height}
              />
            </div>
            <div className="p-5 flex flex-col">
              <h3 className="font-heading text-lg text-charcoal mb-2">
                {card.name}
              </h3>
              <p className="text-slate text-sm mb-3">{card.desc}</p>
              <span className="mt-auto inline-flex items-center gap-1 text-purple text-sm">
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
