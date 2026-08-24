import * as React from 'react';
export interface CalendarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The month to display (any date within it). Defaults to today. */
    month?: Date;
    /** Currently selected date (highlighted). */
    selected?: Date;
    /** Dates to mark with a dot (e.g. events). */
    marks?: Date[];
    /** Fires when a day cell is clicked. */
    onSelectDate?: (date: Date) => void;
    /** Fires when the prev/next chevrons page the month. */
    onMonthChange?: (month: Date) => void;
}
/**
 * Web parity of the native `Calendar`: a static month grid — a display calendar
 * distinct from a date-picker field. Header with prev/next chevrons, a weekday
 * row, and a `grid`-role 6×7 day grid; the selected day fills with the `primary`
 * token and marked days get an accent dot. All colors/spacing come from the
 * `--xen-*` tokens via Tailwind classes — no literal colors.
 */
export declare const Calendar: React.ForwardRefExoticComponent<CalendarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Calendar.d.ts.map