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

## Second review — the charts pass (2026-08-30)

The six systems were re-reviewed against a different question: not "how should
a control look" but "how should data be encoded". The full findings, with URLs
and figures, are in `CHARTS-V4-BRIEF.md` §2. What changed here is the scoreboard
above, and two of its rows do not move.

| System | This review's yield | Traceable in code |
|---|---|---|
| **Apple HIG** | the most quotable of the six | descriptive headline, 44/28 tap floors, never-colour-alone, reduce-motion |
| **IBM Carbon** | **new to the list**, and the best data-viz source of the six | sequence applied strictly, sequential inverts per theme, alert palette held separate |
| **shadcn/ui** | closest prior art, and it stops short | five slots, dark retuned not dimmed, config/data split, no auto-sizing |
| **Material Design 3** | token files only, again | shape and typescale figures; the chart-colour guidance is not retrievable |
| **Fluent 2 / Atlassian / NN/g** | three usable figures | subordinate axis ink, the 5–6 categorical ceiling, pre-attentive length |
| **Tamagui** | **nothing, second review running** | 0 files |
| **gluestack-ui** | **nothing, second review running** | 0 files |
| **Dribbble** | **blocked, third attempt** | none |

### What actually landed

`src/primitives/internal/v4-chart.ts`, plus a thin adapter on each twin. It
replaces the base charts' five-slot **semantic** cycle (`primary`, `accent`,
`success`, `warn`, `danger`, taken modulo the series index) with five slots
**derived from the seed's own brand hue** by rotation at alternating
lightnesses.

The base cycle had three defects and each one misleads a reader:

1. Status colour spent on identity — the fourth region of a donut painted
   `warn`, the fifth `danger`, when nothing is wrong with either and they are
   simply fourth and fifth.
2. A modulo that wraps, so a sixth series is silently the same colour as the
   first and the legend repeats the swatch as though that were fine.
3. Three of the five sitting in a green-yellow-red arc that protanopia and
   deuteranopia collapse — the exact failure a categorical palette exists to
   prevent.

### The palette was measured, not chosen

The hue offsets and lightnesses were searched against the `dataviz` skill's
`validate_palette.js` (lightness band, chroma floor, CVD separation under
Machado-Oliveira-Fernandes 2009 at severity 1.0, a normal-vision floor, contrast
vs surface), evaluated at **24 brand hues 15° apart**, because the seed is the
app's choice and a palette that only works for a blue brand is not a palette.
The shipped TypeScript reproduces:

| measure | light | dark | gate |
|---|---|---|---|
| hard failures over 24 brand hues | 0 | 0 | 0 |
| worst adjacent CVD ΔE | 6.5 | 6.5 | ≥ 6 floor · ≥ 8 target |
| worst adjacent normal-vision ΔE | 21.5 | 20.2 | ≥ 15 |
| first three slots, all-pairs normal ΔE | 18.3 | 17.7 | ≥ 15 |

Two results are load-bearing and worth carrying into any future palette work:

- **Eight slots clearing ΔE 8 for every brand hue is not reachable by rotation
  from a single hue.** That was measured across several thousand candidate
  configurations, not assumed. Five is what the constraint allows, which is
  also what shadcn ships and what Atlassian names as the practical ceiling.
- **The result lands in the 6–8 floor band**, which is legal *only* with
  secondary encoding. So a legend for two or more series, direct labels at four
  or fewer, and a 2px surface gap between adjacent fills are **requirements** of
  this module, not preferences — and that is why the charts brief reads the way
  it does.

Sequential and diverging ramps landed alongside, because magnitude and polarity
are not identity and must never take the categorical slots. `Heatmap`'s
hand-rolled `opacity: 0.08 + intensity * 0.92` was a sequential scale built by
eye, and it failed at the light end: a 0.08 cell is invisible.


---

## Coverage

**V4 has left the primitives.** As of 2026-08-30 it covers the three modules
every vertical composes.

| module | web | native |
|---|--:|--:|
| `primitives` | 104 | 105 |
| `charts` | 20 | 20 |
| `layout` | **17** | **16** |
| `dashboard` | 16 | 16 |
| `motion` | 6 | 5 |
| `commerce` | **11** | **11** |
| `marketplace` | **12** | **12** |
| `XenitionUIProviderV4` (root) | 1 | — |
| **total** | **188** | **186** |

Counted from the tree, not carried forward — the previous figures here (104 /
105) predated the layout, dashboard and charts passes and had gone stale, which
is the same bookkeeping failure recorded below for `PriceTag`.

**And counted with a corrected filter.** The figures published earlier on
2026-08-30 (158/157, then 164/162) were each one short on both twins, because
the inventory excluded files matching `*spec*` — which silently swallows
`AspectRatioV4.tsx`, since **"A-spec-tRatio" contains the word**. This is the
mirror image of the rule already recorded below ("never count specs by
filename"): that one undercounts *specs* by globbing on a naming convention,
this one undercounts *components* by filtering on a substring. Filter on the
suffix (`! -name '*.spec.tsx'`), never on `*spec*`.

Two things follow from the corrected count: `layout` is **18 / 18 complete**,
and `ListSeparator` is no longer native-only — the V4 pass gave it a web twin
the base line never had, so 15 of layout's 18 are twinned at V4 rather than 14.

The one-component gap each way is deliberate and matches the bases: `Cluster`
and `Sticky` are web-only (`position: sticky` has no native equivalent),
`KeyboardAvoider` and `ListSeparator` native-only, and
`XenitionNativeThemeProviderV4` is native-only because its base is.

**46 of 53 modules — roughly 611 components — are still untouched by V4.** That
is the whole remaining surface, and it is now the verticals rather than the
foundations. `commerce` and `marketplace` (2026-08-30) are the first two
verticals done, taken together because they are one surface.

### What the motion pass added (2026-08-30)

Six on web, five on native, and a correction: the native barrel had claimed
`Parallax` was web-only because scroll position has "no direct React Native
analogue". It has one — `Animated.ScrollView` with `onScroll` through
`useNativeDriver` is the canonical RN parallax — so `ParallaxV4` now exists on
both twins. `TiltCard` really is web-only: pointer tilt maps a *hovering*
pointer onto two rotations and touch has no hover.

The pass's own finding is the awkward one: **the module whose entire subject is
motion was the one not using `v4-motion.ts`.** `Reveal` ran 600ms on web and
500ms on native for the same entrance; native `Reveal` passed no easing at all
and took `Animated.timing`'s symmetric default on an arrival; `TiltCard` typed
`200ms ease-out`; native `AnimatedCounter` still used the
`Easing.out(Easing.cubic)` that `v4-motion.ts` names as what the line reached
for before the scale existed.

It also settled a question the scale had never answered: **the scale governs a
transition, not playback.** A marquee's loop and a counter's count are timed by
their content — their durations are not violations — but their easings still
come from the scale.

### What the charts pass added (2026-08-30)

Twenty components on both twins, and four of them gained a **web twin that
never existed**: `ComparisonBars`, `MiniBar`, `ProgressBars` and `RangeBar`
lived only under `native/charts` while `COMPONENTS.md` counted twenty for both.
Both barrels now carry the same roster, and a spec reads that one roster from
each of the two Jest projects so the parity claim is checked rather than
asserted.

### The 19 that finished the module (2026-08-29)

The auth family, built as one pass: `AuthBrandTileV4` · `AuthCardV4` ·
`AuthDividerV4` · `AuthFieldV4` · `AuthHeadingV4` · `AuthProviderButtonV4` ·
`AuthStickyFooterV4` · `AuthSubmitButtonV4` · `AuthSwitchFooterV4` ·
`AuthTermsCardV4` · `ForgotPasswordFormV4` · `LoginFormV4` · `SignupFormV4`

The shared foundations: `TextV4` · `IconV4` · `StepListV4`

And the three providers, which had been written off as "non-visual" and were
not: `ToastProviderV4` (it paints a whole toast stack), `XenitionUIProviderV4`,
`XenitionNativeThemeProviderV4`.

### Defects this pass found in the bases

Each was a decision made twice rather than once — the same failure the M3 and
shadcn passes were fixing at the token level:

1. **`Text` bound no font family on either twin.** A seed choosing a heading
   face never showed it. `AuthHeading` had "compensated" by painting a
   `font-heading` class over a `TextV4` that already resolved the face, so at a
   non-display size the span carried `font-body` and `font-heading` at once and
   stylesheet order decided.
2. **`AuthStickyFooter` read no safe-area inset** — the CTA sat under the
   gesture bar on every phone with one, though §5 asks for it explicitly.
3. **`AuthCard`'s twins disagreed on the footer** — web left a string unstyled,
   native set it `sm`/`muted`.
4. **`AuthField` showed errors as colour alone** — no message.
5. **`Toast` used `text-muted` as a TEXT colour, twice** — the exact bug the
   shadcn review closed, still live in the one component nobody re-read.
6. **34 native components each opened their own Reduce Motion listener**, all
   starting at motion-on, so entry animations played once before the OS answer
   arrived. An accessibility defect, not a performance note.

---

## Bookkeeping defects found while writing this

1. **`PriceTag` is misfiled.** `COMPONENTS.md` line 109 lists it in the
   `primitives` table as done, but it lives in `src/commerce/`
   (`PriceTagV4.tsx`, re-exported from `src/native/primitives/index.ts`).
   Line 261 lists the same component under `commerce` as **not** upgraded.
   One component, two rows, contradicting each other.
2. **Spec counts cannot be taken from filenames.** An inventory of
   `*V4.native.spec.tsx` reports three components (`ActionSheetV4`,
   `BottomSheetV4`, `ModalV4`) as having no spec. They do — under kebab-case
   names (`action-sheet-v4.native.spec.tsx`). **20 of the 126 native specs use
   kebab or topic filenames**, so a PascalCase glob undercounts. Count by
   importing component, not by filename.
3. **`GlassPanel` and `GradientText`** are marked done with a `—` in the V4
   column. That is legitimate — they were upgraded in place — but the table
   gives no way to tell "upgraded in place" from "not yet started".

---

## Open

- **Tamagui and gluestack-ui have now produced nothing twice.** The charts
  review read Tamagui's token docs (five categories, no chart or series-colour
  category anywhere) and gluestack-ui's full component inventory (no chart
  component exists). Recommend **dropping both from the list** rather than
  budgeting a third pass; if RN theming is still wanted, ask that question of
  the compiler, not of them.
- **Dribbble has now been blocked three times** — a bot challenge that serves no
  static HTML to a non-browser client. Recommend dropping it unless a
  JS-capable browser tool is available; the charts pass substituted IBM Carbon,
  Fluent 2, Atlassian and NN/g and got more out of them than a mood board would
  have given.
- **IBM Carbon should join the standing list.** It was the highest-yield source
  of the charts review and it is the only one of the eight with real
  data-visualisation guidance that a fetcher can actually read.
- **HIG control sizing did not land.** No V4 exposes an `sm`/`md`/`lg` control
  scale.
- **49 vertical modules, ~640 components, still untouched by V4.** `layout`,
  `dashboard` and `charts` are done — the three the checklist names as the ones
  every vertical composes — so the remaining surface is the verticals
  themselves.
- Two deliberate behaviour changes worth a second opinion: `SignupFormV4`
  defaults `requireTerms` to `true` where its base defaults `false`, and
  `XenitionNativeThemeProviderV4` defaults `gateFirstPaint` to `true`, costing
  one blank frame on mount to avoid animating before the OS answers.
- `PriceTagV4` is re-exported from the native primitives barrel but not the web
  one.
