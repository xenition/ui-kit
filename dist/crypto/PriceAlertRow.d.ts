import * as React from 'react';
/** Fire when the price crosses above / below the target. */
export type AlertCondition = 'above' | 'below';
export interface PriceAlertRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onToggle'> {
    /** Asset symbol the alert watches (e.g. `BTC`). */
    symbol: string;
    /** Trigger direction. */
    condition: AlertCondition;
    /** Target price in fiat major units. */
    targetPrice: number;
    /** Optional current price, shown for context. */
    currentPrice?: number;
    /** Fiat symbol (default `$`). */
    currencySymbol?: string;
    /** Fraction digits for prices (default `2`). */
    decimals?: number;
    /** Whether the alert is armed. */
    enabled?: boolean;
    /** Fires with the next enabled state when the switch is toggled. */
    onToggle?: (enabled: boolean) => void;
}
/**
 * One configurable price alert: the watched symbol, a condition line (glyph +
 * `Above`/`Below` label, so direction is not color-only) with the target price,
 * an optional current-price context line, and a {@link Switch} to arm or disarm
 * it. Prices are fixed-precision — no float drift. The row's opacity drops while
 * disabled to reinforce the state beyond the switch alone. Web parity of the
 * native `PriceAlertRow`.
 */
export declare const PriceAlertRow: React.ForwardRefExoticComponent<PriceAlertRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PriceAlertRow.d.ts.map