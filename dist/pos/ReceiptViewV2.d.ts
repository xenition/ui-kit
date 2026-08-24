import * as React from 'react';
import type { ReceiptViewProps } from './ReceiptView';
/** Same public contract as {@link ReceiptView} — a drop-in alternate design. */
export type ReceiptViewV2Props = ReceiptViewProps;
/**
 * ReceiptView, redesigned (v2): a **printed paper receipt**. Centered merchant +
 * address, a dashed tear rule, monospace-tabular item lines, a totals ledger, the
 * tenders with method glyphs + derived change, and a centered footer. A literal
 * till-roll look distinct from v1. Same props, token-only.
 */
export declare const ReceiptViewV2: React.ForwardRefExoticComponent<ReceiptViewProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ReceiptViewV2.d.ts.map