import * as React from 'react';
import type { WorkOrderCardProps } from './WorkOrderCard';
/**
 * Alternate design (v3) of {@link WorkOrderCard} — a drop-in with the **same
 * props**. The *dense list line*: a leading **status dot**, the title on one
 * line with the work-order number + priority glyph beneath, and a compact
 * status badge pinned to the trailing edge. Status is conveyed by the dot AND
 * the badge's glyph + label (never color alone). Token-pure.
 */
export type WorkOrderCardV3Props = WorkOrderCardProps;
export declare function WorkOrderCardV3({ workOrderNumber, title, status, priority, assignee, site, glyph, loading, onPress, style, }: WorkOrderCardV3Props): React.ReactElement;
//# sourceMappingURL=WorkOrderCardV3.d.ts.map