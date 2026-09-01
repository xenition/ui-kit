# Onboarding — the V4 brief

**14 components, one module, two twins.** `onboarding` (web) and
`native/onboarding`, at prop parity when this pass is done.

Written 2026-08-31, from: the two production reference screens the product owner
supplied (a welcome-offer screen and a discounted-plan paywall), the house specs
(`ONBOARDING-DESIGN-SPEC.md` and its Addendum, `DESIGN-SYSTEM-REVIEW.md`,
`COMMERCE-MARKETPLACE-V4-BRIEF.md`), and a read of all 32 current source files on
each twin.

---

## 0. Why this pass exists

`COMPONENTS.md` marked the module **✅ 0.9.0** and every one of its 14 rows **⬜**
at the same time. Both were true and the header was the misleading one: 0.9.0
gave the module the *shell* — the header, the hero slot, the sticky footer, the
segmented bars — and that shell is why `ONBOARDING-DESIGN-SPEC.md` names this
module the reference for everyone else. What it never got is the **V4 line**
every other finished module now has: `CardV4`'s raised ground, the M3 state
layers, the motion scale, the safe-area handling, the `card`/`mutedText`/`ring`
tokens that did not exist when 0.9.0 was written.

So the shell is right and stays. This pass is about what a **shipping** funnel
needs on top of it, and the reference screens are unusually specific about that.

## 1. What the reference screens have that the module does not

Read the two screens as one flow; each line below is a real gap, not a restyle.

| in the reference | in the module today | fixed by |
|---|---|---|
| the page scrolls; the CTA never moves | `flex: 1` centring — a paywall with four feature rows and a plan card **clips**, and nothing scrolls | §3 |
| a reassurance line sits *above* the CTA — "🛡 No commitment · Cancel anytime" | nothing between content and CTA | §4 |
| "Restore Purchases" and a "Terms · Privacy" row under the CTA | no slot for either; every app hand-rolls them | §4 |
| the offer card shows `$29.99` struck through, `$23.99`, a `20% OFF` pill and `$0.07/day` | `PlanTier` carries one price per cadence and no compare-at, no per-day, no savings pill | §5 |
| the secondary link is underlined and reads as a link | `tone="muted"` text with no affordance | §4 |
| feature rows: a tinted circular badge, a hairline rail joining them | `PaywallFeatureRows` has the rail, but the badge is square and untinted | §6 |
| the CTA carries a trailing mark that is not always `→` | `trailingArrow` is a boolean | §7 |
| content settles in as the screen arrives | no motion anywhere in the module | §8 |
| the CTA clears the home indicator | only `AuthStickyFooterV4` reads an inset — no onboarding screen uses it | §3 |

## 2. Rules that do not bend

1. **No literal colours, spacings, radii or font sizes.** Everything from
   `useXenitionTheme()` / the `--xen-*` custom properties. The only bare numbers
   are geometric — flex factors, aspect ratios, `1` for a hairline — plus the
   named constants in `internal/flow-v4`, which are **imported, never retyped**.
2. **A V4 is a new `*V4.tsx` beside its base.** The base file is not edited. The
   one shared type that gains fields (`PlanTier`) gains **optional** ones only.
3. **Compose the V4 primitives, never the base ones.** `TextV4`, `ButtonV4`,
   `CardV4`, `IconV4`, `BadgeV4`, `InputV4`, `CheckboxV4`, `PinInputV4`,
   `AuthStickyFooterV4`, `AuthFieldV4`, `AuthProviderButtonV4`. §10.5 of the
   design spec: do not hand-roll what a primitive already draws.
4. **Web and native twins keep prop parity** — same props, same names, same
   defaults. The two permitted splits are the ones the base line already makes:
   navigation (`onPress` / `href`) and `style` / `className`.
5. **Every screen survives its empty state**: no illustration, no subtitle, no
   providers, one step, zero features, zero plans. §4.5 — a component with
   nothing to show renders nothing, never a blank bordered box.
6. **Status colour is reserved.** `success` means good, `danger` means bad. A
   savings pill is `success` because saving money *is* the good outcome; a
   discounted price is **not** painted `danger` (§35.4).
7. **Contrast tokens, not fill tokens, for text.** `primaryText`,
   `successText`, `mutedText` — never `primary`/`success`/`muted` as ink.

## 3. The scroll/pin split — the structural fix

Every full-screen V4 is three regions, in this order, and the middle one is the
only one that moves:

```
 header      fixed          back · bars · dismiss
 body        SCROLLS        hero · headline · content
 footer      fixed          reassurance · CTA · secondary · restore · legal
```

Native: a `ScrollView` with `contentContainerStyle={{ flexGrow: 1 }}` so a short
screen still centres and a long one still scrolls, plus
`keyboardShouldPersistTaps="handled"` on any screen with a field. Web: a flex
column with `min-h-0 overflow-y-auto` on the body.

The footer is `AuthStickyFooterV4`, which already pays `insets.bottom`. No
onboarding screen may draw its own bottom band any more — that is how the inset
got skipped in the first place.

## 4. The footer stack

Top to bottom, every part optional, drawn by `FlowFooterV4`
(`internal/flow-v4`) so the order cannot drift between screens:

1. **reassurance** — one line, centred, an icon plus short text. Default glyph
   is `success` tinted `successText`, because it is monochrome and therefore
   actually takes the tint (the emoji names do not).
2. **the CTA** — `GetStartedButtonV4`, full width, `radius.full`.
3. **secondary** — a centred, **underlined** text link. Underlined because §31
   asks for familiar interactions and an un-underlined centred label under a
   button reads as a caption, not a choice.
4. **restore** — a tertiary link at `sm`/`mutedText`. Its own slot rather than a
   second secondary, because store policy requires it on a paywall and a
   required control should not compete with a declined one.
5. **legal** — an inline row of links separated by a `·`, `xs`, `mutedText`.

## 5. The offer card

`PlanTier` gains four optional fields — `compareAtMonthlyPrice`,
`compareAtAnnualPrice`, `savingsLabel`, `perUnitPrice` — and `PlanSelectorV4`
gains a third layout, `'offer'`: **one** plan, laid out as the reference lays it
out. Name on the left with the savings pill beside it, the struck compare-at
price on the right, the price at display size on the second row, the per-unit
caption right-aligned against it.

`'offer'` renders the selected plan, or the first, and ignores the rest — an
offer screen showing three offers is not an offer. `cards` and `list` keep
working exactly as they do today.

## 6. Feature rows

`PaywallFeatureRowsV4`: a 44 circular badge on a `primary[50]`-equivalent tint
with the glyph in `primaryText`; title `base`/`semibold`; description
`sm`/`mutedText`; a 1px `border` rail joining the badges when there are three or
more rows. `numbered` swaps the glyph for its 1-based index, which is what turns
the same component into a "how it works" list.

## 7. Variety — how two apps built on this line stop looking alike

The design-line rule (§11) stands: **V2/V3 are separate exports with identical
props**, and this pass fills the five components that never got them
(`FeatureLockCard`, `GetStartedButton`, `PaywallFeatureRows`, `ProgressDots`,
`TrialBanner`) so every row in the module has a full set.

On top of that, the V4 line takes **two configuration props**, and they are
config, not a design line — they change the ground and the accent an app paints
on, not the anatomy:

- **`ground?: 'plain' | 'tinted' | 'brand'`** — `plain` is `surface` (today's
  rendering, and the default, so nothing existing moves). `tinted` is the warm
  wash the reference screens use, a compiled ramp step, not a gradient.
  `brand` inverts the hero region onto `primary`.
- **`accent?: 'primary' | 'accent'`** — which of the two brand slots the hero
  tint, the badges and the bars answer in. Two apps on the same seed can ship a
  visibly different funnel without either forking a component.

Both are optional, both default to today's rendering, and neither is allowed to
grow a third axis.

## 8. Motion

One entrance, on the M3 scale via `V4_MOTION`: the body fades up over
`V4_MOTION.enter` with `easingEnter`, at `FLOW_STAGGER` per region, capped at
three regions. `useReducedMotion()` collapses it to no animation — not to a
faster one. Nothing loops, nothing bounces, nothing moves on scroll.

## 9. Done means

- `npx tsc --noEmit` clean, `npx jest` green.
- Every V4 has a spec covering its new props **and** its empty state.
- Native and web twins at prop parity, asserted by the module's existing
  `design-variants` specs.
- `COMPONENTS.md`'s onboarding table reads 14/14 ✅ **and** the module header
  agrees with the table.
