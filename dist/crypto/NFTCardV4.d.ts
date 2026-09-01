import * as React from 'react';
import type { NFTCardProps } from './NFTCard';
export interface NFTCardV4Props extends NFTCardProps {
    /** Announced while the artwork skeleton is up. Default `'Loading artwork'`. */
    loadingLabel?: string;
    /** Caption over the floor price. Default `'Floor'`. */
    floorLabel?: string;
}
/**
 * **V4 NFT card** — the web twin of the native `NFTCardV4`, same props as
 * {@link NFTCard} plus `loadingLabel` and `floorLabel`.
 *
 * ## Four changes
 *
 * 1. **The skeleton is visible.** It was `bg-neutral-100` painted inside a box
 *    that was *also* `bg-neutral-100`, so the only thing separating "loading"
 *    from "empty frame" was the pulse — and under `prefers-reduced-motion`,
 *    nothing at all. The placeholder is now the shared opaque mix against the
 *    card's own ground, in a `role="status"` region rather than a bare
 *    `aria-label` on a `div` with no role.
 * 2. **The floor price never prints without a unit.** `floorSymbol` is
 *    optional and there was no fallback, so a collectible could advertise a
 *    floor of "0.85" of nothing. A floor with no ticker is not shown.
 * 3. **The card announces what it is holding.** `aria-label` carried the name
 *    and collection only, and replaced the subtree — so the network and the
 *    floor price, the two things a buyer is looking for, went unspoken.
 * 4. **`Card` takes the same treatment on both twins**, and a press is a state
 *    layer on a real `<button>` rather than `role="button"` plus a
 *    hand-written key handler on a `div`. The base also stacked its own `p-sm`
 *    class on top of `Card`'s `lg` padding and let stylesheet order pick the
 *    winner; `padding` is passed properly now.
 */
export declare const NFTCardV4: React.ForwardRefExoticComponent<NFTCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=NFTCardV4.d.ts.map