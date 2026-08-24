import * as React from 'react';
import type { AirQualityCardProps } from './AirQualityCard';
/** Same public contract as {@link AirQualityCard} — a drop-in alternate design. */
export type AirQualityCardV3Props = AirQualityCardProps;
/**
 * AirQualityCard, redesigned (v3): a **compact AQI line**. The band glyph, the
 * index number (band-colored) with its label, and the pollutant folded in — a
 * single dense row. The opposite of v2's hero. Same props, token-only.
 */
export declare const AirQualityCardV3: React.ForwardRefExoticComponent<AirQualityCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AirQualityCardV3.d.ts.map