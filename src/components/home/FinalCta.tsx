import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { taglines } from "@/config/site";

export function FinalCta() {
  return (
    <section id="join" className="bg-berry py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2 md:items-center">
        <div>
          <p className="font-serif text-lg font-semibold italic text-white/90">
            {taglines.official}.
          </p>
          <h2 className="mt-2 font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {taglines.primary}
          </h2>
          <p className="mt-4 text-lg text-white/85">{taglines.supportingEnglish}</p>
          <p className="mt-4 inline-block border-2 border-white/40 px-3 py-1 text-sm font-semibold tracking-wide text-white">
            {taglines.hashtag}
          </p>
        </div>
        <LeadCaptureForm
          variant="on-dark"
          className="border-2 border-white/30 bg-white/5 p-6"
        />
      </div>
    </section>
  );
}
