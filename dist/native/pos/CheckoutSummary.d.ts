import * as React from 'react';
/**
 * Props for {@link CheckoutSummary} — the register's subtotal → total
 * breakdown with a full-width **Charge** CTA. Presentational only: every value
 * is passed in as integer **cents** and the caller owns the charge action.
 */
export interface CheckoutSummaryProps {
    /** Pre-tax, pre-tip line-item subtotal, in integer **cents**. */
    subtotalCents: number;
    /** Tax amount, in integer **cents**. Row hidden when omitted. */
    taxCents?: number;
    /** Discount amount, in integer **cents**; shown as a negative credit row. Hidden when omitted or `0`. */
    discountCents?: number;
    /** Tip amount, in integer **cents**. Row hidden when omitted or `0`. */
    tipCents?: number;
    /** The grand total to charge, in integer **cents** — the big bold number. */
    totalCents: number;
    /** ISO 4217 currency code for all amounts. Defaults to `'USD'`. */
    currency?: string;
    /** Item count shown beside the total (e.g. `3 items`). Hidden when omitted. */
    itemCount?: number;
    /** Fired when the Charge button is pressed. */
    onCharge?: () => void;
    /**
     * Charge button label. Receives the formatted total so callers can override
     * the copy; defaults to `Charge {total}` (e.g. `Charge $42.00`).
     */
    chargeLabel?: (formattedTotal: string) => string;
    /** When `true`, the Charge button shows a busy state and is disabled. */
    charging?: boolean;
    /** Optional test id forwarded to the root view. */
    testID?: string;
}
/**
 * CheckoutSummary — **V4** "register" design. The tactile close-of-sale panel:
 * a compact **breakdown list** (subtotal, optional discount/tax/tip) in calm
 * `tabular-nums`, a hairline, then the **grand total big and bold** — the
 * number the counter is built around. A full-width primary **Charge** button
 * (≥44px) repeats the total so the tap target reads the amount. Money is
 * integer **cents** throughout via `formatMoney`; token-only colors via
 * `useXenitionTheme()`, dark-mode safe.
 */
export declare function CheckoutSummary({ subtotalCents, taxCents, discountCents, tipCents, totalCents, currency, itemCount, onCharge, chargeLabel, charging, testID, }: CheckoutSummaryProps): React.ReactElement;
//# sourceMappingURL=CheckoutSummary.d.ts.map