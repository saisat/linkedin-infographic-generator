---
type: context
status: adopted
owner: SaiSatish Vedam
created: 2026-09-07
updated: 2026-11-13
sources: ["Sai's core design system (private)", "Sai's brand voice guide (private)", "Sai's portrait (private)"]
tags: [brand]
---

# Brand

SaiSatish Vedam (Sai), Product Executive at productleadership.com. The identity is **authoritative, professional and mentorship-oriented**. It should signal trust and growth without academic stiffness. The design philosophy is clarity over decoration: generous whitespace, purposeful colour and one typeface.

- **Adopted:** everything taken from Sai's core design system: colours, Poppins, shapes and the do's and don'ts.
- **Draft:** the "LinkedIn graphic rules" section, which adapts web values to a 1080 px canvas. These rules stay draft until Sai confirms them after seeing real graphics.
- **Exact values:** [tokens.json](tokens.json) holds them. The full source is Sai's core design system, kept privately and not published here.

## Visual references

- The core design system (web, mobile, presentations, documents) is the authority. These graphics apply it. They don't redefine it.
- [Ideal follower](../audience/ideal-follower.md): product managers and product leaders. Graphics should feel like a senior mentor's whiteboard, not a marketing ad.

## Fonts

**Poppins only**, at every size. Never add a second typeface, not even for quotes, numbers or code. Hierarchy comes from size, weight and colour alone. Licensed files are in `assets/fonts/` (Regular 400, Medium 500, SemiBold 600, Bold 700; SIL Open Font License). Renderers load these files and fail rather than silently fall back. The system stack (`"Helvetica Neue", Helvetica, Arial`) is only for when Poppins genuinely can't load.

## Colours

| Role | Value | Rule |
|---|---|---|
| Turf Green (primary) | `#226F3E` | The identity signal: key shapes, checks, rings, the leading bar, featured borders. The strongest focal colour |
| Forest / Deep Forest | `#1B5E34` / `#14482A` | Darker states of the primary. On graphics, Forest is the green for small text (kickers, labels) |
| Lemon Lime (tertiary) | `#DFDD16` | High-energy CTA only, **10% of the canvas or less**. **Never as text colour.** Text on it is Carbon Black |
| Chartreuse (secondary) | `#95C034` | Tags, category labels, chart accents, supplemental highlights. Use it as a fill, not text on white (low contrast) |
| Carbon Black | `#1A1A1A` | All headings |
| Charcoal | `#4F4F4F` | Body copy |
| Medium Gray | `#6F6F6F` | Secondary text and metadata |
| Placeholder Gray | `#9E9E9E` | Disabled or placeholder only |
| Borders | `#C4C4C4` strong, `#E0E0E0` default | |
| Backgrounds | `#FFFFFF`, near-white `#F7F9F7`, cream `#FFFDF5` | Cream is a section surface, never a button or chip |
| Link green | `#2F8A4C` | Hyperlinks only |
| Semantic | success `#2E7D32`, warning `#F5A623`, error `#D32F2F`, info `#1976D2` | Real states only. Error red is never emphasis or decoration |

70–80% of any canvas is neutral, so the green keeps its signal value. Don't mix accents arbitrarily: green for identity and action, lime for the one CTA, chartreuse for secondary highlights. Check contrast against WCAG AA: 4.5:1 for normal text, 3:1 for large text.

## Layout and typography

From the core system (adopted):
- Headings in Carbon Black, body in Charcoal, metadata in Medium Gray.
- Line height of at least 1.2× for headings and 1.5× for body text.
- Display heroes are 700 weight.
- Radii: 6 px for controls (buttons, chips), 15 px for cards, 50% for avatars and icon containers. Never give a card a control radius or a control a card radius.
- Cards: white, `#E0E0E0` border and a whisper shadow (`0 2px 6px rgba(0,0,0,0.05)`). A featured card has a 2 px Turf Green border and no shadow.
- Don't put elevation shadows on static elements beyond that whisper.
- Buttons never use pill shapes.

### LinkedIn graphic rules (draft, 2026-11-13)

The canvas is 1080 × 1350 and appears at about 390–555 px in the feed, so web values are **doubled**:
- **Radii:** cards 30 px, controls 12 px.
- **Margins:** side margin 80 px, safe area 48 px.
- **Type:** headline 64 px / 700 / line height ≥ 1.22, row title 34 px / 600, body 26 px / 400 (never below 22 px), labels 22 px / 600.
- **Colour use:** near-white `#F7F9F7` background with white cards. Turf Green for checks, rings and the leading bar. `#C4C4C4` for comparison bars, `#E0E0E0` for tracks. Chartreuse for a highlight fill.
- **CTA:** a Lemon Lime chip with Carbon Black text and a 12 px radius, and only when the post has a real next step.
- **Author footer:** round photo, "SaiSatish Vedam", "Product Executive · productleadership.com".
- **Motion:** calm and confident, matching the mentor personality. Ease-out entrances, no bounce on text, no flashing. One loop motion at a time.

### Icons, logos and diagrams (draft, 2026-11-13)

- **Icons:** Lucide line icons only (one consistent set, 2 px stroke on the 24 px grid). Turf Green on light surfaces; white on a Turf Green disc, because the brand's icon containers are round. One icon per card or row, naming the thing; never decoration and never a substitute for a label.
- **Card headers and highlights:** light green `#E8F5E9` (`accentSoft`) for card header bands and the highlight box behind one headline word.
- **Connectors:** `#6F6F6F`, 2 px, with an arrowhead. The flow between stages is Turf Green. Return loops are dashed.
- **Small labels:** meta lines and tags are small-caps Poppins in Medium Gray, never a second typeface (the content-waterfall reference uses monospace; Sai's brand doesn't).

## Photography, logos and asset rights

- `assets/sai-avatar.jpg`: a 600 × 600 head-and-shoulders crop of Sai's own portrait, supplied by Sai for his own content. The original (3584 × 4800, dark navy background) is kept privately and not published.
- No productleadership.com logo has been supplied. Don't draw or invent one; use the name in text.
- **Third-party product logos** live in `assets/logos/`, added with `npm run logo -- <slug>` from Simple Icons, with their source and guidelines in `assets/logos/logos.json`. Use them only to refer to products Sai uses or discusses (nominative use), in the owner's colours, never altered or combined, and never implying endorsement. Present now: Claude, Node.js, Python, FFmpeg (the tools this project runs on).
- Use high-quality imagery that reflects professionalism and diversity (brand guide §9). Third-party logos or screenshots need a known right to use.

## Graphic and video examples

None approved yet. The first branded render of the motion starter is a draft for Sai's review. [Formats](../voice/formats.md) will record what works.

## Related Pages

- [[formats]]
- [[ideal-follower]]
- [[positioning]]

## Source Notes

- 2026-11-13: colours, typography, shapes, components and do's and don'ts copied from Sai's core design system (private, not published; used in his other channels). Personality, audience and imagery guidance from Sai's brand voice guide (private, not published) (updated 2026-11-13). Role "Product Executive at www.productleadership.com" stated by Sai in chat, 2026-11-13.
- Draft adaptations (×2 scale, graphic type sizes, Forest for small green text, chartreuse as fill only, lime CTA chip) were proposed by the agent on 2026-11-13 from the core system's own contrast and usage rules. Not yet confirmed by Sai.
