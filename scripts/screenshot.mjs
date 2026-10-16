/* Dev-only visual check: scrolls through the page like a user and screenshots each section. */
import { chromium } from "playwright-core";

const BASE = process.env.BASE_URL ?? "http://localhost:3199";
const OUT = process.env.OUT_DIR ?? "/tmp/portfolio-shots";

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--use-angle=metal"],
});

const errors = [];
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
page.on("pageerror", (err) => errors.push(String(err)));

await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(1100);
await page.screenshot({ path: `${OUT}/00-loader.png` });
// Preloader runs ~2.3s + 0.9s exit; wait it out, then let hero reveals settle.
await page.waitForTimeout(4200);
await page.screenshot({ path: `${OUT}/01-hero.png` });

const sections = ["about", "research", "skills", "projects", "experience", "testimonials", "contact"];
for (const id of sections) {
  // Sections are JSON-driven and may be absent (e.g. empty testimonials) — skip those.
  const present = await page.evaluate((target) => !!document.getElementById(target), id);
  if (!present) {
    console.log(`skip ${id}: not in DOM`);
    continue;
  }
  // Scroll in steps so Lenis + IntersectionObserver behave like a real session.
  await page.evaluate(async (target) => {
    const el = document.getElementById(target);
    const to = el.getBoundingClientRect().top + window.scrollY - 72;
    const from = window.scrollY;
    const steps = 24;
    for (let i = 1; i <= steps; i++) {
      window.scrollTo(0, from + ((to - from) * i) / steps);
      await new Promise((r) => setTimeout(r, 40));
    }
  }, id);
  await page.waitForTimeout(1600);
  await page.screenshot({ path: `${OUT}/0${sections.indexOf(id) + 2}-${id}.png` });
}

// Dark mode
await page.click('button[aria-label="Switch to dark mode"]');
await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}/08-contact-dark.png` });
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(1800);
await page.screenshot({ path: `${OUT}/09-hero-dark.png` });

// Mobile
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto(BASE, { waitUntil: "networkidle" });
await mobile.waitForTimeout(1100);
await mobile.screenshot({ path: `${OUT}/10-loader-mobile.png` });
await mobile.waitForTimeout(4200);
await mobile.screenshot({ path: `${OUT}/10-hero-mobile.png` });
await mobile.click('button[aria-label="Open menu"]');
await mobile.waitForTimeout(900);
await mobile.screenshot({ path: `${OUT}/11-menu-mobile.png` });

console.log("CONSOLE ERRORS:", errors.length ? errors.join("\n---\n") : "none");
await browser.close();
