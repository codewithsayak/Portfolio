import { ArrowUpRight, Check } from "lucide-react";
import AnimatedButton from "@/components/ui/animated-button";
import { GlowBorderCard } from "@/components/ui/glow-border-card";
import SectionHeading from "@/components/SectionHeading";
import { services } from "@/data/site";

export default function Services() {
  return (
    <section id="services" className="relative border-t border-border/60 py-24 sm:py-32">
      <div className="container-shell">
        <SectionHeading
          eyebrow="04 / Services"
          title={<>Have something in mind?</>}
          description="I take on a small number of projects at a time. Here's where I can help."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <GlowBorderCard
              key={service.id}
              width="100%"
              aspectRatio="auto"
              borderRadius="1rem"
              borderWidth="1.25px"
              blurAmount="0.7em"
              inset="-4px"
              animationDuration={7}
              colorPreset="aurora"
              className="h-full bg-card/80"
            >
              <div className="flex h-full w-full flex-col px-3 py-4">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-primary">
                  {service.id}
                </span>
                <h3 className="mt-4 text-xl font-semibold leading-snug">{service.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-2 border-t border-border pt-5">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                      <Check size={14} className="text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <AnimatedButton
                  as="a"
                  href="#contact"
                  className="mt-7 w-full gap-2 rounded-full border-primary/30 bg-primary/10 py-2.5 text-xs text-primary"
                >
                  Start a conversation <ArrowUpRight size={14} />
                </AnimatedButton>
              </div>
            </GlowBorderCard>
          ))}
        </div>
      </div>
    </section>
  );
}
