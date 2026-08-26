# React Native UI Component — Issues and Improvements

A working document for `@xenition/ui`'s native surface. It records the **patterns** of
defect found across the kit, not a list of one-off bugs, so that the same classes get
caught in review and designed out of new components rather than found again later.

Measured against `@xenition/ui@0.4.0`, **750 native component files, 830 exported
components across 54 modules**.

**How to use it**

- **Reviewing a PR** — run the checklist in [Part D](#part-d--the-checklist-for-every-new-component).
- **Planning work** — take the next item from [Part E](#part-e--prioritised-backlog).
- **Writing a new component** — read Parts B and C first. Every rule there exists because
  a shipped component broke it.

**How the findings were produced.** Three passes, in increasing cost:

| Pass | What it proves | Command |
|---|---|---|
| Token audit | The theme *compiler* keeps its contrast promise | `npm run contrast` (ui-gallery) |
| Rendered audit | Each *component* actually uses those tokens | `npm run audit` (ui-gallery) |
| Data fuzz | Components survive hostile data | `npm run fuzz` (ui-gallery) |

The middle one matters most and did not exist before. `tsc` and jest **cannot** find any
issue in Part A: every one of them type-checks perfectly and renders without throwing.
They are *wrong*, not *broken*.

---

## Part A — Defect patterns found

Ordered by how often they occurred.

### A1. A fill colour used as text — **137 occurrences, 114 files**

The most common defect in the kit by a wide margin.

The compiler guarantees `onDanger` reads on `danger`. It guarantees **nothing** about
`danger` on `surface`. Components used the fill as text anyway — the obvious thing to do
for a link, a chart key, a filled star, a required asterisk.

| Component | Measured | Element |
|---|--:|---|
| `Rating` | 1.43:1 | Filled stars |
| `JsonViewer` | 1.43:1 | Syntax keys |
| `Tag` / `Badge` | 1.32:1 | soft + outline labels |
| `MetricTile` | 2.32:1 | The metric value |
| `Button` | 2.66:1 | soft / ghost / outline / link labels |
| `Label`, `Field` | 3.97:1 | Required asterisk |
| `StatusMessage` | 3.97:1 | Error line |
| `CrudTable` | 3.97:1 | Delete action |
| `Calendar` | 3.99:1 | Month arrows |
| `LoginForm`, `SignupForm`, `ForgotPasswordForm` | 3.99:1 | Links |
| `CodeBlock`, `MultiSelect` | 3.99:1 | Copy affordance, selected count |

**Why it survived review.** Most land at 3.97–3.99 against a 4.5 requirement. On a screen
3.97 and 4.5 are indistinguishable. Only a measurement separates them.

**Fixed** by adding the missing token rather than patching each component:
`primaryText` · `accentText` · `successText` · `warnText` · `dangerText`, each
`ensureContrast(colour, surface, 4.5)`.

> **Rule:** `colors.primary` is a **background**. If it is going in a `color:` property,
> you want `colors.primaryText`. ~125 occurrences remain in the 44 domain modules — see
> [E1](#e1--finish-the-fill-as-text-sweep-125-occurrences).

### A2. Text with no colour at all — inherits black

React Native `Text` does **not** inherit colour from a parent `View`. With no colour it is
black: fine on light, invisible on dark.

- `AnimatedCounter` — 1.29:1 in dark. Its doc comment said "inherit color via `style`",
  which is not a thing RN does.

> **Rule:** every `<Text>` sets a colour from the theme. There is no inheritance to rely on.

### A3. A token used for the wrong *role*

- `NotificationItem` — unread rows set `backgroundColor: colors.muted`. `muted` is the
  **body-text colour**, so the row painted itself the same colour as its own text.
  **1.00:1 — literally invisible.** Both schemes, all five seeds.

> **Rule:** `muted` is text. `border` is a boundary. `surface` is a ground. For a tint,
> derive one: `withAlpha(colors.primary, 0.12)`.

### A4. Semantic colour that does not mean what it says

- `Tag` — the `warn` tone was filled with `accent`, so warnings rendered in the brand's
  secondary colour.
- `Tag` — `success`/`warn`/`danger` all used `onPrimary` as their label.

`Badge` carries an identical tone map and had all of it right. **Two sibling components
disagreeing about what `tone="danger"` means is worse than either answer.**

> **Rule:** when two components share a concept, they share the map. Grep for the sibling
> before inventing one. Ties to `design.md` §35 — status colours mean only what they say.

### A5. Nested interactive elements

- `Popover`, `Menu`, `Popconfirm`, `Tooltip` — each *wrapped* its trigger in a `Pressable`
  marked `accessibilityRole="button"`. Pass a `Button` as the trigger — the natural thing —
  and you got a **`<button>` inside a `<button>`**. (History: all four now clone the
  trigger instead, so no wrapper is left to be a button. See the end of this section.)

Confirmed in the live DOM. Invalid HTML, two React errors per mount, the browser chooses
which element takes the click, and screen readers announce "button" twice.

> **Rule:** a wrapper that accepts arbitrary content is a **transparent tap surface**, never
> a `button`. The role belongs to whatever the caller passed in. The web twins already do
> this — they use a plain `<span onClick>`.

**That rule was not enough on native, and `Popconfirm` proved it (2026-08-25).** A
transparent tap surface still loses the tap: RN gives the touch responder to the
**deepest** `Pressable` under the finger, and gives it whether or not that `Pressable`
has an `onPress`. So a `Button` trigger swallowed the press, Popconfirm's wrapper never
fired, and the confirm bubble never opened — every destructive action in a generated app
was a silent no-op. Apps got the tap back with `<View pointerEvents="none">` around the
trigger, which then made the trigger's own `disabled` cosmetic. The kit's spec passed a
bare `<Text>` and saw none of it.

> **Rule:** on native, do not wrap a caller's trigger in a pressable **at all**. Clone the
> element and inject the `onPress` (chaining any handler it already has), so there is one
> pressable, the trigger keeps its role, and its `disabled` still means something. The web
> twin should clone `onClick` the same way for parity.

**All four are fixed (2026-08-25).** `Popover`, `Menu` and `Tooltip` carried the identical
wrapper and the identical bug — one bug in four components, not four bugs — and each now
clones its trigger on both twins. Two things the sweep settled:

- **`disabled` was worse than cosmetic, it was inverted.** Under RNTL a *disabled* child
  `Pressable` does not consume the press, so the old wrapper fired: a `Button` trigger you
  could tap did nothing, and a `disabled` one opened the overlay. Both directions wrong,
  from one line of code.
- **`Tooltip` takes `onLongPress`, not `onPress`** — the one place the four differ. The
  other three *are* the trigger's action; a tooltip is not. On web it comes up on hover,
  which activates nothing and which no nested control can intercept, so the web `Tooltip`
  is the only one of the four that correctly keeps its wrapper. Native has no hover, so it
  injects the gesture that likewise activates nothing — long-press, the platform's own
  tooltip gesture — and the control keeps its press for its own job.

> **Rule:** injecting a handler means *taking over that gesture*. Inject the gesture the
> overlay actually owns. If the wrapped control already owns the press, you own a different
> one.

The specs are the reason this shipped at all: every one of the four passed a bare `<Text>`
or `<button>` as its trigger, which cannot steal a responder, so the suite was green on a
component that no real trigger could open. Each now has a kit-`Button` trigger test.

### A6. Cross-platform parity breaks that fail silently

Adding tokens to `SemanticColors` gives them to native. Two **hand-maintained lists** in
`src/theme/outputs.ts` decide what web receives. Miss them and the token exists on one
platform only — no error, no warning, `var(--xen-primary-text)` simply resolves to nothing.

> **Rule:** a token touches four places — `types.ts`, `compile.ts`, `SEMANTIC_KEYS`, and the
> Tailwind colour map. Missing any one is silent.

### A7. Tests that assert the defect

Seven specs failed when the components were fixed, because they pinned the **old wrong
colour**: `expect(color).toBe(lightColors.success)`.

They passed for months while describing a real accessibility bug. A test asserting
`color === colors.success` only checks that the component reads the slot it reads — it
cannot know the slot is the wrong one.

> **Rule:** assert the *property* (`ratio >= 4.5`), not the *value* (`=== colors.success`),
> wherever the property is what you actually care about.

---

## Part B — The kit is classic, not modern

This is a **design direction gap**, not a bug, and it is the largest single opportunity in
the kit. Measured across all 750 native component files:

| Visual technique | Files using it | Share |
|---|--:|--:|
| Shadow / elevation | **3** | 0.4% |
| Gradient | **2** | 0.3% |
| Blur / translucency | 10 | 1.3% |

The result is a flat, bordered, rectangular system — competent and consistent, but it reads
as a 2016 admin theme rather than a 2026 product. Everything is `borderWidth: 1` +
`borderColor` + a flat `surface`.

**What is missing, and what it would take**

| Technique | Where it belongs | Notes |
|---|---|---|
| **Elevation** | `Card` (has an `elevated` variant that barely elevates), `BottomSheet`, `Drawer`, `Modal`, `Popover`, `FloatButton`, `Toolbar` | Needs a token-level `shadow` scale — sm/md/lg — beside `radius` and `spacing`. Today shadows are ad-hoc in 3 files. |
| **Translucency / glass** | `AppShell` top bar, `BottomNav`, `Modal` backdrop, sticky headers | `GlassPanel` exists and is good. Nothing else uses the idea. |
| **Gradient** | `GradientText` and `Bento` only | The ramps are already compiled — `ramps.primary[400→700]` is a gradient waiting to be used. |
| **Depth on press** | Everywhere | 264 components change `opacity` on press. That is the entire interaction vocabulary of the kit. |

> **This needs a design decision before code.** `design.md` §8 warns against generic
> AI-generated UI and §12 requires strong tokens. A shadow scale in the compiler is the
> right first move: it makes depth a token rather than 750 individual judgements.

---

## Part C — Almost nothing is animated

| Motion | Files | Share of 750 |
|---|--:|--:|
| Uses `Animated` | **13** | **1.7%** |
| Uses `LayoutAnimation` | 3 | 0.4% |
| Respects reduced-motion | 10 | 1.3% |
| Haptic feedback | **0** | 0% |
| Press feedback only (opacity) | 264 | 35% |

**The 13 that are animated:** `TypingIndicator`, `SwipeDeck`, `Bento`, `StatBar`,
`AnimatedCounter`, `Marquee`, `Reveal`, `BottomSheet`, `Drawer`, `Skeleton`, `StatusDot`,
`Switch`, `BreathingGuide`.

**98.3% of the kit has no motion beyond an opacity dip on press.**

`design.md` §36 is explicit that motion is part of UX, and names the exact cases the kit is
missing. Its own examples read as a to-do list against this inventory:

| §36 says | Kit today |
|---|---|
| "a bottom sheet rises from the bottom because that explains its origin" | ✅ `BottomSheet`, `Drawer` do this |
| "a tapped card expands into its detail view" | ❌ no component does this |
| "a checkbox smoothly changes to completed state" | ❌ `Checkbox` snaps; only `Switch` animates |
| "a list item collapses after deletion" | ❌ nothing animates list removal |
| "a save action provides a short confirmation transition" | ❌ `Toast` appears without transition |

**Highest-value additions**, in order — each is small and reusable:

1. **`Checkbox`, `RadioGroup`, `Segmented`, `ToggleGroup`, `Tabs`** — state-change
   transitions at 100–180 ms. These are tapped constantly and currently snap.
2. **`Accordion`, `Tree`, `Collapse`** — height transitions. Content appearing instantly
   breaks spatial continuity (§36.1).
3. **`Toast`, `Banner`, `Alert`, `Snackbar`** — enter/exit. Things that appear and vanish
   without motion read as glitches.
4. **`Modal`, `ActionSheet`, `Popover`** — currently `animationType="fade"`, the RN default.
   A sheet should rise; a popover should scale from its origin.
5. **List add/remove** — `List`, `VirtualList`, `DataTable`, `Kanban`.
6. **Skeleton → content crossfade** — `Skeleton` shimmers, then content pops in hard.

**Two rules for all of it**

- **Timing from §36.2:** micro-feedback 100–180 ms · state/layout 160–240 ms · sheets
  220–320 ms. Anything slower feels broken on mobile.
- **`useReducedMotion` is mandatory.** It exists and 10 files use it. Any new animation
  that skips it is an accessibility regression, not a feature.

**Also absent: haptics — 0 files.** On mobile, a selection or a destructive confirm should be
felt. `expo-haptics` as an optional peer would cover the whole kit.

---

## Part D — The checklist for every new component

Every line exists because a shipped component broke it.

**Colour**
- [ ] Every `<Text>` sets a colour. RN does not inherit.
- [ ] A colour in a `color:` property is a `*Text` slot, never a fill.
- [ ] `muted` is text, `border` is a boundary, `surface` is a ground. Tints come from
      `withAlpha(colors.primary, 0.12)`.
- [ ] No literal hex anywhere.
- [ ] Checked in **dark mode**, not just light.

**Structure**
- [ ] A wrapper around caller-supplied content is not a `button` — and a caller-supplied
      **trigger** is not wrapped in a pressable at all. Clone it, inject the handler (A5).
- [ ] The injected handler is the gesture the overlay owns, not the one the trigger owns —
      an overlay that only *describes* the control takes `onLongPress`, not `onPress` (A5).
- [ ] Its spec presses a real kit **`Button`** trigger, not a `<Text>`. A `<Text>` cannot
      steal a touch responder, so it proves nothing about the trigger anyone will pass (A5).
- [ ] Edge-anchored components use `useSafeAreaInsets()`.
- [ ] Sibling components sharing a concept share the map — grep before inventing one.

**Data**
- [ ] Renders with `[]`, with one item, with 500, and with `null` in a declared string.
- [ ] Long strings wrap rather than overflow. Test with a 200-character name.
- [ ] Empty state says what belongs there, never "No data".

**Motion**
- [ ] State changes transition rather than snap (§36.2 timings).
- [ ] Every animation checks `useReducedMotion()`.
- [ ] The motion has a purpose from §36 — not "it felt static".

**Parity and process**
- [ ] Web twin has the same props (`onPress` ↔ `onClick`).
- [ ] "The value changed" is spelled `onChange` on both twins. A component that already
      shipped another spelling keeps it as the name that wins, and adds `onChange`.
- [ ] Exported from the module's `index.ts`.
- [ ] New token? Four places: `types.ts`, `compile.ts`, `SEMANTIC_KEYS`, Tailwind map.
- [ ] `tsc` + jest green, then **`npm run audit`** in ui-gallery.

---

## Part E — Prioritised backlog

### E1 · Finish the fill-as-text sweep (~125 occurrences)
The five core modules are done. The 44 domain modules are not. The transform is mechanical
— `color: colors.X` → `color: colors.XText` — but needs gallery demos to verify against
first, or it is a blind sweep. **Blocked on E2.**

### E2 · Gallery coverage beyond 154 of 830
The audit only sees what the gallery renders. 5 of 54 modules are covered. Each new module
of demos immediately makes the audit cover ~15 more components.

### E3 · A shadow/elevation token scale
Unblocks Part B. Depth becomes a token instead of 750 separate judgements. Compiler change,
same shape as `radius` and `spacing`.

### E4 · Motion pass on the interaction primitives
`Checkbox`, `RadioGroup`, `Segmented`, `ToggleGroup`, `Tabs`, `Accordion`. Highest
value-per-line in the kit — tapped constantly, currently snap.

### E5 · Contrast assertions in CI
`npm run contrast` is 3 seconds and exits non-zero. It belongs in `publish-ui.yml` beside
`npm test`. The rendered audit needs a running gallery, so it is a nightly job rather than
a gate.

### E6 · Haptics as an optional peer
Zero coverage today. `expo-haptics` on selection, success and destructive confirm.

### E7 · Stale documentation
`COMPONENTS-INVENTORY.md` describes 11 modules and ~200 native files. Reality is 54 and 830.
The root docstring in `src/index.ts` still says "React Native components land in a later
version". Both mislead anyone onboarding.

---

## Appendix — Component inventory and live status

| File | What it holds |
|---|---|
| `../ui-gallery/COVERAGE.md` | All 830 components: tested, untested, broken. Generated. |
| `../ui-gallery/AUDIT.md` | Every rendered contrast failure, dark and light. Generated. |
| `../ui-gallery/NODE-SDK.md` | `@xenition/sdk` surface and gaps. Generated. |
| `../ui-gallery/coverage.status.json` | The human verdicts. Hand-maintained. |

Regenerate: `cd ../ui-gallery && npm run web` (one terminal), then `npm run audit`.

**Fixed in 0.4.0:** ~22 components across A1–A5. **1981 tests, 158 suites, `tsc` clean.**
