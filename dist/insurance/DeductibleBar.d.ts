import * as React from 'react';
import { type MoneyFormatter } from './internal/format';
export interface DeductibleBarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Amount already applied toward the deductible, in integer **cents**. */
    metCents: number;
    /** Deductible ceiling, in integer **cents**. */
    deductibleCents: number;
    /** Label above the bar (default "Deductible"). */
    label?: string;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Override the cents → string formatter (locale control). */
    formatMoney?: MoneyFormatter;
}
/**
 * Progress toward an annual deductible: a token `Progress` bar sized to
 * `met / deductible` with a "met of ceiling" caption and a remaining/"met"
 * line. The bar tone shifts as the deductible is satisfied — `warn` in
 * progress, `success` once fully met — both tracing to semantic token slots. A
 * `deductibleCents <= 0` ceiling is guarded (treated as fully met, no
 * divide-by-zero). Amounts are integer cents via `formatMoney`. Web parity of
 * the native `DeductibleBar`.
 */
export declare const DeductibleBar: React.ForwardRefExoticComponent<DeductibleBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DeductibleBar.d.ts.map