/**
 * Deep mobile visual audit — section screenshots + specific checks
 */
import { chromium, devices } from "playwright";
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const BASE = "http://localhost:3000";
const OUT = join(process.cwd(), "scripts", "mobile-audit-output", "sections");
const iPhone = devices["iPhone 13"];

async function shot(page, name) {
  mkdirSync(OUT, { recursive: true });
  await page.screenshot({ path: join(OUT, `${name}.png`) });
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ ...iPhone, hasTouch: true });
  const page = await context.newPage();
  const issues = [];

  await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2000);

  // Hero
  await shot(page, "01-hero");

  // Trust bar logos — check for oversized elements
  await page.evaluate(() => {
    const trust = Array.from(document.querySelectorAll("*")).find((el) =>
      el.textContent?.includes("FEATURED BY EDUCATORS")
    );
    trust?.scrollIntoView({ block: "center" });
  });
  await page.waitForTimeout(500);
  await shot(page, "02-trust-bar");

  const trustIssues = await page.evaluate(() => {
    const results = [];
    const section = Array.from(document.querySelectorAll("*")).find((el) =>
      el.textContent?.includes("FEATURED BY EDUCATORS") && el.children.length > 0
    );
    if (!section) return [{ msg: "Trust bar section not found" }];
    const parent = section.closest("div")?.parentElement || section.parentElement;
    const els = parent?.querySelectorAll("*") || [];
    for (const el of els) {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      if (rect.width > 120 && rect.height > 80 && style.borderRadius.includes("9999")) {
        results.push({
          tag: el.tagName,
          w: Math.round(rect.width),
          h: Math.round(rect.height),
          text: el.textContent?.slice(0, 30),
          bg: style.backgroundColor,
        });
      }
    }
    return results;
  });
  for (const t of trustIssues) {
    if (t.msg) issues.push(`trust-bar: ${t.msg}`);
    else issues.push(`trust-bar: oversized rounded element ${t.w}x${t.h} "${t.text}"`);
  }

  // Metrics
  await page.locator('section[aria-label="Platform metrics"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(2500);
  await shot(page, "03-metrics");
  const metrics = await page.locator('section[aria-label="Platform metrics"]').textContent();
  issues.push(`metrics text: ${metrics?.replace(/\s+/g, " ").trim()}`);

  // Events carousel
  await page.locator('[aria-label="Historical events"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await shot(page, "04-events-carousel");

  // Testimonials carousel
  const testimonials = page.locator('section').filter({ hasText: "Loved by curious minds" });
  if ((await testimonials.count()) > 0) {
    await testimonials.first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await shot(page, "05-testimonials");
  }

  // Pricing
  await page.locator("#pricing").scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForTimeout(800);
  await shot(page, "06-pricing");

  // Touch target audit (visible mobile controls only)
  const smallTargets = await page.evaluate(() => {
    const results = [];
    const vw = window.innerWidth;
    for (const el of document.querySelectorAll("button, a[href]")) {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      if (rect.width === 0 || rect.height === 0) continue;
      if (rect.left > vw || rect.right < 0) continue;
      if (rect.width < 44 || rect.height < 44) {
        const label = el.getAttribute("aria-label") || el.textContent?.trim()?.slice(0, 30) || "?";
        if (!label.includes("Learn") && !label.includes("Pricing")) {
          results.push({ label, w: Math.round(rect.width), h: Math.round(rect.height) });
        }
      }
    }
    return results.slice(0, 15);
  });
  for (const t of smallTargets) {
    issues.push(`small-touch-target: "${t.label}" ${t.w}x${t.h}px (min 44px recommended)`);
  }

  // Text overflow / clipped text
  const clipped = await page.evaluate(() => {
    const results = [];
    for (const el of document.querySelectorAll("h1,h2,h3,p,span,button,a")) {
      if (el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 0) {
        const text = el.textContent?.trim()?.slice(0, 40);
        if (text && text.length > 5) {
          results.push({ text, sw: el.scrollWidth, cw: el.clientWidth });
        }
      }
    }
    return results.slice(0, 10);
  });
  for (const c of clipped) {
    issues.push(`text-overflow: "${c.text}" scrollWidth ${c.sw} > clientWidth ${c.cw}`);
  }

  // Lessons page invisible blocker
  await page.goto(`${BASE}/lessons`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await shot(page, "07-lessons-top");

  const lessonsBlocker = await page.evaluate(() => {
    for (const el of document.querySelectorAll("*")) {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      if (
        parseFloat(style.opacity) === 0 &&
        rect.width > 100 &&
        rect.height > 100
      ) {
        return {
          class: el.className?.toString?.().slice(0, 100),
          html: el.outerHTML.slice(0, 200),
        };
      }
    }
    return null;
  });
  if (lessonsBlocker) {
    issues.push(`lessons invisible element: ${lessonsBlocker.class}`);
  }

  // Resources tabs
  await page.goto(`${BASE}/resources`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await shot(page, "08-resources");

  const tabContrast = await page.evaluate(() => {
    const tabs = document.querySelectorAll('[role="tab"]');
    return Array.from(tabs).map((t) => {
      const style = getComputedStyle(t);
      return {
        text: t.textContent?.trim(),
        color: style.color,
        bg: style.backgroundColor,
        selected: t.getAttribute("aria-selected"),
      };
    });
  });
  issues.push(`resources tabs: ${JSON.stringify(tabContrast)}`);

  writeFileSync(join(OUT, "deep-report.txt"), issues.join("\n"));
  console.log(issues.join("\n"));
  console.log(`\nSection screenshots: ${OUT}`);

  await browser.close();
}

main().catch(console.error);
