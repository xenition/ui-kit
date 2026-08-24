import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** One day's forecast. */
export interface WeatherDay {
    /** Short day label, e.g. `'Mon'`. */
    day: string;
    /** Condition glyph/emoji, e.g. `'☀️'`. */
    glyph?: string;
    /** High temperature (already in the display unit). */
    high: number;
    /** Low temperature. */
    low?: number;
    /** Spoken condition, e.g. `'Sunny'` (used in the a11y label). */
    condition?: string;
}
export interface WeatherStripProps {
    /** Days to display, in order. */
    days: readonly WeatherDay[];
    /** Unit suffix appended to temperatures (default `'°'`). */
    unit?: string;
    /** Index of the day to emphasize (e.g. today). */
    highlightIndex?: number;
    /** Horizontal scroll (default `true`); set `false` to wrap in a fixed width. */
    scrollEnabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A horizontal multi-day forecast strip — one token-styled tile per day with a
 * condition glyph and high/low temperatures. The `highlightIndex` day gets a
 * primary-tinted tile and is announced as "today". Renders an empty hint when
 * there are no days. Token-only colors.
 */
export declare function WeatherStrip({ days, unit, highlightIndex, scrollEnabled, style, }: WeatherStripProps): React.ReactElement;
//# sourceMappingURL=WeatherStrip.d.ts.map