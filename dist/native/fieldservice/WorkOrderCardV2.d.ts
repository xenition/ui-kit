import * as React from 'react';
import type { WorkOrderCardProps } from './WorkOrderCard';
/**
 * Alternate design (v2) of {@link WorkOrderCard} — a drop-in with the **same
 * props**. Where the original is a flat left-aligned summary, V2 is an
 * *elevated status-rail card*: a full-height colored **status rail** down the
 * leading edge, a tinted trade-glyph disc, a **large title**, and a
 * **priority pill** hero'd at the trailing edge, over site / assignee / schedule
 * meta. Status is a text + glyph badge AND a labelled rail (never color alone).
 * Token-pure: semantic slots, `withAlpha` tints, and the shared `shadow()`.
 */
export type WorkOrderCardV2Props = WorkOrderCardProps;
export declare function WorkOrderCardV2({ workOrderNumber, title, status, priority, assignee, site, scheduledFor, glyph, loading, onPress, style, }: WorkOrderCardV2Props): React.ReactElement;
//# sourceMappingURL=WorkOrderCardV2.d.ts.map