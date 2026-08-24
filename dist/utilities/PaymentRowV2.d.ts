import * as React from 'react';
import type { PaymentRowProps } from './PaymentRow';
/** Same public contract as {@link PaymentRow} — a drop-in alternate design. */
export type PaymentRowV2Props = PaymentRowProps;
/**
 * PaymentRow, redesigned (v2): a **method card**. The whole payment is a Card: a
 * tinted method-glyph tile leads, the method and reference stack in the middle,
 * and the right column sets the amount big above a status pill. A failed /
 * refunded amount is muted + struck so it reads non-current. Distinct at a glance
 * from v1's bare dense row and v3's line. Same props; state is glyph + label +
 * tone (never color alone); integer cents; token-pure.
 */
export declare const PaymentRowV2: React.ForwardRefExoticComponent<PaymentRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PaymentRowV2.d.ts.map