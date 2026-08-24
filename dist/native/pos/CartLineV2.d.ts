import * as React from 'react';
import type { CartLineProps } from './CartLine';
/** Drop-in alternate of {@link CartLineProps} — identical prop contract. */
export type CartLineV2Props = CartLineProps;
/**
 * CartLine — design variant **V2**: an **elevated card** with a token-tinted
 * thumbnail plate. Where V1 is a flat row, V2 gives the line its own floating
 * surface — a rounded plate carrying the item's initials (the kit ships no image
 * loader, so a line never blanks), a title + modifiers/note header, and a footer
 * that pairs the inline {@link QuantityStepper} with a bold line total and a
 * per-line discount. `voided` strikes + mutes (state by text, not color alone).
 * Same props as {@link CartLineProps}. Token-only; money is integer cents.
 */
export declare function CartLineV2({ name, quantity, unitPriceCents, currency, modifiers, note, discountCents, onQuantityChange, min, max, onVoid, voidLabel, voided, onPress, variant, testID, style, }: CartLineV2Props): React.ReactElement;
//# sourceMappingURL=CartLineV2.d.ts.map