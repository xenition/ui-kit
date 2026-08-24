import * as React from 'react';
import type { MilestoneRowProps } from './MilestoneRow';
/** Same public contract as {@link MilestoneRow} — a drop-in alternate design. */
export type MilestoneRowV3Props = MilestoneRowProps;
/**
 * MilestoneRow, redesigned (v3): a **dense milestone line**. A reached ✓ (or flag),
 * the title with a thin progress underline, and the target-date pill on the right —
 * hairline-bordered for a roadmap list. The opposite of v2's card. Same props,
 * token-only.
 */
export declare const MilestoneRowV3: React.ForwardRefExoticComponent<MilestoneRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MilestoneRowV3.d.ts.map