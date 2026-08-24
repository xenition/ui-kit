import * as React from 'react';
import type { PrescriptionRowProps } from './PrescriptionRow';
/** Same public contract as {@link PrescriptionRow} — a drop-in alternate design. */
export type PrescriptionRowV2Props = PrescriptionRowProps;
/**
 * PrescriptionRow, redesigned (v2): an **elevated medication card**. A pill glyph
 * tile leads, the medication name + dose head the body over a directions line and
 * a refills-left chip, a tinted status pill (glyph + word) sits top-right, and a
 * Refill CTA shows when due. Distinct from v1's flat row. Same props, token-only.
 */
export declare const PrescriptionRowV2: React.ForwardRefExoticComponent<PrescriptionRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PrescriptionRowV2.d.ts.map