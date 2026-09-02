import * as React from 'react';
import { type MoneyFormatter } from '../commerce/money';
import type { BenefitsEnrollmentProps } from './BenefitsEnrollment';
export interface BenefitsEnrollmentV4Props extends BenefitsEnrollmentProps {
    /**
     * Copy on the enroll action. Defaults to `'Complete enrollment'` while
     * `pending` and `'Enroll'` otherwise — the two strings the base hard-coded.
     */
    enrollLabel?: string;
    /** Render the cost. Defaults to the shared `formatMoney`. */
    formatMoney?: MoneyFormatter;
    /** Build the deadline line. Default `` `Enroll by ${date}` ``. */
    formatEnrollBy?: (date: string) => string;
    /** Test hook. Every native `hr` component had one; no web one did. */
    testID?: string;
}
/**
 * **V4 benefits enrollment** — the web twin of the native
 * `BenefitsEnrollmentV4`, same props as {@link BenefitsEnrollment} plus
 * `enrollLabel`, `formatMoney`, `formatEnrollBy` and `testID`.
 *
 * ## Five changes
 *
 * 1. **Enrolling from the keyboard actually enrolls.** Enroll was a
 *    `<Button>` inside a `<Card role="button">` with its own Enter/Space
 *    handler. Its click was guarded with `stopPropagation`; its keydown was
 *    not, and the card's `preventDefault()` on the bubbled Enter cancels the
 *    button's own activation — so an employee tabbing to Enroll during open
 *    enrollment opened the plan detail and enrolled in nothing, before a
 *    deadline. The card is a plain container now and Enroll is a **sibling**
 *    of its activation.
 * 2. **The card is one accessible name.** `Benefit PPO Gold, Eligible`
 *    dropped the coverage tier, the cost and the enrollment deadline — the
 *    three facts the decision is made on.
 * 3. **Benefit type stops spending a status colour.** `retirement: success`
 *    and `dental: accent` made a plan list read as a scoreboard; the glyph
 *    already says what kind of plan it is.
 * 4. **Enroll is drawn the same way on both twins.** Web passed
 *    `variant="secondary"` and native `variant="soft"`, so the same action had
 *    two weights. Both are `soft`, and it clears 44.
 * 5. **Money is overridable and column-aligned.** `formatMoney`'s third
 *    `locale` argument was unreachable from any prop.
 */
export declare const BenefitsEnrollmentV4: React.ForwardRefExoticComponent<BenefitsEnrollmentV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BenefitsEnrollmentV4.d.ts.map