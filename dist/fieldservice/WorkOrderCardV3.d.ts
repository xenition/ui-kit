import * as React from 'react';
import type { WorkOrderCardProps } from './WorkOrderCard';
/**
 * Alternate design (v3) of {@link WorkOrderCard} — a drop-in with the **same
 * props**. The *dense list line*: a leading trade glyph + a token **status
 * dot**, the title on one line with the work-order number / priority / site /
 * assignee collapsed into a muted subtitle, and a compact status badge pinned
 * to the trailing edge. Status is conveyed by the dot AND the badge's glyph +
 * label — never color alone. Renders a slim skeleton while `loading`. No
 * literal colors.
 */
export type WorkOrderCardV3Props = WorkOrderCardProps;
export declare const WorkOrderCardV3: React.ForwardRefExoticComponent<WorkOrderCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WorkOrderCardV3.d.ts.map