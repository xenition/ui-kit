import * as React from 'react';
/** Cadence of a recurring gift. */
export type GiftFrequency = 'weekly' | 'monthly' | 'quarterly' | 'yearly';
/** Lifecycle of a recurring gift. */
export type RecurringGiftStatus = 'active' | 'paused' | 'canceled';
export interface RecurringGiftRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Per-cycle amount, integer **cents**. */
    amountCents: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Billing cadence. */
    frequency: GiftFrequency;
    /** Program / fund name the gift supports. */
    fund?: string;
    /** Pre-formatted next-charge label (e.g. `Next: Sep 1`). */
    nextChargeLabel?: string;
    /** Current status (default `active`). */
    status?: RecurringGiftStatus;
    /** Fires when an active gift is paused. */
    onPause?: () => void;
    /** Fires when a paused gift is resumed. */
    onResume?: () => void;
    /** Fires when the gift is canceled (rendered when provided). */
    onCancel?: () => void;
    /** Block the action buttons (web `Button` has no `loading`, so they disable). */
    loading?: boolean;
}
/**
 * Web parity of the native `RecurringGiftRow`: a managed recurring-gift row —
 * the per-cycle amount (integer cents → `formatMoney`) with its cadence suffix,
 * the supported fund, a next-charge hint, a status badge, and pause / resume /
 * cancel controls appropriate to the status. Status is carried by badge text +
 * the row `aria-label`, not color alone. All colors come from the `--xen-*`
 * token classes — no literal colors.
 */
export declare const RecurringGiftRow: React.ForwardRefExoticComponent<RecurringGiftRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RecurringGiftRow.d.ts.map