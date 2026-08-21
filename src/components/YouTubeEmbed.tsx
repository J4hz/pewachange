import { useState } from "react";
import { Play } from "lucide-react";

interface YouTubeEmbedProps {
  videoId: string;
  /** Used for the play button's accessible label. */
  title: string;
  className?: string;
}

/**
 * Click-to-load YouTube player ("facade" pattern): until the visitor presses
 * play we render only a thumbnail, so no YouTube script, iframe, or cookie is
 * loaded on page view. That keeps /appearances fast and keeps third-party
 * tracking behind a deliberate user action, consistent with how analytics is
 * gated on this site (see src/lib/analytics.ts and CookieConsent.tsx).
 *
 * maxresdefault.jpg doesn't exist for every video; hqdefault.jpg always does,
 * so we fall back to it on error rather than showing a broken image.
 */
export function YouTubeEmbed({ videoId, title, className = "" }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
  );

  return (
    <div className={`relative aspect-video w-full overflow-hidden bg-ink ${className}`}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full"
        >
          <img
            src={thumb}
            onError={() =>
              setThumb(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`)
            }
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-ink/25 transition group-hover:bg-ink/10" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 border-ink bg-berry text-white shadow-stamp transition-all duration-150 group-hover:-translate-x-[calc(50%+2px)] group-hover:-translate-y-[calc(50%+2px)] group-hover:shadow-[6px_6px_0_0_rgba(17,17,17,1)]">
            <Play className="h-7 w-7 translate-x-0.5 fill-current" />
          </span>
        </button>
      )}
    </div>
  );
}
