import * as React from 'react';
import type { EventBlockProps } from './EventBlock';
export interface EventBlockV4Props extends EventBlockProps {
    /** Show the time range under the title. Default `true` above `minBlock`. */
    showTime?: boolean;
    /** Announced for an all-day event. Default `'All day'`. */
    allDayLabel?: string;
}
/**
 * **V4 event block** — same props as {@link EventBlock} plus `showTime` and
 * `allDayLabel`.
 *
 * ## Four changes
 *
 * 1. **A solid block uses its tone's *paired* ink.** The base inked every
 *    solid variant `onPrimary` regardless of the event's tone, so a `success`
 *    event was a green block wearing the brand's ink.
 * 2. **The soft variant gains a rail**, so an event's tone survives greyscale
 *    and CVD — a 16%-tint ground alone does not.
 * 3. **A short block drops its time rather than clipping it.** The base laid
 *    out title and time unconditionally, so a 15-minute event rendered two
 *    lines into a box with room for one.
 * 4. **The block is one announced object** — "Standup, 9:00–9:15, Room 2" —
 *    rather than three loose text nodes.
 *
 * **Renders nothing without an event title** (§4.5).
 */
export declare function EventBlockV4({ event, variant, size, selected, showTime, allDayLabel, onPress, height, style, }: EventBlockV4Props): React.ReactElement | null;
//# sourceMappingURL=EventBlockV4.d.ts.map