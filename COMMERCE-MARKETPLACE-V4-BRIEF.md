# Commerce + Marketplace — the V4 brief

**22 components, 2 modules, both twins.** `commerce` (10 remaining of 11) and
`marketplace` (12). Every build agent works against this file.

Written 2026-08-30 from a read of all 44 source files, the module's one
already-upgraded component, and the house specs
(`ONBOARDING-DESIGN-SPEC.md` §10 + Addendum, `LAYOUT-DASHBOARD-V4-BRIEF.md`,
`CHARTS-V4-BRIEF.md`).

**`PriceTagV4` is the worked example.** Read it before writing anything. It is
the only component in either module already on the line, and it settles the
three decisions this domain turns on: a number that carries a decision gets the
type hierarchy to match, money goes through one formatter, and **a sale price
does not turn red.**

---

## 0. Why these two, and why together

They are one surface. A marketplace listing composes a price, a seller, a
condition and a shipping option; a cart composes the same price and the same
status badge. Upgrading one without the other leaves a checkout that does not
look like the listing it came from — which is exactly the seam the whole V4
line exists to close.

**Correction, 2026-08-30, after the build.** This section first claimed
`GenerativeCover` existed only on native and that its doc comment referred to a
web component that did not exist. **That was wrong.** A full web
`GenerativeCover` — six inline-SVG compositions, seeded jitter, role validation
— has been in `src/marketing/GenerativeCover.tsx` all along, and the web
`commerce/ProductCard` already imports it. The asymmetry is module *placement*
(web's lives in `marketing`, native's in `commerce`), not a missing component.

The real defect is narrower and worse: **two independent copies of the FNV-1a
seed hash with no test asserting they agree.** They did agree, by luck. One
shared module now owns the hash and the seeded plate, and both twins call it.

| module | web | native | checklist says |
|---|--:|--:|---|
| `commerce` | 10 | 11 | 11 |
| `marketplace` | 12 | 12 | 12 |

---

## 1. Rules that do not bend

Everything in `LAYOUT-DASHBOARD-V4-BRIEF.md` §1 and `ONBOARDING-DESIGN-SPEC.md`
§10 still applies — no literal colours, spacings, radii or font sizes; V4
primitives (`TextV4`, `IconV4`, `ButtonV4`, `CardV4`, `BadgeV4`, `AvatarV4`,
`EmptyStateV4`); prop parity across twins; additive only; the V4 control metric
is `spacing['2xl']` (48) with `radius.md`; 44 is the tap floor. On top of that,
for these two modules:

1. **Every amount goes through `formatMoney`.** Integer cents in, a localized
   currency string out, overridable per call. A hand-written formatter is how a
   kit ends up with `$1204.5` on one screen and `$1,204.50` on the next.
   `marketplace` has no `money.ts` of its own and must not grow one — import
   from `commerce`.

2. **Money is tabular.** `font-variant-numeric: tabular-nums` on every figure
   that appears in a column or a stack — a cart, an order summary, a bid
   history. Prices only read as a list if the digits line up.

3. **Status colour is reserved, exactly as in charts.** `success` / `warn` /
   `danger` mean good, caution and bad. A discount, a bid, a "hot" listing and
   an ending auction are **not** status — they are emphasis, and they take the
   brand or the type scale. `design.md` §35.4: a sale price painted in the
   error tone teaches the reader to distrust the tone everywhere else.

4. **A card's ground is `colors.card`, not `colors.surface`.** The fix the
   dashboard pass made and the reason dark mode read flat. Every card in these
   two modules currently paints the page colour and leans on a border.

5. **Row-shaped things take the row metric**, not a card. From
   `LAYOUT-DASHBOARD-V4-BRIEF.md` §4.3: one-line 56, two-line 72, leading and
   trailing space 16, leading icon 24, leading avatar/badge 44. That covers
   `CartLineItem`, `BidRow`, `OfferRow`, `WatchlistRow`, `ShippingOption`.

6. **Trust is never colour alone.** A condition grade, a rating, a verified
   seller, a sold-out badge — each ships an icon **and** a label. This is the
   same rule the charts palette forced, and it matters more here: a shopper
   deciding whether to send money to a stranger is the highest-stakes read in
   the kit.

7. **A V4 composite composes V4 children.** `ProductCardV4` renders
   `PriceTagV4`, `BadgeV4`, `IconV4` — never the base line, and never a
   hand-rolled price.

8. **The V2/V3 variants stay untouched and stay working.**
   `design-variants.spec.tsx` on both twins asserts a V2 composite composes V2
   children. Do not break it, do not rewrite the variants, do not delete them.

---

## 2. What is wrong today

Read against `PriceTagV4`'s four fixes, the same defects repeat across both
modules:

- **The price is not the hero.** `PriceTag` was setting the most important
  figure on a product card at caption size before V4. Every card and row that
  draws its own amount instead of composing `PriceTag` repeats that.
- **Cards paint `surface` and rely on a border**, so a product grid on a dark
  page is a flat sheet of same-coloured rectangles.
- **`QuantityStepper`'s `+` / `−` are the classic 44 violation** — a control a
  shopper taps repeatedly, drawn at glyph size.
- **`AuctionCard` renders a live countdown** from `endsAtMs` / `nowMs`. It is
  the one genuinely time-driven component in either module, and it needs the
  reduced-motion and announce-once answers the counter got in the motion pass:
  a countdown must not be read aloud every second.
- **`ReportListing` is a destructive, outward-facing action** with no
  confirmation step.
- **`EmptyState` (commerce) predates `EmptyStateV4`** and should compose it
  rather than re-draw it.

---

## 3. Per-component

### Group A — the cart and the money (5)

`CartLineItem` · `CartSummary` · `CheckoutSummary` · `OrderSummary` ·
`QuantityStepper`

The summaries are the kit's densest money surface: a label column, a figure
column, a rule, a total. Give them the row metric, tabular figures, and **one
rule above the total only** — the V4 data line keeps exactly one horizontal
rule and lets spacing do the rest. The total is one step up the type scale, not
a colour. `CartLineItem` composes `PriceTagV4` and `QuantityStepperV4`.
`QuantityStepperV4`'s buttons take the 44 floor and disable at the bounds
without changing shape.

**`CheckoutSummary` has no file of its own** — it is exported from
`OrderSummary.tsx` on both twins, and so are its V2 and V3 variants. So it is a
*named export*, not a component with a home, and the checklist counts it as one
of the eleven. Keep that shape: `CheckoutSummaryV4` ships from
`OrderSummaryV4.tsx` beside `OrderSummaryV4`, exactly as the base and both
variants already do. Do not give it a file the other three lines do not have.

### Group B — the product surface (5)

`ProductCard` · `ProductGrid` · `EmptyState` · `StatusBadge` ·
`GenerativeCover`

`ProductCardV4` is the module's flagship: `card` ground, image at a fixed
aspect ratio, title at most two lines, `PriceTagV4` beneath, one badge slot.
`ProductGridV4` is layout only — it must not restyle its children.
`EmptyStateV4` (commerce) composes the primitive of the same name rather than
re-drawing it. `StatusBadgeV4` is where rule 6 bites: an order status is an
icon plus a word.

**`GenerativeCover`'s two twins get one seed.** See the correction in §0: the
web renderer already exists in `marketing`. What did not exist was any
guarantee the two platforms hashed a seed the same way — they each carried
their own FNV-1a, and native seeded its ramp steps from a different slice of
the hash than the web renderer used. `GenerativeCoverV4` (web) delegates its
geometry to the `marketing` renderer and passes down a plate resolved from the
**shared** hash; native keeps its seeded gradient and its honest note that
`form` only varies direction there. Same seed, same three decisions, on both.

### Group C — the listing and the seller (6)

`ListingCard` · `AuctionCard` · `SellerCard` · `CategoryTile` ·
`ConditionBadge` · `RatingBreakdown`

`ListingCardV4` mirrors `ProductCardV4` — same ground, same image ratio — so a
storefront and a marketplace read as one product. `AuctionCardV4` owns the
countdown: derive from `endsAtMs`/`nowMs`, tick no faster than the second, do
not animate the digits, and announce the remaining time once rather than on
every tick. `SellerCardV4` and `RatingBreakdownV4` are the trust pair — rating
as a number *and* stars *and* a count, never stars alone. `RatingBreakdown` is
a horizontal bar chart in all but name: compose `ProgressBarsV4` from `charts`
rather than drawing its own bars.

### Group D — the transaction (6)

`BidRow` · `OfferRow` · `MakeOfferForm` · `ShippingOption` · `WatchlistRow` ·
`ReportListing`

The four rows take the row metric and tabular money. `MakeOfferFormV4` takes
the V4 field metric (48 / `radius.md`) and the `error?: string` exception — an
offer rejected for being below the minimum must say so in words, not in a red
border. `ShippingOptionV4` is a selectable row: selection is a persistent
highlight plus a checkmark, per HIG's option-list rule. **`ReportListingV4`
gets a confirmation step** — it is an outward-facing, hard-to-reverse action
and currently fires on one tap.

---

## 4. Done means

- `npx tsc --noEmit` clean, `npx jest` green, including the existing
  `design-variants` specs on both twins.
- Every V4 has a spec on both twins covering the new props, the empty state,
  and the accessible label.
- Both twins at prop parity, including the two components that had no twin.
- No amount is formatted anywhere but `formatMoney`; no status colour carries
  emphasis; no card paints `surface`.
- `COMPONENTS.md` rows updated with the real per-twin counts.

---

## 5. Found during the build — defects outside this pass

Three things the build agents hit that are **not** commerce or marketplace
problems. Recorded here rather than fixed, because each one lives in a
primitive that four agents were writing against at the time.

### 5.1 `CardV4` hard-codes the wrong ground, and every card works around it

`primitives/CardV4` paints `bg-surface` / `colors.surface` on both twins. The
dashboard brief settled that **a card's ground is `colors.card`** — that is the
fix that stopped dark mode reading flat — so every V4 card in the kit now
overrides its own base primitive. `SectionCardV4` does it with an injected
specificity sheet, `StatCardV4` with another, and this pass added two more
(`money-v4.ts` and `ProductCardV4`). Four workarounds for one wrong default.

`cn()` is a plain string join with no `tailwind-merge`, so the override cannot
be a `className` — both utilities land on the element and Tailwind's alphabetical
ordering picks `.bg-card` *before* `.bg-surface`, meaning the override loses
silently. Hence the two-attribute selectors.

**The fix belongs in `CardV4`**, and it is a visual change to every existing
call site, so it needs a deliberate decision rather than a drive-by: either flip
the default to `card`, or add an explicit `ground?: 'card' | 'surface'`.

### 5.2 The native `BadgeProps` is not a `ViewProps`

The web `BadgeProps` extends `HTMLAttributes`, so a web badge takes a `data-*`
or a `className`. The native one extends nothing, so a native badge has nowhere
to put a `testID` — a spec cannot get a handle on it without wrapping it in a
`View`. A real twin divergence in a primitive, hit twice in this pass. Note also
that the native `BadgeTone` has no `muted`; that slot is web-only.

### 5.3 The icon set is emoji, so a tinted glyph is not always tinted

`IconV4`'s `color` cannot tint a colour emoji — the glyph carries its own
colour. `STATUS_ANATOMY`'s `pending` (🕐) and `paid` (💳) are colour emoji on a
solid tinted badge, so rule 6's "an icon **and** a word" holds, but the icon
does not participate in the tone. A monochrome glyph (`check`, `tag`) does, and
is what those two now use. The general problem is the icon set, not the badge.

### 5.4 One tension in this brief, unresolved

§1 rule 5 sends the summary rows to the row metric (one-line floor 56), and §3
calls the summaries "the kit's densest money surface". A
subtotal/shipping/tax/total block is then roughly 224pt before the CTA, which is
not dense. The build followed the brief literally, because family consistency is
the thing the V4 line is for — but a `dense` variant is worth considering.
