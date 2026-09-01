import * as React from 'react';
import type { AlertSeverity, CivicAlertProps } from './CivicAlert';
export interface CivicAlertV4Props extends CivicAlertProps {
    /** Override the four severity words (`'Emergency'`, `'Warning'`, …). */
    severityLabels?: Partial<Record<AlertSeverity, string>>;
    /** What the dismiss control says once it is armed. Default `'Confirm dismiss'`. */
    confirmDismissLabel?: string;
}
/**
 * **V4 civic alert** — same props as {@link CivicAlert} plus `severityLabels`
 * and `confirmDismissLabel`.
 *
 * ## Four changes
 *
 * 1. **It announces.** The base's docstring said "uses the RN `alert`
 *    accessibility role so screen readers announce it". That role sets no
 *    announcement behaviour on React Native at all without
 *    `accessibilityLiveRegion`, so the module's emergency banner was silent.
 *    An emergency or a warning is `assertive`; information and an advisory are
 *    `polite`, because announcing everything teaches a user to ignore
 *    everything.
 * 2. **The message joins the name.** The container's name was
 *    `` `${severity}: ${title}` `` — the field carrying "evacuate via Route 9"
 *    sat outside it, so the reader got the headline and none of the
 *    instruction. Severity, title, message, source and time are one sentence.
 * 3. **Dismiss takes a confirming press.** An emergency alert was dismissed
 *    irreversibly on one tap of a bare glyph, and the component offers no way
 *    to bring it back. The first press arms the control and shows
 *    `confirmDismissLabel`; the second dismisses.
 * 4. **Dismiss is a real target with a real name**, 44 with a state layer,
 *    where it was a hit-slopped glyph drawn at `opacity: 0.5` — which is inside
 *    M3's disabled band, so a pressed dismiss read as an unavailable one. The
 *    severity word takes the contrast-corrected ink rather than the fill slot
 *    it is tinted from.
 */
export declare function CivicAlertV4({ severity, title, message, source, time, actionLabel, onAction, onDismiss, severityLabels, confirmDismissLabel, style, }: CivicAlertV4Props): React.ReactElement;
//# sourceMappingURL=CivicAlertV4.d.ts.map