import * as React from 'react';
import type { FuelChargeGaugeProps } from './FuelChargeGauge';
/** The three bands a level falls in. Genuinely a status, so the tones stay. */
export type FuelBand = 'low' | 'fair' | 'good';
export interface FuelChargeGaugeV4Props extends FuelChargeGaugeProps {
    /** Override the band words — three English words lived inside the component. */
    bandLabels?: Partial<Record<FuelBand, string>>;
    /** Appended when `charging`. Default `'Charging'`. */
    chargingLabel?: string;
}
/**
 * **V4 fuel / charge gauge** — same props as {@link FuelChargeGauge} plus
 * `bandLabels` and `chargingLabel`.
 *
 * ## Four changes
 *
 * 1. **The percentage takes contrast-corrected ink.** The base painted the
 *    figure `colors[band.tone]` — a **fill** slot, on the largest number in
 *    the component. `warnText` is that colour pulled until it clears AA.
 * 2. **The glyph is an element, not part of the string.** `'⛽ Fuel'` cannot
 *    be tinted, cannot be replaced, and is read aloud as the emoji's name.
 * 3. **`fontWeight: '800'` is off the scale.** The kit stops at `bold`; the
 *    base asked for a weight the type system does not have, which resolves
 *    differently on every platform.
 * 4. **The track's thickness comes off the spacing scale**, and the meter
 *    reports itself as a `progressbar` with its real value.
 */
export declare function FuelChargeGaugeV4({ percent, kind, label, rangeLabel, lowThreshold, charging, variant, bandLabels, chargingLabel, loading, style, }: FuelChargeGaugeV4Props): React.ReactElement;
//# sourceMappingURL=FuelChargeGaugeV4.d.ts.map