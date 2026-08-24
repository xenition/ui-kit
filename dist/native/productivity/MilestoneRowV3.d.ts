import * as React from 'react';
import type { MilestoneRowProps } from './MilestoneRow';
/** Same public contract as {@link MilestoneRow} — a drop-in alternate design. */
export type MilestoneRowV3Props = MilestoneRowProps;
/**
 * MilestoneRow, redesigned (v3): a **dense milestone line**. A reached ✓ (or flag),
 * the title with a thin progress bar, and the target-date pill on the right — a
 * hairline row for a roadmap list. The opposite of v2's card. Same props,
 * token-only.
 */
export declare function MilestoneRowV3({ title, reached, progress, dateLabel, dateTone, appearance, style }: MilestoneRowV3Props): React.ReactElement;
//# sourceMappingURL=MilestoneRowV3.d.ts.map