import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { wards } from "@/data/wards";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";

export function WardSelector() {
  const [active, setActive] = useState(wards[0]);
  const reduce = useReducedMotion();

  return (
    <section id="wards" className="scroll-mt-20 bg-cream py-20 sm:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_27rem] lg:gap-16">
        <div>
          <h2 className="heading text-4xl sm:text-5xl">Find your ward</h2>
          <p className="mt-4 max-w-xl text-lg text-ink/75">
            Dagoretti North isn&rsquo;t one place with one problem. Choose your
            ward to see what Ombaka is running on there, then join your
            neighbours on WhatsApp.
          </p>

          <div
            role="tablist"
            aria-label="Wards of Dagoretti North"
            className="mt-9 flex flex-wrap gap-2"
          >
            {wards.map((w) => {
              const selected = active.slug === w.slug;
              return (
                <button
                  key={w.slug}
                  role="tab"
                  id={`ward-tab-${w.slug}`}
                  aria-selected={selected}
                  aria-controls="ward-panel"
                  onClick={() => setActive(w)}
                  className={`rounded-full px-5 py-2.5 text-[0.9375rem] font-semibold transition-colors duration-150 ${
                    selected
                      ? "bg-berry text-paper"
                      : "bg-paper/60 text-ink/80 hover:bg-paper hover:text-ink"
                  }`}
                >
                  {w.name}
                </button>
              );
            })}
          </div>

          <div
            id="ward-panel"
            role="tabpanel"
            aria-labelledby={`ward-tab-${active.slug}`}
            className="mt-10 min-h-[11rem]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                key={active.slug}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="max-w-xl border-l-[3px] border-berry pl-6"
              >
                <p
                  className="font-serif text-2xl leading-snug text-ink sm:text-[1.75rem]"
                  style={{ fontVariationSettings: '"SOFT" 60' }}
                >
                  {active.oneLiner}
                </p>
                <footer className="mt-4 font-serif text-lg italic text-berry">
                  {active.swahiliTag}
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>

        <div className="rounded-sheet bg-paper p-6 sm:p-8">
          <h3 className="heading text-2xl">Join {active.name} on WhatsApp</h3>
          <p className="mt-2 text-ink/70">
            Leave your details and we&rsquo;ll show you the link to your ward&rsquo;s
            WhatsApp group.
          </p>
          <LeadCaptureForm defaultWard={active.slug} key={active.slug} className="mt-6" />
        </div>
      </div>
    </section>
  );
}
