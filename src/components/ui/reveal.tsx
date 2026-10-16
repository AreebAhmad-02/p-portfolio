"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

import { useAppStore } from "@/store/use-app-store";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Fades + lifts children in when they enter the viewport.
 * Holds until the intro preloader finishes so nothing plays behind it.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once, margin: "0px 0px -10% 0px" });
  // Hold until the intro zoom hands the screen over to the page.
  const introDone = useAppStore((s) => s.introPhase === "done");

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      animate={inView && introDone ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
