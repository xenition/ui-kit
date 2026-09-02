# `insurance` + `jobs` + `kids` — the V4 lines (0.23.0)

Three modules, 36 components, both twins, plus 6 new components the gap
analyses asked for. 87 defects found across the three audits. The house rules
are unchanged; what follows is what these modules specifically got wrong.

Shared vocabularies, one file each, imported by both twins:
`src/insurance/coverage-v4.ts`, `src/jobs/hiring-v4.ts`,
`src/kids/family-v4.ts`.

---

## §1 `insurance` — the component invents a reason it was never given

`ClaimStatusTracker` hard-codes

> *"Reviewed after filing. Contact your agent to appeal."*

as the body of its denial banner, and its props carry only `status` and
`updated`. A claim denied because the damage predates policy inception renders
that same sentence. **The screen asserts a reason the caller never supplied and
cannot correct** — which, in a regulated domain, is the most serious class of
defect this programme has found. `PolicyCard`'s `lapsed` and `cancelled` are
the same shape: no reason, no date, no next step, and a still-live coverage
figure underneath.

Second: **`aria-label` on `role="button"` deletes the money.** ARIA replaces an
element's contents with its name, and `ClaimRow`, `PolicyCard`,
`PolicyDocumentRow` and `BeneficiaryRow` all name the row and then render the
settled amount, coverage, premium and dates *inside* it. Every row announces a
status and no amount.

The arithmetic disagreed with itself throughout. `DeductibleBar` announced
`33.33333333333333` beside a caption reading 33%; a ceiling of `0` set
`ratio = 1` and drew a full green bar reading "Deductible met" for a policy
with no deductible recorded; money applied beyond the ceiling was hidden
entirely. `RiskScore` let an explicit `tier` override the number, so
`score={95} tier="low"` rendered "95 / 100" beside a green "Low risk" pill —
and its 0–100 range and 33/66 cutoffs were hard-coded, so an insurer whose
model runs 300–850 could not use the component at all. `PremiumSummary`'s TSDoc
promised the total "always reconciles with the lines shown" and then let
`totalCents` win in silence. `BeneficiaryRow` clamped each row independently
with no notion of the set, so three rows at 50% rendered three confident
figures totalling 150%.

`QuoteForm`'s `toCents` stripped input to digits-and-dots and `parseFloat`ed
it, so a user in a comma-decimal locale typing `1000,50` requested
**$100,050** of coverage — and submitted without a validation message.

**On `internal/tint.ts`:** the standing suspicion that it duplicates
`government`'s defective tone table is confirmed, with the direction reversed —
**insurance is the origin, `government` the copy**, byte-identical bar one doc
line. It is web-only, has no native counterpart, and has exactly one consumer
(`ClaimRow`). V4 neither edits nor imports it.

## §2 `jobs` — nothing is announced, for a precise reason

The web twin uses **`role="text"`**. That is not an ARIA role — it is a
WebKit-only extension, so Chrome and Firefox drop the element's role and take
its `aria-label` with it. The remaining names sit on bare `<div>`s, which ARIA
forbids naming. On native the `accessible` prop appears **nowhere in the entire
directory**, so every `accessibilityLabel` is attached to something that is not
an accessibility element.

The result: `<ApplicationRow application={{stage:'interview'}} />` announces the
job title, and the stage — the entire point of the row — is silent on both
platforms.

`SkillTag` emits a `<button>` nested **inside** a `<button>`: invalid HTML and
invalid ARIA. `ApplyButton` wires straight to `onApply` with no double-submit
guard, and sets `disabled={disabled || loading}` — a disabled button is
unfocusable, so pressing Apply drops keyboard focus to `<body>` and the
`aria-busy` beside it is never read. `formatSalary` validated nothing:
`{min:120000, max:90000}` printed a band that runs backwards.

`format.ts` and `types.ts` are duplicated verbatim in both twins. The **bodies**
have not drifted — only the doc comments differ — but the **consumers already
have**: an unrecognised application stage falls back to the label `'Applied'`
on web and to the raw union member `'applied'` on native, so one input
announces two different things.

## §3 `kids` — a child's conduct drawn in the error colour

`BehaviorBadge` maps `negative → danger`, and the web `Badge` default is
`solid`, so a saturated red chip with a 👎 and "(−2)" lands against a
six-year-old's name. `danger` means *something has gone wrong with the system*.
V4 draws all three behaviour tones as a neutral chip with a glyph and a word —
symmetrically, because if `holiday → success` is wrong then praise-as-green is
wrong for the same reason.

The module also repeats the `health` defect exactly: **it clamps the
measurement rather than the drawing.** `<ScreenTimeBar used={-30} limit={120}/>`
renders "0 min / 2h — 2h left" as though the data were sound, laundering a
broken sync into a plausible reading; `used={NaN}` reaches the screen as
"NaNh NaNm" and a CSS width of `"NaN%"`; `used={180} limit={120}` announces
`valuenow=180` against `valuemax=120`; and `limit={0}` **throws the reading
away entirely**, telling a parent "No screen-time limit set" rather than that
their child had been on the device for four hours.

The single worst bug in the pass: `RewardStarV2` computes
`filled >= total ? 1 : filled + 1`, so a parent at five of five stars who taps
once more **silently drops the child to one star**, with no undo and no
confirmation. `nextAward()` makes the gesture a no-op at the maximum.

`GrowthChart` plots `number[]` on the array index, so measurements at 2 months,
4 months and 3 years render evenly spaced and unsorted input draws a
*descending* curve for a growing child. V4 takes dated `points`, sorts them,
and lays them out in real elapsed time. `StickerReward`'s `columns={4}`
rendered **three**, because four 25% cells plus three gaps overflow the line.

---

## §4 New in `insurance`

- **`InsuranceIdCardV4`** — proof of insurance. `PolicyDocumentRow`'s
  `'id-card'` kind already pointed at a document with no component, and it is
  the most-opened screen in an auto app.
- **`ClaimTimelineV4`** — dated claim activity with actors and amounts. This is
  where a denial reason actually belongs.

## §5 New in `jobs`

- **`JobListV4`** — there was no list container in the module at all, so
  nothing owned the empty state, the skeleton set or the result count.
- **`OfferCardV4`** — `ApplicationStage` ends at `'offer' | 'hired'` and
  nothing rendered an offer. The decision screen of the whole funnel had no
  component.

## §6 New in `kids`

- **`ChoreListV4`** — a chore screen with zero chores rendered nothing at all.
- **`ChildSwitcherV4`** — every component takes one child, and a family app's
  first control is picking which child you are looking at.

---

## §7 Twin parity

Both halves of each module were built in parallel from a shared prop table and
reconciled **during** the build rather than after it: each pair traded its
out-of-table props and its unadjudicated decisions while both still had the
context loaded. `jobs` converged `OfferCardV4` without intervention, because
the native half published first and the web half read it instead of inventing a
second API.

Two mechanical checks then ran over all 42 twinned components:

- **prop-surface parity**, resolving each `XV4Props` through its `extends`
  chain and normalising the two permitted splits — **0 drift**, against 30 of
  30 drifted on the previous pass.
- **default-value parity**, which the name check cannot see — this found 9 real
  divergences (`appliedLabel` `'Applied'` vs `'Applied ✓'`, `earnedLabel`
  `'Earned'` vs `'earned'`, and seven more), all converged. Where a base file
  already shipped a string, that string won: a V4 default must equal today's
  behaviour.
