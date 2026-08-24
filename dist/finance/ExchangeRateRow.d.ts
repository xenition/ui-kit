import * as React from 'react';
export interface ExchangeRateRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
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
    /** Fires on row click — makes the row a keyboard-operable button. */
    onClick?: () => void;
}
/**
 * A currency-pair quote row: `BASE → QUOTE`, the rate at fixed precision, and an
 * optional signed change chip (up = `text-success`, down = `text-danger`). The
 * rate is a display-only number formatted to `precision` decimals via `toFixed`,
 * so the shown value never drifts. Colors trace to tokens; becomes a button when
 * `onClick` is given. Web parity of the native `ExchangeRateRow`.
 */
export declare const ExchangeRateRow: React.ForwardRefExoticComponent<ExchangeRateRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ExchangeRateRow.d.ts.map