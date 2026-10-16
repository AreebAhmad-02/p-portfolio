import { ArrowUpRight } from "lucide-react";

import { portfolio } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { ProjectCard } from "@/components/sections/project-card";
import type { ScatterItem } from "@/components/ui/ornaments";

const { projects, socials } = portfolio;

const PROJECTS_ORNAMENTS: ScatterItem[] = [
  { kind: "sparkle", top: "8%", left: "5%", size: 16, tone: "moss", speed: 0.6, delay: 0.5, mobile: true },
  { kind: "ring", top: "26%", right: "4%", size: 26, tone: "muted", speed: -0.5 },
  { kind: "asterisk", top: "52%", left: "2.5%", size: 18, tone: "accent", speed: 0.5, spin: true },
  { kind: "cross", bottom: "24%", right: "6%", size: 13, tone: "muted", speed: 0.8, delay: 1.1 },
  { kind: "diamond", bottom: "8%", left: "8%", size: 10, tone: "moss", speed: -0.4, delay: 1.7 },
];

export function Projects() {
  const github = socials.find((s) => s.platform === "github");

  return (
    <Section
      id="projects"
      index="04"
      eyebrow={projects.eyebrow}
      title={projects.title}
      description={projects.description}
      ornaments={PROJECTS_ORNAMENTS}
    >
      <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
        {projects.items.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {github && (
        <Reveal className="mt-14 flex justify-center">
          <Magnetic>
            <Button
              variant="outline"
              href={github.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {projects.moreLabel}
              <ArrowUpRight className="size-4" />
            </Button>
          </Magnetic>
        </Reveal>
      )}
    </Section>
  );
}
