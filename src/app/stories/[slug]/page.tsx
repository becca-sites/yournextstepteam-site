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

function readStory(slug: string) {
  const candidates = [
    path.join(process.cwd(), "content", "stories", `${slug}.mdx`),
    path.join(process.cwd(), "content", "stories", `${slug}.md`),
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
  const file = readStory(slug);
  if (!file) return { title: "Story not found" };
  return {
    title: String(file.data.title ?? slug),
    description: String(file.data.summary ?? ""),
    alternates: { canonical: `/stories/${slug}` },
  };
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const file = readStory(slug);
  if (!file) notFound();

  const { content } = await compileMDX({
    source: file.raw,
    options: { parseFrontmatter: false },
  });
  const heroImage =
    (file.data.heroImage as string | undefined) ??
    tenant.media.listingShowcase[
      Math.abs(slug.length) % tenant.media.listingShowcase.length
    ];

  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Stories", url: "/stories" },
          { name: String(file.data.title ?? slug), url: `/stories/${slug}` },
        ]}
      />
      <ArticleSchema
        title={String(file.data.title ?? slug)}
        summary={String(file.data.summary ?? "")}
        published={String(file.data.publishedAt ?? "")}
        updated={String(file.data.updatedAt ?? file.data.publishedAt ?? "")}
        path={`/stories/${slug}`}
      />

      <section className="bg-[var(--color-surface)] pt-12 pb-8">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Link
            href="/stories"
            className="text-sm text-[color:var(--color-muted)] underline-offset-4 hover:underline"
          >
            ← All stories
          </Link>
        </div>
      </section>

      <section className="bg-[var(--color-surface)] pb-12">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          {file.data.outcome && (
            <p className="eyebrow">{String(file.data.outcome)}</p>
          )}
          <h1 className="mt-3 font-heading text-4xl font-semibold leading-tight md:text-5xl">
            {String(file.data.title ?? slug)}
          </h1>
          {file.data.summary && (
            <p className="mt-5 text-lg text-[color:var(--color-muted)] md:text-xl">
              {String(file.data.summary)}
            </p>
          )}
        </div>
      </section>

      <section className="bg-white pb-12">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-neutral-100 shadow-xl">
            <Image
              src={heroImage}
              alt={String(file.data.title ?? slug)}
              fill
              priority
              sizes="(min-width: 1024px) 1000px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white pb-20">
        <article className="mx-auto max-w-3xl px-4 lg:px-8 prose prose-neutral prose-headings:font-heading prose-h2:text-2xl prose-h2:mt-12 prose-p:leading-relaxed">
          {content}
        </article>
      </section>

      <FinalCtaBlock />
    </>
  );
}
