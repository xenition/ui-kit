import * as React from 'react';
import type { CurrentWeatherProps } from './CurrentWeather';
/** Drop-in for {@link CurrentWeatherProps} — same props, a different design. */
export type CurrentWeatherV2Props = CurrentWeatherProps;
/**
 * CurrentWeather — **immersive hero** design (v2). The whole card is a soft
 * primary-tinted wash floating on an `lg` shadow; a large condition glyph sits
 * centered above an oversized temperature, with the condition label beneath and
 * feels-like / high / low carried as quiet tinted pills. The condition is always
 * a glyph AND its text label — never color alone. Renders a muted placeholder
 * when `temperature` is absent and a skeleton when `loading`. Same props as
 * {@link CurrentWeatherProps}; token-only colors.
 */
export declare function CurrentWeatherV2({ location, temperature, unit, condition, feelsLike, high, low, loading, onPress, style, }: CurrentWeatherV2Props): React.ReactElement;
//# sourceMappingURL=CurrentWeatherV2.d.ts.map