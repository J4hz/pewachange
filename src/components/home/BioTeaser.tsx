import { Link } from "react-router-dom";
import { candidate } from "@/config/site";

export function BioTeaser() {
  return (
    <section className="bg-paper pb-20 sm:pb-28">
      <div className="shell">
        <div className="grid items-center gap-8 rounded-sheet bg-cream p-6 sm:grid-cols-[auto_1fr] sm:gap-10 sm:p-10">
          <img
            src="/portrait-square.jpg"
            alt={candidate.fullName}
            className="h-32 w-32 rounded-full bg-blush object-cover sm:h-40 sm:w-40"
            width={160}
            height={160}
            loading="lazy"
          />
          <div>
            <h2 className="heading text-3xl">Already doing the work</h2>
            <p className="mt-3 max-w-2xl text-lg text-ink/75">
              Entrepreneur, policy expert, and chairperson of the Kileleshwa
              Ward Neighbourhood Association (KIWANA). {candidate.shortName} was
              showing up for residents long before asking for their vote.
            </p>
            <Link to="/about" className="link mt-5 inline-block">
              Read Ombaka&rsquo;s story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
