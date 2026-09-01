import * as React from 'react';
import type { PaymentMethodTileProps } from './PaymentMethodTile';
/** Drop-in for {@link PaymentMethodTileProps} — same props, the V4 "register" design. */
export type PaymentMethodTileV4Props = PaymentMethodTileProps;
/**
 * PaymentMethodTile — **V4** "register" design. A tactile tender tile: the method
 * glyph sits in a **soft-tint disc**, the word beside/under it (never color
 * alone), with an optional amount. A big (≥44px) tap target; `selected` lifts
 * with an accent ring + token-tinted fill and a `✓`, all carried in
 * `accessibilityState.selected`. Same props/behavior as
 * {@link PaymentMethodTileProps}; token-only: accent from the method tone, tints
 * via `withAlpha` (no literals).
 */
export declare function PaymentMethodTileV4({ method, label, selected, disabled, amountCents, currency, onPress, variant, testID, style, }: PaymentMethodTileV4Props): React.ReactElement;
//# sourceMappingURL=PaymentMethodTileV4.d.ts.map