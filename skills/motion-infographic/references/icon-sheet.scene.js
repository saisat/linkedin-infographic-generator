// Contact sheet of every icon in kit/icons.js, with logos, for picking names.
const { W, H, ctx, txt, icon, logoChip } = Motion;
const C = TOKENS.color;
for (const s of ['claude', 'nodedotjs', 'ffmpeg', 'python']) IMAGES[s] = logoSrc(s);
window.LAYOUT = { minSize: 13, safe: 24 };
function background() { ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, W, H); }
function content() {
  txt('Icons in kit/icons.js (Lucide 0.468.0, ISC) · npm run icons to add more', 40, 52, { size: 20, weight: 600, color: C.ink });
  const names = Object.keys(ICONS), cols = 6, cw = (W - 80) / cols, ch = 112;
  names.forEach((n, i) => {
    const x = 40 + (i % cols) * cw, y = 80 + Math.floor(i / cols) * ch;
    icon(n, x + cw / 2 - 20, y + 14, 40, { color: C.accent });
    txt(n, x + cw / 2, y + 86, { size: 14, weight: 500, color: C.body, align: 'center' });
  });
  let x = 40; const y = H - 64;
  txt('Logos (context/brand/assets/logos):', 40, y - 14, { size: 14, weight: 600, color: C.muted });
  for (const [k, l] of [['claude', 'Claude'], ['nodedotjs', 'Node.js'], ['ffmpeg', 'FFmpeg'], ['python', 'Python']]) x += logoChip(k, l, x, y) + 10;
}
Motion.start({ background, content, T_END: 1, T_STILL: 0.5, FADE: 0.01 });
