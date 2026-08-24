import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type WeatherCondition } from './weather-utils';
/** `compact` = single-line summary; `hero` = large stacked layout. */
export type CurrentWeatherVariant = 'hero' | 'compact';
export interface CurrentWeatherProps {
    /** Place name shown as the eyebrow (e.g. `'San Francisco'`). */
    location?: string;
    /** Current temperature (already in the caller's unit). */
    temperature?: number;
    /** Unit suffix appended to temperatures. Default `'°'`. */
    unit?: string;
    /** Icon + text condition. Rendered as glyph AND label — never color alone. */
    condition?: WeatherCondition;
    /** "Feels like" apparent temperature. */
    feelsLike?: number;
    /** Daily high. */
    high?: number;
    /** Daily low. */
    low?: number;
    /** Layout density. Default `'hero'`. */
    variant?: CurrentWeatherVariant;
    /** Skeleton state while data loads. */
    loading?: boolean;
    /** Fired when the hero is tapped (e.g. open full forecast). */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * Hero current-conditions block: location eyebrow, a large temperature, and the
 * condition shown as a glyph beside its text label (accessibility never relies
 * on color). Feels-like plus daily high/low sit underneath. `variant='compact'`
 * collapses to a single row for list headers. Renders a muted placeholder when
 * `temperature` is absent and a skeleton when `loading`. All colors/sizes come
 * from the compiled theme tokens via `useXenitionTheme()` — no literal colors.
 */
export declare function CurrentWeather({ location, temperature, unit, condition, feelsLike, high, low, variant, loading, onPress, style, }: CurrentWeatherProps): React.ReactElement;
//# sourceMappingURL=CurrentWeather.d.ts.map