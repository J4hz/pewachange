import { SEO } from "@/components/SEO";
import { Hero } from "@/components/home/Hero";
import { WardSelector } from "@/components/home/WardSelector";
import { Pillars } from "@/components/home/Pillars";
import { BioTeaser } from "@/components/home/BioTeaser";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <SEO
        title="Home"
        description="Vincent Ombaka for Dagoretti North MP, 2027. You've paid. You deserve more. Join the accountability campaign for Kilimani, Gatina, Kabiro, Kawangware and Kileleshwa."
        path="/"
      />
      <Hero />
      <WardSelector />
      <Pillars />
      <BioTeaser />
      <FinalCta />
    </>
  );
}
