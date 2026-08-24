import * as React from 'react';
import type { AirQualityCardProps } from './AirQualityCard';
/** Same public contract as {@link AirQualityCard} — a drop-in alternate design. */
export type AirQualityCardV2Props = AirQualityCardProps;
/**
 * AirQualityCard, redesigned (v2): a **big AQI hero**. The index is a large
 * band-colored figure with the band glyph + label, a 0–300 scale bar with a
 * marker at the reading, the dominant pollutant, and advice. Bolder than v1. Same
 * props, token-only.
 */
export declare const AirQualityCardV2: React.ForwardRefExoticComponent<AirQualityCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AirQualityCardV2.d.ts.map