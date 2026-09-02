import * as React from 'react';
import { type MoneyFormatter } from '../commerce/money';
import { type PayslipStatus } from './internal';
import type { PayslipRowProps } from './PayslipRow';
export interface PayslipRowV4Props extends PayslipRowProps {
    /**
     * Why the payment failed.
     *
     * `failed` is the one status on this row a person must act on — a wrong
     * account number, a closed bank — and the row had no field to say which.
     */
    failureReason?: string;
    /**
     * The word before `payDate`, per status. Defaults to `'Paid'` for `paid`,
     * `'Expected'` for a run that has not happened yet (`processing`, `pending`)
     * and `'Attempted'` for `failed`, where the date came and went.
     */
    dateLabels?: Partial<Record<PayslipStatus, string>>;
    /** Render the amounts. Defaults to the shared `formatMoney`. */
    formatMoney?: MoneyFormatter;
    /** Caption over the gross figure. Default `'Gross'`. */
    grossLabel?: string;
    /** Caption over the deductions figure. Default `'Deductions'`. */
    deductionsLabel?: string;
    /** Test hook. Every native `hr` component had one; no web one did. */
    testID?: string;
}
/**
 * **V4 payslip row** — the web twin of the native `PayslipRowV4`, same props as
 * {@link PayslipRow} plus `failureReason`, `dateLabels`, `formatMoney`,
 * `grossLabel`, `deductionsLabel` and `testID`.
 *
 * ## Six changes
 *
 * 1. **A failed payment no longer says "Paid 15 Aug".** The row printed the
 *    literal word `Paid ` before `payDate` whatever the status was, so a
 *    failed payroll run rendered "Paid 15 Aug" one line above a "✕ Failed"
 *    pill and the employee had two contradictory facts and no way to tell
 *    which was true. Only `paid` claims the money moved; see `dateLabels`.
 * 2. **A failure can say why.** See `failureReason`.
 * 3. **A refunded deduction no longer renders "−-$50.00".** The row prepended
 *    a literal U+2212 to `formatMoney(deductionsCents)`, and most payroll APIs
 *    sign a refunded deduction negative. `deductionParts()` formats the
 *    **magnitude** and the sign comes from the direction, so a refund reads as
 *    a credit instead of as a double negative.
 * 4. **The row is one accessible name carrying the status.** `Payslip Aug
 *    1–15, net $3,200.00` told the reader the money had arrived when it had
 *    not — the pill saying otherwise was never announced.
 * 5. **Press and hover are a state layer**, not `hover:bg-neutral-100` — a
 *    ramp step, which mirrors under `[data-theme="dark"]` and paints a
 *    near-white slab across a dark page.
 * 6. **Money is overridable and column-aligned.** `formatMoney`'s third
 *    `locale` argument was unreachable from any prop, and figures that stack
 *    in a column now use tabular figures so they line up. "Gross" and
 *    "Deductions" were hard-coded English in a payroll component; they are
 *    `grossLabel` and `deductionsLabel`.
 */
export declare const PayslipRowV4: React.ForwardRefExoticComponent<PayslipRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PayslipRowV4.d.ts.map