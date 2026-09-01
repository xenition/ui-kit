import * as React from 'react';
import type { AirQualityCardProps } from './AirQualityCard';
/** Drop-in for {@link AirQualityCardProps} — same props, a different design. */
export type AirQualityCardV4Props = AirQualityCardProps;
/**
 * AirQualityCard — **elevated card** design (v4). A polished white card sitting on
 * the page: an oversized AQI numeral, its severity band as a solid pill (glyph +
 * text — never color alone), a token-tinted scale track with a position marker,
 * and optional pollutant / advice captions. Band severity maps to
 * success/warn/danger tokens, every color/size traces to the compiled theme via
 * `useXenitionTheme()` — no literal colors. Renders a skeleton when `loading` and
 * a muted empty state when `aqi` is absent. Same props as {@link AirQualityCardProps}.
 */
export declare function AirQualityCardV4({ aqi, pollutant, advice, loading, emptyLabel, style, }: AirQualityCardV4Props): React.ReactElement;
//# sourceMappingURL=AirQualityCardV4.d.ts.map