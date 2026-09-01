import * as React from 'react';
import type { CalendarViewMode } from './types';
import type { DateNavigatorProps } from './DateNavigator';
export interface DateNavigatorV4Props extends DateNavigatorProps {
    /** Accessible names for the two chevrons. */
    previousLabel?: string;
    nextLabel?: string;
    /** Copy on the today action. Default `'Today'`. */
    todayLabel?: string;
    /** Override the view-switcher words — three English words lived inside. */
    viewLabels?: Partial<Record<CalendarViewMode, string>>;
}
/**
 * **V4 date navigator** — the web twin of the native `DateNavigatorV4`, same
 * props as {@link DateNavigator} plus four copy hooks.
 *
 * ## Four changes
 *
 * 1. **The chevrons clear 44 and carry names.** They were glyph-sized buttons
 *    with no accessible label, on the control a user hits most in a calendar.
 * 2. **The title is a real heading**, so a screen reader can jump to it.
 * 3. **The view switcher is `SegmentedV4`**, not three hand-rolled buttons, so
 *    it reports itself as one control with a selected option.
 * 4. **Hover and press are the shared chrome layers.**
 */
export declare const DateNavigatorV4: React.ForwardRefExoticComponent<DateNavigatorV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DateNavigatorV4.d.ts.map