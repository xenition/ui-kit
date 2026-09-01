import * as React from 'react';
import type { CalendarViewMode } from '../../calendar/types';
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
 * **V4 date navigator** — same props as {@link DateNavigator} plus four copy
 * hooks.
 *
 * ## Four changes
 *
 * 1. **The chevrons clear 44 and carry names.** They were glyph-sized
 *    pressables with no accessible label — on the control a user hits most in
 *    a calendar.
 * 2. **The title is a heading**, so a screen reader can jump to it, and it is
 *    announced with the view it belongs to.
 * 3. **The view switcher is `SegmentedV4`**, not three hand-rolled buttons, so
 *    it matches every other segmented control in the product and reports
 *    itself as a group.
 * 4. **Press is a state layer**, not an opacity on the glyph.
 */
export declare function DateNavigatorV4({ title, onPrev, onNext, onToday, view, onViewChange, views, previousLabel, nextLabel, todayLabel, viewLabels, style, }: DateNavigatorV4Props): React.ReactElement;
//# sourceMappingURL=DateNavigatorV4.d.ts.map