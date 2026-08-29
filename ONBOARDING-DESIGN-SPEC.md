# Onboarding & auth — the design pattern

**Every agent working on `native/onboarding/` and the auth forms builds against this file.**
It describes ONE anatomy. The point is that a user moving from the sign-in screen to slide 1 to the
paywall never feels a seam.

Written 2026-08-25 from the reference screens the product owner supplied. The kit's current
onboarding was judged "very disappointing" against them, and the diagnosis is not that the
components are wrong — it is that they are **thin**: a medallion, a headline, a button, no
illustration, no rhythm, no footer. Everything below is about weight, hierarchy and space.

---

## What was wrong (from the shipped screens)

Look at these before you start; each maps to a rule below.

| symptom | rule that fixes it |
|---|---|
| numbered circles crammed at the top, labels tiny | §2 — **segmented bars**, not numbered circles |
| no image anywhere; screens are text on grey | §3 — every step gets a **hero slot** |
| inputs are bare 40px boxes | §6 — **56px, rounded, leading icon** |
| CTA is a short flat rectangle mid-page | §5 — **sticky footer, 56px, full width, trailing arrow** |
| chips run off the right edge, "Confiden…" clipped | §7 — chips **wrap**, never clip |
| everything left-aligned and tight to the top | §4 — centred headline block, generous rhythm |
| no visual difference between a question and a summary | §8 — **rows and cards** carry structure |

---

## 1. The shell — every onboarding screen

Top to bottom, always in this order:

```
┌──────────────────────────────────────────┐
│  ‹      ▬▬▬▬  ▬▬▬▬  ────            ✕    │  header: back · progress · dismiss
│                                          │
│            ╭────────────────╮            │
│            │   hero slot    │            │  §3
│            ╰────────────────╯            │
│                                          │
│           Headline, centred              │  §4
│        one supporting line, muted        │
│                                          │
│   ◍  Row title                           │  §8
│      row description                     │
│   ◍  Row title                           │
│                                          │
├──────────────────────────────────────────┤  hairline
│  ▓▓▓▓▓▓▓  Primary action        →  ▓▓▓▓  │  §5 sticky
└──────────────────────────────────────────┘
```

The page background is `colors.surface`. Do not invent a gradient: if a screen wants a warmer
ground, use `tokens.ramps.neutral[50]` or `primary[50]` — both are compiled, both are in the theme.

## 2. Progress — segmented bars

**Replace the numbered-circle stepper.** One bar per step, equal widths, `tokens.radius.full`,
`tokens.spacing.xs` gap. Complete and current read `colors.primary`; upcoming reads `colors.border`.
No numbers, no captions under them. The header row is `‹` (or a spacer) · bars · `✕`.

`ProgressDots` keeps its dot rendering — it is a different component for a different job (a slide
position indicator). Add the bar treatment as a **`variant`** on it: `'dots' | 'bars'`, default
`'dots'` so nothing existing moves.

Both controls stay 44×44 minimum tap targets even though the glyph is small.

## 3. The hero slot

Every step screen accepts **`illustration?: ReactNode`** and renders it in a centred panel:
`tokens.radius.lg`, a tinted ground (`primary[50]` / `neutral[50]`), roughly 4:3, capped at ~38% of
screen height so the CTA never leaves the fold on a small phone.

The kit ships no artwork and must not. When `illustration` is absent, fall back to the existing
`logoGlyph` medallion **at hero size**, not to empty space. A screen with nothing in the hero slot
must still look composed.

## 4. The headline block

- Headline: `Text` `size="2xl"`, `weight="bold"`, `tone="onSurface"`, centred, max 2 lines.
- Subhead: `Text` `size="base"`, `tone="muted"`, centred, max 3 lines, comfortable measure — do not
  let it run the full width on a tablet.
- `tokens.spacing.sm` between them, `tokens.spacing.lg` above and below the block.

Left-align ONLY in an explicit `variant="bottomSheet"`. Centre is the default everywhere else.

## 5. The primary action — sticky footer

Pinned to the bottom, above the safe-area inset, with a hairline `colors.border` divider on top and
`colors.surface` behind it so content scrolls under rather than colliding.

- Full width minus `tokens.spacing.lg` each side.
- Height **56**, `tokens.radius.full`.
- `colors.primary` fill, `colors.onPrimary` label, `weight="semibold"`.
- Trailing `→` glyph on a forward action. None on a terminal one ("Done").
- Disabled state is the same shape at reduced opacity — never a different shape, or the button
  appears to move when it enables.

A secondary action ("No thanks", "Back") goes **below** the CTA as a text link, centred, `tone="muted"`
— never beside it competing for the same weight.

## 6. Inputs — the auth screens live or die here

- Height **56**, `tokens.radius.lg`, 1px `colors.border`, `colors.surface` fill.
- **Leading icon** in `colors.muted` (`mail`, `lock`, `user` from the named icon set).
- Trailing affordance where it earns one: the password eye, a clear `✕`.
- Focus raises the border to `colors.primary`; error to `colors.danger` with the message below in
  `tone="dangerText"` — never only a red border, which colour-blind users cannot see.
- Placeholder is `colors.muted`, never a faked label.

Two short fields on one row (First / Last name) share a row with `tokens.spacing.sm` between them.

## 7. Choice controls

- **Chips wrap.** `flexWrap: 'wrap'` with `tokens.spacing.sm` gaps. Never a horizontal scroll that
  clips the last option — a user cannot choose what they cannot see.
- Selected: `colors.primary` fill, `colors.onPrimary` label. Unselected: `colors.surface` with a
  `colors.border` outline. Both 44 tall minimum.
- **Plan cards**: two-up, equal width, `tokens.radius.lg`. Selected gets the `primary` fill and a
  2px `primary` ring; unselected stays outlined. A "BEST"/"SAVE 20%" badge sits top-right of the
  card it belongs to, in `colors.success` on `successText`.

## 8. Feature rows — the pattern that carries the value proposition

Used on the paywall and the welcome-offer screen:

- Circular badge, 44×44, `primary[50]` ground, glyph in `colors.primary`.
- Title `Text size="base" weight="semibold"`, description `Text size="sm" tone="muted"`.
- `tokens.spacing.md` between rows.
- Optional 1px vertical rail in `colors.border` connecting the badges — on by default when there
  are three or more rows, because it reads as one list rather than three fragments.

## 9. The auth screens specifically

**Sign in** — brand tile (rounded square, `primary` fill, `tokens.radius.lg`, 56×56) top-left, NOT
centred; `Text size="3xl" weight="bold"` headline; muted subhead; the two inputs; a **right-aligned**
"Forgot password?" link in `colors.primary`; the sticky CTA; an "or continue with" hairline divider
with the label centred on it; provider buttons at the same 56 height, outlined, logo + label; a
centred footer line with the opposite action ("Don't have an account? **Register**").

**Register** — same shell. First/Last on one row, then email, then password, then a terms
**checkbox in a bordered card** with the two links inline, then the CTA (disabled until the box is
ticked), then the same divider, providers and footer.

Both must render correctly with `providers={[]}` — an app with no social sign-in must not show an
empty divider.

## 10. Rules that do not bend

1. **No literal colours, spacings, radii or font sizes.** Everything from `useXenitionTheme()`. The
   only bare numbers are geometric: flex factors, aspect ratios, `1` for a hairline, the 44/56
   control heights named above (add them as local constants with a comment).
2. **Use the kit's own primitives** — `Text`, `Icon`, `Button`, `Input`, `Card`, `Checkbox`. Do not
   hand-roll a `<Text style={{fontSize:…}}>` when `Text size=` exists.
3. **Native and web twins keep prop parity.** Same props, same names, same defaults.
4. **Additive only.** Every prop added is optional with a default that preserves today's rendering
   where the old rendering was acceptable. Existing callers must not break.
5. **A V2 composite composes V2 children**, a V3 composes V3. Never mix lines. There are specs
   asserting this — do not break them.
6. **Every screen must survive its empty state**: no illustration, no subtitle, no providers, one
   step, zero features.

## 11. Variants — what "more variants" means

Where a screen has no `V2`/`V3` today, add them. They are **separate exports with identical props**
— never a `variant` prop — matching how the module already works.

Give each line a distinct idea rather than a reskin:

- **base** — centred, illustration above the headline. The reference layout.
- **V2** — editorial: full-bleed hero to the top edge, headline overlapping the panel, content
  sheet rising over it.
- **V3** — compact: no hero panel, a small leading icon beside the headline, denser rows. For a
  sheet presentation or a short screen.

## 12. Done means

- `npx tsc --noEmit` clean, `npx jest` green.
- Every changed component has a spec covering the new props AND its empty state.
- Native and web twins at prop parity.
- Nothing in the module renders a numbered-circle stepper any more.

---

## Addendum — V4 control metrics (settled 2026-08-26)

Two contradictions in the briefs above surfaced once agents built against them. Both are settled
here; a consistency pass applies them once the parallel work lands.

**1. Control height is `spacing['2xl']` (48) with `radius.md` — not 56 / `radius.lg`.**

§6 above says 56 and `radius.lg`. `InputV4` shipped first at `spacing['2xl']` + `radius.md`, and it
is the anchor every other field is measured against. 56 is not on the spacing scale, so hitting it
literally needs a composed number, and changing the anchor now would move sixty-odd components to
match a number chosen in a screen spec rather than in the token scale.

The stated reason for the rule was "consistency across a form is the single biggest quality
signal". That reason argues for matching the shipped anchor, not the written number. So: **48 /
`radius.md`**, held by `internal/field-v4.ts` on both twins so it cannot drift again.

Known exceptions, both deliberate: `Switch` derives its track radius from its own height (a switch
is a pill, and `radius.full` compiles to 0 on a `sharp` seed); `SearchInput` may stay a pill,
because a search field reads as one and §31 says use familiar interactions.

**2. A V4 may add `error?: string`. The "exactly the base props" rule yields to it.**

§6 says errors are "border AND message, never colour alone". The parity rule says a V4 takes
exactly its base's props. Not one of the eleven form-control bases has an error-text prop, so the
two rules cannot both hold — `InputV4` broke parity to add `error`, the eleven form controls kept
parity and dropped the message.

**Parity yields.** An error a colour-blind user cannot perceive is an accessibility defect, and
prop parity is a maintenance convenience. The exception is narrow and additive: `error?: string`
only, optional, on field-shaped components only, and it must render the message — not just tint a
border.

Four bases cannot show an error at all today (`NumberInput`, `PinInput`, `RadioGroup`, `Switch`
have no `invalid`). That is a gap in the bases, and it is worth closing there rather than only in
V4.
