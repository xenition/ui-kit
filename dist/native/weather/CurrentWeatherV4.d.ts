import * as React from 'react';
import type { CurrentWeatherProps } from './CurrentWeather';
/** Drop-in for {@link CurrentWeatherProps} — same props, a different design. */
export type CurrentWeatherV4Props = CurrentWeatherProps;
/**
 * CurrentWeather — **sky hero** design (v4). A rounded gradient panel in the mold
 * of a modern weather app: an oversized temperature, the condition as a big glyph
 * beside its label, and feels-like / high / low as soft translucent pill chips.
 * The gradient stops and the near-white ink all come from the brand ramp, so the
 * whole thing restyles from the seed and never uses a literal color; the
 * condition is a glyph AND text — never color alone. Renders a skeleton when
 * `loading`, a `—` placeholder when `temperature` is absent, and collapses to a
 * single row under `variant='compact'`. Same props as {@link CurrentWeatherProps}.
 */
export declare function CurrentWeatherV4({ location, temperature, unit, condition, feelsLike, high, low, variant, loading, onPress, style, }: CurrentWeatherV4Props): React.ReactElement;
//# sourceMappingURL=CurrentWeatherV4.d.ts.map