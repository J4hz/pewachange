import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { candidate } from "@/config/site";

export function BioTeaser() {
  return (
    <section className="bg-paper py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
        className="mx-auto flex max-w-6xl flex-col items-start gap-8 border-2 border-ink bg-cream-soft p-6 shadow-stamp-sm sm:flex-row sm:items-center sm:p-8"
      >
        <div className="h-28 w-28 shrink-0 overflow-hidden border-2 border-ink bg-berry/10 sm:h-32 sm:w-32">
          <img
            src="/hero.jpg"
            alt="Vincent Ombaka, aspiring MP for Dagoretti North"
            className="h-full w-full object-cover"
            width={256}
            height={256}
          />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-berry">
            Meet {candidate.brandName}
          </p>
          <p className="mt-2 max-w-2xl text-lg text-ink/80">
            An entrepreneur, policy expert, and chairperson of the
            Kileleshwa Ward Neighbourhood Association (KIWANA), already
            doing the work of representation before asking for the vote.
          </p>
          <Link
            to="/about"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-berry hover:underline"
          >
            Meet Ombaka
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
