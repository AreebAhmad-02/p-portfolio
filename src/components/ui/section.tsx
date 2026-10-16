import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { ParallaxFloat } from "@/components/ui/parallax-float";
import { Scatter, type ScatterItem } from "@/components/ui/ornaments";

interface SectionProps {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** Parallax ornaments sprinkled around the section margins. */
  ornaments?: ScatterItem[];
  /** Full-bleed content rendered outside the container (e.g. marquees). */
  bleed?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Shared section shell: anchors scroll tracking via [data-section],
 * and renders the numbered eyebrow + serif title pattern used site-wide,
 * with a ghost outline numeral drifting behind the heading.
 */
export function Section({
  id,
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
  ornaments,
  bleed,
  children,
}: SectionProps) {
  const centered = align === "center";

  return (
    <section
      id={id}
      data-section
      className={cn("relative py-24 md:py-36", className)}
    >
      {ornaments ? <Scatter items={ornaments} /> : null}
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <header className={cn("relative", centered && "flex flex-col items-center text-center")}>
          <ParallaxFloat
            speed={-0.35}
            className={cn(
              "pointer-events-none absolute -top-14 -z-10 hidden select-none md:block",
              centered ? "right-[6%]" : "right-0",
            )}
          >
            <span
              aria-hidden
              className="font-display text-[11rem] leading-none font-medium italic opacity-70 dark:opacity-40"
              style={{ WebkitTextStroke: "1.5px var(--border)", color: "transparent" }}
            >
              {index}
            </span>
          </ParallaxFloat>

          <Reveal>
            <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase text-muted-foreground">
              <span className="font-display text-base font-medium italic normal-case tracking-normal text-accent">
                {index}
              </span>
              <span className="h-px w-8 bg-accent/50" aria-hidden />
              {eyebrow}
            </div>
          </Reveal>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-medium tracking-tight text-balance md:text-5xl/[1.12]">
            <TextReveal text={title} delay={0.1} />
          </h2>
          {description ? (
            <Reveal delay={0.2}>
              <p
                className={cn(
                  "mt-5 max-w-xl leading-relaxed text-muted-foreground",
                  centered && "mx-auto",
                )}
              >
                {description}
              </p>
            </Reveal>
          ) : null}
        </header>
        {children}
      </div>
      {bleed}
    </section>
  );
}
