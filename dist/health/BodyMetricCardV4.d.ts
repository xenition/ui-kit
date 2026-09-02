import * as React from 'react';
import { type HealthRange, type RangeVerdict } from './goal-v4';
import type { BodyMetricCardProps } from './BodyMetricCard';
import { type Appearance } from './internal/tone-v4';
export interface BodyMetricCardV4Props extends BodyMetricCardProps {
    /** The reading's normal band. Given one, tone and a word follow the verdict. */
    range?: HealthRange;
    /** Override the variant's default name. */
    label?: string;
    /** Override the three verdict words. */
    rangeLabels?: Partial<Record<RangeVerdict, string>>;
    /** Surface preset, matching the native twin. Default `'classic'`. */
    appearance?: Appearance;
}
/**
 * **V4 body metric card** — same props as {@link BodyMetricCard} plus `range`,
 * `label`, `rangeLabels` and `appearance` (`unit` was already there).
 *
 * ## Five changes
 *
 * 1. **The drop the card exists to show never reached a screen reader.** The
 *    delta was computed, tinted and drawn, and then left out of the accessible
 *    name — and because the whole card was a `role="button"`, that name
 *    *replaced* its contents. So "▼ 1.2 kg", the entire point of a weight card,
 *    was sighted-only.
 * 2. **A fasting glucose of 260 mg/dL rendered identically to 95.** There was
 *    no way to express a normal band at all. Pass a `range` and the reading
 *    takes its tone and a word from `rangeVerdict`; with none, nothing changes.
 * 3. **The sparkline is a sibling, not a descendant.** Inside `role="button"`
 *    it was pruned along with everything else, so the trend it draws had no
 *    name of its own. It now sits beside the activation and keeps one.
 * 4. **The activation is a real `<button>` that clears 44.** `div` +
 *    `role="button"` + `tabIndex` + a hand-written Enter/Space handler is three
 *    approximations of a button.
 * 5. **Press is a state layer and the ink is the corrected slot.**
 *    `hover:opacity-90` is M3's disabled band spent on hover, and
 *    `text-success` is a fill token doing a text colour's job.
 */
export declare const BodyMetricCardV4: React.ForwardRefExoticComponent<BodyMetricCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BodyMetricCardV4.d.ts.map