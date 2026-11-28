import { Code2, Mail } from "lucide-react";
import { SpotlightNavbar } from "@/components/ui/spotlight-navbar";
import { navLinks, profile, social } from "@/data/site";

const items = [{ label: "Home", href: "#home" }, ...navLinks];

export default function Header() {
  const goTo = (item) => {
    const target = document.querySelector(item.href);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", item.href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-background/95 via-background/80 to-transparent px-5 pt-4 pb-4 sm:px-8 lg:bg-none lg:pt-5 lg:pb-0">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4">
        <a
          href="#home"
          aria-label={`${profile.name} — back to top`}
          className="group flex items-center gap-2.5 font-mono text-sm font-semibold tracking-[0.2em] text-foreground"
        >
          <img
            src={profile.badge}
            srcSet={profile.badgeSrcSet}
            sizes="(min-width: 640px) 44px, 40px"
            alt=""
            width={44}
            height={44}
            decoding="async"
            fetchPriority="high"
            className="h-10 w-10 shrink-0 rounded-full object-contain transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11"
          />
          <span className="hidden sm:inline">/ PORTFOLIO_v2</span>
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
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card/70 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <Mail size={16} />
          </a>
          <a
            href={social.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card/70 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <Code2 size={16} />
          </a>
        </div>
      </div>

      <nav className="mx-auto mt-3 flex max-w-full gap-1 overflow-x-auto rounded-full border border-border bg-card/80 p-1 backdrop-blur-xl lg:hidden">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-full px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground hover:bg-primary/10 hover:text-primary"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
