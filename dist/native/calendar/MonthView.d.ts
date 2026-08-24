import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { CalendarEvent } from './types';
export type MonthViewDensity = 'compact' | 'full';
export interface MonthViewProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * A full month grid for scheduling — distinct from the `Calendar` primitive in
 * that it groups real `CalendarEvent`s onto their day (tone-colored dots, plus
 * an overflow "+n"). The selected day is filled and today carries a ring **and**
 * a bold weight (not color-alone). All colors resolve from theme tokens.
 */
export declare function MonthView({ month, events, selected, today, weekStartsOn, density, onSelectDate, style, }: MonthViewProps): React.ReactElement;
//# sourceMappingURL=MonthView.d.ts.map