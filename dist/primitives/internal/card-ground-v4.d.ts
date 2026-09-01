/**
 * The one rule that lifts a V4 card off the page.
 *
 * ## The defect this exists to stop repeating
 *
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §4.2 settled that **a card's ground is
 * `colors.card`, not `colors.surface`** — that is the fix that stopped dark
 * mode reading flat, because a shadow on a near-black page is nearly
 * invisible and the answer is to *lighten* the raised surface instead.
 *
 * `primitives/CardV4` never got the memo: it hard-codes `bg-surface
 * text-on-surface` in its own class list. So every V4 card in the kit has to
 * override its own base primitive — and **nine of them now carry a private
 * copy of the identical two-declaration rule**: `StatCardV4`, `MetricTileV4`,
 * `TrendCardV4`, `ProductCardV4`, `ListingCardV4`, `AuctionCardV4`,
 * `CategoryTileV4`, `SellerCardV4`, `RatingBreakdownV4`.
 *
 * Two more did not, and shipped visibly wrong: `MakeOfferFormV4` and
 * `ReportListingV4` passed `bg-card` through `className` and lost, so those two
 * panels sat flush with the page while every card around them was lifted. That
 * is what a showcase screen found the first time these components were put on
 * one page together.
 *
 * ## Why `className` cannot do it
 *
 * `cn()` is a plain string join with no `tailwind-merge` behind it, so
 * `className="bg-card"` puts **both** `bg-card` and `bg-surface` on the
 * element and the generated stylesheet's ordering decides. Measured in the
 * emitted sheet rather than assumed: `.bg-card` is written before
 * `.bg-surface`, so the later rule wins and the card paints the page colour.
 *
 * (The nine existing copies each explain this as "Tailwind sorts background
 * utilities alphabetically". That is **not** why. Tailwind 3 emits colour
 * utilities in the insertion order of the theme's colour keys, and `card`
 * happens to be declared before `surface` in the kit's preset. The conclusion
 * is right and the stated reason is wrong; corrected here rather than in nine
 * places.)
 *
 * So the override is made by **specificity**, not by order: two attributes
 * (0-2-0) against a single class (0-1-0) wins wherever the sheets land.
 *
 * ## Using it
 *
 * ```tsx
 * injectStyleOnce(V4_CARD_GROUND_STYLE_ID, V4_CARD_GROUND_CSS);
 * <CardV4 {...V4_CARD_GROUND_ATTR} />
 * ```
 *
 * The attribute is generic on purpose. A per-component name (
 * `data-xen-v4-listing-card`) buys nothing here — nothing else keys off it —
 * and it is why the rule was copied nine times instead of shared once. The
 * nine can collapse onto this with no visual change; that is a mechanical pass
 * worth doing, and it is why this file names them.
 *
 * **The real fix is still in `CardV4`.** Flipping its default is a visual
 * change to every existing call site and wants a deliberate decision. Until
 * then, this is the one place the workaround lives.
 */
/** The `<style>` id every V4 card shares. Idempotent. */
export declare const V4_CARD_GROUND_STYLE_ID = "xen-v4-card-ground-styles";
/** Spread onto a `CardV4` to opt it into the card ground. */
export declare const V4_CARD_GROUND_ATTR: {
    readonly 'data-xen-v4-ground': "card";
};
/**
 * One rule, two declarations.
 *
 * Both properties move together on purpose: `onCard` is the contrast promise
 * the compiler measured *against* `card`, so a component that took the ground
 * without the ink would be relying on `onSurface` happening to clear it.
 */
export declare const V4_CARD_GROUND_CSS = "\n[data-xen-v4-card][data-xen-v4-ground=\"card\"] {\n  background-color: var(--xen-card);\n  color: var(--xen-on-card);\n}\n";
//# sourceMappingURL=card-ground-v4.d.ts.map