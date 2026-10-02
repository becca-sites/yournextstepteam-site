import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { siteConfig, resolveSiteUrl } from "@/site.config";
import { tenant } from "@/config/tenant";
import { isNoIndex } from "@/lib/placeholder";
import { LocalBusinessSchema } from "@/components/schema/LocalBusinessSchema";
import { Analytics } from "@/components/telemetry/Analytics";
import { Header } from "@/components/global/Header";
import { Footer } from "@/components/global/Footer";
import "./globals.css";

/*
 * Type: the Deborah Rose pairing, self-hosted.
 *
 * Every file lives in public/fonts and is served from Becca's own deployment,
 * not a CDN. next/font/local fingerprints them, emits the @font-face rules, and
 * sizes a metric-matched fallback so the swap does not shift the layout.
 *
 * Geist carries body copy and every piece of interface. Four static faces, the
 * same four roles the old Azo Sans set covered: Regular, Italic, Medium and
 * SemiBold. Nothing lighter, because hairline weights are the wrong call for
 * readers with ageing eyesight, and nothing heavier, because 600 is as loud as
 * this site gets.
 *
 * Playfair Display is display type only, at 400, and only at 28px and up. It
 * is a high-contrast Didone: the hairlines that make it look expensive at 60px
 * are the same hairlines that break up at 16px for an older reader. globals.css
 * holds that line; this file only loads the one face it needs. Latin subset,
 * about 22KB.
 */
const geist = localFont({
  src: [
    { path: "../../public/fonts/Geist-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Geist-Italic.woff2", weight: "400", style: "italic" },
    { path: "../../public/fonts/Geist-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/Geist-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-geist",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

const playfair = localFont({
  src: [
    { path: "../../public/fonts/PlayfairDisplay-Regular-latin.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
  fallback: ["Iowan Old Style", "Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
});

/*
 * Azo Sans, kept for one section only: the closing crawl.
 *
 * The crawl is deliberately left exactly as it was built, typeface included,
 * so its five faces are still declared here. They are no longer preloaded,
 * since nothing above the fold uses them; the browser fetches them when the
 * crawl's text first needs them.
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
  preload: false,
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
  // Same resolver the sitemap, robots, llms.txt, and every JSON-LD @id use, so
  // canonical URLs cannot drift from the brand domain.
  metadataBase: new URL(resolveSiteUrl()),
  title: {
    // The brand leads and the agent qualifies it: the business is what people
    // search for, and Becca is who they get.
    default: `${tenant.brand.name} | ${tenant.market.city} ${siteConfig.agentTitle} ${siteConfig.agentName}`,
    template: `%s | ${tenant.brand.name}`,
  },
  description: `${tenant.brand.tagline} ${tenant.market.primaryArea} representation across ${tenant.market.neighborhoods.slice(0, 4).join(", ")}.`,
  applicationName: tenant.brand.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: tenant.brand.name,
    title: `${tenant.brand.name} | ${tenant.market.city} ${siteConfig.agentTitle} ${siteConfig.agentName}`,
    url: "/",
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
    <html
      lang="en-US"
      className={`${geist.variable} ${playfair.variable} ${azoSans.variable}`}
    >
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
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:inline-flex focus:min-h-[48px] focus:items-center focus:rounded-full focus:bg-[var(--color-sunshine)] focus:px-6 focus:py-3 focus:text-base focus:font-bold focus:text-ink focus:shadow-lg focus:outline-3 focus:outline-offset-2 focus:outline-[var(--color-ink)]"
        >
          Skip to main content
        </a>
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
