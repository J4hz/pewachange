import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail } from "lucide-react";
import { Modal } from "@/components/Modal";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { Seal } from "@/components/Seal";
import { candidate, taglines } from "@/config/site";

export function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  const scrollToWards = () => {
    document
      .getElementById("wards")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-4 sm:px-6 md:grid-cols-2 md:pb-24 md:pt-8">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-[0.15em] text-berry"
          >
            Dagoretti North &middot; MP 2027
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-4 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-[4.25rem]"
          >
            You&rsquo;ve paid.
            <br />
            You deserve <span className="text-berry">more.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-6 max-w-md text-lg text-ink/70"
          >
            Residents of Kilimani, Gatina, Kabiro, Kawangware and Kileleshwa
            carry a heavy tax burden and see too little back. Ombaka is
            running to make every shilling of public money traceable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="btn-primary"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              Get Updates
            </button>
            <button
              type="button"
              onClick={scrollToWards}
              className="btn-secondary"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Join on WhatsApp
            </button>
          </motion.div>
          <p className="mt-3 text-sm text-ink/50">
            Free. Takes 20 seconds. No spam.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-9 inline-flex flex-col border-l-2 border-berry pl-4"
          >
            <p className="font-serif text-xl font-semibold italic text-ink">
              &ldquo;{taglines.official}.&rdquo;
            </p>
            <p className="mt-1 text-sm text-ink/60">
              {taglines.officialEnglish}{" "}
              <span className="font-semibold not-italic tracking-wide text-berry">
                {taglines.hashtag}
              </span>
            </p>
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-sm md:max-w-none">
          <div className="aspect-[4/5] w-full border-2 border-ink bg-berry/10 shadow-stamp">
            <img
              src="/hero.jpg"
              alt={`${candidate.fullName}, candidate for Dagoretti North Member of Parliament`}
              className="h-full w-full object-cover"
              width={640}
              height={800}
              {...{ fetchpriority: "high" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          <motion.div
            className="absolute -bottom-6 -left-6 hidden sm:block"
            initial={{ opacity: 0, scale: 0.5, rotate: -18 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-full bg-paper p-1 shadow-stamp-sm">
              <Seal variant="decorative" size={92} />
            </div>
          </motion.div>

          <div className="absolute -bottom-4 -right-4 hidden bg-ink px-5 py-3 text-white sm:block">
            <p className="text-xs uppercase tracking-wide text-white/60">
              Positioning
            </p>
            <p className="font-serif text-sm font-semibold">
              The Accountable Son of the Soil
            </p>
          </div>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Get campaign updates"
      >
        <LeadCaptureForm />
      </Modal>
    </section>
  );
}
