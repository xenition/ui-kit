import * as React from 'react';
import type { BookingCalendarProps } from './BookingCalendar';
/** Same public contract as {@link BookingCalendar} — a drop-in alternate design. */
export type BookingCalendarV3Props = BookingCalendarProps;
/**
 * BookingCalendar, redesigned (v3): a **compact upcoming-days list**. Instead of a
 * month grid it lists the next 30 days as hairline rows — weekday, date, and an
 * availability count (or "Full") — that select on tap. A scannable agenda, the
 * opposite of v1/v2's grid. Same props, token-only.
 */
export declare const BookingCalendarV3: React.ForwardRefExoticComponent<BookingCalendarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BookingCalendarV3.d.ts.map