import * as React from 'react';
import type { CartBarProps } from './CartBar';
/** Drop-in for {@link CartBar}: identical props, a distinct design. */
export type CartBarV2Props = CartBarProps;
/**
 * CartBar, alternate design **V2** — an *elevated floating pill*. Instead of a
 * full-width filled bar, V2 is a rounded-full, self-centred pill that hovers
 * above the content with a real drop shadow — the classic "N items · total"
 * FAB-style checkout affordance. Empty and `loading` states behave exactly as
 * the classic (collapses to a muted, non-interactive pill). Same props.
 */
export declare function CartBarV2({ itemCount, totalCents, currency, label, onPress, variant, loading, emptyLabel, formatMoney, style, }: CartBarV2Props): React.ReactElement;
//# sourceMappingURL=CartBarV2.d.ts.map