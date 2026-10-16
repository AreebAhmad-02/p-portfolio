"use client";

import { useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

import { richWords } from "@/lib/rich-text";
import { useAppStore } from "@/store/use-app-store";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  /** Class applied to *accented* words. */
  accentClassName?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Word-by-word staggered reveal. Supports the JSON accent markup,
 * so "*these words*" come in as italic accent type.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  accentClassName = "italic text-accent",
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();
  const introDone = useAppStore((s) => s.introPhase === "done");
  const words = useMemo(() => richWords(text), [text]);

  return (
    <span ref={ref} className={className} aria-label={text.replaceAll("*", "")}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block whitespace-pre">
          <motion.span
            className={cn("inline-block", w.accent && accentClassName)}
            initial={
              reduced ? false : { opacity: 0, y: "0.55em", filter: "blur(6px)" }
            }
            animate={
              inView && introDone
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : undefined
            }
            transition={{
              duration: 0.7,
              delay: delay + i * 0.05,
              ease: EASE,
            }}
          >
            {w.word}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
