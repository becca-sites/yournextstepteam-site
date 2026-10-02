import Link from "next/link";
import Image from "next/image";
import { tenant } from "@/config/tenant";

export function FinalCtaBlock({
  heading = "Every home has a story. Ready to write yours?",
  subhead = "Fifteen minutes on the phone and you will know what your next step actually is. No presentation, no pressure, nothing to sign.",
}: {
  heading?: string;
  subhead?: string;
} = {}) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-primary)] text-white">
      <Image
        src={tenant.media.heroTertiary}
        alt=""
        fill
        aria-hidden="true"
        className="object-cover opacity-25"
      />
      <div className="section-y-lg relative mx-auto max-w-4xl px-4 text-center lg:px-8">
        <p className="eyebrow text-white/80">
          Pierce County, Washington
        </p>
        <h2 className="mt-4 font-display text-3xl md:text-5xl">
          {heading}
        </h2>
        <p className="mt-6 text-lg text-white/80">{subhead}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn-on-dark">
            Let&apos;s have a conversation
          </Link>
          <a href={`tel:${tenant.agent.phone}`} className="btn-ghost-on-dark">
            Call {tenant.agent.firstName}
          </a>
        </div>
      </div>
    </section>
  );
}
