import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { StatCard } from "@/components/StatCard";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { recordCategories } from "@/data/stats";

export default function Stats() {
  return (
    <>
      <SEO
        title="The Record"
        description="The verified case for accountability in Dagoretti North: what residents pay, what has been delivered, and what remains unaccounted for."
        path="/stats"
      />

      <section className="bg-cream-soft py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-berry">
            The Record
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
            Taxes up. Development down.
          </h1>
          <p className="mt-5 text-lg text-ink/70">
            This page is built to hold verified, sourced figures, not
            estimates. Every stat cites where it came from. Where a figure
            isn&rsquo;t sourced yet, we say so rather than guess.
          </p>
        </div>
      </section>
      <div className="ledger-rule text-ink/15" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {recordCategories.map((category, ci) => (
          <div key={category.id} className="mb-14 last:mb-0">
            <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">{category.title}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: (ci + i) * 0.05 }}
                >
                  <StatCard item={item} />
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        <div className="border-2 border-dashed border-ink/30 p-6 text-sm text-ink/60">
          <p className="font-semibold text-ink">
            Verified constituency figures still need to be supplied.
          </p>
          <p className="mt-1">
            Add sourced figures to <code>src/data/stats.ts</code>, e.g. from
            the Controller of Budget, the Auditor-General, the CDF board, or
            Nairobi County reports. Every figure should cite its source so
            residents can verify it themselves. Do not publish invented or
            unverifiable numbers.
          </p>
        </div>
      </div>

      <section className="bg-berry py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
              Get the record as it's published
            </h2>
            <p className="mt-3 text-white/85">
              Join the campaign to be notified the moment verified figures
              and audits go live on this page.
            </p>
          </div>
          <LeadCaptureForm
            variant="on-dark"
            className="border-2 border-white/30 bg-white/5 p-6"
          />
        </div>
      </section>
    </>
  );
}
