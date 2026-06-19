/** Safari/WebKit mobile interaction audit */
import { webkit, devices } from "playwright";

const BASE = "http://localhost:3000";
const iPhone = devices["iPhone 13"];

async function main() {
  const browser = await webkit.launch({ headless: true });
  const context = await browser.newContext({ ...iPhone, hasTouch: true });
  const page = await context.newPage();
  const issues = [];

  await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2500);

  // Menu
  try {
    await page.getByRole("button", { name: /open menu/i }).click({ timeout: 5000 });
    await page.waitForTimeout(400);
    const ok = await page.getByRole("link", { name: "All Lessons" }).isVisible();
    if (!ok) issues.push("Menu click failed (WebKit)");
  } catch (e) {
    issues.push(`Menu error: ${e.message}`);
  }

  // Chat
  try {
    await page.getByRole("button", { name: /chat assistant/i }).click({ timeout: 5000 });
    await page.waitForTimeout(500);
    const ok = await page.getByRole("dialog", { name: /chat assistant/i }).isVisible();
    if (!ok) issues.push("Chat click failed (WebKit)");
    const icon = await page.getByRole("button", { name: /chat assistant/i }).locator("svg").first().boundingBox();
    if (!icon || icon.width < 5) issues.push("Chat icon invisible (WebKit)");
  } catch (e) {
    issues.push(`Chat error: ${e.message}`);
  }

  // Hero bg opacity
  const heroOpacity = await page.evaluate(() => {
    const img = document.querySelector('[aria-label="Hero section"] img');
    return img ? getComputedStyle(img).opacity : "no-img";
  });
  issues.push(`Hero img opacity: ${heroOpacity}`);

  // Metrics
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(3000);
  const metrics = await page.locator('section[aria-label="Platform metrics"]').textContent();
  if (/0\+.*0.*0.*0/.test(metrics?.replace(/\s/g, "") || "")) {
    issues.push(`Metrics stuck at zero (WebKit): ${metrics?.slice(0, 80)}`);
  } else {
    issues.push(`Metrics OK: ${metrics?.replace(/\s+/g, " ").slice(0, 100)}`);
  }

  // Carousel
  await page.locator('[aria-label="Historical events"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  const before = await page.locator('[aria-label="Historical events"] [aria-roledescription="slide"]').first().innerText();
  await page.getByRole("button", { name: /next historical event/i }).click();
  await page.waitForTimeout(700);
  const after = await page.locator('[aria-label="Historical events"] [aria-roledescription="slide"]').first().innerText();
  if (before === after) issues.push("Events carousel stuck (WebKit)");
  else issues.push("Events carousel OK");

  // Invisible blockers count
  const blockers = await page.evaluate(() => {
    let n = 0;
    for (const el of document.querySelectorAll("section *, main *")) {
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      if (parseFloat(s.opacity) < 0.05 && r.width > 80 && r.height > 80 && s.pointerEvents !== "none") n++;
    }
    return n;
  });
  issues.push(`Invisible blockers in viewport area: ${blockers}`);

  console.log("=== WEBKIT (Safari) MOBILE AUDIT ===");
  console.log(issues.join("\n"));

  await browser.close();
}

main().catch(console.error);
