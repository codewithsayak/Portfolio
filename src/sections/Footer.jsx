import { ArrowUp } from "lucide-react";
import { profile, social } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="container-shell flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-sm font-semibold tracking-[0.18em] text-foreground">
            SK<span className="text-primary">.</span>
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind and motion.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
          <a className="hover:text-primary" href={social.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="hover:text-primary" href={social.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a className="hover:text-primary" href={social.telegram} target="_blank" rel="noreferrer">Telegram</a>
          <a className="hover:text-primary" href={social.email}>Email</a>
        </div>

        <a
          href="#home"
          aria-label="Back to top"
          className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          <ArrowUp size={15} />
        </a>
      </div>
    </footer>
  );
}
