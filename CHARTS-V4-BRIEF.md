# Charts — the V4 brief

**20 components, one module, two twins.** `charts` (web, 16 today) and
`native/charts` (20 today), at prop parity when this pass is done. Every build
agent works against this file.

Written 2026-08-30 from: the six external systems re-reviewed for this pass, the
house specs (`ONBOARDING-DESIGN-SPEC.md` §10 + Addendum,
`LAYOUT-DASHBOARD-V4-BRIEF.md`, `DESIGN-SYSTEM-REVIEW.md`), the `dataviz`
method and its runnable palette validator, and a read of all 36 current source
files.

The product's own visual direction outranks every external source. Where HIG,
M3, shadcn or Carbon disagree with §3, §3 wins.

**The palette is already built and already validated. Do not re-derive it, do
not add a colour, do not pick a hex.** `src/primitives/internal/v4-chart.ts`
and the two adapters (`src/charts/internal-v4.tsx`,
`src/native/charts/internal-v4.ts`) landed before this brief was written and
are the foundation every one of the 20 builds on.

---

## 1. Rules that do not bend

1. **No literal colours, spacings, radii or font sizes.** Everything traces to
   `useXenitionTheme()` / the `--xen-*` custom properties. The only bare
   numbers are geometric — flex factors, aspect ratios, viewBox coordinates,
   `1` for a hairline — plus the named constants in `CHART_MARK`, which are
   imported, never retyped.

   Every one of these, present in the current sources, is a violation to
   remove: `strokeWidth={1.5}` · `strokeWidth={10}` · `r={2}` · `r={3}` ·
   `r={4}` · `gap: 2` · `gap-1.5` · `h-2.5 w-2.5` · `width: 10, height: 10` ·
   `width: 12, height: 12` · `fillOpacity={0.15}` · `opacity: 0.08 + intensity
   * 0.92` · `text-xs` / `text-muted` as a text colour · `stroke="var(--xen-muted)"`
   as an axis · `stroke="var(--xen-border)"` as a grid.

2. **Colour comes from the palette module and nowhere else.** `chartVar(i)` on
   web, `palette.series[i]` on native, `chartSeqVar` / `palette.sequential`
   for magnitude, `chartDivVar` / `palette.diverging` for polarity. The base's
   `SERIES` cycle, `colorVar()`, `seriesColor()` and every `ChartColor` prop
   default that reaches for `'primary' | 'accent' | 'success' | 'warn' |
   'danger'` as an *identity* are what this pass exists to retire.

3. **Status colour is reserved.** `success` / `warn` / `danger` are for a
   series that genuinely *means* good or bad — an error rate, a pass/fail
   split, budget overspend — and it ships with a label, never colour alone. A
   series that is merely fourth wears slot 4. One or the other in a chart,
   never both: a chart where slot 4 is red and "failures" is also red cannot
   say which red it means.

4. **The palette is never cycled.** Five slots, fixed order, assigned in
   sequence. `chartVar(5)` **throws**, on purpose. A sixth series is a
   composition decision for the caller — fold it into "Other", facet, or drop
   it — and a component's job is to say so, not to wrap around.

5. **Secondary encoding is mandatory, not a nicety.** The palette's worst
   adjacent CVD ΔE is 6.5, which is inside the 6–8 floor band, and that band is
   legal **only** with secondary encoding. So every chart in this line ships at
   least one of: a legend (always, for two or more series), direct labels (at
   four or fewer series), a `CHART_MARK.gap` of surface between adjacent fills,
   or a `CHART_MARK.ring` of surface around an overlapping mark. A chart that
   asks colour to carry identity alone is a defect in this module, not a style
   choice.

6. **Every chart states its value in words.** An `aria-label` on web /
   `accessibilityLabel` on native that carries the headline — series count,
   range, the takeaway — and is derived by default, overridable by prop. HIG is
   explicit that a rendered chart plus a visible title is *not* accessible; the
   textual representation is the accessibility story.

7. **Web and native twins keep prop parity.** Same props, same names, same
   defaults. Four components exist only on native today (`ComparisonBars`,
   `MiniBar`, `ProgressBars`, `RangeBar`) — see §6. That gap closes in this
   pass; it does not deepen.

8. **Additive only.** A V4 is a **new `*V4.tsx` file** beside its base with a
   `*V4.spec.tsx` / `*V4.native.spec.tsx`; the base file is not edited. Every
   new prop is optional with a default that preserves today's rendering where
   today's rendering was acceptable. A V4 composite composes V4 children —
   `TrendCardV4` renders `SparklineV4`, never `Sparkline`.

9. **State, motion and depth come from the internals, never from a new
   number.** `v4-state.ts`, `v4-motion.ts`, `v4-depth.ts`, and for this module
   `v4-chart.ts`. `V4_DISABLED_CLASS` replaces every `opacity-50`.

10. **44 is the tap-target floor.** Anything a finger or pointer can hit — a
    legend row that toggles a series, a bar with a tooltip, a scatter point —
    gets 44 of hit area even when the painted mark is 8. `hitSlop` on native, a
    padded transparent hit rect on web. HIG's absolute floor of 28 applies only
    where density genuinely forbids 44 (a heatmap cell, a histogram bin), and
    that exception is stated per component in §5 or it does not apply.

Scale values, for reference only — do not retype them into a component:
`spacing` xs 4 · sm 8 · md 16 · lg 24 · xl 32 · 2xl 48.
`radius` (rounded seed) sm 4 · md 8 · lg 16 · full 9999. Compiles to 0 on `sharp`.
`type` xs 12 · sm 14 · base 16 · lg 18 · xl 20 · 2xl 24 · 3xl 30.
`CHART_MARK` stroke 2 · endRadius 4 · dotSize 8 · gap 2 · ring 2.

---

## 2. Per-source findings

Re-reviewed 2026-08-30. Recorded here because
`DESIGN-SYSTEM-REVIEW.md` exists to stop a commit message claiming a source was
applied when it left no trace.

### Apple HIG — **useful, and the most quotable**

`developer.apple.com/tutorials/data/design/human-interface-guidelines/charting-data.json`
(also `color.json`, `accessibility.json`) return real content to a fetcher; the
HTML pages do not.

- **A descriptive headline carries the takeaway**, not the axis names. "Chance
  of light rain in the next hour", not "Precipitation vs time". → §4.2's
  `title` / `summary` slots.
- **A text headline is not sufficient for accessibility.** Charts also need
  labels describing values and components. → rule 6.
- **Match chart size to functionality.** Small glanceable variants are
  legitimate, but must stay large enough for their detail and interactivity. →
  the `Sparkline` / `MiniBar` / `TrendCard` family is a deliberate size class,
  not a shrunken `LineChart`.
- **Keep a chart simple; let people choose more detail.** → progressive
  disclosure: the tooltip carries the precise number, the plot carries the
  shape.
- **Prefer consistency across multiple charts** — one type, one colour set, one
  annotation style for one dataset. → the fixed slot order, rule 4.
- **Never rely on colour alone**; provide the same information another way. →
  rule 5.
- **Custom colours need light, dark AND increased-contrast variants.** The kit
  ships two; increased contrast is §7's open question 3.
- Tap targets: iOS default **44×44 pt**, absolute minimum **28×28**; ~12 pt of
  padding around bezelled controls, ~24 pt around bezel-less ones, to stop
  mis-taps between neighbours. → rule 10.
- Reduce Motion: replace positional transitions with fades, never animate
  z-depth. → §4.7.

### Material Design 3 — **token files only, as before**

`m3.material.io` remains a JS-rendered SPA that returns a bare `<title>`;
`/styles/color/roles` and the data-visualisation-accessibility post both came
back empty. The raw token files at
`raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/`
are plain text and readable.

- Shape scale: none 0 · xs 4 · sm 8 · **medium 12** · **large 16** · xl 28 ·
  full 9999. The kit's `radius.lg` (16) is M3 large and is the chart card's
  radius.
- Typescale: body-medium 14/20, label-small 11/16, label-medium 12/16. Axis
  labels are label-small territory — the kit's `type.xs` (12) is the closest
  step and is what they take.
- State layers, motion and elevation were adopted wholesale in the earlier
  pass. **Nothing new.** M3's own chart-colour guidance is not retrievable
  through this pipeline; that is a source limitation, recorded rather than
  papered over.

### shadcn/ui — **the closest prior art, and it stops short**

`ui.shadcn.com/docs/components/chart`, `/charts`.

- The palette is exactly **five CSS variables**, `--chart-1..5`, declared on
  `:root` and again on `.dark` — and dark is **retuned, not dimmed**: hue and
  chroma both change between the two blocks. → `CHART_LIGHTNESS` /
  `CHART_CHROMA` per scheme, and the web adapter's two-hex-and-a-selector
  trick.
- `ChartConfig` separates *what a series is called and coloured* from *the
  data*: `{ [key]: { label, icon?, color, theme?: { light, dark } } }`. → §4.3.
- `ChartContainer` **refuses to auto-size** — every embed declares its own
  footprint. → the height props stay required-with-a-default, and the empty
  state keeps the footprint (§4.5).
- Tooltip anatomy: `indicator: 'dot' | 'line' | 'dashed'`, `hideLabel`,
  `hideIndicator`, `nameKey` / `labelKey`. → §4.6's tooltip props.
- "**We do not wrap Recharts.**" The kit does not wrap anything either — inline
  SVG on web, `react-native-svg` or flex `View`s on native — so the composition
  ideas transfer and the runtime does not.
- **The gap worth naming**: shadcn documents no cycling rule for a sixth
  series. This module closes that gap explicitly (rule 4) rather than
  inheriting the silence.

### IBM Carbon — **substituted for Dribbble, and the best data-viz source of the six**

`carbondesignsystem.com/data-visualization/color-palettes/` and the v10 docs.
(The current `chart-anatomy` page truncated on every attempt; the v10 mirror
served.)

- A **14-colour categorical palette applied in sequence strictly as
  described** — the sequence itself is engineered for adjacency contrast, so
  consumer code must not re-sort it. → rule 4, and the fixed
  `CHART_HUE_OFFSETS` order.
- **Sequential**: monochromatic, 10 discrete steps, and the meaning **inverts
  per theme** — light theme darkest = largest, dark theme lightest = largest. →
  `chartSequential`'s scheme flip, and the 9-bucket quantisation.
- **Diverging**: two hues, 16 steps, symmetric about a neutral middle. →
  `chartDiverging`.
- Alert palette is four fixed colours with reserved meaning, separate from the
  categorical set. → rule 3.
- Carbon has shipped real colourblind-distinguishability bugs in its own
  palette (`carbon-design-system/carbon-charts#1244`). A palette is verified,
  not adopted on faith. → the validator run behind `v4-chart.ts`.

### Fluent 2, Atlassian, NN/g — **three usable figures**

- Fluent: 10 base + 30 extension categorical colours, cycled past 10; axis
  labels in light grey, subordinate to data ink. → `CHART_GRID_MIX` /
  `CHART_AXIS_MIX`; the cycling is what rule 4 rejects.
- Atlassian: **5–6 distinct colours is the practical ceiling** for one
  categorical chart; beyond it, group or facet. Single-series charts default to
  one brand colour against neutrals. → five slots, and slot 1 = the brand hue.
- NN/g: length and 2-D position are pre-attentive, which is why bar/line/scatter
  beat area/treemap for comparison; the F-pattern puts the most important number
  top-left; progressive disclosure cuts perceived load substantially. → §4.2's
  header order, and §3's "one loud thing".

### Tamagui — **nothing. Again.**

`tamagui.dev/docs/core/tokens`. Five token categories (`size`, `space`,
`radius`, `zIndex`, `color`). **No chart, series-colour or data-visualisation
category anywhere.** Its theme-as-swappable-variable-set idea is architecturally
adjacent to the web adapter's approach, but the docs never apply it to charts,
so it is a coincidence rather than a source. **0 files.** Second review in a
row with the same answer; stop budgeting time for it.

### gluestack-ui — **nothing. Again.**

Full component inventory read: Typography, Layout, Feedback, Data Display
(Badge, Card, Table, Tabs), Forms, Overlay, Disclosure, Media, Others. **No
chart component exists.** **0 files.**

### Dribbble — **blocked. Third time.**

`dribbble.com/search/dashboard-chart` and `/shots/popular/web-design` both
returned empty content to the fetcher — a bot challenge that serves no static
HTML to a non-browser client. Two attempts, then substituted (Carbon, Fluent,
Atlassian, NN/g, Okabe-Ito, Tableau 10, Observable Plot). **Do not budget
another pass on Dribbble without a JS-capable browser.** Recorded here so the
next review does not rediscover it a fourth time.

### Colour-blind-safe reference palettes — **the sanity check, not the source**

Okabe-Ito (8 hues), Tableau 10, Vega-Lite's `tableau10` default, Observable 10.
All are **fixed hex sets**, which is exactly what this kit cannot ship: the
palette must follow a seed. They were used as a sanity check on the derived
palette's structure — hue rotation with alternating lightness, status held
separate — and not copied.

---

## 3. What this product's charts actually look like

The current module is a set of *plots*. What the product needs is *figures*: a
plot is the ink, a figure is the ink plus the sentence that says what it means.
Every reviewed source lands on the same shape, and the reference dashboards do
too.

```
┌─────────────────────────────────────────────┐
│  Revenue                          ⌄ 30 days │   title · optional control
│  £48,210        ▲ 12.4% vs last month       │   the one loud thing
│                                             │
│    ╭───────────────────────────────────╮    │
│    │              plot                 │    │   recessive grid, thin marks
│    ╰───────────────────────────────────╯    │
│    Jan   Feb   Mar   Apr   May   Jun        │   xs labels, subordinate ink
│                                             │
│  ● Direct   ● Referral   ● Organic          │   legend, always for >= 2
└─────────────────────────────────────────────┘
```

Five decisions this makes, in the order they matter:

1. **The number is bigger than the chart is loud.** A dashboard is read
   headline-first; the plot is the evidence, not the claim.
2. **The card ground is `colors.card`, not `colors.surface`** — the same fix
   the dashboard pass made, for the same reason. A chart card that is the same
   colour as the page is a spreadsheet cell.
3. **Chrome is recessive.** Grid at `CHART_GRID_MIX`, axis at
   `CHART_AXIS_MIX`, labels at `type.xs` in `mutedText`. The current sources
   paint axes with `--xen-muted` and `--xen-border` — a *text* colour and a
   *hairline* colour doing an axis's job.
4. **A chart is interactive by default on web.** An SVG chart that cannot be
   hovered is a picture of a chart.
5. **Nothing bounces.** Entrance is a reveal, once, and reduced motion turns it
   into a fade.

---

## 4. Shared decisions all 20 must follow

### 4.1 The palette — already built, just use it

```tsx
// web
const chart = useChartV4(/* animate */ true);
<svg {...chart.rootProps}>
  <polyline stroke={chartVar(0)} strokeWidth={CHART_MARK.stroke} />
  <rect fill={chartSeqVar(0.7)} />        // magnitude
  <line stroke={CHART_GRID_VAR} />        // chrome
</svg>
```

```tsx
// native
const palette = useChartPaletteV4();
<Rect fill={palette.series[0]} />
<Rect fill={palette.sequential(0.7)} />
<Line stroke={palette.grid} />
```

- **Categorical** = identity (which series). Five slots, fixed order.
- **Sequential** = magnitude (how much). One hue, nine buckets, direction flips
  with the scheme. `Heatmap` and any intensity grid.
- **Diverging** = polarity (which side of a baseline). Two arms, neutral
  middle. Over/under budget, gain/loss.
- **Status** = state. The theme's `success` / `warn` / `danger`, with a label.

Never colour nominal bars by their own value — bar length already shows
magnitude, and spending the identity channel on it says nothing new. A
single-series bar chart is **one colour** (slot 1) for every bar.

### 4.2 The figure frame

Every chart that is a figure rather than a mark accepts, all optional:

| prop | what it is |
|---|---|
| `title` | the descriptive headline. HIG's rule: say the takeaway. `TextV4 size="base" weight="semibold"` |
| `summary` | the one loud number, when the form has one. `size="2xl" weight="bold"` |
| `caption` | the quiet line — "vs last month", "last 30 days". `size="sm" tone="mutedText"` |
| `legend` | `boolean \| LegendItem[]`. Defaults to `true` at two or more series |
| `height` | the plot's own height. Never auto — shadcn's rule, and it stops layout shift |

Order is always title → summary → plot → axis labels → legend. Marks-only
components (`Sparkline`, `MiniBar`, `ProgressRing` at small sizes) take none of
this: they are a mark inside someone else's figure.

### 4.3 Series configuration

Follow shadcn's config/data split. One optional `series?: ChartSeriesV4[]`
where `ChartSeriesV4 = { key, label, tone?: 'success' | 'warn' | 'danger' }`,
and the slot index comes from array position. `tone` is the opt-in to status
colour (rule 3) and is the *only* way a component paints a status hue.

Do not add a `color` prop that takes an arbitrary token. The base's
`color?: ChartColor` stays on the base for compatibility; on a V4 it is
`tone` or it is the slot.

### 4.4 Marks

From `CHART_MARK`, never retyped:

- Lines and axes: `stroke` (2). Grid: 1 (a hairline is the one bare number
  allowed).
- Bars: `endRadius` (4) at the **data end only** — a bar rounded at the
  baseline floats off its axis. `gap` (2) of surface between adjacent bars and
  between stack segments.
- Points: `dotSize` (8) painted minimum; `ring` (2) of surface where marks can
  overlap (`data-xen-v4-mark-ring` on web, `palette.ring` on native).
- Area fills sit under their line at reduced alpha; the line keeps full
  strength. The fill is context, the line is the data.
- Direct labels at **four or fewer** series (`CHART_DIRECT_LABEL_MAX`); above
  that the legend carries identity alone and the labels would collide.

### 4.5 Empty, single-datum, loading

All three are required on all 20, and all three keep the footprint — a chart
that collapses to zero height when the data is late is the single most common
dashboard jank and is free to avoid.

- **Empty**: `ChartEmptyV4` on web, the native equivalent. Never a bare string,
  never `null`.
- **One datum**: renders. A line of one point is a dot at the centre; a bar
  chart of one bar is one bar. No divide-by-zero, no `Infinity` in a `d`
  attribute — the current sources guard this unevenly and the spec asserts it.
- **Loading**: `SkeletonV4` at the plot's footprint when `loading` is passed.

### 4.6 Interaction

**Web ships hover by default.** A crosshair plus tooltip on line and area; a
per-mark tooltip on bar, column, dot and cell. Props follow shadcn:
`tooltip?: boolean` (default `true` for figure-shaped charts, `false` for
marks), `indicator?: 'dot' | 'line' | 'dashed'`.

**Native ships press.** Same information, `onPress` per mark, with `hitSlop` to
44 where the painted mark is smaller. A tooltip on native is `TooltipV4`.

Both: the tooltip carries the precise value, so the plot does not have to. This
is HIG's progressive disclosure and it is also what lets the grid stay
recessive.

### 4.7 Motion

- Entrance is a **reveal**, once: the marks are already in position and the
  plot is wiped in over `V4_MOTION.enter` (400ms) with `EASE_ENTER`. Not a
  per-bar stagger, not a line that draws itself — a chart that animates every
  update is a chart nobody can read while it moves.
- Data *updates* do not animate at all in this pass. §7 open question 5.
- `prefers-reduced-motion` / `AccessibilityInfo` turns the reveal into a fade
  (`V4_MOTION.standard`). Never removed entirely — an element that appears with
  no transition reads as a glitch (`design.md` §36.10).
- Native uses the `XenitionNativeThemeProviderV4` reduced-motion answer, which
  is already gated on first paint.

### 4.8 Accessibility

- `role="img"` + a derived `aria-label` / `accessibilityLabel` (rule 6). The
  default sentence names the form, the series count and the range: *"Line
  chart, Revenue, 12 points, £31,400 to £48,210."*
- A legend is not decoration — it is the identity channel's redundancy. Present
  whenever there are two or more series, and its swatch is `dotSize`, not a
  10×10 literal.
- Where a fill lands below 3:1 on the surface, the visible label or the legend
  is the relief the validator obliges. Never ship a sub-3:1 fill with neither.
- The `hitSlop` / padded-hit rule (rule 10) is an accessibility requirement,
  not a nicety.

---

## 5. Per-component notes

Grouped as the work is split. **Every component gets a `*V4` on both twins
plus a spec on both twins**, and the four native-only ones get a web twin built
from scratch (§6).

### Group A — the line family (5)

`LineChart` · `AreaChart` · `Sparkline` · `TrendCard` · `MiniBar`

- `LineChartV4`: multi-series (the base takes `data: number[]` — one series
  only, which is why every dashboard reaches past it). Slot per series, crosshair
  tooltip, `showDots` becomes automatic below ~20 points and off above. Retire
  `r={3}`.
- `AreaChartV4`: fill under the line at reduced alpha, line at full strength.
  Stacked areas get `CHART_MARK.gap` between bands. Retire `fillOpacity` guesses.
- `SparklineV4`: a **mark**, not a figure — no title, no legend, no axis. Web is
  a polyline; native's base fakes it with `View` bars, which is why a native
  sparkline and a web one do not look like the same component. Native V4 uses
  `react-native-svg` like its siblings and keeps the `View` path only as the
  documented fallback when the peer dep is absent.
- `TrendCardV4`: the figure that `StatCardV4` already got right — `colors.card`
  ground, label → value → delta → caption → sparkline, delta ink from the
  `*Text` slots (`successText` / `dangerText` / `mutedText`), never the fills.
  Compose `SparklineV4`.
- `MiniBarV4` (native today, web new): a mark. One slot, no chrome.

### Group B — the bar family (5)

`BarChart` · `ColumnChart` · `Histogram` · `StackedBar` · `RangeBar`

- `BarChartV4` / `ColumnChartV4`: one colour for a single series (§4.1). The
  axis line becomes `CHART_AXIS_VAR`, not `var(--xen-muted)`. Value labels are
  the direct-label channel; `showValues` defaults on at four or fewer bars.
- `HistogramV4`: bins are one series by definition — one colour, always. Bin
  labels thin out rather than rotate; HIG's density rule.
- `StackedBarV4`: `CHART_MARK.gap` of surface between segments — this is the
  secondary encoding that makes a stack readable to a dichromat. Segments take
  slots in order; the base's `opacity` steps are retired (they made the fourth
  segment look disabled).
- `RangeBarV4` (native today, web new): a floating bar, min→max. The one form
  where the rounded end applies at **both** ends, because neither is a baseline.

### Group C — the radial family (5)

`PieChart` · `DonutChart` · `GaugeChart` · `ProgressRing` · `RadarChart`

- `PieChartV4` / `DonutChartV4`: slots in order, `CHART_MARK.gap` of surface
  between segments (currently `strokeWidth={1}` against `--xen-surface`, which
  is the right idea at the wrong number). Six or more segments is where "Other"
  earns itself — the component sorts descending, keeps five, folds the tail, and
  says so in the legend. Donut's centre is a slot for `summary`.
- `GaugeChartV4`: track from `CHART_GRID_VAR`, fill from slot 1 or `tone`. The
  `strokeWidth={10}` becomes a derived thickness. A gauge is a single value, so
  it is a figure with a `summary` and no legend.
- `ProgressRingV4`: same family, no needle. Marks-only at small sizes.
- `RadarChartV4`: rings at `CHART_GRID_VAR`, axes at `CHART_AXIS_VAR`, series
  fill at reduced alpha over a full-strength stroke. Cap at four series and say
  so — a radar with five overlapping polygons is unreadable regardless of
  palette.

### Group D — the grid, the comparison and the key (5)

`Heatmap` · `ScatterChart` · `ComparisonBars` · `ProgressBars` · `Legend`

- `HeatmapV4`: **the sequential ramp's home.** Retire
  `opacity: 0.08 + intensity * 0.92` — an opacity ramp over a single hue is a
  sequential scale built by hand, and it fails the light end (a 0.08 cell is
  invisible). Nine buckets, `chartSeqVar` / `palette.sequential`. Cells are the
  documented 28-floor exception to rule 10.
- `ScatterChartV4`: **capped at `CHART_SCATTER_SERIES_CAP` (3) series** — any
  two marks can sit side by side, which is the all-pairs test, and the palette
  clears it on three slots and not on five. Over the cap, throw the same way
  `chartVar` does. `ring` of surface on every point.
- `ComparisonBarsV4` (native today, web new): grouped bars, slot per series
  within a group, `gap` between bars in a group and a wider gap between groups.
  Retire the descending-opacity trick.
- `ProgressBarsV4` (native today, web new): a labelled row list with a bar per
  row. This is the one chart-shaped thing that is really a *list*, so it takes
  the row metric from `LAYOUT-DASHBOARD-V4-BRIEF.md` §4.3, not a chart metric.
- `LegendV4`: the identity channel's redundancy, so it is the most important
  component in the module and currently the thinnest. Swatch at `dotSize`,
  `interactive?: boolean` to toggle a series (with the 44 hit area), `vertical`
  kept, `truncate` never — a clipped legend label is an unreadable identity.
  Retire `h-2.5 w-2.5` / `width: 10`.

---

## 6. The parity gap — four components web does not have

`ComparisonBars`, `MiniBar`, `ProgressBars` and `RangeBar` exist only under
`src/native/charts/`. `COMPONENTS.md` counts 20 because it is generated from the
native index; the web module has 16.

Build the four web twins **as V4 only** — there is no base to mirror, so there
is no base to write. Their props are the native ones verbatim, minus
`style`/plus `className`, and their specs assert the same behaviour. Export them
from `src/charts/index.ts` and note in `COMPONENTS.md` that the module is 20 on
both twins from this pass forward.

---

## 7. Open questions — **all answered, 2026-08-30**

Kept with their answers rather than deleted, because the reasoning is the
record.

1. **Does `Legend` gain series toggling?** **Yes, behind `interactive`,
   defaulting to `false`** — nothing existing moves. A hidden series drains to
   the grid colour, never to an alpha: `0.38` is the kit's disabled-content
   channel and "toggled off" is not "disabled". State is announced through
   `aria-pressed` / `accessibilityState.selected`, so it is not colour-only.
2. **`PieChart`'s "Other" fold — component or caller?** **The component.** Sort
   descending, keep four named, tail into slot 5. The literal reading of "keep
   five, fold the tail" wanted six marks out of a five-slot palette. The sort
   is *conditional on actually folding*: below the threshold the caller's order
   stands, because re-ordering the data moves a series between slots exactly as
   re-ordering the palette would.
3. **HIG's increased-contrast variant.** Out of scope — the compiler emits two
   schemes, not three. Raised against the theme compiler, not here.
4. **A table view as the contrast relief.** Out of scope for the 20. The
   visible-label channel discharges the obligation.
5. **Animated data updates.** Out of scope. Entrance only.
6. **`react-native-svg` as an optional peer dep.** `SparklineV4` and
   `MiniBarV4` keep a `View` fallback; everything else states the requirement
   in its doc comment. **And a trap found while building it:** the native
   `SparklineV4` first imported its shared helpers from `LineChartV4`, which
   hard-imports `react-native-svg` — so the fallback threw on `require` in
   exactly the app it exists for. **A component with a fallback must own its
   helpers, and the SVG component imports from it, never the other way round.**

### Three more, settled after the build

7. **Does `chartVar`'s throw belong in a component?** **No.** The primitive
   throws — asking the palette for slot 6 is a mistake in the caller's code and
   should be loud. A component whose series count arrives with the *data* folds
   instead, via `foldChartSeries()`, because a `StackedBar` handed six segments
   from a live API would otherwise take the page down. A `RangeError` in
   production is not a design decision.
8. **Do histogram bins take §4.4's gap?** **No — bins sit flush.** The gap says
   "these are separate things", which is true of categorical bars and false of a
   distribution: a histogram's bins are one continuous axis and a gap there lies
   about the data.
9. **Is §4.6's "a tooltip on native is `TooltipV4`" buildable?** **No, and it is
   struck.** The native `TooltipV4` is a centred `Modal` on long-press; it can
   neither anchor per mark nor be driven by a scrub. The line family ships an
   in-plot readout instead, pinned rather than anchored, because RN cannot
   translate by a percentage of an unmeasured width and measuring costs a
   layout pass per scrub frame.

---

## 8. Done means

- `npx tsc --noEmit` clean; `npx jest` green.
- Every V4 has a spec covering: the new props, the empty state, the
  single-datum state, and the accessible label.
- Native and web twins at prop parity, including the four new web components.
- No component in the module reaches for `SERIES`, `seriesColor`, `colorVar`,
  a status token as an identity, or a literal stroke width / swatch size.
- `COMPONENTS.md`'s `charts` section ticked to ✅ and its header moved to
  0.9.0, with the module count corrected to 20 on both twins.
- `DESIGN-SYSTEM-REVIEW.md` updated with §2's findings — including the two
  systems that again contributed nothing and the one that is again unreachable.
