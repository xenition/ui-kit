import * as React from 'react';
export interface ProgressCalendarDay {
    /** Day-of-month, 1–31. */
    day: number;
    /**
     * Completion intensity 0–3 (0 = none, 3 = fully met). Higher levels get a
     * denser accent tint, giving a heatmap-style month view.
     */
    level?: 0 | 1 | 2 | 3;
    /** Mark today's cell with a ring. */
    today?: boolean;
}
export type ProgressCalendarTone = 'primary' | 'accent' | 'success';
export interface ProgressCalendarProps {
    /** Month title, e.g. "August". */
    title?: string;
    /**
     * The days to render, in order. `startWeekday` positions the first day
     * (0 = Sunday). Missing days are simply omitted.
     */
    days: ProgressCalendarDay[];
    /** Weekday index (0=Sun…6=Sat) the first day falls on. Default 0. */
    startWeekday?: number;
    /** Accent tone for completed cells. Default `'primary'`. */
    tone?: ProgressCalendarTone;
    /** Show the weekday header row. Default true. */
    showWeekdays?: boolean;
    /** Fires with the tapped day. */
    onSelectDay?: (day: ProgressCalendarDay) => void;
    /** Note shown when `days` is empty. Default "No activity this month.". */
    emptyLabel?: string;
    className?: string;
}
/**
 * A month completion calendar (web parity of the native block): a weekday header
 * and a 7-column grid of day cells tinted by a 0–3 completion `level` (a soft
 * heatmap), with today's cell ringed. Completion is conveyed by fill density
 * plus the a11y label, never color alone; leading blanks come from
 * `startWeekday`. Interactive cells are real `<button>`s. Empty `days` shows a
 * note. Token-only colors.
 */
export declare const ProgressCalendar: React.ForwardRefExoticComponent<ProgressCalendarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProgressCalendar.d.ts.map