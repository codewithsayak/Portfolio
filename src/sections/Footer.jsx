import { ArrowUp } from "lucide-react";
import { navLinks, profile, social } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/20">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:items-start">
        <div>
          <p className="font-mono text-sm font-semibold tracking-[0.18em] text-foreground">
            SK<span className="text-primary">.</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Frontend developer focused on clean interfaces, thoughtful motion, and performant web experiences.
          </p>
          <p className="mt-5 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind, and motion.
          </p>
        </div>

        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">Navigate</p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a className="text-sm text-muted-foreground transition-colors hover:text-primary" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">Elsewhere</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground md:justify-end">
            <a className="hover:text-primary" href={social.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="hover:text-primary" href={social.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a className="hover:text-primary" href={social.telegram} target="_blank" rel="noreferrer">Telegram</a>
            <a className="hover:text-primary" href={social.email}>Email</a>
          </div>
          <a
            href="#home"
            aria-label="Back to top"
            className="mt-2 grid h-10 w-10 place-items-center rounded-full border border-border bg-card/50 text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:text-primary hover:bg-primary/10"
          >
            <ArrowUp size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
