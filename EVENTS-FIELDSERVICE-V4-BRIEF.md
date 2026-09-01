# `events` + `fieldservice` — the V4 pass

Twenty-four components across two modules, both twins. Written after a full
read of all 48 base files by two independent audits.

Companion to the five earlier briefs. The rules those set — no base file is
edited, every V4 prop is optional and additive, the twins keep prop parity —
hold unchanged.

---

## 1. Two findings that are not about styling

### 1.1 A stray tap turns a safety block into "All clear"

`fieldservice/SafetyChecklist.tsx:49-51`, native `:48-50`:

```ts
return current === 'pass' ? 'fail' : current === 'fail' ? 'unchecked' : 'pass';
```

A technician is on a site with a failed fall-protection anchor. The screen
shows a red **"Hazard — do not proceed"** banner. The failing row is a 40px
target, tapped one-handed, outdoors, in gloves.

One tap moves `fail → unchecked`. That drops the item out of `hazardCount`
(`:67`), **unmounts the danger banner** (`:106-112`), and flips the header from
"1 failing" to "✓ All clear" (`:101-103`). No confirmation, no undo, no
announcement — the row's accessible name (`:122`) does not even say what
pressing will do.

From `unchecked` the next single tap records a **Pass**. So the cheapest
gesture on the surface is the one that certifies an unverified safety
checkpoint as safe, and recording the truthful Fail costs two taps.

And the component hands the caller no way to guard any of it:
`SafetyChecklistProps` (`:33-46`) exposes only `onToggle`, so a host app cannot
require a confirmation, cannot make the transition undoable, and cannot tell a
deliberate clearance from a glove brushing the screen.

**The fix.** `fieldservice/verdict-v4.ts` — pure, shared by both twins — keeps
the cycle exactly as it was, because passing is the ordinary case and making it
cost two taps would be a worse component rather than a safer one. What changes
is `clearsHazard()`: the one transition that takes a blocking hazard off the
screen now needs a confirming second press, and says so.

### 1.2 The keyboard cannot use a control nested in a card

`events/SessionCard.tsx:62-68` and `events/VenueCard.tsx:44-50`. Both cards
take a card-level handler *and* hold a control inside — the bookmark star
(`SessionCard.tsx:100-111`) and the Directions link (`VenueCard.tsx:93-103`).
Both defend the **click** path with `e.stopPropagation()` and leave the **key**
path open.

The card's `onKeyDown` receives the keydown bubbling out of the inner button
and runs:

```ts
e.preventDefault();
(e.currentTarget as HTMLDivElement).click();
```

Enter's default action on a `<button>` is the click it now never dispatches;
Space's click fires on keyup, which is cancelled too. So a keyboard user tabs
to the bookmark, presses Enter, and the session is **not** bookmarked — the app
navigates to the session detail instead. Press Enter on "Directions" and you do
not get directions, you open the venue.

The native twins fail differently and just as completely: the outer `Pressable`
is `accessible` by default with `accessibilityLabel={title}`
(`native/events/SessionCard.tsx:150`, `VenueCard.tsx:138`), so VoiceOver
flattens the card to one leaf and neither control is reachable at all.

Every path that is not a sighted mouse tap is broken, on both platforms, in the
two components where nesting a control inside a card is the entire point.

This is the fourth time this pass has found this shape. `PodcastRow`,
`ContactCard` and `WalletCard` were the first three.

---

## 2. What the sweep measured

Across the 24 components:

| | events | fieldservice |
|---|--:|--:|
| container name replaces the subtree | **9 of 12** | **8 of 12** |
| press drawn as raw `opacity` | 8 | 10 |
| web `div role="button"` + hand-written key handler | 5 | 6 |
| neutral-ramp indexing / border-as-fill | 24 sites | — |
| interactive elements under 44 | 5 | **all of them** |
| hard-coded English strings | ~55 | ~150 |

Two module-wide numbers stand out.

**`fieldservice` has not one interactive element that reaches 44.** Checkboxes
are 16px on web and 20px on native with no `hitSlop`; every `size="sm"` button
is ~32px web / ~34px native; the safety rows are 40px. A grep for
`minHeight|min-h-` across all 24 events base files returns **nothing**.

**Both modules' status pills disagree across the twins at every call site.**
Web never passes `variant`/`size` and takes `Badge`'s `solid`/`md`; native
always passes `soft`, usually `sm`. That is 16 call sites in `fieldservice`
alone — the same screen is a wall of saturated pills on the web and soft tints
on the phone.

---

## 3. `events` — the rest

- **The native skeletons are near-white slabs in dark mode.** Eight components
  reach for `tokens.ramps.neutral[100|200]`, and `toNativeTokens` copies
  `theme.ramps` without inverting — the native theme's own comment says the
  ramps "carry the light orientation in both schemes".
- **A marked day on the 1st of a month silently loses its dot.**
  `CalendarStrip` puts the month label and the has-events marker in the same
  slot as an either/or, and `showMonth` is true on the 1st and on the first
  pill. The mark is never announced either way.
- **The weekday and month names are inline English arrays** in
  `events/format.ts`, duplicated in both twins — the strip is English-only and
  always Sunday-first.
- **`CountdownBadge` announces "Started" when given nothing at all.** With
  neither `remainingMs` nor `target` it falls through to `ms = 0`, and
  `countdownParts(0)` reports elapsed. It also announces "1 days 1 hours 1
  minutes", on a role-less element where the label is ignored anyway.
- **An RSVP answer is painted in status colours** — `going → success`,
  `maybe → warn`, `declined → danger`. Saying you cannot come is not an error.
- **`TicketTypeRow` sells negative inventory.** `remaining === 0` is a strict
  test, so `remaining: -3` is neither sold out nor low stock: the row renders
  normal, enabled, and `onSelect` fires. `SessionCard` has the mirror — it
  clamps the meter and then prints "−5 / 100 seats taken".
- **`ScheduleRow` does not render the range its own prop doc promises** —
  `endTime` stacks two bare times with no separator, so "10:30" over "11:15"
  reads as two start times. Its `track` rail is `primary` for every track, so
  the colour carries no identity, and the no-track case paints a fill with the
  `border` token.
- **The `TicketStub` barcode is invisible in native dark mode** — an
  `on-surface` ink on a light-ramp band, where both are near-white. The web
  twin inverts correctly, so the two do not even fail the same way.
- **`SessionCard`'s bookmarked star is `primary` on web and `accent` on
  native** — and this one the web side cannot simply match, because
  `IconColor` has no `accent` member at all.
- The seat meter is drawn and never exposed as a `progressbar`; the loading
  regions carry names on role-less elements, so nothing announces.

## 4. `fieldservice` — the rest

- **`ServiceChecklist` turns green before the checklist is complete.** It
  compares a **rounded** percentage against 100, and `clampPct` rounds — so
  199 of 200 becomes 100 and the bar reports complete with an item
  outstanding.
- **`DispatchBar` renders a live "Complete" button that does nothing.**
  `canAdvance` never consults `onAdvance`, so `<DispatchBar stage="on-site" />`
  ships an enabled primary action that is a no-op. Advancing is also
  irreversible and unconfirmable, and the bar pays no safe-area inset — on a
  home-indicator phone that button sits under the indicator.
- **`SignaturePad`'s Clear destroys the signature** with no confirmation, no
  undo and no prop to ask for either — the legally meaningful artefact of the
  visit, one press away. It is a filled `danger` button on web and a `ghost`
  text button on native: the riskiest control in the module is loud on one
  platform and quiet on the other.
- **`JobSiteCard` has §1.2's keyboard bug too** — Enter on "Directions" opens
  the site card instead, and on native the Directions button is unreachable.
- **`TechnicianCard` accepts a `phone` and never renders it.** It is used only
  as a boolean gate, so a caller who wires `onCall` without a formatted number
  silently gets no button. Its presence dot is a hand-rolled second palette
  that contradicts `Avatar`'s own — `busy` is **red** on native and **blue** on
  web for the same technician.
- **Four components ship an enabled, fully controlled control with an optional
  handler** — a checkbox that can be clicked forever and never changes.
- **The shared tint helper diverges module-wide.** Web's `DISC_TINT` fixes
  every slot at 10% and drops `muted` to an opaque ramp step inside a map its
  own doc calls translucent; native's `withAlpha` leaves the alpha to each call
  site, and 0.10, 0.12 and 0.14 all appear. One helper, twelve components, four
  strengths.
- Requiredness is a coloured asterisk alone; the progress bar has no accessible
  name; `TimeLogRow` prints a literal `$` beside a `currency`-formatted total
  and destructures a prop named `window` inside a browser component.

---

## 5. What the V4 line adds

Two **pure, shared** modules, each imported by both twins:

- `fieldservice/verdict-v4.ts` — `nextVerdict`, `clearsHazard`, `hazardCount`,
  `isComplete`. §1.1 and the rounded-percentage bug.
- `events/schedule-v4.ts` — `weekdayName`/`monthName`/`dayNumber` through
  `Intl`, `countdownParts` with a `known` flag, `countdownSentence` with
  pluralisation, `seatParts` and `remainingParts`. §3's date, countdown and
  inventory bugs.

And two per-twin vocabularies — `events/internal/event-v4`,
`fieldservice/internal/job-v4` — each giving its module one badge shape, one
disc tint, one placeholder ground, one comma-joined spoken line, and a tone
table where an RSVP answer, an agenda state and a job priority stop wearing
status colours.

The nine standing rules apply unchanged; §1.2's shape gets a tenth, now that it
has appeared four times:

> **A control inside a card is a sibling of the card's activation, never a
> descendant of it.** Guarding the click path is not enough — the keydown
> bubbles, and on native the outer accessible element swallows the inner
> control whole.
