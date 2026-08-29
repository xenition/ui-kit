# Design system review — @xenition/ui benchmarked against the majors

What `@xenition/ui` was measured against, what each reference system actually
changed, and what is still open. This is the record for the **V4 design line**.

Reviewed **2026-08-26**. Recorded here **2026-08-29** — the review had until now
existed only as commit messages and code comments, in no document.

---

## The six systems, and what each one was used for

| System | Used for | Traceable in code |
|---|---|---|
| **Material Design 3** | Elevation, state layers, motion | **48 files** — adopted wholesale |
| **shadcn/ui** | Composition, token structure | **5 files** — closed six vocabulary gaps |
| **Apple HIG** | Sheets, safe areas, control sizing | **2 files** named; 44pt floor + safe areas in use |
| **Tamagui** | React Native theming, token architecture | **0 files** — no traceable change |
| **gluestack-ui** | React Native screen-level patterns | **0 files** — no traceable change |
| **Dribbble** | Visual references | **none** — access blocked by a bot challenge |

Two of the six left no trace. That is worth knowing rather than assuming the
review covered them: **Tamagui and gluestack-ui were consulted but changed
nothing.** If their ideas were meant to land, that work has not happened yet.

---

## What Material Design 3 actually changed

Sourced verbatim from `material-components/material-web`, token version
`v0_192`, fetched 2026-08-26. Numbers are re-exported from the compiled theme,
never retyped, so the scale lives in exactly one place.

### State layers — `src/primitives/internal/v4-state.ts`

The sweep of 74 component pairs found **four competing vocabularies at once**:
`opacity: 0.6`, `0.7`, `0.85`, a fill of `colors.border` (a *hairline* colour
used as a *surface*), and three different neutral mixes. A pressed `ListRow`
and a pressed `BottomNav` tab were measurably two different products.

M3's model replaced all of it: a state layer is the component's own content
colour at a fixed opacity over its container.

| State | Opacity |
|---|---|
| hover | `0.08` |
| focus | `0.12` |
| pressed | `0.12` |
| dragged | `0.16` |
| disabled content | `0.38` |
| disabled container | `0.12` |

Three spellings, because the platforms cannot say the same thing:

- `stateOverlay()` — an `rgba()` layer, ground-independent. React Native has no
  `color-mix()`, so this is how a native control gets a layer.
- `stateMix()` — the same layer flattened to an opaque hex against a ground the
  component owns, preserving its text-contrast promise.
- `stateCss()` — the web spelling, `color-mix()` over two custom properties, so
  the layer follows `[data-theme="dark"]` with no dark rule of its own.

This replaced `hover:opacity-70`. Dimming fades the control's own *content*,
which is the signal M3 spends `0.38` on to mean **disabled** — so a hovered ✕
and a dead ✕ looked alike.

### Motion — `src/primitives/internal/v4-motion.ts`

The line had been built against `design.md` §36.2, which sets *bands*, not a
scale. Each file picked its own number inside its band: **seven durations for
four ideas** (`120`, `140`, `160`, `180`, `200`, `280`, `300`) and three easings
for one.

The rule the line now follows:

| Movement | Token | Duration |
|---|---|---|
| micro-feedback — a glyph turning, a ring lighting | `quick` | 100ms |
| a control changing state — checkbox, switch, accordion | `standard` | 200ms |
| something crossing the screen — sheet, drawer | `enter` | 400ms |

Easing follows direction of travel: `EASE_STANDARD`
`cubic-bezier(0.2, 0, 0, 1)` for a state change that starts and ends in place,
`EASE_ENTER` `cubic-bezier(0.05, 0.7, 0.1, 1)` for arrivals, `EASE_EXIT`
`cubic-bezier(0.3, 0, 1, 1)` for departures.

A scale decides how long a movement takes, not whether it happens — every
sheet keeps its own `prefers-reduced-motion` block.

### Elevation

`ElevationToken` carries `color / opacity / radius / offsetY` plus a separate
`android` value, in three roles: `card`, `sheet`, `action`.

---

## What shadcn/ui actually changed

The review exposed **six vocabulary gaps** — one token doing several jobs.
Closed in `6f8da3c`, with `mutedText` and `ring` landing earlier in `848e745`.

| Gap | Fix |
|---|---|
| `muted` was both a fill and a text colour | `muted` is a fill; text reads `mutedText` |
| one `border` doing three jobs (table hairline, card edge, input edge) | `input` split out |
| no focus-ring token | `ring` + `RingTokens { width, offset }` |
| card had no ground of its own | `card` / `onCard` |
| floating panels borrowed `surface` | `popover` / `onPopover` |
| selection had no pair | `selected` / `onSelected` |

`card` moves toward white in **both** schemes, so a raised card reads as raised
on a light page and on a dark one.

---

## What Apple HIG actually changed

Lighter than the other two, and only partly traceable:

- **44pt tap-target floor** — `MIN_TAP = 44` in `AccordionV4`,
  `AUTH_TAP_TARGET = 44` in `AuthCard`, asserted in specs. `ActionSheetV4`
  deliberately takes its target *from the scale* rather than a remembered 44.
- **Safe areas** — 17 native files.
- **`hitSlop`** — 27 native files.
- **Control sizing** — no V4 native component exposes an `sm`/`md`/`lg` size
  scale. If HIG control sizing was meant to land, it did not.

---

## Coverage

**V4 is a primitives-only design line.** It has not touched the vertical modules.

| | Count |
|---|---|
| V4 components, web | **87** |
| V4 components, native | **87** (perfect parity — no orphan either way) |
| V4 specs, web | 87 |
| V4 specs, native | **84** — three short |
| `primitives` module upgraded | **90 / 109** |
| Vertical modules upgraded | **0 / 52** (~656 components) |

### The 19 primitives still on the old design

The auth cluster is the bulk of it:

`AuthBrandTile` · `AuthCard` · `AuthDivider` · `AuthField` · `AuthHeading` ·
`AuthProviderButton` · `AuthStickyFooter` · `AuthSubmitButton` ·
`AuthSwitchFooter` · `AuthTermsCard` · `ForgotPasswordForm` · `LoginForm` ·
`SignupForm` · `StepList` · `Icon` · `Text`

Plus three that are not visual and likely never need a V4:
`ToastProvider` · `XenitionUIProvider` · `XenitionNativeThemeProvider`

So the real remaining primitives work is **16**, and **13 of those are one
coherent auth surface** — worth doing as a single pass rather than
component-by-component.

---

## Bookkeeping defects found while writing this

1. **`PriceTag` is misfiled.** `COMPONENTS.md` line 109 lists it in the
   `primitives` table as done, but it lives in `src/commerce/`
   (`PriceTagV4.tsx`, re-exported from `src/native/primitives/index.ts`).
   Line 261 lists the same component under `commerce` as **not** upgraded.
   One component, two rows, contradicting each other.
2. **Three native V4 specs missing** — 87 native components, 84 native specs.
3. **`GlassPanel` and `GradientText`** are marked done with a `—` in the V4
   column. That is legitimate — they were upgraded in place — but the table
   gives no way to tell "upgraded in place" from "not yet started".

---

## Open

- Tamagui and gluestack-ui produced nothing. Decide whether to actually mine
  them for RN theming and screen-level patterns, or drop them from the list.
- Dribbble was never reviewed — the bot challenge blocked it. Needs another
  route or dropping.
- HIG control sizing did not land.
- The 16 real remaining primitives, 13 of them the auth surface.
- 52 vertical modules, ~656 components, entirely untouched by V4.
- The three `COMPONENTS.md` defects above.
