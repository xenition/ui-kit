import * as React from 'react';
import { type PaymentMethod } from './internal';
export interface ShiftPaymentBreakdown {
    /** Tender type. */
    method: PaymentMethod;
    /** Total taken with this tender, in integer **cents**. */
    amountCents: number;
    /** Transaction count for this tender. */
    count?: number;
}
export type ShiftReportVariant = 'summary' | 'detailed';
export interface ShiftReportProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    /** Cashier / operator name. */
    cashier?: string;
    /** Register / terminal id. */
    registerId?: string;
    /** Pre-formatted shift window (e.g. "9:00 AM – 5:00 PM"). */
    period?: string;
    /** Gross sales in integer **cents**. */
    grossSalesCents: number;
    /** Refunds issued in cents. */
    refundsCents?: number;
    /** Discounts given in cents. */
    discountsCents?: number;
    /** Tax collected in cents. */
    taxCents?: number;
    /** Net (gross − refunds) in cents; derived when omitted. */
    netSalesCents?: number;
    /** Transaction count over the shift. */
    transactionCount?: number;
    /** Expected cash in drawer, in cents (for the variance line). */
    expectedCashCents?: number;
    /** Counted cash in drawer, in cents (for the variance line). */
    countedCashCents?: number;
    /** ISO 4217 currency (default USD). */
    currency?: string;
    /** Per-tender breakdown. When empty a labelled {@link EmptyState} renders. */
    breakdown?: ShiftPaymentBreakdown[];
    /** `detailed` (default) shows the breakdown + cash variance; `summary` omits them. */
    variant?: ShiftReportVariant;
    /** Empty-state copy for a shift with no sales. */
    emptyLabel?: string;
    /** Parity alias for `data-testid`. */
    testID?: string;
}
/**
 * End-of-shift Z-report card — the DOM parity of the native `ShiftReport`:
 * header (cashier / register / window), the headline metrics (gross, refunds,
 * discounts, tax, net, transactions), an optional per-tender breakdown, and a
 * cash-count variance drawn as a **glyph + word** pill (over/short/balanced —
 * never color alone). All money is integer **cents** via `formatMoney`. A shift
 * with no sales renders an {@link EmptyState}. Composed from `Card` +
 * `StatusPill`; token-only colors.
 */
export declare const ShiftReport: React.ForwardRefExoticComponent<ShiftReportProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ShiftReport.d.ts.map