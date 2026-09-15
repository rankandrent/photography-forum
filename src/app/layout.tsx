import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeScript } from "@/components/ThemeScript";
import { JsonLd } from "@/components/JsonLd";
import { site, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "photography forum",
    "photo critique",
    "camera gear discussion",
    "lens reviews",
    "photo editing help",
    "photography community",
  ],
  alternates: {
    // Deliberately no `canonical` here. Next inherits it into every page that
    // does not set its own, so a root canonical of "/" made each of those —
    // including the not-found states — announce itself as a copy of the
    // homepage. The home page sets its own; pages that set none now emit none,
    // which is the correct default.
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    ...(site.twitter ? { site: site.twitter } : {}),
    title: site.name,
    description: site.description,
  },
  verification: {
    google: "QIAmsgbYQBb0Fcx_JCSvjQm7bjPI510GebVWDWdBw6s",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />

        {/* Google Analytics. Loaded via next/script after the page becomes
            interactive so it never blocks paint, and only in production so a
            local `next dev` session doesn't pollute the property. */}
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-Z6B9BPFDM1"
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-Z6B9BPFDM1');`}
            </Script>
          </>
        )}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: site.name,
            url: siteUrl(),
            description: site.description,
            potentialAction: {
              "@type": "SearchAction",
              target: `${siteUrl()}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }}
        />
      </body>
    </html>
  );
}
