"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

interface ParallaxFloatProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Drift strength & direction. 1 ≈ 60px of travel across the viewport;
   * negative values drift against the scroll.
   */
  speed?: number;
}

/** Lets an element drift at its own pace while the page scrolls by. */
export function ParallaxFloat({
  children,
  className,
  speed = 0.5,
}: ParallaxFloatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60 * speed, -60 * speed]);

  return (
    <motion.div ref={ref} className={className} style={reduced ? undefined : { y }}>
      {children}
    </motion.div>
  );
}
