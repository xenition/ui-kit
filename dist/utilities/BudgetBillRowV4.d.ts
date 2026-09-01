import * as React from 'react';
import type { BudgetBillRowProps } from './BudgetBillRow';
/** Drop-in for {@link BudgetBillRowProps} — same props, a different design. */
export type BudgetBillRowV4Props = BudgetBillRowProps;
/**
 * BudgetBillRow — **V4** design. A clean, elevated row: the budget-billing glyph
 * in the signature brand-gradient disc, the flat monthly charge, a settle-up
 * balance shown as a signed credit/shortfall (credit → success, shortfall →
 * danger, by sign + label + color, never color alone), and an optional
 * plan-vs-actual progress bar (denominator guarded against zero). All amounts are
 * integer cents via `formatMoney`. Same props/behavior as
 * {@link BudgetBillRowProps}; token-only colors.
 */
export declare const BudgetBillRowV4: React.ForwardRefExoticComponent<BudgetBillRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BudgetBillRowV4.d.ts.map