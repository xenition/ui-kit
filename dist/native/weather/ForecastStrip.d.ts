import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
export interface ForecastStripProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * Multi-day forecast (typically 7). Each day is a tappable cell showing its
 * label, the condition as a glyph + short text, and high/low temps; an optional
 * precip chance sits underneath. `variant='scroll'` lays the days out in a
 * horizontal `ScrollView`; `'list'` stacks full-width rows. The selected day is
 * highlighted with a token tint (plus a bold label — never color alone). Renders
 * a muted empty state when `days` is empty. All colors/sizes come from the
 * compiled theme tokens via `useXenitionTheme()` — no literal colors.
 */
export declare function ForecastStrip({ days, unit, selectedIndex, onSelectDay, variant, emptyLabel, style, }: ForecastStripProps): React.ReactElement;
//# sourceMappingURL=ForecastStrip.d.ts.map