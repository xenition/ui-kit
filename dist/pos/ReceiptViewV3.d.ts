import * as React from 'react';
import type { ReceiptViewProps } from './ReceiptView';
/** Same public contract as {@link ReceiptView} — a drop-in alternate design. */
export type ReceiptViewV3Props = ReceiptViewProps;
/**
 * ReceiptView, redesigned (v3): a **compact total-first summary**. The grand total
 * leads as a hero figure with the merchant + reference beneath; item lines fold
 * into a quiet list and tenders sit as small method chips. A digital-receipt card
 * distinct from v1/v2's ledger. Same props, token-only.
 */
export declare const ReceiptViewV3: React.ForwardRefExoticComponent<ReceiptViewProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ReceiptViewV3.d.ts.map