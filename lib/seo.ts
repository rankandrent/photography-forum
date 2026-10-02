import type { Metadata } from "next";
import { home } from "@/content/home";
import { SITE, absoluteUrl } from "./site";
import type { Faq, Step } from "./types";

export function pageMetadata({
  title,
  description,
  path,
  noindex,
  type = "website",
  image = "/og/home.png",
  keywords,
  published,
  modified,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  type?: "website" | "article";
  /** Path of the share image, e.g. /og/services/ux-design.png */
  image?: string;
  /** Focus keyword first, then close variants (meta keywords) */
  keywords?: string[];
  /** Article dates, YYYY-MM-DD */
  published?: string;
  modified?: string;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title: { absolute: title },
    description,
    ...(keywords?.length && { keywords: [...new Set(keywords.map((k) => k.trim()).filter(Boolean))] }),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: SITE.name,
      locale: "en_US",
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: title, type: "image/png" }],
      ...(type === "article" && published && { publishedTime: published, modifiedTime: modified ?? published }),
    },
    twitter: { card: "summary_large_image", title, description, images: [absoluteUrl(image)] },
    robots: noindex
      ? { index: false, follow: true, googleBot: { index: false, follow: true } }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
        },
  };
}

const ORG_ID = `${SITE.url}/#organization`;

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE.name,
      url: `${SITE.url}/`,
      description: SITE.description,
      foundingDate: String(SITE.founded),
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.street,
        addressLocality: SITE.address.city,
        addressRegion: SITE.address.region,
        postalCode: SITE.address.postalCode,
        addressCountry: SITE.address.country,
      },
      areaServed: { "@type": "Country", name: "United States" },
      logo: absoluteUrl("/icon.svg"),
      image: absoluteUrl("/og/home.png"),
      ...(SITE.sameAs.length && { sameAs: SITE.sameAs }),
      ...(SITE.email && { email: SITE.email }),
      telephone: SITE.phone,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: SITE.phone,
        email: SITE.email,
        areaServed: "US",
        availableLanguage: ["English"],
      },
    },
    ...home.team.items.map((t) => ({
      "@type": "Person",
      "@id": `${SITE.url}/#${t.name.toLowerCase().replace(/\s+/g, "-")}`,
      name: t.name,
      ...(t.role && { jobTitle: t.role }),
      image: absoluteUrl(t.photo),
      sameAs: [t.linkedin],
      worksFor: { "@id": ORG_ID },
    })),
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: `${SITE.url}/`,
      name: "UI UX Design Services",
      alternateName: [SITE.name, "uiux design"],
      publisher: { "@id": ORG_ID },
      inLanguage: "en-US",
    },
  ],
});

export const webPageLd = (p: {
  name: string;
  description: string;
  path: string;
  about: string;
  mentions?: string[];
  updated?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${absoluteUrl(p.path)}#webpage`,
  url: absoluteUrl(p.path),
  name: p.name,
  description: p.description,
  isPartOf: { "@id": `${SITE.url}/#website` },
  about: { "@type": "Thing", name: p.about },
  ...(p.mentions?.length && { mentions: p.mentions.map((m) => ({ "@type": "Thing", name: m })) }),
  ...(p.updated && { dateModified: p.updated }),
  inLanguage: "en-US",
});

export const serviceLd = (
  name: string,
  description: string,
  path: string,
  offers: string[] = [],
  priceRange?: string,
  area: Record<string, unknown> = { "@type": "Country", name: "United States" },
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  serviceType: name,
  description,
  url: absoluteUrl(path),
  provider: { "@id": ORG_ID },
  areaServed: area,
  ...(priceRange && {
    offers: { "@type": "Offer", priceCurrency: "USD", description: priceRange, url: absoluteUrl(path) },
  }),
  ...(offers.length && {
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name,
      itemListElement: offers.map((o) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: o } })),
    },
  }),
});

const stripTags = (s: string) => s.replace(/<[^>]+>/g, "");

export const faqLd = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: stripTags(f.a) },
  })),
});

export const howToLd = (name: string, steps: Step[]) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name,
  step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: stripTags(s.body) })),
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});

export const articleLd = (a: {
  title: string;
  description: string;
  path: string;
  date: string;
  author: string;
  image: string;
  type?: "Article" | "BlogPosting";
  keywords?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": a.type ?? "Article",
  ...(a.keywords?.length && { keywords: a.keywords.join(", ") }),
  headline: a.title,
  description: a.description,
  image: absoluteUrl(a.image),
  datePublished: a.date,
  dateModified: a.date,
  author: { "@type": "Person", name: a.author },
  publisher: { "@id": ORG_ID },
  mainEntityOfPage: absoluteUrl(a.path),
});

/** Hub pages: CollectionPage whose main entity is the ItemList of linked pages */
export const collectionLd = (p: { name: string; description: string; path: string; items: { name: string; path: string }[] }) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${absoluteUrl(p.path)}#webpage`,
  url: absoluteUrl(p.path),
  name: p.name,
  description: p.description,
  isPartOf: { "@id": `${SITE.url}/#website` },
  inLanguage: "en-US",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: p.items.length,
    itemListElement: p.items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absoluteUrl(it.path) })),
  },
});

/** Typed page node, e.g. ContactPage or AboutPage */
export const pageLd = (type: "ContactPage" | "AboutPage" | "WebPage", p: { name: string; description: string; path: string }) => ({
  "@context": "https://schema.org",
  "@type": type,
  "@id": `${absoluteUrl(p.path)}#webpage`,
  url: absoluteUrl(p.path),
  name: p.name,
  description: p.description,
  isPartOf: { "@id": `${SITE.url}/#website` },
  ...(type !== "WebPage" && { about: { "@id": ORG_ID } }),
  inLanguage: "en-US",
});
