"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  Activity,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Gauge,
  GitBranch,
  MapPin,
  Mic,
  Route,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import type { Project } from "@/types/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SocialIcon } from "@/components/ui/social-icon";
import { TechIcon } from "@/components/ui/tech-icon";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ProjectCardProps {
  project: Project;
  index: number;
}

interface CoverSpec {
  icon: typeof Mic;
  sideIcon: typeof Users;
  screenIcon: typeof ClipboardCheck;
  eyebrow: string;
  metric: string;
  metricLabel: string;
  secondary: string;
  secondaryLabel: string;
  flow: string[];
  highlights: string[];
  bars: number[];
}

const COVER_SPECS: Record<string, CoverSpec> = {
  "skill-finetuning": {
    icon: Sparkles,
    sideIcon: Gauge,
    screenIcon: Activity,
    eyebrow: "Fine-tuning",
    metric: "+20%",
    metricLabel: "delivery at Codeacme",
    secondary: "+4.3%",
    secondaryLabel: "retrieval, tuned BGE",
    flow: ["Data", "LoRA", "Eval", "Deploy"],
    highlights: ["Diffusion", "NL2SQL LLMs", "YOLO"],
    bars: [44, 58, 66, 74, 82, 88, 96],
  },
  "skill-agents": {
    icon: Bot,
    sideIcon: GitBranch,
    screenIcon: Activity,
    eyebrow: "Agents",
    metric: "12+",
    metricLabel: "enterprise agents",
    secondary: "3",
    secondaryLabel: "specialist agents routed",
    flow: ["Ask", "Route", "Act", "Check"],
    highlights: ["LangGraph", "Checkpointed memory", "Model routing"],
    bars: [52, 68, 74, 82, 70, 88, 94],
  },
  "skill-voice": {
    icon: Mic,
    sideIcon: ShieldCheck,
    screenIcon: ClipboardCheck,
    eyebrow: "Voice AI",
    metric: "Live",
    metricLabel: "dealership calls",
    secondary: "Tools",
    secondaryLabel: "multi-tool pipelines",
    flow: ["Call", "Understand", "Tools", "Book"],
    highlights: ["Fewer escalations", "Multi-turn", "CloudWatch"],
    bars: [46, 64, 58, 80, 72, 86, 92],
  },
  "skill-vision": {
    icon: ScanSearch,
    sideIcon: FileText,
    screenIcon: CheckCircle2,
    eyebrow: "Vision & documents",
    metric: "CAD",
    metricLabel: "part-photo matching",
    secondary: "P&ID",
    secondaryLabel: "diagram extraction",
    flow: ["Scan", "Detect", "Extract", "Match"],
    highlights: ["Fine-tuned YOLO", "OpenCV", "OCR"],
    bars: [58, 76, 52, 70, 88, 64, 82],
  },
  "skill-retrieval": {
    icon: Route,
    sideIcon: Gauge,
    screenIcon: Activity,
    eyebrow: "Retrieval & evals",
    metric: "RRF",
    metricLabel: "hybrid fusion",
    secondary: "Evals",
    secondaryLabel: "pre-release checks",
    flow: ["Index", "Retrieve", "Rerank", "Evaluate"],
    highlights: ["pgvector HNSW", "OpenSearch", "RAGAS"],
    bars: [60, 48, 72, 66, 84, 78, 90],
  },
  "skill-mlops": {
    icon: TrendingUp,
    sideIcon: Users,
    screenIcon: Activity,
    eyebrow: "MLOps & quant",
    metric: "A3C",
    metricLabel: "RL vs classical ML",
    secondary: "4",
    secondaryLabel: "engineers led",
    flow: ["Ingest", "Features", "Train", "Deploy"],
    highlights: ["Airflow on MWAA", "CI/CD to Lambda", "Serverless"],
    bars: [54, 74, 46, 82, 88, 69, 78],
  },
};

const DEFAULT_COVER_SPEC: CoverSpec = {
  icon: Gauge,
  sideIcon: GitBranch,
  screenIcon: Activity,
  eyebrow: "Product system",
  metric: "99%",
  metricLabel: "production ready",
  secondary: "API",
  secondaryLabel: "connected stack",
  flow: ["Plan", "Build", "Ship", "Scale"],
  highlights: ["Product UX", "Clean APIs", "Cloud ready"],
  bars: [56, 70, 62, 86, 72, 80, 92],
};

/** Generated cover art for projects without screenshots: product-flavored UI mockups. */
function GeneratedCover({ project, index }: ProjectCardProps) {
  const [from, to] = project.palette;
  const spec = COVER_SPECS[project.id] ?? DEFAULT_COVER_SPEC;
  const MainIcon = spec.icon;
  const SideIcon = spec.sideIcon;
  const ScreenIcon = spec.screenIcon;

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/25 to-transparent" />

      <div className="absolute inset-5 overflow-hidden rounded-[1.35rem] border border-white/20 bg-black/15 shadow-2xl backdrop-blur-[2px]">
        <div className="flex h-11 items-center justify-between border-b border-white/15 bg-white/10 px-4 text-white">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-coral" />
            <span className="size-2 rounded-full bg-sun" />
            <span className="size-2 rounded-full bg-moss" />
          </div>
          <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-white/70">
            {String(index + 1).padStart(2, "0")} / {spec.eyebrow}
          </p>
        </div>

        <div className="grid h-[calc(100%-2.75rem)] grid-cols-[0.78fr_1.22fr] gap-3 p-3 text-white">
          <div className="flex min-w-0 flex-col gap-3">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-3">
              <div className="flex items-center justify-between">
                <span className="flex size-9 items-center justify-center rounded-xl bg-white/15">
                  <MainIcon className="size-4" />
                </span>
                <span className="rounded-full border border-white/15 bg-black/15 px-2 py-0.5 text-[10px] text-white/75">
                  active
                </span>
              </div>
              <p className="mt-4 font-display text-3xl font-medium leading-none">
                {spec.metric}
              </p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/60">
                {spec.metricLabel}
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-3">
              <div className="flex items-center gap-2">
                <SideIcon className="size-4 text-white/80" />
                <p className="text-xs font-semibold">{spec.secondary}</p>
              </div>
              <p className="mt-1 text-[10px] leading-relaxed text-white/60">
                {spec.secondaryLabel}
              </p>
            </div>

            <div className="hidden flex-wrap gap-1.5 sm:flex">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2 py-1 text-[10px] text-white/75"
                >
                  <TechIcon name={tag} className="size-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid min-w-0 grid-rows-[auto_1fr_auto] gap-3 rounded-2xl border border-white/15 bg-white/10 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg bg-white/15">
                  <ScreenIcon className="size-3.5" />
                </span>
                <div>
                  <p className="text-xs font-semibold">{project.title}</p>
                  <p className="text-[10px] text-white/60">production view</p>
                </div>
              </div>
              <MapPin className="size-3.5 text-white/50" />
            </div>

            <div className="relative min-h-0 overflow-hidden rounded-xl border border-white/15 bg-black/15 p-3">
              <div className="absolute top-3 right-3 left-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[10px] text-white/60">
                  <Activity className="size-3" />
                  signals
                </span>
                <span className="text-[10px] text-white/50">now</span>
              </div>
              <div className="flex h-full items-end gap-1.5 pt-8">
                {spec.bars.map((bar, i) => (
                  <span
                    key={`${bar}-${i}`}
                    className="min-h-6 flex-1 rounded-t-sm bg-white/40"
                    style={{ height: `${bar}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {spec.flow.map((step, i) => (
                <div
                  key={step}
                  className="rounded-lg border border-white/15 bg-black/10 p-1.5"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="size-1.5 rounded-full bg-white/60" />
                    {i < spec.flow.length - 1 ? (
                      <GitBranch className="size-2.5 text-white/40" />
                    ) : (
                      <CheckCircle2 className="size-2.5 text-white/60" />
                    )}
                  </div>
                  <p className="truncate text-[9px] font-medium text-white/70">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute right-4 bottom-4 left-4 hidden gap-2 md:flex">
          {spec.highlights.map((highlight) => (
            <span
              key={highlight}
              className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/20 px-2 py-1 text-[10px] text-white/70 backdrop-blur-md"
            >
              <CheckCircle2 className="size-2.5" />
              {highlight}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const primaryLink = project.links.live || project.links.github;
  const cardRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");

  // The cover drifts inside its frame as the card crosses the viewport.
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const coverY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  // Cursor-following 3D tilt (fine pointers only).
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [4.5, -4.5]), {
    stiffness: 160,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-5.5, 5.5]), {
    stiffness: 160,
    damping: 18,
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!finePointer || reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width);
    pointerY.set((e.clientY - rect.top) / rect.height);
  };

  const resetTilt = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <Reveal delay={(index % 2) * 0.08}>
      <motion.article
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        style={
          reduced
            ? undefined
            : { rotateX, rotateY, transformPerspective: 1100 }
        }
        className="group relative rounded-3xl border border-border shadow-soft transition-[translate,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-lift"
      >
        {/* The 3D tilt above breaks overflow-rounding on composited layers in
            Chromium, so the clip lives on this untransformed frame instead,
            backed by a clip-path. */}
        <div className="relative isolate aspect-[4/3] overflow-hidden rounded-3xl [clip-path:inset(0_round_1.5rem)] md:aspect-[16/11]">
          <motion.div
            style={reduced ? undefined : { y: coverY }}
            className="absolute inset-x-0 -inset-y-[9%]"
          >
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <GeneratedCover project={project} index={index} />
              )}
            </div>
          </motion.div>

          {/* Scrim — fades from clear at the top to near-black at the bottom,
              deepening on hover so the unfurling text stays readable */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/25 to-black/85"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/40 to-black/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          {/* Light sweep across the artwork */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-y-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[160%] transition-transform duration-1000 ease-out group-hover:translate-x-[320%]" />
          </div>

          {/* Whole card opens the project; small buttons below stay clickable */}
          {primaryLink && (
            <a
              href={primaryLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
              className="absolute inset-0"
            />
          )}

          <span className="pointer-events-none absolute top-4 left-4 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-0.5">
            {project.year}
          </span>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 md:p-7">
            <div className="flex items-end justify-between gap-4">
              <h3 className="inline-flex items-center gap-2 font-display text-2xl font-medium tracking-tight text-white md:text-3xl">
                {project.title}
                {primaryLink && (
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 -translate-x-1 translate-y-1 text-white/80 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                )}
              </h3>
              <div className="pointer-events-auto flex shrink-0 items-center gap-2">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} source code`}
                    className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/90 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/30"
                  >
                    <SocialIcon platform="github" />
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} live site`}
                    className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/90 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/30"
                  >
                    <ArrowUpRight className="size-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Details stay tucked away on hover-capable devices and unfurl
                upward on hover; touch devices always see them. */}
            <div className="grid [grid-template-rows:1fr] pointer-fine:[grid-template-rows:0fr] pointer-fine:translate-y-3 pointer-fine:opacity-0 pointer-fine:group-hover:[grid-template-rows:1fr] pointer-fine:group-hover:translate-y-0 pointer-fine:group-hover:opacity-100 transition-all duration-500 ease-out">
              <div className="min-h-0 overflow-hidden">
                <p className="mt-2 line-clamp-2 max-w-xl text-sm leading-relaxed text-white/75">
                  {project.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2 pb-0.5">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white/85 backdrop-blur-sm"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}
