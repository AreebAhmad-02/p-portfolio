"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

/** Counts up from 0 with a spring when scrolled into view. */
export function AnimatedCounter({
  value,
  suffix = "",
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();

  const spring = useSpring(0, { stiffness: 55, damping: 18 });
  const display = useTransform(spring, (v) => Math.round(v).toString());

  useEffect(() => {
    if (inView) {
      if (reduced) spring.jump(value);
      else spring.set(value);
    }
  }, [inView, value, spring, reduced]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
