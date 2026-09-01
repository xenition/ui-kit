import * as React from 'react';
import type { WeatherStatProps } from './WeatherStat';
/** Drop-in for {@link WeatherStatProps} — same props, a different design. */
export type WeatherStatV4Props = WeatherStatProps;
/**
 * WeatherStat — **sky tile** design (v4). A polished metric tile: the leading
 * glyph sits in a small gradient badge (the brand ramp), the muted label rides
 * above a large token-scaled value with an optional unit suffix, and a caption
 * closes it. Same label / value / unit / caption / glyph contract as the base;
 * `variant='plain'` drops the card chrome for dense grids. Every color/size
 * traces to the compiled theme — no literal colors. Renders a muted placeholder
 * when `value` is absent. Same props as {@link WeatherStatProps}.
 */
export declare function WeatherStatV4({ label, value, unit, glyph, caption, variant, emptyValue, style, }: WeatherStatV4Props): React.ReactElement;
//# sourceMappingURL=WeatherStatV4.d.ts.map