import * as React from 'react';
export type MiniCalendarVariant = 'bordered' | 'plain';
export interface MiniCalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** Any date within the month to render (required — no import-time clock). */
    month: Date;
    /** The currently selected day (filled). */
    selected?: Date;
    /** "Today" instant — outlined + bolded (never color-alone). */
    today?: Date;
    /** Days to mark with a dot (e.g. days that have events). */
    marks?: Date[];
    /** 0 = week starts Sunday (default), 1 = Monday, … */
    weekStartsOn?: number;
    /** Surface treatment. */
    variant?: MiniCalendarVariant;
    /** Fires when a day cell is tapped. */
    onSelectDate?: (date: Date) => void;
    /** Fires when the prev/next chevrons page the month. */
    onMonthChange?: (month: Date) => void;
}
/**
 * A dense mini month picker for sidebars, popovers and the `EventDetailSheet`.
 * Header chevrons page the month; days are 1:1 tap-target `<button>`s with a
 * selected fill and a marked-day dot. Distinct from `MonthView` (no per-day
 * event stacks) and from the `Calendar` primitive (integrated month paging +
 * marks). Token colors only.
 */
export declare const MiniCalendar: React.ForwardRefExoticComponent<MiniCalendarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MiniCalendar.d.ts.map