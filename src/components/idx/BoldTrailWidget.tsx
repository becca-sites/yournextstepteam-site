"use client";

import { useEffect, useRef } from "react";
import { resolveIdx } from "@/site.config";

type Variant = "listings" | "listing-detail" | "search";

interface Props {
  variant: Variant;
  mlsId?: string;
}

/**
 * Bold Trail widget container.
 *
 * The exact embed contract varies by Bold Trail account. This component
 * provides a stable container and lazy-loads the widget script. Replace the
 * script-loading branch with the specific snippet your Bold Trail account
 * provides. The contract is intentionally not hardcoded.
 */
export function BoldTrailWidget({ variant, mlsId }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { widgetScriptUrl } = resolveIdx();
    if (!widgetScriptUrl || widgetScriptUrl.includes("[")) return;
    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-boldtrail="true"]`,
    );
    if (existing) return;
    const s = document.createElement("script");
    s.src = widgetScriptUrl;
    s.async = true;
    s.defer = true;
    s.dataset.boldtrail = "true";
    document.body.appendChild(s);
  }, []);

  return (
    <div
      ref={ref}
      data-boldtrail-variant={variant}
      data-mls-id={mlsId}
      className="min-h-[600px] rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-6"
    >
      <p className="text-sm text-neutral-600">
        Bold Trail {variant} widget loads here. Configure your widget script URL in
        <code className="ml-1 rounded bg-neutral-200 px-1">site.config.ts</code> or via the
        <code className="ml-1 rounded bg-neutral-200 px-1">NEXT_PUBLIC_BOLDTRAIL_WIDGET_URL</code>
        environment variable.
      </p>
    </div>
  );
}
