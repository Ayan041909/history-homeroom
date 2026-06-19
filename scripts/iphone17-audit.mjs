/**
 * Full mobile audit — iPhone 17 Pro profile (WebKit / Safari)
 * Read-only: does not modify the app.
 */
import { webkit } from "playwright";
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const BASE = "http://localhost:3000";
const OUT = join(process.cwd(), "scripts", "mobile-audit-output", "iphone17");

// iPhone 17 Pro expected CSS viewport (same class as 16/15 Pro)
const IPHONE_17_PRO = {
  viewport: { width: 402, height: 874 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 19_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/19.0 Mobile/15E148 Safari/604.1",
};

const PAGES = [
  { path: "/", name: "landing" },
  { path: "/lessons", name: "lessons" },
  { path: "/events", name: "events" },
  { path: "/resources", name: "resources" },
  { path: "/about", name: "about" },
  { path: "/contact", name: "contact" },
  { path: "/faq", name: "faq" },
  { path: "/login", name: "login" },
];

function push(issues, page, category, msg) {
  issues.push({ page, category, msg });
}

async function auditPage(page, pageName, issues) {
  // Horizontal overflow
  const overflow = await page.evaluate(() => {
    const sw = document.documentElement.scrollWidth;
    const cw = document.documentElement.clientWidth;
    return { scrollWidth: sw, clientWidth: cw, overflow: sw > cw + 2 };
  });
  if (overflow.overflow) {
    push(issues, pageName, "layout", `Horizontal scroll detected (scrollWidth ${overflow.scrollWidth} > viewport ${overflow.clientWidth})`);
  }

  // Invisible tap blockers (opacity ~0, large, intercepting touches)
  const blockers = await page.evaluate(() => {
    const found = [];
    for (const el of document.querySelectorAll("body *")) {
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      if (r.width < 40 || r.height < 40) continue;
      if (s.pointerEvents === "none" || s.display === "none" || s.visibility === "hidden") continue;
      const op = parseFloat(s.opacity);
      if (op < 0.15 && r.top < window.innerHeight && r.bottom > 0) {
        found.push({
          tag: el.tagName,
          cls: (el.className?.toString?.() || "").slice(0, 60),
          op: s.opacity,
          w: Math.round(r.width),
          h: Math.round(r.height),
          y: Math.round(r.top),
        });
      }
    }
    return found.slice(0, 8);
  });
  for (const b of blockers) {
    push(issues, pageName, "invisible-blocker", `${b.tag} opacity=${b.op} ${b.w}x${b.h} at y=${b.y} class="${b.cls}"`);
  }

  // Small tap targets (< 44px)
  const smallTargets = await page.evaluate(() => {
    const bad = [];
    for (const el of document.querySelectorAll('button, a[href], [role="button"], [role="tab"]')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.top > window.innerHeight || r.bottom < 0) continue;
      if (r.width < 44 || r.height < 44) {
        const label = el.getAttribute("aria-label") || el.textContent?.trim().slice(0, 40) || "";
        bad.push({ w: Math.round(r.width), h: Math.round(r.height), label });
      }
    }
    return bad.slice(0, 12);
  });
  for (const t of smallTargets) {
    push(issues, pageName, "tap-target", `Too small (${t.w}x${t.h}px): "${t.label}"`);
  }

  // Text clipped / overflow hidden on visible headings
  const clippedText = await page.evaluate(() => {
    const bad = [];
    for (const el of document.querySelectorAll("h1,h2,h3,p,span")) {
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      if (r.width < 20 || r.height < 10) continue;
      if (r.top > window.innerHeight) break;
      if (el.scrollWidth > el.clientWidth + 4 && s.overflow !== "visible") {
        bad.push({ tag: el.tagName, text: el.textContent?.trim().slice(0, 50), sw: el.scrollWidth, cw: el.clientWidth });
      }
    }
    return bad.slice(0, 6);
  });
  for (const c of clippedText) {
    push(issues, pageName, "text-clip", `${c.tag} clipped: "${c.text}" (${c.sw}px > ${c.cw}px)`);
  }

  // Broken images in viewport
  const brokenImgs = await page.evaluate(() => {
    return Array.from(document.images)
      .filter((img) => {
        const r = img.getBoundingClientRect();
        return r.width > 20 && r.top < window.innerHeight * 2 && (img.naturalWidth === 0 || !img.complete);
      })
      .map((img) => ({ alt: img.alt || "(no alt)", src: (img.src || "").slice(-60) }))
      .slice(0, 8);
  });
  for (const img of brokenImgs) {
    push(issues, pageName, "image", `Failed to load: alt="${img.alt}" src=...${img.src}`);
  }
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const browser = await webkit.launch({ headless: true });
  const context = await browser.newContext(IPHONE_17_PRO);
  const page = await context.newPage();
  const issues = [];

  // ── Landing page deep audit ──
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(3000);

  await page.screenshot({ path: join(OUT, "landing-top.png") });
  await auditPage(page, "landing", issues);

  // Hero background opacity
  const heroBg = await page.evaluate(() => {
    const img = document.querySelector('[aria-label="Hero section"] img');
    const section = document.querySelector('[aria-label="Hero section"]');
    return {
      imgOpacity: img ? getComputedStyle(img).opacity : null,
      hasVisibleBg: section ? section.querySelector('[aria-hidden="true"]')?.getBoundingClientRect().height : 0,
    };
  });
  if (heroBg.imgOpacity && parseFloat(heroBg.imgOpacity) > 0.15) {
    push(issues, "landing", "hero", `Hero background image too visible (opacity ${heroBg.imgOpacity}, should be ~0.07)`);
  }

  // Menu
  try {
    const menuBtn = page.getByRole("button", { name: /open menu|menu/i }).first();
    await menuBtn.click({ timeout: 8000 });
    await page.waitForTimeout(500);
    const menuOpen = await page.getByRole("link", { name: /lessons|all lessons/i }).first().isVisible().catch(() => false);
    if (!menuOpen) push(issues, "landing", "interaction", "Hamburger menu does not open / nav links not visible after tap");
    await page.keyboard.press("Escape").catch(() => {});
    await page.waitForTimeout(300);
  } catch (e) {
    push(issues, "landing", "interaction", `Hamburger menu tap failed: ${e.message.split("\n")[0]}`);
  }

  // Chatbot
  try {
    const chatBtn = page.getByRole("button", { name: /chat assistant|history homeroom assistant/i }).first();
    const chatBox = await chatBtn.boundingBox();
    const hasIcon = await chatBtn.locator("svg, img").first().isVisible().catch(() => false);
    if (!hasIcon) push(issues, "landing", "chatbot", "Chat FAB shows gold circle but no icon/text visible");
    await chatBtn.click({ timeout: 8000 });
    await page.waitForTimeout(600);
    const panelOpen = await page.getByRole("dialog").first().isVisible().catch(() => false);
    if (!panelOpen) push(issues, "landing", "chatbot", "Chatbot FAB tap does not open chat panel");
    if (chatBox && (chatBox.width < 44 || chatBox.height < 44)) {
      push(issues, "landing", "chatbot", `Chat FAB too small (${Math.round(chatBox.width)}x${Math.round(chatBox.height)}px)`);
    }
  } catch (e) {
    push(issues, "landing", "chatbot", `Chatbot error: ${e.message.split("\n")[0]}`);
  }

  // Metrics counters
  await page.locator('section[aria-label="Platform metrics"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(3500);
  await page.screenshot({ path: join(OUT, "landing-metrics.png") });
  const metricsText = await page.locator('section[aria-label="Platform metrics"]').textContent();
  const metricNums = metricsText?.match(/\d[\d,]*/g) || [];
  const allZero = metricNums.length >= 4 && metricNums.every((n) => parseInt(n.replace(/,/g, ""), 10) === 0);
  if (allZero) push(issues, "landing", "metrics", "All metric counters stuck at 0 (curriculum lessons, tutoring formats, etc.)");

  // Events carousel
  await page.locator('[aria-label="Historical events"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: join(OUT, "landing-events-carousel.png") });
  const slideBefore = await page.locator('[aria-label="Historical events"] [aria-roledescription="slide"]').first().innerText().catch(() => "");
  try {
    await page.getByRole("button", { name: /next historical event/i }).click({ timeout: 5000 });
    await page.waitForTimeout(800);
    const slideAfter = await page.locator('[aria-label="Historical events"] [aria-roledescription="slide"]').first().innerText().catch(() => "");
    if (slideBefore === slideAfter) push(issues, "landing", "carousel", "Historical events carousel does not advance on next button tap");
  } catch (e) {
    push(issues, "landing", "carousel", `Events carousel next button: ${e.message.split("\n")[0]}`);
  }

  // Testimonials carousel
  const testimonialSection = page.locator("section").filter({ hasText: /loved by curious minds/i });
  if (await testimonialSection.count()) {
    await testimonialSection.first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await page.screenshot({ path: join(OUT, "landing-testimonials.png") });
    try {
      const before = await testimonialSection.locator("[aria-roledescription='slide']").first().innerText().catch(() => "");
      await testimonialSection.getByRole("button", { name: /next/i }).first().click({ timeout: 5000 });
      await page.waitForTimeout(800);
      const after = await testimonialSection.locator("[aria-roledescription='slide']").first().innerText().catch(() => "");
      if (before === after) push(issues, "landing", "carousel", "Testimonials carousel does not advance");
    } catch (e) {
      push(issues, "landing", "carousel", `Testimonials carousel: ${e.message.split("\n")[0]}`);
    }
  }

  // Pricing scale overflow
  await page.locator("#pricing, [aria-label='Pricing plans']").first().scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForTimeout(500);
  await page.screenshot({ path: join(OUT, "landing-pricing.png") });
  const pricingOverflow = await page.evaluate(() => {
    const card = document.querySelector("#pricing .md\\:scale-\\[1\\.03\\], #pricing [class*='scale']");
    if (!card) return null;
    const r = card.getBoundingClientRect();
    return { w: r.width, right: r.right, vw: window.innerWidth, overflows: r.right > window.innerWidth + 2 };
  });
  if (pricingOverflow?.overflows) {
    push(issues, "landing", "layout", "Highlighted pricing card overflows viewport horizontally");
  }

  // Live sessions banner
  const liveBanner = page.locator("section, div").filter({ hasText: /live session|weekday session/i }).first();
  if (await liveBanner.count()) {
    await liveBanner.scrollIntoViewIfNeeded().catch(() => {});
    const bannerClip = await liveBanner.evaluate((el) => {
      const r = el.getBoundingClientRect();
      const text = el.textContent?.slice(0, 80);
      return { w: r.width, vw: window.innerWidth, text, overflows: r.width > window.innerWidth + 2 };
    }).catch(() => null);
    if (bannerClip?.overflows) push(issues, "landing", "layout", "Live sessions banner overflows or text cut off");
  }

  // Scroll full landing for section shots
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: join(OUT, "landing-bottom.png") });

  // ── Other pages ──
  for (const { path, name } of PAGES.slice(1)) {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: join(OUT, `${name}-top.png`), fullPage: false });
    await auditPage(page, name, issues);

    if (name === "resources") {
      const tabText = await page.evaluate(() => {
        const tabs = document.querySelectorAll('[role="tab"]');
        return Array.from(tabs).map((t) => {
          const s = getComputedStyle(t);
          return { text: t.textContent?.trim(), color: s.color, bg: s.backgroundColor, selected: t.getAttribute("aria-selected") };
        });
      });
      for (const tab of tabText) {
        if (tab.selected === "true") {
          const isLight = tab.bg.includes("255") || tab.bg.includes("252");
          const isWhiteText = tab.color.includes("255, 255, 255") || tab.color === "rgb(255, 255, 255)";
          if (isLight && isWhiteText) push(issues, "resources", "visibility", `Active tab "${tab.text}" has white text on light background (invisible)`);
        }
      }
    }

    if (name === "lessons") {
      const upgradeCta = await page.evaluate(() => {
        const el = Array.from(document.querySelectorAll("*")).find((n) =>
          n.textContent?.includes("Upgrade") && n.textContent?.includes("Premium")
        );
        if (!el) return null;
        const s = getComputedStyle(el);
        return { opacity: s.opacity, visible: parseFloat(s.opacity) > 0.5 };
      });
      if (upgradeCta && !upgradeCta.visible) push(issues, "lessons", "visibility", "Upgrade/Premium CTA invisible (opacity 0)");
    }
  }

  // Hydration warnings in console
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error" && /hydration|mismatch/i.test(msg.text())) consoleErrors.push(msg.text().slice(0, 120));
  });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  if (consoleErrors.length) push(issues, "landing", "console", `React hydration mismatch in console (${consoleErrors.length} errors)`);

  // Output
  const report = {
    device: "iPhone 17 Pro (402x874, WebKit/Safari)",
    timestamp: new Date().toISOString(),
    issueCount: issues.length,
    issues,
  };
  writeFileSync(join(OUT, "report.json"), JSON.stringify(report, null, 2));

  console.log("\n=== iPhone 17 Pro MOBILE AUDIT (WebKit) ===\n");
  const byPage = {};
  for (const i of issues) {
    (byPage[i.page] ||= []).push(i);
  }
  for (const [pg, list] of Object.entries(byPage)) {
    console.log(`\n## ${pg.toUpperCase()} (${list.length} issues)`);
    for (const i of list) console.log(`  [${i.category}] ${i.msg}`);
  }
  console.log(`\nTotal: ${issues.length} issues`);
  console.log(`Screenshots: ${OUT}`);

  await browser.close();
}

main().catch(console.error);
