# 626 Labs Design System

> **Imagine Something Else.**

626 Labs is an independent studio in Fort Worth, Texas (the legal entity is **626Labs LLC**). It builds exact-fit software: native Windows and Mac apps, a family of Claude Code plugins for builders who ship for real, a NASA-grade astrology app, and merch designed by its own AI pipeline. The founding line: *"I build tools, because care doesn't always scale."*

The brand's personality is two things at once: **technical and playful**. Neon duotone on deep navy, hexagon + brain + circuit motifs, a swoosh that says "thought becomes code, fast."

---

## Products represented

| Product | Surface | Role |
|---|---|---|
| **626labs.dev** | Portfolio hub | The public face. Its look rotates monthly (see *The site's monthly themes* below); the brand in this skill is what stays fixed. |
| **626 Labs Dashboard (Agent OS)** | Private web app | The lab's operating system: projects, decisions, The Architect. The source for `ui_kits/dashboard/`. Private, so show it, don't sell it. |
| **Vibe plugins** | Claude Code plugins | Cartographer, Iterate, Insights, Keystone, Doc, Test, Sec, Wrap, Walk, Prompt, Lingual, Access, Glow, Runbook, Recall, Taker, Thesis, Thesis Engine |
| **Native apps** | Windows (Microsoft Store) and Mac | Sanduhr für Claude, RORORO, 626 Mod Launcher, Right Click PNG, RBX15 Shirt and Pants Maker, SnapSnip |
| **Celestia 3** | Web app | NASA-grade astrology AI |
| **Conundrum by Este** | Etsy shop | Streetwear from the 626 POD Pipeline |

> Reference: `assets/dashboard-reference.png`, the Lab Dashboard as of April 2026, the visual source for `ui_kits/dashboard/`.

The palette and type here are the ones 626labs.dev and the apps actually ship. The colors began as samples from the logo and have been the production values since.

---

## Index

```
├── README.md                  ← you are here
├── SKILL.md                   ← Agent Skill entrypoint (Claude Code compatible)
├── colors_and_type.css        ← foundational CSS variables (colors, type, spacing, motion)
├── editorial.css              ← the light reading layer (theses, Field Notes): Source Serif 4
├── fonts/                     ← the brand faces as woff2, plus fonts.css (relative paths)
│   └── estefont-pro-inline.css  ← the hand as data URIs, for pages that can't load files
├── assets/
│   ├── 626Labs-logo.png       ← primary logo lockup
│   ├── dashboard-reference.png
│   └── Logos/                 ← the 626Labs wordmark in Este's hand: wordmark, signature, 626 mark, favicon
├── preview/                   ← Design System tab cards (one concept per card)
│   ├── logo.html
│   ├── colors-brand.html
│   ├── colors-neutrals.html
│   ├── colors-semantic.html
│   ├── type-display.html
│   ├── type-body.html
│   ├── type-mono.html
│   ├── type-hand.html
│   ├── spacing.html
│   ├── radii.html
│   ├── shadows.html
│   ├── buttons.html
│   ├── inputs.html
│   ├── cards.html
│   ├── badges.html
│   └── motifs.html
└── ui_kits/
    └── dashboard/             ← the Lab Dashboard (Agent OS), React + CSS
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
- **The name**: `626 Labs` (with the space) in prose and UI. `626Labs LLC` (no space) only where the legal entity is meant: copyright lines, legal pages, store publisher fields.

### Pronouns

- **"We"** for the company. *"We ship plugins for vibe coders."*
- **"You"** for the reader. *"Bring your codebase, we'll fill in the docs."*
- Never "our users," "our customers," "the team." Direct address or nothing.

### Emoji & punctuation

- **No emoji in product UI or marketing copy.** The brand's visual character comes from the logo's glyph energy (hex, brain, swoosh, circuit lines) — emoji would dilute it.
- **Em-dashes minimal.** Commas, periods and colons by default; reach for an em-dash only when nothing else does the job. *"Enterprise grade, reached for through vibe coding."*
- **Ellipses for loading states only**, never for dramatic pause in copy.
- **Period-terminated sentences even in microcopy.** *"Tests generated. Opened in editor."*

### Copy examples (from the brand)

- **Tagline**: *Imagine Something Else.*
- **Site subhead**: *Native apps & Claude Code plugins.*
- **Founding line**: *I build tools, because care doesn't always scale.*
- **Plugin positioning**: *Round out your codebase with documentation and tests — written by an agent who read it first.*

### Never use

empower, leverage, seamlessly, unlock, unleash, best-in-class, robust solution, delightful experience, "I'd be happy to", "Let me know if there's anything else". No hedging verbs ("help you to", "enables"). On the 626labs.dev repo the canonical list is `626labs-marketing/docs/banned.md`; this is its working subset.

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
- **Serif (reading layer only)**: **Source Serif 4**, via `editorial.css`, for long-form theses and Field Notes.
- **Hand**: **EsteFont Pro** (`--font-hand`), Este's own handwriting, Regular and Bold. One rule: **Este's own words, in his hand.** Founding and pull quotes in his voice, sign-offs ("— Este"), a personal note on a product page. Never body copy, UI labels, buttons, or anyone else's words; never italic or letter-spaced (the slant and spacing are drawn in). The hand's x-height is 0.45em, so set it about 1.2x the size the surrounding type would use, and never below 24px. Bold at display size; Regular for quotes. Spec card: `preview/type-hand.html`. The one exception is the **wordmark**: "626Labs" in the hand is the company's signature and works as a logo (see *Wordmark* below).
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

## Wordmark

"626Labs" written in Este's hand, with "LLC" set in the system type. It's the signature on the company: the hexagon logo (`assets/626Labs-logo.png`) is the mark, the wordmark is the name.

- **Use the files, don't retype it.** The SVGs in `assets/Logos/` are outlined, so they render the same everywhere with no font loaded. Typing "626Labs" in `--font-hand` is fine for a one-off mock, never for shipped work.
- **The lockup:** "626Labs" in EsteFont Pro Bold, "LLC" in Space Grotesk 600 at about a third of the hand's size, baseline-aligned, a gap of about 0.13x the hand's size. "LLC" is never in the hand.
- **Inks:** `ink-0` on the navy grounds (`-dark`), `brand-navy-deep` on light paper (`-light`). The cyan to magenta duo (`-duo`) is for dark marquee moments only, one per page.
- **Size:** the full lockup at 40px tall or more, so "LLC" stays legible. Below that, use the signature without "LLC" (`626labs-signature-bold-*.svg`), never below 24px tall. Smaller still (avatars, tab icons): the `626-mark-bold-*.svg` or `626-favicon.svg`.
- **Weights:** Bold is the default everywhere. Regular (`*-regular-*.svg`) is the lighter, everyday hand for quieter surfaces, same 24px minimum. `assets/Logos/README.md` lists every file.
- **Clear space:** keep the height of the "6" clear on every side.
- **Never:** stretch, track, italicize, outline, add a glow other than `--glow-duo`, recolor outside the three inks, or set it over busy imagery.
- **Where it goes:** cover and hero lockups, splash screens, the footer signature, merch. In running prose and UI the name is still plain `626 Labs`.

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

## Fonts

| Role | Face | Where it comes from |
|---|---|---|
| Display | **Space Grotesk** | Google Fonts, or `fonts/` |
| Body / UI | **Inter** (+ italic) | Google Fonts, or `fonts/` |
| Mono | **JetBrains Mono** | Google Fonts, or `fonts/` |
| Reading serif | **Source Serif 4** (+ italic) | `editorial.css` (Google), or `fonts/` |
| Hand | **EsteFont Pro** 400 / 700 | `fonts/` only: not on Google Fonts |

These are the production fonts, not substitutes; 626labs.dev self-hosts the same files. `colors_and_type.css` loads the first four from Google Fonts so it works anywhere online. For EsteFont Pro, link `fonts/fonts.css` beside the page, or, where nothing beside the page can load (a claude.ai artifact, a one-file mock), paste `fonts/estefont-pro-inline.css` into a `<style>` block. The four Google faces are SIL OFL 1.1. EsteFont Pro is Este's handwriting, owned by 626Labs LLC: use it for 626 Labs work only.

---

## Caveats

- **The dashboard kit is a recreation** from the April 2026 reference screenshot, not the live app's code. Treat it as a pattern reference.
- **Light surfaces belong to the editorial layer** (`editorial.css`). Product UI and marketing stay dark-first.

---

## Treatments

Treatments are opt-in visual modes layered over the base tokens — same palette, same type, different atmosphere. Adopted treatments carry their own token group in `colors_and_type.css` and a spec card in `preview/`.

### The site's monthly themes

626labs.dev wears a new theme each month (Phosphor Blueprint in September, The Slate Broadsheet in October, Cyan Fade in November); retired ones freeze at dated URLs. Those themes live in the hub repo and are the site's dress, not the brand. Don't copy a month's look into a product as if it were the system. What carries across every theme: the cyan and magenta pair, the tagline, the voice, and Este's words in his hand.

### Phosphor Blueprint (adopted 2026-07-07)

*The drawing is the monitor.* Phosphor Terminal's CRT kit over Blueprint's two-scale drafting grid, field dropped to absolute black. Winner of the 2026-07-07 treatment exploration — six directions plus one remix, judged on identical specimen sheets in `626labs-hub/Design/explorations/2026-07-07-treatments/`.

**Use for:** dark hero surfaces, launch and announcement pages, terminal-flavored product UI — moments that want the late-night-monitor mood at full strength.
**Never on:** the editorial (light-paper) layer, or surfaces where the base navy system is already doing quiet work. This treatment is loud by design.

**The kit** (tokens prefixed `--pb-`, recipes prefixed `.pb-`):

- **Field:** `.pb-field` — absolute black + 24px/120px cyan drafting grid.
- **Scanlines:** `.pb-scanlines` on an empty fixed element — CRT stripes that persist through scroll.
- **Panels:** `.pb-panel` — near-black glass (`--pb-panel`) with a cyan hairline; the grid ghosts through at the edges.
- **Bloom:** `.pb-bloom` / `--pb-bloom-cyan` on display type and stat values; `--pb-bloom-magenta` for cursor and accent blips.
- **Persistence:** `--pb-trail` as the primary-CTA hover shadow — the phosphor afterglow, always trailing rightward.
- **Terminal chrome:** card titlebars in mono, uppercase, the `626 // session` pattern — see the spec card.

Spec card: `preview/treatment-phosphor-blueprint.html`. Full reference sheet: the exploration's `phosphor-blueprint.html`.

---

## Syncing homes

This repo is canonical, but the skill lives in four homes: this repo; the live skill (`~/.claude-personal/skills/626labs-design`, a submodule of the `dotclaude-personal` seat repo since 2026-09-30, which retired the separate dotclaude mirror); the plugin payload (`626labs-plugin/plugins/626labs/skills/design`, whose `SKILL.md` is per-home and never copied); and the hub's adapted `Design/` copy (deliberate fork: root-absolute fonts import; report-only). The Claude app copy is a fifth, uploaded by hand: `python scripts/package-claude-app.py` builds the zip.

After committing here, run:

```
python scripts/sync-homes.py --check    # report drift across all homes
python scripts/sync-homes.py --apply    # push, move the live submodule + bump the seat pointer, copy plugin payload (+patch bump)
```

The 2026-07-07 WCAG-AA staleness incident is why this exists: the plugin and submodule sat at the initial commit for six weeks because nothing propagated.
