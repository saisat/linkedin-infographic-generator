# Author context

The blank context for [linkedin-infographic-generator](../README.md). Start at [the index](index.md).

| Folder | Purpose |
|---|---|
| brand | Visual rules and licensed assets: the first thing to fill |
| identity | Positioning and cleared proof (every number on a graphic) |
| audience | Who the graphics are for |
| voice | Writing samples and formats, so headlines sound like the author |
| raw | Original supplied sources and manifests |
| templates | Page and manifest templates |

Stub pages are unanswered prompts. They don't describe the author or provide usable proof. To fill them, give your agent your brand assets, a few posts and the numbers you're cleared to show, and ask it to use `brand-system` and update these pages.

```sh
python3 context/scripts/wiki_lint.py     # from the project root
```
