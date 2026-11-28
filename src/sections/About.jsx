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
          title={<>Design-minded frontend, built with engineering discipline.</>}
          description="I care about the details users feel: clarity, speed, accessibility, and motion with intent."
        />

        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="relative">
            <div aria-hidden="true" className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/15 via-transparent to-accent/15 blur-2xl" />
            <div className="surface-panel relative overflow-hidden rounded-3xl">
              <img
                src={profile.portrait}
                alt={`Portrait of ${profile.name}`}
                width="720"
                height="900"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover object-top saturate-[0.9] transition duration-700 hover:saturate-100"
              />
              <div className="flex items-center justify-between border-t border-border/80 px-5 py-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                <span>{profile.role}</span>
                <span className="text-primary">{profile.location}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <GooeyTextReveal mode="scroll" duration={1.1} stagger={0.07}>
              <p className="text-pretty text-xl leading-relaxed text-foreground sm:text-2xl sm:leading-relaxed">
                {profile.about}
              </p>
            </GooeyTextReveal>

            <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">{profile.lede}</p>

            <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
              {profile.facts.map((fact) => (
                <div key={fact.label} className="bg-card/80 px-5 py-5">
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 text-sm font-medium text-foreground">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {principles.map((principle, index) => {
                const Icon = principleIcons[index];
                return (
                  <article key={principle.title} className="surface-panel rounded-2xl p-5 transition-transform duration-200 hover:-translate-y-1">
                    <Icon size={18} className="text-primary" aria-hidden="true" />
                    <h3 className="mt-4 text-sm font-semibold">{principle.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{principle.body}</p>
                  </article>
                );
              })}
            </div>

            <a
              href="#contact"
              className="mt-8 inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:text-primary/80"
            >
              Let&apos;s build something <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
