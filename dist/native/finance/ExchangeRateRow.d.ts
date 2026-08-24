import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface ExchangeRateRowProps {
    /** Base (from) currency code, e.g. `"USD"`. */
    baseCurrency: string;
    /** Quote (to) currency code, e.g. `"EUR"`. */
    quoteCurrency: string;
    /** Units of quote per one unit of base (e.g. `0.92`). */
    rate: number;
    /** Percentage change vs the prior period; tints + arrow (up = success). */
    changePct?: number;
    /** Number of decimals shown for the rate (default `4`). */
    precision?: number;
    /** Fires on row press. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A currency-pair quote row: `BASE → QUOTE`, the rate at fixed precision, and an
 * optional signed change chip (up = `success`, down = `danger`). The rate is a
 * display-only number formatted to `precision` decimals via `toFixed`, so the
 * shown value never drifts. Colors trace to tokens; becomes a button when
 * `onPress` is given.
 */
export declare function ExchangeRateRow({ baseCurrency, quoteCurrency, rate, changePct, precision, onPress, style, }: ExchangeRateRowProps): React.ReactElement;
//# sourceMappingURL=ExchangeRateRow.d.ts.map