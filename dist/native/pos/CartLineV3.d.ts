import * as React from 'react';
import type { CartLineProps } from './CartLine';
/** Drop-in alternate of {@link CartLineProps} — identical prop contract. */
export type CartLineV3Props = CartLineProps;
/**
 * CartLine — design variant **V3**: a **dense single line**. Where V1 stacks the
 * qty control below the name and V2 is a card, V3 collapses the whole line onto
 * one hairline-separated row — a small `×qty` chip (or the inline stepper), the
 * name with an inline · modifier summary, and a right-aligned line total — for
 * long, scannable tickets. `voided` strikes + mutes. Same props as
 * {@link CartLineProps}. Token-only; money is integer cents.
 */
export declare function CartLineV3({ name, quantity, unitPriceCents, currency, modifiers, note, discountCents, onQuantityChange, min, max, onVoid, voidLabel, voided, onPress, variant, testID, style, }: CartLineV3Props): React.ReactElement;
//# sourceMappingURL=CartLineV3.d.ts.map