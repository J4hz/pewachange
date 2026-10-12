import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import { Modal } from "@/components/Modal";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { candidate, taglines } from "@/config/site";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The official tagline is the headline, set in the wordmark-style italic.
 * The portrait sits over the peach circle from the logo. This is the site's
 * one orchestrated motion moment: the tagline's two halves land in turn and
 * the circle settles in behind the photo.
 */
export function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  const reduce = useReducedMotion();

  const [firstHalf, secondHalf] = taglines.official.split(/,\s*/);

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease },
        };

  const scrollToWards = () => {
    document
      .getElementById("wards")
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="shell grid items-center gap-12 pb-20 pt-8 md:grid-cols-[1.35fr_0.65fr] md:gap-12 md:pb-28 md:pt-12 lg:gap-16">
        <div className="relative z-10">
          <h1 className="display text-[clamp(2.9rem,6.4vw,5.6rem)] text-berry">
            <motion.span className="block" {...rise(0.05)}>
              {firstHalf},
            </motion.span>
            <motion.span className="block" {...rise(0.2)}>
              {secondHalf}.
            </motion.span>
          </h1>

          <motion.div {...rise(0.4)}>
            <p className="mt-7 max-w-[34rem] text-xl leading-snug text-ink sm:text-[1.375rem]">
              {taglines.officialEnglish} {taglines.primary}
            </p>
            <p className="mt-4 max-w-[34rem] text-ink/70">
              Kilimani, Gatina, Kabiro, Kawangware and Kileleshwa carry a heavy
              tax burden and see too little back. {candidate.shortName} is
              running to make every shilling of public money traceable.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="btn-primary"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
                Get campaign updates
              </button>
              <button
                type="button"
                onClick={scrollToWards}
                className="btn-secondary"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Join your ward on WhatsApp
              </button>
            </div>
            <p className="mt-4 text-sm text-ink/60">
              Free, and it takes 20 seconds. Join us at{" "}
              <span className="font-semibold text-berry">{taglines.hashtag}</span>.
            </p>
          </motion.div>
        </div>

        <figure className="relative mx-auto w-full max-w-[22rem] md:max-w-[26rem]">
          <motion.div
            aria-hidden="true"
            className="absolute -left-[22%] -top-[8%] aspect-square w-[118%] rounded-full bg-blush"
            {...(reduce
              ? {}
              : {
                  initial: { scale: 0.85, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  transition: { duration: 1.1, delay: 0.1, ease },
                })}
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-sheet bg-blush">
            <img
              src="/hero.jpg"
              alt={`${candidate.fullName}, candidate for Member of Parliament, Dagoretti North`}
              className="h-full w-full object-cover object-top"
              width={640}
              height={800}
              {...{ fetchpriority: "high" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <figcaption className="relative mt-4 pl-1">
            <span className="block font-semibold text-ink">{candidate.fullName}</span>
            <span className="block text-sm text-ink/65">
              Candidate for MP, Dagoretti North, {candidate.electionYear}
            </span>
          </figcaption>
        </figure>
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
