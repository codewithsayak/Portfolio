import { ArrowUpRight, Code2 } from "lucide-react";
import AnimatedButton from "@/components/ui/animated-button";
import { CursorCard } from "@/components/ui/cursor-card";
import { GlowBorderCard } from "@/components/ui/glow-border-card";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/data/site";

const featured = projects.filter((project) => project.featured).slice(0, 4);
const archive = projects.filter((project) => !project.featured);

function ProjectCard({ project }) {
  return (
    <GlowBorderCard
      width="100%"
      aspectRatio="auto"
      borderRadius="1rem"
      borderWidth="1.5px"
      blurAmount="0.85em"
      inset="-5px"
      animationDuration={5 + Number(project.index)}
      colorPreset="aurora"
      className="h-full bg-card/80"
    >
      <article className="flex h-full w-full flex-col text-left">
        <div className="overflow-hidden rounded-lg border border-border bg-background">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            width="640"
            height="400"
            loading="lazy"
            className="aspect-[16/10] w-full object-cover transition duration-500 hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
          <div className="flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
            <span>{project.index} / {project.year}</span>
            <span className="text-primary">{project.tags[0]}</span>
          </div>
          <h3 className="mt-3 text-xl font-semibold tracking-tight">{project.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{project.short}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-wider text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.demoUrl ? (
              <AnimatedButton
                as="a"
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="gap-1.5 rounded-full border-primary/40 bg-primary/10 px-4 py-2 text-xs text-primary"
              >
                Live demo <ArrowUpRight size={13} />
              </AnimatedButton>
            ) : null}
            {project.repoUrl ? (
              <AnimatedButton
                as="a"
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="gap-1.5 rounded-full px-4 py-2 text-xs"
              >
                <Code2 size={13} /> Code
              </AnimatedButton>
            ) : null}
          </div>
        </div>
      </article>
    </GlowBorderCard>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative border-t border-border/60 py-24 sm:py-32">
      <div className="container-shell">
        <SectionHeading
          eyebrow="02 / Selected work"
          title={<>Six ideas, shipped.</>}
          description="A few things I've designed and built — from developer tools to interactive dashboards."
        />

        <div className="grid gap-8 sm:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-20 rounded-2xl border border-border bg-card/40 p-6 sm:p-10">
          <p className="section-label">// The archive</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Small projects, real lessons.
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Hover a name for a preview. Each one taught me something about the browser, the
            code, or myself.
          </p>

          <ul className="mt-8 divide-y divide-border">
            {archive.map((project) => {
              const href = project.repoUrl || project.demoUrl || "#work";
              return (
                <li key={project.id} className="flex flex-wrap items-center justify-between gap-4 py-5">
                  <div className="text-lg font-medium sm:text-xl">
                    <CursorCard
                      image={project.image}
                      description={project.description}
                      href={href}
                      className="hover:bg-primary/10 dark:hover:bg-primary/10"
                    >
                      {project.title}
                    </CursorCard>
                  </div>
                  <div className="flex items-center gap-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                    <span>{project.tags.slice(0, 2).join(" · ")}</span>
                    <span className="text-primary/70">{project.year}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
