import * as React from 'react';
export interface CalendarStripProps extends React.HTMLAttributes<HTMLDivElement> {
    /** First day in the strip. Defaults to today. */
    startDate?: Date;
    /** Number of day pills to render (default 14). Clamped to at least 1. */
    days?: number;
    /** Explicit list of dates; overrides `startDate`/`days` when provided. */
    dates?: Date[];
    /** Currently selected day (highlighted). */
    selected?: Date;
    /** Days to mark with a dot (e.g. days that have events). */
    marks?: Date[];
    /** Fires when a day pill is tapped. */
    onSelectDate?: (date: Date) => void;
}
/**
 * A horizontally-scrolling week/day strip — a compact date picker for browsing
 * an event schedule. Each pill shows the weekday, day number and (on month
 * boundaries) the month, with a dot for marked days. The selected day is filled
 * with `primary` and also carries `aria-selected`. `startDate` defaults to a
 * fresh `new Date()` only at render (never at import). Colors come from the
 * `--xen-*` tokens; no literal colors.
 */
export declare const CalendarStrip: React.ForwardRefExoticComponent<CalendarStripProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CalendarStrip.d.ts.map