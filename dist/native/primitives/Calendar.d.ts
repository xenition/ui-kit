import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface CalendarProps {
    /** The month to display (any date within it). Defaults to today. */
    month?: Date;
    /** Currently selected date (highlighted). */
    selected?: Date;
    /** Dates to mark with a dot (e.g. events). */
    marks?: Date[];
    /** Fires when a day cell is tapped. */
    onSelectDate?: (date: Date) => void;
    /** Fires when the prev/next chevrons page the month. */
    onMonthChange?: (month: Date) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * Static month grid — a display calendar distinct from the booking
 * `BookingCalendar` and the `DatePicker` field. Renders a header with
 * prev/next chevrons, a weekday row, and a 6×7 day grid; the selected day is
 * filled with `colors.primary` and marked days get an accent dot. All colors
 * and spacing come from the compiled theme tokens via `useXenitionTheme()` —
 * no literal colors.
 */
export declare function Calendar({ month, selected, marks, onSelectDate, onMonthChange, style, }: CalendarProps): React.ReactElement;
//# sourceMappingURL=Calendar.d.ts.map