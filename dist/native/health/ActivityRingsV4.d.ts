import * as React from 'react';
import { type GoalParts } from '../../health/goal-v4';
import type { ActivityRing, ActivityRingColor, ActivityRingsProps } from './ActivityRings';
export type { ActivityRing, ActivityRingColor };
export interface ActivityRingsV4Props extends ActivityRingsProps {
    /** Shown when there is nothing to draw. Default `'No activity yet'`. */
    emptyLabel?: string;
    /** Said of a ring whose goal is missing or zero. Default `'no goal'`. */
    noGoalLabel?: string;
    /** Build one ring's spoken fragment. Default `'Move 87%'`. */
    formatRing?: (ring: ActivityRing, parts: GoalParts) => string;
}
/**
 * **V4 activity rings** — same props as {@link ActivityRings} plus
 * `emptyLabel`, `noGoalLabel` and `formatRing`.
 *
 * ## Five changes
 *
 * 1. **A ring with no goal says so instead of announcing "0%".** The base read
 *    `goal: 0` as nought per cent, so 540 burned calories with the target
 *    switched off were reported as no progress at all.
 * 2. **The figure stops claiming rings it did not draw.** Rings whose radius
 *    fell to zero — the fifth ring on a 140px figure, say — were dropped
 *    silently and then legended and announced anyway. Only the rings that
 *    actually fit are drawn, listed and spoken.
 * 3. **The empty branch keeps `style` and `appearance`.** It returned a bare
 *    `<Text>` before either was applied, so a caller's layout and surface
 *    treatment vanished at exactly the moment the component had least to say.
 * 4. **Each legend row is a real `progressbar` with a value**, so the numbers
 *    the rings encode are reachable. When there is no legend the figure keeps
 *    the one summary sentence; when there is one, the drawing becomes
 *    decorative rather than repeating everything the legend already says.
 * 5. **The ring track is a surface, not the hairline colour**, which on a dark
 *    seed made an empty ring and a full one hard to distinguish.
 */
export declare function ActivityRingsV4({ rings, size, strokeWidth, gap, showLegend, accessibilityLabel, emptyLabel, noGoalLabel, formatRing, appearance, style, }: ActivityRingsV4Props): React.ReactElement;
//# sourceMappingURL=ActivityRingsV4.d.ts.map