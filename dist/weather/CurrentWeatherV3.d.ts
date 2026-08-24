import * as React from 'react';
import type { CurrentWeatherProps } from './CurrentWeather';
/** Same public contract as {@link CurrentWeather} — a drop-in alternate design. */
export type CurrentWeatherV3Props = CurrentWeatherProps;
/**
 * CurrentWeather, redesigned (v3): a **compact condition bar**. The glyph, the
 * temperature and location, and a high/low·feels line pack onto one dense row —
 * for a header or list. The opposite of v2's hero. Same props, token-only.
 */
export declare const CurrentWeatherV3: React.ForwardRefExoticComponent<CurrentWeatherProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CurrentWeatherV3.d.ts.map