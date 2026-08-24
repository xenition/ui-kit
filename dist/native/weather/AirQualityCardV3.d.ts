import * as React from 'react';
import type { AirQualityCardProps } from './AirQualityCard';
/** Drop-in for {@link AirQualityCardProps} — same props, a different design. */
export type AirQualityCardV3Props = AirQualityCardProps;
/**
 * AirQualityCard — **compact chip row** design (v3). A single inline line: a lung
 * glyph, the "AQI" caption, the numeric value, and a tone `Badge` carrying the
 * severity band's glyph + text label (never color alone). An optional pollutant
 * caption trails on the right; advice, if given, wraps underneath. Sized for
 * dense dashboards and list rows. Renders a muted empty state when `aqi` is
 * absent and a skeleton when `loading`. Same props as
 * {@link AirQualityCardProps}; token-only colors.
 */
export declare function AirQualityCardV3({ aqi, pollutant, advice, loading, emptyLabel, style, }: AirQualityCardV3Props): React.ReactElement;
//# sourceMappingURL=AirQualityCardV3.d.ts.map