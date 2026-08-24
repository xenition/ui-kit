import * as React from 'react';
import type { BookingCalendarProps } from './BookingCalendar';
/** Drop-in alternate of {@link BookingCalendarProps} — identical prop contract. */
export type BookingCalendarV3Props = BookingCalendarProps;
/**
 * BookingCalendar — design variant **V3**: a **compact horizontal date strip**
 * (a swipeable week scroller). Instead of a six-row month grid, V3 lays a
 * two-week run of day pills in a single scrolling row — each pill stacks the
 * short weekday over the day number with an availability dot beneath, and the
 * strip starts at the top of the week containing `selectedDate`. The selected
 * pill fills with the primary token; today gets a token ring. Ideal for tight
 * mobile flows where a full calendar is too heavy. Same
 * `slots`/`availability`/`selectedDate`/`onSelectDate`/`timezone`/
 * `weekStartsOn`/`locale` contract as {@link BookingCalendarProps} (`view` is
 * accepted for drop-in parity but the strip layout is always linear).
 * Token-only.
 */
export declare function BookingCalendarV3({ slots, availability, selectedDate, onSelectDate, timezone, weekStartsOn, locale, style, }: BookingCalendarV3Props): React.ReactElement;
//# sourceMappingURL=BookingCalendarV3.d.ts.map