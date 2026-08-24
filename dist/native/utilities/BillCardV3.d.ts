import * as React from 'react';
import type { BillCardProps } from './BillCard';
/** Same public contract as {@link BillCard} — a drop-in alternate design. */
export type BillCardV3Props = BillCardProps;
/**
 * BillCard, redesigned (v3): a **dense scan line**. A small state dot leads, the
 * provider and a middot-joined `line · account · status · due` caption share the
 * flexible middle, and the amount hugs the right with an optional compact pay
 * button beneath it. No card, no glyph tile — tuned for long bill lists. Distinct
 * at a glance from v1/v2. Same props; status is dot + glyph + label text (never
 * color alone); integer cents; token-pure.
 */
export declare function BillCardV3({ kind, provider, accountNumber, amountCents, dueDate, status, currency, formatMoney: format, payLabel, onPay, paying, onPress, style, }: BillCardV3Props): React.ReactElement;
//# sourceMappingURL=BillCardV3.d.ts.map