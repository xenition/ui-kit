import * as React from 'react';
import type { InspectionResult, InspectionRowProps } from './InspectionRow';
export interface InspectionRowV4Props extends InspectionRowProps {
    /** Override the four result names — they lived inside the component. */
    resultLabels?: Partial<Record<InspectionResult, string>>;
}
/**
 * **V4 inspection row** — same props as {@link InspectionRow} plus
 * `resultLabels`.
 *
 * ## Four changes
 *
 * 1. **The defect note is announced.** The row's name was
 *    `"${label}, ${result}"`, which replaces the subtree — so on a *failed*
 *    checkpoint the one thing a technician needs, the inspector's note saying
 *    what is wrong with it, was the thing the label threw away. The reference
 *    code went with it.
 * 2. **The result is announced once.** The disc carried an
 *    `accessibilityLabel` and the badge carried the same word, so a reader
 *    heard "Fail" twice for one checkpoint. The disc is decorative now.
 * 3. **The row is a row from the shared row line** — one height that clears
 *    44, one 44 leading slot, one press fill — instead of a 36px disc on a
 *    `paddingVertical: sm` box that dimmed itself to `0.7` when held.
 * 4. **The caller's `style` lands on the root**, the element the web twin puts
 *    it on; here it went *inside* the pressable, so the same prop moved two
 *    different boxes on the two platforms.
 *
 * **Renders nothing without a `label`.**
 */
export declare function InspectionRowV4({ label, result, code, note, resultLabels, onPress, style, }: InspectionRowV4Props): React.ReactElement | null;
//# sourceMappingURL=InspectionRowV4.d.ts.map