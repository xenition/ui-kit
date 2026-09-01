import * as React from 'react';
import type { MonthViewProps } from './MonthView';
export interface MonthViewV4Props extends MonthViewProps {
    /**
     * Locale for the weekday headers. Default: the browser's.
     *
     * The base built them from a frozen English `WEEKDAYS_SHORT` array. A
     * calendar is the component a non-English product notices first.
     */
    locale?: string;
    /** Appended to today's accessible name. Default `'today'`. */
    todayLabel?: string;
    /** Build a day's event summary. Default `'3 events'` / `'1 event'`. */
    formatEventCount?: (count: number) => string;
}
/**
 * **V4 month view** — the web twin of the native `MonthViewV4`, same props as
 * {@link MonthView} plus `locale`, `todayLabel` and `formatEventCount`.
 *
 * ## Four changes
 *
 * 1. **The weekday headers are localized.**
 * 2. **Every day cell clears 44** and carries a full name: the date, whether
 *    it is today, and how many events it holds — the base named it with the
 *    day number alone.
 * 3. **The grid is a real `role="grid"`** with rows, column headers and cells,
 *    so a screen reader can navigate it as a table rather than a wall of
 *    buttons.
 * 4. **Today's ring space is always reserved**, so marking it never nudges the
 *    grid, and it is named as well as drawn.
 */
export declare const MonthViewV4: React.ForwardRefExoticComponent<MonthViewV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MonthViewV4.d.ts.map