import * as React from 'react';
import type { MonthViewProps } from './MonthView';
export interface MonthViewV4Props extends MonthViewProps {
    /**
     * Locale for the weekday headers. Default: the device's.
     *
     * The base built them from a frozen English `WEEKDAYS_SHORT` array. A
     * calendar is the component a non-English product notices first, and `Intl`
     * already knows every locale's answer.
     */
    locale?: string;
    /** Appended to today's accessible name. Default `'today'`. */
    todayLabel?: string;
    /** Build a day's event summary. Default `'3 events'` / `'1 event'`. */
    formatEventCount?: (count: number) => string;
}
/**
 * **V4 month view** — same props as {@link MonthView} plus `locale`,
 * `todayLabel` and `formatEventCount`.
 *
 * ## Four changes
 *
 * 1. **The weekday headers are localized** — see `locale`.
 * 2. **Every day cell clears 44** and carries a full accessible name: the
 *    date, whether it is today, and how many events it holds. The base named
 *    the cell with the day number alone, so a reader heard "17" with no
 *    context and no event count.
 * 3. **Today is a ring whose space is always reserved**, so marking it never
 *    nudges the grid — and the ring is drawn *and* named, never colour alone.
 * 4. **Press is a state layer**, not an opacity on the cell's content.
 */
export declare function MonthViewV4({ month, events, selected, today, weekStartsOn, density, locale, todayLabel, formatEventCount, onSelectDate, style, }: MonthViewV4Props): React.ReactElement;
//# sourceMappingURL=MonthViewV4.d.ts.map