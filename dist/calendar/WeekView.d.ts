import * as React from 'react';
import type { CalendarEvent } from './types';
export interface WeekViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** Any date within the week to render (required — no import-time clock). */
    week: Date;
    /** Timed events; each is placed in its day column by minute offset. */
    events?: CalendarEvent[];
    /** The highlighted day column. */
    selected?: Date;
    /** "Today" instant — its column header is ringed + bolded (not color-alone). */
    today?: Date;
    /** 0 = week starts Sunday (default), 1 = Monday, … */
    weekStartsOn?: number;
    /** First hour shown (default 7). */
    startHour?: number;
    /** Last hour shown (default 21). */
    endHour?: number;
    /** Pixels per hour (default 48). */
    hourHeight?: number;
    /** Fires when a day column header is tapped. */
    onSelectDate?: (date: Date) => void;
    /** Fires when an event block is tapped. */
    onSelectEvent?: (event: CalendarEvent) => void;
    /** Currently selected event id. */
    selectedEventId?: string;
}
/**
 * A 7-day week view: a weekday header (each column a tappable `<button>` that
 * selects the day) over a shared, scrollable hour grid where timed events sit in
 * their day column. Today's header carries a ring + bold weight and
 * `aria-current` (never color-alone). Colors resolve from theme tokens only.
 */
export declare const WeekView: React.ForwardRefExoticComponent<WeekViewProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WeekView.d.ts.map