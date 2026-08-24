import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Lifecycle of a scheduled slot. */
export type ScheduleStatus = 'scheduled' | 'live' | 'ended' | 'cancelled';
export interface ScheduleRowProps {
    /** Pre-formatted start time, e.g. `10:30`. */
    time: string;
    /** Optional pre-formatted end time; renders a `start–end` range. */
    endTime?: string;
    /** Slot title. */
    title: string;
    /** Room / stage. */
    room?: string;
    /** Track / category label, shown as a colored left rail + caption. */
    track?: string;
    /** Slot status; drives a small status caption (text, not color alone). */
    status?: ScheduleStatus;
    /** Press handler for the row. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single row of a day schedule — a time gutter, an accent track rail, and the
 * title/room details, with an optional status caption. Designed to stack into a
 * printed-timetable feel. The status is always spelled out in words (never
 * color alone). Colors come from the compiled theme tokens; no literal colors.
 */
export declare function ScheduleRow({ time, endTime, title, room, track, status, onPress, style, }: ScheduleRowProps): React.ReactElement;
//# sourceMappingURL=ScheduleRow.d.ts.map