# Context: agent rules

This folder holds the author's context for their graphics: brand, positioning, proof, audience and voice. It starts blank.

## Where things live

- `brand/`: visual rules (`BRAND.md`) and licensed assets (`brand/assets/`, fonts in `brand/assets/fonts/`).
- `identity/`: positioning and cleared proof. `audience/`: who the graphics are for. `voice/`: writing samples and formats.
- `raw/`: exact source material, append only, with a dated folder and manifest per ingest.
- `templates/`: page and manifest templates.
- `../skills/`: the shared skills. `../output/`: working graphics, ignored by git.

## Empty means unknown

A page with `status: stub` holds prompts, not author facts. Never invent a palette, font, logo, number, role, quote or opinion. If a graphic is requested while `brand/BRAND.md` is a stub, make a plain unbranded draft, label it so, and don't treat it as the author's identity. Check `identity/proof.md` before putting any number on a graphic. A number that isn't there or in the cited brief stays out.

Distinguish the author's own statements, source-backed facts and proposed interpretations. Unclear public-use status means the material stays off public graphics until resolved.

## Read, then write

Start at `index.md`. Before a graphic, read `brand/BRAND.md`, then the identity, audience and voice pages the brief touches. Use `templates/page.md` for new pages, with frontmatter, a Related Pages link and Source Notes. Update `index.md` and append to `log.md` when filing durable context. Keep `AGENTS.md` and `CLAUDE.md` identical.

## Changes and delivery

Preserve existing edits and raw sources. Run `python3 scripts/wiki_lint.py` (or `npm run check` from the root) before committing. A render does not authorize posting.
