import * as React from 'react';
import type { SafetyChecklistProps, SafetyVerdict } from './SafetyChecklist';
export interface SafetyChecklistV4Props extends SafetyChecklistProps {
    /**
     * The name the row takes once a hazard clearance is armed and waiting for
     * the confirming press. Default `` `Confirm clearing hazard: ${label}` ``.
     */
    confirmHazardLabel?: (label: string) => string;
    /** Override the three verdict names — they lived inside the component. */
    verdictLabels?: Partial<Record<SafetyVerdict, string>>;
    /** Announced and shown for a blocking checkpoint. Default `'Hazard'`. */
    hazardLabel?: string;
    /** Build the hazard banner's sentence from the blocking-failure count. */
    formatHazardCount?: (count: number) => string;
}
/**
 * **V4 safety checklist** — same props as {@link SafetyChecklist} plus
 * `confirmHazardLabel`, `verdictLabels`, `hazardLabel` and `formatHazardCount`.
 *
 * ## Five changes
 *
 * 1. **A stray tap no longer certifies a site as safe.** The base cycled
 *    `fail → unchecked` on one press: that dropped the item out of the hazard
 *    count, unmounted the red "Hazard — do not proceed" banner and flipped the
 *    header to "All clear" — on a 40px target, tapped one-handed, outdoors, in
 *    gloves, with no confirmation and no prop a host app could use to ask for
 *    one. `clearsHazard()` names that one transition; when it is true the first
 *    press only **arms** the row, says so through `confirmHazardLabel`, and a
 *    second press does the work. Every other transition is unchanged and
 *    immediate, because passing is the ordinary case and making it cost two
 *    taps would be a worse component rather than a safer one.
 * 2. **The row says what pressing will do, and carries the hazard flag.** The
 *    base's name was `"${label}, ${verdict}"`, which replaced the subtree — so
 *    the ⚠ Hazard badge beside it was never spoken. The name now carries it,
 *    and the hint carries the verdict the next press records.
 * 3. **A row you cannot change is not a button.** Without `onToggle` the base
 *    still rendered a live `Pressable` that did nothing at all.
 * 4. **Rows clear 44 and press as a state layer.** 40px and `opacity: 0.7`
 *    both go — 0.38 is M3's *disabled* band, so dimming a pressed row made it
 *    read as unavailable.
 * 5. **The verdict is announced once.** The disc carried an
 *    `accessibilityLabel`, so a reader stopped on it and then read the same
 *    verdict again out of the row; it is decorative now.
 */
export declare function SafetyChecklistV4({ title, items, onToggle, loading, emptyLabel, confirmHazardLabel, verdictLabels, hazardLabel, formatHazardCount, style, }: SafetyChecklistV4Props): React.ReactElement;
//# sourceMappingURL=SafetyChecklistV4.d.ts.map