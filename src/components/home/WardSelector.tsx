import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wards } from "@/data/wards";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";

export function WardSelector() {
  const [active, setActive] = useState(wards[0]);

  return (
    <section id="wards" className="bg-cream-soft py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Find your ward
          </h2>
          <p className="mt-3 text-ink/70">
            Dagoretti North isn&rsquo;t one constituency with one problem.
            Pick your ward to see what Ombaka is running on there — then join
            the ward WhatsApp community.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Select your ward"
          className="mt-8 flex flex-wrap gap-2"
        >
          {wards.map((w) => (
            <button
              key={w.slug}
              role="tab"
              aria-selected={active.slug === w.slug}
              onClick={() => setActive(w)}
              className={`border-2 border-ink px-4 py-2 text-sm font-semibold transition-all duration-150 ${
                active.slug === w.slug
                  ? "bg-berry text-white shadow-stamp-sm"
                  : "bg-transparent text-ink hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-cream-soft hover:shadow-stamp-sm"
              }`}
            >
              {w.name}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="border-2 border-ink bg-paper p-6 shadow-stamp-sm"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-berry">
                {active.name}
              </p>
              <p className="mt-2 font-serif text-xl text-ink">{active.oneLiner}</p>
              <p className="mt-3 text-sm italic text-ink/60">
                {active.swahiliTag}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="border-2 border-ink bg-paper p-6 shadow-stamp-sm">
            <p className="mb-4 text-sm font-semibold text-ink">
              Join {active.name} residents on WhatsApp
            </p>
            <LeadCaptureForm defaultWard={active.slug} key={active.slug} />
          </div>
        </div>
      </div>
    </section>
  );
}
