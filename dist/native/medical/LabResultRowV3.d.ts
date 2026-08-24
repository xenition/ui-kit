import * as React from 'react';
import type { LabResultRowProps } from './LabResultRow';
/** Same public contract as {@link LabResultRow} — a drop-in alternate design. */
export type LabResultRowV3Props = LabResultRowProps;
/**
 * LabResultRow, redesigned (v3): a **dense scan line**. The analyte name leads
 * one flexible line, the value + unit hug the right edge, and the flag reduces
 * to a leading glyph + word ("▲ High") in an AA-safe status color — never color
 * alone. No card, no reference stack — a lean line tuned for long panels; the
 * reference range collapses under the name only when present. Distinct at a
 * glance from v1's row and v2's value card. Same props, token-pure.
 */
export declare function LabResultRowV3({ name, value, unit, referenceRange, status, collectedAt, onPress, style, }: LabResultRowV3Props): React.ReactElement;
//# sourceMappingURL=LabResultRowV3.d.ts.map