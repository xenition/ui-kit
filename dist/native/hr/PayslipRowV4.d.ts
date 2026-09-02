import * as React from 'react';
import { type MoneyFormatter } from '../../commerce/money';
import type { PayslipStatus } from './internal';
import type { PayslipRowProps } from './PayslipRow';
export interface PayslipRowV4Props extends PayslipRowProps {
    /** Why the payment failed. Shown when the status is adverse. */
    failureReason?: string;
    /** What the date under the period is called, per status. */
    dateLabels?: Partial<Record<PayslipStatus, string>>;
    /** Money formatter, for a locale the default cannot reach. */
    formatMoney?: MoneyFormatter;
    /** Caption over the gross figure. Default `'Gross'`. */
    grossLabel?: string;
    /** Caption over the deductions figure. Default `'Deductions'`. */
    deductionsLabel?: string;
}
/**
 * **V4 payslip row** — same props as {@link PayslipRow} plus `failureReason`,
 * `dateLabels`, `formatMoney`, `grossLabel` and `deductionsLabel`.
 *
 * ## Five changes
 *
 * 1. **A failed payment does not say "Paid".** The base printed the literal
 *    word `Paid ` before `payDate` regardless of `status`, so a failed run
 *    rendered **"Paid 15 Aug"** directly above a red "✕ Failed" pill — the row
 *    told the employee their money had arrived and, an inch away, that it had
 *    not. The caption is now chosen by status through `dateLabels`, which is
 *    also where a caller replaces the English.
 * 2. **A failure says why.** `failed` was one of six adverse statuses in the
 *    module with nowhere to put a reason, and it is the one where the employee
 *    can do something about it — a closed account, a stale sort code.
 * 3. **A refunded deduction reads as a credit.** The base prepended a literal
 *    `−` to `formatMoney(deductionsCents)`, so `deductionsCents={-5000}` — how
 *    most payroll APIs sign a refund — rendered **"−-$50.00"**.
 *    `deductionParts()` formats the magnitude and picks the sign from the
 *    direction, so a refund is `+$50.00` and reads as money coming back.
 * 4. **Money takes a formatter**, and the captions are props: `formatMoney`'s
 *    third `locale` argument was unreachable, and "Gross" and "Deductions" were
 *    hard-coded English in a payroll component.
 * 5. **The row announces its whole state** — period, net, status, date, gross,
 *    deductions and the failure reason. The base named itself "Payslip Aug
 *    1–15, net $3,200.00" and dropped the status, so a reader was told the
 *    money arrived when it had not.
 *
 * **Renders nothing without a `period`.**
 */
export declare function PayslipRowV4({ period, netCents, grossCents, deductionsCents, currency, status, payDate, variant, failureReason, dateLabels, formatMoney, grossLabel, deductionsLabel, onPress, testID, style, }: PayslipRowV4Props): React.ReactElement | null;
//# sourceMappingURL=PayslipRowV4.d.ts.map