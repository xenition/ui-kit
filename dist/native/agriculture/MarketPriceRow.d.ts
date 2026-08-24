import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Price movement direction — colors the change and is stated with a glyph/sign. */
export type PriceDirection = 'up' | 'down' | 'flat';
export interface MarketPriceRowProps {
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
    /** Fires when the row is tapped. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A market-price row — commodity glyph + name, the current price with unit, and
 * a change readout. The change carries a direction glyph (`▲`/`▼`/`▪`) and an
 * explicit sign alongside its color, so the movement reads without color alone.
 * `changePct` is guarded and the direction defaults to the sign of the change.
 * Tappable via `onPress` (accessible button). Token-bound — no literal colors.
 */
export declare function MarketPriceRow({ commodity, price, unit, changePct, direction, icon, market, last, onPress, style, }: MarketPriceRowProps): React.ReactElement;
//# sourceMappingURL=MarketPriceRow.d.ts.map