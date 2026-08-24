import * as React from 'react';
import type { WeatherAdvisoryProps } from './WeatherAdvisory';
/** Drop-in alternate of {@link WeatherAdvisoryProps} — identical prop contract. */
export type WeatherAdvisoryV3Props = WeatherAdvisoryProps;
/**
 * WeatherAdvisory — design variant **V3**: a **compact inline advisory** — a
 * single-line tinted pill with the category glyph, a `SEVERITY — headline`
 * label, and an optional timeframe flush right. Severity shows as a text prefix,
 * never color alone. Announced via `accessibilityRole="alert"`. Same props as
 * {@link WeatherAdvisoryProps}; only the layout differs. Token-only.
 */
export declare function WeatherAdvisoryV3({ title, message, kind, severity, timeframe, icon, style, }: WeatherAdvisoryV3Props): React.ReactElement;
//# sourceMappingURL=WeatherAdvisoryV3.d.ts.map