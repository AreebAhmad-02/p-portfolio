import { ArrowUpRight, FileText, FlaskConical } from "lucide-react";

import { portfolio } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { SocialIcon } from "@/components/ui/social-icon";
import type { ScatterItem } from "@/components/ui/ornaments";

const { research, personal, socials } = portfolio;

const RESEARCH_ORNAMENTS: ScatterItem[] = [
  { kind: "sparkle", top: "10%", right: "5%", size: 16, tone: "accent", speed: 0.6, delay: 0.4, mobile: true },
  { kind: "ring", top: "38%", left: "3%", size: 24, tone: "muted", speed: -0.5 },
  { kind: "asterisk", bottom: "22%", right: "4%", size: 20, tone: "moss", speed: 0.5, spin: true },
  { kind: "cross", bottom: "8%", left: "8%", size: 13, tone: "muted", speed: 0.7, delay: 1.3 },
];

function Authors({ authors }: { authors: string[] }) {
  return (
    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
      {authors.map((author, i) => (
        <span key={author}>
          {author === research.highlightAuthor ? (
            <strong className="font-semibold text-foreground">{author}</strong>
          ) : (
            author
          )}
          {i < authors.length - 1 ? ", " : ""}
        </span>
      ))}
    </p>
  );
}

export function Research() {
  const scholar = socials.find((s) => s.platform === "googlescholar");
  const { position } = research;

  return (
    <Section
      id="research"
      index="02"
      eyebrow={research.eyebrow}
      title={research.title}
      description={research.description}
      ornaments={RESEARCH_ORNAMENTS}
    >
      <Reveal delay={0.1}>
        <ul className="mt-10 flex flex-wrap gap-2">
          {research.interests.map((interest) => (
            <li key={interest}>
              <Badge className="bg-accent-soft/60 text-foreground/80">{interest}</Badge>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-12 space-y-6 md:mt-16">
        {research.publications.map((paper, i) => (
          <Reveal key={paper.id} delay={i * 0.08}>
            <article className="group grid gap-8 rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift md:grid-cols-[1fr_14rem] md:p-10">
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold tracking-[0.16em] uppercase text-muted-foreground">
                  <span className="font-display text-base font-medium italic normal-case tracking-normal text-accent">
                    [{i + 1}]
                  </span>
                  <span>
                    {paper.venue} · {paper.year}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-medium tracking-tight text-balance transition-colors group-hover:text-accent md:text-3xl/[1.2]">
                  {paper.title}
                </h3>
                <Authors authors={paper.authors} />
                <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
                  {paper.summary}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {paper.links.map((link) => (
                    <Button
                      key={link.url}
                      variant="outline"
                      size="sm"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                      <ArrowUpRight className="size-3.5" />
                    </Button>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                  Key result
                </p>
                <p className="mt-2 font-display text-5xl font-medium tracking-tight text-accent">
                  {paper.result.value}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {paper.result.label}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-6 flex flex-col gap-6 rounded-3xl border border-dashed border-border p-7 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="flex gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <FlaskConical className="size-4.5" />
            </span>
            <div>
              <p className="font-medium">
                {position.role} · {position.lab}
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  {position.institution}
                </span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground tabular-nums">
                {position.period} · with {position.supervisor}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {position.description}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3">
            {scholar && (
              <Magnetic>
                <Button href={scholar.url} target="_blank" rel="noopener noreferrer">
                  <SocialIcon platform="googlescholar" />
                  {research.scholarLabel}
                </Button>
              </Magnetic>
            )}
            {personal.cvUrl && (
              <Magnetic>
                <Button variant="outline" href={personal.cvUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="size-4" />
                  {research.cvLabel}
                </Button>
              </Magnetic>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
