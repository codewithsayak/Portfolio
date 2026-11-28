import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";
import AnimatedButton from "@/components/ui/animated-button";
import { GooeyTextReveal } from "@/components/ui/gooey-text-reveal";
import { LightLines } from "@/components/ui/light-lines";
import { MorphText } from "@/components/ui/morph-text";
import StatsCounter from "@/components/ui/stats-counter";
import { profile, social, stats } from "@/data/site";

export default function Hero() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      <LightLines
        gradientFrom="#0a1330"
        gradientTo="#05060b"
        lineColor="#9db2ff"
        lightColor="#55e6ff"
        linesOpacity={0.09}
        lightsOpacity={0.75}
        speedMultiplier={0.55}
      >
        <div className="container-shell relative flex min-h-[100svh] flex-col items-center justify-center pt-40 pb-24 text-center lg:py-36">
          <div className="grid-noise pointer-events-none absolute inset-0 opacity-40" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-primary/25 bg-primary/5 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              {profile.availability}
            </div>

            <p className="section-label relative z-10">Portfolio / 2026 — Sayak Karmakar</p>

            <GooeyTextReveal
              mode="immediate"
              duration={1.2}
              stagger={0.14}
              className="mt-5"
            >
              <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[6.5rem]">
                I build things
                <br />
                <span className="text-gradient">for the web.</span>
              </h1>
            </GooeyTextReveal>

            <div className="mt-6 w-full">
              <MorphText
                words={profile.roles.map((role) => role.toUpperCase())}
                interval={2600}
                fontSize="clamp(1.35rem, 5vw, 3.4rem)"
                textClassName="text-foreground/85 tracking-tight"
              />
            </div>

            <GooeyTextReveal mode="scroll" duration={1} className="mt-6 max-w-2xl">
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                {profile.tagline} Fast, accessible, and built with a little bit of theatre.
              </p>
            </GooeyTextReveal>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <AnimatedButton
                onClick={() => scrollTo("#work")}
                className="gap-2 rounded-full border-primary/40 bg-primary px-7 py-3 text-sm text-background hover:bg-primary/90"
              >
                View selected work <ArrowUpRight size={16} />
              </AnimatedButton>
              <AnimatedButton
                as="a"
                href={social.email}
                className="gap-2 rounded-full bg-card/60 px-7 py-3 text-sm text-foreground hover:border-primary/40"
              >
                Let&apos;s talk <ArrowDownRight size={16} />
              </AnimatedButton>
            </div>

            <p className="mt-8 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <MapPin size={13} className="text-primary" />
              {profile.location} · {profile.timezone}
            </p>
          </div>

          <div className="relative z-10 mt-16 grid w-full grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-background/80 px-4 py-5">
                <div className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  <StatsCounter value={stat.value} suffix={stat.suffix} duration={1.8} />
                </div>
                <div className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
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
