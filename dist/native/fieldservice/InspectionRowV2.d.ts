import * as React from 'react';
import type { InspectionRowProps } from './InspectionRow';
/**
 * Alternate design (v2) of {@link InspectionRow} — a drop-in with the **same
 * props**. Where the original is a thin row with a small disc, V2 is an
 * *elevated checkpoint card* fronted by a large **pass / fail marker** (a
 * tinted square carrying the result glyph), the label / code / note stack, and
 * a bold **result banner** down the trailing edge. Result is glyph + label +
 * a token slot (pass→success, fail→danger) — never color alone. Token-pure.
 */
export type InspectionRowV2Props = InspectionRowProps;
export declare function InspectionRowV2({ label, result, code, note, onPress, style, }: InspectionRowV2Props): React.ReactElement;
//# sourceMappingURL=InspectionRowV2.d.ts.map