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
 * **V4 fuel / charge gauge** — the web twin of the native
 * `FuelChargeGaugeV4`, same props as {@link FuelChargeGauge} plus
 * `bandLabels` and `chargingLabel`.
 *
 * ## Four changes
 *
 * 1. **The percentage takes contrast-corrected ink** — the base painted the
 *    largest number in the component with a **fill** slot.
 * 2. **The glyph is an element, not part of the string**, so it can be tinted
 *    and is not read aloud as the emoji's name.
 * 3. **The meter is a real `role="progressbar"`** with its value, rather than
 *    a decorative div.
 * 4. **The band word is a prop**, and the whole gauge has one spoken name.
 */
export declare const FuelChargeGaugeV4: React.ForwardRefExoticComponent<FuelChargeGaugeV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FuelChargeGaugeV4.d.ts.map