import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { pillars } from "@/data/pillars";
import { taglines } from "@/config/site";

export default function Plan() {
  return (
    <>
      <SEO
        title="The Plan"
        description="Ombaka's manifesto for Dagoretti North: real representation, accountable spending, and jobs with dignity."
        path="/plan"
      />

      <section className="bg-cream-soft py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-berry">
            The Plan
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
            {taglines.primary}
          </h1>
          <p className="mt-5 text-lg text-ink/70">
            {taglines.supportingEnglish} Here is exactly what that means for
            Dagoretti North.
          </p>
        </div>
      </section>
      <div className="ledger-rule text-ink/15" aria-hidden="true" />

      <div className="mx-auto max-w-3xl divide-y divide-ink/10 px-4 sm:px-6">
        {pillars.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <motion.section
              key={pillar.id}
              id={pillar.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="py-12"
            >
              <Icon className="h-9 w-9 text-berry" aria-hidden="true" />
              <h2 className="mt-4 font-serif text-3xl font-semibold text-ink sm:text-4xl">
                {pillar.title}
              </h2>
              <p className="mt-1 text-sm italic text-ink/50">
                {pillar.swahiliTag}
              </p>
              <p className="mt-4 text-lg text-ink/80">{pillar.summary}</p>
              <p className="mt-4 border-2 border-ink/15 bg-cream-soft p-4 text-ink/70">
                {pillar.detail}
              </p>
            </motion.section>
          );
        })}
      </div>

      <section className="bg-berry py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
              Hold Ombaka to this plan
            </h2>
            <p className="mt-3 text-white/85">
              Join the campaign to get updates as each commitment is
              published, tracked, and delivered.
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
