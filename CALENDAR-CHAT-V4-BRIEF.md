# `calendar` · `chat` — the V4 brief

**25 components, two modules, two twins.** `calendar` (12) and `chat` (13),
both on ❌ **0.7.0**.

Written 2026-08-31 from a read of all 64 source files across the two twins,
against `VERTICALS-V4-BRIEF.md` and `AUTOMOTIVE-BEAUTY-V4-BRIEF.md` (whose
defect sets recur here), `ONBOARDING-DESIGN-SPEC.md` + Addendum, and
`DESIGN-SYSTEM-REVIEW.md`.

These two are the most *interactive* modules touched so far — a time grid and
a message list are both layout engines, not card sets — so the findings are
correspondingly less cosmetic.

---

## 1. The five that carried over

Measured, not assumed:

| defect | calendar | chat |
|---|---:|---:|
| raw `<Text>` with `fontSize: tokens.typography.scale.*` | 20 files | 19 files |
| `colors.muted` / `tone="muted"` used as **ink** | 19 files | 17 files |
| press drawn as `opacity` | 9 files | 5 files |
| a ramp step read directly as a fill | 6 files | 0 |
| a status enum resolved to a **fill** slot used as text | 3 | 3 |

Corrections as before: `TextV4`, the `*Text` slots, `stateMix`/`pressOver`,
and `tone-v4`'s `toneInk` / `onPair`.

## 2. `calendar` — what is actually broken

### 2.1 The time grid's overlap layout is wrong

`TimeGrid` computes, **per event**, the set of events overlapping *that* event
and uses `overlaps.length` as the column count and `indexOf` as the column:

```ts
const overlaps = timed.filter((o) => oStart < endMin && startMin < oEnd);
widthPct: 100 / Math.max(1, overlaps.length),
leftPct: (100 / overlaps.length) * col,
```

The source comment calls it "naive overlap grouping" and it is worse than
naive — it is **inconsistent**. Take A 9:00–10:00, B 9:30–10:30, C 10:00–11:00.
A overlaps {A,B} → width 50%. B overlaps {A,B,C} → width 33%. C overlaps {B,C}
→ width 50%. The three events are laid out on three different column grids, so
they visually collide and leave gaps in the same view.

The fix is the standard one and it is not hard: group events into **connected
overlap clusters**, then assign each cluster a single column count and pack
its members into columns greedily. `layout-v4.ts` does that, pure and shared
by both twins the way `booking/schedule-v4.ts` is.

### 2.2 Weekday and month names are hard-coded English

`WEEKDAYS_SHORT`, `WEEKDAYS_NARROW`, `MONTHS_SHORT`, `MONTHS_LONG` are frozen
English arrays, used by `MonthView`, `MiniCalendar`, `WeekView` and
`DateNavigator`. A calendar is the component a non-English product notices
first. `BookingCalendarV4` already derives its labels from
`Intl.DateTimeFormat` with a `locale` prop; these do the same.

### 2.3 Nothing marks "now" except a line

`TimeGrid` and `WeekView` draw a current-time rule and give it no accessible
name and no label. A screen-reader user gets no "now" at all.

### 2.4 `hourHeight`, `GUTTER` and the grid metrics are literals

`56`, `48`, `24` — and they do not scale with a seed that scales its spacing,
so on a compact theme the hour rules and the event blocks disagree.

## 3. `chat` — what is actually broken

### 3.1 A failed message is a red glyph and nothing else

`ReadReceipt` renders `status` as one glyph in one colour, marked
`accessibilityRole="image"`. Three problems in one component: **`failed` is
the only state a user must act on** and it is announced as passively as
`sent`; the role is wrong (it is a status, not an image); and colour is doing
the work.

V4 keeps the glyph, adds `role="status"` (assertive on `failed`), and takes an
`onRetry` so the failure is actionable rather than decorative.

### 3.2 The voice note reports no position

`VoiceNoteBubble` takes `progress` and paints the waveform with it, and
announces only `"Voice message, 0:42"`. A user cannot tell how far through
they are, and the play control is a glyph with `hitSlop={8}` — well under 44.
The unplayed bars are drawn at `opacity: 0.4`, which is the disabled band.

### 3.3 Presence is a coloured dot

`PresenceDot` is the whole signal in `ChatHeader` and `ConversationRow`. A
colour-blind user reads nothing; a screen reader reads nothing unless `label`
happens to be passed. The tone map also spends `success`/`warn`/`danger` on
online/away/busy, which is defensible for busy but not for "away".

### 3.4 The composer's send button is always live

`MessageComposer` renders a send control that fires with an empty value, and
its input has no `multiline` growth bound and no max height, so a long message
pushes the send button off screen.

### 3.5 `size?: number` as a public prop

`PresenceDot`, `ReadReceipt`, `TypingIndicator` and `VoiceNoteBubble` all take
a raw pixel `size`. That is the one prop shape the design system exists to
remove: it invites callers to pick numbers off the scale. V4 keeps them for
parity but adds a **named** scale (`'sm' | 'md' | 'lg'`) as the documented
path, and derives the pixel value from `spacing` when the named one is used.

## 4. Rules that do not bend

1. **No literal colours, spacings, radii or font sizes.** Bare numbers only
   where geometric, named, and reasoned.
2. **A V4 is a new `*V4.tsx` beside its base.** Base files are not edited.
3. **Compose the V4 primitives and the shared internals** — `TextV4`,
   `CardV4`, `BadgeV4`, `IconV4`, `AvatarV4`, `ProgressV4`, `InputV4`,
   `ButtonV4`, and `row-v4` / `tone-v4` / `state-v4`.
4. **Web and native twins keep prop parity.**
5. **Status colour is reserved.** A failed send and a busy presence mean
   something; an event's *category* tone does not.
6. **Every component survives its empty state** — no events, no messages, no
   attachments, an empty day, an empty conversation list.
7. **Copy is caller-supplied**, with today's string as the default.
8. **Motion respects `useReducedMotion` / `prefers-reduced-motion`** —
   `TypingIndicator` already does; the new entrances must too.

## 5. Done means

- `npx tsc --noEmit` clean, `npx jest` green.
- One grouped spec per module per twin, covering the new props, the empty
  states, and pinning §2.1 and §3.1 as regressions.
- `COMPONENTS.md` reads 12/12 and 13/13 ✅ with the defect tables.
