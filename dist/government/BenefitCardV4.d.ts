import * as React from 'react';
import type { BenefitCardProps, BenefitStatus, BenefitType } from './BenefitCard';
export interface BenefitCardV4Props extends BenefitCardProps {
    /** Why the case was denied or suspended. Rendered and announced when adverse. */
    reason?: string;
    /** Override the seven programme words — `'Food assistance'`, `'Housing'`, … */
    typeLabels?: Partial<Record<BenefitType, string>>;
    /** Override the six status words — `'Active'`, `'Suspended'`, … */
    statusLabels?: Partial<Record<BenefitStatus, string>>;
    /** What the next payment date is called. Default `'Next'`. */
    nextLabel?: string;
}
/**
 * **V4 benefit card** — the web twin of the native `BenefitCardV4`, same props
 * as {@link BenefitCard} plus `reason`, `typeLabels`, `statusLabels` and
 * `nextLabel`.
 *
 * ## Five changes
 *
 * 1. **A suspension says why, and announces.** The status that stops someone's
 *    food assistance was a pill and nothing else — the interface had no field
 *    for the reason at all. `reason` renders under the header whenever
 *    {@link isAdverse} is true, and reaches a polite live region one commit
 *    after mount, because a live region announces *changes* and text present at
 *    first paint is read by nobody.
 * 2. **The card's name carries the money and the dates.** The fixed
 *    `` `${name}, ${type}, ${status}` `` template dropped the amount, the
 *    cadence, the next payment date and the case number — everything a
 *    claimant opens the card for — and `role="button"` made the subtree
 *    presentational, so none of it was reachable another way.
 * 3. **The case number is labelled and on its own line**, instead of glued to
 *    the programme type with a bare `·` so a reader hears "Housing dot
 *    SNP-4471".
 * 4. **The amount is ink, not a fill.** `text-primary` is the *fill* slot with
 *    no contrast promise as words; the headline figure takes `primary-text`.
 *    The programme disc likewise stops being `bg-primary-50` — a ramp step that
 *    mirrors under `[data-theme="dark"]` — and takes the neutral identity tint,
 *    because a benefit type is identity and has no status to report.
 * 5. **An interactive card is a real `<button>` that clears 44 and answers with
 *    a state layer**, not a `div` with `role="button"`, a hand-written
 *    Enter/Space handler, `hover:opacity-90` (M3's *disabled* signal) and a
 *    `primary-300` focus ring off the neutral ramp.
 */
export declare const BenefitCardV4: React.ForwardRefExoticComponent<BenefitCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BenefitCardV4.d.ts.map