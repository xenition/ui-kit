import * as React from 'react';
import { type PaymentMethod } from './internal';
export interface ReceiptLine {
    /** Item name. */
    name: string;
    /** Quantity (default 1). */
    quantity?: number;
    /** Line total in integer **cents**. */
    amountCents: number;
    /** Optional muted sub-line (modifiers / notes). */
    detail?: string;
}
export interface ReceiptTender {
    /** Tender type. */
    method: PaymentMethod;
    /** Amount applied in integer **cents**. */
    amountCents: number;
}
export type ReceiptViewVariant = 'full' | 'compact';
export interface ReceiptViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    /** Merchant / store name shown at the top. */
    merchant?: string;
    /** Address / contact lines under the merchant. */
    addressLines?: string[];
    /** Human order/receipt reference. */
    orderNumber?: string;
    /** Pre-formatted timestamp string. */
    timestamp?: string;
    /** Purchased lines. When empty an {@link EmptyState} renders. */
    items: ReceiptLine[];
    /** ISO 4217 currency (default USD). */
    currency?: string;
    /** Subtotal in cents. */
    subtotalCents?: number;
    /** Discount in cents (shown negative). */
    discountCents?: number;
    /** Tax in cents. */
    taxCents?: number;
    /** Tip / gratuity in cents. */
    tipCents?: number;
    /** Grand total in cents. */
    totalCents: number;
    /** Tenders applied (cash/card/…); change is derived when they exceed total. */
    tenders?: ReceiptTender[];
    /** Footer note (e.g. "Thank you!"). */
    footer?: string;
    /** Density. `compact` hides the address block and per-line details. */
    variant?: ReceiptViewVariant;
    /** Empty-state copy when there are no items. */
    emptyLabel?: string;
    /** Parity alias for `data-testid`. */
    testID?: string;
}
/**
 * A token-styled printed-receipt facsimile — the DOM parity of the native
 * `ReceiptView`. Plain `div`/`span`, no printer and no dependency. Header
 * (merchant + address + order ref), item lines, the subtotal / discount / tax /
 * tip / total ladder, tenders with derived change, and a footer. Money is
 * integer **cents** throughout via `formatMoney`. An empty item list renders a
 * labelled {@link EmptyState}. Token-only colors.
 */
export declare const ReceiptView: React.ForwardRefExoticComponent<ReceiptViewProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ReceiptView.d.ts.map