"use client";

import { ArrowUp } from "lucide-react";

import { portfolio } from "@/lib/data";
import { useScrollTo } from "@/hooks/use-scroll-to";
import { SocialIcon } from "@/components/ui/social-icon";

const { personal, socials, footer } = portfolio;

export function Footer() {
  const scrollTo = useScrollTo();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row md:px-10">
        <p className="text-sm text-muted-foreground">
          © {year} {personal.name}
        </p>

        <p className="order-last text-center text-xs text-muted-foreground/70 md:order-none">
          {footer.note}
        </p>

        <div className="flex items-center gap-2">
          {socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-accent"
            >
              <SocialIcon platform={social.platform} />
            </a>
          ))}
          <button
            type="button"
            onClick={() => scrollTo(0)}
            aria-label="Back to top"
            className="ml-2 inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
          >
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
