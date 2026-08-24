import * as React from 'react';
export type PriceTickerVariant = 'compact' | 'detailed';
export interface PriceTickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
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
    /** Show a skeleton while the quote loads. */
    loading?: boolean;
    /** Fires on click — makes the row a keyboard-operable button. */
    onClick?: () => void;
}
/**
 * A single live-price line: symbol/name on the left, price + a token-toned
 * change on the right. Gains read `success`, losses `danger`, and each change
 * is prefixed with a ▲/▼ glyph so direction is never color-only. The
 * `detailed` variant adds the long name and an optional {@link Sparkline}.
 * Prices/percentages are fixed-precision — no float drift. Web parity of the
 * native `PriceTicker`.
 */
export declare const PriceTicker: React.ForwardRefExoticComponent<PriceTickerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PriceTicker.d.ts.map