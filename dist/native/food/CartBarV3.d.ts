import * as React from 'react';
import type { CartBarProps } from './CartBar';
/** Drop-in for {@link CartBar}: identical props, a distinct design. */
export type CartBarV3Props = CartBarProps;
/**
 * CartBar, alternate design **V3** — a *full-width itemised bar*. A surface-
 * toned bar with a top hairline that splits into a summary block (a row of dots
 * previewing how many items are in the cart, plus the running total) and a
 * distinct filled action Button — rather than the classic single filled pill.
 * The whole bar is pressable when `onPress` is set; empty/`loading` behave as
 * the classic. Same props as the classic.
 */
export declare function CartBarV3({ itemCount, totalCents, currency, label, onPress, variant, loading, emptyLabel, formatMoney, style, }: CartBarV3Props): React.ReactElement;
//# sourceMappingURL=CartBarV3.d.ts.map