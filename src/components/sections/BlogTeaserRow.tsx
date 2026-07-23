import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/content";
import { tenant } from "@/config/tenant";

export function BlogTeaserRow() {
  const posts = getAllPosts().slice(0, 3);
  if (!posts.length) return null;

  const fallback = tenant.media.aerial;

  return (
    <section className="surface-warm py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">From the blog</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold md:text-4xl">
              Real stories, real lessons from the {tenant.market.primaryArea}.
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-medium text-[var(--color-primary)] underline-offset-4 hover:underline"
          >
            All posts →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => {
            const img = (post as unknown as { heroImage?: string }).heroImage ?? fallback[i % fallback.length];
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-2xl border border-black/5 bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={img}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="px-6 py-6">
                  {post.category && (
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[color:var(--color-secondary)]">
                      {post.category}
                    </p>
                  )}
                  <h3 className="mt-3 font-heading text-xl font-semibold leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm text-[color:var(--color-muted)]">
                    {post.summary}
                  </p>
                  <p className="mt-5 text-xs uppercase tracking-widest text-[color:var(--color-muted)]">
                    {post.publishedAt}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
