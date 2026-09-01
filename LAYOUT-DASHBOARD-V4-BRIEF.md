# Layout + Dashboard — the V4 brief

**32 components, 2 modules, one design line.** `layout` (16) and `dashboard` (16), web and native
twins each. Every build agent works against this file.

Written 2026-08-29 from: the six external systems re-reviewed for this pass, the house specs
(`ONBOARDING-DESIGN-SPEC.md` §10 + Addendum, `DESIGN-SYSTEM-REVIEW.md`), the V4 internals
(`v4-state.ts`, `v4-motion.ts`, `v4-depth.ts`, `field-v4.ts`), and a read of all 64 current source
files.

The product's own visual direction outranks every external source in this document. Where HIG, M3
or shadcn disagree with §3 below, §3 wins.

---

## 1. Rules that do not bend

1. **No literal colours, spacings, radii or font sizes.** Everything traces to
   `useXenitionTheme()` / the `--xen-*` custom properties. The only bare numbers allowed are
   geometric — flex factors, aspect ratios, column counts, `1` for a hairline — plus the named
   control constants below, declared as local constants with a comment.

   Every one of these, present in the current sources, is a violation to remove:
   `gap-0.5` · `gap: 2` · `mt-1.5` · `h-2 w-2` · `w-[22px] h-[22px]` · `max-w-[340px]` ·
   `min-h-[56px]` · `min-h-[48px]` · `minHeight: 56` · `minHeight: 48` · `marginTop: 6` ·
   `width: 8, height: 8` · `bg-neutral-100` · `hover:opacity-80` · `disabled:opacity-50` ·
   `opacity: pressed ? 0.7 : 1` · `h-1.5` · `flexBasis: '44%'` / `basis-[44%]`.

2. **Use the kit's own V4 primitives.** `TextV4`, `IconV4`, `ButtonV4`, `CardV4`, `EmptyStateV4`,
   `AvatarV4`, `BadgeV4`. No raw `<Text style={{ fontSize }}>`, no `<h1 className="text-2xl">`.
   No text glyphs standing in for icons — the current sources ship `›`, `✓`, `✕`, `⌕`, `▲`, `▼`
   as literal characters. All become `IconV4`.

3. **Web and native twins keep prop parity.** Same props, same names, same defaults. The
   divergences this pass found (listed per component in §5) must be **closed here**, not deepened.

4. **Additive only.** Every new prop is optional with a default that preserves today's rendering
   where today's rendering was acceptable. A V4 is a **new `*V4.tsx` file** beside its base with a
   `*V4.spec.tsx` / `*V4.native.spec.tsx`; the base file is not edited. A V4 composite composes V4
   children.

5. **The V4 control metric is `spacing['2xl']` (48) with `radius.md`.** Not 56, not `radius.lg`.
   Held by `internal/field-v4.ts` on both twins. Applies to anything control-shaped: a field, a
   chip, a tappable trailing control. Known exceptions carried forward: `Switch` derives its track
   radius from its own height, and `SearchInput` / `SearchHeader` may stay a pill.
   **Rows are not controls** — they take the row metric in §4.3.

6. **44 is the tap-target floor** (HIG, already `MIN_TAP = 44` elsewhere in the kit). Anything whose
   painted size is smaller gets `hitSlop` on native and a padded hit area on web.

7. **State, motion and depth come from the internals, never from a new number.**
   `v4-state.ts` (hover `0.08`, focus `0.12`, pressed `0.12`, disabled content `0.38`),
   `v4-motion.ts` (`quick` 100 / `standard` 200 / `enter` 400, easing by direction of travel),
   `v4-depth.ts` (`shadowCss`, `mixToken`, `elevation.card|sheet|action`).
   `V4_DISABLED_CLASS` replaces every `opacity-50`.

8. **`error?: string` is the one sanctioned parity break**, on field-shaped components only, and it
   must render a message rather than tint a border. Nothing in these 32 needs it. Do not add it.

Scale values, for reference only — do not retype them into a component:
`spacing` xs 4 · sm 8 · md 16 · lg 24 · xl 32 · 2xl 48.
`radius` (rounded seed) sm 4 · md 8 · lg 16 · full 9999. Compiles to 0 on a `sharp` seed.
`type` xs 12 · sm 14 · base 16 · lg 18 · xl 20 · 2xl 24 · 3xl 30.

---

## 2. Per-source findings

### Apple HIG — **useful, with effort**

The HTML pages are a JS-rendered SPA and return only a `<title>` to a fetcher. The underlying
documentation JSON is readable and is what I used.

- `https://developer.apple.com/tutorials/data/design/human-interface-guidelines/layout.json`
- `https://developer.apple.com/tutorials/data/design/human-interface-guidelines/lists-and-tables.json`
- `https://developer.apple.com/tutorials/data/design/human-interface-guidelines/charting-data.json`

Actionable for these 32:

- **Group related items** with negative space, background shapes, or separator lines — and keep
  content and controls clearly distinct. This is the argument for §4.2's card treatment and for
  `SettingsSection` being a real inset-grouped container rather than rows with rules between them.
- **Respect system-defined safe areas and margins.** Directly actionable: `Container`,
  `PageContainer` and `ScrollArea` on native.
- **Full-width buttons must be inset from the screen edge**, aligned with adjacent safe areas —
  matches the house sticky-CTA rule and applies to `EmptyDashboard`'s CTA.
- **Lists**: small images sit at the **leading end of a row**, followed by a brief label. Grouped
  style uses headers, footers and extra space to separate groups. A **disclosure chevron** means
  navigation; an info button means "more about this row" and does *not* navigate. Do not put a
  trailing index next to trailing chevrons.
- **Selection**: a navigation list keeps the selected row persistently highlighted; an option list
  highlights briefly then shows a checkmark. Relevant to `FilterChips` and `SettingsRow`.
- **Charting/metrics**: use a short descriptive headline so a value is graspable at a glance; keep
  glanceable summaries simple; keep colour and layout consistent across charts of the same purpose.
  This is the argument for `StatCard`'s label-above-value order and for `KpiRow` capping at 2–3.
- HIG gives **no** row-height, separator or spacing numbers. It says so explicitly. Row metrics come
  from M3 below.

**Verdict: kept.** Contributes safe areas, the 44 floor (already in the kit), the grouped-list
model, the leading-image rule and the chevron/info distinction. No numbers beyond 44.

### Material Design 3 — **useful, but only via the token source**

`m3.material.io` is also a JS-rendered SPA; `/foundations/layout/understanding-layout/spacing` and
`/styles/spacing/overview` both returned a bare title, and two `applying-layout/*` URLs 404'd. Search
surfaced one figure directly (**medium layouts: 24dp margins, 24dp pane spacer**). The rest came from
the same place the kit's existing M3 work came from — the compiled token files, which are plain text:

- `https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-shape.scss`
- `https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-comp-list.scss`
- `https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes`

Actionable:

- **List-item container heights: one-line 56, two-line 72, three-line 88.** Leading space 16,
  trailing space 16. Leading icon 24, **leading avatar 40**. Headline is body-large, supporting text
  body-medium, trailing supporting text label-small.
  This is the single most valuable number set in the whole review — it settles the row family (§4.3),
  and 56 / 72 / 16 land exactly on the kit's own scale.
- **Shape scale**: none 0 · extra-small 4 · small 8 · **medium 12** · **large 16** · extra-large 28 ·
  full 9999. The kit's `rounded` seed already reads `md` 8 / `lg` 16; `lg` = M3 large is the card
  radius, which is what §4.2 uses.
- **Window size classes**: compact < 600dp, medium 600–839, expanded 840–1199, large 1200–1599,
  extra-large ≥ 1600. Android's docs state plainly that **no margin values are prescribed per size
  class** — so the only margin figure M3 gives is the 24dp medium margin from the search result. The
  kit's `Container padding="lg"` (24) is already on it.
- State, motion and elevation were already adopted wholesale in the earlier pass; nothing new.

**Verdict: kept, and it is the source of the row metric.** Note for the record that M3 says leading
avatar 40; the house spec (§8) says a 44 circular badge, and the house wins — 44 also clears the HIG
tap floor, which 40 does not.

### shadcn/ui — **useful, small**

- `https://ui.shadcn.com/docs/components/card`
- `https://ui.shadcn.com/docs/components/separator`
- `https://ui.shadcn.com/blocks/dashboard`

Actionable:

- **Card spacing is a single variable, not a set of paddings.** `--card-spacing` is declared once on
  the card and every slot reads it (`gap-(--card-spacing)`, `py-(--card-spacing)`,
  `px-(--card-spacing)`), with a `sm` size that just re-declares the variable. That is the structural
  idea worth stealing for `SectionCard` / `SettingsSection` / `StatCard` — one padding decision, one
  place, so a `padding="none"` row list and a padded body cannot drift.
- **Card anatomy is named slots**: `Card > CardHeader > {CardTitle, CardDescription, CardAction}`,
  then `CardContent`, `CardFooter`. `CardAction` is the trailing header slot — the kit's `SectionCard
  action` prop is the same idea and should be named consistently with `Section` (see §5).
- Card ground is a token of its own (`bg-card`) with a **ring, not a border**
  (`ring-1 ring-foreground/10`) — the kit already split `card`/`onCard` in the shadcn pass but the
  dashboard module never adopted it. That is fixed in §4.2.
- **Dashboard blocks**: the composition order is navigation → summary metric cards → chart → data
  table, i.e. summary-first. Confirms `KpiRow` sits above `SectionCard` content. Nothing about visual
  styling worth importing — the blocks are dense admin surfaces, which is what this product is not.
- Separator docs are now a thin wrapper over Base UI and expose no class strings. Nothing to take.

**Verdict: kept, structural only.** One real idea (the single card-spacing variable), one naming
alignment. No visual direction.

### Dribbble — **unreachable. Again.**

Three attempts, three empty responses:
`https://dribbble.com/tags/dashboard`, `https://dribbble.com/search/mobile-dashboard`,
`https://dribbble.com/shots/popular/mobile`. Each returned a page with no body content — the same bot
challenge `DESIGN-SYSTEM-REVIEW.md` recorded on 2026-08-26.

**Verdict: no findings. Drop it from the source list.** I have invented nothing to fill the gap; the
visual direction in §3 comes from the product owner's reference screens, which is a better source
than a mood board anyway.

### Tamagui — **one idea, and it is not one we can use yet**

`https://tamagui.dev/docs/components/stacks`

What it actually has: `XStack` / `YStack` / `ZStack` extending a styled `View`, a `gap` prop taking
token references (`$2`, `$3`), `hoverStyle` / press handling on the stack itself, an `elevation`
prop that scales a shadow with size, and **media-query props** — `$gtSm={{ flexDirection: 'row' }}`
— that let a single element restyle at a breakpoint.

Measured against the kit: `gap` on token keys, press states and elevation-from-a-scale are all
already here and better-argued (`v4-state.ts`, `v4-depth.ts`). The **media-query prop** is the one
thing Tamagui has that this kit genuinely lacks — there is no breakpoint mechanism anywhere in
`layout`, so `Grid columns` is a fixed number on a phone and a tablet alike.

**Verdict: one idea, deferred.** It does not become a Tamagui-shaped API. The scoped version of it in
this pass is `Grid minItemWidth` (§5). A general responsive-prop system is a separate piece of work —
see the open questions. This is the second review in which Tamagui has produced nearly nothing; after
this one, drop it.

### gluestack-ui — **nothing.**

`https://gluestack.io/ui/docs/components/box`, `https://gluestack.io/ui/docs/components/vstack`

`Box`, `HStack`, `VStack`, `Center`, `Divider`, `Grid` (alpha). `VStack` exposes exactly two props:
`space` (`xs`…`4xl`) and `reversed`. That is a strict subset of what `src/native/layout/Column.tsx`
already does, which has `gap` on the same style of scale plus `align` and `justify`. Their docs give
no pixel values for the scale, no layout guidance, and no screen-level patterns beyond a list of
example apps with no design commentary.

**Verdict: nothing, for the second review running. Drop it from the source list.** The team asked for
a straight answer: gluestack-ui has nothing to offer this kit.

---

## 3. What this product actually looks like

This outranks §2 entirely.

Warm, generous, airy consumer mobile. Soft cream/peach page ground. Bold near-black headlines. Calm
muted body copy. **White cards floating on the warm ground**, soft radius, gentle shadow. Glyphs sit
in soft tinted circular badges. Big full-width pill CTAs. Green means positive/saved/earned.
Generous vertical rhythm — space is the primary structuring device, not rules and borders.

**A KPI in this product is not an admin tile.** The current `StatCard` is a bordered box the same
colour as the page with a 24px number in it — that is a spreadsheet cell. In this product a stat is:

- a **white card** (`colors.card`) on the warm page (`colors.surface`), `radius.lg`,
  `spacing.lg` padding, a soft `elevation.card` shadow and a hairline — no heavy border;
- optionally a **tinted circular badge** at the top naming what the number is about;
- a small, calm **label** (`size="sm"`, `mutedText`) *above*;
- the **value as the loudest thing on the screen after the page title** — `size="3xl"`,
  `weight="bold"`, `onCard`;
- a **delta** in `successText` / `dangerText` / `mutedText` with a real `IconV4` arrow;
- **two per row on a phone**, never four, never a bordered six-cell grid.

Everything dense, gridded, ruled, uppercase, or tightly packed is wrong here. When in doubt: more
space, fewer lines, softer edges, one loud thing per block.

---

## 4. Shared decisions the 32 must all follow

### 4.1 Spacing rhythm

One rhythm, applied everywhere. No component invents its own.

| Where | Token |
|---|---|
| Page gutter (screen edge → content) | `spacing.lg` (24) — M3 medium margin, HIG "respect margins" |
| Between top-level sections on a page | `spacing.xl` (32) |
| Card outer padding | `spacing.lg` (24) |
| Between a card header and its body | `spacing.md` (16) |
| Row horizontal padding | `spacing.md` (16) — M3 list leading/trailing space |
| Row leading slot → text | `spacing.md` (16) |
| Between a title and its supporting line | `spacing.xs` (4) |
| Grid / KPI gutter | `spacing.md` (16) |
| Chip gaps | `spacing.sm` (8) |
| Empty-state vertical padding | `spacing['2xl']` (48) |

`gap-0.5` and `gap: 2` are the current stand-in for "title to supporting line". They become
`spacing.xs`.

### 4.2 Card treatment — one recipe

```
ground     colors.card         (NOT colors.surface)
ink        colors.onCard
radius     radius.lg
padding    spacing.lg          (one variable, read by every slot — the shadcn idea)
edge       1px colors.border
depth      elevation.card, via shadowCss / CardV4
```

**The most visible bug in the dashboard module today is that every card paints `bg-surface` — the
same colour as the page.** `colors.card` was split out in the shadcn pass specifically so a raised
card reads as raised in both schemes, and this module never adopted it. `StatCard`, `MetricTile`,
`SectionCard`, `SettingsSection`, `OnboardingChecklist`, `QuickActions` tiles all move to `card`.

Compose `CardV4` where the shape allows it rather than re-rolling the recipe. Never a heavy border
*and* a heavy shadow — the house look is hairline plus soft shadow.

### 4.3 Row treatment — this is the one that matters most

`ListRow`, `SettingsRow`, `NotificationItem` and each row of `ActivityFeed` must be
**indistinguishable as a family**. Today they are four different components: three different
paddings, two different min-heights, two different press feedbacks, three different leading
treatments (an avatar, nothing, an 8px dot), and two different unread grounds.

The row metric, from M3's list-item tokens, composed from the kit's scale so nothing is retyped:

| | Value | Composed as |
|---|---|---|
| One-line row min height | 56 | `spacing['2xl'] + spacing.sm` |
| Two-line row min height (has a supporting line) | 72 | `spacing['2xl'] + spacing.lg` |
| Horizontal padding | 16 | `spacing.md` |
| Leading slot → text gap | 16 | `spacing.md` |
| Leading slot size | 44 | the HIG tap floor / house §8 badge |
| Title → supporting line | 4 | `spacing.xs` |

Anatomy, left to right, always in this order:

```
[ 44 leading slot ]  [ title           ]  [ trailing value ]  [ affordance ]
                     [ supporting line ]  [ timestamp      ]
```

- **Leading slot**: an `AvatarV4` (a person), a tinted circular badge (a kind of thing — see 4.7), or
  absent. Never a bare 8px dot; `ActivityFeed` and `NotificationItem` both use one today and both
  become badges.
- **Title**: `TextV4 size="base" weight="semibold" tone="onSurface"`, one line, truncates.
- **Supporting line**: `TextV4 size="sm" tone="mutedText"`, one line, truncates.
  Note: `mutedText`, not `muted`. `muted` is a fill. The current native rows use `colors.muted` as a
  text colour throughout — that is the exact bug the shadcn pass closed and `Toast` still had.
- **Trailing**: value text `size="sm" tone="mutedText"`, then the affordance. A timestamp is
  `size="xs" tone="mutedText"` and top-aligns on a two-line row.
- **Affordance**: `IconV4` chevron when the row navigates (HIG: a chevron means navigation), a
  control when the row toggles, nothing otherwise.
- **Ground**: transparent. The *container* owns the card, so a list of rows inside a
  `SettingsSection` is one white card with rows in it, not a stack of cards.
- **Press feedback**: the state layer, always.
  Web: `data-xen-v4-state` and nothing else.
  Native: `stateMix(colors.card, colors.onCard, 'pressed')` — the opaque flavour, because a row's
  text carries a contrast promise against the fill it is drawn on.
  **Delete every `hover:bg-neutral-100`, `hover:opacity-80` and `opacity: pressed ? 0.7 : 1`.**
  `v4-state.ts` was written to kill exactly these; this module is where they survived.

### 4.4 Divider / separator treatment

- A separator is **1px `colors.border`** and nothing else. Never two weights, never a tinted rule.
- Use one **only inside a grouped container** — between rows of a `SettingsSection`, or between a
  card header and a body that is a list. **Between free-standing blocks, use space, not a rule.**
  A hairline under every screen title is admin styling; `PageHeader` loses its default border.
- **Inset to clear the leading slot.** Where rows have a 44 leading slot, the separator starts at
  `44 + spacing.md`. `Divider` and `ListSeparator` both gain `inset="leading"` alongside the existing
  spacing-token inset. Rows without a leading slot get a flush separator.
- `ListSeparator` is native-only today. The row family needs it on both twins — add a web twin.

### 4.5 Empty-state treatment

- **Every empty state routes through `EmptyStateV4`.** It exists on both twins already. The web
  `ActivityFeed` hand-rolls one; `EmptyDashboard` hand-rolls another; the native `ActivityFeed`
  correctly composes the primitive. Converge on the primitive.
- Anatomy: a **64 tinted circular badge** (or the caller's `icon`) → headline
  `size="xl" weight="bold"` → body `size="base" tone="mutedText"` at a comfortable measure →
  **exactly one** full-width pill CTA (`ButtonV4`, `radius.full`, inset by `spacing.lg`). Centred.
  Vertical padding `spacing['2xl']`.
- `max-w-[340px]` is a literal and goes; the measure is the container's job.
- **Every one of the 32 must survive its empty case**: `items: []`, `steps: []`, `options: []`,
  `actions: []`, no title, no subtitle, no icon, no action. A component with nothing to show renders
  nothing or an empty state — never a blank bordered box.

### 4.6 Elevation

Three things carry a shadow, and nothing else:

| Role | Token |
|---|---|
| A card sitting on the page | `elevation.card` |
| A sheet or floating panel | `elevation.sheet` |
| The single dominant action | `elevation.action` |

Rows, chips, dividers, headers, and **anything already inside a card** carry none. Never nest a
shadow in a shadow — a `StatCard` inside a `SectionCard` is flat. On a `depth: 'flat'` seed the
tokens are already inert, so no component needs a branch.

### 4.7 When a tinted circular badge is used

The badge is: **44 × 44** (64 in an empty state), `radius.full`, ground = the glyph's own hue at the
50/100 ramp step (`primary[50]` by default) composited with `mixToken` on native, glyph in the
matching `*Text` colour.

**Use one when the row or tile is categorical** — when the leading slot names *a kind of thing*: an
activity type, a quick action, a settings group, a notification category, the subject of a metric or
an empty state.

**Do not use one** for a person (that is `AvatarV4`), for a state (that is a dot or a `BadgeV4`), or
decoratively on every row of a homogeneous list — a list of twenty identical badges is noise.

One badge per row, maximum. Its colour comes from the semantic family the row belongs to: `primary`
by default, `success` for positive money, `warn` / `danger` only when the row genuinely is a warning.

---

## 5. Per-component notes

Grounded in the current source. "Structure only" means the V4 exists for line consistency and prop
parity and must not change how the component looks.

### layout (16)

**AspectRatio** — Structure only, no visual change. Both twins are already token-pure. One fix:
`rounded` hardcodes `radius.lg`; widen it to `rounded?: boolean | 'sm' | 'md' | 'lg'` (`true` keeps
`lg`) so a hero panel and a thumbnail can differ. Assert `overflow: hidden` on native.

**Bleed** — Structure only. Already the cleanest file in the module. One addition:
`edge?: 'both' | 'start' | 'end'` (default `'both'`), because `FilterChips scroll` needs to bleed one
side to the screen edge so the last chip is reachable.

**Center** — Structure only. Nothing to fix. Do not add padding to it; that is `Inset`'s job.

**Column** — Structure only, plus one parity fix: web types `align` as
`Exclude<Align, 'baseline'>` and native accepts the full `Align`. Narrow native to match web —
`baseline` is not meaningful on a column. Leave `gap` defaulting to undefined (additive rule); the
rhythm in §4.1 is the caller's decision.

**Container** — This is the page-gutter component and the anchor for §4.1. `padding="lg"` (24) is
already right and matches M3's medium margin. Two real fixes: `maxWidth = 480` is a bare literal that
is also too narrow on a tablet — widen to `maxWidth?: number | 'none'` and document 480 as the
mobile-reading default; and add `safeArea?: boolean` (native) so the gutter respects the horizontal
inset, since HIG asks for it and nothing in this module does it.

**Divider** — Add `inset="leading"` per §4.4, computed as `44 + spacing.md`, alongside the existing
`SpaceKey` inset. Otherwise structure only. Keep the `<hr>` on web for its implicit `separator` role.
Do not add a label variant — `AuthDividerV4` already owns that.

**Flex** — Structure only. Parity is already exact. Add `shrink?: number` to both twins to match the
existing `grow`.

**Grid** — Add `minItemWidth?: number`. On web it switches the template to
`repeat(auto-fit, minmax(minItemWidth, 1fr))`; on native, where there is no CSS grid, it must degrade
to the existing `columns` behaviour. This is the scoped form of the one Tamagui idea worth having,
and it is what lets `KpiRow` and `QuickActions` stop being fixed-column on a tablet. `columns`
default stays 2.

**Inset** — Structure only. Token-pure on both twins. Nothing to fix.

**KeyboardAvoider** — Native-only; no web twin exists (see open question 1). Structure only. Two
notes: it hardcodes `flex: 1` ahead of the caller's `style`, which is correct but must be documented;
and it should pass `offset?: number` through to `keyboardVerticalOffset`, which a screen with a
sticky footer needs.

**ListSeparator** — Native-only today, and the row family needs it on both twins — **add a web
twin**. Default it to `inset="leading"` when the rows carry a leading slot, flush otherwise. This is
the component `SettingsSection` and any `ListRow` list should use instead of hand-rolling
`<div className="h-px bg-border" />`, which both twins do today.

**PageHeader** — The largest visual change in `layout`. Today: `text-2xl font-bold` plus a permanent
bottom border. V4: title `TextV4 size="3xl" weight="bold" tone="onSurface"`, subtitle
`size="base" tone="mutedText"`, gap `spacing.xs`, `spacing.lg` padding below the block, and **the
bottom border comes off by default** — add `divided?: boolean` defaulting to `false`. A hairline
under every screen title is admin styling and fights the airy ground (§3). An `actions` node longer
than an icon wraps below the title on a narrow screen rather than crushing it.

**Row** — Structure only. `align='center'` default is right for the row family. Match `Column`'s
align type on both twins.

**ScrollArea** — Structure and parity only, no visual change. Parity gap: web has `axis`, native does
not — add `axis` to native (mapping to `horizontal`). Add a native `contentInset` for the bottom safe
area. Keep `padding="lg"` as the default (changing it is not additive) but document `padding="none"`
as the correct choice for full-bleed content.

**Section** — Type ramp diverges today (web `text-lg font-semibold`, native `lg` / `600`). V4: title
`size="xl" weight="bold"`, subtitle `size="base" tone="mutedText"`, header-to-body gap default
`spacing.md`. Add `action?: ReactNode` — a "See all" link — so a `Section` and a `SectionCard` have
**the same header anatomy**, which is the shadcn `CardAction` idea and the reason the two currently
look unrelated. Section-to-section rhythm stays the caller's (`Column gap="xl"`).

**Spacer** — Structure only. Token-pure, `aria-hidden` already correct. No visual change.

### dashboard (16)

**ActivityFeed** — Rows join the row family (§4.3). The 8px dot becomes a 44 tinted circular badge:
`ActivityItem` gains `icon?: ReactNode` and `tone?`. Keep a 1px `colors.border` rail running behind
the badges, on by default at three or more rows (house §8) — it is what makes a feed read as one list
rather than fragments. The empty state routes to `EmptyStateV4`; the web hand-rolled block goes (the
native twin already composes the primitive — web is behind). Heading adopts the `Section` header
anatomy.

**EmptyDashboard** — Rebuild as a thin, opinionated wrapper over `EmptyStateV4` rather than a second
implementation of it. `icon` renders in a 64 tinted circular badge. The CTA becomes a **full-width
pill** `ButtonV4` (`radius.full`, inset `spacing.lg`), not the shrink-wrapped button it is today —
HIG's full-width-button-inset-from-the-edge rule and the house sticky-CTA shape agree here. Remove
`max-w-[340px]`.

**FilterChips** — Chips are control-shaped but not fields: they take **min-height 44** (the HIG
floor, and the house §7 minimum) with `radius.full`, not the 48 field metric. Selected =
`colors.primary` fill + `onPrimary` + `weight="semibold"`; unselected = `colors.card` ground +
`colors.border` hairline + `onSurface`. Replace `hover:bg-neutral-100` with the state layer. `scroll`
mode must not clip the last option (house §7) — pair it with `Bleed edge` so the row runs to the
screen edge; **wrap stays the default**. Keep the deselect-to-`''` behaviour exactly as documented.

**KpiRow** — Keeps the wrap and the two-up phone layout, but `basis-[44%]` / `flexBasis: '44%'` is a
literal — express it through `Grid` with `columns={2}` (and `minItemWidth` for wider screens) instead
of a magic percentage. Gutter `spacing.md`. Add `columns?: 2 | 3` **capped at 3** — four KPIs across
a phone is the admin-panel look §3 rules out. Must render `null`, not an empty flex box, for
`items: []`.

**ListRow** — The canonical row; everything in §4.3 lands here first and the other three follow it.
Adopt the 56/72 metric, `spacing.md` horizontal padding, the 44 leading slot, `spacing.xs` text gap.
Ground goes transparent — the container owns the card. `min-h-[56px]` / `minHeight: 56` become the
composed constant. Replace `hover:bg-neutral-100` (web) and `opacity: pressed ? 0.7` (native) with
the state layer. Add `chevron?: boolean`, defaulting to `true` when `onClick` / `onPress` is set,
rendered as an `IconV4` — HIG's navigation affordance, currently missing entirely.

**MetricTile** — **Web is behind native and must catch up**: the web twin colours the value with
`text-success` / `text-danger` / `text-warn` / `text-primary`, which are *fill* colours measured at
2.32:1 against `surface`; native already fixed this to the contrast-corrected `*Text` slots. Web
adopts `*Text`. Visually: ground `colors.card`, `radius.lg` (was `md`), padding `spacing.md`, **drop
the border**, and take `elevation.card` only when the tile is not inside another card. Label
`size="sm" tone="mutedText"` above, value `size="2xl" weight="bold"`. This is the in-card tile;
`StatCard` is the on-page card.

**NotificationItem** — Joins the row family. The 8px dot becomes a 44 tinted circular badge carrying
a category `icon`. Unread is signalled three ways: a bold title, a small `primary` dot at the
trailing edge, and a `primary`-at-**0.08** ground over `card`. **The web twin's `bg-neutral-100`
unread ground is the bug native already fixed** — do not carry it forward. The tint opacity is
deliberately 0.08 and not native's shipped 0.12, because 0.12 is the *pressed* state-layer opacity
and a decorative tint must not be indistinguishable from a press (see open question 4). Timestamp
`size="xs" tone="mutedText"`, top-aligned.

**OnboardingChecklist** — The `w-[22px]` marker and the literal `✓` both go: the marker is a 44
circular badge, `success`-tinted with an `IconV4` check when done, `colors.border`-outlined when not.
**Drop the strike-through** — struck text reads as deleted, not completed; a done step is a filled
badge plus a `mutedText` label. The meter keeps its bar: `radius.full`, track height `spacing.xs`,
track `colors.border`, fill `colors.primary`. Card treatment per §4.2 — `card` ground, `radius.lg`,
`spacing.lg` padding, `elevation.card`. Must survive `steps: []` (0 of 0, no divide-by-zero — the
current guard is correct, keep it).

**PageContainer** — Parity gap in both directions: native has `scroll` and `bottomInset`, web has
neither. Close both. Ground is `colors.surface` (the warm page — this one is correct as `surface`,
unlike the cards), padding `spacing.lg`. **It must compose `PageHeader`** rather than re-implementing
a title block: today `PageContainer` renders `text-2xl` + `text-base` and `PageHeader` renders
`text-2xl` + `text-sm`, so the same screen header exists twice at two type ramps. Add a native top
safe-area inset.

**ProfileHeader** — Type ramp and structure. Avatar `size="xl"`, name `size="2xl" weight="bold"`,
subtitle `size="base" tone="mutedText"` (currently `sm`), gap `spacing.md`, `spacing.lg` vertical
padding — this block tops the account screen and should feel generous, not like a row. Add optional
`onClick` / `onPress` with the state layer so the whole header can open the profile. No card; it sits
directly on the page ground.

**QuickActions** — Tiles become the product's warm tile: `colors.card` ground, `radius.lg`, **no
border**, `elevation.card`, and the icon moves into a 44 tinted circular badge above a
`size="sm" weight="semibold"` label. Padding `spacing.md`; grid gap `spacing.md` (was `sm` — too
tight for §3). Minimum 44 tap. Replace `hover:bg-neutral-100` with the state layer and
`disabled:opacity-50` with `V4_DISABLED_CLASS` (0.38). `columns` default stays 3; route the grid
through `Grid` so it inherits `minItemWidth`.

**SearchHeader** — The only field-shaped component in the 32, so the Addendum applies: it **may stay
a pill** (`radius.full`, the named exception) but must take the **48 height** and the shared focus
ring from `internal/field-v4.ts`, and its ground is `colors.input`, not `surface`. Replace the `⌕`
and `✕` text glyphs with `IconV4`. It is entitled to `error?: string` under the Addendum but has no
use for one — **do not add it**.

**SectionCard** — The canonical card; §4.2 lands here. `colors.card` / `onCard` (not `surface`),
`radius.lg`, `spacing.lg` padding, hairline `border`, `elevation.card`. Header: title
`size="lg" weight="bold"`, subtitle `size="sm" tone="mutedText"`, trailing `action` — same anatomy as
`Section`. Adopt the single-padding-variable structure from shadcn so every slot reads one value, and
add `padding="none"` plus `overflow: hidden` so a list of rows can run flush to the card edge and
clip to `radius.lg`. `divided` stays, but the rule is: use it **only** when the body is a list of
rows.

**SettingsRow** — Row family, short variant. Min height stays **48** (`spacing['2xl']`) when there is
no `description` and no leading slot; with either, it goes to **72**. Horizontal padding changes from
`lg` to `spacing.md` so it agrees with `ListRow` — this mismatch is why a settings list and a people
list currently do not look related. The `›` text glyph becomes an `IconV4` chevron. Label
`size="base" weight="medium"`, description and value `size="sm" tone="mutedText"`. Add optional
`leading?: ReactNode` so a settings list can carry the tinted badges of the reference screens. State
layer replaces `hover:bg-neutral-100` / `opacity: pressed ? 0.7`.

**SettingsSection** — The HIG inset-grouped list, and the container that makes `SettingsRow` look
right. Card treatment per §4.2, with `overflow: hidden` so rows clip to `radius.lg`. Separators
between rows become `ListSeparator` (`inset="leading"` when rows have leading slots, flush
otherwise), replacing the hand-rolled `<div className="h-px bg-border" />` on both twins. **Drop the
uppercase `xs` group heading** — that is admin styling; HIG grouped headers are sentence case. It
becomes `size="sm" weight="semibold" tone="mutedText"`. Heading and footnote pad by `spacing.md` to
line up with the card edge, not `px-sm`. Must render nothing for zero children.

**StatCard** — §3's decision lands here. `colors.card` ground (the current `bg-surface` makes the
card the same colour as the page), `radius.lg`, `spacing.lg` padding, hairline, `elevation.card`.
Order top to bottom: optional tinted circular badge → label `size="sm" tone="mutedText"` → value
`size="3xl" weight="bold" tone="onCard"` (up from `2xl`, which currently ties the page title) →
delta. Delta uses `successText` / `dangerText` / `mutedText` and an **`IconV4` arrow**; the literal
`▲` / `▼` characters go. Keep `icon` for parity but render it in the badge position rather than
floating at the top-right. Add `caption?: string` for the "vs last month" line the reference screens
carry.

---

## 6. Open questions

Answer these before building, so 32 agents do not each guess differently.

1. **Layout module membership.** Web has `Cluster` and `Sticky` with no native twin; native has
   `KeyboardAvoider` and `ListSeparator` with no web twin. The 32-list takes the native-only pair and
   drops the web-only pair. Do `Cluster` and `Sticky` get V4s too (making it 34)? *My
   recommendation:* build a **web `ListSeparator`** in this pass because the row family needs it on
   both twins; leave `Cluster`, `Sticky` and `KeyboardAvoider` as documented single-platform
   exceptions, the way `XenitionNativeThemeProviderV4` already is.

2. **`colors.card` vs `colors.surface` for the page ground.** §4.2 says page = `surface`, cards =
   `card`. Nothing in this module has ever been rendered with the two actually different — every card
   paints `surface` today. Someone should confirm that the compiled `card` really is visibly lighter
   than `surface` for the product's warm seed in **both** schemes before 16 components depend on it.

3. **Should there be an `internal/row-v4.ts`?** The row metric (56 / 72 / 44 / `spacing.md`) is used
   by at least six components across two modules and four files. `field-v4.ts` exists for exactly
   this reason and the Addendum's argument for it applies verbatim. *My recommendation:* yes — one
   new internal file per twin, not a component, so the numbers cannot drift again.

4. **The unread tint: 0.08 or native's shipped 0.12?** I chose 0.08 because 0.12 is the pressed
   state-layer opacity, so a tinted unread row and a pressed read row would be the same colour. This
   is a deliberate small visual change to a shipped native component. Confirm.

5. **Does `MetricTile` still earn its place beside `StatCard`?** I have written them as a pair —
   `StatCard` is the card on the page, `MetricTile` is the tile inside a card. If that distinction is
   not wanted, one of them should be deprecated rather than both drifting toward the same look.

6. **Icon names.** These components need `chevron-right`, `check`, `search`, `close`, `arrow-up`,
   `arrow-down` and a bell at minimum. Confirm those exist in the kit's named icon set before agents
   start guessing names — a missing glyph is how the text-character placeholders got there the first
   time.

7. **Responsive.** The kit has no breakpoint mechanism at all. `Grid minItemWidth` gives web auto-fit
   for free, but the native equivalent needs an `onLayout` measurement. Is a measured-width native
   grid in scope for this pass, or does native stay fixed-column and the responsive story wait for a
   proper breakpoint system (the one genuinely useful Tamagui idea)?
