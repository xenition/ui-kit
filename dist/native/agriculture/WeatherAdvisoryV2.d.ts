import * as React from 'react';
import type { WeatherAdvisoryProps } from './WeatherAdvisory';
/** Drop-in alternate of {@link WeatherAdvisoryProps} — identical prop contract. */
export type WeatherAdvisoryV2Props = WeatherAdvisoryProps;
/**
 * WeatherAdvisory — design variant **V2**: a **big alert banner card** — a large
 * severity glyph in a tinted circular disc on the left, a bold headline, message
 * and timeframe stacked to the right, and a severity {@link Badge}. The whole
 * surface is a tinted, elevated card with a thick severity edge, so it reads as
 * a full-width hero alert rather than V1's slim callout. Severity is stated in
 * text, never color alone. Announced via `accessibilityRole="alert"`. Same props
 * as {@link WeatherAdvisoryProps}. Token-only.
 */
export declare function WeatherAdvisoryV2({ title, message, kind, severity, timeframe, icon, style, }: WeatherAdvisoryV2Props): React.ReactElement;
//# sourceMappingURL=WeatherAdvisoryV2.d.ts.map