"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useCallback, useEffect, useRef } from "react";

import { useAppStore } from "@/store/use-app-store";
import { clamp } from "@/lib/utils";

interface SectionOffset {
  id: string;
  top: number;
}

/**
 * Measures [data-section] elements and, on every Lenis scroll frame, derives
 * the values the rest of the app consumes: overall progress, a float index
 * across sections (drives the 3D character), velocity and the active section.
 */
function ScrollTracker() {
  const offsets = useRef<SectionOffset[]>([]);

  const measure = useCallback(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]"),
    );
    offsets.current = els
      .filter((el) => el.id)
      .map((el) => ({
        id: el.id,
        top: el.getBoundingClientRect().top + window.scrollY,
      }));
    useAppStore.getState().setSectionIds(offsets.current.map((o) => o.id));
  }, []);

  useEffect(() => {
    measure();
    // Re-measure once fonts/images settle, then track layout changes.
    const timer = setTimeout(measure, 600);
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [measure]);

  useLenis(({ scroll, limit, velocity }) => {
    const sections = offsets.current;
    if (sections.length === 0) return;

    // Probe line sits 45% down the viewport: a section becomes "active"
    // when its top crosses it.
    const probe = scroll + window.innerHeight * 0.45;
    let sectionFloat = 0;
    for (let i = 0; i < sections.length; i++) {
      if (probe < sections[i].top) break;
      const next = sections[i + 1]?.top ?? sections[i].top + window.innerHeight;
      const span = Math.max(next - sections[i].top, 1);
      sectionFloat = i + Math.min(1, (probe - sections[i].top) / span);
    }
    sectionFloat = Math.min(sectionFloat, sections.length - 1);

    const activeIndex = clamp(Math.floor(sectionFloat), 0, sections.length - 1);
    useAppStore.getState().setScrollState({
      scrollProgress: limit > 0 ? scroll / limit : 0,
      sectionFloat,
      scrollVelocity: clamp(velocity / 60, -1, 1),
      activeSection: sections[activeIndex].id,
    });
  });

  return null;
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root options={{ lerp: 0.1, touchMultiplier: 1.4 }}>
      <ScrollTracker />
      {children}
    </ReactLenis>
  );
}
