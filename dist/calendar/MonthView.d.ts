import * as React from 'react';
import type { CalendarEvent } from './types';
export type MonthViewDensity = 'compact' | 'full';
export interface MonthViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** Any date within the month to render (required — no clock read at import). */
    month: Date;
    /** Events; grouped onto their start day as accent dots / counts. */
    events?: CalendarEvent[];
    /** The currently selected day (filled). */
    selected?: Date;
    /** "Today" instant — outlined + labelled (never color-alone). */
    today?: Date;
    /** 0 = week starts Sunday (default), 1 = Monday, … */
    weekStartsOn?: number;
    /** `full` shows up to 3 event dots per cell; `compact` shows one. */
    density?: MonthViewDensity;
    /** Fires when a day cell is tapped. */
    onSelectDate?: (date: Date) => void;
}
/**
 * A full month grid for scheduling — distinct from the `Calendar` primitive in
 * that it groups real `CalendarEvent`s onto their day (tone-colored dots, plus
 * an overflow "+n"). The selected day is filled and today carries a ring **and**
 * a bold weight (never color-alone; `aria-current="date"`). Each day cell is a
 * real `<button>` for keyboard navigation. All colors resolve from theme tokens.
 */
export declare const MonthView: React.ForwardRefExoticComponent<MonthViewProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MonthView.d.ts.map