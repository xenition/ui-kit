import * as React from 'react';
import type { AlertSeverity, CivicAlertProps } from './CivicAlert';
export interface CivicAlertV4Props extends CivicAlertProps {
    /** Override the four severity words — `'Information'`, `'Emergency'`. */
    severityLabels?: Partial<Record<AlertSeverity, string>>;
    /** How dismiss names itself once armed. Default `'Confirm dismiss'`. */
    confirmDismissLabel?: string;
}
/**
 * **V4 civic alert** — the web twin of the native `CivicAlertV4`, same props as
 * {@link CivicAlert} plus `severityLabels` and `confirmDismissLabel`.
 *
 * ## Four changes
 *
 * 1. **It actually announces.** The base put `role="alert"` on the banner
 *    itself — content present at first paint. A live region announces
 *    *changes*, so a banner that is already in the tree when the region is
 *    created is read out by nobody, and the ordinary case is the only case an
 *    emergency banner has. V4 keeps a live region whose text arrives one commit
 *    after mount, and reserves `assertive` for `warning` and `emergency`:
 *    announcing everything teaches a user to ignore everything.
 * 2. **The message is inside the name.** `aria-label={`${severity}: ${title}`}`
 *    on the container replaced its own subtree, so the field carrying "evacuate
 *    via Route 9" — the sentence the alert exists for — never reached a reader.
 *    The container no longer names itself; the announcement carries severity,
 *    title, message, source and time in that order.
 * 3. **Dismissing an emergency takes a second press.** One tap removed the
 *    banner irreversibly and the component offers no way to restore it. The
 *    control arms first, renames itself, and disarms on blur.
 * 4. **Dismiss is a target.** It was a bare 14×20 glyph with no padding at all —
 *    the smallest control in the module, on the component people tap while
 *    moving. It clears 44, answers with a state layer rather than a fade, and
 *    the eyebrow takes the contrast-corrected ink instead of the `primary` /
 *    `warn` / `danger` **fill** used as words on a tint of itself.
 */
export declare const CivicAlertV4: React.ForwardRefExoticComponent<CivicAlertV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CivicAlertV4.d.ts.map