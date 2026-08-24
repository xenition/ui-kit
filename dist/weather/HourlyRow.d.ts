import * as React from 'react';
import { type WeatherCondition } from './weather-utils';
export interface HourlyPoint {
    /** Hour label (e.g. `'3 PM'` or `'15:00'`). */
    time: string;
    condition?: WeatherCondition;
    temperature?: number;
    /** Chance of precipitation, 0–100. */
    precip?: number;
}
export interface HourlyRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Per-hour points, rendered left→right in a horizontal scroll. */
    hours: HourlyPoint[];
    /** Unit suffix appended to temperatures. Default `'°'`. */
    unit?: string;
    /** Show the precip-chance line under each hour. Default `true`. */
    showPrecip?: boolean;
    /** Fired with the tapped hour + its index. */
    onSelectHour?: (hour: HourlyPoint, index: number) => void;
    /** Message shown when `hours` is empty. */
    emptyLabel?: string;
}
/**
 * Horizontal hour-by-hour timeline (web parity of the native `HourlyRow`): each
 * column shows the time, the condition as a glyph + label, the temperature, and
 * (optionally) precip chance. A horizontally-scrolling row of token-styled
 * columns — the condition is conveyed by glyph and text, never color alone. Each
 * column is a `<button>` when `onSelectHour` is set, otherwise a static cell.
 * Renders an `EmptyState` when `hours` is empty. All colors come from the
 * `--xen-*` tokens via Tailwind classes.
 */
export declare const HourlyRow: React.ForwardRefExoticComponent<HourlyRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=HourlyRow.d.ts.map