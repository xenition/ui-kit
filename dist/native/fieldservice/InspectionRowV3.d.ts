import * as React from 'react';
import type { InspectionRowProps } from './InspectionRow';
/**
 * Alternate design (v3) of {@link InspectionRow} — a drop-in with the **same
 * props**. The *dense line*: a small result glyph, the checkpoint label on one
 * line (code inline, muted), and the result word pinned to the trailing edge.
 * Result is glyph + label + a token slot (pass→success, fail→danger) — never
 * color alone. Token-pure.
 */
export type InspectionRowV3Props = InspectionRowProps;
export declare function InspectionRowV3({ label, result, code, note, onPress, style, }: InspectionRowV3Props): React.ReactElement;
//# sourceMappingURL=InspectionRowV3.d.ts.map