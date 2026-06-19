/**
 * Mobile viewport audit — checks layout, visibility, interactivity, and overflow.
 * Run: node scripts/mobile-audit.mjs
 * Requires dev server at http://localhost:3000
 */
import { chromium, devices } from "playwright";
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const BASE = "http://localhost:3000";
const OUT = join(process.cwd(), "scripts", "mobile-audit-output");
const PAGES = [
  { path: "/", name: "landing" },
  { path: "/lessons", name: "lessons" },
  { path: "/events", name: "events" },
  { path: "/resources", name: "resources" },
  { path: "/about", name: "about" },
  { path: "/contact", name: "contact" },
];

const iPhone = devices["iPhone 13"];

function issue(page, category, message, selector = null) {
  return { page, category, message, selector };
}

async function auditPage(page, pageName, url) {
  const findings = [];
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);

  // Horizontal overflow
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      bodyScrollWidth: document.body.scrollWidth,
    };
  });
  if (overflow.scrollWidth > overflow.clientWidth + 2) {
    findings.push(
      issue(pageName, "overflow", `Horizontal overflow: scrollWidth ${overflow.scrollWidth} > clientWidth ${overflow.clientWidth}`)
    );
  }

  // Elements with opacity 0 that block clicks (large invisible overlays)
  const invisibleBlockers = await page.evaluate(() => {
    const results = [];
    const els = document.querySelectorAll("section *, header *, main *");
    for (const el of els) {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      if (
        parseFloat(style.opacity) < 0.05 &&
        rect.width > 50 &&
        rect.height > 50 &&
        style.pointerEvents !== "none" &&
        style.display !== "none" &&
        style.visibility !== "hidden"
      ) {
        results.push({
          tag: el.tagName,
          class: el.className?.toString?.().slice(0, 80) || "",
          w: Math.round(rect.width),
          h: Math.round(rect.height),
          opacity: style.opacity,
        });
      }
    }
    return results.slice(0, 8);
  });
  for (const b of invisibleBlockers) {
    findings.push(
      issue(pageName, "invisible-blocker", `Large near-invisible element (${b.opacity} opacity): ${b.tag} ${b.w}x${b.h} ${b.class}`)
    );
  }

  // Buttons/links with zero size or off-screen
  const brokenTargets = await page.evaluate(() => {
    const results = [];
    const interactive = document.querySelectorAll(
      'button, a[href], [role="button"], input, select, textarea'
    );
    for (const el of interactive) {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      if (rect.width === 0 || rect.height === 0) {
        const label = el.getAttribute("aria-label") || el.textContent?.trim()?.slice(0, 40) || el.tagName;
        results.push({ label, reason: "zero-size", w: rect.width, h: rect.height });
      }
    }
    return results.slice(0, 10);
  });
  for (const t of brokenTargets) {
    findings.push(issue(pageName, "broken-target", `${t.label}: ${t.reason} (${t.w}x${t.h})`));
  }

  // Screenshot full page
  mkdirSync(OUT, { recursive: true });
  await page.screenshot({
    path: join(OUT, `${pageName}.png`),
    fullPage: true,
  });

  return findings;
}

async function auditLandingInteractions(page) {
  const findings = [];
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2000);

  // Menu button
  const menuBtn = page.getByRole("button", { name: /open menu|close menu/i });
  if ((await menuBtn.count()) === 0) {
    findings.push(issue("landing", "menu", "Mobile menu button not found"));
  } else {
    await menuBtn.first().click({ timeout: 5000 });
    await page.waitForTimeout(400);
    const menuVisible = await page.locator('a[href="/lessons"]').first().isVisible().catch(() => false);
    if (!menuVisible) {
      findings.push(issue("landing", "menu", "Menu button click did not reveal navigation links"));
    }
    await menuBtn.first().click().catch(() => {});
  }

  // Chatbot FAB
  const chatBtn = page.getByRole("button", { name: /chat assistant/i });
  if ((await chatBtn.count()) === 0) {
    findings.push(issue("landing", "chatbot", "Chat assistant button not found"));
  } else {
    const iconVisible = await chatBtn.first().evaluate((btn) => {
      const svg = btn.querySelector("svg");
      if (!svg) return { hasSvg: false };
      const r = svg.getBoundingClientRect();
      const style = getComputedStyle(svg);
      return { hasSvg: true, w: r.width, h: r.height, opacity: style.opacity };
    });
    if (!iconVisible.hasSvg || iconVisible.w < 5) {
      findings.push(issue("landing", "chatbot", "Chat button missing visible icon"));
    }
    await chatBtn.first().click({ timeout: 5000 });
    await page.waitForTimeout(500);
    const dialogOpen = await page.getByRole("dialog", { name: /chat assistant/i }).isVisible().catch(() => false);
    if (!dialogOpen) {
      findings.push(issue("landing", "chatbot", "Chat button click did not open dialog"));
    }
  }

  // Metrics counters
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(2500);
  const metricsText = await page.locator('section[aria-label="Platform metrics"]').textContent().catch(() => "");
  if (metricsText.includes("0+") && metricsText.includes("0") && !metricsText.match(/[1-9]/)) {
    findings.push(issue("landing", "metrics", `Counters still at zero after scroll: "${metricsText.replace(/\s+/g, " ").slice(0, 120)}"`));
  }

  // Events carousel
  await page.evaluate(() => {
    const el = document.querySelector('section[aria-label="Historical events carousel"], [aria-label="Historical events"]');
    el?.scrollIntoView({ block: "center" });
  });
  await page.waitForTimeout(800);
  const carouselSection = page.locator('[aria-label="Historical events"]').first();
  if ((await carouselSection.count()) > 0) {
    const before = await carouselSection.locator('[aria-roledescription="slide"]').first().textContent();
    const nextBtn = carouselSection.locator('button').filter({ has: page.locator('svg') }).last();
    if ((await nextBtn.count()) > 0) {
      await nextBtn.click({ timeout: 5000 });
      await page.waitForTimeout(600);
      const after = await carouselSection.locator('[aria-roledescription="slide"]').first().textContent();
      if (before === after) {
        findings.push(issue("landing", "carousel-events", "Events carousel did not advance on next click"));
      }
    }
  }

  // Hero background opacity (should be subtle, not full image)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  const heroBgOpacity = await page.evaluate(() => {
    const img = document.querySelector('[aria-label="Hero section"] .animate-ken-burns, [aria-label="Hero section"] img');
    if (!img) return null;
    return getComputedStyle(img).opacity;
  });
  if (heroBgOpacity && parseFloat(heroBgOpacity) > 0.15) {
    findings.push(issue("landing", "hero-bg", `Hero background too opaque on mobile: opacity ${heroBgOpacity}`));
  }

  return findings;
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    ...iPhone,
    locale: "en-US",
    hasTouch: true,
  });

  const allFindings = [];

  for (const { path, name } of PAGES) {
    const page = await context.newPage();
    try {
      const findings = await auditPage(page, name, `${BASE}${path}`);
      allFindings.push(...findings);
      console.log(`Audited /${name}: ${findings.length} issue(s)`);
    } catch (e) {
      allFindings.push(issue(name, "error", e.message));
      console.error(`Failed ${name}:`, e.message);
    } finally {
      await page.close();
    }
  }

  // Landing-specific interaction tests
  const landingPage = await context.newPage();
  try {
    const landingFindings = await auditLandingInteractions(landingPage);
    allFindings.push(...landingFindings);
    console.log(`Landing interactions: ${landingFindings.length} issue(s)`);
  } catch (e) {
    allFindings.push(issue("landing", "error", e.message));
  } finally {
    await landingPage.close();
  }

  await browser.close();

  const report = {
    timestamp: new Date().toISOString(),
    device: "iPhone 13",
    totalIssues: allFindings.length,
    findings: allFindings,
  };

  writeFileSync(join(OUT, "report.json"), JSON.stringify(report, null, 2));

  console.log("\n=== MOBILE AUDIT REPORT ===");
  console.log(`Total issues: ${allFindings.length}`);
  for (const f of allFindings) {
    console.log(`[${f.page}] ${f.category}: ${f.message}`);
  }
  console.log(`\nScreenshots: ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
