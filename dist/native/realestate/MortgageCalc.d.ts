import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** The derived figures a {@link MortgageCalc} reports on each change. */
export interface MortgageEstimate {
    /** Monthly principal + interest payment, in integer cents. */
    monthlyCents: number;
    /** Financed amount (price − down payment), in integer cents. */
    loanCents: number;
    /** Down payment, in integer cents. */
    downCents: number;
}
export interface MortgageCalcProps {
    /** Home price in integer minor units (cents). */
    priceCents: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Initial down-payment percent (default 20). */
    downPercent?: number;
    /** Initial annual interest rate percent (default 6.5). */
    ratePercent?: number;
    /** Loan term in years (default 30). */
    termYears?: number;
    /** Card heading. */
    title?: string;
    /** Fires whenever an input changes, with the recomputed estimate. */
    onChange?: (estimate: MortgageEstimate) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * Interactive mortgage estimator — editable down-payment and interest-rate
 * fields over a fixed home price, computing the amortized monthly payment plus
 * the financed loan amount. Fully self-contained (no fetch); reports every
 * recompute through `onChange`. Rate/percent inputs are clamped and parsed
 * defensively, and a zero rate falls back to straight division. Token-only
 * colors; the money display uses the shared `formatMoney`.
 */
export declare function MortgageCalc({ priceCents, currency, downPercent, ratePercent, termYears, title, onChange, style, }: MortgageCalcProps): React.ReactElement;
//# sourceMappingURL=MortgageCalc.d.ts.map