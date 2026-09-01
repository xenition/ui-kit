import * as React from 'react';
import type { AllDayRowProps } from './AllDayRow';
export interface AllDayRowV4Props extends AllDayRowProps {
    /** Copy when the day has no all-day events and the row is shown. */
    emptyLabel?: string;
}
/**
 * **V4 all-day row** — same props as {@link AllDayRow} plus `emptyLabel`.
 *
 * ## Three changes
 *
 * 1. **The label is a real caption in `mutedText`**, and the row is announced
 *    with how many events it holds — the base left the count implicit.
 * 2. **The empty case says so** when `hideWhenEmpty` is off. The base rendered
 *    an empty labelled strip, which reads as a loading state.
 * 3. **The scroll variant no longer clips its last chip**, because the blocks
 *    are laid out with the module's own gap rather than a margin on each.
 */
export declare function AllDayRowV4({ day, events, label, layout, emptyLabel, onSelectEvent, selectedEventId, hideWhenEmpty, style, }: AllDayRowV4Props): React.ReactElement | null;
//# sourceMappingURL=AllDayRowV4.d.ts.map