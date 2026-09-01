import * as React from 'react';
import type { SafetyChecklistProps, SafetyVerdict } from './SafetyChecklist';
export interface SafetyChecklistV4Props extends SafetyChecklistProps {
    /**
     * How the armed row is named while it waits for its confirming press.
     * Default `` (label) => `Confirm clearing hazard: ${label}` ``.
     */
    confirmHazardLabel?: (label: string) => string;
    /** Override the verdict words — three English words lived inside. */
    verdictLabels?: Partial<Record<SafetyVerdict, string>>;
    /** The word for a blocking hazard. Default `'Hazard'`. */
    hazardLabel?: string;
    /** Build the hazard banner's sentence. */
    formatHazardCount?: (count: number) => string;
}
/**
 * **V4 safety checklist** — the web twin of the native `SafetyChecklistV4`,
 * same props as {@link SafetyChecklist} plus `confirmHazardLabel`,
 * `verdictLabels`, `hazardLabel` and `formatHazardCount`.
 *
 * ## Five changes
 *
 * 1. **A glove brushing the screen no longer certifies a site as safe.** A
 *    failing fall-protection anchor showed a red "Hazard — do not proceed"
 *    banner over a 40px row, tapped one-handed and outdoors. One tap moved the
 *    row `fail → unchecked`, which dropped it out of the hazard count,
 *    unmounted the banner and flipped the header to "All clear" — with no
 *    confirmation, no undo, and no prop through which a caller could ask for
 *    either. `clearsHazard()` names that one transition: the first press arms
 *    the row and says so, in the accessible name *and* on screen, and only the
 *    second press calls `onToggle`. Every other transition is unchanged and
 *    immediate, because passing is the ordinary case and making it cost two
 *    taps would be a worse component rather than a safer one.
 * 2. **The row's name says what pressing will do**, and carries the hazard
 *    flag. `` `${label}, ${verdict}` `` replaced the subtree, so the one word
 *    that decides whether a technician walks onto the site — "Hazard" — was
 *    the word the label dropped.
 * 3. **The verdict is announced once.** The glyph disc had an accessible label
 *    of its own, so a reader said "Fail" from the disc and "Fail" again from
 *    the row.
 * 4. **A checklist with no handler is not a wall of live buttons.** Without
 *    `onToggle` every row was a fully controlled control that could be pressed
 *    forever and never change; the rows are now plain text.
 * 5. **Rows clear 44 and answer with a state layer**, not `hover:opacity-80` —
 *    a dimmed row reads as an unavailable one.
 */
export declare const SafetyChecklistV4: React.ForwardRefExoticComponent<SafetyChecklistV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SafetyChecklistV4.d.ts.map