"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { tenant } from "@/config/tenant";

const NAV_ITEMS = [
  { href: "/buyers", label: "Buyers" },
  { href: "/sellers", label: "Sellers" },
  { href: "/podcast", label: "Podcast" },
  { href: "/about", label: "About" },
  { href: "/listings", label: "Listings" },
  { href: "/contact", label: "Contact" },
];

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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-8">
        <Link href="/" aria-label="Your Next Step Home" className="flex items-center">
          <Image
            src={tenant.brand.logo}
            alt={tenant.agent.name}
            width={160}
            height={36}
            priority
          />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1 text-sm font-medium">
            {NAV_ITEMS.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={
                      active
                        ? "rounded-full bg-[var(--color-surface)] px-4 py-2 text-[var(--color-ink)] transition"
                        : "rounded-full px-4 py-2 text-neutral-600 transition hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]"
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
          <Link href="/contact" className="hidden sm:inline-flex btn-primary text-sm">
            Book a call
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="lg:hidden -m-2.5 rounded-md p-2.5 text-neutral-950 transition hover:bg-neutral-100"
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
          <div className="mx-auto max-w-7xl px-4 py-6">
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(item.href + "/");
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
              <li className="mt-4">
                <Link href="/contact" className="btn-primary w-full text-center">
                  Book a call
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
