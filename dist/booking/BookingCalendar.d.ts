import * as React from 'react';
import { BookingSlot } from './types';
export interface DayAvailability {
    /** Civil day, `YYYY-MM-DD`. */
    date: string;
    /** Number of bookable openings that day. */
    count: number;
}
export interface BookingCalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** Raw slots; availability per day is derived (bucketed in `timezone`). */
    slots?: BookingSlot[];
    /** Pre-summarized availability, as an alternative to `slots`. */
    availability?: DayAvailability[];
    /** Selected day. */
    selectedDate?: Date | null;
    /** Fired with the civil date when a day is chosen. */
    onSelectDate?: (date: Date) => void;
    /** IANA timezone slots are bucketed into (their civil day). */
    timezone?: string;
    /** `month` (6-week grid) or `week` (single row). Default `month`. */
    view?: 'month' | 'week';
    /** 0 = Sunday (default), 1 = Monday. */
    weekStartsOn?: 0 | 1;
    /** Locale for month/weekday labels. */
    locale?: string;
}
/**
 * Month- or week-view date picker that highlights days with availability. Real
 * `<button>` grid cells (roving `tabindex`) with full keyboard support — arrow
 * keys move focus (wrapping across weeks/months), Home/End jump to the week
 * ends, PageUp/PageDown change month, Enter/Space select — inside an ARIA
 * `grid`. Token-only; availability is a dot + `aria-label` suffix, never color
 * alone. Presentational: availability comes in as props (`slots` or a per-day
 * `availability` summary); nothing is fetched.
 */
export declare const BookingCalendar: React.ForwardRefExoticComponent<BookingCalendarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BookingCalendar.d.ts.map