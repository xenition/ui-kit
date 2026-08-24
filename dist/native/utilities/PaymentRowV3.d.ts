import * as React from 'react';
import type { PaymentRowProps } from './PaymentRow';
/** Same public contract as {@link PaymentRow} — a drop-in alternate design. */
export type PaymentRowV3Props = PaymentRowProps;
/**
 * PaymentRow, redesigned (v3): a **dense scan line**. A small state glyph leads,
 * the method and a middot-joined `date · status · reference` caption stack in the
 * flexible middle, and the amount hugs the right (muted + struck when voided). No
 * disc, no card, no badge — the most compact of the three for long histories.
 * Distinct at a glance from v1/v2. Same props; state is glyph + label text (never
 * color alone); integer cents; token-pure.
 */
export declare function PaymentRowV3({ amountCents, date, status, method, reference, currency, formatMoney: format, onPress, style, }: PaymentRowV3Props): React.ReactElement;
//# sourceMappingURL=PaymentRowV3.d.ts.map