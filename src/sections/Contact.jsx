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
  "w-full rounded-lg border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/60 focus:outline-none";

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
          title={<>Let&apos;s make something good.</>}
          description="Open to junior roles, freelance work and interesting collaborations. I usually reply within a day."
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="text-2xl leading-relaxed text-foreground sm:text-3xl">
              Have an idea, a role, or just a question? My inbox is open.
            </p>
            <p className="mt-4 text-muted-foreground">
              Based in {profile.location}. Working remotely with people everywhere.
            </p>

            <ul className="mt-10 divide-y divide-border rounded-xl border border-border bg-card/50">
              {channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      target={channel.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-primary/5"
                    >
                      <Icon size={17} className="text-primary" />
                      <span className="flex-1">
                        <span className="block font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                          {channel.label}
                        </span>
                        <span className="text-sm">{channel.value}</span>
                      </span>
                      <ArrowUpRight
                        size={15}
                        className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <form
            onSubmit={submit}
            className="rounded-2xl border border-border bg-card/50 p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                  Your name
                </span>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={update}
                  placeholder="Ada Lovelace"
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
                  name="email"
                  value={form.email}
                  onChange={update}
                  placeholder="ada@example.com"
                  className={fieldClass}
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                Tell me about it
              </span>
              <textarea
                required
                name="message"
                value={form.message}
                onChange={update}
                rows={6}
                placeholder="I'd like to talk about..."
                className={`${fieldClass} resize-y`}
              />
            </label>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                Opens your mail app with the message ready.
              </p>
              <AnimatedButton
                type="submit"
                className="gap-2 rounded-full border-primary/40 bg-primary px-6 py-2.5 text-sm text-background"
              >
                Send message <Send size={15} />
              </AnimatedButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
