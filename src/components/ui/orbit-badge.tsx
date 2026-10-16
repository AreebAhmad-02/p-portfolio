"use client";

import { useId } from "react";

import { cn } from "@/lib/utils";
import { Ornament } from "@/components/ui/ornaments";

interface OrbitBadgeProps {
  text: string;
  className?: string;
}

/** Rotating circular text stamp — a little print-shop seal. */
export function OrbitBadge({ text, className }: OrbitBadgeProps) {
  const id = useId();

  return (
    <div aria-hidden className={cn("relative size-28", className)}>
      <svg viewBox="0 0 100 100" className="size-full animate-spin-slower">
        <defs>
          <path
            id={id}
            d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
          />
        </defs>
        <text className="fill-muted-foreground text-[8px] font-semibold tracking-[0.22em] uppercase">
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <Ornament
        kind="sparkle"
        className="absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 text-accent/70 animate-twinkle"
      />
    </div>
  );
}
