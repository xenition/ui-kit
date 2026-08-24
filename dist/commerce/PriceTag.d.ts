import * as React from 'react';
import { MoneyFormatter } from './money';
export interface PriceTagProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Current price in integer cents. */
    cents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Optional "was" price in cents; shown struck-through when higher than `cents`. */
    compareAtCents?: number;
    /** Override the cents → string formatter (locale control, custom symbols). */
    formatMoney?: MoneyFormatter;
    /** Visual scale of the current price (default `md`). */
    size?: 'sm' | 'md' | 'lg';
}
/**
 * Formatted price with an optional strikethrough "compare-at" original. All
 * money is integer cents formatted through {@link formatMoney} (overridable
 * via the `formatMoney` prop). Token-only: the sale price reads `on-surface`,
 * the struck original is `muted`.
 */
export declare const PriceTag: React.ForwardRefExoticComponent<PriceTagProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=PriceTag.d.ts.map