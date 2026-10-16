import { portfolio } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Ornament, type ScatterItem } from "@/components/ui/ornaments";

const { testimonials } = portfolio;

const TESTIMONIALS_ORNAMENTS: ScatterItem[] = [
  { kind: "sparkle", top: "16%", left: "4%", size: 16, tone: "accent", speed: 0.6, delay: 0.4, mobile: true },
  { kind: "ring", top: "30%", right: "5%", size: 24, tone: "muted", speed: -0.5 },
  { kind: "cross", bottom: "18%", left: "8%", size: 12, tone: "muted", speed: 0.7, delay: 1.3 },
  { kind: "asterisk", bottom: "26%", right: "3%", size: 18, tone: "moss", speed: 0.45, spin: true },
];

export function Testimonials() {
  if (testimonials.items.length === 0) return null;

  return (
    <Section
      id="testimonials"
      index="06"
      eyebrow={testimonials.eyebrow}
      title={testimonials.title}
      description={testimonials.description || undefined}
      ornaments={TESTIMONIALS_ORNAMENTS}
    >
      <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-3">
        {testimonials.items.map((testimonial, i) => (
          <Reveal key={testimonial.author} delay={i * 0.08}>
            <figure className="relative flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:-rotate-1 hover:shadow-lift">
              <Ornament
                kind="sparkle"
                className="absolute top-6 right-6 size-3.5 text-accent/40 animate-twinkle"
                style={{ animationDelay: `${i * 0.8}s` }}
              />
              <blockquote>
                <span
                  aria-hidden
                  className="block font-display text-5xl leading-none text-accent/30"
                >
                  &ldquo;
                </span>
                <p className="mt-2 leading-relaxed text-pretty">
                  {testimonial.quote}
                </p>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex size-10 items-center justify-center rounded-full bg-accent-soft font-display text-base italic text-accent"
                >
                  {testimonial.author.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
