import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Appearance } from '../primitives/internal/appearance';
import { type HealthRange, type RangeVerdict } from '../../health/goal-v4';
export interface HealthRangeBarV4Props {
    /** What was measured, e.g. `'Fasting glucose'`. */
    label: string;
    /** The reading being plotted. */
    value: number;
    /** The normal band. Either bound may be omitted for a one-sided range. */
    range?: HealthRange;
    /** Unit suffix, e.g. `'mg/dL'`. */
    unit?: string;
    /** Scale start. Derived from the reading and the band when omitted. */
    min?: number;
    /** Scale end. Derived from the reading and the band when omitted. */
    max?: number;
    /** Wording for each verdict. Defaults to `Below range` / `In range` / `Above range`. */
    rangeLabels?: Partial<Record<RangeVerdict, string>>;
    /** Format the reading and the band's bounds. Default `'96 mg/dL'`. */
    formatValue?: (value: number, unit?: string) => string;
    /** Shown in place of the band when no usable range was supplied. Default `'No range set'`. */
    emptyLabel?: string;
    /** Surface treatment. Defaults to `classic`, matching the rest of the module. */
    appearance?: Appearance;
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 health range bar** — a reading plotted against its normal band. New in
 * V4; there is no base component.
 *
 * ## Why it exists
 *
 * Nothing in the `health` module could say *out of range*. `VitalStat` fixed
 * its tone by `variant`, so a fasting glucose of 260 mg/dL drew in exactly the
 * ink a fasting glucose of 95 drew in, and a heart rate of 190 bpm shared its
 * permanent red with a resting 58. `VitalStatV4` and `BodyMetricCardV4` can
 * now take a `range` and say the word — but a word is not a picture, and a
 * reading is far easier to judge against a band you can see than against one
 * you have to remember.
 *
 * So: the band is drawn as a lit segment of the track, the reading as a marker
 * on it, and the verdict as a word beneath. It reads `rangeVerdict` from the
 * shared `goal-v4`, which is the same function the two cards read, so the
 * picture and the words cannot disagree.
 *
 * ## Four things it does deliberately
 *
 * 1. **The whole bar is one `progressbar` with a value**, rather than a
 *    decorative drawing with a caption beside it — every meter in the base
 *    module was the latter.
 * 2. **The verdict is a word before it is a colour.** `low` and `high` share
 *    one tone, because a component knows only that a reading is outside the
 *    band it was handed, not whether that is a rounding error or an emergency.
 * 3. **The scale is derived from the data and the band together**, so a
 *    reading far outside its band is still visible on the axis instead of
 *    being pinned to the end of it.
 * 4. **No band is a state, not a blank.** With `range` omitted the reading
 *    still renders, under `emptyLabel` — the same distinction `goalParts`
 *    draws between "no goal" and "nought per cent", and for the same reason:
 *    a component that does not know the band must not draw one.
 *
 * **Renders nothing without a `label` or a finite `value`.**
 */
export declare function HealthRangeBarV4({ label, value, range, unit, min, max, rangeLabels, formatValue, emptyLabel, appearance, style, }: HealthRangeBarV4Props): React.ReactElement | null;
//# sourceMappingURL=HealthRangeBarV4.d.ts.map