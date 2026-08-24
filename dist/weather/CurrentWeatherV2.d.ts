import * as React from 'react';
import type { CurrentWeatherProps } from './CurrentWeather';
/** Same public contract as {@link CurrentWeather} — a drop-in alternate design. */
export type CurrentWeatherV2Props = CurrentWeatherProps;
/**
 * CurrentWeather, redesigned (v2): a **big gradient hero**. A primary-tinted panel
 * with the location eyebrow, an oversized temperature beside the condition glyph,
 * the condition label, and a feels-like · high · low strip. Bolder than v1. Same
 * props, token-only.
 */
export declare const CurrentWeatherV2: React.ForwardRefExoticComponent<CurrentWeatherProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CurrentWeatherV2.d.ts.map