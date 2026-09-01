import * as React from 'react';
import type { ActivityLogRowProps } from './ActivityLogRow';
export interface ActivityLogRowV4Props extends ActivityLogRowProps {
    /** Word shown and announced for a pending activity. Default `'Pending'`. */
    pendingLabel?: string;
}
/**
 * **V4 activity row** — same props as {@link ActivityLogRow} plus
 * `pendingLabel`.
 *
 * ## Five changes
 *
 * 1. **A pending activity says so.** The base drew `pending` as
 *    `opacity: 0.6` and nothing else — a value below M3's 0.38 disabled band,
 *    so a pending entry read as an unavailable one, and a screen reader was
 *    told nothing at all. It now carries the word.
 * 2. **An activity kind is identity, not status.** `ACTIVITY_META` typed
 *    `task` and `deal` as `success`, so a log of finished calls rendered as a
 *    green feed and the tone stopped meaning anything. `ACTIVITY_META_V4`
 *    takes every kind neutral; the glyph already says which kind it is.
 * 3. **The chip is one object on both twins.** Web painted a flat
 *    `bg-neutral-100`, native a per-kind `withAlpha` tint of a **fill** token
 *    used as ink. Both now wear the `selected`/`onSelected` pair, which is the
 *    compiler's slot for a tinted container with a guaranteed ink.
 * 4. **The row announces everything it shows** — kind, title, detail, actor,
 *    timestamp and "Pending". The base's `Call: Rang Ada` replaced the whole
 *    subtree, so the meta line was silent (rule A).
 * 5. **A press is a state layer** (rule B), and a row with no `onPress` is no
 *    longer announced as a *disabled button*.
 *
 * **Renders nothing without a `title`.**
 */
export declare function ActivityLogRowV4({ kind, title, detail, actor, timestamp, pending, pendingLabel, onPress, testID, style, }: ActivityLogRowV4Props): React.ReactElement | null;
//# sourceMappingURL=ActivityLogRowV4.d.ts.map