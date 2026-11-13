# Working in linkedin-infographic-generator

This project makes LinkedIn infographics, mainly 2D animated ones. Read README.md, then the relevant skill in skills/.

- Skills live in skills/. .claude/skills and .agents/skills link there. Update skills/catalog.json and skills/README.md when a skill's name or description changes.
- Animated or moving infographic: motion-infographic. 3D system scene: diorama-3d. Static graphic or carousel: graphics-designer. Editable map: flowchart. Brand setup: brand-system. Review: brand-review. Headlines and post openings: linkedin-hook-writer.
- Read context/AGENTS.md before using or editing author context. A stub page means unknown: never invent the author's brand, numbers, roles or quotes. Numbers on a graphic come from context/identity/proof.md or the cited brief.
- Start each graphic with `npm run new -- <name> [feed|map|diorama]` and work in output/<name>/. Icons: `npm run icons` (names in kit/icons.js, sheet in skills/motion-infographic/references/icons.png). Logos: `npm run logo -- <slug>`, nominative use only. Do not edit the starters for one graphic. Change a starter only when asked to change the template.
- Inspect the rendered still, the phone preview and the filmstrip before calling a graphic done. A successful render or the layout check is not a visual review.
- examples/reference/ is a quality bar, not a style to copy. It is Tim Scheuer's artwork with third-party photos and logos.
- Drafts and renders do not authorize posting. Keep credentials and unpublished private material out of commits.
- Preserve unrelated edits. Before committing, run `npm run check` (scripts/check-template.py and context/scripts/wiki_lint.py), and render the starter when a starter or helper changed.
