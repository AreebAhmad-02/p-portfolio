"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useLenis } from "lenis/react";

import { portfolio } from "@/lib/data";
import { useAppStore, type IntroPhase } from "@/store/use-app-store";

/**
 * Intro loading screen. The 3D buddy (rendered by the canvas overlay above
 * this panel) holds the center of the screen while a counter runs; when it
 * completes, the camera dives INTO the buddy's face — its dark visor engulfs
 * the viewport — and the home page fades in from that darkness.
 */
export function Preloader() {
  const introPhase = useAppStore((s) => s.introPhase);
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const [flashGone, setFlashGone] = useState(false);

  // Pin to top and freeze scrolling until the intro fully finishes.
  useEffect(() => {
    if (introPhase !== "done") {
      lenis?.scrollTo(0, { immediate: true });
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [introPhase, lenis]);

  return (
    <>
      <AnimatePresence>
        {introPhase !== "done" && <LoaderOverlay phase={introPhase} />}
      </AnimatePresence>

      {/* Visor-colored bridge: the screen is fully engulfed by the buddy's
          visor when "done" flips, so this layer (same color) takes over and
          fades out — revealing the home page from inside the zoom. */}
      {introPhase === "done" && !flashGone && !reduced && (
        <motion.div
          aria-hidden
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          onAnimationComplete={() => setFlashGone(true)}
          className="pointer-events-none fixed inset-0 z-40 bg-[#232a33] dark:bg-[#161c24]"
        />
      )}
    </>
  );
}

function LoaderOverlay({ phase }: { phase: IntroPhase }) {
  const reduced = useReducedMotion();
  const setIntroPhase = useAppStore((s) => s.setIntroPhase);

  const progress = useMotionValue(0);
  const counter = useTransform(progress, (v) => Math.round(v).toString());
  const barScale = useTransform(progress, (v) => v / 100);

  const zooming = phase === "zoom";

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: reduced ? 0.4 : 2.3,
      ease: [0.65, 0, 0.35, 1],
    });
    controls.then(async () => {
      // Don't reveal mid-FOUT — wait for the display fonts too.
      await document.fonts.ready;
      // Reduced motion skips the zoom and cuts straight to the page.
      setIntroPhase(reduced ? "done" : "zoom");
    });
    return () => controls.stop();
  }, [progress, reduced, setIntroPhase]);

  return (
    <motion.div
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-20 bg-background"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Halo behind the buddy */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl dark:bg-accent/15"
      />

      {/* Wordmark + progress hairline, tucked under the buddy */}
      <motion.div
        animate={zooming ? { opacity: 0, y: 24 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-x-0 top-[68%] flex flex-col items-center gap-5 px-6"
      >
        <p className="font-display text-xl font-medium italic text-muted-foreground">
          {portfolio.personal.name}
        </p>
        <div className="h-[3px] w-44 overflow-hidden rounded-full bg-border">
          <motion.div
            className="h-full w-full origin-left rounded-full bg-accent"
            style={{ scaleX: barScale }}
          />
        </div>
      </motion.div>

      {/* Ghost counter */}
      <motion.p
        aria-hidden
        animate={zooming ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="absolute right-6 bottom-4 font-display text-7xl font-medium italic text-foreground/10 tabular-nums select-none md:right-10 md:text-8xl"
      >
        <motion.span>{counter}</motion.span>
        <span className="text-4xl md:text-5xl">%</span>
      </motion.p>
    </motion.div>
  );
}
