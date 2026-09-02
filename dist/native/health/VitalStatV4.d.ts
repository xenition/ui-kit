import * as React from 'react';
import { type HealthRange, type RangeVerdict } from '../../health/goal-v4';
import type { VitalStatProps, VitalStatVariant } from './VitalStat';
export type { VitalStatVariant };
export interface VitalStatV4Props extends VitalStatProps {
    /** The normal band this reading is judged against. Omitted, nothing is judged. */
    range?: HealthRange;
    /** Wording for each verdict. Defaults to `Below range` / `In range` / `Above range`. */
    rangeLabels?: Partial<Record<RangeVerdict, string>>;
}
/**
 * **V4 vital tile** — same props as {@link VitalStat} plus `range` and
 * `rangeLabels`. (`label` and `unit` are the base's own and keep their
 * meaning.)
 *
 * ## Five changes
 *
 * 1. **A heart rate is no longer permanently red.** `heart-rate` and
 *    `blood-pressure` were tinted `danger` and `calories` `warn` by *variant*,
 *    so a resting 58 bpm and a dangerous 190 bpm rendered identically — and in
 *    the same alarm colour, which teaches a user to ignore it. Discipline is
 *    identity and now gets the glyph; the value is ordinary ink.
 * 2. **Out of range is expressible.** Pass a `range` and the tile reads the
 *    verdict from the shared `rangeVerdict`, tones the value accordingly and
 *    prints the verdict as a **word**. With no `range` it behaves exactly as
 *    today, because a component that does not know the band must not guess.
 * 3. **The delta reaches the accessible name.** The base computed it,
 *    coloured it and drew it — and then set `accessibilityLabel` to the label
 *    and value only. Once the tile is a button that name *replaces* its
 *    contents, so the change the tile exists to show was sighted-only.
 * 4. **The non-pressable branch is `accessible`.** It set a label on a plain
 *    `Animated.View`, which is never an accessibility element on iOS, so the
 *    whole computed name was dead.
 * 5. **Press is a state layer**, not `opacity: pressed ? 0.8 : 1`.
 *
 * **Renders nothing without a `value`.**
 */
export declare function VitalStatV4({ variant, value, unit, label, delta, range, rangeLabels, onPress, appearance, style, }: VitalStatV4Props): React.ReactElement | null;
//# sourceMappingURL=VitalStatV4.d.ts.map