# `finance` + `food` — the V4 pass

Twenty-six components across two modules, both twins. Written after a full read
of all 52 base files by two independent audits.

Companion to the six earlier briefs. The rules those set hold unchanged, plus
the one promoted last pass: **a control inside a card is a sibling of the
card's activation, never a descendant.**

---

## 1. The two findings that matter most

### 1.1 A menu that never says what is in the food

`food/DishCard.tsx:173`, `native/food/DishCard.tsx:198` — `aria-label={name}` /
`accessibilityLabel={name}` on a `role="button"` root, in a component whose own
prop doc calls `badges` "the dietary / cuisine chip slot (e.g.
`NutritionBadge`s)".

`role="button"` is **children-presentational**, and an `accessible` `Pressable`
is a leaf. So a screen-reader user browsing a menu hears exactly one thing per
dish: **its name.** Not the price. Not the rating. And not the allergen and
dietary badges — *Gluten-free*, *Vegan*, *Halal*, *Nut-free* — which are
rendered, are correctly text-plus-glyph rather than colour-alone, and are then
suppressed wholesale by the label one level up.

`soldOut` compounds it: `aria-disabled` says the dish is unavailable while
`onClick` still fires (`:178`), so the same user who cannot hear that a dish
contains gluten can also add a sold-out one to their cart.

This is not a styling regression. Someone with a coeliac or nut allergy, or
keeping halal, gets a menu that reads as a bare list of dish names, while the
sighted view beside them shows every marker plainly.

The same shape, in the same module, also suppresses: the modifier's price delta
(so a paid extra is added silently), `ReorderRow`'s items summary,
`RestaurantCard`'s rating and delivery fee, and `TableReservationRow`'s table
number.

### 1.2 A credit card that is illegible in both schemes, in both directions

`finance/CreditCardView.tsx:36,43` — the `dark` variant paints the face
`from-[var(--xen-neutral-700)] to-[var(--xen-neutral-900)]` and the foreground
`text-on-surface`, a token guaranteed against `surface` and nothing else.

- **Light scheme:** `on-surface` is near-black, the fill is near-black.
- **Dark scheme:** the web output *inverts* the neutral ramp, so the fill goes
  light at the same moment `on-surface` does.

Either way the number, the holder and the expiry sit near 1:1.

The native twin has the mirror-image bug for the opposite reason:
`native/CreditCardView.tsx:66-70` reads `tokens.ramps.neutral`, which the theme
output copies to native **without** inverting, so the fill stays dark in both
schemes while `colors.onSurface` beside it flips — giving the *light* scheme
dark ink on a dark card.

And the fallback is closed too: `role="img"` on the root (`:64`) prunes the
whole subtree, so a reader announces "VISA card ending 4242" and never reads
back the number the eye cannot resolve. **Illegible to both channels at once.**

---

## 2. State that cannot change — the third and fourth occurrence

`TransferForm` (both twins) has every value prop optional with a default, holds
no state, and has an optional `onChange`. Dropped in the way its own barrel
documents, the selects never change, the amount field never accepts a number,
and `canSubmit` — which requires `amountCents > 0` — can never become true. The
submit button is **permanently disabled**.

`TipSelector` is the same shape with a worse default: `selectedPercent` is
optional and `selected` is recomputed from props every render, so uncontrolled
it renders **"No tip" filled and `aria-checked={true}` forever**, and every tap
emits `onSelect` while nothing moves.

`CuisineChip` makes three: a toggle with no internal state and a `selected`
default of `false` is a permanently unselected filter.

This is now the third distinct module with this defect, after `EmailThread` and
`SwipeDeck`.

---

## 3. `finance` — the rest

- **The web twin missed the `*-text` migration wholesale.** `MoneyAmount` paints
  money `text-success` / `text-danger` — **fill** tokens, measured at 1.32:1 as
  text — while the native twin already migrated and carries a comment saying
  why. Every one of the thirteen routes its figures through `MoneyAmount`, so
  all thirteen inherit it.
- **And the native twin never adopted `mutedText`**: `colors.muted` is used as a
  text colour in thirteen native files, including `MoneyAmount`'s `tone="muted"`
  — which is what `BudgetBar` draws its "remaining" balance in.
- **`BudgetBar`'s `className` override silently loses.** `cn` is a plain joiner,
  not a class merger, so `size="sm"` + `className="text-xs font-semibold"` ships
  `text-sm text-xs font-bold font-semibold` and Tailwind's emit order restores
  the originals. The native twin uses a style object, which *does* apply — so
  the same figure renders at a different size and weight on each platform.
- **`InvoiceLine` under-reports a fractional line.** It truncates the unit price
  and not the quantity, so `333 × 3.5` yields `1165.5`, floored to `$11.65`,
  while the breakdown above it honestly prints "3.5 × $3.33".
- **`TransferForm` round-trips money through a float** in a module whose barrel
  says "money is always carried as integer cents … so printed values never
  drift". `0.145 * 100` is `14.499999999999998`.
- **`PaymentMethodRow.brand` is accepted, documented, and read by nothing** — a
  Visa row and an Amex row are the same 💳 — and it masks by string
  concatenation while the module's own `maskAccountNumber` sits two files away.
- **A zero change renders as a green gain** in three components (`>= 0`).
- **`BalanceHeader`'s sparkline is coloured from `changeCents`**, which is
  optional — so a `trend`-only header draws a collapsing balance in success.
- **`appearance` exists on all thirteen native components and none of the web
  ones.** The whole visual-diversity system is native-only, so the two
  platforms cannot render the same screen.
- Meters are drawn and not exposed: `BudgetBar` is a `progressbar` on web and an
  `image` on native; `SavingsGoalCard`'s ring is an `image` on both, and its
  overshoot is invisible — $12,000 against a $10,000 goal reads identically to
  landing exactly on target.

## 4. `food` — the rest

- **Hovering a disabled thing makes it brighter.** Three components put the
  dimming opacity and the hover variant on the same element, so a sold-out dish,
  a closed restaurant and a disabled reorder row all *un-dim* on hover. Native
  reverses it the same way. `RestaurantCard` also compounds two opacities onto
  the photo, landing at 0.525.
- **`OrderStatusTracker` is silenced by its own role.** `role="progressbar"` is
  children-presentational, so every stage label, timestamp and per-step name
  inside is pruned — and with no `aria-label` or `aria-valuetext` it announces
  an unnamed "1 of 4". A `cancelled` order still counts up.
- **An unknown status reads as stage 1** — `Math.max(0, indexOf(status))` maps a
  miss onto `placed`, so a typo renders a confident, wrong "Order placed".
- **`DeliveryEstimate` silently collapses a transposed window** — `min={35}
  max={20}` renders "35 min" — and throws away the accessible name it computes,
  on a role-less element.
- **`RatingSummary` hard-codes "out of 5"** while deriving its star labels from
  `distribution.length`, so a 10-bucket distribution announces the wrong scale.
  Its bars are unexposed and its bucket labels are naked digits.
- **`focus-visible:ring-primary-300` at 15 sites** — a ramp step where the
  preset ships a `ring` token. The V4 line already uses `ring-ring` in 74 files
  against 2; this is now a hygiene rule.
- Chips, modifier rows and tip options are 24–38px, and `hitSlop` appears
  exactly once in the entire native twin.

### What 0.8.0 actually did

One commit, touching six files: `DishCard` and its V2/V3 on both twins. It made
`priceCents` optional — correctly, and matched across the twins — and it landed
`stopPropagation`, a 44px add button and a `hitSlop` **in the variants only**.

So `DishCardV2` guards its nested control and `DishCard` does not, in the same
commit. And the "EmptyState is a primitive" half landed on web's `MenuSection`
while native still hand-rolls a dashed box. The ⚠️ is accurate, and **the
inconsistency is itself the defect**: a consumer who reads `DishCardV2` and
concludes the module guards nested controls will be wrong about `DishCard`,
`ReorderRow` and every other row in it.

---

## 5. What the V4 line adds

Two **pure, shared** modules:

- `finance/money-v4.ts` — `signParts` (direction as a word, a glyph *and* a
  tone, with `tone` winning over the sign so a forced tone stops contradicting
  the label), `lineTotal`, `pctText` through `Intl`, `meterParts` (the clamped
  ratio for the bar **and** the true percent for the label, because they are
  not the same number), `ratePrecision`.
- `food/order-v4.ts` — `DIET_TONE`, `stepQuantity`, `stageIndex` returning
  `undefined` for an unknown status, `deliveryWindow`.

Plus `finance/internal/ledger-v4` and `food/internal/menu-v4` per twin.

`food`'s `spokenLine` is the most consequential helper in this pass: everything
a sighted user can see about a dish — the price, the rating, and every allergen
badge — goes into the name, because the role prunes the rest.
