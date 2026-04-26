# Dashboard UI Kit — 626Labs "The Lab Dashboard" (Agent OS)

Good-faith recreation of the 626Labs Dashboard (Agent OS v2.0.0) based on the screenshot provided at `assets/dashboard-reference.png`.

## What's here

- `index.html` — live click-thru. Sidebar nav switches active item, project cards are interactive.
- `components.jsx` — `Sidebar`, `TopBar`, `Stat`, `Ring`, `AutoRow`, `ProjectCard`, `I` (icon set).
- `dashboard.css` — product-specific styles (sidebar grid, glow tokens, nav-group labels, project-card layout).

## Not here (flagged)

- **Real iconography** — we're using inline SVG approximations of the screenshot's Lucide-style glyphs. Drop the product's actual icons into `../../assets/icons/` and update `components.jsx`.
- **Fonts** — Space Grotesk + Inter + JetBrains Mono via Google Fonts. If 626Labs uses a licensed stack, provide TTFs and we'll swap.
- **The Architect / Council Debate / Workflows views** — screenshot only shows the Projects view. Those surfaces are stubbed as nav items with no content.
- **Real copy of "The Wire", OKRs, Analytics** — not visible in the reference.

## Notable brand elements captured

- **Cold-navy base** (`#091023` → `#121d33`) with a faint 40px grid overlay
- **Teal `#2ee6c9`** as the "active nav / OK / primary CTA" color — distinct from the brand cyan
- **Purple `#8b5cf6`** used for Scanner/Voice/Whiteboard pills in the top bar
- **JetBrains Mono** for all small meta labels (uppercase, +0.12em tracking)
- **Neon glow** on CTAs, progress bar fill, and the focus ring
