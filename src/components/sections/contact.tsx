"use client";

import { useState } from "react";
import { Check, Copy, FileText, Mail } from "lucide-react";

import { portfolio } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { SocialIcon } from "@/components/ui/social-icon";
import type { ScatterItem } from "@/components/ui/ornaments";

const { contact, personal, socials } = portfolio;

const CONTACT_ORNAMENTS: ScatterItem[] = [
  { kind: "sparkle", top: "22%", left: "12%", size: 18, tone: "accent", speed: 0.6, delay: 0.3, mobile: true },
  { kind: "asterisk", top: "18%", right: "14%", size: 20, tone: "moss", speed: -0.5, spin: true },
  { kind: "cross", bottom: "30%", left: "20%", size: 13, tone: "muted", speed: 0.8, delay: 1.2 },
  { kind: "sparkle", bottom: "24%", right: "18%", size: 13, tone: "moss", speed: 0.5, delay: 1.8, mobile: true },
  { kind: "diamond", top: "48%", left: "6%", size: 10, tone: "accent", speed: -0.4, delay: 0.9 },
  { kind: "ring", top: "40%", right: "6%", size: 26, tone: "muted", speed: 0.6 },
];

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (permissions/insecure context) — mailto still works.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      {personal.email}
      {copied ? (
        <Check className="size-3.5 text-moss" />
      ) : (
        <Copy className="size-3.5 opacity-60 transition-opacity group-hover:opacity-100" />
      )}
    </button>
  );
}

export function Contact() {
  return (
    <Section
      id="contact"
      index={portfolio.testimonials.items.length > 0 ? "07" : "06"}
      eyebrow={contact.eyebrow}
      title={contact.title}
      description={contact.description}
      align="center"
      className="overflow-hidden"
      ornaments={CONTACT_ORNAMENTS}
    >
      <div
        aria-hidden
        className="absolute bottom-[-30%] left-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-accent/8 blur-3xl"
      />

      <div className="mt-12 flex flex-col items-center gap-6">
        <Reveal delay={0.1}>
          <div className="relative">
            {/* Slow-spinning dashed orbits around the CTA */}
            <span
              aria-hidden
              className="absolute top-1/2 left-1/2 -z-10 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/20 animate-spin-slower"
            />
            <span
              aria-hidden
              className="absolute top-1/2 left-1/2 -z-10 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-moss/25 animate-spin-slower [animation-direction:reverse]"
            />
            <Magnetic strength={0.35}>
              <Button size="lg" href={`mailto:${personal.email}`} className="px-10">
                <Mail className="size-4" />
                {contact.ctaLabel}
              </Button>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <CopyEmail />
        </Reveal>

        <Reveal delay={0.22} className="flex flex-wrap justify-center gap-3">
          {[
            { url: personal.resumeUrl, label: contact.resumeLabel },
            { url: personal.cvUrl, label: contact.cvLabel },
          ]
            .filter((doc) => doc.url)
            .map((doc) => (
              <Button
                key={doc.url}
                variant="outline"
                size="sm"
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="size-3.5" />
                {doc.label}
              </Button>
            ))}
        </Reveal>

        <Reveal delay={0.26} className="mt-6 flex items-center gap-3">
          {socials.map((social) => (
            <Magnetic key={social.platform} strength={0.25}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent/50 hover:bg-accent-soft hover:text-accent"
              >
                <SocialIcon platform={social.platform} />
              </a>
            </Magnetic>
          ))}
        </Reveal>

        <Reveal delay={0.32}>
          <p className="text-xs text-muted-foreground/70">
            {contact.note} · {personal.location} ({personal.timezone})
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
