import * as React from 'react';
import type { PaymentMethodTileProps } from './PaymentMethodTile';
/** Drop-in for {@link PaymentMethodTileProps} — same props, the V4 "register" design. */
export type PaymentMethodTileV4Props = PaymentMethodTileProps;
/**
 * PaymentMethodTile — **V4** "register" design (web parity of the native V4). A
 * tactile tender tile: the method glyph sits in a **soft-tint disc**, the word
 * beside/under it (never color alone), with an optional amount in `tabular-nums`.
 * A big (≥44px) tap target; `selected` lifts with an accent ring + soft tint and
 * a `✓`, all carried in `aria-pressed`. Same props/behavior as
 * {@link PaymentMethodTileProps}; accent from the method tone, all colors from
 * `--xen-*` token classes (no literals).
 */
export declare const PaymentMethodTileV4: React.ForwardRefExoticComponent<PaymentMethodTileProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=PaymentMethodTileV4.d.ts.map