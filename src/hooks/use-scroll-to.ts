"use client";

import { useLenis } from "lenis/react";
import { useCallback } from "react";

import { useAppStore } from "@/store/use-app-store";

/** Smooth-scrolls to a section id (or absolute position), closing the mobile menu. */
export function useScrollTo() {
  const lenis = useLenis();

  return useCallback(
    (target: string | number) => {
      useAppStore.getState().setMenuOpen(false);
      const resolved =
        typeof target === "string" && !target.startsWith("#")
          ? `#${target}`
          : target;
      lenis?.scrollTo(resolved, {
        offset: typeof resolved === "string" ? -72 : 0,
        duration: 1.4,
      });
    },
    [lenis],
  );
}
