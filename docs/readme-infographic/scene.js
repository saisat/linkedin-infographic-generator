// README infographic (docs/readme-infographic, committed so GitHub shows it), built from the map starter:
// a dense 1080 x 1350 animated system map (header with stats and logo chips, numbered stages of
// icon cards, connectors, a decision with a return loop, a dot matrix, a CTA band). Read at full size, like a
// lead-magnet poster, not at phone size. The brand comes from brand.js.
// Content: README.md. Stages follow "How context shapes every graphic" and "Make a motion infographic" (steps 1-6);
// stats from "What" and Step 3; formats matrix from Step 6; built-with from "Set up (once)".

for (const s of ['claude', 'nodedotjs', 'python', 'ffmpeg']) IMAGES[s] = logoSrc(s);   // logos with a logos.json entry
window.LAYOUT = { minSize: 12, safe: 32 };   // poster density: smaller type allowed, checked at full size

// ---------- copy ----------
const COPY = {
  author: { name: 'SaiSatish Vedam', role: 'Product Executive · productleadership.com', initials: 'SV' },
  kicker: 'ANIMATED LINKEDIN INFOGRAPHICS',
  headline: [[{ t: 'Post in.' }], [{ t: 'Infographic', mark: true }, { t: ' out.' }]],
  stats: [{ v: 7, label: 'skills' }, { v: 3, label: 'outputs: still, MP4, GIF' }, { v: 6, label: 'steps, post to GIF' }, { v: 2.5, label: 'second build-in', fmt: { decimals: 1 } }],
  builtWith: [['claude', 'Claude Code'], ['nodedotjs', 'Node.js'], ['python', 'Python'], ['ffmpeg', 'FFmpeg']],
  stages: [
    { title: 'Ground it', cards: [
      { icon: 'palette', meta: 'context · brand', title: 'Brand', body: 'Poppins, Turf Green, your photo', tags: ['BRAND.md'] },
      { icon: 'target', meta: 'context · position', title: 'Positioning', body: 'Audience and promise', tags: ['positioning.md'] },
      { icon: 'shield-check', meta: 'context · proof', title: 'Proof', body: 'Only cleared numbers', tags: ['proof.md'] },
      { icon: 'message-square', meta: 'context · voice', title: 'Voice', body: 'Tone and your own words', tags: ['linkedin-voice.md'] },
    ] },
    { title: 'Write it', cards: [
      { icon: 'inbox', meta: 'you · input', title: 'Brief', body: 'Paste the post or the article' },
      { icon: 'list-checks', meta: 'skill · plan', title: 'Plan', body: 'Takeaway, structure, reading order', tags: ['motion-infographic'] },
      { icon: 'pen-line', meta: 'skill · headline', title: 'Headline', body: '3 options in your voice', tags: ['linkedin-hook-writer'] },
    ] },
    { title: 'Build and check', cards: [
      { icon: 'layers', meta: 'skill · build', title: 'Build', body: 'Copy, timing and layout', tags: ['scene.js'] },
      { icon: 'play', meta: 'script · render', title: 'Render', body: 'Still, frames, MP4, GIF', tags: ['make.sh'] },
      { icon: 'eye', meta: 'you · review', title: 'Review', body: 'Still, phone, filmstrip', tags: ['brand-review'] },
    ], decision: 'Layout\nclean?' },
    { title: 'Ship it', matrix: {
        cols: ['Image post', 'Video post', 'Article'],
        rows: [{ label: 'Still', icon: 'image', values: [1, 0, 1] }, { label: 'MP4', icon: 'video', values: [0, 1, 0] }, { label: 'GIF', icon: 'refresh-cw', values: [1, 0, 0] }] },
      cards: [{ icon: 'send', meta: 'you · post', title: 'Post it yourself', body: 'Nothing is ever posted for you', tags: ['GIF or MP4'] }] },
  ],
  cta: { lead: 'Make your own: the steps are below', chip: 'See "Set up"' },   // a GitHub visitor's real next step
};

// ---------- timing ----------
const T_BUILD = 3.3;              // header, then stages top-down, then the CTA band
const T_LOOP = 4;                 // the active-stage highlight visits each of the 4 stages for 1 s
const T_END = T_BUILD + T_LOOP;
const T_STILL = T_BUILD + 0.5;

const { W, H, ctx, txt, panel, count, avatar, enter, prog, ease, icon, logoChip, card, elbow, connector, diamond, stage, dotMatrix, richLine, chip, rr } = Motion;
const C = TOKENS.color, M = 40, COL = 160;
const CX0 = M + COL, CX1 = W - M - 20, CW = CX1 - CX0;      // content area inside a stage
const STAGE_START = (i) => 0.75 + i * 0.5;

function background() {
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(26,26,26,0.04)';
  for (let y = 18; y < H; y += 36) for (let x = 18; x < W; x += 36) { ctx.beginPath(); ctx.arc(x, y, 1.4, 0, Math.PI * 2); ctx.fill(); }
}

// Cards in a row with arrows between them; returns their boxes.
function cardRow(cards, x, y, w, gap, h, t0, t, arrows = true) {
  const boxes = [];
  cards.forEach((c, i) => {
    const s0 = t0 + 0.1 + i * 0.09, e = enter(t, s0, 0.35, 14);
    boxes.push(card(x + i * (w + gap), y, w, { ...c, h, dy: e.dy, alpha: e.a, iconK: prog(t, s0 + 0.1, 0.6) }));
  });
  if (arrows) for (let i = 0; i + 1 < boxes.length; i++)
    connector([[boxes[i].right[0] + 4, y + h / 2], [boxes[i + 1].left[0] - 6, y + h / 2]], ease.inOut(prog(t, t0 + 0.3 + i * 0.09, 0.3)));
  return boxes;
}

function content(t) {
  const looping = t >= T_BUILD, active = looping ? Math.floor(((t - T_BUILD) / (T_LOOP / 4)) % 4) : -1;

  // ----- header -----
  let e = enter(t, 0.05, 0.35, 12);
  avatar('author', M + 22, 56 + e.dy, 22, { initials: COPY.author.initials, alpha: e.a, fill: C.accent });
  txt(COPY.author.name, M + 54, 51 + e.dy, { size: 17, weight: 600, color: C.ink, alpha: e.a });
  txt(COPY.author.role, M + 54, 71 + e.dy, { size: 13, weight: 400, color: C.muted, alpha: e.a });
  txt(COPY.kicker, W - M, 56 + e.dy, { size: 13, weight: 600, ls: 2, color: C.accentText, align: 'right', alpha: e.a });
  e = enter(t, 0.15, 0.45, 20);
  richLine(COPY.headline[0], M, 150 + e.dy, { size: 58, weight: 700, ls: -0.5, alpha: e.a });
  e = enter(t, 0.25, 0.45, 20);
  richLine(COPY.headline[1], M, 220 + e.dy, { size: 58, weight: 700, ls: -0.5, alpha: e.a, markK: prog(t, 0.55, 0.45) });
  const tx0 = 640, tw = (W - M - tx0 - 12) / 2, th = 66;
  COPY.stats.forEach((st, i) => {
    const x = tx0 + (i % 2) * (tw + 12), y = 92 + Math.floor(i / 2) * (th + 12), se = enter(t, 0.35 + i * 0.06, 0.35, 12);
    panel(x, y + se.dy, tw, th, { r: 14, alpha: se.a, stroke: C.line, lw: 1.5, name: 'stat ' + st.label });
    txt(count(st.v, ease.out(prog(t, 0.4 + i * 0.06, 0.8)), st.fmt || {}), x + 16, y + 36 + se.dy, { size: 28, weight: 700, color: C.ink, alpha: se.a });
    txt(st.label, x + 16, y + 55 + se.dy, { size: 12, weight: 500, color: C.muted, alpha: se.a });
  });
  e = enter(t, 0.6, 0.35, 10);
  txt('Built with', M, 278 + e.dy, { size: 13, weight: 600, color: C.muted, alpha: e.a });
  let lx = M + 84;
  COPY.builtWith.forEach(([k, label], i) => { const le = enter(t, 0.62 + i * 0.06, 0.3, 10); lx += logoChip(k, label, lx, 256 + le.dy, { h: 32, size: 14, alpha: le.a }) + 8; });

  // ----- stages -----
  const layout = [{ y: 306, h: 200 }, { y: 536, h: 200 }, { y: 766, h: 236 }, { y: 1032, h: 176 }];
  layout.forEach((L, i) => {
    const t0 = STAGE_START(i), se = enter(t, t0, 0.35, 16), S = COPY.stages[i];
    if (i > 0) connector([[CX0 + CW / 2, layout[i - 1].y + layout[i - 1].h + 3], [CX0 + CW / 2, L.y - 5]], ease.inOut(prog(t, t0 - 0.15, 0.2)), { color: C.accent, lw: 2.5 });
    stage(M, L.y + se.dy, W - 2 * M, L.h, { num: i + 1, title: S.title, alpha: se.a, active: i === active, colW: COL });
    const y = L.y + 20 + se.dy;
    if (i === 0) cardRow(S.cards, CX0, y, (CW - 3 * 12) / 4, 12, 160, t0, t, false);
    if (i === 1) cardRow(S.cards, CX0, y, (CW - 2 * 40) / 3, 40, 160, t0, t);
    if (i === 2) {
      const w = 196, g = 34, dw = 120, h = 160;
      const [build, render] = cardRow(S.cards.slice(0, 2), CX0, y, w, g, h, t0, t);
      const dcx = render.right[0] + g + dw / 2, dk = ease.out(prog(t, t0 + 0.35, 0.3));
      connector([[render.right[0] + 4, y + h / 2], [dcx - dw / 2 - 6, y + h / 2]], ease.inOut(prog(t, t0 + 0.35, 0.2)));
      const d = diamond(dcx, y + h / 2, dw, 100, S.decision, { k: dk, alpha: se.a, size: 14 });
      const re = enter(t, t0 + 0.45, 0.35, 14);
      const review = card(d.right[0] + g, y, w, { ...S.cards[2], h, dy: re.dy, alpha: re.a, iconK: prog(t, t0 + 0.55, 0.6) });
      connector([[d.right[0] + 4, y + h / 2], [review.left[0] - 6, y + h / 2]], ease.inOut(prog(t, t0 + 0.5, 0.2)), { label: 'yes', labelDy: -8 });
      const ly = y + h + 26;   // the "no" loop runs under the cards, back to Build
      connector([d.bottom, [d.bottom[0], ly], [build.bottom[0], ly], [build.bottom[0], build.bottom[1] + 6]], ease.inOut(prog(t, t0 + 0.55, 0.45)), { dash: [6, 6], label: 'no: fix and re-render', labelAt: [build.bottom[0] + 14, ly - 8] });
    }
    if (i === 3) {
      const m = dotMatrix(CX0, y + 6, { ...S.matrix, k: prog(t, t0 + 0.2, 0.8), alpha: se.a, labelW: 120, cell: 104 });
      const ce = enter(t, t0 + 0.3, 0.35, 14);
      card(CX0 + m.w + 40, y, CW - m.w - 40, { ...S.cards[0], h: 136, dy: ce.dy, alpha: ce.a, iconK: prog(t, t0 + 0.4, 0.6), featured: true });
    }
  });

  // ----- CTA band -----
  e = enter(t, 2.85, 0.4, 20);
  const by = 1228 + e.dy, bh = 88;
  panel(M, by, W - 2 * M, bh, { r: 20, fill: C.accent, stroke: null, alpha: e.a, name: 'cta band' });
  txt(COPY.cta.lead, M + 28, by + bh / 2 + 8, { size: 24, weight: 600, color: '#FFFFFF', alpha: e.a });
  const cw = Motion.measure(COPY.cta.chip, { size: 22, weight: 600 }) + 44;
  chip(COPY.cta.chip, W - M - 24 - cw, by + (bh - 46) / 2, { size: 22, weight: 600, padX: 22, padY: 12, r: TOKENS.controlRadius, fill: C.cta, color: C.ctaText, alpha: e.a });
}

Motion.start({ background, content, T_END, T_STILL, FADE: 0.4 });
