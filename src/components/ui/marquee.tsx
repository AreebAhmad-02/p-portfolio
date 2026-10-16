import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  /** Seconds for one full loop. */
  duration?: number;
}

/**
 * CSS-only infinite marquee: content is duplicated and each copy slides
 * -100% of its own width. Pauses on hover, fades at the edges.
 */
export function Marquee({
  children,
  className,
  reverse = false,
  duration = 36,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className={cn(
            "flex w-max shrink-0 items-center gap-8 pr-8 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none",
            reverse && "[animation-direction:reverse]",
          )}
          style={{ animationDuration: `${duration}s` }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
