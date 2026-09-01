import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface WeatherDetailItem {
    /** Metric name, e.g. `'Humidity'`. */
    label: string;
    /** The value (already formatted). */
    value: React.ReactNode;
    /** Unit/suffix rendered muted after the value (e.g. `'%'`, `'km/h'`). */
    unit?: string;
    /** Leading glyph (e.g. `'💧'`). Decorative; the label carries the meaning. */
    glyph?: string;
    /** Secondary caption under the label. */
    caption?: string;
}
export interface WeatherDetailGridProps {
    /** The metric rows to render. */
    items: WeatherDetailItem[];
    /** Rows grouped per card. Default `3` (so 6 items → 2 cards). */
    perCard?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * WeatherDetailGrid — weather detail metrics grouped into elevated cards. Instead
 * of many loose tiles, the items are chunked `perCard` at a time (default 3) into
 * clean list cards: each row is a glyph badge + label/caption on the left and a
 * big value + unit on the right, separated by hairline dividers. Every color is a
 * semantic token (`card`/`onSurface`/`mutedText`/`border`), so it adapts to light
 * AND dark; the glyph badge is a brand-ramp gradient. No literal colors.
 */
export declare function WeatherDetailGrid({ items, perCard, style }: WeatherDetailGridProps): React.ReactElement;
//# sourceMappingURL=WeatherDetailGrid.d.ts.map