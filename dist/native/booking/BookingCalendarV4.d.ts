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
     * Accessible names for the two header controls, per view. Defaults are
     * `'Previous month'` / `'Next month'`, and `'Previous week'` / `'Next week'`
     * in the week view — which is the *other* half of the fix below: the base
     * said "month" while moving a week, or moved nothing at all.
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
 * **V4 booking calendar** — same props as {@link BookingCalendar} plus
 * `markToday` and four copy hooks.
 *
 * ## Five changes
 *
 * 1. **The week view's chevrons work.** The base's `shiftView()` moved
 *    `viewDate` by a *month* in both views, while the week row was derived from
 *    `selectedDate ?? viewDate` — so in the week view, with a date selected
 *    (the normal case), pressing ‹ or › changed nothing on screen at all. V4
 *    keeps an anchor date and shifts it by a month or by seven days depending
 *    on the view, and the labels say which.
 * 2. **Every target clears 44.** Chevrons were 32×32 and day cells 36×36 —
 *    both under the minimum the rest of the kit holds, on the control a user
 *    taps most in this module.
 * 3. **Today is marked.** A ring, plus `today` in the cell's accessible name,
 *    because a ring is colour-and-shape and the name is what a screen reader
 *    gets.
 * 4. **Press is a state layer, not a ramp step.** The base filled a pressed
 *    cell with `tokens.ramps.neutral[100]` — the light end of the ramp in both
 *    schemes, so on a dark page a pressed day flashed near-white.
 * 5. **Type comes from `TextV4`.** The base hand-wrote `color`, `fontSize` and
 *    `fontWeight` on raw `<Text>` five times over, with `'500'`, `'600'` and
 *    `'700'` all in play for what is two steps.
 *
 * Availability still comes in as props and nothing is fetched. Days outside the
 * visible month stay muted and disabled — navigate with the header.
 */
export declare function BookingCalendarV4({ slots, availability, selectedDate, onSelectDate, timezone, view, weekStartsOn, locale, markToday, previousLabel, nextLabel, availableLabel, unavailableLabel, todayLabel, style, }: BookingCalendarV4Props): React.ReactElement;
//# sourceMappingURL=BookingCalendarV4.d.ts.map