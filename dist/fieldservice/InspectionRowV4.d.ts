import * as React from 'react';
import type { InspectionResult, InspectionRowProps } from './InspectionRow';
export interface InspectionRowV4Props extends InspectionRowProps {
    /** Override the result words — four English labels lived inside. */
    resultLabels?: Partial<Record<InspectionResult, string>>;
}
/**
 * **V4 inspection row** — the web twin of the native `InspectionRowV4`, same
 * props as {@link InspectionRow} plus `resultLabels`.
 *
 * ## Four changes
 *
 * 1. **The defect note is announced.** On a failed checkpoint the note *is*
 *    the reason for the failure — and it was exactly what the row's
 *    `` `${label}, ${result}` `` name replaced. The code goes into the name
 *    too.
 * 2. **The result is announced once.** The glyph disc carried the result as
 *    its accessible label and the pill carried it again, so a reader walking
 *    an inspection sheet heard "Fail, Fail" on every failing line.
 * 3. **An interactive row is a real `<button>`** that clears 44 and answers
 *    with a state layer, not a `div` with `role="button"` and a hand-written
 *    key handler at 36px.
 * 4. **It joins the shared row family**, so an inspection sheet, an equipment
 *    register and a materials list are one row height and one rhythm.
 */
export declare const InspectionRowV4: React.ForwardRefExoticComponent<InspectionRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=InspectionRowV4.d.ts.map