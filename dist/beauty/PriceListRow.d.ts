import * as React from 'react';
import { type MoneyFormatter } from '../commerce';
export type PriceListRowVariant = 'default' | 'section';
export interface PriceListRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Left label — the service/item name, or a section title. */
    label: string;
    /** Price in integer cents. Omit for `section` rows. */
    priceCents?: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Renders "from {price}" when the price is a starting rate. */
    fromPrice?: boolean;
    /** Small note under the label (e.g. duration or "incl. wash"). */
    note?: string;
    /** Duration in minutes, shown as a right-aligned sub-line. */
    durationMin?: number;
    /** Struck-through original price in cents (when discounted). */
    compareAtCents?: number;
    /** `section` renders a subdued header row (bold label, no price). */
    variant?: PriceListRowVariant;
    /** Override the cents → string money formatter. */
    formatMoney?: MoneyFormatter;
}
/**
 * One line of a printed-style salon price list: a left label (+ optional note)
 * and a right-aligned price. `fromPrice` prefixes "from"; `compareAtCents`
 * strikes through the original (via the shared {@link PriceTag}); `durationMin`
 * adds a small sub-line. The `section` variant is a subdued header (bold label,
 * no price). Prices are integer cents via {@link formatMoney}. Token-only colors.
 */
export declare const PriceListRow: React.ForwardRefExoticComponent<PriceListRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PriceListRow.d.ts.map