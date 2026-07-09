import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MoneyFormatter } from './money';
export interface PriceTagProps {
    /** Current price in integer cents. */
    cents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Optional "was" price in cents; struck through when higher than `cents`. */
    compareAtCents?: number;
    /** Override the cents → string formatter (locale control). */
    formatMoney?: MoneyFormatter;
    /** Visual scale of the current price (default `md`). */
    size?: 'sm' | 'md' | 'lg';
    style?: StyleProp<ViewStyle>;
}
/**
 * Formatted price with an optional strikethrough "compare-at" — the native
 * mirror of the web `PriceTag`. All money is integer cents formatted through
 * {@link formatMoney} (overridable via `formatMoney`). Token-only: the current
 * price reads `on-surface`, the struck original is `muted`.
 */
export declare function PriceTag({ cents, currency, compareAtCents, formatMoney: format, size, style, }: PriceTagProps): React.ReactElement;
//# sourceMappingURL=PriceTag.d.ts.map