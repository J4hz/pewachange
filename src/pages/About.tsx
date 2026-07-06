import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { candidate } from "@/config/site";

export default function About() {
  return (
    <>
      <SEO
        title="Meet Ombaka"
        description="Vincent Ombaka: African Christian apologist, entrepreneur, and policy expert. Chairperson of the Kileleshwa Ward Neighbourhood Association, standing for Member of Parliament, Dagoretti North."
        path="/about"
      />

      <section className="bg-cream-soft py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 sm:px-6 md:grid-cols-[280px_1fr] md:gap-12">
          <div className="mx-auto aspect-[4/5] w-full max-w-[280px] border-2 border-ink bg-berry/10 shadow-stamp">
            <img
              src="/hero.jpg"
              alt="Vincent Ombaka, aspiring MP for Dagoretti North"
              className="h-full w-full object-cover"
              width={640}
              height={800}
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-berry">
              Meet Ombaka
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {candidate.fullName}
            </h1>
            <p className="mt-4 text-lg font-medium text-ink/70">
              Entrepreneur. Policy expert. Community leader. Aspiring MP,
              Dagoretti North.
            </p>
          </div>
        </div>
      </section>

      <div className="ledger-rule text-ink/15" aria-hidden="true" />

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <section>
          <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
            Rooted in the community
          </h2>
          <div className="mt-4 space-y-4 text-lg leading-relaxed text-ink/80">
            <p>
              Ombaka's case for Dagoretti North doesn't start with a campaign
              launch — it starts with a job he already holds. He is the
              current chairperson of the Kileleshwa Ward Neighbourhood
              Association (KIWANA), the body residents have already entrusted
              to represent their interests at the ward level.
            </p>
            <p>
              That's a different kind of credential from a manifesto: it's
              proof he shows up for local problems before there's an
              election attached to them, and that neighbours in Kileleshwa
              have already chosen to put him in a position of trust.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
            A builder and a businessman
          </h2>
          <div className="mt-4 space-y-4 text-lg leading-relaxed text-ink/80">
            <p>
              Ombaka is a co-director of Oyake Enterprises Limited, a
              consumer products SME operating in Nairobi and Migori County.
              Running a business in Kenya's regulatory and tax environment
              means he understands, firsthand, what it takes for an
              honest enterprise to survive and grow — and what stands in its
              way.
            </p>
            <p>
              He also runs his own consultancy, Wazo Africa. Between the two,
              he's spent years on the operating side of the economy this
              constituency depends on: the small businesses, traders, and
              informal workers who carry Dagoretti North — the same people
              his "Jobs & Dignity" commitment is built around.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
            Policy expertise in service of people
          </h2>
          <div className="mt-4 space-y-4 text-lg leading-relaxed text-ink/80">
            <p>
              As a policy consultant, Ombaka is currently working on market
              systems as a development approach in Northern Kenya — including
              helping set up regulatory systems for rangeland management, and
              reviewing national policy on marginalization in the region.
            </p>
            <p>
              This is the unglamorous work of understanding how government
              systems and public money actually move — the exact skillset an
              accountability-focused MP needs to hold a budget line to
              account, rather than just complain about it.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
            Faith and family
          </h2>
          <div className="mt-4 space-y-4 text-lg leading-relaxed text-ink/80">
            <p>
              Ombaka is a husband and a father, and an African Christian
              apologist by conviction. He holds strong views on God's
              redemptive purpose for enterprise, and on the central role of
              social justice in building an environment where business — and
              the people who depend on it — can genuinely thrive.
            </p>
            <p>
              That conviction shows up in his service with the Hesabika
              Trust, an institution that catalyses Christians in Kenya to
              turn concern into action.
            </p>
          </div>
        </section>
      </div>

      <section className="bg-berry py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
              One promise: accountability for every shilling
            </h2>
            <p className="mt-3 text-white/85">
              Ombaka is standing for Member of Parliament, Dagoretti North on
              one promise — that every taxpayer shilling is accounted for.
              Join the campaign, or head to Get Involved to find your ward
              community.
            </p>
            <Link to="/get-involved" className="btn-on-dark mt-6">
              Get Involved
            </Link>
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
