import * as React from 'react';
import type { MortgageCalcProps } from './MortgageCalc';
/** Drop-in for {@link MortgageCalcProps} — same props, the V4 "listing" design. */
export type MortgageCalcV4Props = MortgageCalcProps;
/**
 * MortgageCalc — **V4** "listing" design (web parity of the native V4). The
 * editorial, price-forward take on the estimator: the computed **monthly
 * payment as a big numeral** up top, then soft-primary sliders for down-payment
 * and interest rate over a fixed home price, and a small principal-vs-interest
 * breakdown bar beneath. Same props/behavior as {@link MortgageCalcProps} — the
 * compute logic and `onChange` estimate are preserved; a zero rate falls back to
 * straight division (no divide-by-zero). All colors from `--xen-*` token classes
 * (no literals); money uses the shared `formatMoney`.
 */
export declare const MortgageCalcV4: React.ForwardRefExoticComponent<MortgageCalcProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MortgageCalcV4.d.ts.map