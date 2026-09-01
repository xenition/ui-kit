import * as React from 'react';
import type { TimeGridProps } from './TimeGrid';
export interface TimeGridV4Props extends TimeGridProps {
    /** Locale for the hour gutter. Default: the device's. */
    locale?: string;
    /** Accessible name for the current-time rule. Default `'Current time'`. */
    nowLabel?: string;
    /** Copy when the day has no timed events. Default `'Nothing scheduled.'`. */
    emptyLabel?: string;
}
/**
 * **V4 time grid** — same props as {@link TimeGrid} plus `locale`, `nowLabel`
 * and `emptyLabel`.
 *
 * ## The change this component exists for
 *
 * **The overlap layout was inconsistent.** The base computed, per event, the
 * set of events overlapping *that* event and used its size as the column
 * count — so A 9:00–10:00, B 9:30–10:30 and C 10:00–11:00 were laid out on
 * three different column grids in one day, colliding and leaving gaps at the
 * same time. `layoutEvents()` in `calendar/layout-v4.ts` replaces it with the
 * standard two-pass algorithm: cluster the connected overlaps, then pack each
 * cluster into columns every one of its members shares. The reasoning, and the
 * worked example, are in that file.
 *
 * ## Three more
 *
 * 1. **The hour gutter is localized.** It was built from a frozen English
 *    `hourLabel`; `Intl` already knows every locale's clock.
 * 2. **"Now" is announced.** The base drew a rule and gave it no name, so a
 *    screen-reader user got no current time at all.
 * 3. **The metrics come off the spacing scale**, so the hour rules and the
 *    blocks agree on a seed that scales its spacing — they drifted apart with
 *    `hourHeight = 56` and a `GUTTER` of 48.
 */
export declare function TimeGridV4({ day, events, startHour, endHour, hourHeight, now, locale, nowLabel, emptyLabel, onSelectEvent, selectedEventId, scroll, style, }: TimeGridV4Props): React.ReactElement;
//# sourceMappingURL=TimeGridV4.d.ts.map