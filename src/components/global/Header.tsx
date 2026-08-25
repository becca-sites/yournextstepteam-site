"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { tenant } from "@/config/tenant";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/buyers", label: "Buyers" },
  { href: "/sellers", label: "Sellers" },
  { href: "/neighborhoods", label: "Neighborhoods" },
  { href: "/about", label: "About Becca" },
];

/**
 * Home is exact-match only. Every other item also lights up on its children,
 * so /neighborhoods/tacoma keeps Neighborhoods marked as the current page.
 */
function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

/**
 * Compact version of .btn-primary for the header. The global class is sized for
 * in-page CTAs (48px tall) and cannot be trimmed with utilities, since it is
 * declared outside any @layer and so outranks them.
 */
const CTA_CLASS =
  "inline-flex items-center justify-center rounded-lg bg-[var(--color-sunshine)] px-4 py-2 text-sm font-bold text-[var(--color-ink)] transition hover:bg-[var(--color-sunshine-deep)]";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 lg:px-8">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/"
            aria-label={`${tenant.brand.name} home`}
            className="flex items-center py-1"
          >
            {/* Intrinsic size is the file's own 640x312 so next/image reserves
                the right box; the height class is what actually sizes it. */}
            <Image
              src={tenant.brand.logo}
              alt=""
              width={tenant.brand.logoWidth}
              height={tenant.brand.logoHeight}
              priority
              // Fixed display size, so pin `sizes`. Without it next/image has no
              // width to reason about and requests its largest candidate.
              sizes="80px"
              className="h-8 w-auto md:h-9"
            />
          </Link>

          {/*
            Brokerage identification, above the fold on every page, which is
            what eXp's policy asks for. It is stacked over two lines at 10px so
            the whole block clears roughly 26px, comfortably under the 32px
            logo beside it: eXp requires the agent's own branding to be at
            least as large as the brokered-by line, never smaller.

            It is not the eXp logo and does not try to look like one. eXp's
            guidelines forbid recreating or typesetting the mark, so this is a
            plain identification line in the site's own type.
          */}
          <span className="whitespace-nowrap border-l border-black/10 pl-2.5 text-[9px] font-medium uppercase leading-[1.35] tracking-[0.1em] text-[var(--color-ink-soft)] sm:pl-3 sm:text-[10px] sm:tracking-[0.12em]">
            Brokered by
            <span className="block font-bold tracking-[0.06em] text-[var(--color-ink)]">
              {tenant.agent.brokerage}
            </span>
          </span>
        </div>

        {/* ml-auto absorbs the free space to the nav's left, so the links sit
            flush against the Contact button instead of centering in the bar.
            The mobile menu below is a separate stacked layout and unaffected. */}
        <nav aria-label="Primary" className="hidden lg:block lg:ml-auto">
          <ul className="flex items-center gap-1 text-sm font-medium">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={
                      active
                        ? "inline-flex items-center rounded-full bg-[var(--color-surface)] px-3 py-2 text-[var(--color-ink)] transition"
                        : "inline-flex items-center rounded-full px-3 py-2 text-neutral-700 transition hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]"
                    }
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact" className={`hidden sm:inline-flex ${CTA_CLASS}`}>
            Contact
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="lg:hidden -m-2.5 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2.5 text-neutral-950 transition hover:bg-neutral-100"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
              {open ? (
                <path d="M6.343 5.636l11.314 11.314-1.414 1.414L4.929 7.05zM4.929 16.95l11.314-11.314 1.414 1.414L6.343 18.364z" />
              ) : (
                <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="lg:hidden border-t border-neutral-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={
                        active
                          ? "block rounded-lg bg-[var(--color-surface)] px-4 py-3 text-base font-medium text-[var(--color-ink)]"
                          : "block rounded-lg px-4 py-3 text-base font-medium text-neutral-600 transition hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]"
                      }
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li className="mt-3">
                <Link
                  href="/contact"
                  className={`w-full min-h-[44px] text-center ${CTA_CLASS}`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
