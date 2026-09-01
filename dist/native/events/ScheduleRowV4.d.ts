import * as React from 'react';
import { type ToneV4 } from './internal/event-v4';
import type { ScheduleRowProps, ScheduleStatus } from './ScheduleRow';
export interface ScheduleRowV4Props extends ScheduleRowProps {
    /** The word each status is printed and announced with. */
    statusLabels?: Partial<Record<ScheduleStatus, string>>;
    /** Join a start and an end time. Default `` `${start}–${end}` ``. */
    formatRange?: (start: string, end: string) => string;
    /** The tone the track rail and caption carry. Default `'neutral'`. */
    trackTone?: ToneV4;
}
/**
 * **V4 schedule row** — same props as {@link ScheduleRow} plus `statusLabels`,
 * `formatRange` and `trackTone`.
 *
 * ## Five changes
 *
 * 1. **`endTime` renders as a range**, which its own prop doc has always
 *    promised. The base stacked two bare times in the gutter with nothing
 *    between them, so "10:30" over "11:15" read as two separate start times on
 *    a printed-looking timetable — the one place that misreading costs someone
 *    a session.
 * 2. **A cancelled slot no longer announces identically to a live one.** The
 *    strike-through was visual only and the row spoke `"10:30 Keynote"`, so a
 *    screen-reader user was told to turn up to a cancelled talk.
 * 3. **A track carries identity.** The rail was `primary` for every track, so
 *    the colour distinguished nothing, and a row with no track filled the rail
 *    with `colors.border` — a hairline token used as a fill. `trackTone` lets
 *    the caller give a track its own tone; a row with no track draws no rail
 *    and keeps the gutter, so titles stay on one vertical line.
 * 4. **The status caption takes the contrast-corrected ink**, not the fill
 *    slot — `colors.muted` as text carries no contrast promise at all.
 * 5. **The row clears 44, the gutter is tabular, and a press is a state
 *    layer** rather than `opacity: 0.7`.
 *
 * **Renders nothing without a `title`.**
 */
export declare function ScheduleRowV4({ time, endTime, title, room, track, status, statusLabels, formatRange, trackTone, onPress, style, }: ScheduleRowV4Props): React.ReactElement | null;
//# sourceMappingURL=ScheduleRowV4.d.ts.map