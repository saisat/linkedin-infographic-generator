// Render the still at T_STILL: output/<page>.png (1x), @2x and -phone (390 px wide, how most people meet it in the feed),
// then run a layout check on the recorded text boxes.
//   node render.mjs [page=scene.html] [--strict]
import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
const args = process.argv.slice(2);
const strict = args.includes('--strict');
const page = args.find((a) => !a.startsWith('--')) || 'scene.html';
const name = page.replace(/\.html$/, '');
const out = fileURLToPath(new URL('output/', import.meta.url));
await mkdir(out, { recursive: true });
// Playwright's own Chromium by default (npm run setup). PW_CHANNEL=chrome uses the installed Google Chrome instead.
const browser = await chromium.launch(process.env.PW_CHANNEL ? { channel: process.env.PW_CHANNEL } : {});
let boxes = [];
let layout = {};
const notes = [];
for (const [scale, suffix] of [[1, ''], [2, '@2x'], [390 / 1080, '-phone']]) {
  const tab = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: scale });
  const errors = [];
  tab.on('pageerror', (e) => errors.push(e.message));
  // A missing image is a note (avatar falls back to initials); a missing font or script still fails via window.ready or pageerror.
  tab.on('console', (m) => { if (m.type() === 'error' && !m.text().startsWith('Failed to load resource')) errors.push(m.text()); if (m.type() === 'warning' && scale === 1) notes.push(m.text()); });
  await tab.goto(new URL(page, import.meta.url).href);
  await tab.evaluate(() => window.ready);
  if (errors.length) throw new Error(`${page}: ${errors.join('; ')}`);
  if (scale === 1) boxes = await tab.evaluate(() => window.layoutBoxes(window.T_STILL));
  if (scale === 1) layout = await tab.evaluate(() => window.LAYOUT || {});
  await tab.evaluate(() => window.renderAt(window.T_STILL));
  await tab.locator('#c').screenshot({ path: `${out}${name}${suffix}.png` });
  await tab.close();
}
await browser.close();

// Layout check on the boxes drawn at T_STILL: text outside the safe area, type too small for a phone,
// overlapping text, text crossing a panel edge, and panels that partly overlap each other.
const SAFE = layout.safe ?? 48, MIN_SIZE = layout.minSize ?? 22, warn = [];   // a scene can set window.LAYOUT
const texts = boxes.filter((b) => b.kind === 'text'), shapes = boxes.filter((b) => b.kind === 'panel');
const hit = (a, b) => a.x1 < b.x2 - 1 && b.x1 < a.x2 - 1 && a.y1 < b.y2 - 1 && b.y1 < a.y2 - 1;
const inside = (a, b) => a.x1 >= b.x1 - 1 && a.x2 <= b.x2 + 1 && a.y1 >= b.y1 - 1 && a.y2 <= b.y2 + 1;
for (const b of texts) {
  if (b.x1 < SAFE || b.y1 < SAFE || b.x2 > 1080 - SAFE || b.y2 > 1350 - SAFE) warn.push(`outside the ${SAFE}px safe area: "${b.text}"`);
  if (b.size < MIN_SIZE) warn.push(`${Math.round(b.size)}px type is below this scene's ${MIN_SIZE}px minimum (about ${Math.round(b.size * 390 / 1080)}px on a phone): "${b.text}"`);
  for (const p of shapes) if (hit(b, p) && !inside(b, p)) warn.push(`text crosses the edge of ${p.text}: "${b.text}"`);
}
for (let i = 0; i < texts.length; i++) for (let j = i + 1; j < texts.length; j++)
  if (hit(texts[i], texts[j])) warn.push(`text overlaps: "${texts[i].text}" / "${texts[j].text}"`);
for (let i = 0; i < shapes.length; i++) for (let j = i + 1; j < shapes.length; j++)
  if (hit(shapes[i], shapes[j]) && !inside(shapes[i], shapes[j]) && !inside(shapes[j], shapes[i])) warn.push(`shapes overlap: ${shapes[i].text} / ${shapes[j].text}`);
console.log(`${name}: 1x, 2x and phone preview in ${out}`);
for (const n of notes) console.log(`note: ${n}`);
console.log(warn.length ? `layout check: ${warn.length} warning(s)\n  - ${warn.join('\n  - ')}` : `layout check: ${texts.length} text boxes, ${shapes.length} panels OK`);
if (strict && warn.length) process.exit(1);
