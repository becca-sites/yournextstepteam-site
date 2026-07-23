import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import { tenant } from "@/config/tenant";
import { ArticleSchema } from "@/components/schema/ArticleSchema";
import { BreadcrumbListSchema } from "@/components/schema/BreadcrumbListSchema";
import { FinalCtaBlock } from "@/components/sections/FinalCtaBlock";

interface Props {
  params: Promise<{ slug: string }>;
}

function readPost(slug: string) {
  const candidates = [
    path.join(process.cwd(), "content", "blog", `${slug}.mdx`),
    path.join(process.cwd(), "content", "blog", `${slug}.md`),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      const raw = fs.readFileSync(p, "utf8");
      const { content, data } = matter(raw);
      return { raw: content, data };
    }
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const file = readPost(slug);
  if (!file) return { title: "Post not found" };
  return {
    title: String(file.data.title ?? slug),
    description: String(file.data.summary ?? ""),
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const file = readPost(slug);
  if (!file) notFound();

  const { content } = await compileMDX({ source: file.raw, options: { parseFrontmatter: false } });
  const speakable = (file.data.speakable as string[] | undefined) ?? ["h1", "h2", ".speakable"];
  const heroImage =
    (file.data.heroImage as string | undefined) ??
    tenant.media.aerial[Math.abs(slug.length) % tenant.media.aerial.length];

  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: String(file.data.title ?? slug), url: `/blog/${slug}` },
        ]}
      />
      <ArticleSchema
        title={String(file.data.title ?? slug)}
        summary={String(file.data.summary ?? "")}
        published={String(file.data.publishedAt ?? "")}
        updated={String(file.data.updatedAt ?? file.data.publishedAt ?? "")}
        path={`/blog/${slug}`}
        speakable={speakable}
      />

      <section className="bg-[var(--color-surface)] pt-12 pb-8">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Link
            href="/blog"
            className="text-sm text-[color:var(--color-muted)] underline-offset-4 hover:underline"
          >
            ← All posts
          </Link>
          <p className="mt-6 text-[11px] uppercase tracking-widest text-[var(--color-secondary)]">
            {String(file.data.publishedAt ?? "")}
            {file.data.category ? ` · ${String(file.data.category)}` : ""}
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {String(file.data.title ?? slug)}
          </h1>
          {file.data.summary && (
            <p className="mt-4 text-lg text-[color:var(--color-muted)]">
              {String(file.data.summary)}
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto mt-8 max-w-5xl px-4 lg:px-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-neutral-100 shadow-md">
          <Image
            src={heroImage}
            alt={String(file.data.title ?? "")}
            fill
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
        <div className="prose prose-neutral max-w-none text-base leading-relaxed">
          {content}
        </div>

        <p className="mt-16 text-xs text-[color:var(--color-muted)]">
          {tenant.agent.brokerageDisclosure}
        </p>
      </article>

      <FinalCtaBlock />
    </>
  );
}
