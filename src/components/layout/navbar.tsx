"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { Menu, X } from "lucide-react";

import { portfolio } from "@/lib/data";
import { useAppStore } from "@/store/use-app-store";
import { useScrollTo } from "@/hooks/use-scroll-to";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SocialIcon } from "@/components/ui/social-icon";
import { cn } from "@/lib/utils";

const { nav, personal, socials } = portfolio;

export function Navbar() {
  const activeSection = useAppStore((s) => s.activeSection);
  const menuOpen = useAppStore((s) => s.menuOpen);
  const setMenuOpen = useAppStore((s) => s.setMenuOpen);
  const introPhase = useAppStore((s) => s.introPhase);
  const scrollTo = useScrollTo();
  const lenis = useLenis();

  // Freeze page scroll while the mobile menu is open. Never resume while
  // the preloader still owns the scroll lock.
  useEffect(() => {
    if (menuOpen) lenis?.stop();
    else if (introPhase === "done") lenis?.start();
  }, [menuOpen, introPhase, lenis]);

  return (
    <>
      <motion.header
        initial={{ y: -88, opacity: 0 }}
        animate={introPhase === "done" ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 md:top-6"
      >
        <nav
          aria-label="Primary"
          className="flex items-center gap-1 rounded-full border border-border/70 bg-background/75 p-1.5 shadow-soft backdrop-blur-xl"
        >
          <button
            type="button"
            onClick={() => scrollTo(0)}
            aria-label="Back to top"
            className="flex size-9 cursor-pointer items-center justify-center rounded-full font-display text-xl font-medium italic text-accent transition-transform hover:-rotate-6"
          >
            {personal.firstName.charAt(0)}.
          </button>

          <div className="mx-1 hidden h-5 w-px bg-border md:block" aria-hidden />

          <div className="hidden items-center md:flex">
            {nav.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className={cn(
                    "relative cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-muted"
                      transition={{ type: "spring", bounce: 0.22, duration: 0.55 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mx-1 hidden h-5 w-px bg-border md:block" aria-hidden />

          <ThemeToggle />

          <Magnetic strength={0.2} className="hidden sm:block">
            <Button size="sm" onClick={() => scrollTo("contact")}>
              Let&apos;s talk
            </Button>
          </Magnetic>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </nav>
      </motion.header>

      <MobileMenu />
    </>
  );
}

function MobileMenu() {
  const menuOpen = useAppStore((s) => s.menuOpen);
  const scrollTo = useScrollTo();

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 flex flex-col justify-between bg-background px-8 pt-32 pb-12 md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-2">
            {nav.map((item, i) => (
              <motion.button
                key={item.id}
                type="button"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ delay: 0.06 + i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => scrollTo(item.id)}
                className="cursor-pointer text-left font-display text-4xl font-medium tracking-tight transition-colors hover:text-accent"
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3"
          >
            {socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
              >
                <SocialIcon platform={social.platform} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
