import * as React from 'react';
import type { StreakCounterProps } from './StreakCounter';
import { type Appearance } from './internal/tone-v4';
export interface StreakCounterV4Props extends StreakCounterProps {
    /** The unit's plural. Default `` `${unit}s` `` — which is wrong outside English. */
    unitPlural?: string;
    /** Copy when the streak is nought. Default `'Start your streak'`. */
    emptyLabel?: string;
    /** Copy on the record sub-caption. Default `'Best'`. */
    bestLabel?: string;
    /** Render the count. Default `'12'`. */
    formatCount?: (count: number) => string;
    /** Surface preset, matching the native twin. Default `'classic'`. */
    appearance?: Appearance;
}
/**
 * **V4 streak counter** — same props as {@link StreakCounter} plus
 * `unitPlural`, `emptyLabel`, `bestLabel`, `formatCount` and `appearance`.
 *
 * ## Four changes
 *
 * 1. **`unit="día"` rendered "díass".** The base appended `'s'` unconditionally,
 *    so every non-English unit was wrong and every irregular English one too
 *    ("2 weeklys"). `pluralizeUnit` keeps the `'s'` default for callers who
 *    never said otherwise and lets everyone else pass `unitPlural`.
 * 2. **Four English strings are now props.** "Start your streak" and "Best:"
 *    were baked in, which meant a localised app could not use the component at
 *    all without forking it.
 * 3. **The number is inked with the corrected slot.** `TEXT_CLASS` maps
 *    `warn` — the default tone — to `text-warn`, which is `var(--xen-warn)`: a
 *    **fill**, with no contrast promise as text. The streak count is the
 *    largest thing on the component and was the least readable.
 * 4. **The record line is part of the name.** "Best: 40" sat outside the
 *    `group`'s label, so the one number that gives the current streak its
 *    meaning was sighted-only.
 */
export declare const StreakCounterV4: React.ForwardRefExoticComponent<StreakCounterV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StreakCounterV4.d.ts.map