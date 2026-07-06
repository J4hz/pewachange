import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { supporterCount, endorsements, wardCaptains } from "@/data/socialProof";

export function SocialProof() {
  return (
    <section className="bg-cream-soft py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-start gap-2 border-2 border-ink bg-paper p-6 shadow-stamp-sm sm:flex-row sm:items-center sm:gap-4"
        >
          <Users className="h-8 w-8 shrink-0 text-berry" aria-hidden="true" />
          {supporterCount === null ? (
            <p className="text-lg font-semibold text-ink">
              This campaign just launched. Be one of the first residents to
              join.
            </p>
          ) : (
            <p className="text-lg font-semibold text-ink">
              <span className="font-mono text-2xl text-berry">
                {supporterCount.toLocaleString()}
              </span>{" "}
              residents have already joined.
            </p>
          )}
        </motion.div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink/60">
              Endorsements
            </h3>
            {endorsements.length === 0 ? (
              <p className="mt-3 border border-dashed border-ink/30 p-4 text-sm text-ink/50">
                Endorsements will appear here as they're confirmed.
              </p>
            ) : (
              <ul className="mt-3 space-y-4">
                {endorsements.map((e) => (
                  <li key={e.name} className="border-2 border-ink/15 p-4">
                    <p className="text-ink/80">&ldquo;{e.quote}&rdquo;</p>
                    <p className="mt-2 text-sm font-semibold text-ink">
                      {e.name} &middot; {e.role}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink/60">
              Ward captains
            </h3>
            {wardCaptains.length === 0 ? (
              <p className="mt-3 border border-dashed border-ink/30 p-4 text-sm text-ink/50">
                Ward captains will be introduced here as they're recruited.
              </p>
            ) : (
              <ul className="mt-3 grid grid-cols-3 gap-3">
                {wardCaptains.map((c) => (
                  <li key={c.name} className="text-center">
                    <div className="aspect-square bg-berry/10" />
                    <p className="mt-2 text-sm font-semibold text-ink">
                      {c.name}
                    </p>
                    <p className="text-xs text-ink/60">{c.ward}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
