"use client";

import Script from "next/script";

/**
 * Microsoft Clarity. Free heat maps and session replay. Lazy-loaded so it
 * has no effect on initial page render.
 */
export function ClarityLoader({ projectId }: { projectId: string }) {
  if (!projectId || projectId.includes("[")) return null;
  return (
    <Script
      id="ms-clarity"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${projectId}");
        `,
      }}
    />
  );
}
