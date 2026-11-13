# README infographic

The animated system map at the top of the [project README](../../README.md). It was made with `motion-infographic`'s **map** starter in Sai's brand. It lives in `docs/` rather than `output/` so that it is committed and GitHub can show it.

- **Brief:** turn the README into one animated system map, with icons.
- **Takeaway:** a post or an article goes in, an on-brand animated infographic comes out. Headline: "Post in. **Infographic** out." with the kicker "Animated LinkedIn infographics".
- **Structure:** a header (author, highlighted headline, 4 stats, built-with logo chips), then 4 stages built top-down:
  1. Ground it: the 4 context files
  2. Write it: brief → plan → headline
  3. Build and check: build → render → "Layout clean?", with a dashed "no" loop back to build, then review
  4. Ship it: a formats dot matrix and "Post it yourself"

  It ends with a CTA band. The one loop motion is a highlight that walks the 4 stages.
- **Copy source:** README.md.
  - Stages: "How context shapes every graphic" and "Make a motion infographic" (steps 1–6).
  - Stats: 7 skills ("The skills"), 3 outputs ("What you get per graphic"), 6 steps, and a build-in of about 2.5 s (Step 3).
  - Formats matrix: Step 6.
  - Built with: "Set up (once)". The logos come from `context/brand/assets/logos/` (nominative use).
  - CTA: points GitHub visitors to "Set up". It has no keyword, because this isn't a LinkedIn post.
- **Status:** rendered and inspected (still, filmstrip), 2026-11-13. A draft until Sai approves it.

## Files

| File | Use |
|---|---|
| `output/readme-infographic.gif` | 1080 × 1350, 15 fps, 7.3 s loop, 1.2 MB: embedded in the README at 720 px wide |
| `output/readme-infographic.mp4` | 1080 × 1350, for a LinkedIn video post |
| `output/scene.png`, `scene@2x.png` | Stills (the `@2x` one is for reading the small type) |
| `output/scene-phone.png` | Phone preview: a map shows only its headline and structure at this size |
| `output/readme-infographic-filmstrip.png` | Review strip |
| `scene.js` | Editable source (copy, timing, layout). The rest is a copy of `skills/motion-infographic/kit/` |

## Rebuild

After changing the README's steps or numbers, edit `COPY` in `scene.js`, then, from this folder:

```sh
PW_CHANNEL=chrome node render.mjs                         # still + layout check (drop PW_CHANNEL if Playwright's Chromium is installed)
PW_CHANNEL=chrome node capture.mjs frames 25 1
./encode.sh frames readme-infographic 25 15 1080 && rm -rf frames
```

If the kit changes, copy `skills/motion-infographic/kit/*` here again, keeping `scene.js`, then rebuild.
