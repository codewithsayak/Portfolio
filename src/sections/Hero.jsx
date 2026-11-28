import { ArrowDownRight, ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import AnimatedButton from "@/components/ui/animated-button";
import { GooeyTextReveal } from "@/components/ui/gooey-text-reveal";
import { LightLines } from "@/components/ui/light-lines";
import { MorphText } from "@/components/ui/morph-text";
import StatsCounter from "@/components/ui/stats-counter";
import { profile, social, stats } from "@/data/site";

export default function Hero() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden pt-28 sm:pt-32">
      <LightLines
        gradientFrom="#0b1224"
        gradientTo="#07090f"
        lineColor="#a5b4fc"
        lightColor="#7dd3fc"
        linesOpacity={0.08}
        lightsOpacity={0.62}
        speedMultiplier={0.5}
      >
        <div className="container-shell relative flex min-h-[calc(100svh-8rem)] flex-col justify-center pb-20">
          <div className="grid-noise pointer-events-none absolute inset-0 opacity-35" />
          <div aria-hidden="true" className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div aria-hidden="true" className="absolute right-0 top-40 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-primary/25 bg-primary/8 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-primary">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              {profile.availability}
            </div>

            <p className="section-label">Portfolio 2026 · {profile.name}</p>

            <GooeyTextReveal mode="immediate" duration={1.15} stagger={0.12} className="mt-6">
              <h1 className="text-balance text-5xl font-semibold leading-[0.93] tracking-[-0.05em] sm:text-7xl lg:text-[6.75rem]">
                Building interfaces
                <br />
                <span className="text-gradient">people remember.</span>
              </h1>
            </GooeyTextReveal>

            <div className="mt-6 w-full">
              <MorphText
                words={profile.roles.map((role) => role.toUpperCase())}
                interval={2600}
                fontSize="clamp(1.1rem, 3.8vw, 2.8rem)"
                textClassName="text-foreground/80 tracking-tight"
              />
            </div>

            <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {profile.tagline} <span className="text-foreground/85">{profile.lede}</span>
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <AnimatedButton
                onClick={() => scrollTo("#work")}
                className="gap-2 rounded-full border-primary/40 bg-primary px-7 py-3.5 text-sm font-medium text-background hover:bg-primary/90"
              >
                View selected work <ArrowUpRight size={16} />
              </AnimatedButton>
              <AnimatedButton
                as="a"
                href={social.email}
                className="gap-2 rounded-full bg-card/60 px-7 py-3.5 text-sm font-medium text-foreground hover:border-primary/40 hover:bg-primary/5"
              >
                Let&apos;s talk <ArrowDownRight size={16} />
              </AnimatedButton>
              <a
                href={social.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-6 py-3.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <Sparkles size={15} className="text-primary" /> GitHub
              </a>
            </div>

            <p className="mt-8 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <MapPin size={13} className="text-primary" />
              {profile.location} · {profile.timezone}
            </p>
          </div>

          <div className="surface-panel relative z-10 mt-16 grid w-full grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border/80 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-background/75 px-5 py-6 text-center sm:px-6 sm:py-7">
                <div className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  <StatsCounter value={stat.value} suffix={stat.suffix} duration={1.8} />
                </div>
                <div className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </LightLines>
    </section>
  );
}
