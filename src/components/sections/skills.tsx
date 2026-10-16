import { Bot, BrainCircuit, Cloud, Database, Gauge, ScanSearch } from "lucide-react";

import { portfolio } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { Marquee } from "@/components/ui/marquee";
import { TechIcon } from "@/components/ui/tech-icon";
import { Ornament, type ScatterItem } from "@/components/ui/ornaments";
import { cn } from "@/lib/utils";

const { skills } = portfolio;

// One per skills group, in portfolio.json order. Cycles if the JSON adds more.
const GROUP_ICONS = [BrainCircuit, Bot, Gauge, Database, ScanSearch, Cloud];

const SKILLS_ORNAMENTS: ScatterItem[] = [
  { kind: "asterisk", top: "12%", left: "4%", size: 20, tone: "accent", speed: -0.4, spin: true },
  { kind: "sparkle", top: "30%", right: "5%", size: 16, tone: "moss", speed: 0.7, delay: 0.6, mobile: true },
  { kind: "cross", bottom: "30%", left: "7%", size: 13, tone: "muted", speed: 0.5, delay: 1.4 },
  { kind: "ring", bottom: "16%", right: "10%", size: 24, tone: "muted", speed: -0.6 },
];

const SEPARATORS = ["asterisk", "sparkle", "diamond"] as const;

function MarqueeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <Marquee reverse={reverse} duration={44}>
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-8">
          <span className="flex items-center gap-4 font-display text-3xl font-medium text-muted-foreground/60 transition-colors hover:text-foreground md:gap-5 md:text-5xl">
            <TechIcon
              name={item}
              className={cn(
                "size-6 shrink-0 md:size-9",
                i % 2 ? "text-moss/60" : "text-accent/60",
              )}
            />
            {item}
          </span>
          <Ornament
            kind={SEPARATORS[i % SEPARATORS.length]}
            className="size-4 shrink-0 text-muted-foreground/35 md:size-5"
          />
        </span>
      ))}
    </Marquee>
  );
}

export function Skills() {
  const half = Math.ceil(skills.marquee.length / 2);

  return (
    <Section
      id="skills"
      index="03"
      eyebrow={skills.eyebrow}
      title={skills.title}
      description={skills.description}
      ornaments={SKILLS_ORNAMENTS}
      bleed={
        <div className="mt-16 space-y-6 md:mt-24">
          <MarqueeRow items={skills.marquee.slice(0, half)} />
          <MarqueeRow items={skills.marquee.slice(half)} reverse />
        </div>
      }
    >
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {skills.groups.map((group, i) => {
          const GroupIcon = GROUP_ICONS[i % GROUP_ICONS.length];
          return (
            <Reveal key={group.title} delay={i * 0.08}>
              <div className="group h-full rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent transition-transform duration-300 group-hover:-rotate-6">
                      <GroupIcon className="size-4.5" />
                    </span>
                    <h3 className="font-medium">{group.title}</h3>
                  </div>
                  <span className="font-display text-sm font-medium italic text-accent/70">
                    0{i + 1}
                  </span>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Badge className="gap-1.5">
                        <TechIcon name={item} className="size-3 opacity-70" />
                        {item}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
