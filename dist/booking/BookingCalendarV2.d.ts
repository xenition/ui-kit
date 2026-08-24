import * as React from 'react';
import type { BookingCalendarProps } from './BookingCalendar';
/** Same public contract as {@link BookingCalendar} — a drop-in alternate design. */
export type BookingCalendarV2Props = BookingCalendarProps;
/**
 * BookingCalendar, redesigned (v2): a **spacious availability calendar**. Larger
 * rounded day tiles print an "N open" count (not just a dot) beneath the date, the
 * selected day fills primary, and the month nav is chunkier. Distinct from v1's
 * compact grid. Same props, token-only.
 */
export declare const BookingCalendarV2: React.ForwardRefExoticComponent<BookingCalendarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BookingCalendarV2.d.ts.map