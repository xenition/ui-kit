import * as React from 'react';
import type { LeaveType } from './internal';
export type LeaveBalanceV4Variant = 'default' | 'compact';
export interface LeaveBalanceV4Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Category of leave — supplies the glyph and, unless overridden, the name. */
    type?: LeaveType;
    /** Name of the balance. Defaults to the leave type's own label. */
    label?: string;
    /** Days accrued this period. */
    accruedDays: number;
    /** Days already taken out of the entitlement. */
    takenDays: number;
    /** Days carried over from the previous period. Counts toward the entitlement. */
    carryoverDays?: number;
    /** The period this balance covers, pre-formatted (e.g. `'2026'`). */
    periodLabel?: string;
    /** Density. `compact` drops the breakdown row. */
    variant?: LeaveBalanceV4Variant;
    /** Render a day count. Default `'12 days'` / `'1 day'`. */
    formatDays?: (days: number) => string;
    /** Caption on the accrued figure. Default `'Accrued'`. */
    accruedLabel?: string;
    /** Caption on the taken figure. Default `'Taken'`. */
    takenLabel?: string;
    /** Caption on the headline figure. Default `'Remaining'`. */
    remainingLabel?: string;
    /** Caption on the carried-over figure. Default `'Carryover'`. */
    carryoverLabel?: string;
    /**
     * The word an over-drawn balance shows in place of a negative figure.
     * Default `'Over entitlement'`.
     */
    overdrawnLabel?: string;
    /** Opens the balance's detail (web parity of the native `onPress`). */
    onClick?: () => void;
    /** Test hook, matching the rest of the module. */
    testID?: string;
}
/**
 * **V4 leave balance** — a new component, so it has no base to extend.
 *
 * ## Why it exists
 *
 * `LeaveRequest` asks for `days` and the module has nowhere to say what those
 * days are being taken **out of**. An employee looking at "3 days — Pending"
 * cannot tell whether that is a third of what they have left or more than they
 * are owed, and a manager approving it is in the same position. Every other
 * quantity in `hr` has its context beside it — gross against net, overtime
 * against hours worked, goals against a target — and the one number an
 * employee actually plans around had none.
 *
 * ## Four things it is careful about
 *
 * 1. **The entitlement is accrued *plus* carryover.** Carried-over days are
 *    spendable; a balance that meters against the accrual alone tells someone
 *    they are out of leave while five carried days sit unused.
 * 2. **Remaining never goes negative.** Payroll systems do let a balance go
 *    under — a taken figure past the entitlement is real — so the meter fills
 *    to 100% and the overage is stated as a word rather than drawn as a bar
 *    running off its own track.
 * 3. **The meter is a real `progressbar`** with its value exposed, and it is a
 *    sibling of any activation rather than a child of it: inside a
 *    `role="button"` a `progressbar`'s value is presentational and dropped.
 * 4. **The overage word is a prop.** Every other visible string here is
 *    {@link LeaveBalanceV4Props.accruedLabel} and its neighbours, and this one
 *    sits on the figure a person acts on, so it is
 *    {@link LeaveBalanceV4Props.overdrawnLabel} rather than an English literal
 *    a caller cannot reach — and it reaches the spoken name too, which used to
 *    say "Remaining 0 days" and stop there.
 */
export declare const LeaveBalanceV4: React.ForwardRefExoticComponent<LeaveBalanceV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LeaveBalanceV4.d.ts.map