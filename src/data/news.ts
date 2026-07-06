/**
 * News/update cards for the hidden /news page (see src/config/features.ts).
 * An empty or stale news feed is the fastest way to signal an abandoned
 * campaign, so keep this page hidden until there is a steady stream of real
 * updates, and add only real, dated posts here.
 */

export interface NewsItem {
  id: string;
  title: string;
  date: string; // ISO date
  excerpt: string;
  href: string;
}

export const news: NewsItem[] = [];
