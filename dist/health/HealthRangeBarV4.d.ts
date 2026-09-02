import * as React from 'react';
import { type HealthRange, type RangeVerdict } from './goal-v4';
import { type Appearance } from './internal/tone-v4';
export interface HealthRangeBarV4Props extends React.HTMLAttributes<HTMLDivElement> {
    /** What is being measured, e.g. `'Fasting glucose'`. */
    label: string;
    /** The reading. */
    value: number;
    /** The normal band. Either bound may be omitted for a one-sided range. */
    range?: HealthRange;
    /** Unit suffix, e.g. `'mg/dL'`. */
    unit?: string;
    /** Scale start. Derived from the band when omitted. */
    min?: number;
    /** Scale end. Derived from the band when omitted. */
    max?: number;
    /** Override the three verdict words. */
    rangeLabels?: Partial<Record<RangeVerdict, string>>;
    /** Render a figure. Default `'95 mg/dL'`. */
    formatValue?: (value: number, unit?: string) => string;
    /** Copy when no usable band was given. Default `'No range set'`. */
    emptyLabel?: string;
    /** Surface preset, matching the native twin. Default `'classic'`. */
    appearance?: Appearance;
}
/**
 * **V4 health range bar** — a reading plotted against its normal band: the band
 * drawn as a region, the reading as a marker, the verdict as a word.
 *
 * There is no base component. This is the piece the `health` line kept needing
 * and did not have.
 *
 * ## Why it exists
 *
 * 1. **The module could not say "out of range".** `VitalStat` fixed its tone by
 *    `variant`, so a fasting glucose of 260 mg/dL rendered identically to 95
 *    and a dangerous 190 bpm drew in the same permanent red as a resting 58.
 *    `VitalStatV4` and `BodyMetricCardV4` can now take a `range` — and this is
 *    the component that *shows* one, rather than reducing it to a tinted
 *    numeral.
 * 2. **A number is not a position.** "95 mg/dL" tells a reader nothing unless
 *    they already know the band. Drawing the band is the whole point.
 * 3. **The verdict is a word as well as a colour**, so nothing here depends on
 *    telling amber from red — and the bar is a real `progressbar` rather than a
 *    picture of one, so the position is available to a reader who cannot see it
 *    at all.
 */
export declare const HealthRangeBarV4: React.ForwardRefExoticComponent<HealthRangeBarV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=HealthRangeBarV4.d.ts.map