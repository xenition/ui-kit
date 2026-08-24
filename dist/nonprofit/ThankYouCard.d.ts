import * as React from 'react';
/** Visual treatment of a {@link ThankYouCard}. */
export type ThankYouCardVariant = 'default' | 'celebratory';
export interface ThankYouCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Recipient of the thanks; omit for an anonymous gift. */
    donorName?: string;
    /** The gift amount, integer **cents** (rendered when provided). */
    amountCents?: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Custom headline (defaults to a thank-you built from the name). */
    headline?: string;
    /** Supporting message / mission line. */
    message?: string;
    /** Optional concrete impact line, e.g. `Funds 40 meals`. */
    impactLabel?: string;
    /** Visual treatment. `celebratory` adds a tinted accent panel. */
    variant?: ThankYouCardVariant;
    /** Fires when the share action is clicked (rendered when provided). */
    onShare?: () => void;
    /** Fires when the receipt action is clicked (rendered when provided). */
    onViewReceipt?: () => void;
}
/**
 * Web parity of the native `ThankYouCard`: a post-donation confirmation card — a
 * celebratory glyph, a thank-you headline (optionally naming the donor and their
 * gift amount in integer cents), a mission message, an optional concrete impact
 * line, and share / receipt actions. `celebratory` renders on a tinted primary
 * panel. All colors come from the `--xen-*` token classes — no literal colors.
 */
export declare const ThankYouCard: React.ForwardRefExoticComponent<ThankYouCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ThankYouCard.d.ts.map