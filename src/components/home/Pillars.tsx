import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { pillars } from "@/data/pillars";
import { features } from "@/config/features";

export function Pillars() {
  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            What Ombaka is running on
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ x: -2, y: -2 }}
                className="border-2 border-ink bg-paper p-6 shadow-stamp-sm transition-shadow duration-200 hover:shadow-[6px_6px_0_0_rgba(17,17,17,1)]"
              >
                <Icon className="h-8 w-8 text-berry" aria-hidden="true" />
                <h3 className="mt-4 font-serif text-xl font-semibold text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-1 text-xs italic text-ink/50">
                  {pillar.swahiliTag}
                </p>
                <p className="mt-3 text-ink/70">{pillar.summary}</p>
              </motion.div>
            );
          })}
        </div>

        {features.plan && (
          <div className="mt-8">
            <Link
              to="/plan"
              className="inline-flex items-center gap-1 text-sm font-semibold text-berry hover:underline"
            >
              Read the full plan
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
