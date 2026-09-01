import * as React from 'react';
import type { TemperatureGraphProps } from './TemperatureGraph';
/** Drop-in for {@link TemperatureGraphProps} — same props, a different design. */
export type TemperatureGraphV4Props = TemperatureGraphProps;
/**
 * TemperatureGraph — **sky** design (v4). The shared `LineChart` over a rounded
 * gradient panel, with the title + min/max annotation in near-white ink and
 * x-axis labels in a softer ink — the weather-app "chance of rain" look. The
 * curve defaults to the `accent` token so it reads on the brand ground
 * (overridable via `color`); every color traces to a token, never a literal.
 * Renders a muted note when `data` is empty. Same props as
 * {@link TemperatureGraphProps}.
 */
export declare function TemperatureGraphV4({ data, labels, unit, title, color, height, width, emptyLabel, style, }: TemperatureGraphV4Props): React.ReactElement;
//# sourceMappingURL=TemperatureGraphV4.d.ts.map