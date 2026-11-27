import { GooeyTextReveal } from "@/components/ui/gooey-text-reveal";

export default function SectionHeading({ eyebrow, title, description, className = "" }) {
  return (
    <div className={`mb-12 max-w-3xl ${className}`}>
      <p className="section-label">// {eyebrow}</p>
      <GooeyTextReveal mode="scroll" duration={1.1} stagger={0.09} className="mt-4">
        <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </GooeyTextReveal>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
