import * as React from 'react';
import type { BenefitCardProps, BenefitStatus, BenefitType } from './BenefitCard';
export interface BenefitCardV4Props extends BenefitCardProps {
    /** Why the case was denied or suspended. Rendered when the status is adverse. */
    reason?: string;
    /** Override the seven programme words (`'Food assistance'`, `'Housing'`, …). */
    typeLabels?: Partial<Record<BenefitType, string>>;
    /** Override the six status words (`'Suspended'`, `'Expiring soon'`, …). */
    statusLabels?: Partial<Record<BenefitStatus, string>>;
    /** What the next-payment date is called. Default `'Next'`. */
    nextLabel?: string;
}
/**
 * **V4 benefit case card** — same props as {@link BenefitCard} plus `reason`,
 * `typeLabels`, `statusLabels` and `nextLabel`.
 *
 * ## Four changes
 *
 * 1. **A denied or suspended case says why.** The status that stops someone's
 *    food assistance was a pill with no field behind it — the card could say
 *    "Suspended" and nothing else, on the screen a claimant opens to find out
 *    what happened. `isAdverse()` gates the `reason`, which is an assertive
 *    live region.
 * 2. **The card's own controls are reachable.** The base wrapped the whole
 *    card in one `Pressable`, which is `accessible` by default and carries the
 *    card's name, so the status pill and the amount were flattened out of the
 *    tree. The activation now wraps only the glyph-and-text region; the pill
 *    sits beside it.
 * 3. **The case number is not glued to the programme name.** It was
 *    `` `${type} · ${caseNumber}` `` on one truncating line, so a long
 *    programme name took the number off the end of the card — and it was
 *    unlabelled, and it never reached the spoken name along with the next
 *    payment date.
 * 4. **The amount takes the contrast-corrected ink**, not the `primary` fill
 *    slot drawn as text; the programme disc stops wearing `primary` too,
 *    because which programme this is is identity rather than a state; and the
 *    press is a state layer rather than `opacity: 0.85`.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export declare function BenefitCardV4({ name, benefitType, status, amountCents, cadence, caseNumber, nextDate, currency, formatMoney: format, reason, typeLabels, statusLabels, nextLabel, onPress, style, }: BenefitCardV4Props): React.ReactElement | null;
//# sourceMappingURL=BenefitCardV4.d.ts.map