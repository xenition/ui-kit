import * as React from 'react';
import { type MoneyFormatter } from '../commerce';
export type TreatmentVariant = 'facial' | 'massage' | 'body' | 'nails' | 'hair' | 'wellness';
export interface TreatmentCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
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
    /** Fires when the card body is activated. */
    onClick?: () => void;
}
/**
 * A spa/salon treatment card: a hero image band with a category tag, the
 * treatment name, a duration · price meta line, an optional description, and a
 * "Book" CTA. `variant` sets the icon/tag/accent; a missing image degrades to a
 * token-tinted band with the category glyph. When `onClick` is set the body is a
 * `role="button"` with keyboard support. Prices are integer cents via
 * {@link formatMoney}. Token-only colors.
 */
export declare const TreatmentCard: React.ForwardRefExoticComponent<TreatmentCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TreatmentCard.d.ts.map