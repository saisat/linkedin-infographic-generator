---
name: motion-infographic
description: Build a flat 2D animated LinkedIn infographic on Canvas 2D, exported as a 1080 x 1350 still, MP4 and GIF. Two starters: feed (phone-readable steps, stats, counters, bars, icon badges) and map (a dense system-map poster with stages, icon cards, logo chips, connectors, decisions and dot matrices), both with a build-in in reading order and a seamless loop. Use for any animated infographic, GIF or motion graphic for a post or lead magnet; 3D scenes go to diorama-3d, static stills and carousels to graphics-designer.
---

Workspace: context paths below (identity, audience, voice, brand, raw, index, log) resolve from `context/` in the project root. Read the root `AGENTS.md` and `context/AGENTS.md`. Working assets go in the root `output/<asset-name>/`. Skill-local `kit/`, `starters/` and `references/` resolve from this skill directory.

# 2D motion infographic

A motion infographic is one composition that **builds in reading order** and then **keeps quietly working**: rows check off, icons draw on, a number counts up, a highlight walks the steps or stages. The motion explains the reading order. It is not decoration.

## Pick the starter

| Starter | Use it for | Read at | Density |
|---|---|---|---|
| **feed** (default) | One takeaway for a post: a sequence, a comparison, a stat | Phone size (about 390 px wide) | At most about 40 words; type 22 px or more |
| **map** | A whole system or framework: a lead magnet, an article's model, "how it works" | Full size or zoomed, like a poster | Up to about 25 cards in 3–5 stages; type 12 px or more |

If a feed graphic needs more than about 6 rows, make a map, a carousel ([graphics-designer](../graphics-designer/SKILL.md)) or 2 graphics. If a map needs more than about 25 cards, split it.

## Ground the work

- Read [the brand page](../../context/brand/BRAND.md) for colour, font, icon, logo and photo rules. The brand is preset in `kit/brand.js` (Poppins, Turf Green, Lemon Lime CTA, Sai's photo), with values from [tokens.json](../../context/brand/tokens.json). Don't edit it per graphic; brand changes go through [brand-system](../brand-system/SKILL.md). Colour roles: Turf Green for identity marks and icons, Chartreuse as a fill only, Lemon Lime only for the one CTA, never as text.
- Copy comes from the author's post or brief: select their own lines verbatim and keep order, numbers and caveats. The copy rules in [graphics-designer](../graphics-designer/SKILL.md#copy-on-a-graphic) apply: instructional lines lead with a verb and name the real thing.
- Numbers come only from [proof](../../context/identity/proof.md) or the brief's cited source. A missing number stays out. Never animate a fake one.
- Need a headline or the post opening? Use [linkedin-hook-writer](../linkedin-hook-writer/SKILL.md).
- Before building, state in 3 lines: the 1 takeaway, the information relationship (sequence, comparison, evidence, hierarchy, system or thesis), and the reading order the build will follow. For a map, also list the stages and which connectors are real dependencies.

## Start a graphic

```sh
npm install && npm run setup               # once, at the project root (Playwright + Chromium)
npm run new -- <asset-name>                # feed starter → output/<asset-name>/
npm run new -- <asset-name> map            # map starter
open output/<asset-name>/scene.html        # live preview; scene.html?t=3 freezes t = 3 s
cd output/<asset-name> && ./make.sh        # still + layout check, frames, MP4, GIF, filmstrip
```

`npm run new` copies `kit/` (shared code and the brand) plus `starters/<kind>/scene.js`. Both starters render as is. The feed starter's copy and sample numbers are placeholders; the map starter's demo content is this project's own pipeline.

**You edit only `scene.js`:**

| Block | What goes there |
|---|---|
| `COPY` | Every word on the graphic, in one place, so it can be checked against the source |
| `IMAGES` additions | Logos and extra images, e.g. `IMAGES.claude = logoSrc('claude')`. Sai's photo (`IMAGES.author`) is preset |
| `window.LAYOUT` | Layout-check limits. Feed: the defaults (safe 48, min 22). Map: `{ minSize: 12, safe: 32 }` |
| Timing | `T_BUILD` (all on screen), `T_LOOP` (running motion period), `T_END`, `T_STILL` |
| `background(t)`, `content(t)` | The layout. Pure functions of `t`: no `Date`, no `Math.random`, no state between frames |

## The kit (`Motion.*` in `kit/lib.js`)

- **Timing:** `enter(t, start, dur, dist)` gives `{a, dy}`; `prog`, `ease.out`, `ease.inOut`, `ease.back`; `wave(t, period)` for loops.
- **Type:** `txt`, `wrap` (honours `\n`), `wrapLines`, `measure`, and `richLine(parts, x, y, o)` for a headline with a highlighted word (`{ t, mark: true }`, wiped in by `o.markK`).
- **Shapes and data:** `panel`, `chip`, `bar`, `ring`, `count`, `check`, `drawOn`, `avatar`.
- **Icons:** `icon(name, x, y, size, {k, color})` draws a Lucide line icon on, stroke by stroke. `iconBadge(name, cx, cy, r, {k})` puts one on a round Turf Green disc. All available names are in `kit/icons.js`; see [references/icons.png](references/icons.png). To add one, put its name in `scripts/build-icons.mjs` and run `npm run icons`. An unknown name fails the render.
- **Logos and images:** add a logo with `npm run logo -- <simple-icons-slug>`. It goes to `context/brand/assets/logos/` with an entry in `logos.json`. Then use `logo(key, x, y, size)` or `logoChip(key, label, x, y)`. `image(key, x, y, w, h, {fit, r})` places a photo or screenshot (cover or contain, rounded).
- **Diagram parts** (the [flowchart](../flowchart/SKILL.md) skill's visual grammar, on canvas):
  - `card(x, y, w, {icon, meta, title, body, tags, h, featured, scale})` returns the card's box and edge midpoints.
  - `stage(x, y, w, h, {num, title, active})` returns the x where the stage's content starts.
  - `connector(points, k, {dash, label, labelAt})` with `elbow(a, b, 'v'|'h')` for right-angle routes.
  - `diamond(cx, cy, w, h, label)` returns its exits.
  - `dotMatrix(x, y, {cols, rows, k})`.

## What makes it work

- **Format:** 1080 x 1350 (4:5), the tallest LinkedIn feed format.
- **Feed readability:** source type of 22 px or more (26 px for body copy), a headline of 60 px or more, at most about 40 words.
- **Map readability:** a 54–60 px headline, 17 px card titles, 15 px bodies, 12 px meta lines and tags. Read it at full size, and check the `@2x` still. Expect the phone preview to show only the headline and the structure.
- **Icons carry meaning, not decoration:**
  - One icon per card or row, naming the thing (inbox for a brief, shield-check for proof).
  - Same size and stroke throughout a graphic. Turf Green line icons on light surfaces, white on Turf Green discs.
  - Never use an icon in place of a label.
- **Logos are nominative only:** a product you actually use or discuss, from `logos.json` and in the owner's colours. Never alter it, combine it or imply endorsement. Check the guideline link in `logos.json` when there is one.
- **Images:** only with known rights (Sai's own photo, screenshots of his own work, licensed images). Keep product screenshots faithful. Illustrations are not set up yet.
- **Connectors:** only for real dependencies. Label every decision exit, and route return loops dashed and outside the main flow.
- **Fast build in reading order:**
  - Each element takes 0.3–0.5 s with ease-out, staggered 0.06–0.25 s. Icons draw on just after their card arrives.
  - Feed: everything is in by about 2.5 s. Map: header, then stages top-down, by about 3.3 s.
  - No bounce on text.
- **Then one loop motion:** for example a highlight that walks the rows or stages. Never blink or flash, and never move text the reader is trying to read.
- **Truthful motion:** a counter ends on the real number, a bar's length is proportional to its value, and a dot means "yes" only where it's true.
- **Seamless loop:** every running motion repeats within `T_LOOP`. The last `FADE` seconds fade back to the empty stage, so each GIF play shows the build.
- **CTA:** only a real next action from the brief: a Lemon Lime chip, or the map's Turf Green band with a lime chip. Otherwise leave it out.

## Render, capture, encode

- All render scripts use Playwright's Chromium. Set `PW_CHANNEL=chrome` to use the installed Google Chrome instead.
- `node render.mjs [page] [--strict]` writes `output/scene.png`, `@2x` and `-phone`. It then runs the **layout check** on everything drawn at `T_STILL`: text outside the safe area, overlapping text, text crossing a card or panel edge, partly overlapping panels, and type below `LAYOUT.minSize`. `--strict` makes warnings fail.
- `node capture.mjs frames [fps=25] [scale=1]` steps `window.renderAt(t)` from 0 to `T_END`. Use scale 2 for a crisper final MP4: `./make.sh <name> 25 2`.
- `./encode.sh frames <name> [fps] [gif-fps=15] [gif-width=720]` writes the MP4 (H.264, 1080 x 1350), the GIF (warns over 5 MB) and a 14-frame filmstrip. For a map, a wider GIF (900–1080) keeps small type readable; check its size.

## Inspect

Automated checks are not a visual review. Open and look at:
1. `output/scene.png`, and `scene@2x.png` for a map: hierarchy, alignment, spacing, line breaks, contrast, icon meaning, connector routing.
2. `output/scene-phone.png`: for a feed graphic, the headline, numbers and CTA read without zooming. For a map, the headline and the stage structure read.
3. `output/<name>-filmstrip.png`: frame 1 is the empty stage, elements arrive in reading order, the loop runs, and the last frame is fading out.
4. The GIF or MP4 played once through the restart: no jump, no flicker.

Fix the biggest visible weakness first (hierarchy, line breaks, spacing, then timing), then re-render and reinspect. For an independent check use [brand-review](../brand-review/SKILL.md). If you cannot render or view the result, deliver the source and state the exact unverified step.

## Deliver

Return the still, MP4, GIF and the editable folder `output/<asset-name>/`, with dimensions, GIF size and any known limitation. Keep a short `README.md` in the asset folder with the brief, the copy source, the logos used, the author's feedback per round and the rebuild command. Report the real state: source ready, rendered, or rendered and inspected. Posting needs the author's go.

## Origin

The kit is adapted from the deterministic `draw(t)` Canvas explainer and Playwright frame renderer in the LinkedIn Funnel template (`video/explainer.html`, `video/render.py`, MIT). The diagram parts port that template's flowchart visual grammar, and the map starter follows the structure of its content-waterfall graphic. Icons are from Lucide 0.468.0 (ISC, `kit/LUCIDE-LICENSE`). Logo data is from Simple Icons 13.21.0 (CC0; the marks remain their owners' trademarks).
