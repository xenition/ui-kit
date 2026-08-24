import * as React from 'react';
import type { LabResultRowProps } from './LabResultRow';
/** Same public contract as {@link LabResultRow} — a drop-in alternate design. */
export type LabResultRowV2Props = LabResultRowProps;
/**
 * LabResultRow, redesigned (v2): an **elevated result card**. The measured value
 * is set very large as the centrepiece, and a full-width status band across the
 * foot carries the glyph + word flag (Normal / Low / High / Critical) over a
 * tinted fill — so an abnormal result reads instantly yet never on color alone.
 * Analyte name and reference range head the card. Lifted with a shadow and a
 * fade-in mount — distinct at a glance from v1's dense line. Same props,
 * token-pure.
 */
export declare function LabResultRowV2({ name, value, unit, referenceRange, status, collectedAt, onPress, style, }: LabResultRowV2Props): React.ReactElement;
//# sourceMappingURL=LabResultRowV2.d.ts.map