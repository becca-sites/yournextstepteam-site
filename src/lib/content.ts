import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.join(process.cwd(), "content");

export interface PostMeta {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  updatedAt?: string;
  category?: string;
  tags?: string[];
  speakable?: string[];
  heroImage?: string;
}

export interface StoryMeta {
  slug: string;
  title: string;
  summary: string;
  outcome?: string;
  publishedAt: string;
  updatedAt?: string;
  heroImage?: string;
  tags?: string[];
}

export interface NeighborhoodMeta {
  slug: string;
  name: string;
  city: string;
  state: string;
  population?: number;
  medianPrice?: string;
  schoolDistrict?: string;
  zip?: string;
  summary: string;
  updatedAt?: string;
}

function readMarkdownDir<T extends { slug: string }>(
  dir: string,
  buildMeta: (slug: string, data: Record<string, unknown>) => T,
): T[] {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(full, file), "utf8");
      const { data } = matter(raw);
      return buildMeta(slug, data);
    })
    .sort((a, b) => {
      const ax = "publishedAt" in a ? String((a as unknown as { publishedAt?: string }).publishedAt ?? "") : "";
      const bx = "publishedAt" in b ? String((b as unknown as { publishedAt?: string }).publishedAt ?? "") : "";
      return bx.localeCompare(ax);
    });
}

export function getAllPosts(): PostMeta[] {
  return readMarkdownDir<PostMeta>("blog", (slug, data) => ({
    slug,
    title: String(data.title ?? slug),
    summary: String(data.summary ?? ""),
    publishedAt: String(data.publishedAt ?? ""),
    updatedAt: data.updatedAt as string | undefined,
    category: data.category as string | undefined,
    tags: data.tags as string[] | undefined,
    speakable: data.speakable as string[] | undefined,
    heroImage: data.heroImage as string | undefined,
  }));
}

export function getAllStories(): StoryMeta[] {
  return readMarkdownDir<StoryMeta>("stories", (slug, data) => ({
    slug,
    title: String(data.title ?? slug),
    summary: String(data.summary ?? ""),
    outcome: data.outcome as string | undefined,
    publishedAt: String(data.publishedAt ?? ""),
    updatedAt: data.updatedAt as string | undefined,
    heroImage: data.heroImage as string | undefined,
    tags: data.tags as string[] | undefined,
  }));
}

export function getAllNeighborhoods(): NeighborhoodMeta[] {
  return readMarkdownDir<NeighborhoodMeta>("neighborhoods", (slug, data) => ({
    slug,
    name: String(data.name ?? slug),
    city: String(data.city ?? ""),
    state: String(data.state ?? ""),
    population: data.population as number | undefined,
    medianPrice: data.medianPrice as string | undefined,
    schoolDistrict: data.schoolDistrict as string | undefined,
    zip: data.zip as string | undefined,
    summary: String(data.summary ?? ""),
    updatedAt: data.updatedAt as string | undefined,
  }));
}
