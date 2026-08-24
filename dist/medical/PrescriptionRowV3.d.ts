import * as React from 'react';
import type { PrescriptionRowProps } from './PrescriptionRow';
/** Same public contract as {@link PrescriptionRow} — a drop-in alternate design. */
export type PrescriptionRowV3Props = PrescriptionRowProps;
/**
 * PrescriptionRow, redesigned (v3): a **dense medication line**. The name + dose
 * share a line over a directions·refills subtitle, a status glyph + word marks
 * state (never color alone), and a quiet Refill link shows when due — a single
 * hairline row for a medication list. The opposite of v2's card. Same props,
 * token-only.
 */
export declare const PrescriptionRowV3: React.ForwardRefExoticComponent<PrescriptionRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PrescriptionRowV3.d.ts.map