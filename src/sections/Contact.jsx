import { useState } from "react";
import { ArrowUpRight, AtSign, Camera, Code2, Mail, Send } from "lucide-react";
import AnimatedButton from "@/components/ui/animated-button";
import SectionHeading from "@/components/SectionHeading";
import { profile, social } from "@/data/site";

const channels = [
  { label: "Email", value: profile.email, href: social.email, icon: Mail },
  { label: "GitHub", value: "@codewithsayak", href: social.github, icon: Code2 },
  { label: "Instagram", value: "@code_with_sayak", href: social.instagram, icon: Camera },
  { label: "Telegram", value: "@codewithsayak", href: social.telegram, icon: AtSign },
];

const fieldClass =
  "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary/60 focus:bg-background/80 focus:outline-none";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const update = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry — ${form.name || "Hello"}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative border-t border-border/60 py-24 sm:py-32">
      <div className="container-shell">
        <SectionHeading
          eyebrow="06 / Contact"
          title={<>Let&apos;s build something worth shipping.</>}
          description="Open to junior roles, freelance work, and interesting collaborations. I usually reply within a day."
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="text-pretty text-2xl leading-relaxed text-foreground sm:text-3xl">
              Have an idea, a role, or a project in mind? I&apos;d love to hear about it.
            </p>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Based in {profile.location}. Working remotely with people everywhere.
            </p>

            <ul className="surface-panel mt-10 divide-y divide-border/80 overflow-hidden rounded-2xl">
              {channels.map((channel) => {
                const Icon = channel.icon;
                const external = channel.href.startsWith("http");
                return (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer" : undefined}
                      className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-primary/5 focus-visible:bg-primary/5"
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-background/50 text-primary">
                        <Icon size={17} aria-hidden="true" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                          {channel.label}
                        </span>
                        <span className="block truncate text-sm text-foreground/90">{channel.value}</span>
                      </span>
                      <ArrowUpRight
                        size={15}
                        aria-hidden="true"
                        className="text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <form
            onSubmit={submit}
            className="surface-panel rounded-3xl p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                  Your name
                </span>
                <input
                  required
                  autoComplete="name"
                  name="name"
                  value={form.name}
                  onChange={update}
                  placeholder="Your name"
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                  Email address
                </span>
                <input
                  required
                  type="email"
                  autoComplete="email"
                  name="email"
                  value={form.email}
                  onChange={update}
                  placeholder="you@example.com"
                  className={fieldClass}
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                Message
              </span>
              <textarea
                required
                name="message"
                value={form.message}
                onChange={update}
                rows={6}
                placeholder="Tell me about your project, role, or idea..."
                className={`${fieldClass} min-h-[140px] resize-y`}
              />
            </label>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-xs font-mono text-[0.65rem] uppercase leading-relaxed tracking-[0.12em] text-muted-foreground">
                This opens your mail app with the message prefilled.
              </p>
              <AnimatedButton
                type="submit"
                className="gap-2 rounded-full border-primary/40 bg-primary px-6 py-3 text-sm font-medium text-background hover:bg-primary/90"
              >
                Send message <Send size={15} aria-hidden="true" />
              </AnimatedButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
