import * as React from 'react';
import { type WeatherCondition } from './weather-utils';
/** `compact` = single-line summary; `hero` = large stacked layout. */
export type CurrentWeatherVariant = 'hero' | 'compact';
export interface CurrentWeatherProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'aria-label'> {
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
}
/**
 * Hero current-conditions block (web parity of the native `CurrentWeather`):
 * location eyebrow, a large temperature, and the condition shown as a glyph
 * beside its text label (accessibility never relies on color). Feels-like plus
 * daily high/low sit underneath. `variant='compact'` collapses to a single row.
 * Renders a `—` placeholder when `temperature` is absent and a token skeleton
 * when `loading`. Pass `onClick` to make the hero tappable (keyboard-activatable).
 * All colors come from the `--xen-*` tokens via Tailwind classes — no literals.
 */
export declare const CurrentWeather: React.ForwardRefExoticComponent<CurrentWeatherProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CurrentWeather.d.ts.map