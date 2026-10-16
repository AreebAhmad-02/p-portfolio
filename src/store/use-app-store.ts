import { create } from "zustand";

interface ScrollState {
  /** Overall page progress, 0..1 */
  scrollProgress: number;
  /** Float index across [data-section] elements, e.g. 2.4 = 40% from section 2 to 3 */
  sectionFloat: number;
  /** Normalized scroll velocity, -1..1 */
  scrollVelocity: number;
  /** id of the section currently in view */
  activeSection: string;
}

export type IntroPhase = "loading" | "zoom" | "done";

interface AppState extends ScrollState {
  /** Ordered ids of tracked sections, measured from the DOM */
  sectionIds: string[];
  menuOpen: boolean;
  /**
   * Intro sequence: "loading" while the counter runs, "zoom" while the
   * buddy leaps at the camera and the panel dissolves, "done" once the
   * page owns the screen.
   */
  introPhase: IntroPhase;
  setSectionIds: (ids: string[]) => void;
  setMenuOpen: (open: boolean) => void;
  setIntroPhase: (phase: IntroPhase) => void;
  setScrollState: (state: ScrollState) => void;
}

/**
 * Rapidly-changing scroll values live here too, but consumers that need them
 * per-frame (the 3D character) read transiently via `useAppStore.getState()`
 * inside rAF loops, so React never re-renders for them. Components subscribe
 * reactively only to discrete state (activeSection, menuOpen).
 */
export const useAppStore = create<AppState>()((set) => ({
  scrollProgress: 0,
  sectionFloat: 0,
  scrollVelocity: 0,
  activeSection: "hero",
  sectionIds: [],
  menuOpen: false,
  introPhase: "loading",
  setSectionIds: (sectionIds) => set({ sectionIds }),
  setMenuOpen: (menuOpen) => set({ menuOpen }),
  setIntroPhase: (introPhase) => set({ introPhase }),
  setScrollState: (state) => set(state),
}));
