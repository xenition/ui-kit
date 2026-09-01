import * as React from 'react';
/** One day cell in the {@link CalendarStrip}. */
export interface CalendarStripDay {
    /** Stable identity for the day (e.g. an ISO date `'2026-08-31'`). Used as `key` and in callbacks. */
    date: string;
    /** Big date numeral shown in the cell (e.g. `'31'`). */
    label: string;
    /** Short weekday letter/label shown above the numeral (e.g. `'S'`, `'Mon'`). */
    weekday: string;
    /** Task count for the day; renders a soft-primary count badge when > 0. */
    count?: number;
    /** Marks this cell as "today" — draws a primary ring. */
    today?: boolean;
}
export interface CalendarStripProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** The days to render, left→right; typically a single week. */
    days: readonly CalendarStripDay[];
    /** The currently selected `date`; that cell fills solid primary. */
    selectedDate?: string;
    /** Fires with a day's `date` when its cell is chosen. */
    onSelect?: (date: string) => void;
    /** Accessible label for the day group. Defaults to `'Select a day'`. */
    label?: string;
}
/**
 * CalendarStrip — **V4** "flow" week strip (web parity of the native twin). A
 * horizontally-scrolling row of calm day cells: a weekday letter over a **big
 * date numeral**, with a soft-primary count badge for days that carry tasks.
 * One accent throughout — the **selected** day fills solid primary, **today**
 * wears a primary ring. Cells are ≥44px tap targets and expose a `radiogroup`
 * so a screen reader announces the chosen day. Presentational only. All colors
 * from `--xen-*` token classes — no literals.
 */
export declare const CalendarStrip: React.ForwardRefExoticComponent<CalendarStripProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CalendarStrip.d.ts.map