import * as React from 'react';
/** Price movement direction — colors the change and is stated with a glyph/sign. */
export type PriceDirection = 'up' | 'down' | 'flat';
export interface MarketPriceRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Commodity name (e.g. "Wheat"). */
    commodity: string;
    /** Current price (pre-formatted or numeric, e.g. `284.50`). */
    price: number | string;
    /** Currency / unit suffix (e.g. "€/t", "$/bu"). */
    unit?: string;
    /** Percentage change over the period (e.g. `1.8` or `-0.6`). Guarded. */
    changePct?: number;
    /** Explicit direction; otherwise derived from the sign of `changePct`. */
    direction?: PriceDirection;
    /** Leading glyph/emoji. Default `'🌾'`. */
    icon?: string;
    /** Market / period hint (e.g. "Chicago · today"). */
    market?: string;
    /** Hide the bottom divider (last row in a list). */
    last?: boolean;
    /** Fires when the row is activated. */
    onClick?: () => void;
}
/**
 * A market-price row — commodity glyph + name, the current price with unit, and
 * a change readout. The change carries a direction glyph (`▲`/`▼`/`▪`) and an
 * explicit sign alongside its color, so the movement reads without color alone.
 * `changePct` is guarded and the direction defaults to the sign of the change.
 * When `onClick` is set the row is an accessible `role="button"` with keyboard
 * activation. Token-bound throughout — no literal colors.
 */
export declare const MarketPriceRow: React.ForwardRefExoticComponent<MarketPriceRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MarketPriceRow.d.ts.map