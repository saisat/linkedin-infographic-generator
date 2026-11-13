// Add a product logo from Simple Icons (CC0 icon data; the marks remain their owners' trademarks)
// to context/brand/assets/logos/ and record it in logos.json with its source and usage note.
//   npm run logo -- <slug> [colour]     colour: "brand" (default, the owner's hex), "ink", or a #hex
// Find slugs at https://simpleicons.org. Use a logo only to refer to a product you actually use or discuss.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const icons = require('simple-icons');
const version = JSON.parse(readFileSync(new URL('../node_modules/simple-icons/package.json', import.meta.url), 'utf8')).version;
const [slug, colourArg = 'brand'] = process.argv.slice(2);
if (!slug) { console.error('usage: npm run logo -- <slug> [brand|ink|#hex]'); process.exit(1); }
const icon = Object.values(icons).find((i) => i && i.slug === slug);
if (!icon) { console.error(`no Simple Icons slug "${slug}" in simple-icons ${version}`); process.exit(1); }
const fill = colourArg === 'brand' ? '#' + icon.hex : colourArg === 'ink' ? '#1A1A1A' : colourArg;
const dir = new URL('../context/brand/assets/logos/', import.meta.url);
mkdirSync(dir, { recursive: true });
writeFileSync(new URL(slug + '.svg', dir), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><title>${icon.title}</title><path fill="${fill}" d="${icon.path}"/></svg>\n`);
const manifestUrl = new URL('logos.json', dir);
const manifest = existsSync(manifestUrl) ? JSON.parse(readFileSync(manifestUrl, 'utf8')) : { note: 'Product logos for nominative use (referring to products Sai uses or discusses). Icon data from Simple Icons (CC0); every mark remains its owner’s trademark. Follow the owner’s guidelines; never alter, combine or imply endorsement.', logos: {} };
manifest.logos[slug] = { title: icon.title, file: `${slug}.svg`, fill, source: `simple-icons ${version}`, guidelines: icon.guidelines || null, added: new Date().toISOString().slice(0, 10) };
writeFileSync(manifestUrl, JSON.stringify(manifest, null, 2) + '\n');
console.log(`logos/${slug}.svg (${icon.title}, ${fill})${icon.guidelines ? ' — guidelines: ' + icon.guidelines : ''}`);
