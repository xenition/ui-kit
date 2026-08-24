import * as React from 'react';
/** Lifecycle of a pledge. */
export type PledgeStatus = 'pending' | 'fulfilled' | 'overdue' | 'declined';
export interface PledgeRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Donor name. */
    donorName: string;
    /** Avatar image URL (initials fallback otherwise). */
    avatarUrl?: string;
    /** Pledged amount, integer **cents**. */
    amountCents: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Pledge status (default `pending`). */
    status?: PledgeStatus;
    /** Pre-formatted due-date label (e.g. `Due Sep 1`). */
    dueLabel?: string;
    /** Fires when a pending/overdue pledge is marked fulfilled. */
    onFulfill?: () => void;
    /** Fires when the row is clicked (e.g. to open detail; mirrors native `onPress`). */
    onClick?: () => void;
    /** Block the fulfill action (web `Button` has no `loading`, so it is disabled). */
    loading?: boolean;
}
/**
 * Web parity of the native `PledgeRow`: a single pledge in a campaign ledger —
 * donor avatar + name, the pledged amount (integer cents → `formatMoney`), a
 * status badge, and — for still-open pledges — a "Mark fulfilled" action button.
 * Status is carried by both the badge text and the row `aria-label`, never color
 * alone. When `onClick` is set the row is a `role="button"` target with keyboard
 * activation; the fulfill button stops propagation so it does not also open the
 * row. All colors come from the `--xen-*` token classes — no literal colors.
 */
export declare const PledgeRow: React.ForwardRefExoticComponent<PledgeRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PledgeRow.d.ts.map