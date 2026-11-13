// Feed starter: a 1080 x 1350 infographic readable at phone size (headline, icon steps, stat, bars, author, CTA).
// The one file to edit per graphic: COPY, timing and the layout in content(t). The brand comes from brand.js.
// Everything is a function of t (seconds), so the still, the MP4 and the GIF always match.

// ---------- copy: take it verbatim from the author's post or brief ----------
const COPY = {
  kicker: 'KICKER · TOPIC',
  headline: 'One clear takeaway,\nin two short lines',
  sub: 'One line on who it is for, or what they get.',
  steps: [   // [title, detail, Lucide icon from kit/icons.js]
    ['Name the real action first', 'Lead each line with a verb the reader can do', 'pen-line'],
    ['Keep one idea per row', 'Split dense material into a second graphic', 'layers'],
    ['Use only cleared numbers', 'Every metric comes from identity/proof.md', 'shield-check'],
    ['End with a real next step', 'Or leave the call to action out', 'flag'],
  ],
  stat: { value: 72, suffix: '%', label: 'SAMPLE NUMBER', note: 'Replace with a metric from proof.md' },
  bars: { title: 'Before vs after (sample)', rows: [['Before', 0.34, '34'], ['After', 0.81, '81']] },
  author: { name: 'SaiSatish Vedam', role: 'Product Executive · productleadership.com', initials: 'SV' },
  cta: 'Comment KEYWORD',
};

// ---------- timing ----------
const T_BUILD = 2.6;              // everything is on screen by here, in reading order
const T_LOOP = 4;                 // every running motion repeats within T_LOOP (use divisors of it)
const T_END = T_BUILD + 2 * T_LOOP;
const T_STILL = T_BUILD + 1.4;    // the still is the fully built, running graphic

const { W, H, ctx, txt, wrap, panel, chip, bar, ring, iconBadge, count, avatar, enter, prog, ease, rr } = Motion;
const C = TOKENS.color, M = 80; // M: side margin; keep text inside it

function background(t) {
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
  // Dot grid drifting exactly one cell per loop, so it is seamless.
  const g = 36, off = ((t % T_LOOP) / T_LOOP) * g;
  ctx.fillStyle = 'rgba(26,26,26,0.05)';
  for (let y = -g; y < H + g; y += g) for (let x = -g; x < W + g; x += g) { ctx.beginPath(); ctx.arc(x + off, y + off, 1.6, 0, Math.PI * 2); ctx.fill(); }
}

function content(t) {
  // The layout flows top-down: each block starts where the previous one ended, so longer copy
  // pushes content down instead of colliding. render.mjs warns if anything then overflows.
  const IW = W - 2 * M;

  // Header
  let e = enter(t, 0.1);
  txt(COPY.kicker, M, 130 + e.dy, { size: 24, weight: 600, color: C.accentText, ls: 3, alpha: e.a });
  e = enter(t, 0.25, 0.5, 30);
  const hy = wrap(COPY.headline, M, 214 + e.dy, IW, 78, { size: 64, weight: 700, color: C.ink, alpha: e.a, ls: -0.5 }) - e.dy;
  e = enter(t, 0.5);
  const subY = hy + 58;
  txt(COPY.sub, M, subY + e.dy, { size: 30, weight: 400, color: C.body, alpha: e.a });

  // Steps panel
  const py = subY + 40, rowH = 98, ph = rowH * COPY.steps.length + 40;
  e = enter(t, 0.7, 0.4, 30);
  panel(M - 20, py + e.dy, IW + 40, ph, { alpha: e.a, stroke: C.line, shadow: 'rgba(0,0,0,0.05)', blur: 12, offY: 4, name: 'steps panel' });
  // Loop: a highlight steps through the rows, one row per quarter loop.
  const looping = t >= T_BUILD, n = COPY.steps.length, slot = T_LOOP / n;
  const active = Math.floor(((t - T_BUILD) / slot) % n);
  const glow = looping ? ease.inOut(prog((t - T_BUILD) % slot, 0, 0.35)) : 0;
  COPY.steps.forEach(([title, detail, glyph], i) => {
    const s0 = 0.8 + i * 0.22, r = enter(t, s0, 0.4, 20), y = py + 20 + i * rowH + r.dy;
    if (looping && i === active) {   // the one loop motion: a chartreuse wash plus a Turf Green edge on the active row
      ctx.save(); ctx.globalAlpha = 0.16 * glow; rr(M - 4, y + 5, IW + 8, rowH - 10, TOKENS.controlRadius); ctx.fillStyle = C.highlight; ctx.fill();
      ctx.globalAlpha = glow; rr(M - 4, y + 17, 6, rowH - 34, 3); ctx.fillStyle = C.accent; ctx.fill(); ctx.restore();
    }
    iconBadge(glyph, M + 34, y + rowH / 2, 27, { k: prog(t, s0 + 0.05, 0.7), alpha: r.a });
    txt(title, M + 86, y + 44, { size: 34, weight: 600, color: C.ink, alpha: r.a });
    txt(detail, M + 86, y + 80, { size: 26, weight: 400, color: C.muted, alpha: r.a });
  });

  // Stat cards
  const sy = py + ph + 32, cx0 = M - 20, cw = (IW + 40 - 30) / 2, ch = 250;  // same outer edges as the steps panel
  e = enter(t, 1.7, 0.4, 30);
  const y0 = sy + e.dy, x2 = cx0 + cw + 30;
  panel(cx0, y0, cw, ch, { alpha: e.a, stroke: C.line, shadow: 'rgba(0,0,0,0.05)', blur: 12, offY: 4, name: 'stat card' });
  panel(x2, y0, cw, ch, { alpha: e.a, stroke: C.line, shadow: 'rgba(0,0,0,0.05)', blur: 12, offY: 4, name: 'bars card' });

  const k = ease.out(prog(t, 1.8, 0.9));
  ring(cx0 + 84, y0 + ch / 2, 52, COPY.stat.value / 100, k, { color: C.accent, track: C.track, alpha: e.a, lw: 14 });
  const tx = cx0 + 166, tw = cw - 166 - 24;
  txt(count(COPY.stat.value, k, { suffix: COPY.stat.suffix }), tx, y0 + 98, { size: 64, weight: 700, color: C.ink, alpha: e.a });
  txt(COPY.stat.label, tx, y0 + 138, { size: 22, weight: 600, color: C.accentText, ls: 2, alpha: e.a });
  wrap(COPY.stat.note, tx, y0 + 176, tw, 36, { size: 24, weight: 400, color: C.muted, alpha: e.a });

  const bx = x2 + 30, right = x2 + cw - 30;
  txt(COPY.bars.title, bx, y0 + 62, { size: 26, weight: 600, color: C.ink, alpha: e.a });
  COPY.bars.rows.forEach(([label, frac, shown], i) => {
    const y = y0 + 124 + i * 68, bk = ease.out(prog(t, 1.9 + i * 0.25, 0.8));
    txt(label, bx, y, { size: 24, weight: 500, color: C.muted, alpha: e.a });
    bar(bx + 96, y - 19, right - 56 - (bx + 96), 24, frac, bk, { fill: i ? C.accent : C.barMuted, track: C.track, alpha: e.a });
    txt(shown, right, y, { size: 26, weight: 700, color: C.ink, align: 'right', alpha: e.a * bk });
  });

  // Footer: author and CTA
  const fy = H - 108;
  e = enter(t, 2.2, 0.4, 20);
  avatar('author', M + 38, fy + e.dy, 38, { initials: COPY.author.initials, alpha: e.a, fill: C.accent });
  txt(COPY.author.name, M + 96, fy - 6 + e.dy, { size: 28, weight: 600, color: C.ink, alpha: e.a });
  txt(COPY.author.role, M + 96, fy + 28 + e.dy, { size: 22, weight: 400, color: C.muted, alpha: e.a });
  if (COPY.cta) {
    // Lemon Lime CTA: Carbon Black text, control radius (not a pill), static (no pulse).
    const w = Motion.measure(COPY.cta, { size: 26, weight: 600 }) + 52;
    chip(COPY.cta, W - M - w, fy - 25 + e.dy, { size: 26, weight: 600, padX: 26, r: TOKENS.controlRadius, fill: C.cta, color: C.ctaText, alpha: e.a });
  }
}

Motion.start({ background, content, T_END, T_STILL, FADE: 0.4 });
