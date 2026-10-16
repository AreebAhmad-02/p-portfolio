import Image from "next/image";
import { MapPin } from "lucide-react";

import { portfolio } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { ParallaxFloat } from "@/components/ui/parallax-float";
import { Ornament, type ScatterItem } from "@/components/ui/ornaments";

const { about, personal } = portfolio;

const ABOUT_ORNAMENTS: ScatterItem[] = [
  { kind: "sparkle", top: "14%", right: "6%", size: 18, tone: "accent", speed: 0.7, delay: 0.3, mobile: true },
  { kind: "cross", top: "40%", right: "3%", size: 13, tone: "muted", speed: -0.5, delay: 1 },
  { kind: "asterisk", bottom: "18%", left: "3%", size: 20, tone: "moss", speed: 0.5, spin: true },
  { kind: "diamond", top: "24%", left: "44%", size: 9, tone: "moss", speed: 0.9, delay: 1.8 },
];

export function About() {
  return (
    <Section
      id="about"
      index="01"
      eyebrow={about.eyebrow}
      title={about.title}
      description={about.description}
      ornaments={ABOUT_ORNAMENTS}
    >
      <div className="mt-14 grid items-start gap-12 md:mt-20 md:grid-cols-[5fr_7fr] md:gap-16">
        {/* Portrait card — falls back to a typographic card when no avatar is set */}
        <Reveal className="relative">
          <ParallaxFloat speed={0.25}>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-accent-soft via-card to-muted shadow-soft">
                {personal.avatar ? (
                  <Image
                    src={personal.avatar}
                    alt={`Portrait of ${personal.name}`}
                    fill
                    sizes="(min-width: 768px) 40vw, 90vw"
                    className="object-cover"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center font-display text-[11rem] font-medium italic text-accent/15 select-none"
                  >
                    {personal.firstName.charAt(0)}
                  </span>
                )}
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/80 px-3 py-1.5 text-xs font-medium backdrop-blur-md">
                  <MapPin className="size-3 text-accent" />
                  {personal.location} · {personal.timezone}
                </span>
              </div>

              {/* Washi-tape corners */}
              <span
                aria-hidden
                className="absolute -top-3 left-7 h-7 w-24 -rotate-6 rounded-[3px] border border-foreground/5 bg-accent-soft/80 backdrop-blur-[1px]"
              />
              <span
                aria-hidden
                className="absolute -bottom-3 right-10 h-7 w-20 rotate-3 rounded-[3px] border border-foreground/5 bg-moss/15 backdrop-blur-[1px]"
              />

              <div className="absolute -top-3 -right-3 rotate-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft transition-transform duration-300 hover:rotate-0 md:-right-6">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                  Currently
                </p>
                <p className="mt-0.5 max-w-44 text-xs font-medium">{about.currently}</p>
              </div>
            </div>
          </ParallaxFloat>
        </Reveal>

        <div>
          {about.paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p
                className={
                  i === 0
                    ? "text-lg leading-relaxed font-medium md:text-xl"
                    : "mt-5 leading-relaxed text-muted-foreground"
                }
              >
                {paragraph}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <p className="mt-8 font-display text-3xl italic text-accent/80">
              {about.signature}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {about.stats.map((stat, i) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="flex items-start gap-1.5 font-display text-3xl font-medium md:text-5xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    <Ornament
                      kind="sparkle"
                      className="mt-1 size-3 text-accent/50 animate-twinkle md:size-3.5"
                      style={{ animationDelay: `${i * 0.7}s` }}
                    />
                  </dd>
                  <p className="mt-2 text-xs text-muted-foreground md:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
