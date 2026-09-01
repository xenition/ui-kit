import * as React from 'react';
import type { ActivityLogRowProps } from './ActivityLogRow';
export interface ActivityLogRowV4Props extends ActivityLogRowProps {
    /** The word a pending activity carries. Default `'Pending'`. */
    pendingLabel?: string;
}
/**
 * **V4 activity log row** — the web twin of the native `ActivityLogRowV4`,
 * same props as {@link ActivityLogRow} plus `pendingLabel`.
 *
 * ## Four changes
 *
 * 1. **A pending activity says so.** The base drew `pending` as
 *    `opacity: 0.6` and nothing else — a screen reader heard no difference at
 *    all, and everyone else read the row as *disabled*, because 0.6 sits inside
 *    the band M3 spends on unavailable. It now carries a word.
 * 2. **An activity kind is identity, not status.** `ACTIVITY_META` typed
 *    `task` and `deal` as `success`, so a log of completed calls came out a
 *    green feed and the tone stopped meaning anything. {@link ACTIVITY_META_V4}
 *    keeps the glyph, which is what actually names the kind, and goes neutral.
 * 3. **One accessible name.** `Call: Rang Ada` replaced the whole subtree, so
 *    the detail, the actor and the timestamp — the three things a feed exists
 *    to show — were never announced. Every part joins the name, comma-joined.
 * 4. **A press is a state layer on a real button**, not a `role="button"` div
 *    with a hand-written Enter/Space handler and no pressed treatment at all.
 *    A non-interactive row stays a plain, readable region rather than a
 *    focusable one.
 */
export declare const ActivityLogRowV4: React.ForwardRefExoticComponent<ActivityLogRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ActivityLogRowV4.d.ts.map