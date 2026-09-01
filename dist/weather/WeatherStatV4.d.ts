import * as React from 'react';
import type { WeatherStatProps } from './WeatherStat';
export type WeatherStatV4Props = WeatherStatProps;
/**
 * WeatherStat — **sky tile** design (v4), web parity of the native `WeatherStatV4`.
 * A polished metric tile: the leading glyph sits in a small gradient badge (the
 * brand ramp), the muted label rides above a big value with an optional unit
 * suffix, and a caption closes it. Same label / value / unit / caption / glyph
 * contract, defaults and empty handling as the base; `variant='plain'` drops the
 * card chrome. All colors flow through Tailwind token classes. Same props as
 * {@link WeatherStatProps}.
 */
export declare const WeatherStatV4: React.ForwardRefExoticComponent<WeatherStatProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WeatherStatV4.d.ts.map