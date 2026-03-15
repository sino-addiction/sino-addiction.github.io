import { getCollection, type CollectionEntry, type CollectionKey } from "astro:content";

export async function requirePage(id: string) {
  const pages = await getCollection("pages");
  const page = pages.find((entry) => entry.id === id || entry.id === `${id}.md` || entry.id.endsWith(`/${id}.md`));

  if (!page) {
    throw new Error(`Missing page content: ${id}`);
  }

  return page;
}

export async function listPublishedNews() {
  const news = await getCollection("news", ({ data }) => !data.draft);
  return news.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function listCollection<K extends Exclude<CollectionKey, "pages" | "news">>(name: K) {
  return getCollection(name) as Promise<CollectionEntry<K>[]>;
}

export function sortFeaturedFirst<T extends { data: { featured?: boolean } }>(entries: T[]) {
  return [...entries].sort((a, b) => Number(b.data.featured ?? false) - Number(a.data.featured ?? false));
}
