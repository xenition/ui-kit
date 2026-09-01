import * as React from 'react';
import type { MiniCalendarProps } from './MiniCalendar';
export interface MiniCalendarV4Props extends MiniCalendarProps {
    /** Locale for the header and the weekday row. Default: the device's. */
    locale?: string;
    /** Accessible names for the two chevrons. */
    previousLabel?: string;
    nextLabel?: string;
    /** Appended to today's accessible name. Default `'today'`. */
    todayLabel?: string;
    /** Appended to a marked day's accessible name. Default `'has events'`. */
    markedLabel?: string;
}
/**
 * **V4 mini calendar** — same props as {@link MiniCalendar} plus `locale` and
 * four copy hooks.
 *
 * ## Four changes
 *
 * 1. **The header and weekday row are localized**, where the base used frozen
 *    English `MONTHS_SHORT` and `WEEKDAYS_NARROW` arrays.
 * 2. **The month chevrons clear 44 and carry names.** They were unlabelled
 *    glyphs.
 * 3. **A marked day says so.** The base drew a dot and nothing else, so the
 *    one piece of information a mini calendar carries was invisible to a
 *    screen reader and to a colour-blind user.
 * 4. **Press is a state layer**, and today's ring space is reserved so the
 *    grid does not shift.
 */
export declare function MiniCalendarV4({ month, selected, today, marks, weekStartsOn, variant, locale, previousLabel, nextLabel, todayLabel, markedLabel, onSelectDate, onMonthChange, style, }: MiniCalendarV4Props): React.ReactElement;
//# sourceMappingURL=MiniCalendarV4.d.ts.map