# Log

## [2026-09-07] setup | Unbranded content engine template

Blank context pages from the content-engine template, via LinkedIn Funnel. No author corpus, brand assets, live connections or client history are included.

## [2026-09-08] skill | Editable flowchart design

Expanded the flowchart skill with semantic icons, role-specific cards, labeled detail rows, output strips and routing guidance. It has self-contained Python drawing helpers with neutral defaults. No external brand root, fonts, logos or client content are bundled.

## [2026-11-13] setup | Cut down to linkedin-infographic-generator

Kept the brand, positioning, proof, audience and voice pages. Removed strategy, Notion, qmd, inspiration and the other identity pages. Added the `motion-infographic` skill for 2D animated infographics. All pages are still stubs.

## [2026-11-13] brand | Sai's brand adopted for graphics

Filled `brand/BRAND.md` and added `brand/tokens.json` from Sai's core design system and brand guide (his private brand kit, not published in this repo): Poppins only, Turf Green identity, Lemon Lime CTA (never text, 10% or less), Chartreuse fills, neutral-first canvas. Added `brand/assets/fonts/` (Poppins 400–700, OFL) and `brand/assets/sai-avatar.jpg` (crop of Sai's portrait). The LinkedIn graphic adaptations (×2 scale, type sizes, CTA chip, one loop motion) are draft until Sai confirms. Updated consumers: motion-infographic `TOKENS`/`IMAGES`/author copy, diorama-3d `scene.css`/`scene.html`, the flowchart theme (no Poppins in Excalidraw). Filled positioning, ideal follower and voice from the brand guide as drafts.

## [2026-11-13] skill | Icons, logos and system maps for motion graphics

motion-infographic now has a shared `kit/` (lib.js, generated icons.js, brand.js with the tokens) and two starters: `feed` (phone-readable) and `map` (a system-map poster modelled on the content-waterfall reference's structure). New helpers: Lucide line icons that draw on (`npm run icons`), Simple Icons logos with a rights manifest (`npm run logo`), images, cards, stages, connectors, decision diamonds, dot matrices and highlighted headline words. The icon, logo and diagram rules were added to BRAND.md as draft. Illustrations are deferred.

## [2026-11-13] release | Published as linkedin-infographic-generator

Renamed the project and published it as a public repository. Left out: `references/` (Sai's private brand source files, including the full-resolution portrait; now git-ignored) and `PLAN.md` (a build log). Added Sai's copyright line to LICENSE and the Poppins OFL text next to the font files. The brand source citations in the context pages now name the private documents instead of file paths.
