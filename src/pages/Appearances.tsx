import { Link } from "react-router-dom";
import { ArrowUpRight, Mic, Newspaper, Tv } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SEO } from "@/components/SEO";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { appearances } from "@/data/appearances";
import type { Appearance, AppearanceKind } from "@/data/appearances";
import { contact } from "@/config/site";

/**
 * /appearances — every video, podcast, and article Ombaka has featured in,
 * pulled from src/data/appearances.ts. The newest entry is rendered large at
 * the top; the rest are grouped by kind, and a group disappears entirely when
 * it has no entries, so the page never shows an empty "Podcasts" heading.
 */

interface KindMeta {
  /** Heading for the group of this kind. */
  section: string;
  /** Short label stamped on each card. */
  label: string;
  /** Verb for the outbound link. */
  action: string;
  icon: LucideIcon;
}

const KIND: Record<AppearanceKind, KindMeta> = {
  video: {
    section: "Television & Video",
    label: "Video",
    action: "Watch",
    icon: Tv,
  },
  podcast: {
    section: "Podcasts",
    label: "Podcast",
    action: "Listen",
    icon: Mic,
  },
  article: {
    section: "Writing & Press",
    label: "Article",
    action: "Read",
    icon: Newspaper,
  },
};

/** Group order on the page, independent of how the data file is ordered. */
const KIND_ORDER: AppearanceKind[] = ["video", "podcast", "article"];

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Outlet, programme, and date — skipping the parts an entry doesn't have. */
function Byline({ item, className = "" }: { item: Appearance; className?: string }) {
  return (
    <p className={`font-mono text-xs uppercase tracking-wide ${className}`}>
      {[item.outlet, item.programme].filter(Boolean).join(" · ")}
      <span className="mx-2">|</span>
      <time dateTime={item.date}>{formatDate(item.date)}</time>
    </p>
  );
}

/**
 * The visual for an appearance: a playable embed for YouTube items, a linked
 * still for anything with an image, and a typographic plate for entries with
 * neither (an article, say) so every card keeps the same shape.
 */
function Media({ item }: { item: Appearance }) {
  if (item.youtubeId) {
    return <YouTubeEmbed videoId={item.youtubeId} title={item.title} />;
  }

  const Icon = KIND[item.kind].icon;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block aspect-video w-full overflow-hidden bg-cream-soft"
      aria-label={`${KIND[item.kind].action}: ${item.title}`}
    >
      {item.image ? (
        <img
          src={item.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center">
          <Icon className="h-10 w-10 text-berry" aria-hidden="true" />
        </span>
      )}
    </a>
  );
}

function KindTag({ kind }: { kind: AppearanceKind }) {
  const Icon = KIND[kind].icon;

  return (
    <span className="inline-flex w-fit items-center gap-1.5 border border-ink/20 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide text-berry">
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {KIND[kind].label}
    </span>
  );
}

function AppearanceCard({ item }: { item: Appearance }) {
  return (
    <article className="flex h-full flex-col border-2 border-ink bg-paper shadow-stamp-sm">
      <Media item={item} />
      <div className="flex flex-1 flex-col border-t-2 border-ink p-5">
        <KindTag kind={item.kind} />
        <h3 className="mt-3 font-serif text-xl font-semibold leading-snug text-ink">
          {item.title}
        </h3>
        <Byline item={item} className="mt-2 text-ink/50" />
        <p className="mt-3 text-sm leading-relaxed text-ink/75">{item.summary}</p>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-berry transition hover:text-berry-dark"
        >
          {KIND[item.kind].action} on {item.outlet}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export default function Appearances() {
  // Newest first, regardless of how the data file happens to be ordered.
  const sorted = [...appearances].sort((a, b) => b.date.localeCompare(a.date));
  const [featured, ...rest] = sorted;

  return (
    <>
      <SEO
        title="Appearances"
        description="Vincent Ombaka in the media: television interviews, podcasts, and writing on planning, accountability, and public money in Dagoretti North."
        path="/appearances"
      />

      <section className="bg-cream-soft py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-berry">
            In the Media
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Appearances
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/70">
            Interviews, podcasts, and writing featuring Vincent Ombaka &mdash;
            making the case for accountable planning, honest budgets, and value
            for every shilling residents have already paid.
          </p>
        </div>
      </section>

      <div className="ledger-rule text-ink/15" aria-hidden="true" />

      {featured ? (
        <>
          <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50">
              Most recent
            </p>
            <div className="mt-6 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
              <div className="border-2 border-ink shadow-stamp">
                <Media item={featured} />
              </div>
              <div>
                <KindTag kind={featured.kind} />
                <h2 className="mt-3 font-serif text-2xl font-semibold leading-snug text-ink sm:text-3xl">
                  {featured.title}
                </h2>
                <Byline item={featured} className="mt-3 text-ink/50" />
                <p className="mt-4 text-lg leading-relaxed text-ink/80">
                  {featured.summary}
                </p>
                <a
                  href={featured.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-berry transition hover:text-berry-dark"
                >
                  {KIND[featured.kind].action} on {featured.outlet}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>

          {KIND_ORDER.map((kind) => {
            const items = rest.filter((item) => item.kind === kind);
            if (items.length === 0) return null;

            return (
              <section
                key={kind}
                className="border-t-2 border-ink/10 bg-paper-soft py-16"
              >
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                  <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
                    {KIND[kind].section}
                  </h2>
                  <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                      <AppearanceCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </>
      ) : (
        <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <p className="text-lg text-ink/70">
            Ombaka&rsquo;s media appearances will be collected here. Check back
            soon.
          </p>
        </section>
      )}

      <section className="bg-berry py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-white">
              Media &amp; interview requests
            </h2>
            <p className="mt-3 max-w-xl text-white/85">
              Producers, editors, and podcast hosts: the campaign answers
              interview requests directly. Residents with a question for Ombaka
              can reach the team the same way.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${contact.email}`} className="btn-on-dark">
              {contact.email}
            </a>
            <Link
              to="/get-involved"
              className="inline-flex items-center justify-center gap-2 border-2 border-white bg-transparent px-6 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:bg-white hover:text-berry"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
