import { Code2, Mail } from "lucide-react";
import { SpotlightNavbar } from "@/components/ui/spotlight-navbar";
import { navLinks, social } from "@/data/site";

const items = [{ label: "Home", href: "#home" }, ...navLinks];

export default function Header() {
  const goTo = (item) => {
    const target = document.querySelector(item.href);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", item.href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-3 rounded-2xl border border-border/70 bg-background/70 px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:px-5">
        <a
          href="#home"
          aria-label="Go to top"
          className="group flex items-center gap-2 font-mono text-sm font-semibold tracking-[0.18em] text-foreground"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-primary/40 bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-background">
            SK
          </span>
          <span className="hidden sm:inline text-muted-foreground group-hover:text-foreground transition-colors">PORTFOLIO</span>
        </a>

        <div className="hidden lg:block">
          <SpotlightNavbar
            items={items}
            onItemClick={goTo}
            defaultActiveIndex={0}
            className="!pt-0"
          />
        </div>

        <div className="flex items-center gap-2">
          <a
            href={social.email}
            aria-label="Email Sayak"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/70 text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:text-primary hover:bg-primary/10"
          >
            <Mail size={16} />
          </a>
          <a
            href={social.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/70 text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:text-primary hover:bg-primary/10"
          >
            <Code2 size={16} />
          </a>
        </div>
      </div>

      <nav aria-label="Primary mobile" className="mx-auto mt-3 flex max-w-[1240px] gap-1 overflow-x-auto rounded-2xl border border-border/70 bg-card/75 p-1.5 backdrop-blur-xl lg:hidden">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-full px-3.5 py-2 font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary focus-visible:bg-primary/10 focus-visible:text-primary"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
