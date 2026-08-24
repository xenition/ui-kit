import * as React from 'react';
import { type DueDateTone } from './DueDatePill';
export interface MilestoneRowProps {
    /** Milestone name. */
    title: string;
    /** Whether the milestone has been reached (done = success). */
    reached?: boolean;
    /** Completion percent toward the milestone (0–100). */
    progress?: number;
    /** Optional target-date label. */
    dateLabel?: string;
    /** Tone for the target-date pill. */
    dateTone?: DueDateTone;
    className?: string;
}
/**
 * A milestone line: a status marker (filled **success** when reached), the title,
 * an optional target {@link DueDatePill}, and an optional {@link Progress} bar.
 * The marker and progress recolor to success once reached. Web parity of the
 * native `MilestoneRow`. No literal colors.
 */
export declare const MilestoneRow: React.ForwardRefExoticComponent<MilestoneRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MilestoneRow.d.ts.map