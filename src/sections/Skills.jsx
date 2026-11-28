import { HighlightGrid } from "@/components/ui/highlight-grid";
import LogoSlider from "@/components/ui/logo-slider";
import SectionHeading from "@/components/SectionHeading";
import { skillGroups, skillRows } from "@/data/site";

const stack = ["React", "Vite", "GSAP", "Framer", "Tailwind", "JavaScript", "Git", "Vercel"];

function Wordmark({ name }) {
  return (
    <svg viewBox="0 0 140 44" role="img" aria-label={name}>
      <text
        x="70"
        y="29"
        textAnchor="middle"
        fontFamily="Sora, sans-serif"
        fontSize="20"
        fontWeight="700"
        letterSpacing="0.5"
        fill="currentColor"
      >
        {name}
      </text>
    </svg>
  );
}

export default function Skills() {
  const logos = [...stack, ...stack].map((name, index) => (
    <Wordmark key={`${name}-${index}`} name={name} />
  ));

  return (
    <section id="skills" className="relative overflow-hidden border-t border-border/60 py-24 sm:py-32">
      <div className="container-shell">
        <SectionHeading
          eyebrow="03 / Toolkit"
          title={<>Tools I use to ship quality interfaces.</>}
          description="A practical stack for building responsive, accessible, and interactive web experiences."
        />

        <div className="surface-panel rounded-3xl p-4 sm:p-8">
          <p className="mb-6 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
            Hover or tap to explore
          </p>
          <HighlightGrid
            rows={skillRows}
            colors={["#7dd3fc", "#c4b5fd", "#a7f3d0", "#fda4af", "#93c5fd", "#f0abfc", "#86efac"]}
            transitionDuration={260}
          />
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {skillGroups.map((group) => (
            <article key={group.category} className="surface-panel rounded-2xl p-6">
              <h3 className="text-lg font-semibold">{group.category}</h3>
              <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-primary">
                {group.caption}
              </p>
              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/70" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-20 border-y border-border/70 bg-card/20 py-6 text-muted-foreground">
        <LogoSlider logos={logos} speed={42} direction="left" pauseOnHover />
      </div>
    </section>
  );
}
