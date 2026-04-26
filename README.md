# 626 Labs Design System

> **Imagine Something Else.**

626 Labs LLC is a small-but-ambitious outfit shipping **vibe-coded SaaS** — production software assembled fast, iterated in the open, and launched at enterprise grade. The flagship effort is an **ADO (Application Development Operations) environment** being rolled out via their day-job employer, reaching for enterprise quality through vibe coding. On the side, they ship **fun apps** and **plugin tools for vibe coders** (think: documentation generators, test scaffolders, and other codebase-rounding utilities — particularly for Claude Code).

The brand's personality is two things at once: **technical and playful**. Neon duotone on deep navy, hexagon + brain + circuit motifs, a swoosh that says "thought becomes code, fast."

---

## Products represented

| Product | Surface | Role |
|---|---|---|
| **626Labs Dashboard — Agent OS** | SaaS web app (flagship) | Primary 626Labs AI-native project management platform (v2.0.0). Built with React 19, TypeScript, Vite, TailwindCSS. "The Lab Dashboard" — houses Operation Center (Projects, Universe, Decisions, Initiatives, The Architect, Goals & OKRs, Analytics), Build & Ship (Workflows, GitHub, IDE Control), and Agent Ops (Actions, Council Debate). |
| **626labs.dev** | Marketing / Portfolio Hub | Landing page indexing 626Labs products |
| **Vibe Launch** | Claude Code plugin | Solo builder from "I have a repo" to "I have a branded product" |
| **Vibe Cartographer** | Claude Code plugin | Spec-driven development: Idea → shipped app |
| **Vibe Doc** | Plugin / CLI | AI-powered documentation gap analyzer for modern codebases |
| **Sanduhr für Claude** | Native macOS widget | SwiftUI port of the Python/tkinter Sanduhr usage widget — floating always-on |

> Reference: `assets/dashboard-reference.png` — screenshot of the live "The Lab Dashboard" as of April 2026. Used as the primary visual source for the `ui_kits/dashboard/` recreation.

## Sources consumed

- `uploads/626Labs.png` — primary brand logo (provided by user)
- `626labs.dev` — marketing site, fetched for product positioning copy
- No Figma, codebase, or additional brand collateral was provided; color values were **sampled directly from the logo PNG** and brand language was **distilled from the site's tagline and product descriptions**

> ⚠️ **No codebase or Figma access.** UI kits in this system are good-faith recreations rooted in the brand's visual DNA (logo, tagline, dark-neon aesthetic), not pixel matches of existing screens. Ship us screenshots, a repo, or Figma access and we'll tighten the fit.

---

## Index

```
├── README.md                  ← you are here
├── SKILL.md                   ← Agent Skill entrypoint (Claude Code compatible)
├── colors_and_type.css        ← foundational CSS variables (colors, type, spacing, motion)
├── assets/
│   ├── 626Labs-logo.png       ← primary logo lockup
│   └── logo-mark.svg          ← hexagon + brain mark (extracted)
├── preview/                   ← Design System tab cards (one concept per card)
│   ├── logo.html
│   ├── colors-brand.html
│   ├── colors-neutrals.html
│   ├── colors-semantic.html
│   ├── type-display.html
│   ├── type-body.html
│   ├── type-mono.html
│   ├── spacing.html
│   ├── radii.html
│   ├── shadows.html
│   ├── buttons.html
│   ├── inputs.html
│   ├── cards.html
│   ├── badges.html
│   └── motifs.html
├── ui_kits/
│   ├── website/               ← marketing site (626labs.dev style)
│   └── ado/                   ← ADO environment SaaS app
└── fonts/                     ← (Google Fonts loaded via @import; no local TTFs — see notes)
```

---

## Content Fundamentals

The voice of 626 Labs is **builder-to-builder** — it assumes the reader ships code, recognizes the tools, and doesn't need hand-holding. It's confident, a touch irreverent, and refuses corporate stiffness.

### Voice rules

- **Second person, active voice.** *"You ship. We build the tools that round out your codebase."* Never "users will be able to."
- **Short sentences. Then longer ones with more nuance when the point earns it.** Rhythm matters.
- **Technical specificity over abstraction.** "Claude Code plugin" beats "AI-powered assistant." Name the tool, name the verb.
- **A wink, not a wisecrack.** The tagline *"Imagine Something Else"* is playful but not cute. Humor is dry.
- **No hedging.** Remove "help you to," "enables," "empowers," "leverages," "seamlessly."

### Casing

- **Titles and H1s**: Sentence case. *"Vibe coding, shipped."* Not "Vibe Coding, Shipped."
- **Buttons**: Sentence case, verb-first. *"Install plugin", "Start building", "Open workspace"*.
- **UI labels / eyebrows**: UPPERCASE with +0.1em tracking, sparingly — used as a "circuit-trace" accent (see Visual Foundations).
- **Product names**: Preserve the casing `626Labs` uses internally — the wordmark is `626Labs LLC` with a lowercase `labs`. When written inline, prefer `626 Labs`.

### Pronouns

- **"We"** for the company. *"We ship plugins for vibe coders."*
- **"You"** for the reader. *"Bring your codebase, we'll fill in the docs."*
- Never "our users," "our customers," "the team." Direct address or nothing.

### Emoji & punctuation

- **No emoji in product UI or marketing copy.** The brand's visual character comes from the logo's glyph energy (hex, brain, swoosh, circuit lines) — emoji would dilute it.
- **An em-dash is a welcome rhetorical move.** *"Enterprise grade — reached for via vibe coding."*
- **Ellipses for loading states only**, never for dramatic pause in copy.
- **Period-terminated sentences even in microcopy.** *"Tests generated. Opened in editor."*

### Copy examples (from the brand)

- **Tagline**: *Imagine Something Else.*
- **Site subhead**: *Native apps & Claude Code plugins.*
- **ADO positioning**: *Enterprise grade, reached for via vibe coding.*
- **Plugin positioning**: *Round out your codebase with documentation and tests — written by an agent who read it first.*

### Don't

- ❌ "Unlock the power of AI-driven development"
- ❌ "Solutions that empower engineering teams"
- ❌ "Seamlessly integrates with your workflow"
- ❌ "🚀 Ready to take your code to the next level?"

### Do

- ✅ "Ship enterprise software with vibe-coded speed."
- ✅ "Your codebase, with the docs it always needed."
- ✅ "Plugin installed. Run `/test` and walk away."

---

## Visual Foundations

626 Labs is **dark-mode-first**. Every surface starts from deep navy (`#0f1f31` / `#192e44`) and earns brightness through *signal* — neon cyan for logic and circuitry, magenta for energy and imagination. Bright type is white; everything else rides the ink scale.

### Color

- **Primary surface**: `--brand-navy` `#192e44` (the logo's field).
- **Signature duo**: `--brand-cyan` `#17d4fa` + `--brand-magenta` `#f22f89`. **Always pair them** — the swoosh in the logo is both colors crossing; using one without the other feels incomplete.
- **Signature gradient**: `linear-gradient(135deg, cyan → magenta)`. Used for the wordmark glow, CTA hover states, selected nav items, and occasional hairline dividers. Never use it as a full-panel background — it belongs to accents, strokes, and text.
- **Neutrals** are cool-leaning navy-grays (`--ink-50` through `--ink-950`). No warm grays.
- **Semantic**: `--success` `#2bd99a`, `--warning` `#ffb454`, `--danger` `#ff5472`, `--info` = brand cyan. All are tuned to sit on the dark surface without washing out.

### Type

- **Display / headlines**: **Space Grotesk** — geometric, slightly quirky, feels "engineered but human." `-0.02em` to `-0.03em` tracking on big sizes.
- **Body / UI**: **Inter**. Workhorse, high legibility at small sizes.
- **Mono**: **JetBrains Mono** — 626 Labs ships developer tools; code fragments are first-class citizens in the UI.
- **Scale**: 1.200 ratio, clamped for responsive (`clamp(32px, 4.2vw, 48px)` for h1).

### Backgrounds

- **Solid navy** is the baseline — no full-bleed photography.
- **Subtle textures** earn their place: a **faint circuit-trace pattern** (thin cyan lines, ~6% opacity) on hero sections; a **radial duotone glow** behind primary content blocks (`--brand-gradient-glow`).
- **No stock photography.** No illustrated people. No gradient meshes that feel generic.
- **Full-bleed imagery** is reserved for product screenshots and occasional desaturated abstracts tinted with the brand duo.

### Animation

- **Easing**: `cubic-bezier(.2,.7,.2,1)` for out; `cubic-bezier(.7,0,.3,1)` for in-out. No bouncy springs.
- **Durations**: `120ms` micro-interactions, `220ms` panel transitions, `380ms` page-level.
- **No fade-ins on scroll.** Things appear. The brand respects the reader's time.
- **Neon-glow pulse** is the one showy animation allowed — reserved for "processing" states and the logo mark on the home page.

### Hover states

- **Primary CTA**: brightness up 8%, glow intensifies (`--glow-cyan` radius grows).
- **Secondary / ghost**: background goes from `transparent` → `rgba(255,255,255,.06)`, border strengthens.
- **Text links**: underline appears as a hairline gradient (cyan → magenta).
- **Cards**: border goes from `--border-1` to `--border-accent`, no lift or scale.

### Press states

- **Color shift**, not shrink. Filled buttons dim 6%; ghost buttons background goes to `rgba(255,255,255,.10)`. No `scale(.98)` — the brand feels precise, not toy-like.

### Borders

- **Default**: 1px hairline at `rgba(255,255,255,.08)` — nearly invisible, just enough structure.
- **Accent**: 1px `rgba(23,212,250,.45)` on focus and active selection.
- **No dashed borders** anywhere.

### Shadows & elevation

- **On dark surfaces**, shadows barely register. The system substitutes **neon glows** (`--glow-cyan`, `--glow-magenta`, `--glow-duo`) for elevation cues.
- **Inner strokes** (`inset 0 0 0 1px rgba(255,255,255,.06)`) provide subtle pop without leaving the dark aesthetic.
- A crisp `0 12px 32px rgba(0,0,0,.55)` sits under modal dialogs.

### Protection vs capsules

- **Capsules (pills)** are the preferred container for status chips, nav items, and filter chips — they echo the rounded-hex silhouette of the logo.
- **Protection gradients** (scrim under bottom nav, over hero imagery) use `linear-gradient(to top, var(--bg-0) 0%, transparent 100%)` — solid navy fade, no blur.

### Layout rules

- **Sidebar + canvas** for app surfaces; sidebar is ~260px, dark navy, with the logo mark top-left.
- **Max content width** is `1240px` for marketing, `1440px` for app views.
- **Grid**: 12-column, 24px gutter.
- **Fixed elements**: top app bar is 56px; bottom status bar (when present) is 36px. Both sit flush, no floating.

### Transparency & blur

- **Backdrop blur** on the top nav when content scrolls beneath (`backdrop-filter: blur(12px); background: rgba(15,31,49,.7)`).
- **Modal overlays** are `rgba(5,12,24,.6)` without blur — blur is reserved for productive surfaces, not interstitials.
- **Tooltips** use solid `--bg-3`, no transparency.

### Imagery vibe

- When photography appears, it is **cool-tinted**, slightly **high-contrast**, with **mild grain**. Think late-night studio monitors, not sunny stock. Screens-within-screens are welcome.
- **Mockups** show our own UI, tinted toward the brand duo.

### Corner radii

- **Small controls** (chips, inline badges, inputs): `--r-sm` 6px
- **Default** (cards, buttons, panels): `--r-md` 10px
- **Hero panels / feature cards**: `--r-lg` 14px
- **Marquee containers, modals**: `--r-xl` 20px
- **Pills / avatars**: `--r-pill` (full)

### Cards

- **Default card**: `background: var(--bg-2); border: 1px solid var(--border-1); border-radius: var(--r-md); box-shadow: var(--inner-stroke);`
- **On hover**: `border-color: var(--border-accent);` — no lift.
- **Featured card**: add `--brand-gradient-glow` as a layered background behind the content and a 1px cyan border.

---

## Iconography

626 Labs leans on **stroke-style line icons with occasional duotone accents**. Think Lucide (the library 626Labs.dev itself uses visual vocabulary adjacent to), with periodic two-color fills using the brand duo on emphasis icons.

- **Primary icon library**: [**Lucide**](https://lucide.dev) — loaded from CDN. 1.75px stroke, round linejoin, round linecap. Matches the "precise but friendly" voice.
- **Sizing**: 16 / 20 / 24 / 32px. Never mix sizes within a component.
- **Color**: Icons inherit `currentColor`. At rest they're `--fg-2`; on hover / selected they're `--brand-cyan` or, for destructive actions, `--danger`.
- **Emphasis icons**: occasional duotone — base stroke in `--fg-2`, a filled secondary path at 40% `--brand-magenta`. Reserved for marketing and empty-states, not inline UI.
- **Logo mark** (hexagon + brain + circuit + swoosh) is **not an icon**. Never resize below 32px; never crop; never recolor outside the approved duo.
- **No emoji.** Not in UI, not in marketing, not in error messages. If a concept needs a glyph, it gets an icon.
- **No Unicode dingbats** (`•`, `★`, `→`) as icons — use Lucide equivalents (`dot`, `star`, `arrow-right`).
- **Custom SVGs**: if Lucide doesn't have it, draft in the same style (1.75px stroke, 24px viewport, round joins) and store under `assets/icons/custom/`.

**Substitution flag:** We link Lucide from CDN because no icon set was shipped with the brand package. If 626 Labs has internal glyphs, drop them in `assets/icons/` and update this section.

---

## Font substitution note

The provided brand materials did not include font files. We've chosen Google Fonts substitutes that match the brand's engineered-but-friendly character:

| Role | Used | Reasoning / alternative |
|---|---|---|
| Display | **Space Grotesk** | Geometric, slight humanist quirk, pairs with technical brands |
| Body / UI | **Inter** | High legibility at UI sizes — consider swapping for **Söhne** or **Geist** if you have a license |
| Mono | **JetBrains Mono** | Built for code; ligature-friendly — **Berkeley Mono** or **Commit Mono** are premium alternatives |

**⚠️ Please confirm or provide brand fonts** and we'll swap `@import` for local `@font-face` declarations in `fonts/`.

---

## Caveats

- Colors are **sampled from the logo**, not a provided palette. The cyan and magenta hues are close to the PNG; official hex values may differ slightly — confirm.
- **No codebase, no Figma, no existing UI screenshots** were shared. The UI kits demonstrate how the brand *could* render in product, not how it currently does.
- **Tone guidance is inferred** from the tagline and product positioning. Happy to tune once we see actual marketing copy, in-product strings, or email templates.
