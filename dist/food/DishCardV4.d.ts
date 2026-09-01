import * as React from 'react';
import type { DishCardProps } from './DishCard';
export interface DishCardV4Props extends DishCardProps {
    /** The busy card's accessible name. Default `'Loading dish'`. */
    loadingLabel?: string;
}
/**
 * **V4 dish card** — the web twin of the native `DishCardV4`, same props as
 * {@link DishCard} plus `loadingLabel`.
 *
 * ## Six changes
 *
 * 1. **A screen reader hears more than the dish's name.** `aria-label={name}`
 *    sat on a `role="button"` root, and that role is children-presentational —
 *    so the price, the rating and, worst of all, the allergen and dietary
 *    badges were pruned out of the accessibility tree. Someone with a coeliac
 *    or nut allergy got a bare list of dish names while the sighted view beside
 *    them showed every marker. The price and the rating are now folded into the
 *    activation's name through `spokenLine`, and the badges are lifted **out**
 *    of the activation so their own text is reached — `badges` is an opaque
 *    `ReactNode`, and no string could honestly carry it.
 * 2. **The add button is a sibling of the card's activation, not a child.**
 *    Nesting it inside `role="button"` was invalid ARIA and it double-fired:
 *    0.8.0 landed `stopPropagation` in the V2/V3 variants and left the classic
 *    unguarded, and the key path could not be guarded that way at all — the
 *    card's `onKeyDown` ran `preventDefault()`, which cancels the very click
 *    Enter was about to perform on the button. A keyboard user added nothing
 *    and navigated away instead.
 * 3. **`soldOut` genuinely blocks activation.** The base set `aria-disabled`
 *    and then called `onClick` anyway, so the user who could not hear that a
 *    dish contains gluten could also add a sold-out one to their cart.
 * 4. **Sold-out and hover stop fighting, and the words stay legible.** The dim
 *    and `hover:opacity-90` sat on one element, so a sold-out dish got
 *    *brighter* under the pointer — and the dim covered the whole card, which
 *    made "Sold out", the text that *explains* the state, the least readable
 *    thing on it. The photo dims; the name, the price and `soldOutLabel` are at
 *    full strength. Not 0.38: that is M3's *disabled* band, and a sold-out dish
 *    is a dish you can still open and read.
 * 5. **The skeleton is the shared opaque placeholder**, not `bg-neutral-200` —
 *    a neutral ramp step mirrors under `[data-theme="dark"]`, so the loading
 *    card was a near-white slab on a dark menu.
 * 6. **The card is inked with the contrast-corrected slots.** The body ran on
 *    `text-muted` — a *fill* — over `surface`, under a raised card.
 */
export declare const DishCardV4: React.ForwardRefExoticComponent<DishCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DishCardV4.d.ts.map