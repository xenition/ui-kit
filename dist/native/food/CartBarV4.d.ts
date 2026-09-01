import * as React from 'react';
import type { CartBarProps } from './CartBar';
export interface CartBarV4Props extends CartBarProps {
    /** Copy shown in place of `label` while the cart is settling. Default `'Updating…'`. */
    updatingLabel?: string;
    /** Build the item-count phrase. Default `'1 item'` / `'3 items'`. */
    formatItemCount?: (count: number) => string;
}
/**
 * **V4 cart bar** — same props as {@link CartBar} plus `updatingLabel` and
 * `formatItemCount`.
 *
 * ## Five changes
 *
 * 1. **It clears the home indicator.** Its own docstring calls it a sticky
 *    bottom bar and it read no safe-area inset at all, so on a notched phone
 *    the total and the checkout action sat under the home indicator — the one
 *    bug that tells a user a screen was not built for their device. The band
 *    pays `spacing.md` *plus* `insets.bottom`, the way every other
 *    edge-anchored V4 component here does. Needs a `SafeAreaProvider` above
 *    it, which Expo mounts by default.
 * 2. **The count pill stops inverting the token pair.** It filled with the
 *    bar's `on-primary` ink and lettered it in `primary` — an `on` slot used
 *    as a *fill*, which the compiler guarantees nothing about in that
 *    direction. The pill is a hairline ring in the bar's own guaranteed ink
 *    now: correct as a 3:1 boundary and as text, in both schemes.
 * 3. **"1 items" is gone.** `formatItemCount` builds the phrase, and it is the
 *    same phrase the bar announces.
 * 4. **The total is tabular.** It re-renders every time the cart changes, and
 *    proportional figures make it jitter under the reader's eye.
 * 5. **Press is a state layer**, not `opacity: 0.9` — and the whole announced
 *    name is rebuilt from the same strings the bar draws, so the busy state
 *    reads as "Updating…" rather than as a stale "View cart".
 */
export declare function CartBarV4({ itemCount, totalCents, currency, label, onPress, variant, loading, emptyLabel, updatingLabel, formatItemCount, formatMoney, style, }: CartBarV4Props): React.ReactElement;
//# sourceMappingURL=CartBarV4.d.ts.map