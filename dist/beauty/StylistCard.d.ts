import * as React from 'react';
import { type MoneyFormatter } from '../commerce';
export type StylistCardVariant = 'detailed' | 'compact';
export interface StylistCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Stylist / practitioner name. */
    name: string;
    /** Role or title, e.g. "Senior Colorist". */
    role?: string;
    /** Specialties / tags (e.g. `['Balayage', 'Bridal']`). Guarded when empty. */
    specialties?: string[];
    /** Avatar image URL; initials fall back when absent. */
    avatarUrl?: string;
    /** Average rating (0–5). Hidden when omitted. */
    rating?: number;
    /** Number of reviews backing the rating. */
    reviewCount?: number;
    /** "From" price in integer cents. */
    priceFromCents?: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Override the cents → string money formatter. */
    formatMoney?: MoneyFormatter;
    /** Availability note (e.g. "Next: Today 3pm"). */
    availability?: string;
    /** Marks the stylist fully booked; disables the CTA. */
    fullyBooked?: boolean;
    /** Density. `compact` drops specialties + CTA. */
    variant?: StylistCardVariant;
    /** Loading skeleton (ignores data). */
    loading?: boolean;
    /** CTA label (default "Book"). */
    bookLabel?: string;
    /** Fires when the CTA is pressed. */
    onBook?: () => void;
    /** Fires when the card body is activated. */
    onClick?: () => void;
}
/**
 * A stylist / practitioner profile card: avatar, name + role, an optional star
 * rating with review count, specialty chips, a "from" price and availability
 * line, plus a "Book" CTA. `variant="compact"` drops the chips and CTA for list
 * rows; `loading` shows a token-tinted skeleton; `fullyBooked` disables the CTA
 * and swaps its label. When `onClick` is set the body is a `role="button"` with
 * keyboard support. Token-only colors.
 */
export declare const StylistCard: React.ForwardRefExoticComponent<StylistCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StylistCard.d.ts.map