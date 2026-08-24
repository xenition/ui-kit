import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** `card` = bordered tile; `plain` = bare inline stat. */
export type WeatherStatVariant = 'card' | 'plain';
export interface WeatherStatProps {
    /** Metric name (e.g. `'Humidity'`). */
    label: string;
    /** The value (already formatted). */
    value?: React.ReactNode;
    /** Unit/suffix rendered muted after the value (e.g. `'%'`, `'hPa'`). */
    unit?: string;
    /** Leading glyph (e.g. `'💧'`). Decorative; the label carries the meaning. */
    glyph?: string;
    /** Secondary caption under the value (e.g. `'Dew point 12°'`). */
    caption?: string;
    /** Layout. Default `'card'`. */
    variant?: WeatherStatVariant;
    /** Placeholder shown when `value` is absent. Default `'—'`. */
    emptyValue?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Compact weather metric tile — humidity, pressure, visibility, dew point, etc.
 * A leading glyph, a muted label, a large token-scaled value with an optional
 * unit suffix, and a caption line. `variant='plain'` drops the card chrome for
 * use inside grids/rows. Renders a muted placeholder when `value` is absent.
 * All colors/sizes come from the compiled theme tokens via `useXenitionTheme()`
 * — no literal colors.
 */
export declare function WeatherStat({ label, value, unit, glyph, caption, variant, emptyValue, style, }: WeatherStatProps): React.ReactElement;
//# sourceMappingURL=WeatherStat.d.ts.map