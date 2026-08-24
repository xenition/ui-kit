import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type PriceTickerVariant = 'compact' | 'detailed';
export interface PriceTickerProps {
    /** Asset symbol/ticker (e.g. `BTC`). */
    symbol: string;
    /** Optional long name (`Bitcoin`) — shown in the `detailed` variant. */
    name?: string;
    /** Current price in fiat major units. */
    price: number;
    /** 24h change as a percentage (e.g. `2.4` → `+2.40%`; negative = loss). */
    changePct?: number;
    /** Fiat symbol for the price (default `$`). */
    currencySymbol?: string;
    /** Fraction digits for the price (default `2`). */
    priceDecimals?: number;
    /** Optional recent-price series drawn as a token-toned sparkline. */
    spark?: number[];
    variant?: PriceTickerVariant;
    /** Show a spinner-free skeleton while the quote loads. */
    loading?: boolean;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single live-price line: symbol/name on the left, price + a token-toned
 * change on the right. Gains read `success`, losses `danger`, and each change
 * is prefixed with a ▲/▼ glyph so direction is never color-only. The
 * `detailed` variant adds the long name and an optional {@link Sparkline}.
 * Prices/percentages are formatted with fixed precision — no float drift.
 */
export declare function PriceTicker({ symbol, name, price, changePct, currencySymbol, priceDecimals, spark, variant, loading, onPress, style, }: PriceTickerProps): React.ReactElement;
//# sourceMappingURL=PriceTicker.d.ts.map