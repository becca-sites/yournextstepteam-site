import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { tenant } from "@/config/tenant";
import { getAllPosts } from "@/lib/content";
import { BreadcrumbListSchema } from "@/components/schema/BreadcrumbListSchema";

export const metadata: Metadata = {
  title: "Blog",
  description: `Local market updates, neighborhood notes, and answers to questions buyers and sellers are asking across the ${tenant.market.primaryArea}.`,
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const fallback = tenant.media.aerial;

  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ]}
      />
      <section className="bg-[var(--color-surface)] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="eyebrow">From the blog</p>
          <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight md:text-6xl">
            Real stories, real lessons.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-[color:var(--color-muted)] md:text-xl">
            Hyperlocal market updates, prep playbooks, and the buyer and seller
            questions we are hearing every week across the {tenant.market.primaryArea}.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => {
              const img = post.heroImage ?? fallback[i % fallback.length];
              return (
                <li key={post.slug}>
                  <Link
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
                      <p className="text-xs uppercase tracking-widest text-[var(--color-secondary)]">
                        {post.publishedAt}
                        {post.category ? ` · ${post.category}` : ""}
                      </p>
                      <h2 className="mt-3 font-heading text-xl font-semibold leading-snug">
                        {post.title}
                      </h2>
                      <p className="mt-3 text-sm text-[color:var(--color-muted)]">
                        {post.summary}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
