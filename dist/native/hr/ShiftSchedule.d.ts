import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ShiftStatus } from './internal';
export interface Shift {
    id: string;
    /** Start time label (e.g. "09:00"). */
    start: string;
    /** End time label (e.g. "17:00"). */
    end: string;
    /** Role / position for the shift. */
    role?: string;
    /** Location / station. */
    location?: string;
    /** Assigned employee name (absent → open shift). */
    assignee?: string;
    /** Scheduling state — glyph + word pill. */
    status?: ShiftStatus;
}
export type ShiftScheduleVariant = 'default' | 'compact';
export interface ShiftScheduleProps {
    /** The day's / week's shifts, in display order. */
    shifts: Shift[];
    /** Header label for the schedule (e.g. "Mon Aug 24"). */
    dateLabel?: string;
    /** Density. */
    variant?: ShiftScheduleVariant;
    /** Fires with the tapped shift. */
    onSelectShift?: (shift: Shift) => void;
    /** Message for the empty state. */
    emptyLabel?: string;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A shift roster for a day (or period): a header date and a list of shift rows,
 * each showing time range, role / location, assignee, and a scheduling-status
 * pill (open → warn, confirmed → success — glyph + word, never color alone).
 * Open (unassigned) shifts are tinted and labelled. Renders a token-styled
 * empty state when there are no shifts. All colors are theme tokens — no
 * literals.
 */
export declare function ShiftSchedule({ shifts, dateLabel, variant, onSelectShift, emptyLabel, testID, style, }: ShiftScheduleProps): React.ReactElement;
//# sourceMappingURL=ShiftSchedule.d.ts.map