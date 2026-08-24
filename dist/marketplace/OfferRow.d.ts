import * as React from 'react';
/** Lifecycle state of an offer. */
export type OfferStatus = 'pending' | 'accepted' | 'declined' | 'countered' | 'expired';
export interface OfferRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Buyer / party display name. */
    party: string;
    /** Offered amount in integer minor units (cents). */
    amountCents: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Optional avatar image URL. */
    avatarUrl?: string;
    /** Offer status. Default `pending`. */
    status?: OfferStatus;
    /** Relative time label (e.g. "2h ago"). */
    timeLabel?: string;
    /** Optional message/note attached to the offer. */
    note?: string;
    /** Fires when Accept is clicked (only shown for `pending` offers). */
    onAccept?: () => void;
    /** Fires when Decline is clicked (only shown for `pending` offers). */
    onDecline?: () => void;
    /** Fires when Counter is clicked (only shown for `pending` offers). */
    onCounter?: () => void;
}
/**
 * A row in an offers list on a listing — buyer, offered amount, a status chip,
 * an optional note, and Accept / Counter / Decline actions (real `<button>`s,
 * shown only while the offer is `pending`). Presentational: shaped data +
 * callbacks only. Status is carried by both the chip label and tone, never color
 * alone. Reuses `Avatar`, `Badge`, `Button`, and the shared `formatMoney`;
 * token-only colors.
 */
export declare const OfferRow: React.ForwardRefExoticComponent<OfferRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=OfferRow.d.ts.map