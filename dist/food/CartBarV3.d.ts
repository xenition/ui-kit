import * as React from 'react';
import type { CartBarProps } from './CartBar';
/** Drop-in for {@link CartBar}: identical props, a distinct design. */
export type CartBarV3Props = CartBarProps;
/**
 * CartBar, alternate design **V3** — a *full-width itemised bar*. A surface-
 * toned bar with a top hairline that splits into a summary block (a row of dots
 * previewing how many items are in the cart, plus the running total) and a
 * distinct filled action `Button` — rather than the single filled pill of the
 * base. The Button is the sole activation target so `onClick` never double-
 * fires; empty/`loading` behave as the base. Same props; token-only.
 */
export declare const CartBarV3: React.ForwardRefExoticComponent<CartBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CartBarV3.d.ts.map