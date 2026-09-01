import * as React from 'react';
import type { MilestoneRowProps } from './MilestoneRow';
/** Drop-in for {@link MilestoneRowProps} — same props, the V4 "flow" design. */
export type MilestoneRowV4Props = MilestoneRowProps;
/**
 * MilestoneRow — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a milestone line, laid out on a subtle timeline
 * rail: a status marker (**success** glow when reached, else muted), a legible
 * title, an optional target {@link DueDatePill}, and a **primary** progress
 * hint. Reaching a milestone settles the row into a soft-success glow. Same
 * props/behavior as {@link MilestoneRowProps}; all colors from `--xen-*` token
 * classes (no literals).
 */
export declare const MilestoneRowV4: React.ForwardRefExoticComponent<MilestoneRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MilestoneRowV4.d.ts.map