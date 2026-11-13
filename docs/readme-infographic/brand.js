// Sai's brand for every motion graphic: context/brand/BRAND.md, values from context/brand/tokens.json.
// Loaded before scene.js. Change it only through the brand-system skill (it keeps tokens.json in sync).
// Paths are relative to output/<name>/scene.html.
const BRAND_ASSETS = '../../context/brand/assets/';
window.TOKENS = {
  font: { sans: 'Poppins, "Helvetica Neue", Helvetica, Arial, sans-serif' },   // Poppins only, never a second face
  // Loaded before rendering; a missing file fails the render instead of silently falling back.
  fontFaces: [400, 500, 600, 700].map((weight) => ({ family: 'Poppins', weight,
    src: BRAND_ASSETS + 'fonts/' + { 400: 'Poppins-Regular', 500: 'Poppins-Medium', 600: 'Poppins-SemiBold', 700: 'Poppins-Bold' }[weight] + '.ttf' })),
  color: {
    bg: '#F7F9F7', card: '#FFFFFF', line: '#E0E0E0',           // neutral 70-80% of the canvas
    ink: '#1A1A1A', body: '#4F4F4F', muted: '#6F6F6F',          // headings, body, metadata
    accent: '#226F3E', accentText: '#1B5E34',                    // Turf Green (icons, marks); Forest for small green text
    accentSoft: '#E8F5E9',                                        // light green surface: card bands, headline marks (draft)
    highlight: '#95C034',                                         // Chartreuse: fills only, never text on white
    cta: '#DFDD16', ctaText: '#1A1A1A',                          // Lemon Lime: the one CTA, <= 10% of canvas, never text
    barMuted: '#C4C4C4', track: '#E0E0E0', connector: '#6F6F6F',
  },
  radius: 30,          // feed card (15 px web x 2); poster cards use 14 at scale 1
  controlRadius: 12,   // chips and buttons (6 px web x 2); never pills
};
// Photos and logos with known usage rights (logos: context/brand/assets/logos/logos.json). A missing image falls back.
window.IMAGES = { author: BRAND_ASSETS + 'sai-avatar.jpg' };
window.logoSrc = (slug) => BRAND_ASSETS + 'logos/' + slug + '.svg';   // e.g. IMAGES.claude = logoSrc('claude')
