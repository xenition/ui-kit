import * as React from 'react';
import { type GoalParts } from './goal-v4';
import type { ActivityRing, ActivityRingsProps } from './ActivityRings';
import { type Appearance } from './internal/tone-v4';
export interface ActivityRingsV4Props extends ActivityRingsProps {
    /** Copy when `rings` is empty. Default `'No data'`. */
    emptyLabel?: string;
    /** Copy for a ring whose goal is missing or nought. Default `'No goal set'`. */
    noGoalLabel?: string;
    /** Render one ring's spoken line. Default `'Move, 540 of 600 kcal, 90%'`. */
    formatRing?: (ring: ActivityRing, parts: GoalParts) => string;
    /** Surface preset, matching the native twin. Default `'classic'`. */
    appearance?: Appearance;
}
/**
 * **V4 activity rings** — same props as {@link ActivityRings} plus
 * `emptyLabel`, `noGoalLabel`, `formatRing` and `appearance`.
 *
 * ## Five changes
 *
 * 1. **A ring that does not fit is no longer announced as if it were there.**
 *    The base dropped any ring whose radius came out `<= 0` — pass five rings
 *    at the default size and the fifth silently vanishes — while still counting
 *    it in the summary and listing it in the legend. The component now works
 *    out how many rings the geometry can actually carry, draws that many, and
 *    reports the same number: what is claimed and what is drawn are one list.
 * 2. **540 kcal against a goal of nought announced "Move 0%".** `goal <= 0` was
 *    read as *nought per cent* rather than as *no goal*, which is a different
 *    fact and now says so.
 * 3. **Each ring is a meter.** The whole figure was one `role="img"` with a
 *    summary sentence, so a reader could hear the rings but never query one.
 *    The drawing is now `aria-hidden` and every ring is a `progressbar` in a
 *    list beside it — the legend when there is one, a screen-reader-only list
 *    when `showLegend` is false, so the meters exist either way.
 * 4. **The legend prints the measurement, not the clamp.** `Math.min(value,
 *    goal)` was applied to the number on screen, so an exceeded ring read
 *    "600 / 600" for 720 burned calories.
 * 5. **The track is not a hairline.** `--xen-border` is a 1px rule's colour; at
 *    a 14px stroke it reads as an outline around a hole.
 */
export declare const ActivityRingsV4: React.ForwardRefExoticComponent<ActivityRingsV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ActivityRingsV4.d.ts.map