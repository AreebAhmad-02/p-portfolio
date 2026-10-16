"use client";

import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

import { portfolio } from "@/lib/data";
import { useAppStore } from "@/store/use-app-store";
import { useScrollTo } from "@/hooks/use-scroll-to";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { ParallaxFloat } from "@/components/ui/parallax-float";
import { OrbitBadge } from "@/components/ui/orbit-badge";
import { Ornament, Scatter, type ScatterItem } from "@/components/ui/ornaments";

const { hero, personal } = portfolio;

const HERO_ORNAMENTS: ScatterItem[] = [
  { kind: "sparkle", top: "20%", left: "3%", size: 18, tone: "accent", speed: 0.6, delay: 0.4, mobile: true },
  { kind: "asterisk", top: "15%", right: "27%", size: 22, tone: "moss", speed: -0.4, spin: true },
  { kind: "ring", top: "32%", right: "7%", size: 28, tone: "muted", speed: 0.8 },
  { kind: "cross", bottom: "27%", left: "9%", size: 14, tone: "muted", speed: -0.5, delay: 1.2 },
  { kind: "sparkle", bottom: "20%", right: "31%", size: 14, tone: "moss", speed: 0.9, delay: 0.8, mobile: true },
  { kind: "diamond", top: "56%", left: "1.5%", size: 10, tone: "accent", speed: 0.4, delay: 1.6 },
  { kind: "cross", top: "12%", left: "38%", size: 12, tone: "muted", speed: 0.7, delay: 2 },
];

export function Hero() {
  const scrollTo = useScrollTo();
  const introDone = useAppStore((s) => s.introPhase === "done");

  return (
    <section
      id="hero"
      data-section
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      {/* Soft light washes — a gentle halo glow in dark mode */}
      <ParallaxFloat
        speed={-0.3}
        className="absolute -top-40 right-[-12%] -z-10"
      >
        <div aria-hidden className="size-[36rem] rounded-full bg-accent/10 blur-3xl dark:bg-accent/15" />
      </ParallaxFloat>
      <ParallaxFloat speed={0.35} className="absolute bottom-[-20%] left-[-10%] -z-10">
        <div aria-hidden className="size-[30rem] rounded-full bg-moss/10 blur-3xl dark:bg-moss/15" />
      </ParallaxFloat>

      <Scatter items={HERO_ORNAMENTS} />

      <div className="mx-auto w-full max-w-6xl px-6 pt-32 pb-24 md:px-10">
        {personal.availability.available && (
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/70 py-1.5 pr-4 pl-3 text-sm text-muted-foreground backdrop-blur-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-moss opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-moss" />
              </span>
              {personal.availability.label}
            </span>
          </Reveal>
        )}

        <Reveal delay={0.08}>
          <p className="mt-8 text-lg text-muted-foreground">{hero.greeting}</p>
        </Reveal>

        <h1 className="mt-3 max-w-3xl font-display text-5xl/[1.06] font-medium tracking-tight text-balance md:text-7xl/[1.04]">
          <TextReveal text={hero.title} delay={0.15} />
        </h1>

        <Reveal delay={0.32}>
          <Ornament kind="squiggle" className="mt-7 h-3 w-28 text-accent/60" />
        </Reveal>

        <Reveal delay={0.4}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {hero.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.5} className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <Button size="lg" onClick={() => scrollTo(hero.primaryCta.target)}>
              {hero.primaryCta.label}
              <ArrowDown className="size-4" />
            </Button>
          </Magnetic>
          <Magnetic>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollTo(hero.secondaryCta.target)}
            >
              {hero.secondaryCta.label}
            </Button>
          </Magnetic>
        </Reveal>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={introDone ? { opacity: 1 } : undefined}
        transition={{ delay: 1.2, duration: 0.9 }}
        className="absolute bottom-20 left-[7%] hidden lg:block"
      >
        <OrbitBadge text={`${personal.role} • ${personal.location} • `} />
      </motion.div>

      <motion.button
        type="button"
        onClick={() => scrollTo("about")}
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={introDone ? { opacity: 1 } : undefined}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2 text-xs tracking-[0.25em] uppercase text-muted-foreground transition-colors hover:text-foreground"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block h-8 w-px bg-gradient-to-b from-muted-foreground/60 to-transparent"
        />
      </motion.button>
    </section>
  );
}
