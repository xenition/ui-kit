import * as React from 'react';
import type { LabResultRowProps } from './LabResultRow';
/** Same public contract as {@link LabResultRow} — a drop-in alternate design. */
export type LabResultRowV2Props = LabResultRowProps;
/**
 * LabResultRow, redesigned (v2): an **elevated result card**. The analyte name
 * leads; the measured value is a large figure colored by status with the unit
 * beside it and the reference range beneath; a tinted status pill (glyph + word)
 * anchors the right. Distinct from v1's flat line. Same props, token-only.
 */
export declare const LabResultRowV2: React.ForwardRefExoticComponent<LabResultRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LabResultRowV2.d.ts.map