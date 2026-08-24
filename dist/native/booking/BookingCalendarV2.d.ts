import * as React from 'react';
import type { BookingCalendarProps } from './BookingCalendar';
/** Drop-in alternate of {@link BookingCalendarProps} — identical prop contract. */
export type BookingCalendarV2Props = BookingCalendarProps;
/**
 * BookingCalendar — design variant **V2**: a **large, elevated month grid**.
 * Where V1 is a compact bordered grid of 36px cells, V2 floats on a shadowed,
 * borderless card with generous 48px day tiles, an oversized month title, and a
 * bold dot beneath every day that has openings. The selected day fills with the
 * primary token (a shape change, not color alone) and today's tile carries a
 * token ring — so state never rests on hue. Same
 * `slots`/`availability`/`selectedDate`/`onSelectDate`/`timezone`/`view`/
 * `weekStartsOn`/`locale` contract as {@link BookingCalendarProps}. Token-only.
 */
export declare function BookingCalendarV2({ slots, availability, selectedDate, onSelectDate, timezone, view, weekStartsOn, locale, style, }: BookingCalendarV2Props): React.ReactElement;
//# sourceMappingURL=BookingCalendarV2.d.ts.map