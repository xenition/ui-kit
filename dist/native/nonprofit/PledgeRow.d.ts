import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Lifecycle of a pledge. */
export type PledgeStatus = 'pending' | 'fulfilled' | 'overdue' | 'declined';
export interface PledgeRowProps {
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
    /** Fires when the row is pressed (e.g. to open detail). */
    onPress?: () => void;
    /** Block the fulfill action. */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single pledge in a campaign ledger: donor avatar + name, the pledged amount
 * (integer cents → `formatMoney`), a status badge, and — for still-open pledges
 * — a "Mark fulfilled" action. Status is carried by both the badge text and
 * `accessibilityLabel`, never color alone. All colors come from the compiled
 * theme tokens — no literal colors.
 */
export declare function PledgeRow({ donorName, avatarUrl, amountCents, currency, status, dueLabel, onFulfill, onPress, loading, style, }: PledgeRowProps): React.ReactElement;
//# sourceMappingURL=PledgeRow.d.ts.map