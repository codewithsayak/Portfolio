import { GooeyTextReveal } from "@/components/ui/gooey-text-reveal";
import SectionHeading from "@/components/SectionHeading";
import { journey } from "@/data/site";

export default function Journey() {
  return (
    <section id="journey" className="relative border-t border-border/60 py-24 sm:py-32">
      <div className="container-shell">
        <SectionHeading
          eyebrow="05 / Journey"
          title={<>Learning by building, one project at a time.</>}
          description="A quick look at how I’ve been growing as a frontend developer."
        />

        <ol className="relative ml-3 border-l border-border/80 pl-8 sm:ml-6 sm:pl-12">
          {journey.map((item, index) => (
            <li key={item.year} className="relative pb-14 last:pb-0">
              <span className="absolute -left-[2.65rem] top-1 grid h-7 w-7 place-items-center rounded-full border border-primary/40 bg-background font-mono text-[0.62rem] text-primary sm:-left-[3.72rem]">
                {index + 1}
              </span>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-primary">
                {item.year} · {item.tag}
              </span>
              <GooeyTextReveal mode="scroll" duration={0.95} stagger={0.07} className="mt-3">
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{item.title}</h3>
              </GooeyTextReveal>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
