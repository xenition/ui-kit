# `gaming` + `government` — the V4 pass

Twenty-four components across two modules, both twins. Written after a full
read of all 48 base files by two independent audits.

Companion to the seven earlier briefs; their rules hold unchanged.

---

## 1. The two findings

### 1.1 A permit whose status appears nowhere at all

`government/PermitStatus.tsx`. The tracker conveys position **entirely by
colour**: the base `Steps` primitive emits no `aria-current`, no name and no
"step 2 of 4", and the *active* step and the *pending* steps both render a bare
digit, differing only by `border-primary text-primary` against
`border-border text-muted`. The native mirror has no `accessibilityState`
either.

The one place the human-readable status could still surface is `:80`, and it is
gated on **`updatedDate != null`** — an optional prop. So

```tsx
<PermitStatus status="review" title="Building permit — 12 Oak St" />
```

renders a card in which the words "Under review" appear **nowhere in the DOM**.

A blind applicant, or a sighted one with a red-green deficiency reading a
primary-outlined marker against a border-grey one, opens their permit and hears
the full happy path — "1 Submitted 2 Under review 3 Approved 4 Issued" — with
no indication which stage is theirs, no date, and an unlabelled case number.
They cannot tell approved from still-pending.

**And if it was refused, the denial is silent.** `:67` puts it in a
`role="alert"` that is present at first paint, and a live region only announces
*changes* made after it is in the tree. On native `accessibilityRole="alert"`
sets no announcement behaviour at all without `accessibilityLiveRegion`. The
`CivicAlert` docstring makes the same claim and is wrong the same way.

**The good news:** `StepsV4` already exists on both twins and already fixes
this — web emits `aria-current="step"`, native announces "Step 2 of 4,
current". `PermitStatusV4` composing the V4 primitive is most of the repair.

### 1.2 A matchmaking panel whose Accept button cannot be reached

`native/gaming/MatchmakingStatus.tsx:65`. The root `Card` is declared
`accessible accessibilityRole="summary" accessibilityLabel={…}` so the phase,
elapsed time and slot count read as one sentence — and `accessible` on a React
Native container **collapses everything beneath it into a single element.**
Beneath it are the component's only three controls: Accept, Retry and Cancel.

A VoiceOver user in a queue swipes to the panel, hears "Match found!, 10 / 10
players", and then cannot swipe to anything inside it. Accept is not a focus
stop, so it cannot be activated, and `onAccept` is wired to nothing else.

Nothing announces the phase change either — no live region on either twin — so
the user is not told the match was found. They must happen to be re-reading the
panel at the moment it flips, discover a control they cannot reach, and watch
the accept window expire.

The web twin fails the same moment from the opposite direction: its accessible
name is attached to a `Card` that renders a role-less `<div>`, and ARIA forbids
naming a generic element, so the combined status string is dropped and never
spoken at all.

---

## 2. Five components, five rejections, no reasons

`government` has a rejection state in five components — permit `denied`, form
`rejected` and `action-needed`, document `denied`, benefit `denied` and
`suspended`, appointment `no-show` — and **not one of the five prop interfaces
has a field for why**.

`PermitStatus` hard-codes the consolation sentence "Review the notice and
re-apply or appeal" and offers no way to say what the notice said. Only that
component has any live region at all, and it is the ineffective one.

The status that stops someone's food assistance is a pill.

---

## 3. What the sweep measured

| | gaming | government |
|---|--:|--:|
| container label prunes its own subtree | 10 web / 17 native | 5 |
| press drawn as raw `opacity` | 9 web / 8 native | 5, three values |
| `aria-label` on a role-less element (inert) | **6** | — |
| ramp indexing | 14 | 6 |
| `ring-primary` focus rings | — | 12 |
| every action under 44 | yes | yes, all 15 |
| hard-coded English | ~34 | ~120 |

Two module-wide drifts, both total: **every** `government` badge is a filled
pill on web and a soft tint on native (10 components), and **every** card is
`outlined` on web and `elevated`/`interactive` on native (9). In `gaming` the
same badge split holds across the whole module.

---

## 4. `gaming` — the rest

- **A full lobby is painted `danger`, and a zero-capacity lobby says "5/5"
  while Join stays enabled.** `clamp(players, 0, cap || players)` makes the
  denominator the player count when capacity is 0, so the badge reads full —
  but `isFull` requires `cap > 0`, so `joinable` is true. The badge and the
  button read the same zero and disagree.
- **`variant` is accepted and explicitly discarded in six variant
  components** — literally `void variant;` — while their prop types document
  `grid | list | featured`.
- **Two "toggles" that cannot toggle.** `InventoryItem`'s inspect button
  announces `aria-pressed={item.equipped}` and `TournamentBracket`'s match
  announces `aria-pressed={decided}`; activating either can never change the
  state it reports. The twins tell different lies — native says `selected`.
- **A locked achievement claims `aria-disabled` and still fires `onClick`.**
  Its own JSDoc says "a real `<button>`; disabled while locked". It is not.
- **The cover scrim inverts.** Web builds it from `from-neutral-900/75`, and
  the web ramp inverts while the artwork does not; native reads
  `tokens.ramps.neutral[900]`, which is **not** inverted for native, so it
  never darkens for dark mode. Opposite bugs, same line.
- **`LevelBar`'s `progressbar` is pruned by its own wrapper on native** — the
  `Progress` primitive does supply the value, and the container label
  swallows it. The JSDoc claims the fraction is announced; it is not.
- `ScoreBoard` renders standings as flex `div`s with no list or table context,
  scores with no unit and no tabular figures, and throws away every row's
  accessible name on web.
- The V2/V3 lines drop the status badge entirely, so `locked`/`claimed` survive
  only as `opacity-60` — inside M3's disabled band — and an `aria-hidden`
  padlock.

## 5. `government` — the rest

- **`internal/tint.ts` bakes the fill-as-ink defect into a shared table.**
  Every foreground it returns is a fill token used as ink, on grounds built
  from ramp steps. Its docblock says "Mirror of the insurance module's
  `internal/tint.ts`" — and the two files are byte-identical apart from that
  sentence, so **the same table is sitting in a module this pass does not
  touch.** There is no native counterpart to either.
- **Six identifiers render as bare strings** — permit, form, request, ticket,
  case and queue numbers — with no visible or accessible label. A reader hears
  "BLD-2026-0417" and cannot tell what it identifies.
- **Two deadlines styled as afterthoughts.** The tax due date is a muted 12px
  line, the same size as the "Paid" caption, with no `<time>` and nothing
  linking it to the `overdue` status. The voting card's election date is two
  sibling spans with no relationship at all.
- **Three irreversible actions one tap from a ~32px target** — "Check in"
  (forfeits a DMV slot), "Pay fee", "Pay now" — none confirmed, none disabled
  while pending.
- **`Space` on ServiceCard's "Start" starts nothing and navigates away.** The
  inner button guards the click path; the card's key handler catches the
  bubbled keydown, `preventDefault()`s the button's own activation and fires
  the card. Enter fires *both*. Sixth appearance of this shape.
- "New" on a public notice is `danger` — the same tone as Denied, Rejected and
  Urgent — so an unread roadwork notice reads visually as a rejection. An
  officeholder being in office is `success`, in a component careful enough to
  keep the party badge neutral.
- Native renders empty labelled blocks that web suppresses, in three
  components, because one guards on `!= null` and the other on `!== ''`.

---

## 6. What the V4 line adds

Two **pure, shared** modules:

- `gaming/progress-v4.ts` — `slotParts` (no capacity is an *unknown* room, not
  a full one) and `questParts` (the drawn bar and the announced value cannot
  disagree).
- `government/civic-v4.ts` — `statusSentence` (the status is not optional any
  more), `isAdverse` (which states must carry a reason and announce), and
  `labelledId`.

Plus `gaming/internal/arcade-v4` and `government/internal/civic-v4` per twin —
each giving its module one badge shape, one card variant, one tint with a
contrast-corrected ink, one placeholder ground, and a tone table where a genre,
a rarity, a podium place, a department and a document type stop wearing status
colours.

`ART_SCRIM` is deliberately **not** a token, for the reason `PHOTO_SCRIM` is
not: cover art does not follow the scheme, so neither does the scrim over it.
