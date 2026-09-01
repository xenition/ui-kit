import * as React from 'react';
import type { ScheduleRowProps, ScheduleStatus } from './ScheduleRow';
import { type ToneV4 } from './internal/event-v4';
export interface ScheduleRowV4Props extends ScheduleRowProps {
    /** The word each status carries. `scheduled` is deliberately silent. */
    statusLabels?: Partial<Record<ScheduleStatus, string>>;
    /** Join a start and an end into the range the gutter prints. Default `start–end`. */
    formatRange?: (start: string, end: string) => string;
    /**
     * The tone the track's rail and caption take, so a track can carry identity.
     *
     * `neutral` by default, and this is the one added prop whose default
     * deliberately changes today's look: the rail was `primary` for *every*
     * track, which is the defect. A schedule that wants its tracks told apart
     * passes a tone per track.
     */
    trackTone?: ToneV4;
}
/**
 * **V4 schedule row** — the web twin of the native `ScheduleRowV4`, same props
 * as {@link ScheduleRow} plus `statusLabels`, `formatRange` and `trackTone`.
 *
 * ## Five changes
 *
 * 1. **`endTime` renders as the range its own prop doc has always promised.**
 *    The base stacked two bare times with no separator, so a row reading
 *    "10:30" over "11:15" looked like two *start* times — the reader had to
 *    guess which one the session began at. Default `` `${start}–${end}` ``,
 *    overridable for a locale that joins a range differently.
 * 2. **A cancelled slot does not announce identically to a live one.** The
 *    strike-through was a visual-only cue and the row's name was
 *    `` `${time} ${title}` `` — so a screen-reader user was told about a
 *    session that had been called off exactly what they were told about one
 *    that was running.
 * 3. **A track can carry identity.** The rail was `primary` for *every* track,
 *    so the colour said "there is a track" and nothing more, and the no-track
 *    rail was filled with `border` — a hairline token with no promise of being
 *    visible as a solid 3px bar. `trackTone` colours rail and caption together,
 *    and a row with no track draws no rail while keeping its width.
 * 4. **The status caption takes the contrast-corrected ink.** `text-success`
 *    and `text-danger` are *fill* slots; at 12px they are the least legible
 *    text on the row. `TONE_INK` is the slot the compiler corrects for text.
 * 5. **The row is a real `<button>` when it is clickable**, not a `div` with
 *    `role="button"` and a hand-written key handler; the gutter is tabular so
 *    a column of times lines up; and press is a state layer, not
 *    `hover:opacity-80` — which is how a row looks *disabled*.
 */
export declare const ScheduleRowV4: React.ForwardRefExoticComponent<ScheduleRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ScheduleRowV4.d.ts.map