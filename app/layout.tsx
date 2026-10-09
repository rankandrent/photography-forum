import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import { FloatingBar } from "@/components/layout/FloatingBar";
import Script from "next/script";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/ui/JsonLd";
import { anchorOf, getIndustries, servicesByCategory, locationCities } from "@/lib/content";
import { organizationLd } from "@/lib/seo";
import { SITE, cap, routes } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-manrope", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "UI UX Design Services", template: "%s" },
  description: SITE.description,
  applicationName: SITE.brand,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#020101", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const serviceGroups = servicesByCategory().map((g) => ({
    category: g.category,
    items: g.services.map((s) => ({ title: cap(anchorOf(s)), href: routes.service(s.slug) })),
  }));
  const industries = getIndustries().map((i) => ({ title: i.title, href: routes.industry(i.slug) }));
  const locations = locationCities().map((l) => ({ title: l.title, href: routes.location(l.slug) }));
  return (
    <html lang="en-US" className={`${manrope.variable} ${plexMono.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Header serviceGroups={serviceGroups} industries={industries} locations={locations} />
        <main id="main">{children}</main>
        <Footer />
        <FloatingBar />
        <JsonLd data={organizationLd()} />
        {/* Microsoft Clarity (heatmaps + session recordings), project yv4egi1bre */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${SITE.clarityId}");`}
        </Script>
      </body>
    </html>
  );
}
