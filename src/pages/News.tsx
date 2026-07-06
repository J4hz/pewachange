import { SEO } from "@/components/SEO";
import { news } from "@/data/news";

/**
 * HIDDEN behind features.news. Keep off until there's a steady flow of real
 * updates — an abandoned news feed is the fastest way to signal a dead
 * campaign. Wire `src/data/news.ts` to a real CMS before enabling.
 */
export default function News() {
  return (
    <>
      <SEO
        title="News & Updates"
        description="Latest updates from the Ombaka 2027 campaign for Dagoretti North MP."
        path="/news"
      />
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-berry">
          The Campaign
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          News &amp; Updates
        </h1>
        <ul className="mt-10 space-y-8">
          {news.map((item) => (
            <li key={item.id} className="border-b-2 border-ink/10 pb-8">
              <time className="font-mono text-sm text-ink/50">{item.date}</time>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-ink">
                {item.title}
              </h2>
              <p className="mt-2 text-ink/80">{item.excerpt}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
