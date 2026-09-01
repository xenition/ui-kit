import * as React from 'react';
import type { BookingCalendarProps } from './BookingCalendar';
export interface BookingCalendarV4Props extends BookingCalendarProps {
    /**
     * Ring today's cell. Default `true`.
     *
     * The base marked availability and selection and had no way at all to say
     * "today", so a user looking at a month grid had to work out where they were
     * before they could work out where they were going.
     */
    markToday?: boolean;
    /**
     * Accessible names for the two header controls. Defaults are
     * `'Previous month'` / `'Next month'`, and `'Previous week'` / `'Next week'`
     * in the week view — the other half of the fix below: the base said "month"
     * while the week view moved nothing at all.
     */
    previousLabel?: string;
    nextLabel?: string;
    /** Suffix appended to a day's accessible name. Defaults in English. */
    availableLabel?: string;
    unavailableLabel?: string;
    /** Appended to today's accessible name. Default `'today'`. */
    todayLabel?: string;
}
/**
 * **V4 booking calendar** — the web twin of the native `BookingCalendarV4`,
 * same props as {@link BookingCalendar} plus `markToday` and four copy hooks.
 *
 * The roving-tabindex keyboard model is the base's and is kept whole: arrows,
 * Home/End, PageUp/PageDown, Enter/Space, and one tab stop for the grid. It is
 * the best thing about this component and the pass does not touch it.
 *
 * ## Five changes
 *
 * 1. **The week view's chevrons work.** `shiftView()` moved `viewDate` by a
 *    *month* in both views, while the week row was derived from
 *    `selectedDate ?? viewDate` — so in the week view, with a date selected
 *    (the normal case), pressing ‹ or › changed nothing on screen. V4 keeps one
 *    anchor and shifts it by a month or by seven days, and the labels say which.
 * 2. **Every target clears 44.** `h-8 w-8` chevrons and `h-9 w-9` cells were
 *    both under the minimum the rest of the kit holds.
 * 3. **Today is marked** — a ring, plus `today` in the cell's accessible name.
 * 4. **Hover and focus are the kit's tokens.** `hover:bg-neutral-100` is a ramp
 *    step and near-white on a dark page; `ring-primary-300` is not the
 *    `--xen-ring` slot every other V4 control focuses with.
 * 5. **The chevrons are `IconV4`**, not two hand-drawn inline `<svg>` paths
 *    whose stroke width was a literal.
 */
export declare const BookingCalendarV4: React.ForwardRefExoticComponent<BookingCalendarV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BookingCalendarV4.d.ts.map