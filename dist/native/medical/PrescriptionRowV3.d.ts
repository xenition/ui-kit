import * as React from 'react';
import type { PrescriptionRowProps } from './PrescriptionRow';
/** Same public contract as {@link PrescriptionRow} — a drop-in alternate design. */
export type PrescriptionRowV3Props = PrescriptionRowProps;
/**
 * PrescriptionRow, redesigned (v3): a **dense line with a status chip**. The
 * drug name and (middot-joined) dose / directions share one flexible line, and
 * a compact tinted status chip (glyph + word) hugs the right edge. No pill tile,
 * no card, no separate refill button — a lean formulary line tuned for long med
 * lists (a refill-due row still reads its "↻ Refill due" chip). Distinct at a
 * glance from v1's row and v2's card. Same props, token-pure.
 */
export declare function PrescriptionRowV3({ name, dose, frequency, refillsLeft, status, onRefill, onPress, style, }: PrescriptionRowV3Props): React.ReactElement;
//# sourceMappingURL=PrescriptionRowV3.d.ts.map