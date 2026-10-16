import { portfolio } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import type { ScatterItem } from "@/components/ui/ornaments";

const { experience } = portfolio;

const EXPERIENCE_ORNAMENTS: ScatterItem[] = [
  { kind: "asterisk", top: "14%", right: "5%", size: 20, tone: "moss", speed: -0.45, spin: true },
  { kind: "sparkle", top: "44%", left: "3%", size: 15, tone: "accent", speed: 0.7, delay: 0.9, mobile: true },
  { kind: "cross", bottom: "20%", right: "8%", size: 13, tone: "muted", speed: 0.5, delay: 1.5 },
  { kind: "ring", bottom: "10%", left: "6%", size: 22, tone: "muted", speed: -0.6 },
];

export function Experience() {
  return (
    <Section
      id="experience"
      index="05"
      eyebrow={experience.eyebrow}
      title={experience.title}
      description={experience.description}
      ornaments={EXPERIENCE_ORNAMENTS}
    >
      <div className="mt-10 md:mt-16">
        {experience.items.map((job, i) => (
          <Reveal key={`${job.company}-${job.period}`} delay={i * 0.06}>
            <article className="group grid gap-3 border-b border-border py-9 first:border-t md:grid-cols-[1fr_auto] md:gap-10">
              <div>
                <div className="flex items-baseline gap-3">
                  <span
                    aria-hidden
                    className="font-display text-base font-medium italic text-accent/60"
                  >
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-2xl font-medium tracking-tight transition-colors group-hover:text-accent md:text-3xl">
                    {job.role}
                  </h3>
                </div>
                <p className="mt-1.5 font-medium text-accent">
                  {job.url ? (
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 hover:underline"
                    >
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    · {job.location}
                  </span>
                </p>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                  {job.description}
                </p>
                {job.highlights.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {job.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex max-w-2xl gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span aria-hidden className="mt-0.5 text-accent/70">
                          ✦
                        </span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <p className="text-sm font-medium tracking-wide text-muted-foreground tabular-nums md:pt-2 md:text-right">
                {job.period}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
