import * as React from 'react';
import type { PunchListItemProps, PunchSeverity } from './PunchListItem';
export interface PunchListItemV4Props extends PunchListItemProps {
    /** Override the three severity names — they lived inside the component. */
    severityLabels?: Partial<Record<PunchSeverity, string>>;
}
/**
 * **V4 punch list item** — same props as {@link PunchListItem} plus
 * `severityLabels`.
 *
 * ## Four changes
 *
 * 1. **The whole row toggles**, and the target clears 44. The base put the
 *    entire affordance on a 20px box with no `hitSlop` — 16px on the web twin
 *    — on a list a superintendent walks a site with, one-handed, in gloves.
 * 2. **Severity, location and assignee join the control's name.** The
 *    checkbox announced the description and nothing else, so "Critical" and
 *    who owns the defect never reached a reader.
 * 3. **A checkbox nobody can tick is not enabled.** With no `onToggle` the
 *    base still rendered a live control that could be pressed forever and
 *    never changed; it now says it cannot be changed.
 * 4. **The row is a row from the shared row line**, with the shared press
 *    fill and the module's one badge shape — the base drew no press feedback
 *    at all, so pressing a row answered nothing.
 *
 * **Renders nothing without a `label`.**
 */
export declare function PunchListItemV4({ label, done, severity, location, assignee, severityLabels, onToggle, disabled, style, }: PunchListItemV4Props): React.ReactElement | null;
//# sourceMappingURL=PunchListItemV4.d.ts.map