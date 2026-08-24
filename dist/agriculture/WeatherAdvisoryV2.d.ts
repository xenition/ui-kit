import * as React from 'react';
import type { WeatherAdvisoryProps } from './WeatherAdvisory';
/** Same public contract as {@link WeatherAdvisory} — a drop-in alternate design. */
export type WeatherAdvisoryV2Props = WeatherAdvisoryProps;
/**
 * WeatherAdvisory, redesigned (v2): a **bold advisory banner**. A severity-tinted
 * panel with a large kind glyph, the headline, the message, a severity pill, and a
 * timeframe — a prominent alert. Distinct from v1. Same props, token-only.
 */
export declare const WeatherAdvisoryV2: React.ForwardRefExoticComponent<WeatherAdvisoryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WeatherAdvisoryV2.d.ts.map