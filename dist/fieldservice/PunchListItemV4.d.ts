import * as React from 'react';
import type { PunchListItemProps, PunchSeverity } from './PunchListItem';
export interface PunchListItemV4Props extends PunchListItemProps {
    /** Override the severity words — three English words lived inside. */
    severityLabels?: Partial<Record<PunchSeverity, string>>;
}
/**
 * **V4 punch-list item** — the web twin of the native `PunchListItemV4`, same
 * props as {@link PunchListItem} plus `severityLabels`.
 *
 * ## Four changes
 *
 * 1. **The whole row toggles, and it clears 44.** The target was a 16px
 *    checkbox on a surface used one-handed, outdoors, in gloves — while the
 *    description beside it, which is the part a thumb actually lands on, did
 *    nothing at all. The `<label>` now carries the row.
 * 2. **Severity, location and assignee join the control's name.** The
 *    checkbox announced the description alone, so a reader signing off a punch
 *    list heard the defect but never that it was critical, never where it was,
 *    and never whose it was.
 * 3. **An item with no `onToggle` is disabled, not enabled-and-inert.** The
 *    checkbox was fully controlled, so without a handler it could be clicked
 *    forever and never move.
 * 4. **It joins the shared row family** and takes the module's one badge
 *    shape, so a punch list and an inspection sheet read as one product.
 */
export declare const PunchListItemV4: React.ForwardRefExoticComponent<PunchListItemV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PunchListItemV4.d.ts.map