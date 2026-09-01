import * as React from 'react';
import type { TemperatureGraphProps } from './TemperatureGraph';
/** Drop-in for {@link TemperatureGraphProps} — same props, a different design. */
export type TemperatureGraphV4Props = TemperatureGraphProps;
/**
 * TemperatureGraph — **on a brand ground** design (v4), web parity of the native
 * `TemperatureGraphV4`. The shared web `LineChart` over a full `primary`-colored
 * panel, with the title and min/max annotation in `on-primary` and x-axis labels
 * in `primary-100` — the weather-app "chance of rain" look. The curve defaults to
 * the `accent` token so it reads on the brand ground (overridable via `color`);
 * all colors come from `--xen-*` classes / vars, no literals. Renders a muted
 * note when `data` is empty. Same props as {@link TemperatureGraphProps}.
 */
export declare const TemperatureGraphV4: React.ForwardRefExoticComponent<TemperatureGraphProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TemperatureGraphV4.d.ts.map