import { Link } from "react-router-dom";
import { pillars } from "@/data/pillars";
import { features } from "@/config/features";

export function Pillars() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="shell">
        <h2 className="heading max-w-2xl text-4xl sm:text-5xl">
          Three promises to Dagoretti North
        </h2>

        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
          {pillars.map((pillar) => (
            <article key={pillar.id} className="border-t-[1.5px] border-ink/15 pt-6">
              <p className="display text-2xl text-berry">{pillar.swahiliTag}</p>
              <h3 className="heading mt-4 text-2xl">{pillar.title}</h3>
              <p className="mt-3 text-ink/75">{pillar.summary}</p>
            </article>
          ))}
        </div>

        {features.plan && (
          <Link to="/plan" className="link mt-12 inline-block">
            Read the full plan
          </Link>
        )}
      </div>
    </section>
  );
}
