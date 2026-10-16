import { portfolio } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Marquee } from "@/components/ui/marquee";
import { TechIcon } from "@/components/ui/tech-icon";
import { Ornament, type ScatterItem } from "@/components/ui/ornaments";
import { cn } from "@/lib/utils";

const { skills } = portfolio;

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
    />
  );
}
