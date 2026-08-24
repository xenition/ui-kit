import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Appearance } from '../primitives/internal/appearance';
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
    /** Surface treatment (visual-diversity preset). Defaults to `classic`. */
    appearance?: Appearance;
    style?: StyleProp<ViewStyle>;
}
/**
 * A milestone line: a status marker (filled **success** when reached), the title,
 * an optional target {@link DueDatePill}, and an optional {@link Progress} bar.
 * The marker and progress recolor to success once reached. No literal colors.
 */
export declare function MilestoneRow({ title, reached, progress, dateLabel, dateTone, appearance, style, }: MilestoneRowProps): React.ReactElement;
//# sourceMappingURL=MilestoneRow.d.ts.map