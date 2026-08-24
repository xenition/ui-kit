import * as React from 'react';
import type { CartLineProps } from './CartLine';
/** Same public contract as {@link CartLine} — a drop-in alternate design. */
export type CartLineV3Props = CartLineProps;
/**
 * CartLine, redesigned (v3): a **dense ticket line**. A leading `N×` quantity, the
 * name inline, and the line total pinned right, with a stepper only when editable
 * and a small void ×. Hairline-bordered for a tight running ticket. The opposite
 * of v2's card. Same props, token-only.
 */
export declare const CartLineV3: React.ForwardRefExoticComponent<CartLineProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CartLineV3.d.ts.map