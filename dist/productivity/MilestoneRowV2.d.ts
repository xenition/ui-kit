import * as React from 'react';
import type { MilestoneRowProps } from './MilestoneRow';
/** Same public contract as {@link MilestoneRow} — a drop-in alternate design. */
export type MilestoneRowV2Props = MilestoneRowProps;
/**
 * MilestoneRow, redesigned (v2): an **elevated milestone card**. A flag/✓ medallion
 * leads the title; a thick progress bar with a percent read-out and a target-date
 * pill follow. Reached milestones tint success. Distinct from v1. Same props,
 * token-only.
 */
export declare const MilestoneRowV2: React.ForwardRefExoticComponent<MilestoneRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MilestoneRowV2.d.ts.map