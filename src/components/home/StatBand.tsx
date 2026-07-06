import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { headlineStats } from "@/data/stats";
import { StatCard } from "@/components/StatCard";

export function StatBand() {
  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl"
        >
          <h2 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Taxes up.{" "}
            <span className="text-berry">Development down.</span>
          </h2>
          <p className="mt-3 text-ink/70">
            Ushuru Imezidi, Maendeleo ni Kidogo. This is the gap Ombaka is
            running to close — with figures the campaign will publish and
            source, not slogans.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {headlineStats.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <StatCard item={item} />
            </motion.div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            to="/stats"
            className="inline-flex items-center gap-1 text-sm font-semibold text-berry hover:underline"
          >
            See the full record
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
