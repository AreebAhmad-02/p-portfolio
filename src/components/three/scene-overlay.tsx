"use client";

import dynamic from "next/dynamic";

const BuddyCanvas = dynamic(
  () => import("@/components/three/buddy-canvas"),
  { ssr: false },
);

/**
 * Full-viewport, click-through overlay hosting the 3D companion.
 * Sits above page content but below the navbar and menus.
 * R3F force-enables pointer-events on its internal wrappers, so the
 * descendant override is load-bearing — without it this overlay would
 * swallow every hover and click on the page beneath it.
 */
export function SceneOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 **:pointer-events-none!"
    >
      <BuddyCanvas />
    </div>
  );
}
