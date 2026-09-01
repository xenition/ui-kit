import * as React from 'react';
import type { MilestoneRowProps } from './MilestoneRow';
/** Drop-in for {@link MilestoneRowProps} — same props, the V4 "flow" design. */
export type MilestoneRowV4Props = MilestoneRowProps;
/**
 * MilestoneRow — **V4** "flow" design. The focused-workspace take on a
 * milestone line, laid out on a subtle timeline rail: a status marker
 * (**success** glow when reached, else muted), a legible title, an optional
 * target {@link DueDatePill}, and a **primary** progress hint. Reaching a
 * milestone settles the row into a soft-success glow. Same props/behavior as
 * {@link MilestoneRowProps}; token-only colors via `useXenitionTheme()`.
 */
export declare function MilestoneRowV4({ title, reached, progress, dateLabel, dateTone, style, }: MilestoneRowV4Props): React.ReactElement;
//# sourceMappingURL=MilestoneRowV4.d.ts.map