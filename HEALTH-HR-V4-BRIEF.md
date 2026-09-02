# `health` + `hr` — the V4 lines (0.22.0)

Two modules, 26 components, both twins, plus 4 new components the gap analysis
asked for. The house rules are unchanged; what follows is what these two
modules specifically got wrong and what V4 does instead.

Shared vocabularies, one file each, imported by both twins so the maths cannot
drift: `src/health/goal-v4.ts` and `src/hr/workforce-v4.ts`.

---

## §1 `health` — the module kept one number where it needed three

The headline defect is arithmetic, not decoration. The module **clamped the
measurement** where it should have clamped only **what it drew**, and the three
readings of a single walk then disagreed with each other:

```
<GoalCard value={12400} target={10000} onPress={fn} />
  the card shows            12400
  the button announces      "12400 of 10000, 100%"
  the meter reports         aria-valuenow={10000}
```

`<WaterTracker count={10} goal={8} mlPerGlass={250} />` displayed "8 / 8 ·
2000 ml" and announced "goal reached" for someone who logged 10 glasses and
2500 ml — the overshoot, the one interesting fact, was destroyed rather than
merely not drawn.

A goal of `0` was read as *nought per cent* rather than as *no goal*, so
`<SleepBar hours={7.5} goal={0} />` drew an **empty bar for a night that was
fully slept**, and a ring with `goal: 0` announced "Move 0%" over 540 burned
calories.

Native `MiniBar` rescales any `max` below 1 to 1, so a half-hour meditation
against a half-hour target drew a **half-full** bar directly under the words
"Goal met" — while the web twin, computing a percentage width, filled it.

`goalParts()` fixes the class: `value` is never touched, `ratio` is clamped
**for drawing only**, `over` carries the overshoot, and `hasGoal: false` is a
distinct state from nought. Meters are handed `ratio` against 1, so there is
one opinion instead of two.

**Accessibility.** Every labelled meter in the module sat *inside* the card's
`role="button"` / `Pressable`, which prunes its subtree — so the "82%" that was
carefully drawn was announced to nobody. All 13 native components set
`accessibilityLabel` on a plain `View`, which is not an accessibility element on
iOS, so the whole computed name was dead. On web the same names sat on bare
`<div>`s, which ARIA forbids naming. `SleepBar`, `WaterTracker`, `MetricRing`
and `ActivityRings` drew progress with **no value exposed at all**, because
`ProgressRing` and `MiniBar` hard-code `accessibilityRole="image"`.

**Colour.** `internal.ts`'s `TEXT_CLASS` inked every status and brand word with
the **fill** token — `text-success` is `var(--xen-success)`, measured as low as
1.32:1 as text — while the native twin drew the same value through the
contrast-corrected ink. Same component, two colours, one failing AA. Identity
was also spending the status vocabulary: `cardio: 'danger'`, `running: 'warn'`,
`walking: 'success'`, `carbs: 'warn'`, and `heart-rate` pinned permanently to
`danger`, so a completed walk read as "succeeded" beside a HIIT session that
read as "a problem", and a genuinely dangerous 190 bpm drew in the same red as
a resting 58.

**`MoodPicker` could not select "Okay".** Its colour was `muted`, which *is* the
unselected treatment — ring, label and fill all unchanged — so with
`showLabels={false}` nothing distinguished it at all. It was also a radiogroup
in name only: five tab stops, no arrow keys, no group name, and native
announcing `selected` where a radio needs `checked`.

---

## §2 `hr` — a queue of decisions, none of them reachable from the keyboard

Fifteen instances of the sibling rule, in a module whose entire purpose is
approving things:

```
Tab to "Approve" on a pending leave request, press Enter
  → the card's onKeyDown catches the bubbled event
  → preventDefault() cancels the button's own activation
  → the card's onClick fires
  → the manager navigates away, the request is still pending,
    and nothing says so
```

The same shape in `ExpenseClaim` (Approve/Reject), `DirectoryRow` (message),
`OrgChartNode` (the expand disclosure — so the tree cannot be opened without a
mouse at all), `BenefitsEnrollment` (Enroll, before a deadline), `EmployeeCard`
(contact actions), and on native `OnboardingTask`'s checkbox, where the web
twin already had it right.

**Six components carry an adverse status with no field to say why.**
`ExpenseClaim` `rejected`, `TimesheetRow` `rejected`, `LeaveRequest` `denied`
(which re-displayed the *requester's* own note), `PolicyAcknowledge` `overdue`
(with no due date — only the date the policy took effect), `OnboardingTask`
`blocked`, `PayslipRow` `failed`. `isAdverse()` now names that set, and each of
those components takes a reason.

**`PayslipRow` hard-coded the word "Paid".** A failed payment rendered
**"Paid 15 Aug"** directly above a "✕ Failed" pill. The status was also missing
from the row's accessible name, so a screen-reader user was told the money
arrived when it had not.

**Arithmetic.** `rating={4.5}` drew **five** filled stars — a perfect score —
beside the text "4.5/5", because the meter rounded and the numeral did not.
`ratingMax={NaN}` walked through `Math.max(1, Math.floor(NaN))` unchanged and
rendered the literal string "NaN/NaN". `hours={2} overtimeHours={10}` rendered
both as true, though overtime is documented as *included in* the total.
`deductionsCents={-5000}` — how most payroll APIs sign a refund — printed
**"−-$50.00"**. `{status:'confirmed', assignee: undefined}` drew an open-shift
tint, the words "Unassigned", and a "✓ Confirmed" pill at once.

**Colour.** The module's tone table inked text with fill slots on web, and
native's `toneColor()` returned the raw fill and assigned it straight to
`color:`. Four identity tables spent the status vocabulary — leave **types**
(`sick: danger`, `parental: success`), employment **arrangement**
(`contractor: warn`), expense **categories** (`software: success`), benefit
**types** — so every legitimate sick day was painted in the error colour and
every contractor was drawn as a warning. In V4 those tables carry a glyph and a
label and have **no `tone` field to misuse**.

---

## §3 New in `health`

- **`HealthRangeBarV4`** — a reading plotted against its normal band: the band
  as a region, the reading as a marker, the verdict as a **word**. Nothing in
  the module could previously say a value was out of range, so a fasting
  glucose of 260 mg/dL rendered identically to 95 — the one thing a health
  screen exists to surface could not be passed in.
- **`SleepStagesV4`** — deep / REM / light / awake at true share of the night,
  drawn in identity fills only, with one spoken sentence. `SleepBar` collapsed
  a whole night to one number and one quality word.

## §4 New in `hr`

- **`LeaveBalanceV4`** — accrued + carryover as the entitlement, taken metered
  against it, remaining floored at 0 with any overage stated as a word.
  `LeaveRequest` asked for `days` with no entitlement context anywhere in the
  module.
- **`ApprovalQueueV4`** — the list shell `LeaveRequest`, `ExpenseClaim` and
  `TimesheetRow` all presuppose: a real empty state with a next-step sentence,
  skeleton rows in the shape they become (including the button row, so nothing
  jumps), and a bulk approve/reject bar that is a **sibling** of the rows.
  `ShiftSchedule` was previously the only list in the module and the only file
  with any empty state.

---

## §5 Twin parity

The two halves of each module were built in parallel from a shared prop table,
then checked mechanically: the full prop surface of every `XV4Props` — resolved
through its `extends` chain — diffed web against native, with `onPress`/`onClick`
and `style`/`className` normalised as the only permitted splits. Eleven
components had genuinely drifted and were reconciled; the three new components
written without an agreed table had drifted worst, `ApprovalQueue` selecting by
**ids** on one side and by **count** on the other.
