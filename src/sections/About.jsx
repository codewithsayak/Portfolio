import { ArrowUpRight, Braces, Cpu, Gauge } from "lucide-react";
import { GooeyTextReveal } from "@/components/ui/gooey-text-reveal";
import SectionHeading from "@/components/SectionHeading";
import { principles, profile } from "@/data/site";

const principleIcons = [Braces, Gauge, Cpu];

export default function About() {
  return (
    <section id="about" className="relative border-t border-border/60 py-24 sm:py-32">
      <div className="container-shell">
        <SectionHeading
          eyebrow="01 / About"
          title={<>A developer who cares about the last 10%.</>}
          description="Curious about the details: how it feels, how it reads, how fast it arrives."
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/15 via-transparent to-accent/15 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
              <img
                src={profile.portrait}
                alt={`Portrait of ${profile.name}`}
                width="720"
                height="720"
                loading="lazy"
                className="aspect-square w-full bg-[#060913] object-contain p-4"
              />
              <div className="flex items-center justify-between border-t border-border px-5 py-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                <span>{profile.role}</span>
                <span className="text-primary">// 2026</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <GooeyTextReveal mode="scroll" duration={1.15} stagger={0.08}>
              <p className="text-xl leading-relaxed text-foreground sm:text-2xl sm:leading-relaxed">
                {profile.about}
              </p>
            </GooeyTextReveal>

            <p className="mt-6 leading-relaxed text-muted-foreground">{profile.lede}</p>

            <dl className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
              {profile.facts.map((fact) => (
                <div key={fact.label} className="bg-card px-5 py-5">
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 text-sm font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {principles.map((principle, index) => {
                const Icon = principleIcons[index];
                return (
                  <div key={principle.title} className="rounded-xl border border-border bg-card/60 p-5">
                    <Icon size={18} className="text-primary" />
                    <h3 className="mt-4 text-sm font-semibold">{principle.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{principle.body}</p>
                  </div>
                );
              })}
            </div>

            <a
              href="#journey"
              className="mt-8 inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-primary hover:underline"
            >
              Follow the journey <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
