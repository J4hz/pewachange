import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { taglines } from "@/config/site";

export function FinalCta() {
  return (
    <section id="join" className="scroll-mt-16 bg-berry py-20 text-paper sm:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_27rem] lg:items-center lg:gap-16">
        <div>
          <h2 className="display text-[clamp(2.75rem,6vw,4.75rem)]">
            {taglines.primary.split(/(?<=\.)\s+/).map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-7 font-serif text-2xl italic text-blush">
            {taglines.supportingSwahili}
          </p>
          <p className="mt-1 text-lg text-paper/80">{taglines.supportingEnglish}</p>
          <p className="mt-8 text-paper/70">
            Add your name and ask for your change.{" "}
            <span className="font-semibold text-paper">{taglines.hashtag}</span>
          </p>
        </div>
        <div className="rounded-sheet bg-ink/25 p-6 sm:p-8">
          <LeadCaptureForm variant="on-dark" />
        </div>
      </div>
    </section>
  );
}
