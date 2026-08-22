/**
 * SEO Head Component
 * 
 * Manages dynamic meta tags and structured data for each page.
 * Uses document.head manipulation for client-side rendering.
 * Optimized for maximum SEO score and Google Sitelinks.
 */

import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  locale?: string;
  noindex?: boolean;
  structuredData?: object;
  keywords?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export default function SEOHead({
  title,
  description,
  canonical,
  ogImage = "/images/og-image.webp",
  ogType = "website",
  locale = "en_US",
  noindex = false,
  structuredData,
  keywords,
  author = "Tengcle Group",
  publishedTime,
  modifiedTime,
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper to update or create meta tag
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Update basic meta tags
    updateMeta("description", description);
    updateMeta("author", author);
    if (keywords) {
      updateMeta("keywords", keywords);
    }

    // Update Open Graph meta tags
    updateMeta("og:title", title, true);
    updateMeta("og:description", description, true);
    updateMeta("og:type", ogType, true);
    updateMeta("og:image", ogImage.startsWith("http") ? ogImage : `https://www.tengcle.com${ogImage}`, true);
    updateMeta("og:image:width", "1200", true);
    updateMeta("og:image:height", "630", true);
    updateMeta("og:locale", locale, true);
    updateMeta("og:site_name", "Tengcle Group", true);

    // Update Twitter Card meta tags
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", title);
    updateMeta("twitter:description", description);
    updateMeta("twitter:image", ogImage.startsWith("http") ? ogImage : `https://www.tengcle.com${ogImage}`);
    updateMeta("twitter:image:alt", title);

    // Article specific meta tags
    if (publishedTime) {
      updateMeta("article:published_time", publishedTime, true);
    }
    if (modifiedTime) {
      updateMeta("article:modified_time", modifiedTime, true);
    }

    // Update robots meta with enhanced directives
    if (noindex) {
      updateMeta("robots", "noindex, nofollow");
      updateMeta("googlebot", "noindex, nofollow");
    } else {
      updateMeta("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
      updateMeta("googlebot", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    }

    // Update canonical link. A noindex page must not publish a self-referencing canonical.
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (noindex) {
        link?.remove();
      } else if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
        link.setAttribute("href", canonical);
        updateMeta("og:url", canonical, true);
      } else {
        link.setAttribute("href", canonical);
        updateMeta("og:url", canonical, true);
      }
    }

    // Add structured data
    if (structuredData) {
      const existingScript = document.querySelector('script[data-seo-structured]');
      if (existingScript) {
        existingScript.remove();
      }
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-structured", "true");
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      const seoScript = document.querySelector('script[data-seo-structured]');
      if (seoScript) {
        seoScript.remove();
      }
    };
  }, [title, description, canonical, ogImage, ogType, locale, noindex, structuredData, keywords, author, publishedTime, modifiedTime]);

  return null;
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

/**
 * Generate FAQPage structured data
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

/**
 * Generate Service structured data
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  provider: string;
  areaServed?: string[];
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": service.provider,
    },
    ...(service.areaServed && {
      "areaServed": service.areaServed.map((area) => ({
        "@type": "Place",
        "name": area,
      })),
    }),
    ...(service.image && { "image": service.image }),
  };
}

/**
 * Generate WebPage structured data with SiteNavigationElement for Sitelinks
 */
export function generateWebPageSchema(page: {
  name: string;
  description: string;
  url: string;
  breadcrumbs?: { name: string; url: string }[];
  navigation?: { name: string; url: string; description?: string }[];
}) {
  const schema: any = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${page.url}#webpage`,
        "url": page.url,
        "name": page.name,
        "description": page.description,
        "isPartOf": {
          "@id": "https://www.tengcle.com/#website"
        },
        "about": {
          "@id": "https://www.tengcle.com/#organization"
        },
        "inLanguage": "en"
      }
    ]
  };

  // Add breadcrumbs if provided
  if (page.breadcrumbs && page.breadcrumbs.length > 0) {
    schema["@graph"].push({
      "@type": "BreadcrumbList",
      "@id": `${page.url}#breadcrumb`,
      "itemListElement": page.breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    });
  }

  // Add navigation for sitelinks
  if (page.navigation && page.navigation.length > 0) {
    schema["@graph"].push({
      "@type": "SiteNavigationElement",
      "@id": `${page.url}#navigation`,
      "name": "Page Navigation",
      "hasPart": page.navigation.map(nav => ({
        "@type": "SiteNavigationElement",
        "name": nav.name,
        "url": nav.url,
        ...(nav.description && { "description": nav.description })
      }))
    });
  }

  return schema;
}

/**
 * Generate Organization structured data
 */
export function generateOrganizationSchema(org: {
  name: string;
  description: string;
  url: string;
  logo?: string;
  email?: string;
  address?: {
    street: string;
    city: string;
    region: string;
    country: string;
    postalCode?: string;
  };
  sameAs?: string[];
  foundingDate?: string;
  founders?: { name: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": org.name,
    "description": org.description,
    "url": org.url,
    ...(org.logo && {
      "logo": {
        "@type": "ImageObject",
        "url": org.logo
      }
    }),
    ...(org.email && { "email": org.email }),
    ...(org.address && {
      "address": {
        "@type": "PostalAddress",
        "streetAddress": org.address.street,
        "addressLocality": org.address.city,
        "addressRegion": org.address.region,
        "addressCountry": org.address.country,
        ...(org.address.postalCode && { "postalCode": org.address.postalCode })
      }
    }),
    ...(org.sameAs && { "sameAs": org.sameAs }),
    ...(org.foundingDate && { "foundingDate": org.foundingDate }),
    ...(org.founders && {
      "founders": org.founders.map(f => ({
        "@type": "Person",
        "name": f.name
      }))
    })
  };
}

/**
 * Generate LocalBusiness structured data
 */
export function generateLocalBusinessSchema(business: {
  name: string;
  image?: string;
  telephone?: string;
  email?: string;
  url: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  geo?: {
    latitude: string;
    longitude: string;
  };
  openingHours?: string[];
  priceRange?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": business.name,
    ...(business.image && { "image": business.image }),
    "url": business.url,
    ...(business.telephone && { "telephone": business.telephone }),
    ...(business.email && { "email": business.email }),
    "address": {
      "@type": "PostalAddress",
      "streetAddress": business.address.street,
      "addressLocality": business.address.city,
      "addressRegion": business.address.region,
      "postalCode": business.address.postalCode,
      "addressCountry": business.address.country
    },
    ...(business.geo && {
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": business.geo.latitude,
        "longitude": business.geo.longitude
      }
    }),
    ...(business.openingHours && { "openingHours": business.openingHours }),
    ...(business.priceRange && { "priceRange": business.priceRange })
  };
}
