import * as React from 'react';
import type { WorkOrderCardProps } from './WorkOrderCard';
/**
 * Alternate design (v2) of {@link WorkOrderCard} — a drop-in with the **same
 * props**. Where the base is a flat left-aligned summary, V2 is an *elevated
 * status-rail card*: a full-height colored **status rail** down the leading
 * edge, a tinted trade-glyph disc, a **large title**, a **priority pill** hero'd
 * at the trailing edge, a status badge, and site / assignee / schedule meta.
 * Status is a text + glyph badge AND the labelled rail — never color alone.
 * Renders a `Skeleton` while `loading`. No literal colors.
 */
export type WorkOrderCardV2Props = WorkOrderCardProps;
export declare const WorkOrderCardV2: React.ForwardRefExoticComponent<WorkOrderCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WorkOrderCardV2.d.ts.map