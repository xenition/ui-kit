import * as React from 'react';
import type { TimeGridProps } from './TimeGrid';
export interface TimeGridV4Props extends TimeGridProps {
    /** Locale for the hour gutter. Default: the browser's. */
    locale?: string;
    /** Accessible name for the current-time rule. Default `'Current time'`. */
    nowLabel?: string;
    /** Copy when the day has no timed events. Default `'Nothing scheduled.'`. */
    emptyLabel?: string;
}
/**
 * **V4 time grid** — the web twin of the native `TimeGridV4`, same props as
 * {@link TimeGrid} plus `locale`, `nowLabel` and `emptyLabel`.
 *
 * ## The change this component exists for
 *
 * **The overlap layout was inconsistent.** The base computed, per event, the
 * events overlapping *that* event and used the count as the column total — so
 * three events in one morning were laid out on three different column grids,
 * colliding and leaving gaps at the same time. `layoutEvents()` in
 * `calendar/layout-v4.ts` replaces it with cluster-then-pack; the worked
 * example is in that file.
 *
 * ## Three more
 *
 * 1. **The hour gutter is localized.**
 * 2. **"Now" is announced**, not just drawn.
 * 3. **The metrics are CSS expressions off the spacing scale**, so the hour
 *    rules and the blocks agree on a re-scaled seed.
 */
export declare const TimeGridV4: React.ForwardRefExoticComponent<TimeGridV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TimeGridV4.d.ts.map