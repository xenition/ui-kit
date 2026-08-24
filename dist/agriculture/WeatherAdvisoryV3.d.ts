import * as React from 'react';
import type { WeatherAdvisoryProps } from './WeatherAdvisory';
/** Same public contract as {@link WeatherAdvisory} — a drop-in alternate design. */
export type WeatherAdvisoryV3Props = WeatherAdvisoryProps;
/**
 * WeatherAdvisory, redesigned (v3): a **compact advisory line**. A kind glyph, the
 * headline over a message·timeframe line, and a severity word (color + text) on
 * the right — a hairline-bordered inline alert. The opposite of v2's banner. Same
 * props, token-only.
 */
export declare const WeatherAdvisoryV3: React.ForwardRefExoticComponent<WeatherAdvisoryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WeatherAdvisoryV3.d.ts.map