import * as React from 'react';
import type { ServiceChecklistProps } from './ServiceChecklist';
export interface ServiceChecklistV4Props extends ServiceChecklistProps {
    /** The empty state's next-step sentence. The base hard-coded one beside a prop-driven title. */
    emptyDescription?: string;
    /** The word a mandatory task wears, in place of the red asterisk. Default `'Required'`. */
    requiredLabel?: string;
    /** The progress bar's accessible name. Default `'Checklist progress'`. */
    progressLabel?: string;
}
/**
 * **V4 service checklist** — same props as {@link ServiceChecklist} plus
 * `emptyDescription`, `requiredLabel` and `progressLabel`.
 *
 * ## Five changes
 *
 * 1. **Complete means complete.** The base compared a **rounded** percentage
 *    against 100 — and `clampPct` rounds — so 199 tasks of 200 turned the bar
 *    green with an item still outstanding. `isComplete(completed, total)`
 *    answers the question with counts; a percentage is for drawing.
 * 2. **Requiredness is a word.** A red asterisk is colour and punctuation, one
 *    of which a colour-blind user cannot see and the other of which a screen
 *    reader may not read at all. `requiredLabel` is a neutral chip beside the
 *    task and joins the control's spoken name.
 * 3. **The progress bar has a name.** It announced a bare percentage, so a
 *    reader heard a number with nothing attached to it.
 * 4. **The whole row toggles**, as it already did on the web twin — the base
 *    made only the 20px box hittable, on a screen used in gloves.
 * 5. **A checklist nobody can tick is not enabled.** With no `onToggle` the
 *    base still rendered live checkboxes that could be pressed forever and
 *    never changed.
 */
export declare function ServiceChecklistV4({ title, tasks, onToggle, loading, disabled, emptyLabel, emptyDescription, requiredLabel, progressLabel, style, }: ServiceChecklistV4Props): React.ReactElement;
//# sourceMappingURL=ServiceChecklistV4.d.ts.map