# Animation Audit & Build Plan — WiseGenerative

## Current State Audit

**Stack:** Static HTML (662 lines) + CSS (1448 lines) + Express server
**Current animations:** One IntersectionObserver (fade-in + translateY 20px)
**Libraries:** None (vanilla)
**Deployment:** Vercel via Composio pipeline

### What's Working
- ✅ Content structure is solid (6 sections, 13 ecosystem cards, 4 examples)
- ✅ Light theme with brand colors (purple #7C3AED, teal #14B8A6, gold #F59E0B)
- ✅ Mobile responsive with burger menu
- ✅ Scroll reveal on cards/columns/items (basic)

### What's Missing
- ❌ No animation library — only CSS transitions
- ❌ Scroll-triggered animations are basic (just fade-in)
- ❌ No parallax, no staggered sequences, no timeline control
- ❌ No smooth scroll (native only)
- ❌ No SVG path animations
- ❌ No hover micro-interactions beyond basic transforms
- ❌ No ambient motion (floating shapes, pulsing elements)

---

## Build Plan

### Phase 1: Foundation (CDN libraries, smooth scroll)
**Goal:** Add animation infrastructure without touching existing markup

| File | Purpose |
|------|---------|
| `public/js/gsap+scrolltrigger` | Scroll-triggered animation engine |
| `public/js/lenis` | Smooth scroll with inertia |
| `public/css/animations.css` | Keyframes, animation utilities, tokens |
| `public/js/animations.js` | Per-section GSAP timelines |

### Phase 2: Section-by-Section Animation

| Section | Animation | Technique |
|---------|-----------|-----------|
| **Navbar** | Shrink + blur on scroll | ScrollTrigger pin + CSS class toggle |
| **Hero** | Text line-by-line reveal + gradient shimmer | GSAP split-text + CSS background-clip animation |
| **Hero BG** | Subtle parallax shift | ScrollTrigger scrub on background-position |
| **Hero CTA** | Magnetic hover (CSS-only) | :hover transform with transition |
| **Problem** | Phone notification pulse → expand | GSAP timeline: pulse → scale → content reveal |
| **Ecosystem** | Cards fan-in from bottom | GSAP stagger with rotation + translateY, spring ease |
| **Ecosystem** | Ambient glow on hover | CSS box-shadow transition |
| **Examples** | Wipe-in from alternating sides | GSAP clip-path or translateX with ScrollTrigger |
| **Bilan** | Columns slide from opposite sides | GSAP translateX from -100% / +100% |
| **CTA** | SVG envelope path draw | GSAP DrawSVGPlugin or stroke-dashoffset |
| **CTA** | Button bounce on scroll-in | GSAP scale elastic ease |
| **Footer** | Wave SVG separator | CSS keyframe animation on SVG path |

### Phase 3: Polish
- Magnetic cursor effects (optional, performance-sensitive)
- Reduced-motion media query support
- Mobile animation reduction (50% complexity)
- Performance audit (will-change, composite-only properties)

---

## Dependencies (CDN — no build step)

```html
<!-- GSAP + ScrollTrigger -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

<!-- Lenis smooth scroll -->
<script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>
```

**Why GSAP over Framer Motion?**
- Framer Motion = React-only. We're building vanilla HTML/CSS.
- GSAP works natively with DOM elements, no React rewrite needed.
- ScrollTrigger is the industry standard for scroll animations.
- Better performance control (will-change, RAF-based).

**Why Lenis over native scroll-behavior?**
- Inertia-based smooth scroll (feels premium)
- Syncs with GSAP ScrollTrigger automatically
- Touch-friendly on mobile

---

## Architecture

```
public/
├── index.html              ← Add CDN scripts + data-animate attributes
├── css/
│   ├── main.css            ← Existing (untouched)
│   └── animations.css      ← NEW: keyframes, tokens, utilities
├── js/
│   └── animations.js       ← NEW: GSAP timelines per section
└── images/                 ← Existing assets
```

---

## Animation Tokens (CSS custom properties)

```css
:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --duration-fast: 0.2s;
  --duration-normal: 0.5s;
  --duration-slow: 0.8s;
  --duration-hero: 1.2s;
  --stagger-delay: 0.08s;
}
```

---

## Performance Rules
- Use `transform` and `opacity` only (compositor thread)
- Apply `will-change` before animation, remove after
- Disable heavy animations on mobile (`@media (prefers-reduced-motion)`)
- Use IntersectionObserver for triggering (ScrollTrigger does this)
- Avoid animating layout properties (width, height, top, left)

---

## Next Step
Build Phase 1: Create `animations.css` + `animations.js` + update `index.html` with CDN imports.
Then deploy and iterate.
