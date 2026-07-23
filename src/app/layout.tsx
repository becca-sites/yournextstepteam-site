import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import { siteConfig } from "@/site.config";
import { tenant } from "@/config/tenant";
import { isPlaceholderMode } from "@/lib/placeholder";
import { LocalBusinessSchema } from "@/components/schema/LocalBusinessSchema";
import { Analytics } from "@/components/telemetry/Analytics";
import { Header } from "@/components/global/Header";
import { Footer } from "@/components/global/Footer";
import { DemoRibbon } from "@/components/global/DemoRibbon";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading-var",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body-var",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
  title: {
    default: `${siteConfig.agentName} | ${tenant.market.city} ${siteConfig.agentTitle}`,
    template: `%s | ${siteConfig.agentName}`,
  },
  description: `${tenant.brand.tagline} ${tenant.market.primaryArea} representation across ${tenant.market.neighborhoods.slice(0, 4).join(", ")}.`,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.agentName,
    images: ["/images/hero/valley-landscape.jpg"],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: tenant.demo.noIndex || isPlaceholderMode()
    ? { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } }
    : { index: true, follow: true },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.brandColors.primary,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${inter.variable}`}>
      <head>
        {(tenant.demo.noIndex || isPlaceholderMode()) && (
          <meta name="robots" content="noindex, nofollow" />
        )}
        <LocalBusinessSchema />
      </head>
      <body className="min-h-screen antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow"
        >
          Skip to main content
        </a>
        <DemoRibbon />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
