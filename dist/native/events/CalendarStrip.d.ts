import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface CalendarStripProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * A horizontally-scrolling week/day strip — a compact date picker for browsing
 * an event schedule. Each pill shows the weekday, day number and (on month
 * boundaries) the month, with a dot for marked days. The selected day is filled
 * with `primary` and also carries `accessibilityState.selected`. Colors come
 * from the compiled theme tokens; no literal colors.
 */
export declare function CalendarStrip({ startDate, days, dates, selected, marks, onSelectDate, style, }: CalendarStripProps): React.ReactElement;
//# sourceMappingURL=CalendarStrip.d.ts.map