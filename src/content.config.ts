import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
  external: z.boolean().optional(),
});

const heroSchema = z.object({
  kicker: z.string().optional(),
  title: z.string(),
  subtitle: z.string(),
  primaryCta: linkSchema.optional(),
  secondaryCta: linkSchema.optional(),
});

const highlightSchema = z.object({
  label: z.string().optional(),
  title: z.string(),
  description: z.string(),
});

const sectionSchema = z.object({
  title: z.string(),
  body: z.string(),
});

const stepSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const ctaCardSchema = z.object({
  eyebrow: z.string().optional(),
  title: z.string(),
  description: z.string(),
  label: z.string(),
  href: z.string(),
  external: z.boolean().optional(),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hero: heroSchema,
    highlights: z.array(highlightSchema).optional(),
    sections: z.array(sectionSchema).optional(),
    steps: z.array(stepSchema).optional(),
    cta: ctaCardSchema.optional(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/news" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    featured: z.boolean().default(false),
    slug: z.string(),
    draft: z.boolean().default(false),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/publications" }),
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    journal: z.string(),
    year: z.number().int(),
    doi: z.string().optional(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    externalUrl: z.url().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/projects" }),
  schema: z.object({
    title: z.string(),
    lead: z.string(),
    dateStart: z.string(),
    dateEnd: z.string(),
    progress: z.number().min(0).max(100),
    downloadFile: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/team" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    institution: z.string(),
    city: z.string(),
    order: z.number().int(),
    avatar: z.string().optional(),
  }),
});

export const collections = { pages, news, publications, projects, team };
