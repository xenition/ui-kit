import * as React from 'react';
import type { JobSiteCardProps } from './JobSiteCard';
export interface JobSiteCardV4Props extends JobSiteCardProps {
    /** The directions action's label. Default `'Directions'`. */
    directionsLabel?: string;
}
/**
 * **V4 job-site card** — the web twin of the native `JobSiteCardV4`, same
 * props as {@link JobSiteCard} plus `directionsLabel`.
 *
 * ## Four changes
 *
 * 1. **Enter on "Directions" gets directions.** The card's `onKeyDown` caught
 *    the keydown bubbling out of the nested Directions `<button>` and ran
 *    `e.preventDefault()` followed by a synthesised `currentTarget.click()` —
 *    and Enter's default action on a button *is* the click it had just
 *    cancelled, so a keyboard user pressed Enter on Directions and opened the
 *    site card instead. The `stopPropagation` on the click handler covered
 *    only the pointer path. Directions is now a **sibling** of the card's
 *    activation rather than a descendant of it, which is the shape that cannot
 *    have the bug: there is nothing left to bubble, nothing to stop, and no
 *    synthesised click.
 * 2. **The activation is a real `<button>`.** A `div` with `role="button"`, a
 *    `tabIndex` and a hand-written Enter/Space handler is three approximations
 *    of what a button already does — including the one it got wrong above.
 * 3. **The card's name carries the site's payload** — the crew count, the open
 *    orders and the distance, all of which the short label replaced.
 * 4. **`scheduled` and `active` stop wearing status colours** (a stage is not
 *    an outcome), the disc is decorative rather than a second reader stop, and
 *    Directions clears 44.
 */
export declare const JobSiteCardV4: React.ForwardRefExoticComponent<JobSiteCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=JobSiteCardV4.d.ts.map