// Capture the build and the loop frame by frame through window.renderAt, for encode.sh:
//   node capture.mjs <frames-dir> [fps=25] [scale=1] [page=scene.html]
import { mkdir, rm } from 'fs/promises';
import { chromium } from 'playwright';
const [dir, fps = '25', scale = '1', page = 'scene.html'] = process.argv.slice(2);
if (!dir) { console.error('usage: node capture.mjs <frames-dir> [fps] [scale] [page]'); process.exit(1); }
await rm(dir, { recursive: true, force: true });
await mkdir(dir, { recursive: true });
// Playwright's own Chromium by default (npm run setup). PW_CHANNEL=chrome uses the installed Google Chrome instead.
const browser = await chromium.launch(process.env.PW_CHANNEL ? { channel: process.env.PW_CHANNEL } : {});
const tab = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: Number(scale) });
await tab.goto(new URL(page, import.meta.url).href);
await tab.evaluate(() => window.ready);
const n = Math.round((await tab.evaluate(() => window.T_END)) * Number(fps));
const canvas = tab.locator('#c');
for (let i = 0; i < n; i++) {
  await tab.evaluate((t) => window.renderAt(t), i / Number(fps));
  await canvas.screenshot({ path: `${dir}/f${String(i).padStart(4, '0')}.png` });
}
await browser.close();
console.log(`${n} frames in ${dir}`);
