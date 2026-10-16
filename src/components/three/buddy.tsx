"use client";

import { useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { easing } from "maath";
import type { Group, Mesh, MeshStandardMaterial } from "three";

import { useAppStore } from "@/store/use-app-store";
import { clamp, lerp } from "@/lib/utils";

export interface BuddyPalette {
  body: string;
  visor: string;
  eye: string;
  accent: string;
  cheek: string;
}

interface Waypoint {
  /** Horizontal position as a fraction of viewport width, -0.5..0.5 */
  fx: number;
  /** Vertical position as a fraction of viewport height, -0.5..0.5 */
  fy: number;
  rotY: number;
  scale: number;
  wave?: boolean;
}

/** Where the buddy hangs out for each section, keyed by section id. */
const WAYPOINTS: Record<string, Waypoint> = {
  hero: { fx: 0.27, fy: -0.04, rotY: -0.35, scale: 1 },
  about: { fx: -0.33, fy: -0.13, rotY: 0.4, scale: 0.8 },
  research: { fx: 0.35, fy: 0.2, rotY: -0.35, scale: 0.7 },
  skills: { fx: 0.33, fy: 0.14, rotY: -0.3, scale: 0.8 },
  projects: { fx: -0.36, fy: -0.08, rotY: 0.45, scale: 0.78 },
  experience: { fx: 0.34, fy: 0.0, rotY: -0.4, scale: 0.78 },
  testimonials: { fx: 0.31, fy: 0.16, rotY: -0.3, scale: 0.72 },
  contact: { fx: 0.29, fy: -0.1, rotY: -0.15, scale: 1.05, wave: true },
};
const FALLBACK = WAYPOINTS.hero;
const BASE_SCALE = 0.78;
/** Seconds the intro zoom-into-the-face takes. */
const ZOOM_DURATION = 1.6;

const smoothstep = (t: number) => t * t * (3 - 2 * t);

interface BuddyProps {
  palette: BuddyPalette;
  /** Pointer position in normalized device coords, fed from a window listener. */
  pointer: RefObject<{ x: number; y: number }>;
  reduced: boolean;
}

/**
 * A friendly procedural robot. Reads scroll state transiently from the
 * zustand store every frame and glides between per-section waypoints,
 * so it "follows" the visitor down the page.
 */
export function Buddy({ palette, pointer, reduced }: BuddyProps) {
  const root = useRef<Group>(null);
  const inner = useRef<Group>(null);
  const armL = useRef<Group>(null);
  const armR = useRef<Group>(null);
  const eyeL = useRef<Mesh>(null);
  const eyeR = useRef<Mesh>(null);
  const antennaTip = useRef<MeshStandardMaterial>(null);
  const blink = useRef({ next: 2.2, phase: -1 });
  const intro = useRef({ phase: "loading", zoomStart: 0 });
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (!root.current || !inner.current) return;
    const t = state.clock.elapsedTime;
    const { sectionFloat, sectionIds, scrollVelocity, introPhase } =
      useAppStore.getState();

    const isMobile = viewport.width < 5.4;
    const loadingScale = 1.12 * BASE_SCALE * (isMobile ? 0.72 : 1);
    let waving = false;

    if (introPhase === "zoom" && !reduced) {
      // Intro zoom: fly straight INTO the buddy's face. It grows until the
      // dark visor engulfs the viewport (the camera ends up between its
      // glowing eyes), at which point the page takes over behind a
      // matching dark flash. Deterministic timeline — no damping.
      if (intro.current.phase !== "zoom") {
        intro.current = { phase: "zoom", zoomStart: t };
      }
      const p = Math.min((t - intro.current.zoomStart) / ZOOM_DURATION, 1);
      const zEase = p * p * p; // accelerate toward the camera
      const yEase = smoothstep(p);
      // Land the visor (local y 0.18, front z ~0.51) dead-center, stopping
      // 0.25 world units short of the camera — close enough to cover the
      // frame, far enough to never clip the near plane.
      const visorY = 0.18 * loadingScale;
      const visorZ = 0.51 * loadingScale;
      const zEnd = 8 - 0.25 - visorZ;
      root.current.position.set(
        0,
        lerp(0.06 * viewport.height, -visorY, yEase),
        zEase * zEnd,
      );
      root.current.scale.setScalar(loadingScale);
      inner.current.position.y = 0;
      // Square up to the camera as it approaches.
      easing.dampE(inner.current.rotation, [0, 0, 0], 0.1, delta);
      if (p >= 1) useAppStore.getState().setIntroPhase("done");
    } else {
      // Resolve the two waypoints we're between and glide across the
      // last 55% of the section so the buddy "rests" most of the time.
      const i = Math.floor(sectionFloat);
      const frac = sectionFloat - i;
      const a = WAYPOINTS[sectionIds[i] ?? "hero"] ?? FALLBACK;
      const b = WAYPOINTS[sectionIds[i + 1] ?? ""] ?? a;
      const glide = smoothstep(clamp((frac - 0.45) / 0.55, 0, 1));

      let fx = lerp(a.fx, b.fx, glide);
      let fy = lerp(a.fy, b.fy, glide);
      let rotY = lerp(a.rotY, b.rotY, glide);
      let scale = lerp(a.scale, b.scale, glide) * BASE_SCALE;
      if (isMobile) {
        // Small screens: tuck into the top-right corner as a tiny companion.
        fx = 0.3;
        fy = 0.24;
        scale *= 0.62;
      }
      if (introPhase === "loading") {
        // Preloader pose: hold center stage above the loading panel.
        intro.current.phase = "loading";
        fx = 0;
        fy = 0.06;
        rotY = 0;
        scale = loadingScale;
      }
      waving =
        !reduced && introPhase === "done" && !!(glide > 0.5 ? b : a).wave;

      const margin = 1.15 * scale + 0.15;
      const tx = clamp(
        fx * viewport.width,
        -(viewport.width / 2 - margin),
        viewport.width / 2 - margin,
      );
      const ty = clamp(
        fy * viewport.height,
        -(viewport.height / 2 - margin),
        viewport.height / 2 - margin,
      );

      if (introPhase === "done" && intro.current.phase !== "done") {
        // Hand-off after the leap: reappear at the target spot at zero
        // scale and let the damped scale grow it back in.
        intro.current.phase = "done";
        root.current.position.set(tx, ty, 0);
        root.current.scale.setScalar(0);
      }

      easing.damp3(root.current.position, [tx, ty, 0], 0.5, delta);
      easing.damp3(root.current.scale, [scale, scale, scale], 0.35, delta);

      // Idle hover + look toward the cursor, banking with scroll velocity.
      const bob = reduced ? 0 : Math.sin(t * 1.6) * 0.07;
      inner.current.position.y = bob;
      const px = reduced ? 0 : pointer.current.x;
      const py = reduced ? 0 : pointer.current.y;
      easing.dampE(
        inner.current.rotation,
        [
          -py * 0.14 + (reduced ? 0 : Math.sin(t * 0.9) * 0.03),
          rotY + px * 0.24,
          clamp(-scrollVelocity * 0.4, -0.4, 0.4),
        ],
        0.25,
        delta,
      );
    }

    // Arms: gentle sway, or an excited wave at the contact section.
    if (armR.current && armL.current) {
      const sway = reduced ? 0 : Math.sin(t * 1.8) * 0.08;
      easing.damp(
        armR.current.rotation,
        "z",
        waving ? -2.3 + Math.sin(t * 7) * 0.45 : -0.3 - sway,
        0.2,
        delta,
      );
      armL.current.rotation.z = 0.3 + sway;
    }

    // Random blinks.
    if (blink.current.phase < 0 && t >= blink.current.next) {
      blink.current.phase = 0;
    }
    if (blink.current.phase >= 0) {
      blink.current.phase += delta / 0.22;
      if (blink.current.phase >= 1) {
        blink.current.phase = -1;
        blink.current.next = t + 2 + Math.random() * 3.5;
      }
    }
    const lid =
      blink.current.phase < 0
        ? 1
        : 1 - Math.sin(Math.PI * Math.min(blink.current.phase, 1)) * 0.92;
    if (eyeL.current && eyeR.current) {
      eyeL.current.scale.y = lid;
      eyeR.current.scale.y = lid;
    }

    if (antennaTip.current) {
      // The antenna doubles as the loading indicator: it pulses fast and
      // bright through the intro, then settles into a slow glow.
      antennaTip.current.emissiveIntensity = reduced
        ? 0.8
        : introPhase === "done"
          ? 0.8 + Math.sin(t * 2.4) * 0.45
          : 1.1 + Math.sin(t * 7) * 0.6;
    }
  });

  return (
    <group ref={root} scale={0}>
      <group ref={inner}>
        {/* Body */}
        <mesh>
          <capsuleGeometry args={[0.55, 0.55, 12, 32]} />
          <meshStandardMaterial color={palette.body} roughness={0.55} />
        </mesh>

        {/* Visor */}
        <RoundedBox args={[0.8, 0.5, 0.34]} radius={0.16} smoothness={8} position={[0, 0.18, 0.34]}>
          <meshStandardMaterial color={palette.visor} roughness={0.25} metalness={0.1} />
        </RoundedBox>

        {/* Eyes */}
        <mesh ref={eyeL} position={[-0.17, 0.2, 0.53]}>
          <capsuleGeometry args={[0.055, 0.08, 6, 12]} />
          <meshStandardMaterial
            color={palette.eye}
            emissive={palette.eye}
            emissiveIntensity={0.85}
            roughness={0.3}
          />
        </mesh>
        <mesh ref={eyeR} position={[0.17, 0.2, 0.53]}>
          <capsuleGeometry args={[0.055, 0.08, 6, 12]} />
          <meshStandardMaterial
            color={palette.eye}
            emissive={palette.eye}
            emissiveIntensity={0.85}
            roughness={0.3}
          />
        </mesh>

        {/* Cheeks */}
        <mesh position={[-0.3, 0.04, 0.49]} scale={[1, 0.75, 0.4]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color={palette.cheek} roughness={0.6} />
        </mesh>
        <mesh position={[0.3, 0.04, 0.49]} scale={[1, 0.75, 0.4]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color={palette.cheek} roughness={0.6} />
        </mesh>

        {/* Antenna */}
        <mesh position={[0, 0.97, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.3, 12]} />
          <meshStandardMaterial color={palette.visor} roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.16, 0]}>
          <sphereGeometry args={[0.075, 24, 24]} />
          <meshStandardMaterial
            ref={antennaTip}
            color={palette.accent}
            emissive={palette.accent}
            emissiveIntensity={0.8}
            roughness={0.35}
          />
        </mesh>

        {/* Arms */}
        <group ref={armL} position={[-0.6, 0.08, 0]}>
          <mesh position={[0, -0.24, 0]}>
            <capsuleGeometry args={[0.09, 0.28, 8, 16]} />
            <meshStandardMaterial color={palette.body} roughness={0.55} />
          </mesh>
        </group>
        <group ref={armR} position={[0.6, 0.08, 0]}>
          <mesh position={[0, -0.24, 0]}>
            <capsuleGeometry args={[0.09, 0.28, 8, 16]} />
            <meshStandardMaterial color={palette.body} roughness={0.55} />
          </mesh>
        </group>

        {/* Belly dot */}
        <mesh position={[0, -0.38, 0.51]} scale={[1, 1, 0.35]}>
          <sphereGeometry args={[0.07, 20, 20]} />
          <meshStandardMaterial color={palette.accent} roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}
