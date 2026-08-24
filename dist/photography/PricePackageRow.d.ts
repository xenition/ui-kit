import * as React from 'react';
import { type MoneyFormatter } from '../commerce';
export interface PricePackageRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** À-la-carte line label (e.g. "Extra edited photo"). */
    label: string;
    /** Supporting detail line. */
    description?: string;
    /** Price in integer cents. */
    priceCents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Unit suffix (e.g. "each", "/ hour"). */
    unitSuffix?: string;
    /** Highlights the row (accent tint + optional badge). */
    highlighted?: boolean;
    /** Small badge text (e.g. "Best value"). */
    badgeLabel?: string;
    /** Override the cents → string formatter. */
    formatMoney?: MoneyFormatter;
}
/**
 * A compact à-la-carte price line — label, optional detail, and a right-aligned
 * {@link PriceTag} with a unit suffix. `highlighted` gives the row an accent
 * tint and shows an optional `badgeLabel` (a labelled marker, not color alone).
 * Passing `onClick` exposes it as a keyboard-operable `button` for quote
 * building. Composes `Badge` and `PriceTag`. Token-only colors.
 */
export declare const PricePackageRow: React.ForwardRefExoticComponent<PricePackageRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PricePackageRow.d.ts.map