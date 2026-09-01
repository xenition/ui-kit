import * as React from 'react';
import type { CurrentWeatherProps } from './CurrentWeather';
/** Drop-in for {@link CurrentWeatherProps} — same props, a different design. */
export type CurrentWeatherV4Props = CurrentWeatherProps;
/**
 * CurrentWeather — **saturated hero** design (v4), web parity of the native
 * `CurrentWeatherV4`. A full `primary`-colored panel in the mold of a modern
 * weather app: an oversized temperature, the condition as a big glyph + label,
 * and feels-like / high / low as soft pill chips. Text sits on the brand ground
 * via the contrast-guaranteed `on-primary` token; chips use a lighter ramp step
 * — all colors come from `--xen-*` Tailwind classes, no literals. The condition
 * is a glyph AND text — never color alone. Renders a skeleton when `loading` and
 * a `—` placeholder when `temperature` is absent; `variant='compact'` collapses
 * to a single row. Same props as {@link CurrentWeatherProps}.
 */
export declare const CurrentWeatherV4: React.ForwardRefExoticComponent<CurrentWeatherProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CurrentWeatherV4.d.ts.map