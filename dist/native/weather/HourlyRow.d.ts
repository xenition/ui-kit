import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type WeatherCondition } from './weather-utils';
export interface HourlyPoint {
    /** Hour label (e.g. `'3 PM'` or `'15:00'`). */
    time: string;
    condition?: WeatherCondition;
    temperature?: number;
    /** Chance of precipitation, 0–100. */
    precip?: number;
}
export interface HourlyRowProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * Horizontal hour-by-hour timeline: each column shows the time, the condition as
 * a glyph + label, the temperature, and (optionally) precip chance. Purely a
 * `ScrollView` of token-styled columns — the condition is conveyed by glyph and
 * text, never color alone. Renders a muted empty state when `hours` is empty.
 * All colors/sizes come from the compiled theme tokens via `useXenitionTheme()`
 * — no literal colors.
 */
export declare function HourlyRow({ hours, unit, showPrecip, onSelectHour, emptyLabel, style, }: HourlyRowProps): React.ReactElement;
//# sourceMappingURL=HourlyRow.d.ts.map