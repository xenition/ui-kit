import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Visual treatment of a {@link ThankYouCard}. */
export type ThankYouCardVariant = 'default' | 'celebratory';
export interface ThankYouCardProps {
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
    /** Fires when the share action is pressed (rendered when provided). */
    onShare?: () => void;
    /** Fires when the receipt action is pressed (rendered when provided). */
    onViewReceipt?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A post-donation confirmation card: a celebratory glyph, a thank-you headline
 * (optionally naming the donor and their gift amount in integer cents), a
 * mission message, an optional concrete impact line, and share / receipt
 * actions. `celebratory` renders on a tinted accent panel (`withAlpha`). All
 * colors come from the compiled theme tokens — no literal colors.
 */
export declare function ThankYouCard({ donorName, amountCents, currency, headline, message, impactLabel, variant, onShare, onViewReceipt, style, }: ThankYouCardProps): React.ReactElement;
//# sourceMappingURL=ThankYouCard.d.ts.map