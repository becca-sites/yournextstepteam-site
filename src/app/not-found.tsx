import Link from "next/link";

export default function NotFound() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-32 text-center lg:px-8">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight md:text-5xl">
        That page is not here.
      </h1>
      <p className="mt-4 text-lg text-[color:var(--color-muted)]">
        It may have moved or been retired. Try the homepage, or get in touch
        and I&apos;ll point you in the right direction.
      </p>
      <div className="mt-9 flex justify-center gap-3">
        <Link href="/" className="btn-primary">Home</Link>
        <Link href="/contact" className="btn-ghost">Contact</Link>
      </div>
    </article>
  );
}
