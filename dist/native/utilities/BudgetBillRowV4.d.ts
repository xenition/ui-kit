import * as React from 'react';
import type { BudgetBillRowProps } from './BudgetBillRow';
/** Drop-in for {@link BudgetBillRowProps} — same props, a different design. */
export type BudgetBillRowV4Props = BudgetBillRowProps;
/**
 * BudgetBillRow — **V4** design. An elevated row: the budget-billing glyph in
 * the signature brand-gradient disc, the flat monthly charge, a settle-up balance
 * shown as a signed credit/shortfall (credit → success, shortfall → danger, by
 * sign + label + color, never color alone), and an optional plan-vs-actual
 * progress bar (denominator guarded against zero). All amounts are integer cents
 * via `formatMoney`. Same props as {@link BudgetBillRowProps}; token-only colors.
 */
export declare function BudgetBillRowV4({ label, monthlyCents, balanceCents, actualToDateCents, plannedToDateCents, reviewDate, currency, formatMoney: format, style, }: BudgetBillRowV4Props): React.ReactElement;
//# sourceMappingURL=BudgetBillRowV4.d.ts.map