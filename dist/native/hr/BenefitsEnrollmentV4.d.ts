import * as React from 'react';
import { type MoneyFormatter } from '../../commerce/money';
import type { BenefitsEnrollmentProps } from './BenefitsEnrollment';
export interface BenefitsEnrollmentV4Props extends BenefitsEnrollmentProps {
    /** Name of the enroll action. Default `'Enroll'` / `'Complete enrollment'`. */
    enrollLabel?: string;
    /** Money formatter, for a locale the default cannot reach. */
    formatMoney?: MoneyFormatter;
    /** Build the deadline line. Default `` `Enroll by ${date}` ``. */
    formatEnrollBy?: (date: string) => string;
}
/**
 * **V4 benefits enrollment** — same props as {@link BenefitsEnrollment} plus
 * `enrollLabel`, `formatMoney` and `formatEnrollBy`.
 *
 * ## Five changes
 *
 * 1. **Enroll is reachable.** It was a `Button` inside the card's own
 *    `Pressable`, which is `accessible` by default and flattens its whole
 *    subtree into one leaf named "Benefit PPO Gold, Eligible" — so during open
 *    enrollment the one action with a deadline on it was not a focus stop. The
 *    card is a plain `CardV4`; the activation wraps only the plan region and
 *    the button is its sibling.
 * 2. **Benefit type stops being a status.** `retirement` was toned `success`,
 *    `health` and `vision` `primary`, `dental` `accent` — four kinds of plan
 *    wearing four semantic colours, so a benefits screen used up green before
 *    anything was actually enrolled. A type is identity: glyph, word, neutral
 *    chip.
 * 3. **Money takes a formatter.** `formatMoney`'s third `locale` argument was
 *    unreachable, so a per-period premium printed in the runtime's default
 *    locale regardless of where the employee is paid.
 * 4. **The copy is props.** "Enroll", "Complete enrollment" and "Enroll by"
 *    were hard-coded English on a deadline the employee must not miss.
 * 5. **The card announces the whole plan** — name, type, coverage, cost,
 *    deadline and status — where the base said "Benefit PPO Gold, Eligible".
 *
 * The enroll button is `variant="soft"` on **both** twins; the web base spelled
 * it `secondary`, so the same call to action carried a different weight per
 * platform.
 *
 * **Renders nothing without a `planName`.**
 */
export declare function BenefitsEnrollmentV4({ planName, type, status, coverage, costCents, costPeriod, currency, enrollBy, actionable, variant, enrollLabel, formatMoney, formatEnrollBy, onEnroll, onPress, testID, style, }: BenefitsEnrollmentV4Props): React.ReactElement | null;
//# sourceMappingURL=BenefitsEnrollmentV4.d.ts.map