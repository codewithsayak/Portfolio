import { HighlightGrid } from "@/components/ui/highlight-grid";
import LogoSlider from "@/components/ui/logo-slider";
import SectionHeading from "@/components/SectionHeading";
import { skillGroups, skillRows } from "@/data/site";

const stack = ["React", "Vite", "GSAP", "Framer", "CSS", "JavaScript", "Git", "Vercel"];

function Wordmark({ name }) {
  return (
    <svg viewBox="0 0 140 44" role="img" aria-label={name}>
      <text
        x="70"
        y="29"
        textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="20"
        fontWeight="700"
        letterSpacing="1"
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
          title={<>What I reach for.</>}
          description="A working stack built for speed, clarity and interaction — plus the things I'm learning next."
        />

        <div className="rounded-2xl border border-border bg-card/40 p-4 sm:p-8">
          <p className="mb-6 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
            Hover a cell to light it up
          </p>
          <HighlightGrid
            rows={skillRows}
            colors={["#55e6ff", "#a78bfa", "#c6f26d", "#ff9f6e", "#7dd3fc", "#f0abfc", "#86efac"]}
            transitionDuration={260}
          />
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.category} className="rounded-xl border border-border bg-card/60 p-6">
              <h3 className="text-lg font-semibold">{group.category}</h3>
              <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-primary">
                {group.caption}
              </p>
              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 border-y border-border bg-card/30 py-6">
        <LogoSlider logos={logos} speed={45} direction="left" pauseOnHover />
      </div>
    </section>
  );
}
