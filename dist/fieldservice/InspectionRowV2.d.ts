import * as React from 'react';
import type { InspectionRowProps } from './InspectionRow';
/**
 * Alternate design (v2) of {@link InspectionRow} — a drop-in with the **same
 * props**. Where the base is a thin row with a small disc, V2 is an *elevated
 * checkpoint card* fronted by a large **pass / fail marker** (a tinted square
 * carrying the result glyph), the label / code / note stack, and a soft result
 * banner on the trailing edge. Result is glyph + label + a token slot
 * (pass → success, fail → danger) — never color alone. No literal colors.
 */
export type InspectionRowV2Props = InspectionRowProps;
export declare const InspectionRowV2: React.ForwardRefExoticComponent<InspectionRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=InspectionRowV2.d.ts.map