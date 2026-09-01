import * as React from 'react';
import type { MortgageCalcProps } from './MortgageCalc';
/** Drop-in for {@link MortgageCalcProps} — same props, the V4 "listing" design. */
export type MortgageCalcV4Props = MortgageCalcProps;
/**
 * MortgageCalc — **V4** "listing" design. The editorial, price-forward take on
 * the estimator: the computed **monthly payment as a big numeral** up top, then
 * soft-primary sliders for down-payment and interest rate over a fixed home
 * price, and a small principal-vs-interest breakdown bar beneath. Same
 * props/behavior as {@link MortgageCalcProps} — the compute logic and `onChange`
 * estimate are preserved; a zero rate falls back to straight division. Token-only
 * colors via `useXenitionTheme()`; the money display uses the shared `formatMoney`.
 */
export declare function MortgageCalcV4({ priceCents, currency, downPercent, ratePercent, termYears, title, onChange, style, }: MortgageCalcV4Props): React.ReactElement;
//# sourceMappingURL=MortgageCalcV4.d.ts.map