import * as React from 'react';
/** The derived figures a {@link MortgageCalc} reports on each change. */
export interface MortgageEstimate {
    /** Monthly principal + interest payment, in integer cents. */
    monthlyCents: number;
    /** Financed amount (price − down payment), in integer cents. */
    loanCents: number;
    /** Down payment, in integer cents. */
    downCents: number;
}
export interface MortgageCalcProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
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
}
/**
 * Web parity of the native `MortgageCalc`: an interactive mortgage estimator —
 * editable down-payment and interest-rate fields over a fixed home price,
 * computing the amortized monthly payment plus the financed loan amount. Fully
 * self-contained (no fetch); reports every recompute through `onChange`. Rate /
 * percent inputs are clamped and parsed defensively, and a zero rate falls back
 * to straight division (no divide-by-zero). All colors come from the `--xen-*`
 * tokens — no literal colors; money uses the shared `formatMoney`.
 */
export declare const MortgageCalc: React.ForwardRefExoticComponent<MortgageCalcProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MortgageCalc.d.ts.map