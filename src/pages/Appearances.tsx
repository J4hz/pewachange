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
    section: "Television and video",
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
    section: "Writing and press",
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
    <p className={`text-[0.9375rem] ${className}`}>
      {[item.outlet, item.programme].filter(Boolean).join(", ")}
      <span aria-hidden="true">, </span>
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
      className="group block aspect-video w-full overflow-hidden bg-cream"
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
    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-berry/[0.08] px-3 py-1 text-sm font-semibold text-berry">
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {KIND[kind].label}
    </span>
  );
}

function AppearanceCard({ item }: { item: Appearance }) {
  return (
    <article className="flex h-full flex-col">
      <div className="overflow-hidden rounded-2xl">
        <Media item={item} />
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <KindTag kind={item.kind} />
        <h3 className="heading mt-3 text-xl leading-snug">
          {item.title}
        </h3>
        <Byline item={item} className="mt-2 text-ink/50" />
        <p className="mt-3 text-sm leading-relaxed text-ink/75">{item.summary}</p>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="link mt-auto inline-flex w-fit items-center gap-1 pt-4"
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
        description="Ochieng (Pewa Change) Ombaka in the media: television interviews, podcasts, and writing on planning, accountability, and public money in Dagoretti North."
        path="/appearances"
      />

      <section className="bg-paper pb-4 pt-12 sm:pt-20">
        <div className="shell">
          <h1 className="heading text-5xl sm:text-6xl">In the media</h1>
          <p className="mt-5 max-w-2xl text-xl leading-snug text-ink/80">
            Interviews, podcasts, and writing featuring Ochieng (Pewa Change) Ombaka &mdash;
            making the case for accountable planning, honest budgets, and value
            for every shilling residents have already paid.
          </p>
        </div>
      </section>

      {featured ? (
        <>
          <section className="bg-paper pb-20 pt-12 sm:pb-24">
            <div className="shell grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center lg:gap-12">
              <div className="overflow-hidden rounded-sheet">
                <Media item={featured} />
              </div>
              <div>
                <KindTag kind={featured.kind} />
                <h2 className="heading mt-4 text-3xl leading-snug sm:text-[2.125rem]">
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
                  className="link mt-6 inline-flex items-center gap-1"
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
                className="bg-cream py-20"
              >
                <div className="shell">
                  <h2 className="heading text-3xl">
                    {KIND[kind].section}
                  </h2>
                  <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
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
        <section className="shell py-20 text-center">
          <p className="text-lg text-ink/70">
            Ombaka&rsquo;s media appearances will be collected here. Check back
            soon.
          </p>
        </section>
      )}

      <section className="bg-berry py-16 text-paper sm:py-20">
        <div className="shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="heading text-3xl" style={{ color: "inherit" }}>
              Media and interview requests
            </h2>
            <p className="mt-3 max-w-xl text-paper/85">
              Producers, editors, and podcast hosts: the campaign answers
              interview requests directly. Residents with a question for Ombaka
              can reach the team the same way.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${contact.email}`} className="btn-on-dark">
              {contact.email}
            </a>
            <Link to="/get-involved" className="btn-ghost-on-dark">
              Get involved
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
