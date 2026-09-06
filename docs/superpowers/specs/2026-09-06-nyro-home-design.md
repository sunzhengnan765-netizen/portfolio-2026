# Nyro-style portfolio home

## Goal

Add a Nyro-faithful home experience to the existing `portfolio-2026` single-page HTML site. Replace all Nyro example identity and project copy with Ethan's portfolio content while preserving the existing 39-page portfolio stream and its interactive demo.

## Route and navigation

- `#home` is the landing state and appears before the current page stream.
- The header wordmark returns to `#home`; its menu opens a full-screen overlay.
- Overlay destinations are Home, Works, Projects, and Contact.
- Works scrolls to the existing first portfolio page. Projects scrolls to the home featured-project section. Contact scrolls to the home contact block.
- Featured cards jump to the existing work anchors: 乔司监狱 `#p4`, 汽水音乐 `#p23`, 百度优选 `#p37`.
- Existing `J`/`K` page navigation, project previous/next links, page captions, page 23 video, and pages 1–39 remain functional.

## Visual system

- Faithfully match Nyro's black canvas, blurred green/red/magenta aurora field, thin grid, fine white dividers, white low-contrast sans typography, oversized display type, and soft floating-image treatment.
- Use Ethan copy and existing local portfolio imagery rather than Nyro logos, people, testimonials, or remote assets.
- The hero's changing final word cycles through `Startups`, `Brands`, `Products`, and `You` with a vertical masking transition.
- Scroll-triggered number counters animate once when visible. Cards gain the captured Nyro-style elevated overlay on hover/focus.

## Home sections

1. Hero: Ethan branding, social placeholders removed, changing word headline, links to Works and Contact.
2. About/statistics: concise Ethan profile and counts sourced from the existing portfolio context.
3. Featured projects: cards for 乔司监狱、汽水音乐、百度优选 that link to their existing anchors.
4. Services: UI/UX, Visual Design, AI Prototyping, and Frontend Implementation.
5. Testimonials/FAQ: retain Nyro section geometry but use concise portfolio-focused content.
6. Contact/footer: Ethan contact area and a return-to-home link, without third-party Framer promotion.

## Responsive and accessibility behavior

- Desktop retains Nyro's large editorial scale, wide spacing, and card hover states.
- At 720px and below, home content becomes a single column, the hero headline fluidly scales with `clamp()`, cards expand to full width, and the menu is touch-friendly.
- Menu, cards, and links are keyboard reachable. Reduced-motion mode disables keyword and counter motion.
- Videos remain muted, inline, and looping; no autoplay audio.

## Implementation and verification

- Keep the project dependency-free: use the current `index.html`, local assets, CSS, and native JavaScript only.
- Add a small automated source-contract test for home anchors, keyword cycling, and the three project targets.
- Verify the home at desktop and 390px mobile widths; check menu open/close, hero links, project anchors, counters, hover/focus cards, and existing page 23 demo.
