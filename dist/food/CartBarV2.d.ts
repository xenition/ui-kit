import * as React from 'react';
import type { CartBarProps } from './CartBar';
/** Drop-in for {@link CartBar}: identical props, a distinct design. */
export type CartBarV2Props = CartBarProps;
/**
 * CartBar, alternate design **V2** — an *elevated floating pill*. Instead of a
 * full-width filled bar, V2 is a rounded-full, self-centred pill that hovers
 * above the content with a real drop shadow and a subtle hover lift — the
 * classic "N items · total" FAB-style checkout affordance. Empty and `loading`
 * states behave exactly as the base (collapses to a muted, non-interactive
 * pill). Same props as the base `CartBar`; token-only.
 */
export declare const CartBarV2: React.ForwardRefExoticComponent<CartBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CartBarV2.d.ts.map