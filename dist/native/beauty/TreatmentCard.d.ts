import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MoneyFormatter } from '../commerce/money';
export type TreatmentVariant = 'facial' | 'massage' | 'body' | 'nails' | 'hair' | 'wellness';
export interface TreatmentCardProps {
    /** Treatment name, e.g. "Deep-tissue massage". */
    name: string;
    /** Price in integer cents. */
    priceCents: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Category; drives icon, tag, and accent. Falls back to `wellness`. */
    variant?: TreatmentVariant;
    /** Duration in minutes. */
    durationMin?: number;
    /** Short description. */
    description?: string;
    /** Hero image URL; a token-tinted band shows when absent. */
    imageUrl?: string;
    /** Override the cents → string money formatter. */
    formatMoney?: MoneyFormatter;
    /** CTA label (default "Book"). Hidden when no `onBook`. */
    bookLabel?: string;
    /** Fires when the CTA is pressed. */
    onBook?: () => void;
    /** Fires when the card body is pressed. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A spa/salon treatment card: a hero image band with a category tag, the
 * treatment name, a duration · price meta line, an optional description, and a
 * "Book" CTA. `variant` sets the icon/tag/accent; a missing image degrades to a
 * token-tinted band with the category glyph. Prices are integer cents via
 * {@link formatMoney}. Token-only colors (semantic slots + `withAlpha`).
 */
export declare function TreatmentCard({ name, priceCents, currency, variant, durationMin, description, imageUrl, formatMoney: format, bookLabel, onBook, onPress, style, }: TreatmentCardProps): React.ReactElement;
//# sourceMappingURL=TreatmentCard.d.ts.map