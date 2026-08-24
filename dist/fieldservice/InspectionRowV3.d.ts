import * as React from 'react';
import type { InspectionRowProps } from './InspectionRow';
/**
 * Alternate design (v3) of {@link InspectionRow} — a drop-in with the **same
 * props**. The *dense line*: a small result glyph, the checkpoint label on one
 * row (code inline, muted), and the result word pinned to the trailing edge in
 * its semantic text color. Rows are separated by a hairline bottom border.
 * Result is glyph + label + a token color (pass → success, fail → danger) —
 * never color alone. No literal colors.
 */
export type InspectionRowV3Props = InspectionRowProps;
export declare const InspectionRowV3: React.ForwardRefExoticComponent<InspectionRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=InspectionRowV3.d.ts.map