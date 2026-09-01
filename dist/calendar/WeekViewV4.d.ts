import * as React from 'react';
import type { WeekViewProps } from './WeekView';
export interface WeekViewV4Props extends WeekViewProps {
    /** Locale for the day headers and hour gutter. Default: the browser's. */
    locale?: string;
    /** Accessible name for the current-time rule. Default `'Current time'`. */
    nowLabel?: string;
    /** Appended to today's column header. Default `'today'`. */
    todayLabel?: string;
    /** The instant the "now" rule marks. Omit to hide it. */
    now?: Date;
}
/**
 * **V4 week view** — the web twin of the native `WeekViewV4`, same props as
 * {@link WeekView} plus `locale`, `now`, `nowLabel` and `todayLabel`.
 *
 * ## Four changes
 *
 * 1. **Each day column lays out with the shared clustering pass**, so
 *    overlapping events in one column line up — the base carried the same
 *    inconsistent per-event overlap count `TimeGrid` did.
 * 2. **The day headers are localized and named.**
 * 3. **"Now" is drawn and announced**, and only on today's column — the base
 *    had no now rule in the week view at all.
 * 4. **Column headers clear 44.**
 */
export declare const WeekViewV4: React.ForwardRefExoticComponent<WeekViewV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WeekViewV4.d.ts.map