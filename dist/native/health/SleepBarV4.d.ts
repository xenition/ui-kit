import * as React from 'react';
import type { SleepBarProps, SleepQuality } from './SleepBar';
export type { SleepQuality };
export interface SleepBarV4Props extends SleepBarProps {
    /** Shown in place of the ratio when there is no usable goal. Default `'No goal set'`. */
    noGoalLabel?: string;
    /** Wording for each quality rating. Defaults to `Poor` / `Fair` / `Good` / `Excellent`. */
    qualityLabels?: Partial<Record<SleepQuality, string>>;
    /** Format an hours figure. Default `'7.5h'`. */
    formatHours?: (hours: number) => string;
}
/**
 * **V4 sleep bar** — same props as {@link SleepBar} plus `noGoalLabel`,
 * `qualityLabels` and `formatHours`.
 *
 * ## Five changes
 *
 * 1. **A fully-slept night with `goal={0}` no longer draws an empty bar.** The
 *    base read a goal of zero as *nought per cent* rather than as *no goal*,
 *    so someone who turned their sleep target off saw 7.5 hours reported above
 *    a completely empty track. Absence is now its own branch: the hours stand
 *    alone and the card says there is no goal.
 * 2. **The bar is a real `progressbar` with a value.** It was a pair of plain
 *    `View`s inside a container whose `accessibilityLabel` was set on a
 *    non-`accessible` element — dead on iOS — so nothing about this card
 *    reached a screen reader at all.
 * 3. **The container stops claiming a name it cannot carry.** The label moves
 *    onto the elements that actually own each fact: one for the readout, the
 *    meter for the progress, one for the bed and wake times.
 * 4. **The track is a surface, not a hairline.** `colors.border` as a fill is
 *    nearly invisible on a dark seed, which made an empty bar and a half-full
 *    one hard to tell apart.
 * 5. **The quality words are props**, and the tag is a word as well as a
 *    colour — the base carried the rating in the tag's ink alone once the
 *    label was lost.
 */
export declare function SleepBarV4({ hours, goal, quality, bedtime, wakeTime, noGoalLabel, qualityLabels, formatHours, appearance, style, }: SleepBarV4Props): React.ReactElement;
//# sourceMappingURL=SleepBarV4.d.ts.map