import * as React from 'react';
import { type WeatherCondition } from './weather-utils';
export interface ForecastDay {
    /** Short day label (e.g. `'Mon'`) or a date string. */
    label: string;
    condition?: WeatherCondition;
    high?: number;
    low?: number;
    /** Chance of precipitation, 0–100. */
    precip?: number;
}
/** `scroll` = horizontal strip; `list` = full-width stacked rows. */
export type ForecastStripVariant = 'scroll' | 'list';
export interface ForecastStripProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The days to render (7-day is the common case, but any length works). */
    days: ForecastDay[];
    /** Unit suffix appended to temperatures. Default `'°'`. */
    unit?: string;
    /** Index of the currently-selected day (controlled highlight). */
    selectedIndex?: number;
    /** Fired with the tapped day + its index. */
    onSelectDay?: (day: ForecastDay, index: number) => void;
    /** Layout. Default `'scroll'`. */
    variant?: ForecastStripVariant;
    /** Message shown when `days` is empty. */
    emptyLabel?: string;
}
/**
 * Multi-day forecast (web parity of the native `ForecastStrip`). Each day is a
 * tappable `<button>` cell showing its label, the condition as a glyph + short
 * text, and high/low temps; an optional precip chance sits underneath.
 * `variant='scroll'` lays the days out in a horizontally-scrolling row; `'list'`
 * stacks full-width rows. The selected day is highlighted with a token tint AND
 * a bold label + border — never color alone. Renders an `EmptyState` when `days`
 * is empty. All colors come from the `--xen-*` tokens via Tailwind classes.
 */
export declare const ForecastStrip: React.ForwardRefExoticComponent<ForecastStripProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ForecastStrip.d.ts.map