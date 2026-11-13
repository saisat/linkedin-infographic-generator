---
name: flowchart
description: Create editable flowcharts, system maps and funnels with semantic icons, structured operation cards, distinct skill and decision shapes, and verified routing.
---

Workspace: context paths below (identity, audience, voice, brand, raw, index, log and context scripts) resolve from `context/` in the project root. Read both the root `AGENTS.md` and `context/AGENTS.md`. Working assets go in the root `output/<asset-name>/`. Skill-local `references/` and `scripts/` resolve from this skill directory.


# Draw an editable flowchart

Read `AGENTS.md`, the actual workflow sources and `brand/BRAND.md`. Resolve paths from this skill's repository. When editing, inspect the existing scene and generator, preserve manual changes and retain the current viewing URL.

## Model the process

Identify triggers, inputs, operations, decisions, outputs, exceptions and feedback before choosing the layout. Give each nontrivial branch an explicit destination.

Use narrowing shapes for filtering, lanes for ownership and arrows for real dependencies. A taxonomy of pillars or test dimensions is a set of choices, not a sequential process. Top/middle/bottom describe content jobs; readers need not pass through every stage.

Label proposed steps and dated snapshots. Drawing an operation does not execute it.

## Make the roles visible

Read [the visual grammar and helper API](references/design-and-tools.md) when authoring a scene.

- **Source/reference:** quiet file card or compact list; no action-style header that implies execution.
- **Function/operation:** square card, light title band, semantic icon, labeled input/work rows and a distinct output strip.
- **Skill:** rounded card and contrasting title band for a procedure that applies context or judgment. Classify its responsibility, not whether its name contains AI.
- **Decision:** short question inside a diamond, with labeled exits and explicit hold/retry destinations.
- **Signal/result:** a compact event or result shape. A numeric result can use large type with its unit, population and date.
- **Grouping:** shared alignments or a light container for a meaningful stage. Use different compositions for an overview, taxonomy, funnel and result breakdown.

Use semantic line icons for recognizable concepts such as a source file, person, company, context brain, calendar, message or verification. Keep icon size and stroke consistent. Each icon stays editable and grouped with its card. Icons are not a substitute for readable labels.

Use approved client tokens when available. For Sai's brand, pass `theme=json.load(open('context/brand/tokens.json'))['graphic']['flowchartTheme']` to `Flowchart(...)`. Excalidraw has no Poppins, so keep its standard font slot 2 and state that limitation; a published flowchart graphic that must match the brand fonts is rebuilt in `graphics-designer` or `motion-infographic`. The included helper defaults to neutral grays and a standard font slot; it contains no logo, signature, brand palette or client connections. Do not copy a reference client's visual identity or domain content.

## Build and inspect

Use the named tool or existing project canvas. For Excalidraw, `scripts/flowchart.py` and its adjacent `primitives.py` build native shapes, semantic icons, grouped cards, embedded images and reciprocal arrow bindings using Python's standard library. No scene is created on import. Pass a theme and font slot explicitly when integrating with a custom canvas.

For other tools, reuse the visual grammar in their actual native model. Lucide is an icon library, not a diagram editor. Do not claim an SVG is a native hosted diagram.

Compute connector endpoints from current card bounds. Route long returns outside the main flow. Leave room for labels. Shorten, wrap or enlarge a card before shrinking its text.

Python estimates text sizes for authoring; actual glyph measurement and visual inspection are still required. Render or import using the available editor. Verify actual fonts, text containment, connector collisions, branch meaning, reciprocal bindings and image aspect ratio. Do not silently substitute fonts or flatten editable elements to make validation pass.

Open the rendered overview and useful detail views. A dense working map needs zoom; a phone preview checks hierarchy, not proof that every field is readable. Split a social graphic into fewer nodes or multiple slides.

Deliver the editable scene, preview where available, dimensions, viewing URL and any inspection limitation. Keep reusable mechanics here and domain content in the diagram's own folder.
