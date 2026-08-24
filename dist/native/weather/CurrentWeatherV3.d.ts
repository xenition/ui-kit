import * as React from 'react';
import type { CurrentWeatherProps } from './CurrentWeather';
/** Drop-in for {@link CurrentWeatherProps} — same props, a different design. */
export type CurrentWeatherV3Props = CurrentWeatherProps;
/**
 * CurrentWeather — **compact left-aligned** design (v3). A single tidy row: the
 * condition glyph, then a left-aligned stack of location / temperature with the
 * condition label and an inline `H · L` line beside it. Built for list headers
 * and dense dashboards. The condition is a glyph AND its text label — never
 * color alone. Renders a muted placeholder when `temperature` is absent and a
 * skeleton when `loading`. Same props as {@link CurrentWeatherProps};
 * token-only colors.
 */
export declare function CurrentWeatherV3({ location, temperature, unit, condition, feelsLike, high, low, loading, onPress, style, }: CurrentWeatherV3Props): React.ReactElement;
//# sourceMappingURL=CurrentWeatherV3.d.ts.map