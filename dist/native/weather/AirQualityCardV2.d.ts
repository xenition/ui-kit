import * as React from 'react';
import type { AirQualityCardProps } from './AirQualityCard';
/** Drop-in for {@link AirQualityCardProps} — same props, a different design. */
export type AirQualityCardV2Props = AirQualityCardProps;
/**
 * AirQualityCard — **dial** design (v2). The AQI sits large inside a tone-tinted
 * ring, with the severity band shown as a glyph + text label beneath (never
 * color alone). A six-segment token scale band underneath maps the full AQI
 * spectrum, with the active band highlighted and a marker at the current value.
 * Optional pollutant/advice captions follow. Renders a muted empty state when
 * `aqi` is absent and a skeleton when `loading`. Same props as
 * {@link AirQualityCardProps}; token-only colors.
 */
export declare function AirQualityCardV2({ aqi, pollutant, advice, loading, emptyLabel, style, }: AirQualityCardV2Props): React.ReactElement;
//# sourceMappingURL=AirQualityCardV2.d.ts.map