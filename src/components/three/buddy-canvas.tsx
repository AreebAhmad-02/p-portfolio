"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useReducedMotion } from "motion/react";

import { Buddy, type BuddyPalette } from "@/components/three/buddy";
import { useAppStore } from "@/store/use-app-store";
import { cn } from "@/lib/utils";

const LIGHT: BuddyPalette = {
  body: "#ece1cd",
  visor: "#232a33",
  eye: "#fff3d6",
  accent: "#2076f3",
  cheek: "#d6a0a0",
};

const DARK: BuddyPalette = {
  body: "#e3d7c2",
  visor: "#161c24",
  eye: "#ffeec2",
  accent: "#55c2ff",
  cheek: "#c69694",
};

export default function BuddyCanvas() {
  const { resolvedTheme } = useTheme();
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const pointer = useRef({ x: 0, y: 0 });
  const menuOpen = useAppStore((s) => s.menuOpen);

  // The canvas is pointer-events-none so R3F never sees the mouse;
  // track it globally instead and hand the buddy a ref.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      className={cn(
        "h-full w-full transition-opacity duration-1000",
        ready && !menuOpen ? "opacity-100" : "opacity-0",
      )}
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{ alpha: true, antialias: true }}
        onCreated={(state) => {
          // R3F force-enables pointer events on the canvas, which would
          // swallow hovers/clicks for the whole page under this fixed
          // overlay. The buddy reads the pointer from a window listener,
          // so the canvas never needs hit-testing.
          state.setEvents({ enabled: false });
          state.gl.domElement.style.pointerEvents = "none";
          setReady(true);
        }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 6, 5]} intensity={1.6} />
        <directionalLight position={[-5, 2, -3]} intensity={0.6} color="#ffd9b3" />
        <Buddy
          palette={resolvedTheme === "dark" ? DARK : LIGHT}
          pointer={pointer}
          reduced={!!reduced}
        />
      </Canvas>
    </div>
  );
}
