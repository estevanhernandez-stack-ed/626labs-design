---
name: 626labs-design
description: Use this skill to generate well-branded interfaces and assets for 626Labs, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files:

- `colors_and_type.css` — foundational tokens (colors, type, spacing, motion, shadows/glows)
- `assets/` — logo + reference imagery
- `preview/` — small spec cards for each token group
- `ui_kits/dashboard/` — The Lab Dashboard (Agent OS) recreation — React + CSS

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

**Brand essentials to internalize:**
- Dark-mode first. Deep navy (`#091023`–`#192e44`) base. Neon cyan `#17d4fa` + magenta `#f22f89` signature duo — always pair them.
- Product-specific teal `#2ee6c9` used in The Lab Dashboard for primary CTAs and active nav.
- Type: Space Grotesk (display), Inter (UI), JetBrains Mono (code + small meta labels, always uppercase with +0.12em tracking).
- Voice: builder-to-builder, second person, short sentences, no emoji in UI, no hedging verbs.
- Tagline: *Imagine Something Else.*
