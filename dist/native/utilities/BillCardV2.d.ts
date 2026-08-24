import * as React from 'react';
import type { BillCardProps } from './BillCard';
/** Same public contract as {@link BillCard} — a drop-in alternate design. */
export type BillCardV2Props = BillCardProps;
/**
 * BillCard, redesigned (v2): a **lifted hero card**. A tinted header band carries
 * a large utility glyph tile, provider, and a status pill; the body sets the
 * amount big on the left with a bordered **due-date block** (calendar-style tile,
 * tinted danger when overdue) on the right; a full-width pay CTA anchors the
 * bottom. Enters with a fade+rise and springs on press. Distinct at a glance from
 * v1's flat horizontal disc row and v3's dense line. Same props, integer cents,
 * status by glyph+text+tone (never color alone), token-pure.
 */
export declare function BillCardV2({ kind, provider, accountNumber, amountCents, dueDate, status, currency, formatMoney: format, payLabel, onPay, paying, onPress, style, }: BillCardV2Props): React.ReactElement;
//# sourceMappingURL=BillCardV2.d.ts.map