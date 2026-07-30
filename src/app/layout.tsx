import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/site.config";
import { tenant } from "@/config/tenant";
import { isNoIndex } from "@/lib/placeholder";
import { LocalBusinessSchema } from "@/components/schema/LocalBusinessSchema";
import { Analytics } from "@/components/telemetry/Analytics";
import { Header } from "@/components/global/Header";
import { Footer } from "@/components/global/Footer";
import { DemoRibbon } from "@/components/global/DemoRibbon";
import "./globals.css";

/*
 * Azo Sans, self-hosted.
 *
 * Files live in public/fonts and are served from Becca's own deployment, not a
 * CDN. next/font/local fingerprints them, emits the @font-face rules, and sizes
 * the fallback metrics so swapping from Arial to Azo does not shift the layout.
 *
 * The pack ships Thin, Light, Regular, Medium, Bold and Black with italics.
 * Only the five faces the design actually uses are shipped, keeping the payload
 * at roughly 92KB total across all weights, of which a page typically downloads
 * two or three. Thin and Light are deliberately left out: hairline weights are
 * the wrong call for readers with ageing eyesight.
 *
 * There is no SemiBold in the pack. globals.css remaps font-semibold to the real
 * Bold at 700 rather than letting the browser synthesise one.
 */
const azoSans = localFont({
  src: [
    { path: "../../public/fonts/AzoSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/AzoSans-Italic.woff2", weight: "400", style: "italic" },
    { path: "../../public/fonts/AzoSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/AzoSans-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/AzoSans-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-azo",
  display: "swap",
  preload: true,
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
  adjustFontFallback: "Arial",
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
  robots: isNoIndex()
    ? {
        index: false,
        follow: false,
        nocache: true,
        noarchive: true,
        nosnippet: true,
        noimageindex: true,
        googleBot: { index: false, follow: false, noimageindex: true },
      }
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
    <html lang="en-US" className={azoSans.variable}>
      <head>
        {isNoIndex() && (
          <>
            <meta
              name="robots"
              content="noindex, nofollow, noarchive, nosnippet, noimageindex"
            />
            <meta
              name="googlebot"
              content="noindex, nofollow, noarchive, nosnippet, noimageindex"
            />
          </>
        )}
        {/*
          The FadeIn wrappers server-render with an inline opacity:0 and are only
          revealed once framer-motion's viewport observer fires. With JavaScript
          off, most of the page is blank. This reveals it. Worth doing on a site
          whose visitors skew older and are more likely to be behind restrictive
          security software or a flaky connection.
        */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <LocalBusinessSchema />
      </head>
      <body className="min-h-screen antialiased">
        {/*
          Skip link. Sits above the sticky header (z-40) when focused. Ink on
          sunshine reads at 9.4:1 and matches the site's primary button, so it
          looks like part of the design rather than a browser artefact.
        */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:inline-flex focus:min-h-[48px] focus:items-center focus:rounded-full focus:bg-[var(--color-sunshine)] focus:px-6 focus:py-3 focus:text-base focus:font-bold focus:text-[var(--color-ink)] focus:shadow-lg focus:outline-3 focus:outline-offset-2 focus:outline-[var(--color-ink)]"
        >
          Skip to main content
        </a>
        <DemoRibbon />
        <Header />
        {/*
          tabIndex={-1} so the skip link actually moves keyboard focus here.
          Without it Safari and Firefox scroll the page but leave focus behind,
          and the next Tab returns to the header.
        */}
        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
