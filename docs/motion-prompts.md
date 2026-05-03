# MotionSites-Style Prompts — Adapted for WiseGenerative

**Source pattern:** MotionSites.ai (Viktor Oddy) — React + Vite + TypeScript + Tailwind CSS hero prompts
**Adaptation goal:** Keep the motion/animation techniques, adapt to luxury concierge + AI theme
**Stack:** React + Vite + TypeScript + Tailwind CSS v4 + Framer Motion

---

## Prompt 1: "Tropical Intelligence" Hero

**Build a light-themed luxury concierge hero section with a navbar, headline, CTA button, and an animated gradient background inspired by Caribbean sunsets (purple → teal → gold). Use React + Vite + TypeScript + Tailwind CSS v4. The background should subtly shift colors on scroll. Add a parallax layer with soft geometric shapes (circles, waves) floating at different depths. The headline uses a serif display font (Playfair Display) with a gradient text fill. The CTA button has a magnetic hover effect that follows the cursor. Include a small scroll-indicator chevron that gently bounces at the bottom. Responsive: on mobile, simplify to single-column with reduced parallax depth."

---

## Prompt 2: "Ecosystem Flow" Animated Cards

**Create a React + Vite + TypeScript section showcasing 13 ecosystem cards for a luxury concierge service. Each card represents a stakeholder (Owner, Client, Housekeeper, Photographer, etc.) with an icon and 2-line description. Cards should animate in with a staggered scroll reveal: each card fades in + slides up 20px with 0.1s delay between them. On hover, cards lift (translateY -4px) and show a colored top border (purple/teal gradient). Add a subtle ambient glow behind the active card. Include a horizontal scroll progress bar at the top that fills as user scrolls. Use IntersectionObserver for performance. Cards should be responsive: 3-column grid on desktop, 1-column stack on mobile with swipeable carousel feel.**

---

## Prompt 3: "Bilingual Chat" Split-Screen Demo

**Build an animated split-screen comparison section showing "Sans IA" vs "Avec IA" for a concierge chatbot. Left side: a dark, muted chat interface showing delayed manual responses. Right side: a bright, glowing chat interface showing instant AI responses in 10 languages. Animate the transition between messages with a typing indicator effect. Add a pulsing connection line between the two sides that morphs from red (broken) to green (connected) as user scrolls into view. Use Framer Motion for the chat message entrance (staggered fade + slide). Include a "language switcher" that cycles through flags (🇩🇪 🇺🇸 🇫🇷 🇪🇸 🇮🇹) with a smooth 3D flip transition. Responsive: stack vertically on mobile with a toggle tab.**

---

## Prompt 4: "Revenue Pulse" Dashboard Preview

**Create a hero/dashboard preview section for an AI revenue prediction tool. Center a glassmorphism card showing a dynamic chart (SVG-based, animating data points) with a "+35%" counter that rolls up from 0% on scroll-into-view. Surround the card with 4 smaller floating stat cards (occupancy rate, predicted demand, pricing suggestion, seasonal trend) that orbit gently in a slow circular motion. Background: a subtle dark grid pattern with a radial gradient spotlight following the cursor. Add a "live pulse" dot in the top-right of the main card that blinks every 2 seconds. Use CSS custom properties for the accent colors (purple #7C3AED, teal #14B8A6, gold #F59E0B). Responsive: on mobile, stack stat cards below main card in 2x2 grid, disable orbit animation.**

---

## Prompt 5: "Memory Dossier" Client Profile Reveal

**Build an interactive client profile card section for an AI memory/CRM feature. A central "client avatar" (stylized emoji + name) is surrounded by a circular orbit of "preference tags" (champagne, white sand beaches, dog-friendly, sunrise lover, etc.). On scroll into view, tags fly in from off-screen and snap into orbit positions with a spring physics animation. On hover, each tag expands to show a detail tooltip. Add a "dossier unfold" effect: clicking the avatar flips the card 180° to reveal the AI-generated personalized message on the back. Use Framer Motion for the spring animations (stiffness: 100, damping: 15). Background: a soft radial gradient shifting from warm cream to pale purple. Include a subtle particle effect (tiny floating dots) for ambiance. Responsive: on mobile, tags stack vertically below avatar instead of orbiting.**

---

## Prompt 6: "Martinique Horizon" Full Landing

**Create a complete React + Vite + TypeScript landing page for "WiseGenerative" — an AI-powered luxury concierge service in Martinique. The page has 6 sections: Hero, Problem (3AM scenario), Ecosystem (13 cards), Examples (4 demos: chatbot, multilingual, revenue prediction, client memory), Results (bilan comparison), CTA. Each section should have a unique scroll-triggered entrance animation:
- Hero: text reveals line-by-line with gradient shimmer
- Problem: a phone notification icon pulses, then expands into the scenario card
- Ecosystem: cards fan in like a hand of playing cards
- Examples: each demo section wipes in from alternating left/right
- Results: two columns (Sans IA / Avec IA) slide together from opposite sides
- CTA: a "send email" envelope icon draws itself (SVG path animation), then the button scales up with a bounce

Use a consistent color system: purple #7C3AED, teal #14B8A6, gold #F59E0B, warm white #F9FAFB. Include a fixed navbar that blurs the background on scroll (backdrop-filter). Add smooth scroll behavior with Lenis or native scroll-behavior. Footer should have a wave SVG separator. Responsive: reduce animation complexity by 50% on mobile, disable parallax.**

---

## Common Animation Tokens (reuse across prompts)

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Dramatic entrances |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bouncy interactions |
| `--duration-fast` | `0.2s` | Hover states |
| `--duration-normal` | `0.4s` | Reveals |
| `--duration-slow` | `0.8s` | Hero entrances |
| `--stagger-delay` | `0.08s` | Card/item sequences |

---

## How to Use These Prompts

1. **With Lovable / v0 / Bolt:** Paste the prompt directly. These tools generate React + Tailwind code.
2. **With Claude:** Paste prompt + ask "Generate this as a single-file React component using Tailwind CSS"
3. **Integration:** Export generated component → drop into `public/` or `src/` of the WiseGenerative project
4. **Deploy:** Use the existing Composio pipeline (`python3 scripts/deploy.py`)

---

## Source
- Original concept: MotionSites.ai by Viktor Oddy
- Research: ChatGate.ai analysis (2026-03-08)
- Adapted for: WiseGenerative concierge MVP
