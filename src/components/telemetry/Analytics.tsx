import Script from "next/script";
import { resolveAnalytics } from "@/site.config";
import { ClarityLoader } from "./ClarityLoader";
import { MetaPixelLoader } from "./MetaPixelLoader";

/**
 * Sitewide telemetry. Everything here lazy-loads and uses `next/script`'s
 * `afterInteractive` or `lazyOnload` strategies so initial LCP is not gated
 * on third-party scripts.
 *
 * All IDs resolve from env vars at runtime so each deployment can override
 * without forking site.config.ts.
 */
export function Analytics() {
  const a = resolveAnalytics();

  return (
    <>
      {a.gtmContainerId && !a.gtmContainerId.includes("XXX") && (
        <>
          <Script
            id="gtm-loader"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${a.gtmContainerId}');
              `,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${a.gtmContainerId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        </>
      )}

      {a.ga4MeasurementId && !a.ga4MeasurementId.includes("XXX") && (
        <>
          <Script
            id="ga4-loader"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${a.ga4MeasurementId}`}
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${a.ga4MeasurementId}', { send_page_view: true });
              `,
            }}
          />
        </>
      )}

      <MetaPixelLoader pixelId={a.metaPixelId} />
      <ClarityLoader projectId={a.microsoftClarityProjectId} />
    </>
  );
}
