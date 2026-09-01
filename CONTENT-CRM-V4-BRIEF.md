# `content` + `crm` — the V4 pass

Twenty-five components across two modules, both twins. Written after a full
read of all 50 base files. Every claim below is a defect someone can reproduce,
not a preference.

Companion to `ONBOARDING-V4-BRIEF.md`, `VERTICALS-V4-BRIEF.md`,
`AUTOMOTIVE-BEAUTY-V4-BRIEF.md` and `CALENDAR-CHAT-V4-BRIEF.md`. The rules
those set — no base file is edited, every V4 prop is optional and additive, the
twins keep prop parity — hold here unchanged.

---

## 1. What the sweep measured

Across the 25 components, before this pass:

| | count |
|---|--:|
| press/hover drawn as raw `opacity` instead of an M3 state layer | **20** |
| `Pressable`s in `native/crm` with **no** pressed treatment at all | **12** |
| fill tokens (`muted`, `accent`, `success`) used as **ink** | **22** |
| interactive elements under the 44 minimum | **13** |
| web `div`/`span` + `role="button"` + hand-written key handler | **10** |
| skeleton/placeholder painted `bg-neutral-100` (web) vs `colors.border` (native) | **12** |
| money and large figures set proportional, not tabular | **5** |
| hard-coded English strings | **~76** |

Eight distinct invented opacity values are in play for press alone — 0.5, 0.6,
0.65, 0.7, 0.8, 0.85, 0.9, 0.4. M3's pressed layer is 0.12 and its
disabled-content band is 0.38, both already compiled into `theme.state`. A
press drawn at 0.6 is *below* the band that means unavailable.

---

## 2. `content` — the findings

### 2.1 The keyboard cannot play a podcast

`PodcastRow.tsx:47-56` (web). The row's `onKeyDown` sits on the **container**
that wraps the play `<button>` (`:89`). The click path is guarded —
`e.stopPropagation()` at `:97` — and the keyboard path is not.

Focus the play button and press **Space**: the container's handler runs first,
calls `e.preventDefault()` (which cancels the button's own Space activation,
since browsers fire that on keyup) and then calls `onClick(episode)`. The
episode never plays; the app navigates away. Press **Enter** and both fire —
audio starts and the page changes under it.

There is no keyboard-only way to play a podcast from a podcast row, which is
the row's entire reason to exist, and a mouse user never sees it. The native
twin has the mirror at `native/PodcastRow.tsx:122-129`, where wrapping the
inner content in an outer labelled `Pressable` makes the play control
unreachable to VoiceOver as a separate element.

**The V4 fix:** the row's activation moves onto a real element that does not
contain the play button, and the play control is its own named button on both
twins.

### 2.2 A read-only table of contents is a wall of dead buttons

`TableOfContents.tsx:64` and `native:85` both pass `disabled={!onSelect}`.
`onSelect` is optional, so a TOC rendered for reading — the ordinary case —
turns every heading into `<button disabled>`: greyed by the UA, out of the tab
order, announced "unavailable". A list of headings is a list of headings.

The two twins also disagree about what it *is*: native says
`accessibilityRole="menu"` / `"menuitem"` (`:46`, `:82`), web says `<nav>` with
real buttons (`:39`). A menu implies a popup with menu keyboard semantics.

### 2.3 Accessible names that never land

Three web components hang `aria-label` on a **roleless** element, where it is
ignored: `AuthorByline.tsx:41-46`, `ReadingProgress.tsx:60`,
`PullQuote.tsx:38`. Each native twin sets an `accessibilityRole` beside the
label, so the two platforms genuinely read differently.

`ReadingProgress` is the worst of the three: the label sits on the wrapper
`<div>` while the element that *is* a `progressbar` — the `Progress` primitive
inside it — gets no name at all. And its own prop doc says it is "for pinning
to the top of a reader" while the native twin never touches
`useSafeAreaInsets`.

### 2.4 A category chip with no chip

`CategoryChip.tsx:25` — `soft: 'bg-surface text-accent'`. `ArticleCard` renders
the chip inside a `Card`, and `Card` is `bg-surface`. The chip is the same
colour as the thing it sits on, and its label is `accent` **as text** — the
exact pairing the kit already measured at 1.32:1 and already fixed in `Tag`
(`native/primitives/Tag.tsx:34-40`). `CategoryChip` never got the correction.

Its `active` state is a 1px accent border and nothing else: colour alone, on a
filter control. And `active` renders differently per twin — web excludes the
border on `solid` (`:61`), native does not (`native:60`).

### 2.5 The image placeholder is two different tokens

`bg-neutral-100` on web against `colors.border` on native, in `ArticleCard`,
`ArticleHeader` and `PodcastRow`. Web indexes a ramp step directly, so it
ignores the seed; native spends a **hairline** token as a fill. Neither is
`card`, the token the theme added for exactly this. One shared helper —
`internal/reading-v4`'s `mediaGround` / `MEDIA_GROUND_CLASS` — settles it.

### 2.6 A loading card you can click

`ArticleCard.tsx:41` computes `interactive` **before** the loading branch and
still renders `role="button"`, `aria-label={article.title}` and `onClick`
around the skeleton (`:129-147`). A user can click a placeholder and fire
`onClick` with an article that has not loaded. Native returns early and cannot
(`native:42`).

### 2.7 `TagList` drops the caller's props exactly when the list is empty

`TagList.tsx:29-33` — the populated branch spreads `{...rest}` (`:44`); the
empty branch does not. Every `id`, `data-*` and handler vanishes the moment
`tags` is empty. Native's mirror at `native:35-37` drops `style`.

Its `role="list"` has no `listitem` children on either twin, and the `+N`
overflow chip is unfocusable with nothing to say what the N are.

### 2.8 A news ticker painted in `danger`

`NewsTicker.tsx:83` / `native:55` render the caller's `label` — documented as
"e.g. `'LIVE'` or `'BREAKING'`" — in the **danger** token. Any editorial
eyebrow, a section name, a sponsor tag, comes out as an error colour. `danger`
means something has gone wrong.

The ticker also parameterises `emptyLabel` and then hard-codes
`'Loading headlines…'` two lines later (`:92`), and collapses to a single text
line where its own skeleton belongs.

### 2.9 The rest, in one list

- **`ShareRow`** — every button is exactly 40×40 on web with no recourse
  (`:55`, `:58`); press is `opacity: 0.6` on native, which reads as disabled.
  Four English destination labels ship as visible on-screen copy.
- **`BookmarkButton`** — the saved star is `primary` on web and `accent` on
  native, and on web the star and the word beside it are two different colours
  in one control. `'Save'`/`'Saved'` is rendered on screen with no prop to
  change it. Disabled 0.5, press 0.7. A dead zero-size `View` on native
  (`native:75-77`).
- **`RelatedArticles`** — web composes the shared `EmptyState`, native
  hand-rolls a bordered box, though `EmptyState` exists in native primitives.
  Web imports it from the **deprecated** `../commerce/EmptyState` shim.
- **`PullQuote`** — the `aria-label` duplicates the quote that the
  `<blockquote>` already reads, so the two platforms read it a different number
  of times.
- **`ArticleHeader`** — skeleton title height is a literal `44`/`36` on web and
  derived from the type scale on native, so the same variant draws two
  different skeletons.

---

## 3. `crm` — the findings

### 3.1 Tapping "Call" also opens the contact

`ContactCard.tsx:99` (web). The quick-action pills are real `<Button>`s nested
inside a root `Card` that `activate()` has turned into a `role="button"` with
its own `onClick` (`:52-63`). Neither the pill nor the `Button` primitive stops
the event, so tapping **Call** dials *and* navigates.

The team knew the hazard: the sibling `QuoteCard.tsx:79-82` guards the
identical nesting with `e.stopPropagation()`. Native does not have the bug —
its inner `Pressable` consumes the touch — so the same props behave differently
per platform, and the failure only reproduces on web.

The nesting itself is invalid regardless: interactive content inside
`role="button"`.

### 3.2 The card's name replaces everything inside it

Ten of the twelve components put a short `aria-label` on the interactive root:
`Deal Acme`, `Contact Ada`, `Warm lead Ada`. That label **replaces** the
subtree. A screen-reader user therefore never hears:

the deal value · the probability · the lead score · the quote total · the
message count · the filter count · the timestamp · the word **Overdue**.

`NextStepRow` is the sharpest case — `aria-label={title}` at `:69`/`:91` drops
the entire meta row, so "⚠ Overdue · Mar 4", the whole point of a next-step
row, is silent.

**The V4 fix:** `spokenLine()` in `internal/crm-v4`, joining the parts with
commas — not `metaLine`'s middle dot, which a reader either says out loud or
swallows.

### 3.3 Not one press state in the whole native module

`grep -rn "pressLayer\|pressFill\|stateLayer" src/native/crm/*.tsx` returns
nothing. All twelve `Pressable`s render with no pressed treatment at all, while
the kit ships `state-v4` for precisely this — and the helper's own docblock
records that it was written to replace this class of problem.

### 3.4 A lead's score badge is coloured by its temperature

`LeadRow.tsx:75` / `native:103` — the badge printing the **score** takes its
tone from `TEMPERATURE_META[temperature]`. A lead scored 5 renders a `danger`
badge because it is `hot`. The colour carries no information about the number
inside it, and the number ships with no unit or label at all.

The row also announces a non-interactive variant as a **disabled button** on
native (`:55-59`: `accessibilityRole="button"` unconditional with
`disabled={!onPress}`), signals `selected` by border colour alone, and its
native docblock describes a "leading accent bar" that does not exist.

### 3.5 The filter chip is unreadable on native

`TagFilterBar.tsx:50-51` (native):

```ts
const toneColor = tone === 'neutral' ? colors.muted : colors[tone];
const onTone = tone === 'primary' ? colors.onPrimary
             : tone === 'accent'  ? colors.onAccent
             : colors.onSurface;
```

For `success`, `warn`, `danger` and `neutral` that is **body ink on a saturated
brand fill**, with no contrast promise. `neutral` is worse: it fills the chip
with `colors.muted`, a *text* token. The web twin gets it right
(`internal.ts:44-58` pairs `bg-success` with `text-on-success`) — same prop,
correct on one platform, unreadable on the other.

### 3.6 Making the timeline interactive destroys its list

`ContactTimeline.tsx:82-88` — the item sets `role="listitem"` and then spreads
`{...interactive}`, which carries `role: 'button'`. A JSX spread after an
explicit prop wins, so the moment `onItemClick` is supplied every child's role
becomes `button` and the `role="list"` at `:73` has zero list items. Readers
announce an empty list. Without `onItemClick` the roles are correct — the bug
appears only on the interactive path.

Native exposes no list semantics at all.

### 3.7 The forecast never shows the target

`DealForecast` documents `targetCents` as "shown as a labelled reference"
(`:21-22`). It is used only to compute a percentage; the figure is never
printed and no reference line reaches the chart. A caller supplies a quota and
sees a percentage and the words "vs target" — never the quota.

The attainment is also unclamped, so a reversed period renders a negative
percent, and crossing quota is signalled by **colour alone** (`:56` /
`native:70`) with nothing in the label.

### 3.8 `WinLossBadge` — a dead prop, and two different pills

`size` is destructured on web (`:28`) and read only in the `inline` branch; the
default `badge` branch never forwards it, though `Badge` accepts it. Native
does forward it. So `DealCard` passing `size="sm"` gets an `sm` badge on native
and an `md` badge on web.

Worse, web takes `Badge`'s `solid` default and native passes `variant="soft"`:
a won deal is a saturated green pill on one platform and a grey chip with green
text on the other — the module's most repeated element, drawn two ways. Five
components have this drift.

### 3.9 The rest, in one list

- **`PipelineBoard`** — the stage chip is hand-rolled on native with
  `backgroundColor: colors.muted` (a text token) and `color: colors.surface`
  (not an `on*` pair). Move buttons are ~28px with `hitSlop`, have no press
  feedback, and disable at an invented `0.4`. Stage columns carry no grouping
  semantics on native, so a reader never learns which stage a deal is in.
- **`NextStepRow`** — the checkbox is 22px on web, the primary action of the
  row. With no `onToggle` it renders as a normal, apparently-tappable checkbox
  that silently does nothing. Block elements (`<p>`, `<div>`) inside a
  `<button>`. `success` used as the fill for a *selection* control.
- **`ActivityLogRow`** — `pending` is `opacity: 0.6` and nothing else: invisible
  to a reader, and indistinguishable from disabled to everyone else.
- **`EmailThreadRow`** — the docblock says "unread → bold subject"; the code
  bolds the **sender**. The unread wash is `bg-primary-50` on web and
  `withAlpha(primary, .06)` on native.
- **`DealCard`** — `compact` drops content on web but never densifies, because
  `padding` is passed on native only. The probability meter is a `progressbar`
  with no name.
- **`QuoteCard`** — the status label sits on a `View` that is not an
  accessibility element, so on native it is never announced.

---

## 4. What the V4 line adds

Two new shared vocabularies, one per module, each with a twin:

- `content/internal/reading-v4` — `MEDIA_GROUND_CLASS` / `mediaGround()`,
  `readingPercent()`, `spokenLine()`.
- `crm/internal/crm-v4` — `toneInkClass()` / `toneInkOf()`, `toneOnOf()`,
  `BADGE_V4`, `ACTIVITY_META_V4`, `attainment()`, `TABULAR`, `spokenLine()`.

Both delegate their tone table to `primitives/internal/tone-v4`, promoted out
of `agriculture` in 0.15.0 and now shared by seven modules.

And the rules the earlier passes set, applied here:

1. Every interactive element is a real button and clears 44.
2. Press and hover are the M3 state layer. Disabled is 0.38, not a guess.
3. A fill token never inks text; an `on*` ink is only drawn on its own pair.
4. A status colour means status. A category, a kind, a stage and a source are
   identity — the glyph carries them.
5. A multi-part row is **one** accessible name, joined with commas.
6. Nothing is carried by colour alone.
7. Money and stacked figures are tabular.
8. Empty is a real empty state; loading is skeleton rows in the shape it is
   about to be.
9. Every visible English string is a prop with today's string as its default.
