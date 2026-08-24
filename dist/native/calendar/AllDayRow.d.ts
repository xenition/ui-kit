import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { CalendarEvent } from './types';
export interface AllDayRowProps {
    /** The day whose all-day events are shown. */
    day: Date;
    /** Events; filtered to `allDay` items that fall on `day`. */
    events?: CalendarEvent[];
    /** Leading label (default "All day"). */
    label?: string;
    /** Layout: wrap chips (`stack`) or scroll horizontally (`scroll`, default). */
    layout?: 'scroll' | 'stack';
    /** Fires when an all-day chip is tapped. */
    onSelectEvent?: (event: CalendarEvent) => void;
    /** Currently selected event id. */
    selectedEventId?: string;
    /** Hide the row entirely when there are no all-day events (default false —
     *  an explicit empty hint is shown instead). */
    hideWhenEmpty?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * The all-day band that sits above a day/week time grid — a labelled strip of
 * full-day event chips. Distinct from the timed `TimeGrid`: these events have no
 * clock position. Renders an empty hint unless `hideWhenEmpty`. Token colors
 * only.
 */
export declare function AllDayRow({ day, events, label, layout, onSelectEvent, selectedEventId, hideWhenEmpty, style, }: AllDayRowProps): React.ReactElement | null;
//# sourceMappingURL=AllDayRow.d.ts.map