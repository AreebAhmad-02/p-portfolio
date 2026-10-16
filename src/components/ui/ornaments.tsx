import { cn } from "@/lib/utils";
import { ParallaxFloat } from "@/components/ui/parallax-float";

export type OrnamentKind =
  | "sparkle"
  | "asterisk"
  | "ring"
  | "cross"
  | "diamond"
  | "squiggle";

interface OrnamentProps {
  kind: OrnamentKind;
  className?: string;
  style?: React.CSSProperties;
}

/** Small print-shop ornaments: sparkles, asterisks, registration marks… */
export function Ornament({ kind, className, style }: OrnamentProps) {
  const common = { className: cn("block", className), style, "aria-hidden": true as const };

  switch (kind) {
    case "sparkle":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...common}>
          <path d="M12 0C12.9 6.6 17.4 11.1 24 12C17.4 12.9 12.9 17.4 12 24C11.1 17.4 6.6 12.9 0 12C6.6 11.1 11.1 6.6 12 0Z" />
        </svg>
      );
    case "asterisk":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" {...common}>
          <path d="M12 2v20M3.3 7l17.4 10M20.7 7L3.3 17" />
        </svg>
      );
    case "ring":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
    case "cross":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "diamond":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...common}>
          <path d="M12 3l7.5 9L12 21l-7.5-9L12 3z" />
        </svg>
      );
    case "squiggle":
      return (
        <svg viewBox="0 0 64 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...common}>
          <path d="M2 8c4-6 8 6 12 0s8-6 12 0 8 6 12 0 8-6 12 0 8 6 12 0" />
        </svg>
      );
  }
}

const TONES = {
  accent: "text-accent/50",
  moss: "text-moss/55",
  muted: "text-muted-foreground/30",
} as const;

export interface ScatterItem {
  kind: OrnamentKind;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  /** px */
  size?: number;
  tone?: keyof typeof TONES;
  /** parallax drift, see ParallaxFloat */
  speed?: number;
  spin?: boolean;
  /** seconds, staggers the twinkle */
  delay?: number;
  /** show on small screens too (default: md+ only) */
  mobile?: boolean;
}

/**
 * Sprinkles parallax ornaments around a section's margins.
 * Render inside a `relative` section — it's click-through and sits
 * behind the content.
 */
export function Scatter({ items }: { items: ScatterItem[] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {items.map((item, i) => (
        <div
          key={i}
          className={cn("absolute", !item.mobile && "hidden md:block")}
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
          }}
        >
          <ParallaxFloat speed={item.speed ?? 0.5}>
            <Ornament
              kind={item.kind}
              className={cn(
                TONES[item.tone ?? "muted"],
                item.spin ? "animate-spin-slower" : "animate-twinkle",
              )}
              style={{
                width: item.size ?? 16,
                height: item.kind === "squiggle" ? (item.size ?? 16) / 4 : (item.size ?? 16),
                animationDelay: `${item.delay ?? 0}s`,
              }}
            />
          </ParallaxFloat>
        </div>
      ))}
    </div>
  );
}
