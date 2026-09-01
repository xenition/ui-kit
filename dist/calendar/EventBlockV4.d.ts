import * as React from 'react';
import type { EventBlockProps } from './EventBlock';
export interface EventBlockV4Props extends EventBlockProps {
    /** Show the time range under the title. Default `true` above the min height. */
    showTime?: boolean;
    /** Announced for an all-day event. Default `'All day'`. */
    allDayLabel?: string;
}
/**
 * **V4 event block** — the web twin of the native `EventBlockV4`, same props
 * as {@link EventBlock} plus `showTime` and `allDayLabel`.
 *
 * ## Four changes
 *
 * 1. **A solid block uses its tone's *paired* ink** (`TONE_ON`). The base
 *    inked every solid variant `text-on-primary` regardless of tone.
 * 2. **The soft variant gains a rail**, so an event's tone survives greyscale
 *    and CVD — a 16% tint alone does not.
 * 3. **A short block drops its time rather than clipping it.**
 * 4. **The block is one announced object**, not three loose text nodes.
 *
 * **Renders nothing without an event title** (§4.5).
 */
export declare const EventBlockV4: React.ForwardRefExoticComponent<EventBlockV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EventBlockV4.d.ts.map