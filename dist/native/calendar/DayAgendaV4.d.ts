import * as React from 'react';
import type { DayAgendaProps } from './DayAgenda';
export interface DayAgendaV4Props extends DayAgendaProps {
    /** Locale for the time gutter. Default: the device's. */
    locale?: string;
    /** Label on the "now" divider. Default `'Now'`. */
    nowLabel?: string;
}
/**
 * **V4 day agenda** — same props as {@link DayAgenda} plus `locale` and
 * `nowLabel`.
 *
 * ## Four changes
 *
 * 1. **The list is ordered by the shared layout pass**, so an agenda and a
 *    time grid showing the same day agree on the order — the base sorted here
 *    and there independently.
 * 2. **"Now" is a labelled divider**, not an unnamed rule. A screen-reader
 *    user could not tell which events had already happened.
 * 3. **The skeleton is opaque**, not a translucent wash of `muted`.
 * 4. **The empty state is copy in `mutedText`**, and the whole list announces
 *    itself as a list.
 */
export declare function DayAgendaV4({ day, events, now, locale, nowLabel, onSelectEvent, selectedEventId, loading, emptyLabel, variant, style, }: DayAgendaV4Props): React.ReactElement;
//# sourceMappingURL=DayAgendaV4.d.ts.map