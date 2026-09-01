import * as React from 'react';
import type { ServiceChecklistProps } from './ServiceChecklist';
export interface ServiceChecklistV4Props extends ServiceChecklistProps {
    /** The sentence under the empty title. Default `'Items will appear here once added.'`. */
    emptyDescription?: string;
    /** The word marking a mandatory task. Default `'Required'`. */
    requiredLabel?: string;
    /** The progress bar's accessible name. Default `'Checklist progress'`. */
    progressLabel?: string;
}
/**
 * **V4 service checklist** — the web twin of the native `ServiceChecklistV4`,
 * same props as {@link ServiceChecklist} plus `emptyDescription`,
 * `requiredLabel` and `progressLabel`.
 *
 * ## Five changes
 *
 * 1. **Complete means complete.** The bar compared a *rounded* percentage
 *    against 100, and `clampPct` rounds — so 199 of 200 turned the bar
 *    "complete" green with an item still outstanding. `isComplete()` counts.
 * 2. **Requiredness is a word.** It was a red asterisk, which is invisible to
 *    a screen reader and to anyone who cannot separate it from the label's own
 *    punctuation. The word joins the checkbox's accessible name too.
 * 3. **The progress bar has a name.** It announced a bare percentage with
 *    nothing saying what was progressing.
 * 4. **The whole row toggles and clears 44.** The target was a 24px box on a
 *    surface used one-handed, outdoors, in gloves; the `<label>` now carries
 *    the row.
 * 5. **A checklist with no `onToggle` is not a wall of live checkboxes.** They
 *    were fully controlled, so they could be clicked forever and never change.
 */
export declare const ServiceChecklistV4: React.ForwardRefExoticComponent<ServiceChecklistV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ServiceChecklistV4.d.ts.map