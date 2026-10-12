import type { ReactNode } from "react";
import { SEO } from "@/components/SEO";
import { FinalCta } from "@/components/home/FinalCta";
import { candidate } from "@/config/site";

function Chapter({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-16 first:mt-0">
      <h2 className="heading text-3xl sm:text-[2.125rem]">{title}</h2>
      <div className="mt-5 space-y-5 text-lg leading-[1.7] text-ink/80">{children}</div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <SEO
        title="Meet Ombaka"
        description="Ochieng (Pewa Change) Ombaka: African Christian apologist, entrepreneur, and policy expert. Chairperson of the Kileleshwa Ward Neighbourhood Association, standing for Member of Parliament, Dagoretti North."
        path="/about"
      />

      <section className="overflow-hidden bg-paper">
        <div className="shell grid items-center gap-12 pb-16 pt-10 md:grid-cols-[22rem_1fr] md:gap-16 md:pb-24 md:pt-16">
          <div className="relative mx-auto w-full max-w-[20rem] md:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -right-[18%] -top-[10%] aspect-square w-[105%] rounded-full bg-blush"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-sheet bg-blush">
              <img
                src="/hero.jpg"
                alt={candidate.fullName}
                className="h-full w-full object-cover object-top"
                width={640}
                height={800}
              />
            </div>
          </div>
          <div>
            <h1 className="display text-[clamp(2.75rem,6vw,4.5rem)] text-berry">
              {candidate.fullName}
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-snug text-ink sm:text-[1.375rem]">
              Entrepreneur, policy expert and community leader, standing for
              Member of Parliament in Dagoretti North.
            </p>
          </div>
        </div>
      </section>

      <article className="bg-paper pb-24">
        <div className="shell">
          <div className="mx-auto max-w-[40rem]">
            <Chapter title="Rooted in the community">
              <p>
                Ombaka&rsquo;s case for Dagoretti North doesn&rsquo;t start with a
                campaign launch. It starts with a job he already holds. He is
                the current chairperson of the Kileleshwa Ward Neighbourhood
                Association (KIWANA), the body residents have already entrusted
                to represent their interests at the ward level.
              </p>
              <p>
                That&rsquo;s a different kind of credential from a manifesto:
                it&rsquo;s proof he shows up for local problems before
                there&rsquo;s an election attached to them, and that neighbours
                in Kileleshwa have already chosen to put him in a position of
                trust.
              </p>
            </Chapter>

            <Chapter title="A builder and a businessman">
              <p>
                Ombaka is a co-director of Oyake Enterprises Limited, a
                consumer products SME operating in Nairobi and Migori County.
                Running a business in Kenya&rsquo;s regulatory and tax
                environment means he understands, firsthand, what it takes for
                an honest enterprise to survive and grow, and what stands in
                its way.
              </p>
              <p>
                He also runs his own consultancy, Wazo Africa. Between the two,
                he&rsquo;s spent years on the operating side of the economy
                this constituency depends on: the small businesses, traders,
                and informal workers who carry Dagoretti North, the same people
                his commitment to jobs and dignity is built around.
              </p>
            </Chapter>

            <Chapter title="Policy expertise in service of people">
              <p>
                As a policy consultant, Ombaka is currently working on market
                systems as a development approach in Northern Kenya, including
                helping set up regulatory systems for rangeland management, and
                reviewing national policy on marginalization in the region.
              </p>
              <p>
                This is the unglamorous work of understanding how government
                systems and public money actually move. It&rsquo;s the exact
                skillset an accountability-focused MP needs to hold a budget
                line to account, rather than just complain about it.
              </p>
            </Chapter>

            <Chapter title="Faith and family">
              <p>
                Ombaka is a husband and a father, and an African Christian
                apologist by conviction. He holds strong views on God&rsquo;s
                redemptive purpose for enterprise, and on the central role of
                social justice in building an environment where business, and
                the people who depend on it, can genuinely thrive.
              </p>
              <p>
                That conviction shows up in his service with the Hesabika
                Trust, an institution that catalyses Christians in Kenya to
                turn concern into action.
              </p>
            </Chapter>
          </div>
        </div>
      </article>

      <FinalCta />
    </>
  );
}
